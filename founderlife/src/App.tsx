import { useEffect, useRef, useState } from "react";
import { ArrowRight, Settings2, X, Check, Monitor } from "lucide-react";
import CityBackdrop from "./components/CityBackdrop";
import { useGame } from "./state/store";
import { routes, validScreen, type Screen } from "./state/navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import ContinentScreen from "./screens/ContinentScreen";
import GenderScreen from "./screens/GenderScreen";
import PreviewScreen from "./screens/PreviewScreen";
import JourneyScreen from "./screens/JourneyScreen";
const screens = {
  welcome: WelcomeScreen,
  continent: ContinentScreen,
  gender: GenderScreen,
  preview: PreviewScreen,
  journey: JourneyScreen,
};
export default function App() {
  const game = useGame();
  const [screen, setScreen] = useState<Screen>(validScreen);
  const [settings, setSettings] = useState(false);
  const [restart, setRestart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [desk, setDesk] = useState(false);
  const [note, setNote] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const go = (s: Screen) => {
    history.pushState({}, "", routes[s]);
    setScreen(s);
  };
  useEffect(() => {
    const pop = () => setScreen(validScreen());
    window.addEventListener("popstate", pop);
    return () => {
      window.removeEventListener("popstate", pop);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    heading.current?.focus();
  }, [screen]);
  const dialogOpen = settings || restart || desk;
  useEffect(() => {
    if (!dialogOpen) return;
    trigger.current = document.activeElement as HTMLElement;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.current?.querySelector<HTMLElement>("button,select,input")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSettings(false);
        setRestart(false);
        setDesk(false);
      }
      if (e.key === "Tab") {
        const items = modal.current?.querySelectorAll<HTMLElement>(
          "button,select,input",
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prior;
      document.removeEventListener("keydown", key);
      trigger.current?.focus();
    };
  }, [dialogOpen]);
  const start = () => {
    if (!game.continent || !game.gender) return;
    game.update({ complete: true });
    setLoading(true);
    timer.current = setTimeout(
      () => {
        setLoading(false);
        go("journey");
      },
      game.reducedMotion ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 50
        : 950,
    );
  };
  const ActiveScreen = screens[screen];
  return (
    <div
      className={`app screen-${screen} ${game.reducedMotion ? "reduce-motion" : ""}`}
    >
      <CityBackdrop />
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <button
          className="wordmark"
          onClick={() => go("welcome")}
          aria-label="FounderLife main menu"
        >
          <span className="brand-icon">
            F<span />
          </span>
          FOUNDER<span className="wordmark-light">LIFE</span>
          <sup>™</sup>
        </button>
        <div className="header-right">
          <span className="phase-label">
            THE BEGINNING <span> / </span> CHAPTER 01
          </span>
          <button
            className="icon-button"
            onClick={() => setSettings(true)}
            aria-label="Open settings"
          >
            <Settings2 size={19} />
          </button>
        </div>
      </header>
      <main key={screen} className="screen-content">
        <ActiveScreen
          game={game}
          heading={heading}
          go={go}
          start={start}
          setRestart={setRestart}
          setDesk={setDesk}
        />
      </main>
      <footer>
        <span>
          FOUNDERLIFE <span className="footer-separator">/</span> YOUR STORY, IN
          THE MAKING.
        </span>
        <span>
          PHASE 01 <span className="status-dot" /> EARLY ACCESS
        </span>
      </footer>
      {game.storageError && (
        <div className="save-warning" role="status">
          Browser storage is unavailable. Progress will last for this session
          only.
        </div>
      )}
      {loading && (
        <div className="loading-overlay" role="status">
          <span className="brand-icon">F</span>
          <span className="eyebrow">YOUR NEXT CHAPTER IS OPENING</span>
          <h2>
            Every great story starts
            <br />
            with a first step.
          </h2>
          <div className="loading-line" />
        </div>
      )}
      {dialogOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSettings(false);
              setRestart(false);
              setDesk(false);
            }
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            ref={modal}
          >
            <button
              className="icon-button close"
              aria-label="Close dialog"
              onClick={() => {
                setSettings(false);
                setRestart(false);
                setDesk(false);
              }}
            >
              <X size={20} />
            </button>
            {settings ? (
              <>
                <span className="eyebrow">MAKE YOURSELF AT HOME</span>
                <h2 id="dialog-title">Your settings.</h2>
                <label className="setting-row">
                  <span>
                    <Monitor size={18} /> Graphics quality
                  </span>
                  <select
                    value={game.quality}
                    onChange={(e) =>
                      game.update({
                        quality: e.target.value as typeof game.quality,
                      })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label className="setting-row">
                  <span>Reduce motion</span>
                  <input
                    type="checkbox"
                    checked={game.reducedMotion}
                    onChange={(e) =>
                      game.update({ reducedMotion: e.target.checked })
                    }
                  />
                </label>
                <p className="fine-print">
                  Low quality uses fewer pixels and disables antialiasing.
                  System reduced-motion preferences are always respected. No
                  audio is included in Phase 1.
                </p>
                <button className="primary" onClick={() => setSettings(false)}>
                  Done
                  <Check size={17} />
                </button>
              </>
            ) : restart ? (
              <>
                <span className="eyebrow">A FRESH PAGE</span>
                <h2 id="dialog-title">Begin again?</h2>
                <p>
                  This resets your region, presentation and onboarding progress
                  on this browser. Your settings stay the same.
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    game.restart();
                    setRestart(false);
                    setNote(false);
                    go("continent");
                  }}
                >
                  Start a new journey
                  <ArrowRight size={18} />
                </button>
                <button
                  className="text-button"
                  onClick={() => setRestart(false)}
                >
                  Keep my journey
                </button>
              </>
            ) : (
              <>
                <span className="eyebrow">A NOTE TO YOUR FUTURE SELF</span>
                <h2 id="dialog-title">Start with a possibility.</h2>
                <p>
                  This is your first workspace in {game.continent}. Before the
                  company, the team, the late nights — there’s a single idea.
                </p>
                <div className="desk-note">
                  “What could I create that makes someone’s life a little
                  better?”
                </div>
                <p className="fine-print">
                  You’ve reached the end of Phase 1. Business creation and
                  simulation will arrive in Phase 4.
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    setNote(true);
                    setDesk(false);
                  }}
                >
                  Take it all in
                  <Check size={17} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {note && !dialogOpen && screen === "journey" && (
        <div className="note-status" role="status">
          <Check size={16} /> Your first step is taken. The rest is still to be
          written.
          <button onClick={() => setNote(false)} aria-label="Dismiss message">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
