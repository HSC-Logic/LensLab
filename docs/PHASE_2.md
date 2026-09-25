# LensLab Phase 2 — Exposure & Real Camera/Lens Simulation

## Objectives and user stories

Phase 2 adds exposure planning and maintainable real-equipment data while preserving offline, account-free use. Photographers can balance aperture, shutter speed, and ISO; inspect educational motion/noise previews; choose compatible cameras and zoom lenses; use a local image; organize richer presets; and export a shareable or printable summary.

Core stories: freeze or express motion with an explained shutter-speed choice; understand ISO tradeoffs without mistaking a preview for a camera benchmark; select a camera and see compatible mount lenses; move within a zoom range and respect variable aperture/minimum-focus constraints; upload an image that remains local; export the current setup; install LensLab as an offline PWA; find saved setups through folders, favorites, tags, and search; compare more than two configurations.

## Architecture changes

- Add a versioned domain layer for exposure values, camera bodies, lens models, mounts, zoom ranges, aperture curves, and minimum focus distance.
- Keep catalog JSON/data modules separate from UI. Add schema validation and provenance/version metadata.
- Extend `Setup` through composition with `ExposureSettings` and optional equipment IDs; keep raw optical inputs available for custom equipment.
- Add workers or incremental rendering only if measured preview work blocks interaction.
- Add service worker, web app manifest, migration runner, and export renderer behind small adapters.

## Data models and components

`CameraBody`: manufacturer, model, sensor dimensions/format, resolution, mount. `LensModel`: manufacturer, model, mounts, minimum/maximum focal length, minimum/maximum aperture across zoom range, minimum focus distance. `ExposureSettings`: shutter seconds, ISO, exposure compensation. Catalog components provide search and compatibility filters; exposure controls provide stop-based inputs; preview layers separately model motion, noise, and blur; export creates an image, printable summary, and share card.

## Dependencies and migration

Prefer browser Canvas, IndexedDB, and service-worker APIs. Add a schema validator only if catalog size makes hand validation unsafe. Saved schema v2 migrates Phase 1 setup records by adding optional exposure/equipment fields and collection metadata. Unknown IDs remain readable as custom setups.

## Testing requirements

Test stop equivalence, shutter formatting, exposure-value boundaries, variable-aperture interpolation, compatibility filtering, minimum-focus warnings, corrupt catalog entries, migrations, offline startup, local-image privacy, export fidelity, installability, and multi-setup comparison. Add visual regressions for motion/noise states and representative mobile layouts.

## Performance, accessibility, security, privacy

Lazy-load catalogs and export code; decode uploaded images off the main path where supported; cap input dimensions; revoke object URLs. Motion/noise previews need text equivalents and reduced-motion alternatives. All controls need keyboard operation and announced relationships. Images remain local by default, with explicit consent before any future upload. Strip metadata from exports where practical; validate decoded files; set a restrictive CSP.

## Acceptance criteria

Exposure relationships remain correct within one-third stop; camera/lens data is searchable, source-versioned, and not embedded in components; compatibility and lens constraints are enforced without blocking custom setups; uploaded images never leave the device; exports match visible settings; PWA works offline after first load; saved Phase 1 records migrate losslessly; lint, unit, component, E2E, accessibility, offline, and performance checks pass.
