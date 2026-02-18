# Changelog

All notable changes to this project will be documented in this file.

## 2026-02-18T05:25:34Z

### Changed

- Refreshed the UI typography and layout for a more modern, mobile-first presentation.
- Simplified the main screen by removing extra UI elements (no in-app install button, no "new photo" badge, no photo-count label).
- Kept the capybara gallery at 30 images, sourced from Wikimedia (`upload.wikimedia.org`).
- Reworked the quote box so quotes stay contained on mobile (no overflow) with tighter, cleaner spacing.

### Fixed

- Reduced dev-time "stale UI" issues by unregistering the service worker and clearing `capybara-quotes*` caches when running `next dev`.
- Updated the service worker fetch strategy for navigations to be network-first, so new deployments show up immediately.

