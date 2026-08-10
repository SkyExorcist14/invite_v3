"use client";

/**
 * Warm sky lanterns drifting gently upward behind the main invitation.
 * Deterministic positions/timings (hydration-safe). The rise + sway uses the
 * shared `float` keyframe (disabled under prefers-reduced-motion), layered
 * with a slow vertical drift so the lanterns feel like they're floating up.
 *
 * Rendered behind content (very soft, low opacity) so it reads as atmosphere,
 * never as clutter.
 */
export default function FloatingLanterns({
  count = 7,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  // fixed sets so server and client render identically
  const lefts = [8, 22, 37, 52, 66, 80, 92];
  const sizes = [34, 26, 44, 30, 38, 24, 32];
  const delays = [0, 1.6, 0.8, 2.4, 0.4, 3.1, 1.2];
  const durations = [13, 16, 11, 18, 14, 17, 12];
  const bottoms = [-6, 4, -2, 8, 0, 6, 2];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = sizes[i % sizes.length];
        return (
          <div
            key={i}
            className="lantern-rise absolute"
            style={{
              left: `${lefts[i % lefts.length]}%`,
              bottom: `${bottoms[i % bottoms.length]}%`,
              animationDuration: `${durations[i % durations.length]}s`,
              animationDelay: `${delays[i % delays.length]}s`,
            }}
          >
            <div className="animate-sway" style={{ animationDuration: `${5 + (i % 3)}s` }}>
              <svg width={size} height={size * 1.5} viewBox="0 0 40 60">
                <defs>
                  <radialGradient id={`lanternGlow-${i}`} cx="50%" cy="42%" r="55%">
                    <stop offset="0%" stopColor="#FFF3C4" />
                    <stop offset="55%" stopColor="#FFC24B" />
                    <stop offset="100%" stopColor="#E8720C" />
                  </radialGradient>
                </defs>
                {/* halo */}
                <ellipse cx="20" cy="26" rx="19" ry="22" fill="#FFD36B" opacity="0.22" />
                {/* top rim */}
                <rect x="13" y="6" width="14" height="3" rx="1.5" fill="#C9A227" />
                {/* body */}
                <path
                  d="M20 8 C31 8 34 18 34 28 C34 40 27 50 20 52 C13 50 6 40 6 28 C6 18 9 8 20 8 Z"
                  fill={`url(#lanternGlow-${i})`}
                  opacity="0.92"
                />
                {/* seams */}
                <path d="M20 8 L20 52 M11 14 C9 26 11 40 16 50 M29 14 C31 26 29 40 24 50" stroke="#B85C00" strokeWidth="0.6" opacity="0.35" fill="none" />
                {/* glowing base */}
                <ellipse cx="20" cy="50" rx="7" ry="2.4" fill="#FFF3C4" opacity="0.9" />
                {/* tassel */}
                <line x1="20" y1="52" x2="20" y2="58" stroke="#C9A227" strokeWidth="1" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
