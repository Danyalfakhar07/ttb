# TTB Launch Experience

Cinematic product launch site for **Teayam Tasbihgou Botanicals (TTB)** — hero sequence, launch film section, and guided interest survey.

Built with Next.js 15, Framer Motion, GSAP, Lenis, and Tailwind CSS v4.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Next.js — use the default settings:
   - **Framework:** Next.js
   - **Build command:** `npm run build`
   - **Output:** Next.js default
4. Deploy.

Optional: add `public/video/launch-film.mp4` before deploy if you want the film section to play video (poster fallback works without it).

Survey responses are stored locally in `data/survey-responses.json` on the server (excluded from git). For production persistence, connect a database or external storage later.

## Project structure

- `src/components/` — hero, survey, loader, and UI
- `public/hero/` — hero slide images (desktop + mobile)
- `public/video/` — launch film asset
- `src/app/api/survey/` — survey submission API
