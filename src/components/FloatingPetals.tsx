"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/utils";

type FloatingPetalsProps = {
  colors: string[];
  count?: number;
  className?: string;
};

type Drifter = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  color2: string;
  drift: number;
  rotateStart: number;
  shape: "flower" | "leaf";
};

/**
 * Colorful flowers, leaves, and petals drifting down the page. Random
 * values are generated AFTER mount (inside useEffect) so server and client
 * render identically first — this is what prevents the hydration mismatch.
 */
export default function FloatingPetals({
  colors,
  count = 12,
  className = "",
}: FloatingPetalsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [items, setItems] = useState<Drifter[] | null>(null);

  useEffect(() => {
    // Only flowers and leaves now (no plain petals), weighted toward flowers.
    const shapes: Drifter["shape"][] = ["flower", "flower", "flower", "leaf", "leaf"];
    const generated: Drifter[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 18,
      delay: Math.random() * 8,
      duration: 11 + Math.random() * 9,
      color: colors[i % colors.length],
      color2: colors[(i + 2) % colors.length],
      drift: (Math.random() - 0.5) * 80,
      rotateStart: Math.random() * 360,
      shape: shapes[i % shapes.length],
    }));
    setItems(generated);
  }, [colors, count]);

  if (reducedMotion || !items) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((p) => (
        <motion.svg
          key={p.id}
          viewBox="0 0 32 32"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          className="absolute -top-12"
          initial={{ y: -50, x: 0, opacity: 0, rotate: p.rotateStart }}
          animate={{
            y: "112vh",
            x: [0, p.drift, -p.drift * 0.5, 0],
            opacity: [0, 0.9, 0.9, 0],
            rotate: p.rotateStart + 260,
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          {p.shape === "flower" && (
            <g>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx="16"
                  cy="9"
                  rx="4"
                  ry="6.5"
                  fill={p.color}
                  opacity={0.88}
                  transform={`rotate(${a} 16 16)`}
                />
              ))}
              <circle cx="16" cy="16" r="3.5" fill={p.color2} />
            </g>
          )}
          {p.shape === "leaf" && (
            <g>
              <path d="M16 3 C27 9 27 23 16 30 C12 22 12 10 16 3 Z" fill={p.color} opacity={0.82} />
              <path d="M16 5 L16 28" stroke={p.color2} strokeWidth="0.8" opacity={0.5} />
            </g>
          )}
        </motion.svg>
      ))}
    </div>
  );
}
