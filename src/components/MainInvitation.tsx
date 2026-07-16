"use client";

import { motion } from "framer-motion";
import FloatingPetals from "./FloatingPetals";
import OrnamentalDivider from "./OrnamentalDivider";
import FloralSpray from "./FloralSpray";
import { couple } from "@/data/weddingData";

// Bright, full Indian-wedding color spread.
const HERO_PETAL_COLORS = ["#E0218A", "#F0C419", "#7FA86E", "#357A8C", "#F3722C", "#9B2D45"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function MainInvitation() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200 px-5 py-16 sm:px-6 sm:py-24">
      <FloatingPetals colors={HERO_PETAL_COLORS} count={26} />

      {/* lush floral corners framing the whole section (bougainvillea + peonies) */}
      <FloralSpray variant={0} className="pointer-events-none absolute -left-8 -top-8 h-52 w-52 sm:h-72 sm:w-72" />
      <FloralSpray variant={1} className="pointer-events-none absolute -right-8 -top-8 h-52 w-52 -scale-x-100 sm:h-72 sm:w-72" />
      <FloralSpray variant={2} className="pointer-events-none absolute -bottom-8 -left-8 h-52 w-52 -scale-y-100 sm:h-72 sm:w-72" />
      <FloralSpray variant={3} className="pointer-events-none absolute -bottom-8 -right-8 h-52 w-52 -scale-100 sm:h-72 sm:w-72" />

      <div className="relative mx-auto max-w-2xl">
        {/* decorative frame */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-gold-400/40" />
        <div className="pointer-events-none absolute inset-2 rounded-[1.7rem] border border-gold-400/20" />

        <div className="relative flex flex-col items-center px-5 py-12 text-center sm:px-10 sm:py-16">
          {/* Ik Onkar with halo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute left-1/2 top-1/2 -z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/25 blur-2xl" />
            <p className="font-heading text-5xl leading-none text-gold-600 sm:text-6xl">ੴ</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6"
          >
            <OrnamentalDivider />
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md font-body text-sm italic leading-relaxed text-bark/80 sm:text-base"
          >
            With the blessings of Waheguru Ji and our beloved families, we
            joyfully invite you to celebrate the wedding of
          </motion.p>

          {/* names — sized to fit, stacked on mobile, side-by-side on larger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex w-full flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-6"
          >
            <div className="flex-1">
              <h2 className="font-script text-[2.1rem] leading-[1.15] text-maroon sm:text-[2.6rem]">
                {couple.brideFull}
              </h2>
              <p className="mt-2 font-body text-xs text-bark/70 sm:text-sm">
                {couple.brideParents}
              </p>
              <p className="mt-1 font-body text-[0.7rem] text-bark/55 sm:text-xs">
                {couple.brideGrandparents}
              </p>
            </div>

            <div className="flex items-center justify-center pt-1">
              <span className="font-script text-3xl text-gold-600">&amp;</span>
            </div>

            <div className="flex-1">
              <h2 className="font-script text-[2.1rem] leading-[1.15] text-maroon sm:text-[2.6rem]">
                {couple.groomFull}
              </h2>
              <p className="mt-2 font-body text-xs text-bark/70 sm:text-sm">
                {couple.groomParents}
              </p>
              <p className="mt-1 font-body text-[0.7rem] text-bark/55 sm:text-xs">
                {couple.groomGrandparents}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10"
          >
            <OrnamentalDivider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
