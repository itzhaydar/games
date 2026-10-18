import type { Gender } from "../state/store";
/** Original SVG concept art. Replace this component through CharacterPreview with licensed GLB assets in Phase 2. */
export default function CharacterPortrait({
  gender,
}: {
  gender: Gender | null;
}) {
  const female = gender === "Female",
    neutral = gender === "Non-binary";
  return (
    <svg
      className="portrait"
      viewBox="0 0 360 500"
      role="img"
      aria-label={`${gender ?? "Founder"} illustrated character concept, not a 3D model`}
    >
      <defs>
        <linearGradient id="jacket" x2="1" y2="1">
          <stop stopColor="#8b938d" />
          <stop offset="1" stopColor="#34474b" />
        </linearGradient>
        <linearGradient id="skin" x2="1" y2=".4">
          <stop stopColor="#d1a586" />
          <stop offset="1" stopColor="#93694f" />
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="474" rx="133" ry="14" fill="#09171c" opacity=".4" />
      <path
        d="M75 500l10-157q6-40 62-55h66q55 15 62 55l11 157"
        fill="url(#jacket)"
      />
      <path d="M147 290l33 34 33-34 14 210h-93z" fill="#e3d9c5" />
      <path d="M151 260v39l29 25 30-25v-39" fill="url(#skin)" />
      <path
        d="M130 177q-5-68 49-72 59 0 54 72l-7 66q-14 43-46 45-32-2-46-45z"
        fill="url(#skin)"
      />
      <path
        d={
          female
            ? "M128 233q-37-136 48-139 92-4 65 160l-18-21 2-81q-47 10-79-5l-4 89z"
            : neutral
              ? "M125 188q-30-81 40-94 84-12 74 82l-18-24q-56 29-73 0l-10 39z"
              : "M128 181q-15-80 53-82 69 0 54 83l-16-34q-51 17-75-1z"
        }
        fill="#28312e"
      />
      <path
        d="M146 202l14-2m40 0 14 2"
        stroke="#453a33"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M180 208l-5 25 8 3m-17 17q14 7 27-1"
        fill="none"
        stroke="#805b49"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M145 291l-25 19 22 55 37-41m34-33 25 19-22 55-36-41"
        fill="#a1a79c"
      />
      <path
        d="M96 365l12 135m157-135-12 135"
        stroke="#263b3e"
        strokeWidth="3"
        opacity=".5"
      />
      <path d="M225 388h24" stroke="#d5c197" strokeWidth="3" />
      <circle cx="188" cy="389" r="3" fill="#b9a67c" />
    </svg>
  );
}
