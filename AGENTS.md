# AGENTS.md

## Project Context

- Project: Capybara Quotes (Next.js App Router + TypeScript PWA).
- Goal: Mobile-friendly app with two capybara images, separate quote pools, smooth quote animation, offline support, and PWA install.
- Structure: `src/components/CapybaraCard.tsx`, `src/components/QuoteBox.tsx`, `src/lib/quotes.ts`.

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
