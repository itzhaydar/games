import type { Continent } from "./store";
export const regions: Record<
  Continent,
  { tag: string; description: string; city: string; accent: string }
> = {
  Africa: {
    tag: "THE NEXT CHAPTER",
    description:
      "Bold ideas. Boundless horizons. Build your beginning in a continent moving forward.",
    city: "Warm light. New perspectives.",
    accent: "#c6a474",
  },
  Asia: {
    tag: "MOMENTUM IN MOTION",
    description:
      "Where ancient ingenuity meets tomorrow’s ambition. Find your own rhythm.",
    city: "Electric skylines. Endless possibility.",
    accent: "#c99880",
  },
  Europe: {
    tag: "A NEW PERSPECTIVE",
    description:
      "A thousand stories of reinvention. Now it’s time to write yours.",
    city: "Timeless streets. Fresh ideas.",
    accent: "#a9b6a0",
  },
  "North America": {
    tag: "THINK BEYOND",
    description:
      "From a spark of an idea to a different kind of future. Make your first move.",
    city: "Big horizons. Independent spirits.",
    accent: "#93b6c4",
  },
  "South America": {
    tag: "CREATIVITY TAKES ROOT",
    description:
      "Let an extraordinary energy inspire an extraordinary beginning.",
    city: "Vibrant culture. Fearless imagination.",
    accent: "#a9b58b",
  },
  Oceania: {
    tag: "ROOM TO DREAM",
    description:
      "A fresh outlook at the edge of the world. Create something that matters.",
    city: "Open skies. A different pace.",
    accent: "#84b7b3",
  },
};
