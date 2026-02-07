# Capybara Quotes

A tiny Next.js PWA with two capybaras that each pull from a different quote pool. Tap a capybara to get a calm or motivational quote, with a smooth transition and offline support.

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Setup on a new machine

1. Install Node.js 18+ and npm.
2. Verify:

```bash
node -v
npm -v
```

3. Then install and run:

```bash
npm install
npm run dev
```

## Environment notes

- In the original setup environment, `node` and `npx` were not available.
- A `winget` install of Node.js was blocked by organization policy.
- If you see similar issues, install Node.js manually and retry `npm install`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & start

```bash
npm run build
npm run start
```

## PWA install

- Visit the app in a Chromium browser.
- Use the Install button in the header (when available) or the browser menu.

## Notes

- Quotes are stored in `localStorage` so the last viewed quote persists across refreshes and offline.
- Service worker caches the app shell and assets for offline use.

## Image credits (public domain)

- https://commons.wikimedia.org/wiki/File:Gfp-capybara.jpg
- https://commons.wikimedia.org/wiki/File:Gfp-capybara-2.jpg
