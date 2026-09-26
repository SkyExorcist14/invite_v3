"use client";

type FloralSprayProps = {
  variant?: 1 | 2;
  className?: string;
};

/**
 * Realistic botanical corner flourish with gradient-shaded rose blooms,
 * multi-toned foliage with delicate veining, and realistic stamen details.
 */
export default function FloralSpray({ variant = 1, className = "" }: FloralSprayProps) {
  const isAlt = variant === 2;

  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      aria-hidden="true"
      style={{ transform: isAlt ? "scaleX(-1)" : "none" }}
    >
      <defs>
        {/* Soft realistic drop shadow for overlapping petals */}
        <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0.8" dy="1.2" stdDeviation="1.2" floodColor="#2A080C" floodOpacity="0.28" />
        </filter>

        {/* Deep Rose Radial Gradient */}
        <radialGradient id="roseGradMain" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#E26D7D" />
          <stop offset="45%" stopColor="#B82E44" />
          <stop offset="85%" stopColor="#7A1222" />
          <stop offset="100%" stopColor="#4A0610" />
        </radialGradient>

        {/* Outer Petal Highlight Gradient */}
        <radialGradient id="roseGradSoft" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#F7A8B4" />
          <stop offset="50%" stopColor="#CF4257" />
          <stop offset="100%" stopColor="#801424" />
        </radialGradient>

        {/* Blush Accent Flower Gradient */}
        <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2E8" />
          <stop offset="55%" stopColor="#F3B3A6" />
          <stop offset="90%" stopColor="#D97A6C" />
          <stop offset="100%" stopColor="#A84336" />
        </radialGradient>

        {/* Realistic Leaf Linear Gradient */}
        <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#688055" />
          <stop offset="50%" stopColor="#3B522B" />
          <stop offset="100%" stopColor="#1E2E14" />
        </linearGradient>

        <linearGradient id="leafGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A9A68" />
          <stop offset="70%" stopColor="#4D633C" />
          <stop offset="100%" stopColor="#25361A" />
        </linearGradient>

        {/* Warm Gold Accent Gradient */}
        <linearGradient id="goldStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA5" />
          <stop offset="50%" stopColor="#D4A338" />
          <stop offset="100%" stopColor="#8C6311" />
        </linearGradient>
      </defs>

      {/* ── BOTANICAL FOLIAGE & STEMS ── */}
      <g>
        {/* Main Curved Vine */}
        <path
          d="M 12 14 C 45 32, 85 48, 142 128"
          fill="none"
          stroke="url(#leafGrad1)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Leaf 1 - Top Outer */}
        <g>
          <path
            d="M 28 22 C 18 8, 42 2, 54 18 C 42 24, 32 26, 28 22 Z"
            fill="url(#leafGrad2)"
            filter="url(#petalShadow)"
          />
          <path d="M 28 22 Q 40 14 54 18" fill="none" stroke="#A3B582" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* Leaf 2 - Mid Left */}
        <g>
          <path
            d="M 18 52 C 2 48, 8 28, 28 36 C 26 48, 22 52, 18 52 Z"
            fill="url(#leafGrad1)"
            filter="url(#petalShadow)"
          />
          <path d="M 18 52 Q 18 40 28 36" fill="none" stroke="#7A9163" strokeWidth="0.7" opacity="0.6" />
        </g>

        {/* Leaf 3 - Bottom Extending */}
        <g>
          <path
            d="M 98 108 C 118 126, 128 148, 112 152 C 98 148, 92 126, 98 108 Z"
            fill="url(#leafGrad2)"
            filter="url(#petalShadow)"
          />
          <path d="M 98 108 Q 106 130 112 152" fill="none" stroke="#B3C493" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* Delicate Gold Eucalyptus Sprigs */}
        <path d="M 45 40 Q 70 20 95 28" fill="none" stroke="url(#goldStemGrad)" strokeWidth="1.2" />
        <circle cx="62" cy="28" r="3.5" fill="url(#goldStemGrad)" opacity="0.9" />
        <circle cx="78" cy="24" r="3" fill="url(#goldStemGrad)" opacity="0.9" />
        <circle cx="92" cy="27" r="2.5" fill="url(#goldStemGrad)" opacity="0.9" />
      </g>

      {/* ── REALISTIC MAIN ROSE BLOOM ── */}
      <g transform="translate(58, 58)">
        {/* Layer 1: Outer Base Petals */}
        <path
          d="M -32 -8 C -42 -30, -12 -44, 4 -36 C 24 -44, 46 -24, 38 -2 C 48 18, 28 42, 6 40 C -16 46, -38 28, -32 -8 Z"
          fill="url(#roseGradMain)"
          filter="url(#petalShadow)"
        />

        {/* Layer 2: Intermediate Cupped Petals */}
        <path
          d="M -24 -4 C -32 -22, -6 -34, 6 -26 C 20 -32, 34 -16, 28 2 C 34 18, 18 32, 2 30 C -16 34, -28 18, -24 -4 Z"
          fill="url(#roseGradSoft)"
        />

        {/* Layer 3: Inner Petal Spiral & Highlights */}
        <path
          d="M -16 -2 C -20 -14, -2 -22, 6 -16 C 16 -20, 24 -8, 18 4 C 22 14, 10 22, 0 20 C -12 22, -18 10, -16 -2 Z"
          fill="url(#roseGradMain)"
        />

        {/* Layer 4: Tight Rose Center Core */}
        <ellipse cx="0" cy="0" rx="8" ry="7" fill="#540813" />
        <path
          d="M -5 -2 C -3 -7, 4 -7, 6 -2 C 7 3, -1 7, -5 -2 Z"
          fill="#F7A8B4"
          opacity="0.85"
        />
        <path d="M -2 -1 C 0 -4, 3 -4, 4 -1" fill="none" stroke="#FFE0E5" strokeWidth="1" />
      </g>

      {/* ── SECONDARY BLUSH BLOOM ── */}
      <g transform="translate(112, 48)">
        {/* Realistic 5-Petal Flower Structure */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <path
            key={i}
            d="M 0 0 C -8 -16, 8 -22, 12 -12 C 16 -2, 4 0, 0 0 Z"
            fill="url(#blushGrad)"
            filter="url(#petalShadow)"
            transform={`rotate(${angle})`}
          />
        ))}

        {/* Detailed Golden Center Pistil & Pollen Filaments */}
        <circle cx="0" cy="0" r="3.5" fill="#7A2215" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <line x1="0" y1="0" x2="0" y2="-5" stroke="#FFE194" strokeWidth="0.6" />
            <circle cx="0" cy="-5.5" r="0.8" fill="#FFC02B" />
          </g>
        ))}
      </g>

      {/* ── ACCENT ROSEBUD (Top Left) ── */}
      <g transform="translate(26, 84)">
        <path d="M -2 12 Q -8 24 -12 30" fill="none" stroke="url(#leafGrad1)" strokeWidth="1.8" />
        {/* Sepals */}
        <path d="M -8 2 C -12 -4, -6 -12, 0 -8 C 6 -12, 12 -4, 8 2 Z" fill="url(#leafGrad2)" />
        {/* Bud Petals */}
        <path d="M -6 -2 C -10 -14, 0 -20, 6 -14 C 10 -8, 6 2, -6 -2 Z" fill="url(#roseGradSoft)" />
        <path d="M -3 -6 C -5 -12, 1 -15, 4 -10" fill="none" stroke="#FFA3B1" strokeWidth="0.8" />
      </g>
    </svg>
  );
}