import { ArrowLeft, ArrowRight, Check } from "lucide-react";
export function Step({ number }: { number: number }) {
  return (
    <div className="step-indicator" aria-label={`Step ${number} of 3`}>
      {["Your world", "Your identity", "Your beginning"].map((s, i) => (
        <span
          className={
            i + 1 === number ? "current" : i + 1 < number ? "done" : ""
          }
          key={s}
        >
          <b>
            {i + 1 < number ? (
              <Check size={11} />
            ) : (
              String(i + 1).padStart(2, "0")
            )}
          </b>
          {s}
          {i < 2 && <i />}
        </span>
      ))}
    </div>
  );
}
export function Navigation({
  back,
  next,
  disabled,
}: {
  back: () => void;
  next: () => void;
  disabled: boolean;
}) {
  return (
    <div className="navigation">
      <button className="back-button" onClick={back}>
        <ArrowLeft size={16} /> Back
      </button>
      <span className="navigation-hint">YOUR STORY IS TAKING SHAPE</span>
      <button className="primary" disabled={disabled} onClick={next}>
        Continue
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
