"use client";

import { useId } from "react";

type GarlandBorderProps = {
  /** [flowerColor, leafColor, accentColor] */
  colors: [string, string, string];
  className?: string;
};

/**
 * A tileable SVG garland — a thin string of flowers and leaves, echoing the
 * marigold/floral garlands strung along physical mandap and stage décor.
 * Built as a repeating <pattern> so it scales to any card width without
 * stretching or distorting the motif.
 */
export default function GarlandBorder({ colors, className = "" }: GarlandBorderProps) {
  const id = useId().replace(/[:]/g, "");
  const [flower, leaf, accent] = colors;

  return (
    <svg
      viewBox="0 0 240 36"
      preserveAspectRatio="none"
      className={`h-9 w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={`garland-${id}`} width="60" height="36" patternUnits="userSpaceOnUse">
          {/* hanging string */}
          <path
            d="M0 6 Q15 18 30 6 T60 6"
            fill="none"
            stroke={accent}
            strokeWidth="1"
            opacity="0.5"
          />
          {/* leaf left */}
          <ellipse cx="12" cy="13" rx="5" ry="2.5" fill={leaf} opacity="0.85" transform="rotate(-30 12 13)" />
          {/* flower */}
          <g transform="translate(30 14)">
            <circle r="3.2" cx="0" cy="-5" fill={flower} opacity="0.9" />
            <circle r="3.2" cx="4.3" cy="-1.5" fill={flower} opacity="0.9" />
            <circle r="3.2" cx="2.6" cy="4" fill={flower} opacity="0.9" />
            <circle r="3.2" cx="-2.6" cy="4" fill={flower} opacity="0.9" />
            <circle r="3.2" cx="-4.3" cy="-1.5" fill={flower} opacity="0.9" />
            <circle r="2" cx="0" cy="0" fill={accent} />
          </g>
          {/* leaf right */}
          <ellipse cx="48" cy="13" rx="5" ry="2.5" fill={leaf} opacity="0.85" transform="rotate(30 48 13)" />
        </pattern>
      </defs>
      <rect width="240" height="36" fill={`url(#garland-${id})`} />
    </svg>
  );
}
