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
  shape: "flower" | "leaf" | "petal";
};

/**
 * High-realism drifting flower blooms, curved petals, and veined foliage.
 * Pre-renders safely to prevent server-client hydration mismatches.
 */
export default function FloatingPetals({
  colors,
  count = 12,
  className = "",
}: FloatingPetalsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [items, setItems] = useState<Drifter[] | null>(null);

  useEffect(() => {
    const shapes: Drifter["shape"][] = ["flower", "petal", "flower", "leaf", "petal"];
    const generated: Drifter[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: 18 + Math.random() * 16,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
      color: colors[i % colors.length],
      color2: colors[(i + 2) % colors.length],
      drift: (Math.random() - 0.5) * 70,
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
          viewBox="0 0 40 40"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          className="absolute -top-12"
          initial={{ y: -50, x: 0, opacity: 0, rotate: p.rotateStart }}
          animate={{
            y: "112vh",
            x: [0, p.drift, -p.drift * 0.5, 0],
            opacity: [0, 0.92, 0.92, 0],
            rotate: p.rotateStart + 280,
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <radialGradient id={`grad-flower-${p.id}`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor={p.color} />
              <stop offset="100%" stopColor={p.color2} />
            </radialGradient>

            <linearGradient id={`grad-leaf-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8DA375" />
              <stop offset="50%" stopColor="#4A6134" />
              <stop offset="100%" stopColor="#253818" />
            </linearGradient>
          </defs>

          {/* REALISTIC MULTI-PETAL BLOOM */}
          {p.shape === "flower" && (
            <g transform="translate(20,20)">
              {[0, 72, 144, 216, 288].map((angle) => (
                <path
                  key={angle}
                  d="M 0 0 C -6 -14, 6 -18, 10 -10 C 13 -3, 3 0, 0 0 Z"
                  fill={`url(#grad-flower-${p.id})`}
                  transform={`rotate(${angle})`}
                  opacity="0.9"
                />
              ))}
              <circle cx="0" cy="0" r="3" fill="#FFEAA5" />
              <circle cx="0" cy="0" r="1.5" fill="#C99218" />
            </g>
          )}

          {/* REALISTIC CURVED ROSE PETAL */}
          {p.shape === "petal" && (
            <g transform="translate(20,20)">
              <path
                d="M -12 -6 C -16 8, 4 18, 14 8 C 18 -4, 0 -16, -12 -6 Z"
                fill={`url(#grad-flower-${p.id})`}
                opacity="0.88"
              />
              <path
                d="M -8 -2 C -10 6, 2 12, 8 6"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="0.6"
                opacity="0.4"
              />
            </g>
          )}

          {/* REALISTIC ORGANIC LEAF WITH VEINS */}
          {p.shape === "leaf" && (
            <g transform="translate(20,20)">
              <path
                d="M -14 0 C -8 -14, 12 -12, 16 0 C 8 14, -8 12, -14 0 Z"
                fill={`url(#grad-leaf-${p.id})`}
                opacity="0.85"
              />
              <path
                d="M -14 0 Q 0 0 16 0"
                fill="none"
                stroke="#B2C79D"
                strokeWidth="0.8"
                opacity="0.6"
              />
            </g>
          )}
        </motion.svg>
      ))}
    </div>
  );
}