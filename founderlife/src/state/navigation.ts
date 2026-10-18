import { useGame } from "./store";
export type Screen = "welcome" | "continent" | "gender" | "preview" | "journey";
export const routes: Record<Screen, string> = {
  welcome: "/",
  continent: "/begin/region",
  gender: "/begin/identity",
  preview: "/begin/founder",
  journey: "/journey",
};
export function validScreen(): Screen {
  const s =
    (Object.keys(routes) as Screen[]).find(
      (k) => routes[k] === location.pathname,
    ) ?? "welcome";
  const p = useGame.getState();
  if (s === "journey" && !p.complete) return "welcome";
  if ((s === "gender" || s === "preview") && !p.continent) return "continent";
  if (s === "preview" && !p.gender) return "gender";
  return s;
}
