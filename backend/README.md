# HackOps Backend

Simple Express API powering AI Career Assistant features:

- Upload resume (PDF or image) → extract text → heuristic score
- Chat with Gemini 2.5 Pro with resume-aware context

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

- POST `/api/chat` (application/json)
  - body: `{ contextId?: string, message: string }`
  - uses resume context when `contextId` provided
  - returns: `{ reply }`

## Notes

- PDF text extraction via `pdf-parse`.
- Image uploads do not run OCR; the server adds a reminder prompt to extract details during chat.
