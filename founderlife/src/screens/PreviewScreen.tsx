import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import CharacterPreview from "../components/CharacterPreview";
import { regions } from "../state/regions";
import { Step } from "../components/OnboardingNav";
import type { ScreenProps } from "./types";
export default function PreviewScreen({
  game,
  heading,
  go,
  start,
}: ScreenProps) {
  return (
    <div className="onboarding preview-screen">
      <Step number={3} />
      <div className="preview-layout">
        <div
          className="founder-display"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${regions[game.continent!].accent}30, transparent 65%)`,
          }}
        >
          <div className="portrait-orbit" />
          <CharacterPreview
            appearance={{
              presentation: game.gender!,
              region: game.continent!,
            }}
          />
          <span className="concept-label">
            ILLUSTRATED FOUNDER CONCEPT · PHASE 01
          </span>
        </div>
        <div className="preview-copy">
          <span className="eyebrow">FOUNDER PROFILE</span>
          <h1 ref={heading} tabIndex={-1}>
            Ready to begin?
          </h1>
          <p>
            Your first workspace is ready.
            <br />
            Make yourself at home.
          </p>
          <dl className="founder-details">
            <div>
              <dt>STARTING REGION</dt>
              <dd>
                <MapPin size={16} />
                {game.continent}
              </dd>
            </div>
            <div>
              <dt>PRESENTATION</dt>
              <dd>{game.gender}</dd>
            </div>
          </dl>
          <p className="fine-print">
            Your region sets the scene, not your appearance. This original
            concept will make way for a customizable 3D founder in Phase 2.
          </p>
          <button className="primary" onClick={start}>
            Start FounderLife
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <button className="back-button" onClick={() => go("gender")}>
        <ArrowLeft size={16} /> Back to presentation
      </button>
    </div>
  );
}
