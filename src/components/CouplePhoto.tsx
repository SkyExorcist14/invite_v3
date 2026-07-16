"use client";

import { motion } from "framer-motion";
import FloralSpray from "./FloralSpray";

/**
 * A single framed portrait of the couple, sitting between the Save-the-Date
 * block and the Events schedule. Arched top (echoing the Mughal mehrab arch
 * from the invitation references) inside a slim gold ornamental frame, with a
 * soft floral flourish at each upper corner so it reads as part of the page's
 * botanical world rather than a photo dropped in.
 *
 * The image lives at /public/images/couple.jpg. Swap that file to change the
 * photo — no code changes needed.
 */
export default function CouplePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto mt-20 flex max-w-md flex-col items-center sm:mt-24"
    >
      {/* frame */}
      <div className="relative w-full max-w-[22rem]">
        {/* outer gold arch frame */}
        <div
          className="relative overflow-hidden rounded-b-2xl p-[3px] shadow-card"
          style={{
            borderTopLeftRadius: "11rem",
            borderTopRightRadius: "11rem",
            background: "linear-gradient(150deg, #E3C567 0%, #C9A227 45%, #8B6914 100%)",
          }}
        >
          {/* inner hairline */}
          <div
            className="relative overflow-hidden rounded-b-xl bg-cream-50 p-[3px]"
            style={{ borderTopLeftRadius: "10.6rem", borderTopRightRadius: "10.6rem" }}
          >
            <div
              className="relative overflow-hidden rounded-b-lg"
              style={{ borderTopLeftRadius: "10.3rem", borderTopRightRadius: "10.3rem" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/couple.jpg"
                alt="Jassimran and Mohit"
                className="h-[26rem] w-full object-cover"
                style={{ objectPosition: "center 35%" }}
              />
              {/* gentle top vignette so the arch edge reads cleanly */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* keystone ornament at the apex of the arch */}
        <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="block h-3.5 w-3.5 rotate-45 rounded-[2px] bg-gold-400 shadow-gold" />
        </div>

        {/* floral flourishes tucked at the upper corners */}
        <FloralSpray
          variant={1}
          className="pointer-events-none absolute -left-10 -top-8 h-32 w-32 sm:h-40 sm:w-40"
        />
        <FloralSpray
          variant={2}
          className="pointer-events-none absolute -right-10 -top-8 h-32 w-32 -scale-x-100 sm:h-40 sm:w-40"
        />
      </div>
    </motion.div>
  );
}
