"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Gift, Shirt, X } from "lucide-react";
import OrnamentalDivider from "./OrnamentalDivider";
import { rsvp } from "@/data/weddingData";

export default function RSVPSection() {
  const [giftOpen, setGiftOpen] = useState(false);
  const [attireOpen, setAttireOpen] = useState(false);

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

          {/* Attire Suggestions — opens a color-guidance popup */}
          <button
            onClick={() => setAttireOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/60 px-8 py-3 font-body text-sm text-maroon transition hover:bg-gold-300/20"
          >
            <Shirt className="h-4 w-4" />
            Attire Suggestions
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
              <p className="mt-3 font-script text-4xl text-maroon">
                No Boxed Gifts Please!
              </p>
              <OrnamentalDivider className="mx-auto mt-5" />
              <p className="mt-5 font-heading text-base leading-relaxed text-maroon-dark">
                Your presence and blessings mean the world to us. Kindly, no
                boxed gifts are necessary. If you wish to bless us further,
                monetary gifts are warmly appreciated.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Attire suggestions popup ── */}
      <AnimatePresence>
        {attireOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              aria-label="Close"
              onClick={() => setAttireOpen(false)}
              className="absolute inset-0 bg-bark/40 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gold-400/40 bg-cream-50 p-7 shadow-card sm:p-8"
            >
              <button
                onClick={() => setAttireOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-bark/40 transition hover:text-bark"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-300/25">
                  <Shirt className="h-6 w-6 text-gold-600" />
                </div>

                <p className="mt-5 font-body text-[0.65rem] uppercase tracking-[0.35em] text-bark/50">
                  Wedding Attire
                </p>

                <h3 className="mt-3 font-script text-4xl text-maroon">
                  Attire Suggestions
                </h3>

                <OrnamentalDivider className="mx-auto mt-5" />

                <p className="mt-5 font-heading text-base leading-relaxed text-maroon-dark">
                  We would love for you to celebrate each occasion with us in
                  colors inspired by the spirit of the event.
                </p>
              </div>

              {/* Haldi + Mehendi */}
              <div className="mt-7 rounded-2xl border border-gold-400/20 bg-white/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-xl text-maroon">
                      Haldi + Mehendi
                    </p>
                    <p className="mt-1 font-body text-sm italic text-bark/60">
                      Pastels &amp; Flowers
                    </p>
                  </div>
                  <div className="flex shrink-0 -space-x-1">
                    {[
                      "#F9E6A5",
                      "#F6C85F",
                      "#F3D0D5",
                      "#F6C49E",
                      "#C5D6B6",
                      "#D7C8E7",
                      "#FF9B84",
                      "#E5C4F7",
                      "#AFC4E7",
                    ].map((color) => (
                      <span
                        key={color}
                        className="h-6 w-6 rounded-full border-2 border-cream-50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-bark/75">
                  Buttercream yellow, soft marigold, blush pink, peach,
                  pistachio green, dusty lavender, coral, mauve, and misty
                  blue.
                </p>
              </div>

              {/* Sangeet */}
              <div className="mt-4 rounded-2xl border border-gold-400/20 bg-white/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-xl text-maroon">
                      Sangeet
                    </p>
                    <p className="mt-1 font-body text-sm italic text-bark/60">
                      Mughal Nights
                    </p>
                  </div>
                  <div className="flex shrink-0 -space-x-1">
                    {[
                      "#C9145B",
                      "#AA2D5A",
                      "#0B8290",
                      "#0D6D54",
                      "#E6AB00",
                      "#4D214D",
                      "#C65A20",
                    ].map((color) => (
                      <span
                        key={color}
                        className="h-6 w-6 rounded-full border-2 border-cream-50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-bark/75">
                  Rani pink, deep rose, peacock blue, emerald green, mimosa
                  yellow, aubergine, and terracotta.
                </p>
              </div>

              {/* Anand Karaj */}
              <div className="mt-4 rounded-2xl border border-gold-400/20 bg-white/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-xl text-maroon">
                      Anand Karaj
                    </p>
                    <p className="mt-1 font-body text-sm italic text-bark/60">
                      Wedding Ceremony
                    </p>
                  </div>
                  <div className="flex shrink-0 -space-x-1">
                    {[
                      "#82C8E8",
                      "#75BBDD",
                      "#4699CC",
                      "#16B5B5",
                      "#91CECA",
                      "#FF5B55",
                      "#FF8A00",
                      "#BE782B",
                      "#C65320",
                    ].map((color) => (
                      <span
                        key={color}
                        className="h-6 w-6 rounded-full border-2 border-cream-50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-bark/75">
                  Baby blue, sky blue, Carolina blue, Tiffany blue, teal blue,
                  tangelo, sunset orange, copper, and terracotta.
                </p>
              </div>

              {/* Reception */}
              <div className="mt-4 rounded-2xl border border-gold-400/20 bg-white/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-xl text-maroon">
                      Reception
                    </p>
                    <p className="mt-1 font-body text-sm italic text-bark/60">
                      Royalty &amp; Regalia
                    </p>
                  </div>
                  <div className="flex shrink-0 -space-x-1">
                    {[
                      "#111C3A",
                      "#1245B8",
                      "#9B1238",
                      "#4B1D52",
                      "#614096",
                      "#B18D56",
                      "#CDB78A",
                      "#E9D9AF",
                      "#1D1D1D",
                    ].map((color) => (
                      <span
                        key={color}
                        className="h-6 w-6 rounded-full border-2 border-cream-50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-bark/75">
                  Midnight blue, royal blue, ruby red, deep plum, royal purple,
                  antique gold, purdue gold, champagne, and black onyx.
                </p>
              </div>

              <p className="mt-6 text-center font-body text-xs italic text-bark/50">
                These are suggestions, not strict requirements — wear what
                makes you feel comfortable celebrating with us.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
