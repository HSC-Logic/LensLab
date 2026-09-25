# LensLab Phase 3 — Advanced Photography & Cinematography Planning Platform

## Vision and major epics

Phase 3 evolves LensLab into a project-based shot-planning platform while keeping the core simulator usable offline. Epics: advanced optical visualization; optional 3D scene; cinematography framing; focus-pull planning; multi-shot projects and storyboards; professional equipment/location notes; privacy-reviewed sun planning; optional collaboration/sync; AR feasibility; native-platform evaluation.

## User stories

Photographers can explore aperture-blade shape, cat-eye tendencies, foreground/background blur, focus breathing, and lens-compression education with explicit approximation labels. Filmmakers can choose 16:9, 2.39:1, 4:3, 1.85:1, 9:16, open-gate and frame guides; plan focus points A/B and animate a transition; save ordered shots with camera, lens, distance, aperture, lighting, filters, flash, location, time, and notes; arrange simulator frames into a storyboard. Teams may share a project with photographer, second shooter, or videographer roles.

## Architecture evolution

Keep the pure optics package; add a simulation boundary supporting progressively enhanced Canvas/WebGL renderers. Three.js/React Three Fiber is justified only after a prototype demonstrates useful camera, subject, background, focus-plane, DoF-volume, and FoV-cone interaction that SVG cannot provide. A project aggregate owns shots and storyboards. A local repository remains authoritative in offline mode; optional sync uses operation IDs, revisions, conflict records, and background queues.

## Backend and data model

Backend is optional and separately deployable. If approved: authenticated API, relational project/shot/membership data, object storage for user assets, signed upload URLs, audit events, deletion/export workflows, rate limiting, backups, and regional/privacy review. Entities: User, Project, Membership, Shot, SceneObject, FocusTransition, StoryboardFrame, EquipmentItem, LocationPlan, Asset, SyncRevision. Phase 1/2 local IDs remain valid and migrate through explicit schema versions.

## Cinematography and focus planning

Aspect ratio and sensor mode alter frame guides, not the optical formula silently. Focus pulls store calibrated A/B distances, duration, curve, and lens breathing metadata when known. Animation communicates approximate framing and focus change; it does not claim repeatable marks for an uncalibrated physical lens.

## Location, AR, and native direction

Sunrise, sunset, golden-hour, blue-hour, and sun-direction work requires timezone/geolocation accuracy, API cost, offline behavior, and privacy review before choosing a provider. Mobile AR distance/FoV estimation begins as a research spike with supported-device/error-range documentation; no accuracy promise precedes validation. Evaluate PWA first, then Capacitor for native wrappers, then React Native only if camera/AR performance and platform UX justify a separate UI stack.

## Security and privacy

Use least-privilege project roles, encrypted transport/storage, secure session rotation, CSP, content validation, asset scanning, private-by-default projects, revocable share links, audit logs, retention controls, account export/deletion, and explicit location/image consent. Threat-model collaboration, uploads, public links, sync conflicts, and third-party APIs before implementation.

## Performance, testing, deployment

Set budgets for main-thread time, WebGL memory, bundle size, battery use, sync latency, and large projects. Test optics parity, renderer fallbacks, focus timelines, frame guides, project ordering, offline edits, conflict resolution, permissions, deletion, asset handling, browser/device GPU tiers, accessibility alternatives, and recovery from network loss. Deploy frontend and optional backend independently with staged migrations, feature flags, telemetry consent, canaries, backups, and rollback plans.

## Risks and dependencies

Main risks: misleading optical realism, GPU/device variance, large asset storage, sync conflicts, catalog licensing, location privacy, API cost, AR inaccuracy, and native fragmentation. Dependencies require prototypes, legal/data review, measured performance, and explicit accuracy labels.

## Acceptance criteria

Projects remain usable offline; 3D is optional with an accessible 2D/text fallback; cinematography guides and focus plans are numerically tested; storyboard and shot metadata export cleanly; collaboration permissions and conflicts are verified; location and AR features ship only after privacy/accuracy review; migrations preserve all prior saved setups; security, accessibility, performance, cross-device, recovery, and deployment tests pass.
