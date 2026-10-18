import { create } from "zustand";
export const continents = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
] as const;
export const genders = ["Male", "Female", "Non-binary"] as const;
export type Continent = (typeof continents)[number];
export type Gender = (typeof genders)[number];
export type Quality = "low" | "medium" | "high";
export type Progress = {
  continent: Continent | null;
  gender: Gender | null;
  complete: boolean;
  quality: Quality;
  reducedMotion: boolean;
};
export const defaults: Progress = {
  continent: null,
  gender: null,
  complete: false,
  quality: "medium",
  reducedMotion: false,
};
export const STORAGE_KEY = "founderlife.v1";
export function sanitize(value: unknown): Progress {
  const v = (
    value && typeof value === "object" ? value : {}
  ) as Partial<Progress>;
  const continent = continents.includes(v.continent as Continent)
    ? v.continent!
    : null;
  const gender = genders.includes(v.gender as Gender) ? v.gender! : null;
  return {
    continent,
    gender,
    complete: v.complete === true && !!continent && !!gender,
    quality: ["low", "medium", "high"].includes(v.quality ?? "")
      ? v.quality!
      : "medium",
    reducedMotion: v.reducedMotion === true,
  };
}
function load() {
  try {
    return sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"));
  } catch {
    return { ...defaults };
  }
}
export const useGame = create<
  Progress & {
    storageError: boolean;
    update: (v: Partial<Progress>) => void;
    restart: () => void;
  }
>((set, get) => ({
  ...load(),
  storageError: false,
  update: (v) => {
    const next = sanitize({ ...get(), ...v });
    let storageError = false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      storageError = true;
    }
    set({ ...next, storageError });
  },
  restart: () => {
    get().update({ continent: null, gender: null, complete: false });
  },
}));
