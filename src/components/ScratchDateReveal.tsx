"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { weddingDate } from "@/data/weddingData";
import { usePrefersReducedMotion } from "@/lib/utils";

const SCRATCH_THRESHOLD = 0.6; // 60% cleared auto-reveals the rest

/** Two stacked gold diamonds joined by a hairline — a small regal flourish
 *  that flanks the scratch card on each side. */
function DiamondColumn() {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 flex-col items-center gap-1.5 py-6"
    >
      <span className="h-3.5 w-3.5 rotate-45 rounded-[1px] bg-gradient-to-br from-gold-300 to-gold-500 shadow-gold sm:h-4 sm:w-4" />
      <span className="h-5 w-px bg-gold-400/50" />
      <span className="h-3.5 w-3.5 rotate-45 rounded-[1px] bg-gradient-to-br from-gold-300 to-gold-500 shadow-gold sm:h-4 sm:w-4" />
    </div>
  );
}

type ScratchDateRevealProps = {
  /** Called the moment the card is revealed — parent uses this to show the countdown */
  onReveal?: () => void;
};

export default function ScratchDateReveal({ onReveal }: ScratchDateRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isPointerDown = useRef(false);
  const revealedRef = useRef(false);
  const paintedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const fireConfetti = useCallback(() => {
    if (reducedMotion) return;
    const colors = ["#C9A227", "#E0218A", "#F0C419", "#357A8C", "#9B2D45", "#7FA86E", "#F3722C"];
    const burst = (originX: number, angle: number) =>
      confetti({
        particleCount: 60,
        angle,
        spread: 75,
        startVelocity: 38,
        origin: { x: originX, y: 0.65 },
        colors,
        scalar: 1.1,
      });
    confetti({ particleCount: 120, spread: 90, startVelocity: 42, origin: { y: 0.55 }, colors });
    burst(0.1, 60);
    burst(0.9, 120);
    setTimeout(() => burst(0.5, 90), 250);
  }, [reducedMotion]);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    fireConfetti();
    onReveal?.();
  }, [fireConfetti, onReveal]);

  // Paint the gold foil. Guarded so it only runs once the wrapper actually
  // has a real measured size (this is what fixes the "thin gold line" bug —
  // previously it painted at width≈0 before layout settled).
  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return false; // not laid out yet
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // gold gradient foil
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#F0D77E");
    g.addColorStop(0.5, "#C9A227");
    g.addColorStop(1, "#A9831A");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // sparkle dots for a "scratch card" texture
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 40; i++) {
      const x = (i * 97) % rect.width;
      const y = (i * 53) % rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(91,26,43,0.92)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${Math.min(24, rect.width / 13)}px Georgia, serif`;
    ctx.fillText("The Day of Celebration", rect.width / 2, rect.height / 2 - 4);

    paintedRef.current = true;
    return true;
  }, []);

  // Retry painting until the layout is ready, then keep it correct on resize.
  useEffect(() => {
    let raf = 0;
    const tryPaint = () => {
      if (revealedRef.current) return;
      const ok = paintFoil();
      if (!ok) raf = requestAnimationFrame(tryPaint);
    };
    tryPaint();

    const ro = new ResizeObserver(() => {
      if (!revealedRef.current) paintFoil();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [paintFoil]);

  function scratchAt(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas || !paintedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkCleared() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const step = 8;
    const data = ctx.getImageData(0, 0, width, height).data;
    let transparent = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * step) {
      total++;
      if (data[i] === 0) transparent++;
    }
    if (total > 0 && transparent / total > SCRATCH_THRESHOLD) reveal();
  }

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    if (revealedRef.current) return;
    isPointerDown.current = true;
    (e.target as HTMLCanvasElement).setPointerCapture?.(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isPointerDown.current || revealedRef.current) return;
    scratchAt(e.clientX, e.clientY);
  }
  function up() {
    if (revealedRef.current) return;
    isPointerDown.current = false;
    checkCleared();
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-md items-center justify-center gap-2 sm:gap-4">
        {/* two royal diamonds flanking the card — left */}
        <DiamondColumn />

        <div
          ref={wrapRef}
          className="relative h-52 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-gold-400/50 shadow-gold sm:h-56"
        >
        {/* content beneath the foil — warm, light gradient (not dark) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-haldi-buttercream via-haldi-blush to-anand-baby px-6 text-center">
          <motion.div
            initial={false}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          >
            <p className="font-body text-[0.7rem] uppercase tracking-[0.3em] text-maroon/70">
              Save the Date
            </p>
            <p className="mt-2 font-script text-4xl text-maroon sm:text-5xl">
              {weddingDate.display}
            </p>
            <p className="mt-2 font-body text-xs italic text-bark/70">
              9:30 AM · Anand Karaj
            </p>
          </motion.div>
        </div>

        {!revealed && (
          <canvas
            ref={canvasRef}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerLeave={up}
            className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          />
        )}

        {/* accessible fallback for reduced-motion users */}
        {!revealed && reducedMotion && (
          <button
            onClick={reveal}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-cream-50/95 px-5 py-2 font-body text-xs uppercase tracking-widest text-maroon"
          >
            Reveal Date
          </button>
        )}
        </div>

        {/* two royal diamonds flanking the card — right */}
        <DiamondColumn />
      </div>

      {revealed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-5 font-heading text-lg italic text-maroon"
        >
          We can&apos;t wait to celebrate with you.
        </motion.p>
      )}
    </div>
  );
}
