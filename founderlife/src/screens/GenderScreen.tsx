import { Check } from "lucide-react";
import CharacterPortrait from "../components/CharacterPortrait";
import { genders } from "../state/store";
import { Step, Navigation } from "../components/OnboardingNav";
import type { ScreenProps } from "./types";
export default function GenderScreen({ game, heading, go }: ScreenProps) {
  return (
    <div className="onboarding identity-screen">
      <Step number={2} />
      <div className="character-selection">
        <div className="selection-console">
          <span className="eyebrow">CREATE YOUR FOUNDER</span>
          <h1 ref={heading} tabIndex={-1}>
            Your identity
          </h1>
          <p>Choose an initial presentation.</p>
          <div
            className="identity-options"
            role="group"
            aria-label="Choose your gender"
          >
            {genders.map((g, i) => (
              <button
                key={g}
                aria-label={g}
                aria-pressed={game.gender === g}
                className={`identity-option ${game.gender === g ? "active" : ""}`}
                onClick={() => game.update({ gender: g })}
              >
                <span className="option-number">0{i + 1}</span>
                <span>{g}</span>
                {game.gender === g && <Check size={17} />}
              </button>
            ))}
          </div>
          <p className="fine-print">
            Presentation is a starting point. Your region never limits your
            appearance.
          </p>
        </div>
        <div className="concept-stage">
          <CharacterPortrait gender={game.gender ?? "Non-binary"} />
          <span className="concept-label">
            ILLUSTRATED PRESET · NOT AN INTERACTIVE 3D CHARACTER
          </span>
        </div>
      </div>
      <Navigation
        back={() => go("continent")}
        next={() => go("preview")}
        disabled={!game.gender}
      />
    </div>
  );
}
