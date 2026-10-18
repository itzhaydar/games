import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { ArrowLeft, Monitor, Navigation, LogOut } from "lucide-react";
import GameHud from "../components/GameHud";
import { SceneBoundary } from "../components/SceneBoundary";
import { useWorkstation } from "../workstation/useWorkstation";
import { useBrowser } from "../workstation/useBrowser";
import BrowserConsole from "../workstation/BrowserConsole";
import MonitorSurface from "../workstation/MonitorSurface";
import type { ScreenProps } from "./types";
const Studio = lazy(() => import("../game/Studio"));
export default function JourneyScreen({ game, heading, go }: ScreenProps) {
  const work = useWorkstation();
  const browser = useBrowser();
  const [inputReady, setInputReady] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setInputReady(false);
  }, [game.quality]);
  useEffect(() => {
    if (available === false && work.mode === "working") setInputReady(true);
  }, [available, work.mode]);
  const active = work.mode === "viewing" || work.mode === "working";
  const large = enlarged || available === false;
  const activate = () => {
    setInputReady(available === false);
    setEnlarged(true);
    work.send("ACTIVATE");
  };
  const exit = () => {
    setInputReady(false);
    setEnlarged(false);
    work.send("EXIT");
  };
  useEffect(() => {
    if (!active) setEnlarged(false);
  }, [active]);
  return (
    <section
      className={`play-world ${active ? "at-computer" : ""}`}
      data-work-state={work.mode}
    >
      <h1 className="sr-only" ref={heading} tabIndex={-1}>
        Founder House studio
      </h1>
      <div className="studio-viewport">
        <SceneBoundary
          onError={() => setAvailable(false)}
          fallback={
            <div className="scene-fallback">
              The 3D scene could not load. Use Approach workstation below for
              the accessible computer view.
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="scene-loading">Loading Founder House…</div>
            }
          >
            <Studio
              mode={work.mode}
              onDesk={() => {
                if (work.mode === "exploring") work.send("APPROACH");
              }}
              overlay={overlay}
              enlarged={large}
              onAvailability={setAvailable}
              onInputReady={setInputReady}
            />
          </Suspense>
        </SceneBoundary>
        {active && (
          <MonitorSurface
            anchor={overlay}
            url={browser.url}
            working={work.mode === "working" && inputReady}
            enlarged={large}
            onEnlarge={() => {
              if (large) {
                work.send("DEACTIVATE");
                setInputReady(false);
                setEnlarged(false);
              } else setEnlarged(true);
            }}
            onExit={exit}
            onProblem={browser.onProblem}
            onActivate={activate}
            revision={browser.revision}
          />
        )}
      </div>
      <div className="hud-top">
        <GameHud region={game.continent!} />
      </div>
      <span className="pose-note">TEMPORARY CHARACTER PREVIEW</span>
      {!active && (
        <div className="interaction-panel">
          <span className="eyebrow">FOUNDER HOUSE / WORKSPACE 01</span>
          <h2>
            {work.mode === "exploring"
              ? "Your desk is ready."
              : work.mode === "approaching"
                ? "Approaching workstation…"
                : work.mode === "sitting"
                  ? "Taking a seat…"
                  : "Returning to the studio…"}
          </h2>
          <p>
            {work.mode === "exploring"
              ? "A place to think, research and begin."
              : "Camera and character are moving into position."}
          </p>
          <button
            className="primary"
            ref={work.approachButton}
            disabled={work.mode !== "exploring"}
            onClick={() => work.send("APPROACH")}
          >
            <Navigation size={17} />
            <span>Approach workstation</span>
            <kbd>E</kbd>
          </button>
          {work.mode !== "exploring" && (
            <button className="work-secondary" onClick={exit}>
              Cancel interaction
            </button>
          )}
        </div>
      )}
      {active && (
        <BrowserConsole
          {...browser}
          working={work.mode === "working" && inputReady}
          enlarged={large}
          preparing={work.mode === "working" && !inputReady}
          activate={activate}
          exit={exit}
          exitRef={work.exitButton}
          enlarge={() => setEnlarged(true)}
        />
      )}
      <div className="game-bottom">
        <button className="back-button" onClick={() => go("welcome")}>
          <ArrowLeft size={15} /> Main menu
        </button>
        <span>
          <Monitor size={13} />{" "}
          {work.mode.replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
        {active && (
          <button onClick={exit}>
            <LogOut size={14} /> Exit Work Mode
          </button>
        )}
      </div>
    </section>
  );
}
