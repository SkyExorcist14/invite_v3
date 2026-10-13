"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingCard from "@/components/LandingCard";
import OpeningAnimation from "@/components/OpeningAnimation";
import MainInvitation from "@/components/MainInvitation";
import FloatingPetals from "@/components/FloatingPetals";
import ScratchDateReveal from "@/components/ScratchDateReveal";
import CountdownTimer from "@/components/CountdownTimer";
import EventCard from "@/components/EventCard";
import CouplePhoto from "@/components/CouplePhoto";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import MusicControl, { MusicControlHandle } from "@/components/MusicControl";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";
import { events } from "@/data/weddingData";

type Stage = "closed" | "opening" | "open";

const OPEN_PAGE_PETAL_COLORS = ["#B94A57", "#D98C9B", "#E8B54A", "#F6E7D0", "#6F8D59", "#C46D42"];


const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");
  const [dateRevealed, setDateRevealed] = useState(false);
  const musicRef = useRef<MusicControlHandle>(null);

  function handleOpenCard() {
    musicRef.current?.attemptPlay();
    setStage("opening");
  }

  return (
    <main className="relative">

    <MusicControl ref={musicRef} visible={stage === "open"} />

      <AnimatePresence>
        {stage === "closed" && (
    <>
      <LandingCard
        key="landing"
        onOpen={handleOpenCard}
      />
    </>
  )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "opening" && (
          <OpeningAnimation key="opening" onComplete={() => setStage("open")} />
        )}
      </AnimatePresence>

      {stage === "open" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-ivory-50"
        >
          <FloatingPetals
            colors={OPEN_PAGE_PETAL_COLORS}
            count={80}
          />
          <MainInvitation />

          <div className="relative overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-50 px-5 py-14 sm:px-6 sm:py-20">
            {/* ── SAVE THE DATE ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={sectionFade}
              transition={{ duration: 0.7 }}
              className="relative mx-auto flex max-w-md flex-col items-center"
            >
              <h2 className="font-script text-3xl text-maroon sm:text-4xl">
                Scratch to Reveal
              </h2>
              <OrnamentalDivider className="mb-8 mt-4" />

              <ScratchDateReveal onReveal={() => setDateRevealed(true)} />

              {/* countdown appears ONLY after the date is scratched */}
              <AnimatePresence>
                {dateRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 w-full overflow-hidden"
                  >
                    <p className="mb-5 text-center font-body text-xs uppercase tracking-[0.3em] text-bark/50">
                      Counting down to forever
                    </p>
                    <CountdownTimer />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── COUPLE PORTRAIT ── */}
            <CouplePhoto />

            {/* ── EVENTS SCHEDULE ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={sectionFade}
              transition={{ duration: 0.7 }}
              className="relative mt-20 flex flex-col items-center sm:mt-24"
            >
              <p className="font-body text-xs uppercase tracking-[0.35em] text-bark/50">
                Join Us In Celebration
              </p>
              <h2 className="mt-2 font-script text-3xl text-maroon sm:text-4xl">
                Events Schedule
              </h2>
              <OrnamentalDivider className="mt-4" />
            </motion.div>

            <div className="relative mt-10">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>

          <RSVPSection />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
