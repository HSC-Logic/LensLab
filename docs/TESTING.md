# Testing

## Commands

```bash
npm run lint
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
```

Vitest covers the pure optics engine, conversions, formatting, URL validation, and principal UI controls. Playwright covers application load, control updates, advanced results, comparison, invalid-safe URL loading, and horizontal-overflow checks at 320×568, 390×844, 768×1024, 1440×900, and 1920×1080. Manual QA should additionally inspect 375×667, 430×932, 1024×768, and 1280×720, plus drag, keyboard slider use, theme contrast, saved-setup lifecycle, and reduced motion.
