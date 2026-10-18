import { ArrowRight, Globe2, RotateCcw } from "lucide-react";
import type { ScreenProps } from "./types";
export default function WelcomeScreen({
  game,
  heading,
  go,
  setRestart,
}: ScreenProps) {
  return (
    <>
      <div className="welcome-content">
        <div className="eyebrow">
          <span className="small-line" /> A LIFE YOU BUILD
        </div>
        <h1 ref={heading} tabIndex={-1}>
          Every empire
          <br />
          begins <em>somewhere.</em>
        </h1>
        <p className="welcome-copy">
          Your journey. Your decisions. Your legacy.
        </p>
        <div className="welcome-actions">
          <button
            className="primary"
            onClick={() =>
              go(
                game.complete
                  ? "journey"
                  : game.continent
                    ? "gender"
                    : "continent",
              )
            }
          >
            {game.complete ? "Continue Your Journey" : "Begin Your Journey"}
            <ArrowRight size={19} />
          </button>
          {(game.continent || game.complete) && (
            <button className="text-button" onClick={() => setRestart(true)}>
              <RotateCcw size={14} /> Start a new journey
            </button>
          )}
        </div>
        <div className="welcome-detail">
          <Globe2 size={17} />
          <span>ONE WORLD. YOUR POSSIBILITIES.</span>
        </div>
      </div>
      <div className="location-caption">
        <span className="location-cross">+</span>
        <div>
          THE WORLD IS YOUR STARTING POINT
          <small>A new perspective. An unwritten story.</small>
        </div>
      </div>
      <div className="chapter-marker">
        <span>01</span>
        <div>
          THE BEGINNING<small>Your first move changes everything.</small>
        </div>
      </div>
    </>
  );
}
