import { ChevronRight, Play, Plus, Settings2 } from "lucide-react";
import type { ScreenProps } from "./types";
export default function WelcomeScreen({
  game,
  heading,
  go,
  setRestart,
  setSettings,
}: ScreenProps) {
  const saved = !!game.continent;
  return (
    <section className="title-screen">
      <div className="title-brand">
        <span className="eyebrow">A WORLD OF YOUR OWN</span>
        <h1 ref={heading} tabIndex={-1}>
          FOUNDER<span>LIFE</span>
          <i>V1</i>
        </h1>
        <span className="title-edition">THE BEGINNING</span>
      </div>
      <nav
        className="game-menu"
        aria-label="Main menu"
        onKeyDown={(e) => {
          if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
          e.preventDefault();
          const buttons = Array.from(
            e.currentTarget.querySelectorAll("button"),
          );
          const current = buttons.indexOf(
            document.activeElement as HTMLButtonElement,
          );
          const index =
            e.key === "Home"
              ? 0
              : e.key === "End"
                ? buttons.length - 1
                : (current + (e.key === "ArrowUp" ? -1 : 1) + buttons.length) %
                  buttons.length;
          buttons[index]?.focus();
        }}
      >
        {saved && (
          <button
            onClick={() =>
              go(game.complete ? "journey" : game.gender ? "preview" : "gender")
            }
          >
            <Play size={17} />
            <span>
              Continue
              <small>
                {game.continent} ·{" "}
                {game.complete ? "Founder House" : "Character setup"}
              </small>
            </span>
            <ChevronRight />
          </button>
        )}
        <button onClick={() => (saved ? setRestart(true) : go("continent"))}>
          <Plus size={18} />
          <span>New Game</span>
          <ChevronRight />
        </button>
        <button onClick={() => setSettings(true)}>
          <Settings2 size={18} />
          <span>Settings</span>
          <ChevronRight />
        </button>
      </nav>
      <div className="world-caption">
        <span className="live-dot" /> FOUNDER HOUSE{" "}
        <small>06:42 · A new day in the city</small>
      </div>
    </section>
  );
}
