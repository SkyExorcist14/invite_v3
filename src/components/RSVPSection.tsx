"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Gift, X } from "lucide-react";
import OrnamentalDivider from "./OrnamentalDivider";
import { rsvp } from "@/data/weddingData";

export default function RSVPSection() {
  const [giftOpen, setGiftOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-100 to-ivory-200 px-6 py-20 text-center sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-lg"
      >
        <h2 className="font-script text-4xl text-maroon sm:text-5xl">
          Will You Join Us?
        </h2>
        <OrnamentalDivider className="my-6" />
        <p className="font-heading text-lg leading-relaxed text-maroon-dark sm:text-xl">
          Your presence is the greatest blessing we could ask for. Kindly let us
          know you&apos;ll be celebrating alongside us.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {rsvp.ready ? (
            <a
              href={rsvp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3 font-body text-sm font-medium text-cream-50 shadow-gold transition hover:bg-maroon-dark"
            >
              <Heart className="h-4 w-4" />
              RSVP Now
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 px-8 py-3 font-body text-sm italic text-bark/60">
              {rsvp.label}
            </span>
          )}

          {/* Note for Gifts — opens a gentle popup */}
          <button
            onClick={() => setGiftOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/60 px-8 py-3 font-body text-sm text-maroon transition hover:bg-gold-300/20"
          >
            <Gift className="h-4 w-4" />
            Note for Gifts
          </button>
        </div>
      </motion.div>

      {/* ── Gift note popup ── */}
      <AnimatePresence>
        {giftOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* backdrop */}
            <button
              aria-label="Close"
              onClick={() => setGiftOpen(false)}
              className="absolute inset-0 bg-bark/40 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-gold-400/40 bg-cream-50 p-8 text-center shadow-card"
            >
              <button
                onClick={() => setGiftOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-bark/40 transition hover:text-bark"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-300/25">
                <Gift className="h-6 w-6 text-gold-600" />
              </div>
              <p className="mt-5 font-body text-[0.65rem] uppercase tracking-[0.35em] text-bark/50">
                Note for Gifts
              </p>
              <p className="mt-3 font-script text-4xl text-maroon">No Need</p>
              <OrnamentalDivider className="mx-auto mt-5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
