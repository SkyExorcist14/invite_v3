"use client";

type Decor = "marigold" | "lights" | "petals" | "regal";

type EventDecorProps = {
  decor: Decor;
  accent: string;
  accentSoft: string;
};

/** A defined marigold bloom (concentric ruffled petal rings) — replaces the
 *  plain "ball" that used to hang on the Haldi garlands. */
function Marigold({ size = 20, accent = "#E8720C" }: { size?: number; accent?: string }) {
  const petals = (count: number, r: number, ry: number, fill: string, rot = 0) =>
    Array.from({ length: count }).map((_, i) => (
      <ellipse
        key={`${r}-${i}`}
        cx="24"
        cy={24 - r}
        rx={ry * 0.7}
        ry={ry}
        fill={fill}
        transform={`rotate(${(360 / count) * i + rot} 24 24)`}
      />
    ));
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="drop-shadow-sm">
      <circle cx="24" cy="24" r="17" fill={accent} opacity="0.35" />
      {petals(13, 15, 6, accent)}
      {petals(11, 11, 5.5, "#F79413", 16)}
      {petals(9, 7, 4.5, "#FFC53D", 8)}
      <circle cx="24" cy="24" r="4.2" fill="#FFB300" />
      <circle cx="24" cy="24" r="2" fill="#E8720C" />
    </svg>
  );
}

/**
 * Ambient, on-theme decoration layered inside each event banner — behind the
 * title text. Deterministic (hydration-safe); every animation is a Tailwind
 * `animate-*` class switched off under prefers-reduced-motion (globals.css).
 *
 *   regal    → Reception : draped fairy lights + a glittery twinkling starfield
 *   lights   → Sangeet   : hanging jewel-tone lights + popping sparkles
 *   marigold → Haldi     : swaying marigold-flower garlands + a soft sun glow
 *   petals   → Anand Karaj: drifting flower petals under a faint sacred arch
 */
export default function EventDecor({ decor, accent, accentSoft }: EventDecorProps) {
  if (decor === "regal" || decor === "lights") {
    const warm = decor === "regal";
    const bulbColors = warm
      ? ["#FFE9A8", "#FFD36B", "#FFF3CE"]
      : [accent, accentSoft, "#FFF3CE"];
    const bulbs = Array.from({ length: 11 });

    // A dense, glittery starfield for the Reception (more shine).
    const stars = [
      [8, 20, 5, 0], [15, 55, 3, 0.6], [23, 30, 6, 1.1], [31, 68, 4, 0.3],
      [39, 18, 5, 1.5], [46, 50, 3, 0.9], [54, 26, 6, 0.2], [61, 64, 4, 1.3],
      [69, 22, 5, 0.7], [77, 52, 3, 1.7], [85, 32, 6, 0.4], [92, 60, 4, 1.0],
      [12, 78, 4, 1.2], [36, 84, 5, 0.5], [58, 82, 4, 1.6], [80, 78, 5, 0.8],
      [26, 46, 3, 2.0], [66, 44, 4, 0.1], [50, 72, 5, 1.4], [4, 44, 4, 0.9],
    ];

    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* glittery starfield (reception) */}
        {warm &&
          stars.map(([l, t, s, d], i) => (
            <span
              key={`st${i}`}
              className="animate-twinkle absolute rounded-full"
              style={{
                left: `${l}%`,
                top: `${t}%`,
                width: `${s}px`,
                height: `${s}px`,
                background: i % 3 === 0 ? "#FFF6DA" : "#FFD86B",
                boxShadow: `0 0 ${s + 3}px ${s / 2}px rgba(255,214,107,0.9)`,
                animationDelay: `${d}s`,
              }}
            />
          ))}
        {warm &&
          [[20, 24], [72, 30], [45, 62], [88, 70], [10, 66]].map(([l, t], i) => (
            <span
              key={`bg${i}`}
              className="animate-sparkle absolute text-[0.9rem] text-cream-50"
              style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.6}s` }}
            >
              ✦
            </span>
          ))}

        {/* draped wire + fairy lights */}
        <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-24 w-full">
          <path d="M-10 8 Q100 44 200 20 T410 12" fill="none" stroke="#00000033" strokeWidth="1.5" />
        </svg>
        {bulbs.map((_, i) => {
          const t = i / (bulbs.length - 1);
          const left = t * 100;
          const droop = Math.sin(t * Math.PI) * 26 + (t < 0.5 ? t * 8 : (1 - t) * 8);
          const color = bulbColors[i % bulbColors.length];
          return (
            <span
              key={i}
              className="animate-twinkle absolute block h-2.5 w-2.5 rounded-full"
              style={{
                left: `calc(${left}% - 5px)`,
                top: `${8 + droop}px`,
                background: color,
                boxShadow: `0 0 8px 2px ${color}`,
                animationDelay: `${(i % 5) * 0.32}s`,
              }}
            />
          );
        })}
        {!warm &&
          [[16, 30], [82, 24], [30, 70], [70, 62], [50, 44]].map(([l, t], i) => (
            <span
              key={`sp${i}`}
              className="animate-sparkle absolute text-cream-50"
              style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.5}s` }}
            >
              ✦
            </span>
          ))}
      </div>
    );
  }

  if (decor === "marigold") {
    // hanging garland strands of marigold FLOWERS swaying from the top edge
    const strands = [10, 28, 47, 66, 85];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* soft morning sun glow, top-right */}
        <span
          className="animate-glow absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, #FFE49E 0%, transparent 70%)" }}
        />
        {strands.map((left, s) => {
          const count = 3 + (s % 2);
          return (
            <div
              key={left}
              className="animate-sway absolute top-0 flex origin-top flex-col items-center"
              style={{ left: `${left}%`, animationDelay: `${s * 0.4}s` }}
            >
              {/* thread */}
              <span className="h-6 w-px bg-[#E8A24C]/50" />
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="-mt-1 flex flex-col items-center">
                  <Marigold size={i === 0 ? 22 : 18} accent={accent} />
                  {i < count - 1 && <span className="h-2 w-px bg-[#E8A24C]/50" />}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  // petals — Anand Karaj
  const petals = [
    [14, 8, 0], [34, 4, 1.4], [58, 10, 0.6],
    [80, 6, 2.1], [24, 2, 3.2], [68, 3, 1.1],
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-40">
        <path
          d="M70 200 V96 Q70 34 200 34 Q330 34 330 96 V200"
          fill="none"
          stroke={accentSoft}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M188 40 L200 26 L212 40 Z" fill={accent} opacity="0.8" />
      </svg>
      {petals.map(([left, top, delay], i) => (
        <span
          key={i}
          className="animate-float absolute block"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
            <ellipse cx="10" cy="10" rx="5" ry="9" fill={i % 2 ? accent : accentSoft} opacity="0.85" />
          </svg>
        </span>
      ))}
    </div>
  );
}
