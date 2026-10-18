export const workStates = [
  "exploring",
  "approaching",
  "sitting",
  "viewing",
  "working",
  "exiting",
] as const;
export type WorkState = (typeof workStates)[number];
export type WorkEvent =
  | "APPROACH"
  | "ARRIVED"
  | "SEATED"
  | "ACTIVATE"
  | "DEACTIVATE"
  | "EXIT"
  | "FINISHED";
export function transition(state: WorkState, event: WorkEvent): WorkState {
  if (event === "EXIT" && state !== "exploring") return "exiting";
  const table: Partial<
    Record<WorkState, Partial<Record<WorkEvent, WorkState>>>
  > = {
    exploring: { APPROACH: "approaching" },
    approaching: { ARRIVED: "sitting" },
    sitting: { SEATED: "viewing" },
    viewing: { ACTIVATE: "working" },
    working: { DEACTIVATE: "viewing" },
    exiting: { FINISHED: "exploring" },
  };
  return table[state]?.[event] ?? state;
}
export const transitionDuration: Partial<Record<WorkState, number>> = {
  approaching: 1250,
  sitting: 750,
  exiting: 900,
};
