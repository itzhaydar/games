# V1 verification — game UI and Founder Workstation

## Passed

- Clean `npm ci --cache .npm-cache --no-audit --no-fund` installation using the committed lockfile.
- TypeScript checking and production Vite build.
- **28 Vitest tests**: compatible original save validation, required onboarding choices, safe HTTPS normalization/rejection, interaction-state ownership/cancellation, perspective corner mapping, adaptive pixel budgets and Vercel application/static-asset route matching.
- **20 Playwright tests, all passing in one final run**: desktop/mobile onboarding, back/reload/persistence, disabled states, Continue/New Game, restart/settings, corrupted-save recovery, 320px layouts, actual rendered title/studio canvases, menu arrow navigation, graphics changes, WebGL-unavailable fallback, local practice page, controlled independent HTTPS page, actual keyboard/Tab/pointer/button/checkbox/link/scroll interactions, input ownership, address history and saved URL, enlarged/restored iframe state, exit/focus restoration, browser-back cleanup and deliberately denied embeds.
- The denied-page fixture sends both `X-Frame-Options: DENY` and `Content-Security-Policy: frame-ancestors 'none'`; Chromium's refusal is observed. The application does not mistake its load event for success. Tests explicitly invoke the manual fallback, verify its external link protections and test recovery.
- A separate **production-output browser smoke test** passes nested route refresh, the non-reduced-motion approach/seating/camera sequence, real iframe typing/clicking, visible exit, saved Continue and static assets. It observed no uncaught page errors or failed HTTP responses.
- Original onboarding storage and routes are preserved. Repository-root files are unchanged; the update stays inside `founderlife/`.

## Visual and input review

Desktop title/studio and desktop/mobile workstation screenshots were inspected. Scaled iframe input showed inconsistent browser hit testing during development. The final design uses a camera-projected **read-only live preview**, then automatically expands the same DOM iframe to a **native-pixel work view**. Restoring the perspective view pauses input without remounting the iframe. This behavior is tested rather than claiming arbitrary perspective browsing is reliable.

The title environment is actual original rendered 3D geometry. Character selection art is an explicitly labeled illustration. The studio character is an original temporary articulated pose rig; no realistic model or complete sitting/walking animation is claimed.

## Performance evidence and limits

- Renderer quality changes and buffer caps were exercised in Chromium. Adaptive budget math is tested, including a 4K viewport.
- The production smoke sample used a 1440 × 935 CSS studio viewport and a 1440 × 935 render buffer (effective DPR 1) on low quality.
- The main JS is about 81 KB gzip. The shared lazy Three.js/R3F renderer is about 238 KB gzip; the title scene, studio and atlas are separate chunks. Vite reports a size warning for the renderer chunk, not a build failure. A real 3D title screen necessarily loads that renderer after the initial shell.
- Headless Chromium uses software WebGL. Tests emulate mobile viewport/touch conditions; they are not physical-device benchmarks. No FPS, total memory usage or performance on a 4GB PC has been verified or promised.

## Browser and deployment limits

The iframe permits scripts/forms and uses an opaque sandbox origin with restricted permissions and no referrer. Some sites block framing or need unavailable storage/login/permissions; universal compatibility is not possible. External embedded page contents, navigation history and keyboard events are not inspected by FounderLife. Only the submitted URL is saved. There is no proxy, server-side fetch, header stripping, password collection or script injection.

Independent HTTPS and denied-site tests use locally controlled Playwright responses, not availability claims about public websites. Vercel routing configuration remains valid and local production refresh tests pass. **An actual Vercel deployment and live-origin external embedding check have not been performed.**

Before public release: review Safari/Firefox and physical phones, test a representative low-memory computer, hard-refresh deployed onboarding/journey routes, and test the intended external websites on the real HTTPS origin. Vercel Root Directory must remain `founderlife`.

No unrelated game phases were implemented.
