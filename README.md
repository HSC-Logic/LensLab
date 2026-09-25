# LensLab

LensLab is a client-side, interactive photography and lens simulator. It combines a visual scene, educational camera preview, depth-of-field mathematics, field-of-view guidance, comparison tools, presets, saved setups, and shareable URLs.

## Phase 1 features

- Full depth-of-field, hyperfocal, crop-factor, equivalent-focal-length, field-of-view, and diffraction guidance
- Responsive interactive scene with draggable subject and educational camera preview
- Beginner and advanced modes, metric and imperial units, light/dark/system themes
- Sensor presets plus validated custom sensors
- Photography presets, undo/redo, hyperfocal focus action
- Side-by-side setup comparison
- Versioned local saved setups with rename, duplicate, load, and delete
- Compact, validated shareable URL state

## Screenshots

Screenshots will be added after the first public deployment.

## Install and develop

```bash
npm install
npm run dev
```

## Test and build

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

The Vite build uses `/LensLab/` as its production base and is ready for GitHub Pages. Pushes to `main` deploy through `.github/workflows/deploy.yml`.

## Architecture

The React UI consumes a framework-independent TypeScript optics engine. A reducer owns simulator history and comparison state. Browser adapters isolate URL and local-storage persistence. See [Architecture](docs/ARCHITECTURE.md), [Optics engine](docs/OPTICS_ENGINE.md), and [Testing](docs/TESTING.md).

## Optics disclaimer

LensLab uses standard thin-lens depth-of-field and rectilinear field-of-view formulas. Circle-of-confusion and diffraction thresholds are viewing-condition assumptions, not universal boundaries. The preview is educational, not a physical lens rendering.

## Roadmap

Phase 1 is implemented. Future work is documented only: [Phase 2](docs/PHASE_2.md) and [Phase 3](docs/PHASE_3.md).
