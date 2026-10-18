import { Compass, Check, ChevronRight } from "lucide-react";
import { lazy, Suspense } from "react";
const Atlas = lazy(() => import("../components/Atlas"));
import { continents } from "../state/store";
import { regions } from "../state/regions";
import { Step, Navigation } from "../components/OnboardingNav";
import type { ScreenProps } from "./types";
export default function ContinentScreen({ game, heading, go }: ScreenProps) {
  return (
    <div className="onboarding region-screen">
      <Step number={1} />
      <div className="screen-heading">
        <span className="eyebrow">SIX CONTINENTS. ONE FIRST STEP.</span>
        <h1 ref={heading} tabIndex={-1}>
          Where does <em>your story begin?</em>
        </h1>
        <p>Choose a starting region. Your ambition has no borders.</p>
      </div>
      <div className="region-layout">
        <div className="map-wrap">
          <Suspense
            fallback={
              <div className="map-loading" role="status">
                Charting your starting point…
              </div>
            }
          >
            <Atlas
              selected={game.continent}
              onSelect={(continent) => game.update({ continent })}
            />
          </Suspense>
          <div className="map-coordinate">
            <Compass size={16} /> EXPLORE YOUR POSSIBILITIES{" "}
            <span>001 / EARTH</span>
          </div>
        </div>
        <div
          className="region-list"
          role="group"
          aria-label="Choose your continent"
        >
          {continents.map((c, i) => (
            <button
              key={c}
              className={`region-option ${game.continent === c ? "active" : ""}`}
              aria-pressed={game.continent === c}
              onClick={() => game.update({ continent: c })}
            >
              <span className="option-number">0{i + 1}</span>
              <span>
                {c}
                <small>{regions[c].city}</small>
              </span>
              {game.continent === c ? (
                <Check size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="region-story" aria-live="polite">
        {game.continent ? (
          <>
            <span className="eyebrow">{regions[game.continent].tag}</span>
            <p>{regions[game.continent].description}</p>
          </>
        ) : (
          <p>
            Select a place on the map or in the list to discover your beginning.
          </p>
        )}
      </div>
      <Navigation
        back={() => go("welcome")}
        next={() => go("gender")}
        disabled={!game.continent}
      />
    </div>
  );
}
