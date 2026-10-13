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
  top: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  color2: string;
  drift: number;
  rotateStart: number;
  shape: "petal" | "leaf" | "blossom";
};

/** Subtle botanical debris drifting through the page: curved petals, veined leaves,
 * and a few small layered blossoms. Random values are generated after mount to avoid hydration mismatch. */
export default function FloatingPetals({ colors, count = 100, className = "" }: FloatingPetalsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [items, setItems] = useState<Drifter[] | null>(null);

  useEffect(() => {
    const shapes: Drifter["shape"][] = ["petal", "petal", "leaf", "petal", "blossom", "leaf", "petal"];
    const generated: Drifter[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 11 + Math.random() * 14,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 13,
      color: colors[i % colors.length],
      color2: colors[(i + 2) % colors.length],
      drift: (Math.random() - 0.5) * 95,
      rotateStart: Math.random() * 360,
      shape: shapes[i % shapes.length],
    }));
    setItems(generated);
  }, [colors, count]);

  if (reducedMotion || !items) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((p) => (
        <motion.svg
          key={p.id}
          viewBox="0 0 32 32"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          className="absolute drop-shadow-[0_1px_1px_rgba(100,60,30,0.12)]"
          initial={{ y: -45, x: 0, opacity: 0, rotate: p.rotateStart }}
          animate={{
            y: "112vh",
            x: [0, p.drift, -p.drift * 0.55, p.drift * 0.25, 0],
            opacity: [0, 0.72, 0.78, 0.58, 0],
            rotate: p.rotateStart + (p.shape === "leaf" ? 190 : 310),
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id={`petal-${p.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF4E8" stopOpacity="0.98" />
              <stop offset="55%" stopColor={p.color} stopOpacity="0.94" />
              <stop offset="100%" stopColor={p.color2} stopOpacity="0.78" />
            </linearGradient>
            <linearGradient id={`leaf-${p.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B4C98B" />
              <stop offset="55%" stopColor="#668C50" />
              <stop offset="100%" stopColor="#3E6845" />
            </linearGradient>
          </defs>
          {p.shape === "petal" && (
            <g>
              <path d="M16 3 C23 7 26 14 21 22 C19 26 16 28 14 29 C9 22 7 15 10 9 C11 6 13 4 16 3 Z" fill={`url(#petal-${p.id})`} />
              <path d="M15 7 C16 13 17 20 14.5 26" fill="none" stroke="#FFF8F0" strokeWidth="0.8" opacity="0.6" />
            </g>
          )}
          {p.shape === "leaf" && (
            <g>
              <path d="M16 2 C26 7 28 18 16 30 C6 23 5 11 16 2 Z" fill={`url(#leaf-${p.id})`} />
              <path d="M16 5 C16 13 16 20 16 27" stroke="#E5EBCF" strokeWidth="0.8" opacity="0.68" fill="none" />
              <path d="M16 13 L10 10 M16 18 L22 14 M16 22 L11 19" stroke="#E5EBCF" strokeWidth="0.55" opacity="0.45" fill="none" />
            </g>
          )}
          {p.shape === "blossom" && (
            <g>
              {[0, 72, 144, 216, 288].map((a) => (
                <path key={a} d="M16 15 C10 13 10 7 14 5 C18 4 20 10 16 15 Z" fill={`url(#petal-${p.id})`} transform={`rotate(${a} 16 16)`} />
              ))}
              <circle cx="16" cy="16" r="2.4" fill="#D8A63A" />
            </g>
          )}
        </motion.svg>
      ))}
    </div>
  );
}
