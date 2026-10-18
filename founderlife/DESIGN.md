# V1 game interface and workstation

## Direction and references

The previous editorial skyline and serif headline were replaced by a rendered 3D courtyard, a prominent sans-serif title, a short game menu and compact selection consoles. A small scene makes a stronger, more affordable backdrop than an unfinished city. No artwork, branding, layouts or character assets from other games are included.

Design lenses: The Sims' separation of identity/presentation from play; inZOI's emphasis on the character; GTA V's world-dominant framing and sparse HUD; Detroit: Become Human's restrained cinematic menus. These are qualitative inspiration, not claims of equivalent production quality. Direct research of EA's official site was attempted but blocked by this workspace's outbound policy; no claim is made that current versions of those games were inspected here.

Technical documentation consulted:

- MDN iframe reference, particularly sandbox flags, same-origin restrictions and the fact that an iframe `load` event fires even on failure: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe . Read via MDN's official content repository: https://github.com/mdn/content/blob/main/files/en-us/web/html/reference/elements/iframe/index.md
- Drei HTML transforms and occlusion documentation: https://github.com/pmndrs/drei/blob/master/docs/misc/html.mdx . The implementation uses its own camera-projected DOM overlay rather than adding another renderer or requiring a WebGL website texture.

## Milestone A

An original small urban courtyard: textured architectural facades, deep window frames, storefront, pavement, road, benches, trees, a parked car, sunrise lighting and restrained camera motion. New Game, saved Continue and Settings replace marketing CTAs. Arrow keys/Home/End navigate the menu; all controls also support Tab, Enter and touch. Region geography and all saved choices remain independent of appearance. Character creation still honestly labels its original illustrated concepts.

The game HUD separates player/location/session time from interaction prompts. Balance is an optional typed prop and is not shown without an implemented economy. No fake business notifications are displayed. The clock starts at 08:00 in each studio session and advances one minute per real minute.

## Milestone B

The workstation is part of a real 3D room. An original articulated temporary figure moves to the chair and interpolates to a seated pose; its forearms extend toward the keyboard. This is a pose rig, not skinned motion-captured animation or a realistic human asset. A GLB/animation-mixer implementation may replace the pose contract later, only when that separate phase is authorized.

States: exploring → approaching → sitting → viewing → working → exiting → exploring. The E interaction handler exists only while exploring and is removed before work mode. There are no iframe keystroke listeners or script injection. Reduced-motion preferences shorten the sequence and snap the camera/pose.

The DOM surface is transformed onto the actual 3D monitor using a four-corner homography from the current camera. Camera matrices update before projection. Activating work always opens a native-pixel enlarged display and waits for camera alignment before enabling input. Scaled/projective iframes showed inconsistent browser hit-testing during validation, so the perspective surface is deliberately read-only. Restoring the monitor view pauses work input and keeps the current page. The enlarged display keeps address and exit controls available. The iframe DOM node stays mounted when enlarging/restoring, so notes, navigation and form state survive. All devices automatically enlarge on activation. Exiting unmounts the iframe, releases work input and returns focus to the approach control.

## Browser contract

- Full HTTPS or ordinary domain input; HTTPS is normalized using `URL`.
- Reject credentials, unsafe schemes, IP literals, private-style hostnames and nonstandard ports. These are hostname checks, not a DNS validation service. There is no server fetcher or proxy.
- Sandbox permits scripts and forms only. It intentionally omits `allow-same-origin`, top navigation, popups, downloads, pointer lock and device permissions. Browser session/login/storage-dependent sites may fail. OAuth, payments, DRM, browser extensions, native shortcuts and full browser chrome are not promised.
- No referrer; new-tab fallback uses `noopener noreferrer`. No URL or interaction analytics.
- Only the submitted URL is persisted. External sites are not automatically loaded when reopening the desk. Scratchpad/website contents and keystrokes are not persisted or read by FounderLife.
- The displayed address is the submitted address, not a monitored cross-origin location. Previous/next navigate the list of submitted addresses, not a third-party page's inaccessible internal history. Reload restarts the submitted address.
- No `load` event is treated as success. The console always states that embedding is unverified. `Website not visible?` exposes a manual restriction fallback; its wording is explicitly conditional on the player seeing a blank/blocked page. Browser refusal headers remain intact. No bypass, reverse proxy or page scraping exists.
- The bundled practice page is locally authored and exercises real inputs, links, scrolling, checkboxes and buttons inside the same sandbox. Tests also fulfill an independent HTTPS origin and a page with CSP/X-Frame-Options denial.

No sound is required or included. This upgrade does not implement Phase 2's realistic creator, city exploration, economics, accounts or cloud saves.
