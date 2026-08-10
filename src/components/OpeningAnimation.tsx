"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/utils";

type OpeningAnimationProps = {
  onComplete: () => void;
};

/**
 * The envelope opens. The flap lifts back on its top hinge, then a card
 * appears DEAD-CENTRE in front of the envelope and grows to take over the
 * screen before a soft light wash hands off to the site.
 *
 * Centering is done purely with framer's own translate (x:"-50%", y:"-50%")
 * held constant across every keyframe, so the card scales about its own centre
 * and can never drift sideways. The card sits at the highest z-index, so it
 * opens in front of the envelope rather than from behind the pocket.
 * Self-completes in ~2.4s; reduced-motion users skip straight through.
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
      <div className="relative h-56 w-80" style={{ perspective: 1200 }}>
        {/* ── envelope (fades out as the card takes over) ── */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 1.9, times: [0, 0.7, 1], ease: "easeInOut" }}
        >
          {/* back panel */}
          <div className="absolute inset-0 rounded-lg border border-gold-400/50 bg-cream-100 shadow-card" />

          {/* front pocket */}
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

        {/* ── the card: centred in front of the envelope, grows into view ── */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-40 flex h-40 w-60 flex-col items-center justify-center rounded-md border border-gold-400/40 bg-cream-50 shadow-2xl"
          style={{ transformOrigin: "center center" }}
          initial={{ x: "-50%", y: "-50%", scale: 0.25, opacity: 0 }}
          animate={{ x: "-50%", y: "-50%", scale: [0.25, 1, 1.12], opacity: [0, 1, 1] }}
          transition={{
            duration: 1.45,
            delay: 0.65,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.62, 1],
          }}
        >
          <span className="mb-2 block h-px w-10 bg-gold-400/60" />
          <p className="font-body text-sm uppercase tracking-[0.4em] text-bark/70">
            You are Invited
          </p>
          <span className="mt-2 block h-px w-10 bg-gold-400/60" />
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
