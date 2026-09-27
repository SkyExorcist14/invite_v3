"use client";

type Decor = "marigold" | "lights" | "petals" | "regal";

type EventDecorProps = {
  decor: Decor;
  accent: string;
  accentSoft: string;
};

type FlowerProps = {
  x: number;
  y: number;
  size?: number;
  color: string;
  secondary: string;
  center?: string;
  rotation?: number;
};

function Flower({
  x,
  y,
  size = 30,
  color,
  secondary,
  center = "#D89A24",
  rotation = 0,
}: FlowerProps) {
  const petals = [
    [0, -0.42],
    [0.3, -0.3],
    [0.42, 0],
    [0.3, 0.3],
    [0, 0.42],
    [-0.3, 0.3],
    [-0.42, 0],
    [-0.3, -0.3],
  ];

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <circle r={size * 0.38} fill={secondary} opacity="0.28" />
      {petals.map(([px, py], i) => (
        <ellipse
          key={i}
          cx={px * size}
          cy={py * size}
          rx={size * 0.18}
          ry={size * 0.34}
          fill={i % 2 === 0 ? color : secondary}
          opacity={0.72 + (i % 3) * 0.07}
          transform={`rotate(${i * 45} ${px * size} ${py * size})`}
        />
      ))}
      <circle r={size * 0.16} fill={center} />
      <circle r={size * 0.07} fill="#FFF4D6" opacity="0.75" />
    </g>
  );
}

function Leaf({
  x,
  y,
  size = 18,
  color,
  rotation = 0,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  rotation?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`}>
      <ellipse
        cx={0}
        cy={0}
        rx={size * 0.28}
        ry={size * 0.62}
        fill={color}
        opacity="0.58"
        transform="rotate(-32)"
      />
      <path
        d={`M0 ${size * 0.45} Q ${size * 0.05} 0 0 ${-size * 0.45}`}
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.55"
      />
    </g>
  );
}

function FloralGarland({
  primary,
  secondary,
  leaf,
  gold,
  flowers,
  dense = false,
}: {
  primary: string;
  secondary: string;
  leaf: string;
  gold: string;
  flowers: Array<[number, number, number]>;
  dense?: boolean;
}) {
  const leaves = [
    [4, 43, 14, -55], [11, 32, 12, 48], [18, 45, 15, -35],
    [27, 30, 13, 52], [34, 43, 14, -48], [42, 31, 13, 42],
    [50, 44, 15, -42], [58, 30, 13, 48], [66, 43, 14, -48],
    [74, 31, 13, 45], [82, 44, 15, -38], [90, 31, 13, 48],
    [97, 43, 14, -45],
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[105px] overflow-hidden">
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-full w-full"
        aria-hidden="true"
      >
        {/* soft watercolor wash behind the garland */}
        <path
          d="M-20 34 Q120 8 250 35 T520 32 T790 34 T1020 30"
          fill="none"
          stroke={gold}
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M-10 38 Q120 14 250 40 T520 37 T790 39 T1010 34"
          fill="none"
          stroke={gold}
          strokeWidth="0.7"
          opacity="0.35"
        />

        {/* loose stems */}
        <path
          d="M-20 62 Q120 26 245 61 T500 57 T755 61 T1020 55"
          fill="none"
          stroke={leaf}
          strokeWidth="2.2"
          opacity="0.38"
        />

        {leaves.map(([x, y, s, r], i) => (
          <Leaf
            key={`leaf-${i}`}
            x={(x / 100) * 1000}
            y={y}
            size={s}
            color={leaf}
            rotation={r}
          />
        ))}

        {/* tiny filler blossoms */}
        {[7, 23, 39, 55, 71, 87, 96].map((x, i) => (
          <g key={`filler-${i}`} opacity="0.58">
            <circle cx={(x / 100) * 1000} cy={25 + (i % 2) * 12} r="2.2" fill="#FFF8E8" />
            <circle cx={(x / 100) * 1000 + 4} cy={28 + (i % 2) * 12} r="1.8" fill="#FFF8E8" />
            <circle cx={(x / 100) * 1000 - 3} cy={31 + (i % 2) * 12} r="1.7" fill="#FFF8E8" />
          </g>
        ))}

        {flowers.map(([x, y, size], i) => (
          <Flower
            key={`flower-${i}`}
            x={(x / 100) * 1000}
            y={y}
            size={size}
            color={i % 2 === 0 ? primary : secondary}
            secondary={i % 2 === 0 ? secondary : primary}
            center={gold}
            rotation={i % 2 === 0 ? -8 : 7}
          />
        ))}

        {dense &&
          [15, 45, 75].map((x, i) => (
            <Flower
              key={`small-${i}`}
              x={(x / 100) * 1000}
              y={78 + (i % 2) * 5}
              size={16}
              color={secondary}
              secondary={primary}
              center={gold}
              rotation={i * 12}
            />
          ))}
      </svg>
    </div>
  );
}

export default function EventDecor({
  decor,
  accent,
  accentSoft,
}: EventDecorProps) {
  if (decor === "marigold") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="animate-glow absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,224,150,0.65) 0%, transparent 70%)",
          }}
        />

        <FloralGarland
          primary="#F6C84E"
          secondary="#F7A85B"
          leaf="#7D9A6A"
          gold="#D89A24"
          flowers={[
            [7, 86, 30],
            [24, 82, 36],
            [42, 88, 31],
            [61, 82, 36],
            [79, 88, 31],
            [95, 83, 36],
          ]}
          dense
        />
      </div>
    );
  }

  if (decor === "lights") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloralGarland
          primary={accent}
          secondary={accentSoft}
          leaf="#557F72"
          gold="#E6B83F"
          flowers={[
            [5, 86, 31],
            [21, 80, 27],
            [37, 89, 36],
            [53, 80, 29],
            [69, 89, 34],
            [85, 81, 29],
            [98, 87, 34],
          ]}
          dense
        />

        {/* restrained jewel-tone fairy lights */}
        {[12, 29, 46, 63, 80, 94].map((left, i) => (
          <span
            key={left}
            className="animate-twinkle absolute top-[48px] h-2 w-2 rounded-full"
            style={{
              left: `${left}%`,
              background: i % 2 === 0 ? accentSoft : accent,
              boxShadow: `0 0 9px 2px ${i % 2 === 0 ? accentSoft : accent}`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (decor === "regal") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <FloralGarland
          primary="#6C3E83"
          secondary="#9B1E43"
          leaf="#7C6A46"
          gold="#C6A35A"
          flowers={[
            [5, 87, 34],
            [21, 80, 28],
            [37, 89, 37],
            [53, 80, 30],
            [69, 89, 36],
            [85, 81, 30],
            [98, 87, 35],
          ]}
          dense
        />

        {[10, 25, 40, 55, 70, 85, 95].map((left, i) => (
          <span
            key={left}
            className="animate-twinkle absolute top-[35px] h-1.5 w-1.5 rounded-full"
            style={{
              left: `${left}%`,
              background: "#FFE7A4",
              boxShadow: "0 0 8px 2px rgba(255,220,125,0.75)",
              animationDelay: `${i * 0.45}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Anand Karaj — blue/orange floral border with a very subtle sacred arch.
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <FloralGarland
        primary="#72B8D8"
        secondary="#F28A3B"
        leaf="#739A83"
        gold="#D8A12D"
        flowers={[
          [5, 68, 31],
          [21, 58, 25],
          [37, 70, 35],
          [53, 58, 27],
          [69, 70, 34],
          [85, 58, 27],
          [98, 68, 33],
        ]}
        dense
      />

      <svg
        viewBox="0 0 400 180"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-full w-full opacity-25"
        aria-hidden="true"
      >
        <path
          d="M62 180 V88 Q62 30 200 30 Q338 30 338 88 V180"
          fill="none"
          stroke={accentSoft}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M187 35 L200 20 L213 35"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
