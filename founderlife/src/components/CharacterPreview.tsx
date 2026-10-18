import CharacterPortrait from "./CharacterPortrait";
import type { Continent, Gender } from "../state/store";
export type FounderAppearance = { presentation: Gender; region: Continent };
/** Region is context only: never maps ethnicity or restricts appearance.
 * Phase 2 may replace the illustration renderer with a lazy GLB renderer.
 * No unavailable model is requested in Phase 1.
 */
export const characterAssetSlot: {
  kind: "illustration";
  licensedModelUrl: string | null;
} = { kind: "illustration", licensedModelUrl: null };
export default function CharacterPreview({
  appearance,
}: {
  appearance: FounderAppearance;
}) {
  return (
    <figure
      className="character-preview"
      aria-label={`Founder concept, starting in ${appearance.region}`}
    >
      <CharacterPortrait gender={appearance.presentation} />
    </figure>
  );
}
