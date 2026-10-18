import { Check } from "lucide-react";
import CharacterPortrait from "../components/CharacterPortrait";
import { genders } from "../state/store";
import { Step, Navigation } from "../components/OnboardingNav";
import type { ScreenProps } from "./types";
export default function GenderScreen({ game, heading, go }: ScreenProps) {
  return (
    <div className="onboarding identity-screen">
      <Step number={2} />
      <div className="screen-heading">
        <span className="eyebrow">THE PERSON BEHIND THE VISION</span>
        <h1 ref={heading} tabIndex={-1}>
          Great things start <em>with you.</em>
        </h1>
        <p>
          Choose your initial presentation. There’s no single way to be a
          founder.
        </p>
      </div>
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
            <div className="portrait-frame">
              <span className="portrait-index">0{i + 1}</span>
              <CharacterPortrait gender={g} />
            </div>
            <div className="identity-label">
              <span>{g}</span>
              <span className="selection-dot">
                {game.gender === g && <Check size={13} />}
              </span>
            </div>
          </button>
        ))}
      </div>
      <p className="fine-print">
        A starting preset, never a limitation. Appearance customization arrives
        in Chapter 02.
      </p>
      <Navigation
        back={() => go("continent")}
        next={() => go("preview")}
        disabled={!game.gender}
      />
    </div>
  );
}
