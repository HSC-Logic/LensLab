# Architecture

LensLab is a static React/TypeScript/Vite application. The architecture keeps optical calculations independent from presentation and browser APIs.

## Layers

- `src/engine/optics`: pure functions, millimetres internally, no React or browser dependencies.
- `src/data`: sensor and photography starting-point data.
- `src/components`: focused visual and input components.
- `src/utils`: formatting, URL serialization, and versioned storage adapters.
- `src/App.tsx`: reducer-backed orchestration, undo/redo history, comparison, preferences, and persistence.

The `Setup` type deliberately describes an optical setup rather than a specific physical prime lens. Future zoom, exposure, camera, lens, and project entities can wrap it without changing the engine.

## State and data flow

Controls dispatch complete setup snapshots to a bounded reducer history. Memoized selectors resolve the sensor and calculate optics. All three views—preview, scene, and results—consume the same result, preventing state drift. Comparison owns a second independent setup. Saved setups use a versioned storage key; URL state uses small validated parameters.

## Browser and deployment

No backend is required. Local storage failures degrade to session state. Vite builds with the `/LensLab/` GitHub Pages base. The workflow runs lint, unit tests, and build before deployment.

## Accessibility and performance

Native inputs preserve keyboard behavior. Graphics expose textual alternatives. Focus indicators, semantic landmarks, large touch controls, non-color labels, and reduced-motion support target WCAG 2.2 AA. The scene uses SVG; the preview uses CSS. No large rendering dependency is needed.
