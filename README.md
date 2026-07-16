# Jassimran & Mohit — Wedding Invitation Website

A premium, mobile-first Punjabi/Sikh wedding e-invitation. Cream-and-gold
envelope opens into a light, elegant, colour-rich site with a scratch-to-
reveal date, live countdown, boxed event cards, looping music, and an RSVP
link you can plug in later.

═══════════════════════════════════════════════════════════════
  QUICK START  (do this first)
═══════════════════════════════════════════════════════════════

1. Open a terminal in this folder, then run:

      npm install
      npm run dev

2. Open http://localhost:3000 in your browser.

That's it. If `npm install` ever complains about versions, this project
already includes an `.npmrc` that handles it — just run it again.

───────────────────────────────────────────────────────────────
  IMPORTANT: if you previously had errors
───────────────────────────────────────────────────────────────
This is a clean, fully-tested copy. If you were editing files by hand
before and hit "Expected '</', got..." errors, those came from broken
copy-paste. Just use THIS folder as-is and they're gone. Don't merge old
files back in.

═══════════════════════════════════════════════════════════════
  ADD YOUR SONG
═══════════════════════════════════════════════════════════════
Copy your song into:  public/music/
Name it exactly:      wedding-song.mp3
(See public/music/README.txt for details.) It loops automatically once a
guest taps the envelope; a music button appears bottom-right.

═══════════════════════════════════════════════════════════════
  ADD YOUR RSVP LINK  (when ready)
═══════════════════════════════════════════════════════════════
Open  src/data/weddingData.ts  and find the `rsvp` block near the bottom.
Set:
      ready: true,
      href: "https://forms.gle/your-google-form",   // your real link
The "RSVP Now" button then appears automatically.

═══════════════════════════════════════════════════════════════
  EDIT NAMES / DATES / VENUES / COLOURS
═══════════════════════════════════════════════════════════════
Everything is in ONE file:  src/data/weddingData.ts
Change it once — it updates across the whole site. No need to touch any
component.

═══════════════════════════════════════════════════════════════
  ADD REAL PHOTOS / CARICATURES  (optional)
═══════════════════════════════════════════════════════════════
Drop images into  public/images/  using the filenames listed in
public/images/README.md. Until you do, each event shows an elegant
illustrated couple (groom in turban, bride in lehenga) as a placeholder —
nothing breaks if images are missing.

═══════════════════════════════════════════════════════════════
  DEPLOY TO VERCEL
═══════════════════════════════════════════════════════════════
Option A — push this folder to a GitHub repo, then import it at vercel.com
(framework auto-detects as Next.js, just click Deploy).

Option B — install the Vercel CLI and run `vercel` in this folder.

The fonts (Cormorant Garamond, Parisienne, Lora) download at build time;
Vercel's build servers have internet access, so nothing extra is needed.

───────────────────────────────────────────────────────────────
  WHAT EACH FILE DOES
───────────────────────────────────────────────────────────────
src/app/page.tsx              orchestrates: envelope → open → full site
src/app/layout.tsx            loads fonts + page metadata
src/data/weddingData.ts       ALL editable content (names/dates/venues/etc.)
src/components/
  LandingCard.tsx             the cream/gold envelope (cover)
  OpeningAnimation.tsx        the open transition
  MainInvitation.tsx          Ik Onkar + blessing + couple's names
  ScratchDateReveal.tsx       scratch-off date + confetti
  CountdownTimer.tsx          live countdown
  EventCard.tsx               one boxed card per function
  CoupleSceneIllustration.tsx the placeholder couple artwork
  GarlandBorder.tsx           floral garland trim
  VineBorder.tsx              floral side vines on the hero
  OrnamentalDivider.tsx       the little diamond dividers
  FloatingPetals.tsx          colourful drifting petals/leaves
  MusicControl.tsx            looping background music + button
  RSVPSection.tsx             RSVP block
  Footer.tsx                  closing monogram + line
