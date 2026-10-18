import { continents, type Continent } from "../state/store";
import { worldPaths as paths } from "./worldPaths";
export default function Atlas({
  selected,
  onSelect,
}: {
  selected: Continent | null;
  onSelect: (v: Continent) => void;
}) {
  return (
    <svg
      className="atlas"
      viewBox="0 0 1000 520"
      role="group"
      aria-label="World region map"
    >
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M50 0H0V50"
            fill="none"
            stroke="#b4c7c7"
            strokeOpacity=".08"
          />
        </pattern>
      </defs>
      <ellipse
        cx="500"
        cy="260"
        rx="485"
        ry="243"
        fill="#172b35"
        stroke="#a1b5b1"
        strokeOpacity=".15"
      />
      <ellipse cx="500" cy="260" rx="485" ry="243" fill="url(#grid)" />
      <path
        d="M20 260h960M500 18v484"
        stroke="#b7c6bb"
        strokeOpacity=".13"
        strokeDasharray="4 8"
      />
      {paths.map((d, i) => (
        <g key={d}>
          <path
            d={d}
            className={selected === continents[i] ? "land selected" : "land"}
            onClick={() => onSelect(continents[i])}
          />
        </g>
      ))}
      <text x="43" y="482" fill="#849ba0" fontSize="10" letterSpacing="3">
        A WORLD OF POSSIBILITY
      </text>
    </svg>
  );
}
