"use client";

import { useId } from "react";

type FloralSprayProps = {
  className?: string;
  /** Slightly re-weights the palette so repeated corners don't look identical. */
  variant?: 0 | 1 | 2 | 3;
};

/**
 * A dense, layered corner spray of blossoms and foliage — peonies,
 * bougainvillea, garden roses, buds and filler flowers nestled in rich,
 * overlapping leaves. Built to read like the lush watercolor floral borders
 * on premium Indian wedding invitations (bougainvillea arch reference), NOT
 * the thin fern strands it replaces.
 *
 * Drawn in a top-left orientation inside a 200×200 box; flip it into the
 * other corners with Tailwind's -scale-x-100 / -scale-y-100 utilities.
 * All gradient ids are namespaced per-instance (useId) so multiple sprays
 * can share a page without their gradients colliding.
 */
export default function FloralSpray({ className = "", variant = 0 }: FloralSprayProps) {
  const raw = useId().replace(/[:]/g, "");
  const gid = (name: string) => `${name}-${raw}`;

  // palette
  const GREEN_DEEP = "#2F6B41";
  const GREEN_MID = "#4E9155";
  const GREEN_SAGE = "#7FB579";
  const GREEN_LIGHT = "#A9D39A";

  // ── a full peony: soft radial body + two rings of ruffled petals ──
  const peony = (
    cx: number,
    cy: number,
    scale: number,
    fill: string,
    rot = 0
  ) => (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) rotate(${rot})`}>
      <circle r="17" fill={fill} opacity="0.9" />
      {/* outer ruffle */}
      {Array.from({ length: 9 }).map((_, i) => (
        <ellipse
          key={`o${i}`}
          cx="0"
          cy="-13"
          rx="7.5"
          ry="11"
          fill={fill}
          opacity="0.92"
          transform={`rotate(${i * 40})`}
        />
      ))}
      {/* inner ruffle, lighter */}
      {Array.from({ length: 7 }).map((_, i) => (
        <ellipse
          key={`i${i}`}
          cx="0"
          cy="-7"
          rx="5"
          ry="7.5"
          fill={`url(#${gid("petalLight")})`}
          opacity="0.95"
          transform={`rotate(${i * 51 + 25})`}
        />
      ))}
      {/* center */}
      <circle r="5.5" fill={`url(#${gid("core")})`} />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} r="1.4" cx="0" cy="-3.2" fill="#B8860B" opacity="0.75" transform={`rotate(${a})`} />
      ))}
    </g>
  );

  // ── a garden rose: nested rotated cupped petals spiralling to a swirl ──
  const rose = (cx: number, cy: number, scale: number, fill: string) => (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle r="15" fill={fill} opacity="0.85" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path
          key={a}
          d="M0 0 Q10 -4 12 -13 Q0 -17 -12 -13 Q-10 -4 0 0 Z"
          fill={fill}
          opacity="0.9"
          transform={`rotate(${a}) scale(0.95)`}
        />
      ))}
      {[30, 150, 270].map((a) => (
        <path
          key={a}
          d="M0 0 Q7 -3 8 -9 Q0 -12 -8 -9 Q-7 -3 0 0 Z"
          fill={`url(#${gid("petalLight")})`}
          opacity="0.95"
          transform={`rotate(${a})`}
        />
      ))}
      <path d="M-4 -1 Q0 -6 4 -1 Q0 3 -4 -1 Z" fill={`url(#${gid("core")})`} />
    </g>
  );

  // ── bougainvillea: 3 papery bracts + tiny white flowers (the pink arch look) ──
  const bougainvillea = (cx: number, cy: number, scale: number, rot = 0) => (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) rotate(${rot})`}>
      {[0, 120, 240].map((a) => (
        <path
          key={a}
          d="M0 0 C6 -4 9 -12 5 -19 C2 -22 -2 -22 -5 -19 C-9 -12 -6 -4 0 0 Z"
          fill={`url(#${gid("bract")})`}
          opacity="0.95"
          transform={`rotate(${a})`}
        />
      ))}
      {[0, 120, 240].map((a) => (
        <circle key={`c${a}`} r="1.6" cx="0" cy="-11" fill="#FFF6E4" transform={`rotate(${a})`} />
      ))}
    </g>
  );

  const bud = (cx: number, cy: number, scale: number, fill: string, rot = 0) => (
    <g transform={`translate(${cx} ${cy}) scale(${scale}) rotate(${rot})`}>
      <path d="M0 0 C-5 -3 -5 -12 0 -16 C5 -12 5 -3 0 0 Z" fill={fill} opacity="0.92" />
      <path d="M0 2 C-4 0 -5 -7 -2 -10 M0 2 C4 0 5 -7 2 -10" fill="none" stroke={GREEN_MID} strokeWidth="2.4" opacity="0.9" strokeLinecap="round" />
    </g>
  );

  const filler = (cx: number, cy: number, scale: number, petal: string, center: string) => (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-5" rx="3" ry="5" fill={petal} opacity="0.95" transform={`rotate(${a})`} />
      ))}
      <circle r="2.3" fill={center} />
    </g>
  );

  // ── a leaf: teardrop with a mid-vein ──
  const leaf = (cx: number, cy: number, rot: number, scale: number, color: string, opacity = 0.9) => (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${scale})`}>
      <path d="M0 0 C11 -7 11 -23 0 -32 C-11 -23 -11 -7 0 0 Z" fill={color} opacity={opacity} />
      <path d="M0 -3 L0 -28" stroke="#FFFFFF" strokeWidth="1" opacity="0.22" />
    </g>
  );

  // small palette rotation per corner so they aren't carbon copies
  const rosePink = ["#EE6FA1", "#E85C97", "#F07FA8", "#E96BA0"][variant];
  const peonyBlush = ["#F5A9C4", "#F4B7C9", "#F3A0BE", "#F6AFC7"][variant];

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gid("petalLight")} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FCE3EC" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id={gid("core")} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FBE7A6" />
          <stop offset="100%" stopColor="#E8A93D" />
        </radialGradient>
        <linearGradient id={gid("bract")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F04C93" />
          <stop offset="100%" stopColor="#C01A6B" />
        </linearGradient>
        <radialGradient id={gid("soft")} cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FBD7E6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FBD7E6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft watercolor wash behind the cluster */}
      <circle cx="60" cy="60" r="82" fill={`url(#${gid("soft")})`} />

      {/* ══ FOLIAGE (back → front) — a full green mass fanning from the corner
            and trailing along both edges like a garland cascade ══ */}
      <g>
        {/* back layer — deep green, large, fills the corner */}
        {leaf(16, 26, 18, 1.7, GREEN_DEEP, 0.85)}
        {leaf(44, 16, 48, 1.5, GREEN_DEEP, 0.82)}
        {leaf(74, 22, 70, 1.4, GREEN_DEEP, 0.8)}
        {leaf(104, 30, 84, 1.3, GREEN_DEEP, 0.78)}
        {leaf(136, 44, 96, 1.15, GREEN_DEEP, 0.72)}
        {leaf(26, 54, 344, 1.55, GREEN_DEEP, 0.82)}
        {leaf(18, 86, 326, 1.4, GREEN_DEEP, 0.78)}
        {leaf(30, 120, 312, 1.2, GREEN_DEEP, 0.72)}
        {leaf(46, 148, 300, 1.05, GREEN_DEEP, 0.68)}

        {/* mid layer */}
        {leaf(56, 36, 56, 1.3, GREEN_MID, 0.92)}
        {leaf(88, 40, 82, 1.2, GREEN_MID, 0.9)}
        {leaf(118, 58, 104, 1.05, GREEN_MID, 0.86)}
        {leaf(42, 74, 336, 1.25, GREEN_MID, 0.9)}
        {leaf(30, 104, 320, 1.1, GREEN_MID, 0.86)}
        {leaf(64, 118, 314, 1.0, GREEN_MID, 0.84)}
        {leaf(100, 84, 116, 1.0, GREEN_MID, 0.84)}

        {/* front layer — sage & light, catches the eye */}
        {leaf(72, 56, 72, 1.0, GREEN_SAGE, 0.95)}
        {leaf(52, 96, 338, 0.95, GREEN_SAGE, 0.95)}
        {leaf(112, 92, 122, 0.9, GREEN_SAGE, 0.92)}
        {leaf(88, 116, 128, 0.82, GREEN_LIGHT, 0.95)}
        {leaf(36, 128, 326, 0.8, GREEN_LIGHT, 0.95)}
        {leaf(126, 72, 110, 0.78, GREEN_LIGHT, 0.95)}
      </g>

      {/* ══ BLOSSOMS — clustered near the corner, trailing outward ══ */}
      {/* bougainvillea garland trailing down both edges (the signature look) */}
      {bougainvillea(120, 34, 1.15, 12)}
      {bougainvillea(146, 56, 0.95, 40)}
      {bougainvillea(36, 116, 1.1, -28)}
      {bougainvillea(58, 146, 0.9, -8)}
      {bougainvillea(102, 100, 0.85, 64)}
      {bougainvillea(22, 66, 0.78, -50)}

      {/* hero blooms, overlapping into a lush mass */}
      {peony(50, 48, 1.25, peonyBlush, 0)}
      {rose(90, 66, 1.05, rosePink)}
      {peony(70, 98, 0.92, "#F7C0D4", 18)}
      {rose(34, 84, 0.8, peonyBlush)}

      {/* buds tucked among the leaves */}
      {bud(128, 74, 1.1, rosePink, 34)}
      {bud(94, 132, 0.95, "#F5A9C4", 10)}
      {bud(20, 100, 0.9, peonyBlush, -24)}

      {/* filler flowers add sparkle */}
      {filler(110, 18, 1, "#FFFFFF", "#F0C419")}
      {filler(24, 46, 0.9, "#FCE9B0", "#E0218A")}
      {filler(134, 100, 0.85, "#FFFFFF", "#F0C419")}
      {filler(60, 72, 0.8, "#F7C0D4", "#F0C419")}
      {filler(80, 40, 0.72, "#FFFFFF", "#F0C419")}
    </svg>
  );
}
