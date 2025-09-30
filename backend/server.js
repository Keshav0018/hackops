import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import os from "os";
import { execFile } from "child_process";

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

const sanitizedKey = (process.env.GEMINI_API_KEY || "")
  .replace(/^\"|\"$/g, "")
  .replace(/^'|'$/g, "");
const genAI = new GoogleGenerativeAI(sanitizedKey);
const model = () => genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

async function extractTextWithGeminiImage(filePath) {
  try {
    if (!process.env.GEMINI_API_KEY) return "";
    const ext = path.extname(filePath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
        ? "image/webp"
        : "application/octet-stream";
    const bytes = fs.readFileSync(filePath);
    const base64 = Buffer.from(bytes).toString("base64");
    const prompt =
      "Extract all clearly readable text from this resume image. Return ONLY the text, no extra commentary.";
    const res = await model().generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }, { inlineData: { data: base64, mimeType } }],
        },
      ],
    });
    const txt = res.response.text() || "";
    return txt.trim();
  } catch (e) {
    console.warn("Gemini image OCR failed:", e?.message || e);
    return "";
  }
}

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

  const strengths = [];
  const improvements = [];

  if (signals.projects) strengths.push("Shows projects built or developed");
  else improvements.push("Add 1–2 impact-driven projects with metrics");

  if (signals.internships)
    strengths.push("Includes internship/industry exposure");
  else improvements.push("Pursue internships or add practical experience");

  if (signals.impact) strengths.push("Uses quantified impact and action verbs");
  else improvements.push("Quantify outcomes (%, time saved, revenue, users)");

  if (signals.leadership)
    strengths.push("Demonstrates leadership or ownership");
  else improvements.push("Highlight leadership, ownership, or initiatives");

  if (signals.skills) strengths.push("Lists in-demand technical skills");
  else
    improvements.push("Add relevant technical skills aligned to target roles");

  return { score, signals, strengths, improvements };
}

async function scoreResumeWithGemini(resumeText) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  const scoringPrompt = `You are an expert technical recruiter. Read the resume text below and return a strict JSON object assessing candidate readiness for software/tech roles.

Rules:
- Output ONLY valid JSON. No backticks. No commentary.
- JSON shape:
  {
    "score": number,            // integer from 0 to 100
    "strengths": string[],      // 3-6 short bullets
    "improvements": string[]    // 3-6 short bullets
  }
- Weigh: technical skills depth, projects impact, internships/experience, quantified achievements, leadership/community, clarity.

Resume:
"""
${resumeText.slice(0, 12000)}
"""`;

  try {
    const res = await model().generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: scoringPrompt }],
        },
      ],
    });
    const txt = res.response.text();
    const firstBrace = txt.indexOf("{");
    const lastBrace = txt.lastIndexOf("}");
    const jsonSlice =
      firstBrace >= 0 && lastBrace >= 0
        ? txt.slice(firstBrace, lastBrace + 1)
        : txt;
    const parsed = JSON.parse(jsonSlice);
    if (typeof parsed.score === "number") {
      // Clamp
      parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
      parsed.strengths = Array.isArray(parsed.strengths)
        ? parsed.strengths
        : [];
      parsed.improvements = Array.isArray(parsed.improvements)
        ? parsed.improvements
        : [];
      return parsed;
    }
  } catch (e) {
    console.warn(
      "Gemini scoring failed, using heuristic fallback:",
      e?.message || e
    );
  }
  return null;
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
      // Primary: use pdftotext CLI
      try {
        extractedText = await new Promise((resolve, reject) => {
          execFile(
            "pdftotext",
            ["-layout", filePath, "-"],
            { maxBuffer: 20 * 1024 * 1024 },
            (err, stdout) => (err ? reject(err) : resolve(stdout || ""))
          );
        });
      } catch (e) {
        console.warn("pdftotext not available or failed:", e?.message || e);
        extractedText = "";
      }

      // Fallback: OCR via pdftoppm + tesseract.js (force with ENABLE_PDF_OCR=force)
      if (
        (process.env.ENABLE_PDF_OCR === "force" ||
          (extractedText || "").trim().length < 200) &&
        process.env.ENABLE_PDF_OCR !== "false"
      ) {
        try {
          const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdfocr-"));
          const outPrefix = path.join(tmpDir, "page");
          await new Promise((resolve, reject) => {
            execFile(
              "pdftoppm",
              ["-png", filePath, outPrefix],
              { maxBuffer: 20 * 1024 * 1024 },
              (err) => (err ? reject(err) : resolve(undefined))
            );
          });
          const images = fs
            .readdirSync(tmpDir)
            .filter((f) => /page-\d+\.png$/i.test(f))
            .map((f) => path.join(tmpDir, f));
          let ocrText = "";
          for (const img of images) {
            try {
              const ocr = await Tesseract.recognize(img, "eng", {
                logger: () => {},
              });
              if (ocr?.data?.text) ocrText += "\n" + ocr.data.text;
            } catch {}
          }
          if (
            process.env.ENABLE_PDF_OCR === "force"
              ? ocrText.trim().length > 0
              : ocrText.trim().length > (extractedText || "").trim().length
          ) {
            extractedText = ocrText;
          }
          // Cleanup temp images
          try {
            for (const img of images) fs.unlinkSync(img);
            fs.rmdirSync(tmpDir);
          } catch {}
        } catch (e) {
          console.warn(
            "PDF OCR fallback failed or pdftoppm not available:",
            e?.message || e
          );
        }
      }
    } else if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      try {
        const ocr = await Tesseract.recognize(filePath, "eng", {
          logger: () => {},
        });
        extractedText = ocr.data && ocr.data.text ? ocr.data.text : "";
      } catch (e) {
        console.warn(
          "OCR failed; extracted text will be empty:",
          e?.message || e
        );
        extractedText = "";
      }

      // Gemini Vision OCR fallback when Tesseract is weak
      if (
        (extractedText || "").trim().length < 100 &&
        process.env.GEMINI_API_KEY
      ) {
        const visionText = await extractTextWithGeminiImage(filePath);
        if (
          visionText &&
          visionText.trim().length > (extractedText || "").trim().length
        ) {
          extractedText = visionText;
        }
      }
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

    // Deterministic text-only scoring and report (no LLM at upload time)
    const heuristic = scoreResume(extractedText);
    const scoreObj = heuristic;

    function analyzeResume(text) {
      const lower = (text || "").toLowerCase();
      const has = (re) => re.test(text);
      const count = (re) => (lower.match(re) || []).length;

      const sectionPresence = {
        contact_info: /(email|phone|linkedin|github)\b/i.test(text),
        summary: /(summary|objective)\b/i.test(text),
        experience: /(experience|work experience|employment)\b/i.test(text),
        education: /(education|b\.tech|btech|bachelor|master|b\.e\.)\b/i.test(
          text
        ),
        skills: /(skills|technologies|technical skills)\b/i.test(text),
        projects: /(projects|project)\b/i.test(text),
        certifications: /(certification|certificate)\b/i.test(text),
      };

      const sectionScores = {
        contact_info: sectionPresence.contact_info ? 9 : 4,
        summary: sectionPresence.summary ? 7 : 4,
        experience: sectionPresence.experience ? 8 : 3,
        education: sectionPresence.education ? 9 : 5,
        skills: sectionPresence.skills ? 8 : 4,
        projects: sectionPresence.projects ? 8 : 3,
        certifications: sectionPresence.certifications ? 6 : 4,
      };

      const keywordList = [
        "react",
        "node",
        "typescript",
        "javascript",
        "python",
        "java",
        "aws",
        "docker",
        "kubernetes",
        "sql",
        "mongodb",
        "postgres",
        "ml",
        "ai",
        "data structures",
        "algorithms",
        "rest",
        "graphql",
      ];

      const keyword_density = Object.fromEntries(
        keywordList.map((k) => [
          k,
          count(
            new RegExp(
              `\\b${k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`,
              "g"
            )
          ),
        ])
      );

      const quantified =
        /(\d+%|percent|\\b\d+\\s*(users|ms|sec|minutes|hours|x|times|issues|tickets|revenue|sales))\b/i.test(
          text
        );

      const strengths = [...(scoreObj.strengths || [])];
      const improvements = [...(scoreObj.improvements || [])];
      if (quantified) strengths.push("Uses numbers/metrics to show impact");
      else
        improvements.push(
          "Add quantified impact (%, time saved, users, revenue)"
        );
      if (sectionPresence.projects) strengths.push("Has a projects section");
      else
        improvements.push(
          "Add a projects section with 2–3 concise bullets each"
        );
      if (sectionPresence.skills) strengths.push("Includes a skills section");
      else improvements.push("Add a concise, role-aligned skills section");

      const atsSignals = [
        sectionPresence.skills,
        sectionPresence.experience,
        sectionPresence.education,
        Object.values(keyword_density).some((v) => v > 0),
        quantified,
      ];
      const ats_score = Math.round(
        (atsSignals.reduce((a, b) => a + (b ? 1 : 0), 0) / atsSignals.length) *
          100
      );

      const overall_score = Math.round(
        (Object.values(sectionScores).reduce((a, b) => a + b, 0) /
          (Object.values(sectionScores).length * 10)) *
          10
      );

      return {
        overall_score,
        sections: sectionScores,
        ats_score,
        keyword_density,
        strengths,
        improvements,
      };
    }

    const report = analyzeResume(extractedText);

    // Persist a conversation context file
    const context = {
      resumeFile: path.basename(filePath),
      extractedFile: path.basename(extractedPath),
      extractedTextLength: extractedText.length,
      score: scoreObj,
      report,
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
      strengths: report.strengths || [],
      improvements: report.improvements || [],
      report,
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

    const result = await model().generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt + "\n\n" + userPrompt }],
        },
      ],
    });
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
