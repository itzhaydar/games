# FounderLife · Phase 1

A browser game beginning: cinematic welcome, six-region atlas, identity selection, illustrated founder preview, and an interactive 3D studio. All project files live inside `games/founderlife`; the repository root is unchanged.

## Run

Node.js 22.12+ (or 24 LTS), npm, and a modern browser are recommended.

```sh
cd founderlife # from the games checkout
npm install
npm run dev
```

For repeatable installs use `npm ci`. If your cloud user has no writable npm cache, use `npm ci --cache .npm-cache`. Build with `npm run build`; serve the production build with `npm run preview`. Output: `dist/`.

## Controls and saves

Choose **Begin Your Journey**, a continent, a presentation, then **Start FounderLife**. Back preserves choices. Return to the main menu to continue or restart; restart asks before clearing onboarding and preserves graphics/motion settings. Settings are available on every screen. Browser back/forward works. Region choices and buttons support keyboard Enter/Space and touch. Dialogs trap focus and close with Escape. The map has equivalent labeled selection buttons.

In the studio, drag to orbit, pinch/scroll to zoom, and click the desk or use **Open your desk**. There is no character movement, business simulation, audio, or account system in this phase. Progress is local to this browser and origin, not synced. Invalid or corrupted saves recover safely. Storage failures show a session-only warning.

## Architecture

- `src/App.tsx`: application shell and dialogs. `src/screens/`: individual onboarding/game screens; `src/state/navigation.ts`: guarded browser-history routes.
- `src/state/store.ts`: typed Zustand state, validated version-1 local storage, settings and reset.
- `src/components/`: original vector city, stylized atlas and character concepts; `CharacterPreview.tsx` defines the future licensed model slot. Region provides context and accent only; it never selects ethnicity. Presentation presets do not constrain future appearance.
- `src/game/Studio.tsx`: lazy React Three Fiber scene and WebGL/error fallback. On-demand rendering, capped DPR, no postprocessing or external model downloads. R3F disposes declarative scene resources when unmounted. Controls are cleaned up by Drei; the canvas is unmounted on exit. The temporary WebGL probe explicitly releases its context.
- `src/styles.css`: shared tokens, responsive compositions, reduced-motion rules.
- `tests/`: persistence unit tests and desktop/mobile end-to-end tests.

The welcome and character concepts are original SVG illustrations, not rendered photorealistic assets. Only the studio is 3D. Fonts are bundled locally; no Google Fonts requests, API keys, external image hosts, database, or backend are required. The initial application JS is separate from the lazy atlas and the larger Three.js studio chunk; 3D is loaded only at game entry. Vite may warn about the size of that lazy 3D chunk; it is not part of the welcome download. No FPS guarantee is made.

## Checks

```sh
npm test
npx playwright install chromium
npx playwright test
```

Use `PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/chromium npx playwright test` when a system browser is already installed. Browser tests use a single worker for modest memory usage. Test images/results go to ignored `test-results/`. Software WebGL is enabled for headless CI only, not for the application renderer.

Manual review: complete all screens; switch region/presentation; navigate backward; refresh `/begin/founder` and `/journey`; continue after reopening; cancel and confirm restart; use Tab/Enter/Escape; test a narrow phone and landscape; orbit/zoom and open the studio desk; compare graphics settings; enable reduced motion; disable WebGL to review fallback. Check representative physical low-end hardware before making performance claims.

## Vercel deployment — important monorepo setting

1. Push this project folder to your GitHub `games` repository.
2. Import that repository into Vercel.
3. Set **Root Directory to `founderlife`**. Do not use the repository root.
4. Choose **Vite**. Install: `npm ci`; Build: `npm run build`; Output: `dist`.
5. Deploy. No environment variables are needed.

`founderlife/vercel.json` includes the build/output configuration and a rewrite of extensionless application paths to `/index.html`. This supports direct links and refreshes at `/begin/region`, `/begin/identity`, `/begin/founder`, `/journey`, and other extensionless paths. Static assets retain their normal paths. Unknown routes (for example `/hangar`) intentionally show the main menu; there is no hangar feature in Phase 1. A new browser with no saved onboarding is redirected in application state to a safe entry screen when visiting a protected step.

After deployment, verify those URLs with a hard refresh on the actual Vercel domain. Local Vite fallback checks do not prove Vercel publication. No production deployment has been performed by this implementation.

## Assets and licensing

City, character art and studio geometry are original project artwork. Atlas coastlines derive from public-domain Natural Earth data; see [ASSETS.md](ASSETS.md). The atlas is a stylized selection illustration, not a geographical reference. DM Sans and Playfair Display are distributed through Fontsource under the SIL Open Font License; license texts are in their installed packages. Lucide icons are ISC licensed. No third-party character model is included. Review dependency notices before commercial distribution.

See [ROADMAP.md](ROADMAP.md) for phase boundaries and completion status.
