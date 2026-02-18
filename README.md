# Capybara Quotes

A tiny Next.js (App Router) + TypeScript PWA built for mobile. Tap the capybara card to rotate through a 30-image gallery and pull a new quote (calm + motivational pools).

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & run (production)

```bash
npm run build
npm run start
```

## PWA / offline / hot reload notes

- The service worker caches the app shell so the app works offline after the first successful load.
- Install the PWA via your browser (Install app / Add to Home Screen). The UI intentionally does not show an in-app install button.
- In development (`npm run dev`), the app unregisters any existing service worker and clears `capybara-quotes*` caches to avoid stale UI while iterating. Test PWA behavior using a production build.

## Images

- The gallery uses 30 images hosted on Wikimedia (`upload.wikimedia.org`) and is defined in `src/app/page.tsx` (`CAPYBARA_IMAGES`).
- If you add images from other hosts, update `next.config.mjs` (`images.remotePatterns`).

## Data persistence

- The last quote + image index are stored in `localStorage` under `capybara-quotes:last`.

## Project structure

- UI: `src/components/CapybaraCard.tsx`, `src/components/QuoteBox.tsx`
- Quotes: `src/lib/quotes.ts`
- Service worker: `public/sw.js`, `src/components/ServiceWorkerRegistration.tsx`

## Environment notes

- In the original setup environment, `node` and `npx` were not available.
- A `winget` install of Node.js was blocked by organization policy.
- If you see similar issues, install Node.js manually and retry `npm install`.
