"use client";

import { useState } from "react";
import CoupleSceneIllustration from "./CoupleSceneIllustration";

type EventBannerArtProps = {
  imagePath: string;
  accent: string;
  accentSoft: string;
  decor: "marigold" | "lights" | "petals" | "regal";
};

/**
 * Shows the personalized caricature for an event if the image file exists
 * at `imagePath`. If the file is missing (or hasn't been added yet), it
 * silently falls back to the built-in illustrated couple — so the layout
 * never breaks whether or not you've added artwork.
 *
 * TO ADD YOUR OWN ART: drop a file (e.g. PNG with transparent background)
 * at  public/images/<name>.png  and make sure the event's `imagePath` in
 * src/data/weddingData.ts points to it (e.g. "/images/haldi.png").
 */
export default function EventBannerArt({
  imagePath,
  accent,
  accentSoft,
  decor,
}: EventBannerArtProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <CoupleSceneIllustration
        accent={accent}
        accentSoft={accentSoft}
        decor={decor}
        className="relative h-36 w-auto sm:h-44"
      />
    );
  }

  // Using a plain <img> (not next/image) so a missing file just triggers
  // onError → fallback, with no build-time config needed.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imagePath}
      alt=""
      onError={() => setFailed(true)}
      className="relative h-40 w-auto object-contain drop-shadow-lg sm:h-48"
    />
  );
}
