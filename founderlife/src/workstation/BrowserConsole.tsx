import {
  ArrowUpRight,
  ExternalLink,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Keyboard,
  MonitorUp,
} from "lucide-react";
import type { RefObject } from "react";
export type BrowserConsoleProps = {
  address: string;
  setAddress: (v: string) => void;
  load: () => void;
  error: string;
  working: boolean;
  enlarged: boolean;
  preparing: boolean;
  activate: () => void;
  exit: () => void;
  exitRef: RefObject<HTMLButtonElement | null>;
  url: string;
  fallback: boolean;
  onProblem: () => void;
  onRetry: () => void;
  practice: () => void;
  reload: () => void;
  enlarge: () => void;
  canPrevious: boolean;
  canNext: boolean;
  previous: () => void;
  next: () => void;
  storageError: boolean;
};
export default function BrowserConsole(p: BrowserConsoleProps) {
  return (
    <div className="browser-console">
      <div className="console-title">
        <span className="eyebrow">FOUNDER WORKSTATION</span>
        <span className={`input-status ${p.working ? "on" : ""}`}>
          {p.working ? "WORK INPUT ACTIVE" : "VIEWING COMPUTER"}
        </span>
      </div>
      <form
        className="address-form"
        onSubmit={(e) => {
          e.preventDefault();
          p.load();
        }}
      >
        <div className="address-actions">
          <button
            type="button"
            aria-label="Previous submitted address"
            disabled={!p.canPrevious}
            onClick={p.previous}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            aria-label="Next submitted address"
            disabled={!p.canNext}
            onClick={p.next}
          >
            <ArrowRight size={17} />
          </button>
          <button
            type="button"
            aria-label="Reload submitted address"
            onClick={p.reload}
          >
            <RotateCw size={17} />
          </button>
        </div>
        <label>
          <span className="sr-only">Website URL</span>
          <input
            id="workstation-url"
            type="text"
            inputMode="url"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            placeholder="https://example.com"
            value={p.address}
            onChange={(e) => p.setAddress(e.target.value)}
            aria-invalid={!!p.error}
            aria-describedby={p.error ? "url-error" : "embed-notice"}
          />
        </label>
        <button className="primary" type="submit">
          Load Website
          <ArrowUpRight size={16} />
        </button>
      </form>
      {p.error && (
        <p id="url-error" className="url-error" role="alert">
          {p.error}
        </p>
      )}
      <p id="embed-notice" className="embed-notice">
        Embedding cannot be verified automatically. A blank or blocked page?{" "}
        <button onClick={p.onProblem}>Website not visible?</button>
      </p>
      {p.storageError && (
        <p role="status" className="url-error">
          The address could not be saved. It remains available in this session.
        </p>
      )}
      <div className="work-actions">
        <button
          className="primary"
          onClick={p.activate}
          disabled={p.working || p.preparing}
        >
          <Keyboard size={17} />
          {p.working
            ? "Keyboard active"
            : p.preparing
              ? "Aligning display…"
              : "Activate Keyboard for Work"}
        </button>
        <button
          className="work-secondary"
          onClick={p.enlarge}
          disabled={p.enlarged}
        >
          <MonitorUp size={17} />{" "}
          {p.enlarged ? "Display enlarged" : "Enlarge display"}
        </button>
        <button
          className="work-secondary exit-work"
          ref={p.exitRef}
          onClick={p.exit}
        >
          Exit Work Mode
        </button>
      </div>
      <button className="practice-link" onClick={p.practice}>
        Open local practice page
      </button>
      {p.fallback && (
        <div
          className="embed-fallback"
          role="region"
          aria-label="Website embedding help"
        >
          <strong>This website cannot be displayed inside FounderLife.</strong>
          <p>
            If the website is blank or blocked, its browser protections may
            prevent embedding. FounderLife cannot confirm or bypass that
            restriction.
          </p>
          <div>
            {!p.url.startsWith("/") && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
              >
                <ExternalLink size={15} /> Open in Browser
              </a>
            )}
            <button onClick={p.onRetry}>Try Another URL</button>
            <button onClick={p.exit}>Return to Game</button>
          </div>
        </div>
      )}
    </div>
  );
}
