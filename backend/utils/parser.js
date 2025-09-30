import fs from "fs";
import os from "os";
import path from "path";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";
import pdfPoppler from "pdf-poppler";

function cleanText(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export async function parsePDF(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(buffer);
    return cleanText(pdfData.text || "");
  } catch (e) {
    return "";
  }
}

export async function parsePDFwithOCR(filePath) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdfocr-"));
  const outPrefix = path.join(tmpDir, "page");
  try {
    const opts = {
      format: "png",
      out_dir: tmpDir,
      out_prefix: "page",
      page: null,
      scale: 150,
    };
    await pdfPoppler.convert(filePath, opts);

    const images = fs
      .readdirSync(tmpDir)
      .filter((f) => /page-?\d+\.png$/i.test(f))
      .map((f) => path.join(tmpDir, f))
      .sort();

    let ocrText = "";
    for (const img of images) {
      try {
        const ocr = await Tesseract.recognize(img, "eng", { logger: () => {} });
        if (ocr?.data?.text) ocrText += "\n" + ocr.data.text;
      } catch {
        // continue
      }
    }
    return cleanText(ocrText);
  } catch (e) {
    return "";
  } finally {
    try {
      for (const f of fs.readdirSync(tmpDir)) {
        try {
          fs.unlinkSync(path.join(tmpDir, f));
        } catch {}
      }
      fs.rmdirSync(tmpDir);
    } catch {}
  }
}

export async function parseResumeText(filePath, minLength = 50) {
  const primary = await parsePDF(filePath);
  if ((primary || "").length >= minLength) return primary;
  const ocr = await parsePDFwithOCR(filePath);
  return ocr || primary || "";
}
