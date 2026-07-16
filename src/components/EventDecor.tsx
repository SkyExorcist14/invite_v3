"use client";

type Decor = "marigold" | "lights" | "petals" | "regal";

type EventDecorProps = {
  decor: Decor;
  accent: string;
  accentSoft: string;
};

/**
 * Ambient, on-theme decoration layered inside each event banner — behind the
 * title text. Everything here is deterministic (no random at render) so it's
 * hydration-safe, and every animation is a Tailwind `animate-*` class that is
 * switched off under prefers-reduced-motion (see globals.css).
 *
 *   regal    → Reception : a warm draped string of blinking fairy lights
 *   lights   → Sangeet   : hanging jewel-tone lights + popping sparkles
 *   marigold → Haldi     : swaying marigold garland strands + a soft sun glow
 *   petals   → Anand Karaj: drifting flower petals under a faint sacred arch
 */
export default function EventDecor({ decor, accent, accentSoft }: EventDecorProps) {
  if (decor === "regal" || decor === "lights") {
    const warm = decor === "regal";
    const bulbColors = warm
      ? ["#FFE9A8", "#FFD36B", "#FFF3CE"]
      : [accent, accentSoft, "#FFF3CE"];
    // 11 bulbs draped along a shallow catenary across the banner top
    const bulbs = Array.from({ length: 11 });
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-24 w-full">
          <path d="M-10 8 Q100 44 200 20 T410 12" fill="none" stroke="#00000033" strokeWidth="1.5" />
        </svg>
        {bulbs.map((_, i) => {
          const t = i / (bulbs.length - 1);
          const left = t * 100;
          // approximate the same catenary droop as the wire above
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
          [
            [16, 30],
            [82, 24],
            [30, 70],
            [70, 62],
            [50, 44],
          ].map(([l, t], i) => (
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
    // hanging garland strands of marigolds swaying from the top edge
    const strands = [12, 30, 50, 70, 88];
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* soft morning sun glow, top-right */}
        <span
          className="animate-glow absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, #FFE49E 0%, transparent 70%)" }}
        />
        {strands.map((left, s) => (
          <div
            key={left}
            className="animate-sway absolute top-0 origin-top"
            style={{ left: `${left}%`, animationDelay: `${s * 0.4}s` }}
          >
            {Array.from({ length: 4 + (s % 2) }).map((_, i) => (
              <span
                key={i}
                className="block h-3 w-3 rounded-full"
                style={{
                  marginTop: i === 0 ? 0 : 3,
                  background: `radial-gradient(circle at 35% 30%, #FFD36B, ${accent})`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // petals — Anand Karaj
  const petals = [
    [14, 8, 0],
    [34, 4, 1.4],
    [58, 10, 0.6],
    [80, 6, 2.1],
    [24, 2, 3.2],
    [68, 3, 1.1],
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* faint sacred arch */}
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
