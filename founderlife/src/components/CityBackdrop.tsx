export default function CityBackdrop() {
  return (
    <div className="city-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x2="0" y2="1">
            <stop stopColor="#708899" />
            <stop offset=".48" stopColor="#d9b29a" />
            <stop offset="1" stopColor="#b98265" />
          </linearGradient>
          <linearGradient id="water" x2="0" y2="1">
            <stop stopColor="#968c80" />
            <stop offset="1" stopColor="#273a43" />
          </linearGradient>
          <linearGradient id="tower" x2="1" y2=".3">
            <stop stopColor="#283944" />
            <stop offset=".5" stopColor="#52616a" />
            <stop offset="1" stopColor="#202e39" />
          </linearGradient>
          <pattern
            id="windows"
            width="22"
            height="25"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="5"
              y="5"
              width="7"
              height="12"
              fill="#f4d19c"
              opacity=".5"
            />
          </pattern>
          <filter id="haze">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <rect width="1600" height="1000" fill="url(#sky)" />
        <circle cx="1040" cy="365" r="68" fill="#ffdfb1" opacity=".75" />
        <path
          d="M0 440Q300 370 550 445T1100 423T1600 450V620H0"
          fill="#8a8885"
          opacity=".4"
          filter="url(#haze)"
        />
        {Array.from({ length: 37 }, (_, i) => {
          const h = 60 + ((i * 73) % 190);
          return (
            <rect
              key={i}
              x={i * 46}
              y={580 - h}
              width={28 + (i % 4) * 5}
              height={h}
              fill="#636f73"
              opacity=".55"
            />
          );
        })}
        <rect y="580" width="1600" height="420" fill="url(#water)" />
        {Array.from({ length: 24 }, (_, i) => (
          <path
            key={i}
            d={`M${(i * 173) % 1600} ${610 + i * 16}h${70 + i * 11}`}
            stroke="#ddc7ad"
            opacity=".18"
          />
        ))}
        <path d="M800 690L1600 530V1000H450Z" fill="#23343c" />
        <path d="M800 705L1600 547" stroke="#c8a88a" strokeWidth="5" />
        {Array.from({ length: 17 }, (_, i) => {
          const h = 130 + ((i * 59) % 280),
            x = 710 + i * 59;
          return (
            <g key={i}>
              <rect
                x={x}
                y={640 - h}
                width="50"
                height={h}
                fill="url(#tower)"
              />
              <rect
                x={x}
                y={640 - h}
                width="50"
                height={h}
                fill="url(#windows)"
                opacity=".5"
              />
              <path d={`M${x} ${640 - h}l14 -9h36v9`} fill="#6e7373" />
            </g>
          );
        })}
        <path d="M1210 590V180l48-20 47 20v410" fill="url(#tower)" />
        <path
          d="M1258 160v430M1220 220h76M1220 250h76M1220 280h76M1220 310h76M1220 340h76M1220 370h76M1220 400h76M1220 430h76M1220 460h76"
          stroke="#d4b08a"
          opacity=".5"
        />
        <path d="M1258 160V109" stroke="#3f5058" strokeWidth="4" />
        <path d="M1460 590V260l50-38 51 38v330" fill="#243841" />
        <path d="M1470 280h80v300h-80z" fill="url(#windows)" />
        <path d="M0 860L260 750l480 250H0" fill="#172b32" />
        <path
          d="M0 858l260-110 480 250"
          fill="none"
          stroke="#67706a"
          strokeWidth="12"
        />
        <path
          d="M0 790L260 682l480 250M260 682v66M80 758v68M440 777v69M620 871v68"
          fill="none"
          stroke="#182a31"
          strokeWidth="8"
        />
      </svg>
      <div className="city-shade" />
    </div>
  );
}
