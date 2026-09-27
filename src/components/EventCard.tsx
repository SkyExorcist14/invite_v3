"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CalendarPlus, Copy, Check } from "lucide-react";
import EventBannerArt from "./EventBannerArt";
import EventDecor from "./EventDecor";
import OrnamentalDivider from "./OrnamentalDivider";
import { WeddingEvent, mapsLink } from "@/data/weddingData";
import { googleCalendarLink, copyToClipboard } from "@/lib/utils";

type EventCardProps = {
  event: WeddingEvent;
  index: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-bark/50">{label}</p>
      <p className="mt-1 font-heading text-base text-maroon">{value}</p>
    </div>
  );
}

/**
 * A single, self-contained "box" for one wedding function — NOT a full-width
 * colored section. The card sits on the page's light ivory background; only
 * the banner strip at the top of the card carries that event's own color
 * story, exactly like a printed invitation insert for that function.
 */
export default function EventCard({ event }: EventCardProps) {
  const [copied, setCopied] = useState(false);
  const { colors } = event;
  const bannerTextClass = colors.textOnDark ? "text-cream-50" : "text-bark";
  const bannerSubTextClass = colors.textOnDark ? "text-cream-50/85" : "text-bark/70";

  async function handleCopy() {
    if (!event.venueAddress) return;
    const ok = await copyToClipboard(event.venueAddress);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const calendarHref = event.venueAddress
    ? googleCalendarLink({
        title: event.title,
        details: event.theme,
        location: event.venueAddress,
        startIso: event.startIso,
        endIso: event.endIso,
      })
    : undefined;

  return (
    <div className="mx-auto mb-12 w-full max-w-2xl px-2 last:mb-0 sm:px-0">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-90px" }}
        variants={fadeUp}
        transition={{ duration: 0.65 }}
        className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-card ring-1 ring-gold-400/10"
      >
        {/* COLORED BANNER — the only place this event's palette appears */}
        <div
          className={`relative flex h-64 flex-col items-center justify-end gap-1.5 overflow-hidden bg-gradient-to-br px-6 pb-7 pt-4 text-center sm:h-80 ${colors.bgGradient}`}
        >
          {/* soft vignette so text always reads against the gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

          {/* ambient, on-theme decoration (string lights, marigolds, petals…) */}
          <EventDecor
            decor={colors.decor}
            accent={colors.accent}
            accentSoft={colors.accentSoft}
          />

          <EventBannerArt
            imagePath={event.imagePath}
            accent={colors.accent}
            accentSoft={colors.accentSoft}
            decor={colors.decor}
          />
          {/*
            EventBannerArt shows your real caricature from event.imagePath if
            the file exists, otherwise it falls back to the built-in
            illustrated couple. To add your art: drop a PNG at
            public/images/<name>.png and point the event's imagePath at it in
            src/data/weddingData.ts.
          */}
          <h2 className={`relative font-script text-4xl sm:text-5xl ${bannerTextClass}`}>
            {event.title}
          </h2>
          <p className={`relative max-w-xs font-heading text-sm italic ${bannerSubTextClass}`}>
            {event.tagline}
          </p>
        </div>

        {/* LIGHT BODY — info + actions, always on white regardless of event */}
        <div className="p-7 text-center sm:p-9">
          {/* Theme now carries the elegant serif treatment; the subtitle takes
              the small letter-spaced caption look (the two swapped places). */}
          <p
            className="font-heading text-xl tracking-[0.12em] sm:text-2xl"
            style={{ color: colors.accent }}
          >
            {event.theme}
          </p>
          {event.subtitle && (
            <p className="mt-1.5 font-body text-[0.7rem] uppercase tracking-[0.32em] text-bark/50">
              {event.subtitle}
            </p>
          )}

          <OrnamentalDivider
            className="my-6"
            color={colors.accent}
            lineColor={colors.accent}
          />

          <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-5">
            <InfoRow label="Date" value={event.date} />
            {event.time && <InfoRow label="Time" value={event.time} />}
            {event.venueName && <InfoRow label="Venue" value={event.venueName} />}
          </div>
          {event.venueAddress && (
            <p className="mt-3 font-body text-sm text-bark/60">{event.venueAddress}</p>
          )}

          {event.schedule && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {event.schedule.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-black/5 bg-ivory-50 px-3 py-3 text-center"
                >
                  <p className="font-body text-[0.65rem] uppercase tracking-wide text-bark/50">
                    {item.label}
                  </p>
                  <p className="mt-1 font-heading text-sm text-maroon">{item.time}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {event.locationReady && event.venueAddress ? (
              <a
                href={mapsLink(event.venueAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: colors.accent }}
              >
                <MapPin className="h-4 w-4" />
                View Location
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 font-body text-sm text-bark/50">
                <MapPin className="h-4 w-4 opacity-60" />
                Location Coming Soon
              </span>
            )}

            {calendarHref && (
              <a
                href={calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 font-body text-sm text-bark transition hover:bg-black/5"
              >
                <CalendarPlus className="h-4 w-4" />
                Add to Calendar
              </a>
            )}

            {event.venueAddress && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 font-body text-sm text-bark transition hover:bg-black/5"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Address"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
