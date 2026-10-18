import { useRef, type RefObject, useLayoutEffect } from "react";
import { Maximize2, Minimize2, LockKeyhole, ExternalLink } from "lucide-react";
export default function MonitorSurface({
  anchor,
  url,
  working,
  enlarged,
  onEnlarge,
  onExit,
  onProblem,
  onActivate,
  revision,
}: {
  anchor: RefObject<HTMLDivElement | null>;
  url: string;
  working: boolean;
  enlarged: boolean;
  onEnlarge: () => void;
  onExit: () => void;
  onProblem: () => void;
  onActivate: () => void;
  revision: number;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  useLayoutEffect(() => {
    if (working) frame.current?.focus({ preventScroll: true });
    else frame.current?.blur();
  }, [working]);
  return (
    <div
      className={`monitor-overlay ${enlarged ? "enlarged" : ""}`}
      ref={anchor}
      data-testid="monitor-overlay"
    >
      <div className="monitor-shell">
        <div className="monitor-chrome">
          <span>
            <span className="live-dot" /> FOUNDER OS{" "}
            <small>
              {url.startsWith("/")
                ? "Local practice page"
                : "Submitted address"}
            </small>
          </span>
          <div>
            <button
              onClick={onEnlarge}
              aria-label={enlarged ? "Restore monitor view" : "Enlarge display"}
            >
              {enlarged ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button onClick={onExit}>Exit Work Mode</button>
          </div>
        </div>
        <div className="iframe-area">
          <iframe
            key={`${url}-${revision}`}
            ref={frame}
            src={url}
            title="Founder Workstation website"
            sandbox="allow-scripts allow-forms"
            allow="camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'; clipboard-read 'none'; clipboard-write 'none'"
            referrerPolicy="no-referrer"
            tabIndex={working ? 0 : -1}
            style={{ pointerEvents: working ? "auto" : "none" }}
            onError={onProblem}
          />
          {!working && (
            <div className="input-locked">
              <LockKeyhole size={25} />
              <strong>Workstation ready</strong>
              <button className="primary" onClick={onActivate}>
                Activate Keyboard for Work
              </button>
              <p>Activate Keyboard for Work to use this screen.</p>
            </div>
          )}
        </div>
        <div className="monitor-status">
          <span>{working ? "● WORK INPUT ACTIVE" : "INPUT LOCKED"}</span>
          <span>Sandboxed browser · Website compatibility varies</span>
          <button onClick={onProblem}>
            <ExternalLink size={12} /> Website not visible?
          </button>
        </div>
      </div>
    </div>
  );
}
