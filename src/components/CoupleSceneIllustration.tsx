"use client";

type CoupleSceneIllustrationProps = {
  accent: string;
  accentSoft: string;
  decor: "marigold" | "lights" | "petals" | "regal";
  className?: string;
};

/**
 * Minimalist, faceless vector couple illustrations matching the reference cards.
 * Tailors outfits and backgrounds for Haldi, Sangeet, Anand Karaj, and Reception.
 */
export default function CoupleSceneIllustration({
  accent,
  accentSoft,
  decor,
  className = "",
}: CoupleSceneIllustrationProps) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true">
      <defs>
        {/* Soft radial glow behind arch */}
        <radialGradient id="archGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow aura */}
      <circle cx="160" cy="110" r="70" fill="url(#archGlow)" />

      {/* ── MUGHAL MEHRAB ARCH ── */}
      <path
        d="M 110 180 V 90 C 110 55, 130 45, 160 32 C 190 45, 210 55, 210 90 V 180"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 114 180 V 92 C 114 60, 132 50, 160 38 C 188 50, 206 60, 206 92 V 180"
        fill="none"
        stroke="#F3E5AB"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Arch Keystone Ornament */}
      <polygon points="160,26 164,32 160,38 156,32" fill="#D4AF37" />

      {/* ── EVENT 1: HALDI & MEHENDI ── */}
      {decor === "marigold" && (
        <g>
          {/* GROOM - Yellow Kurta & Cream Pajama */}
          <g>
            <circle cx="144" cy="92" r="10" fill="#E5A880" /> {/* Head */}
            <path d="M 136 86 C 140 78, 152 80, 150 86 Z" fill="#FFC107" /> {/* Yellow Pagri */}
            <path d="M 132 180 L 136 122 Q 144 116 152 122 L 156 180 Z" fill="#FFF8E1" /> {/* Kurta */}
            <path d="M 136 122 Q 144 126 152 122 L 150 180 L 138 180 Z" fill="#FFB300" /> {/* Yellow Nehru Jacket */}
          </g>

          {/* BRIDE - Yellow & Mustard Lehenga */}
          <g>
            <circle cx="176" cy="96" r="9.5" fill="#E5A880" /> {/* Head */}
            <path d="M 168 92 C 172 84, 184 86, 182 92 Z" fill="#3E2723" /> {/* Hair */}
            <path d="M 160 180 Q 176 130 192 180 Z" fill="#FF8F00" /> {/* Flared Lehenga */}
            <path d="M 166 126 Q 176 122 186 126 L 184 140 Q 176 142 168 140 Z" fill="#C62828" /> {/* Blouse */}
            <path d="M 166 102 Q 176 96 186 102 Q 188 120 164 150" fill="none" stroke="#FFD54F" strokeWidth="2.5" opacity="0.8" /> {/* Dupatta */}
          </g>
        </g>
      )}

      {/* ── EVENT 2: SANGEET ── */}
      {decor === "lights" && (
        <g>
          {/* GROOM - Royal Navy/Black Sherwani */}
          <g>
            <circle cx="144" cy="92" r="10" fill="#E5A880" />
            <path d="M 136 86 C 140 78, 152 80, 150 86 Z" fill="#1A237E" />
            <path d="M 132 180 L 136 118 Q 144 114 152 118 L 156 180 Z" fill="#0D47A1" />
            <line x1="144" y1="118" x2="144" y2="180" stroke="#FFD700" strokeWidth="1" />
          </g>

          {/* BRIDE - Magenta / Royal Pink Lehenga */}
          <g>
            <circle cx="176" cy="96" r="9.5" fill="#E5A880" />
            <path d="M 168 92 C 172 84, 184 86, 182 92 Z" fill="#212121" />
            <path d="M 158 180 Q 176 128 194 180 Z" fill="#AD1457" />
            <path d="M 166 124 Q 176 120 186 124 L 184 138 Q 176 140 168 138 Z" fill="#880E4F" />
            <path d="M 164 98 Q 176 92 188 98 Q 192 120 162 155" fill="none" stroke="#FF4081" strokeWidth="2.5" opacity="0.85" />
          </g>
        </g>
      )}

      {/* ── EVENT 3: ANAND KARAJ ── */}
      {decor === "petals" && (
        <g>
          {/* GROOM - Cream Sherwani & Soft Pink Turban */}
          <g>
            <circle cx="144" cy="92" r="10" fill="#E5A880" />
            <path d="M 135 86 C 140 76, 153 78, 151 86 Z" fill="#F8BBD0" /> {/* Pink Saafa */}
            <path d="M 132 180 L 136 118 Q 144 114 152 118 L 156 180 Z" fill="#FFFDD0" /> {/* Ivory Sherwani */}
            <path d="M 136 120 Q 148 135 140 170" fill="none" stroke="#E91E63" strokeWidth="2" /> {/* Stole */}
          </g>

          {/* BRIDE - Bridal Red/Pink Lehenga */}
          <g>
            <circle cx="176" cy="96" r="9.5" fill="#E5A880" />
            <path d="M 168 92 C 172 84, 184 86, 182 92 Z" fill="#212121" />
            <path d="M 158 180 Q 176 128 194 180 Z" fill="#C62828" />
            <path d="M 166 124 Q 176 120 186 124 L 184 138 Q 176 140 168 138 Z" fill="#B71C1C" />
            <path d="M 164 98 Q 176 92 188 98 Q 190 120 162 160" fill="none" stroke="#FFCDD2" strokeWidth="2.5" opacity="0.9" />
          </g>
        </g>
      )}

      {/* ── EVENT 4: RECEPTION ── */}
      {decor === "regal" && (
        <g>
          {/* GROOM - Black Tuxedo / Achkan */}
          <g>
            <circle cx="144" cy="92" r="10" fill="#E5A880" />
            <path d="M 136 86 C 140 78, 152 80, 150 86 Z" fill="#212121" />
            <path d="M 132 180 L 136 118 Q 144 114 152 118 L 156 180 Z" fill="#111111" />
            <polygon points="144,122 140,132 148,132" fill="#FFFFFF" /> {/* Shirt/Bowtie */}
            <circle cx="144" cy="128" r="1" fill="#000000" />
          </g>

          {/* BRIDE - Deep Crimson / Maroon Royal Gown */}
          <g>
            <circle cx="176" cy="96" r="9.5" fill="#E5A880" />
            <path d="M 168 92 C 172 84, 184 86, 182 92 Z" fill="#1A1A1A" />
            <path d="M 156 180 Q 176 126 196 180 Z" fill="#4A148C" />
            <path d="M 166 124 Q 176 120 186 124 L 184 138 Q 176 140 168 138 Z" fill="#311B92" />
            <path d="M 164 98 Q 176 92 188 98 Q 192 120 162 155" fill="none" stroke="#E1BEE7" strokeWidth="2" opacity="0.8" />
          </g>
        </g>
      )}
    </svg>
  );
}