"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import FloatingPetals from "./FloatingPetals";
import { couple } from "@/data/weddingData";
import { usePrefersReducedMotion } from "@/lib/utils";

type LandingCardProps = {
  onOpen: () => void;
};

const LANDING_PETAL_COLORS = ["#E0218A", "#F0C419", "#7FA86E", "#357A8C", "#F3722C"];

export default function LandingCard({ onOpen }: LandingCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useTransform(rotateX, (v) => `${v}deg`);
  const springY = useTransform(rotateY, (v) => `${v}deg`);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || e.pointerType === "touch") return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  }
  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 px-5 py-10">
      <FloatingPetals colors={LANDING_PETAL_COLORS} count={18} />

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-bark/70 sm:text-xs">
          Wedding Invitation
        </p>

        {/* ── ENVELOPE ── a clearly readable closed envelope */}
        <motion.div
          ref={wrapRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={onOpen}
          role="button"
          tabIndex={0}
          aria-label="Tap the envelope to open the wedding invitation"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onOpen();
          }}
          style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
          whileHover={reducedMotion ? undefined : { scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="group relative mt-8 h-52 w-72 cursor-pointer select-none sm:h-56 sm:w-80"
        >
          {/* back of envelope */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cream-100 to-cream-200 shadow-card" />

          {/* left & right diagonal walls (so it reads as a 3D envelope) */}
          <svg viewBox="0 0 320 224" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            {/* body */}
            <rect x="2" y="2" width="316" height="220" rx="8" fill="#FBF6EC" stroke="#C9A227" strokeWidth="1.5" strokeOpacity="0.5" />
            {/* bottom diagonal seams */}
            <path d="M2 222 L160 120 L318 222" fill="none" stroke="#C9A227" strokeWidth="1.2" strokeOpacity="0.35" />
            {/* side seams */}
            <path d="M2 2 L160 120 L2 222" fill="#F4EAD3" fillOpacity="0.5" />
            <path d="M318 2 L160 120 L318 222" fill="#F4EAD3" fillOpacity="0.5" />
          </svg>

          {/* the closed flap (triangle pointing down), clearly an envelope flap */}
          <svg viewBox="0 0 320 224" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCF8EF" />
                <stop offset="100%" stopColor="#F0E6CE" />
              </linearGradient>
            </defs>
            <path d="M2 2 L160 124 L318 2 Z" fill="url(#flapGrad)" stroke="#C9A227" strokeWidth="1.5" strokeOpacity="0.55" />
            {/* tiny floral sprig on the flap */}
            <g opacity="0.4">
              <circle cx="160" cy="40" r="3" fill="#E0218A" />
              <ellipse cx="150" cy="46" rx="4" ry="2" fill="#7FA86E" transform="rotate(-25 150 46)" />
              <ellipse cx="170" cy="46" rx="4" ry="2" fill="#7FA86E" transform="rotate(25 170 46)" />
            </g>
          </svg>

          {/* wax seal at the flap tip — Ik Onkar emboss */}
          <div
            className="absolute left-1/2 top-[55%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-gold sm:h-14 sm:w-14"
            style={{ background: "radial-gradient(circle at 35% 30%, #E3C567, #B8860B 72%)" }}
          >
            <span className="font-heading text-xl leading-none text-cream-50 sm:text-2xl">
              ੴ
            </span>
          </div>

          {/* hint shimmer */}
          {!reducedMotion && (
            <div
              className="pointer-events-none absolute inset-0 animate-shimmer rounded-lg opacity-40"
              style={{
                background:
                  "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
            />
          )}
        </motion.div>

        <h1 className="mt-10 font-script text-4xl leading-tight text-bark sm:text-5xl">
          {couple.brideFirst}
          <span className="mx-2 font-heading text-2xl text-gold-500 sm:text-3xl">&amp;</span>
          {couple.groomFirst}
        </h1>

        <div className="mt-6 h-px w-16 bg-gold-400/50" />

        <p className="mt-5 font-body text-sm text-bark/70">
          Tap the envelope to open your invitation
        </p>
      </div>
    </div>
  );
}
