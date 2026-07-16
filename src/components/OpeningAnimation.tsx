"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/utils";

type OpeningAnimationProps = {
  onComplete: () => void;
};

/**
 * The envelope opens. The flap lifts back on its top hinge, then a single
 * card rises straight up out of the pocket — perfectly centered — and grows
 * to take over the screen before a soft light wash hands off to the site.
 *
 * Rebuilt to be seamless and centered: the card only ever moves on the Y
 * axis (left-1/2 + -translate-x-1/2 keeps it dead-center), so it can never
 * drift to one side. The envelope fades as the card takes over, so nothing
 * clips it. Self-completes in ~2.4s; reduced-motion users skip straight through.
 */
export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }
    const t = setTimeout(onComplete, 2400);
    return () => clearTimeout(t);
  }, [onComplete, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative h-56 w-80"
        style={{ perspective: 1200 }}
      >
        {/* ── envelope (fades out as the card takes over) ── */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 1.9, times: [0, 0.7, 1], ease: "easeInOut" }}
        >
          {/* back panel */}
          <div className="absolute inset-0 rounded-lg border border-gold-400/50 bg-cream-100 shadow-card" />

          {/* front pocket — the card rises from behind this */}
          <svg viewBox="0 0 320 224" className="absolute inset-0 z-20 h-full w-full" preserveAspectRatio="none">
            <path d="M2 224 L160 108 L318 224 Z" fill="#FBF6EC" stroke="#C9A227" strokeWidth="1.2" strokeOpacity="0.45" />
            <path d="M2 2 L2 224 L160 108 Z" fill="#F7EFDB" />
            <path d="M318 2 L318 224 L160 108 Z" fill="#F7EFDB" />
          </svg>

          {/* flap lifting open from the top hinge */}
          <motion.svg
            viewBox="0 0 320 224"
            className="absolute inset-0 z-30 h-full w-full"
            preserveAspectRatio="none"
            style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -172 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
          >
            <defs>
              <linearGradient id="openFlapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCF8EF" />
                <stop offset="100%" stopColor="#F0E6CE" />
              </linearGradient>
            </defs>
            <path d="M2 2 L160 124 L318 2 Z" fill="url(#openFlapGrad)" stroke="#C9A227" strokeWidth="1.5" strokeOpacity="0.55" />
          </motion.svg>
        </motion.div>

        {/* ── the card: rises straight up, centered, then grows ── */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 flex h-44 w-64 -translate-x-1/2 flex-col items-center justify-center gap-3 rounded-md border border-gold-400/40 bg-cream-50 px-6 text-center shadow-2xl"
          style={{ marginTop: "-88px" }}
          initial={{ y: 60, scale: 0.55, opacity: 0 }}
          animate={{ y: [60, -6, -6], scale: [0.55, 1, 1.14], opacity: [0, 1, 1] }}
          transition={{
            duration: 1.5,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.62, 1],
          }}
        >
          <p className="font-heading text-4xl leading-none text-gold-600">ੴ</p>
          <p className="font-body text-[0.7rem] uppercase tracking-[0.35em] text-bark/60">
            You are Invited
          </p>
        </motion.div>
      </div>

      {/* light wash handoff to the site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7 }}
        className="absolute inset-0 bg-gradient-to-b from-ivory-50 to-ivory-100"
      />
    </motion.div>
  );
}
