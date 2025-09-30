import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const dataDir = path.resolve(process.cwd(), "data");
const uploadsDir = path.join(dataDir, "uploads");
const extractedDir = path.join(dataDir, "extracted");

for (const dir of [dataDir, uploadsDir, extractedDir]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${Date.now()}_${safeName}`);
  },
});
const upload = multer({ storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = () => genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

function scoreResume(text) {
  const signals = {
    projects: /(project|built|developed)\b/i.test(text) ? 1 : 0,
    internships: /(intern|internship)\b/i.test(text) ? 1 : 0,
    leadership: /(led|leader|captain|president)\b/i.test(text) ? 1 : 0,
    impact: /(increased|reduced|improved|optimized|achieved|%|percent)\b/i.test(
      text
    )
      ? 1
      : 0,
    skills: /(react|node|python|java|aws|sql|typescript|ml|ai)\b/i.test(text)
      ? 1
      : 0,
  };
  const total = Object.values(signals).reduce((a, b) => a + b, 0);
  const score = Math.round((total / 5) * 100);
  return { score, signals };
}

function buildSystemPrompt(resumeText, scoreObj) {
  return `You are a helpful career assistant.
You have access to the student's resume content below and a heuristic score.
- Resume score: ${scoreObj.score}/100
- Signals: ${JSON.stringify(scoreObj.signals)}

Use the resume to tailor advice, examples, and suggestions. When asked to write bullets, produce concise, quantified bullets. If information is missing, ask clarifying questions.`;
}

app.post("/api/upload-resume", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const filePath = req.file.path;
    const ext = path.extname(filePath).toLowerCase();
    let extractedText = "";

    if (ext === ".pdf") {
      try {
        const { default: pdfParse } = await import("pdf-parse");
        const pdfData = await pdfParse(fs.readFileSync(filePath));
        extractedText = pdfData.text || "";
      } catch (e) {
        console.warn("PDF parse failed, falling back to placeholder context:", e?.message || e);
        extractedText = `PDF resume uploaded: ${path.basename(
          filePath
        )}. If text extraction is incomplete, ask the user to paste education, projects, and skills.`;
      }
    } else if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      // Basic fallback: store note; real OCR could be added later.
      extractedText = `Image resume uploaded: ${path.basename(
        filePath
      )}. Ask user to confirm key details (education, projects, skills).`;
    } else {
      // Try reading as text
      try {
        extractedText = fs.readFileSync(filePath, "utf8");
      } catch {
        extractedText = "";
      }
    }

    const extractedPath = path.join(
      extractedDir,
      `${path.basename(filePath)}.txt`
    );
    fs.writeFileSync(extractedPath, extractedText, "utf8");

    const scoreObj = scoreResume(extractedText);

    // Persist a conversation context file
    const context = {
      resumeFile: path.basename(filePath),
      extractedFile: path.basename(extractedPath),
      extractedTextLength: extractedText.length,
      score: scoreObj,
      createdAt: new Date().toISOString(),
    };
    const contextId = path.basename(filePath);
    fs.writeFileSync(
      path.join(dataDir, `${contextId}.json`),
      JSON.stringify(context, null, 2)
    );

    res.json({
      contextId,
      score: scoreObj.score,
      signals: scoreObj.signals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process resume" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { contextId, message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    let resumeText = "";
    let scoreObj = { score: 0, signals: {} };
    if (contextId) {
      const ctxPath = path.join(dataDir, `${contextId}.json`);
      if (fs.existsSync(ctxPath)) {
        const ctx = JSON.parse(fs.readFileSync(ctxPath, "utf8"));
        const extractedPath = path.join(extractedDir, ctx.extractedFile);
        if (fs.existsSync(extractedPath)) {
          resumeText = fs.readFileSync(extractedPath, "utf8");
          scoreObj = ctx.score || scoreObj;
        }
      }
    }

    const systemPrompt = buildSystemPrompt(resumeText, scoreObj);
    const userPrompt = `User message: ${message}

Relevant resume excerpt (may be empty):\n\n${resumeText.slice(
      0,
      4000
    )}\n\nBased on the resume, provide tailored guidance.`;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback in dev without API key
      return res.json({
        reply: `[DEV MODE] ${systemPrompt}\n\n${userPrompt.slice(0, 500)}`,
      });
    }

    const result = await model().generateContent([
      { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] },
    ]);
    const text = result.response.text();
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
