import { lazy, Suspense } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness } from "lucide-react";
const Studio = lazy(() => import("../game/Studio"));
import type { ScreenProps } from "./types";
export default function JourneyScreen({
  game,
  heading,
  go,
  setDesk,
}: ScreenProps) {
  return (
    <div className="journey-screen">
      <div className="journey-top">
        <span className="eyebrow">CHAPTER 01 · YOUR FIRST WORKSPACE</span>
        <h1 ref={heading} tabIndex={-1}>
          Welcome to your beginning.
        </h1>
        <p>{game.continent}. One desk. An unwritten future.</p>
      </div>
      <div className="studio-wrap">
        <Suspense
          fallback={<div className="scene-fallback">Opening your studio…</div>}
        >
          <Studio onDesk={() => setDesk(true)} />
        </Suspense>
        <span className="scene-instruction">
          DRAG TO LOOK AROUND · SCROLL TO ZOOM
        </span>
        <span className="scene-tag">
          <span /> FOUNDER STUDIO · PHASE 01
        </span>
      </div>
      <div className="journey-bottom">
        <div>
          <span className="eyebrow">YOUR FIRST INTERACTION</span>
          <p>A little space for a big idea. Take a seat and open your desk.</p>
        </div>
        <button className="primary" onClick={() => setDesk(true)}>
          <BriefcaseBusiness size={18} /> Open your desk
          <ArrowRight size={18} />
        </button>
      </div>
      <button className="back-button" onClick={() => go("welcome")}>
        <ArrowLeft size={16} /> Return to main menu
      </button>
    </div>
  );
}
