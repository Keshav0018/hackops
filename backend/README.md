# HackOps Backend

Simple Express API powering AI Career Assistant features:

- Upload resume (PDF or image) → extract text → heuristic score
- Chat with Gemini 2.5 Pro with resume-aware context
- Image OCR (PNG/JPG/JPEG/WEBP) via Tesseract.js

## Setup

1. Node 18+ recommended.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
PORT=4000
```

> If `GEMINI_API_KEY` is omitted, the API returns a dev fallback message for chat.

4. Run the server:

```bash
npm run dev
```

Server runs at http://localhost:4000

## Endpoints

- POST `/api/upload-resume` (multipart/form-data)

  - field: `file` (pdf, png, jpg, jpeg, webp)
  - returns: `{ contextId, score, signals }`
  - stores files under `data/uploads/` and extracted text under `data/extracted/`
  - behavior:
    - PDF: parsed with `pdf-parse` (dynamic import with graceful fallback)
    - Image: OCR with `tesseract.js` (English language)

- POST `/api/chat` (application/json)
  - body: `{ contextId?: string, message: string }`
  - uses resume context when `contextId` provided
  - returns: `{ reply }`

## Notes

- PDF text extraction via `pdf-parse`.
- Image OCR via `tesseract.js`. Tips for best OCR results:
  - Prefer high-resolution images with good lighting and contrast
  - Avoid skew/rotation and heavy compression
  - Supported formats: png, jpg, jpeg, webp
  - If OCR fails, the API falls back to a placeholder and will ask user for details during chat
- Resume scoring primarily uses Gemini 2.5 Pro. If the model/API fails, score falls back to a heuristic.

## Performance

- OCR can be CPU-intensive. For heavy use, consider running with more CPU or using a worker queue. You can also switch to a native OCR (e.g., Tesseract CLI) or a managed OCR API.
