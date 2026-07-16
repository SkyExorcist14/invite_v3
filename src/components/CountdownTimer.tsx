"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining, TimeRemaining } from "@/lib/utils";
import { weddingDate } from "@/data/weddingData";

const UNITS: { key: keyof Omit<TimeRemaining, "isPast">; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    setTime(getTimeRemaining(weddingDate.iso));
    const id = setInterval(() => {
      setTime(getTimeRemaining(weddingDate.iso));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex w-16 flex-col items-center rounded-xl border border-gold-400/40 bg-white/70 py-3 shadow-sm backdrop-blur-sm sm:w-20 sm:py-4"
        >
          <span className="font-heading text-2xl tabular-nums text-maroon sm:text-3xl">
            {time ? String(time[unit.key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 font-body text-[0.6rem] uppercase tracking-widest text-bark/60 sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
