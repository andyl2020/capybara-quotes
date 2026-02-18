# AGENTS.md

## Project Context

- Project: Capybara Quotes (Next.js App Router + TypeScript + Tailwind PWA).
- UX: Mobile-first single-screen app. Tap the capybara gallery card to rotate among 30 images and pull a new quote.
- Quotes: Two pools (calm/motivation) are defined in `src/lib/quotes.ts`; the UI currently draws from the combined pool.
- Offline/PWA: `public/sw.js` + `src/components/ServiceWorkerRegistration.tsx`.

## Key Files

- `src/app/page.tsx` (CAPYBARA_IMAGES list, localStorage persistence, tap handler)
- `src/components/CapybaraCard.tsx`
- `src/components/QuoteBox.tsx`
- `src/lib/quotes.ts`
- `public/sw.js`
- `src/components/ServiceWorkerRegistration.tsx`

## Development Notes

- In dev (`npm run dev`), the app unregisters any existing service worker and clears `capybara-quotes*` caches to prevent stale UI while iterating.
- For PWA/offline testing, prefer `npm run build` + `npm run start` in a clean browser profile.

## Environment Notes

- On the original machine, `node`/`npx` were not available.
- Attempted `winget install OpenJS.NodeJS.LTS`, but it was blocked by organization policy.
- Because of that, `npm install`, `npm run dev`, and `npm run build` could not be executed in that environment.
- The repository is Git-ready and intended to run after Node.js (18+) is installed.

## Setup Reminder

```bash
npm install
npm run dev
npm run build
```
