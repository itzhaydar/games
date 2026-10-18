import type { RefObject } from "react";
import type { useGame } from "../state/store";
import type { Screen } from "../state/navigation";
export type ScreenProps = {
  game: ReturnType<typeof useGame.getState>;
  heading: RefObject<HTMLHeadingElement | null>;
  go: (s: Screen) => void;
  start: () => void;
  setRestart: (v: boolean) => void;
  setSettings: (v: boolean) => void;
};
