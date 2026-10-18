# FounderLife · V1

A browser simulation opening with a rendered 3D title courtyard, persistent region/presentation onboarding, founder concept preview, 3D studio and functional **Founder Workstation**. All project files remain in `games/founderlife/`.

## Run

Node.js 22.12+ or 24 LTS and npm:

```sh
cd founderlife # from the games checkout
npm install
npm run dev
```

Repeatable install: `npm ci`. If the cloud user's default npm cache is not writable, use `npm ci --cache .npm-cache`. Production: `npm run build`, then `npm run preview`. Output is `dist/`.

## Play

**New Game** opens onboarding. Select a continent and presentation, review the founder concept and choose **Start FounderLife**. Choices survive back navigation and reload. **Continue** appears only when saved region progress exists. New Game asks before resetting existing onboarding; graphics and motion settings stay intact. Keyboard: Tab/Enter/Space; the main menu also supports arrows/Home/End. Settings are available throughout.

The studio's **Approach workstation** button (or E while exploring) moves the temporary 3D pose rig to the desk and adjusts the camera. The figure is an original temporary mannequin/presentation rig, not a realistic or fully animated character. Onboarding art remains explicitly illustrated. Region never determines ethnicity.

At the computer:

1. Try the included local practice page, or enter an HTTPS website and select **Load Website**. Ordinary domains normalize to HTTPS. The last valid submitted address is stored locally.
2. Select **Activate Keyboard for Work**. The same monitor surface expands to a native-pixel reading view, pointer input is enabled after camera alignment, and the iframe is focused where the browser permits. Game shortcuts are removed during workstation interaction.
3. Type into fields, click buttons/links, Tab and scroll on compatible pages. The same iframe survives enlarging/restoring. **Restore monitor view** returns to a read-only perspective preview and pauses work input; activating again keeps your current page and form state. Live interaction intentionally uses the enlarged view to avoid browser hit-testing errors in scaled iframes.
4. **Exit Work Mode** stays available outside the iframe, including on its monitor chrome. It restores the camera/standing state and focus to the approach control. The last submitted URL remains available, but external sites are not automatically fetched when reopening the desk.

WebGL-unavailable devices retain onboarding and an enlarged accessible workstation view. Graphics settings control shadows/antialiasing. DPR adapts to device pixel density and viewport size within low/medium/high pixel budgets. Reduced-motion preferences snap movement. Three.js renders on demand; title camera animation is throttled, stops in hidden tabs and is disabled at low quality or with reduced motion. GPU resources, textures, timers and event listeners are cleaned up. No FPS is claimed.

## Website compatibility and privacy

Not every website permits embedding. FounderLife respects X-Frame-Options, CSP, same-origin rules and sandbox restrictions. A frame load event is **not** proof of success. The console always says embedding is unverified. Use **Website not visible?** for **Open in Browser**, **Try Another URL**, and **Return to Game**. Nothing strips restrictions or proxies external pages.

The iframe allows scripts and forms, but deliberately does not grant same-origin access, popups, downloads, top navigation or camera/microphone/location/clipboard permissions. Sites that require cookies, local storage, login redirects, payment flows or broader permissions can break. Native browser shortcuts and a full browser UI are not promised. See [DESIGN.md](DESIGN.md) for the detailed browser contract.

FounderLife does not read external page contents, collect passwords, inject code or record iframe keystrokes. Only the submitted URL is saved; it may include a query string you enter, so avoid sensitive links. Existing onboarding uses the unchanged `founderlife.v1` save key. Workstation URLs use a separate validated key. Progress is local to this browser/origin. No account, server, API key, paid service or database is required.

## Source layout

- `src/App.tsx`: application shell, guarded history navigation, settings and reset confirmation.
- `src/screens/`: menu, onboarding and studio composition.
- `src/state/`: original compatible save validation, regions and routes.
- `src/game/UrbanWorld.tsx`: original 3D title courtyard.
- `src/game/SceneCanvas.tsx`: shared renderer quality, WebGL detection and cleanup.
- `src/game/Studio.tsx`, `WorkstationRoom.tsx`, `FounderPose.tsx`: studio, camera/pose transition and monitor projection.
- `src/workstation/`: state machine, URL validation/persistence, address console, perspective math and sandboxed live iframe.
- `public/workstation/practice.html`: self-contained interactive practice website.
- `src/components/`: shared HUD, atlas, scene boundary and honest character concept system.
- `tests/`: URL/state/projection/persistence/routing tests and desktop/mobile interaction tests.

Assets and licenses: [ASSETS.md](ASSETS.md). Roadmap boundaries: [ROADMAP.md](ROADMAP.md). Verification and limitations: [QA.md](QA.md).

## Test

```sh
npm test
npx playwright install chromium
npx playwright test
```

When system Chromium is present: `PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/chromium npx playwright test`. Tests use one worker, low graphics and reduced motion to avoid burdening modest development machines. Browser tests use locally controlled pages and Playwright-intercepted HTTPS fixtures; they do not depend on a third-party site being online. Headless software WebGL is a correctness check, not a hardware benchmark. Ignored screenshots/results are in `test-results/`.

## Vercel

1. Import `itzhaydar/games` into Vercel, or allow the already-connected project to rebuild after the push.
2. **Root Directory: `founderlife`** (not the repository root).
3. Framework: **Vite**. Install: `npm ci`. Build: `npm run build`. Output: `dist`.
4. No environment variables are needed. Deploy, then verify the actual HTTPS domain.

`vercel.json` preserves SPA rewrites for extensionless routes. Hard-refresh `/begin/region`, `/begin/identity`, `/begin/founder` and `/journey`. Unknown routes such as `/hangar` show the main menu; there is no hangar feature. Protected steps safely recover when progress is absent. Static assets, including the practice page, retain normal paths.

Vercel publication and external-site compatibility on the deployed origin must be verified there. A Git push or local preview is not proof of deployment.
