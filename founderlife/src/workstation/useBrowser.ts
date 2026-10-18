import { useState } from "react";
import { validateWebsite, loadWebsite, URL_STORAGE_KEY } from "./url";
export const PRACTICE_URL = "/workstation/practice.html";
export function useBrowser() {
  const [address, setAddress] = useState(loadWebsite);
  const [history, setHistory] = useState([PRACTICE_URL]);
  const [index, setIndex] = useState(0);
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const navigate = (url: string) => {
    setHistory((h) => [...h.slice(0, index + 1), url]);
    setIndex((i) => i + 1);
    setFallback(false);
    setRevision((r) => r + 1);
  };
  const load = () => {
    const result = validateWebsite(address);
    if (result.error) {
      setError(result.error);
      return;
    }
    setError("");
    setAddress(result.url!);
    navigate(result.url!);
    try {
      localStorage.setItem(URL_STORAGE_KEY, result.url!);
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  };
  const move = (delta: number) => {
    const next = index + delta;
    if (next < 0 || next >= history.length) return;
    setIndex(next);
    setFallback(false);
    if (!history[next].startsWith("/")) setAddress(history[next]);
  };
  return {
    address,
    setAddress,
    load,
    error,
    url: history[index],
    revision,
    storageError,
    fallback,
    onProblem: () => setFallback(true),
    onRetry: () => {
      setFallback(false);
      document.getElementById("workstation-url")?.focus();
    },
    practice: () => navigate(PRACTICE_URL),
    reload: () => {
      setRevision((r) => r + 1);
      setFallback(false);
    },
    canPrevious: index > 0,
    canNext: index < history.length - 1,
    previous: () => move(-1),
    next: () => move(1),
  };
}
