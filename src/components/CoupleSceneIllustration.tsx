type CoupleSceneIllustrationProps = {
  accent: string;
  accentSoft: string;
  decor: "marigold" | "lights" | "petals" | "regal";
  className?: string;
};

/**
 * A warm, stylized couple in traditional maroon Indian wedding attire,
 * standing close under a floral arch — the groom in a sherwani with a
 * draped stole, the bride in a flared lehenga with a dupatta. Modeled on
 * the caricature reference so it reads as on-theme even before you add your
 * own art. Replace it by dropping a file at the event's imagePath (see the
 * comment in EventCard.tsx); this is only shown until then.
 *
 * The couple uses a fixed maroon/cream palette (to match real wedding
 * attire); the `accent` colors are used only for the surrounding arch and
 * decor so each event still feels distinct.
 */
const MAROON = "#7C1F2E";
const MAROON_DEEP = "#5E1622";
const CREAM = "#EFE4CC";
const SKIN = "#E7C4A0";
const HAIR = "#2C211C";

export default function CoupleSceneIllustration({
  accent,
  accentSoft,
  decor,
  className = "",
}: CoupleSceneIllustrationProps) {
  return (
    <svg viewBox="0 0 320 240" className={className} aria-hidden="true">
      {/* soft glow + ground */}
      <ellipse cx="160" cy="150" rx="78" ry="84" fill={accentSoft} opacity="0.14" />
      <ellipse cx="160" cy="226" rx="74" ry="9" fill={accent} opacity="0.15" />

      {/* floral arch */}
      <path
        d="M68 226 V120 Q68 42 160 42 Q252 42 252 120 V226"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        opacity="0.5"
        strokeLinecap="round"
      />
      {[80, 240].map((x) => (
        <g key={x} opacity="0.5">
          {[66, 98, 130].map((y) => (
            <circle key={y} cx={x} cy={y} r="3" fill={accentSoft} />
          ))}
        </g>
      ))}

      {/* keystone decor varies per event */}
      {decor === "marigold" && (
        <g opacity="0.9">
          {[136, 150, 160, 170, 184].map((x, i) => (
            <circle key={x} cx={x} cy={48 + (i % 2 ? 7 : 0)} r="5" fill={accentSoft} />
          ))}
        </g>
      )}
      {decor === "lights" && (
        <g opacity="0.9">
          {[132, 150, 160, 170, 188].map((x) => (
            <circle key={x} cx={x} cy={54 + Math.abs(160 - x) / 10} r="3" fill={accentSoft} />
          ))}
        </g>
      )}
      {decor === "petals" && (
        <g opacity="0.85">
          {[146, 160, 174].map((x, i) => (
            <ellipse key={x} cx={x} cy={50 + i} rx="7" ry="3.5" fill={accentSoft} transform={`rotate(${(i - 1) * 22} ${x} ${50 + i})`} />
          ))}
        </g>
      )}
      {decor === "regal" && (
        <path d="M144 52 L150 42 L160 50 L170 42 L176 52 Z" fill={accentSoft} opacity="0.9" />
      )}

      {/* ── COUPLE in maroon attire, standing close ── */}
      {/* GROOM */}
      <g>
        {/* draped stole behind */}
        <path d="M150 150 Q170 176 162 224 L150 224 Q152 184 140 158 Z" fill={MAROON_DEEP} opacity="0.9" />
        {/* turban */}
        <path d="M119 116 Q128 99 147 108 Q145 117 138 121 Z" fill={MAROON} />
        <ellipse cx="134" cy="123" rx="11" ry="12" fill={SKIN} />
        <path d="M122 116 Q134 105 146 116 Q140 112 134 112 Q128 112 122 116 Z" fill={MAROON} />
        {/* cream sherwani */}
        <path d="M115 222 Q113 158 134 150 Q155 158 153 222 Z" fill={CREAM} />
        <line x1="134" y1="152" x2="134" y2="220" stroke={MAROON} strokeWidth="1.4" opacity="0.55" />
        {/* collar/buttons */}
        {[164, 178, 192].map((y) => (
          <circle key={y} cx="134" cy={y} r="1.5" fill={MAROON} opacity="0.6" />
        ))}
      </g>

      {/* BRIDE — leaning toward groom */}
      <g>
        <ellipse cx="186" cy="120" rx="11" ry="12" fill={SKIN} />
        {/* hair */}
        <path d="M175 118 Q176 103 186 103 Q197 103 197 120 Q197 134 191 142 Q189 124 186 122 Q182 124 180 142 Q176 130 175 118 Z" fill={HAIR} opacity="0.9" />
        {/* dupatta over head */}
        <path d="M173 120 Q186 99 199 120 Q194 111 186 111 Q178 111 173 120 Z" fill={MAROON} opacity="0.65" />
        {/* flared maroon lehenga */}
        <path d="M158 222 Q166 156 186 150 Q206 156 214 222 Z" fill={MAROON} />
        {/* gold hem + border */}
        <path d="M158 222 Q186 213 214 222" fill="none" stroke={accentSoft} strokeWidth="2.5" opacity="0.7" />
        <path d="M164 200 Q186 193 208 200" fill="none" stroke={CREAM} strokeWidth="1.4" opacity="0.6" />
        {/* motifs */}
        {[174, 186, 198].map((x) => (
          <circle key={x} cx={x} cy="208" r="2" fill={CREAM} opacity="0.7" />
        ))}
        {/* blouse */}
        <path d="M178 156 Q186 150 194 156 L192 168 Q186 164 180 168 Z" fill={MAROON_DEEP} />
      </g>
    </svg>
  );
}
