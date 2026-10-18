import { useEffect, useReducer, useRef } from "react";
import { useGame } from "../state/store";
import { transition, transitionDuration } from "./machine";
export function useWorkstation() {
  const [mode, send] = useReducer(transition, "exploring");
  const reduced = useGame((s) => s.reducedMotion);
  const approachButton = useRef<HTMLButtonElement>(null);
  const exitButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const duration = transitionDuration[mode];
    if (duration === undefined) return;
    const quick =
      reduced || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(
      () =>
        send(
          mode === "approaching"
            ? "ARRIVED"
            : mode === "sitting"
              ? "SEATED"
              : "FINISHED",
        ),
      quick ? 40 : duration,
    );
    return () => clearTimeout(timer);
  }, [mode, reduced]);
  useEffect(() => {
    if (mode === "exploring") approachButton.current?.focus();
    if (mode === "viewing") exitButton.current?.focus();
  }, [mode]);
  useEffect(() => {
    if (mode !== "exploring") return;
    const handler = (e: KeyboardEvent) => {
      if (
        e.repeat ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        document.querySelector('[aria-modal="true"]')
      )
        return;
      if (e.key.toLowerCase() === "e") {
        e.preventDefault();
        send("APPROACH");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode]);
  return { mode, send, approachButton, exitButton };
}
