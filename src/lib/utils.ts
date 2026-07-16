"use client";

import { useEffect, useState } from "react";

/** Respects the user's OS-level reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}

export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

export function getTimeRemaining(targetIso: string): TimeRemaining {
  const total = new Date(targetIso).getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, isPast: false };
}

/** Builds a Google Calendar "quick add" link. Falls back gracefully on mobile too. */
export function googleCalendarLink(opts: {
  title: string;
  details?: string;
  location?: string;
  startIso: string;
  endIso: string;
}) {
  const fmt = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${fmt(opts.startIso)}/${fmt(opts.endIso)}`,
    details: opts.details ?? "",
    location: opts.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
