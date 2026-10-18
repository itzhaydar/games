# Phase 1 verification

## Verified in the cloud workspace

- A repeatable `npm ci --cache .npm-cache` clean install, TypeScript checking and production Vite build pass.
- Six Vitest tests pass: invalid/corrupted/missing save recovery, required selections, valid saved settings, and Vercel route/static-asset matching.
- Eight Playwright tests pass in system Chromium, using a single worker: desktop and mobile full onboarding, disabled continue states, back navigation and preserved selections, deep-link reload, completion, real studio canvas rendering, desk interaction, main-menu continue, settings persistence, confirmed restart, keyboard selection, corrupted saves, explicit WebGL-unavailable fallback, and 320px-wide layout checks.
- Full-flow tests observed no uncaught browser page errors.
- A separate browser smoke test against the built production output passed nested-route refresh, guarded game entry, rendered WebGL canvas, regional desk interaction and unknown-route fallback, with no failed HTTP responses or uncaught browser errors.
- Desktop welcome/studio and mobile region screenshots were inspected. A mobile focus-scroll offset found in the first review was corrected.
- Only the `founderlife/` directory was added; the existing root README and tracked repository files were not changed.

Browser tests emulate viewport/touch conditions; they are not a physical phone or low-memory PC benchmark. The studio uses software WebGL in headless testing. No FPS is claimed.

## Deliberate Phase 1 limits

- Character previews are original illustrations, explicitly labeled as concepts; realistic 3D characters are reserved for Phase 2.
- The small 3D room has orbit/zoom and desk interaction; there is no walking, city exploration or business simulation.
- Progress/settings use local browser storage only. No account, backend, cloud save or audio.
- Vite emits a size warning for the lazy Three.js scene chunk (roughly 244 KB gzip). It is loaded at journey entry, separately from the approximately 79 KB gzip main JS and the approximately 32 KB gzip lazy atlas. These are build sizes, not measured network timings or hardware performance.
- Vercel configuration is included and route matching is tested locally. A real Vercel deployment and production-domain refresh check have not been performed.

## Manual acceptance before public release

Complete the flow with each continent and presentation, compare graphics modes on actual hardware, check keyboard/screen reader and reduced-motion behavior, and hard-refresh the deployed `/begin/founder` and `/journey` URLs. Confirm `founderlife` is the Vercel Root Directory.

Phases 2–5 remain unimplemented and require explicit authorization.
