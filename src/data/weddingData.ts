// ─────────────────────────────────────────────────────────────────────────
// CENTRAL WEDDING DATA FILE
// Edit everything about the wedding (names, dates, venues, colors) here.
// Nothing below is hardcoded into components — change it once, it updates
// everywhere on the site.
// ─────────────────────────────────────────────────────────────────────────

export const couple = {
  brideFirst: "Jassimran",
  groomFirst: "Mohit",
  brideFull: "Jassimran Kaur Arora",
  brideParents: "D/o Sdn. Kamaldeev Kaur & S. Taranjeet Singh",
  brideGrandparents: "G D/o Sdn. Yashpal Kaur & S. Uttam Singh",
  groomFull: "Mohit Singh Sukhija",
  groomParents: "S/o Sdn. Anuradha Sukhija & S. Karanjit Singh Sukhija",
  groomGrandparents: "G S/o Sdn. Prabha Sukhija & S. Rajinder Singh Sukhija",
};

// The real wedding date — used by the countdown timer & the scratch card.
// Friday, 11 June 2027, 9:30 AM venue-local time (America/Los_Angeles).
export const weddingDate = {
  iso: "2027-06-11T09:30:00-07:00",
  display: "11th June 2027",
};

// Helper to build a Google Maps search link from a plain address.
export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export type EventColorStory = {
  /** Tailwind class used for section background gradient */
  bgGradient: string;
  /** Primary accent color (buttons, borders) — hex value, used via inline style */
  accent: string;
  accentSoft: string;
  textOnDark?: boolean;
  /** Hex values for this event's floating petals (matches its palette) */
  petalColors: string[];
  /** Top-of-arch ornament style for the illustrated placeholder scene */
  decor: "marigold" | "lights" | "petals" | "regal";
};

export type WeddingEvent = {
  id: string;
  title: string;
  subtitle?: string;
  hindiTagline?: string;
  /** Short italic one-liner shown under the event title, e.g. "A spirited night of music and dance." */
  tagline: string;
  date: string;
  time?: string;
  /** ISO datetime, used for "Add to Calendar" links — keep in sync with `date`/`time` above */
  startIso: string;
  endIso: string;
  venueName?: string;
  venueAddress?: string;
  theme: string;
  designNote: string;
  colors: EventColorStory;
  schedule?: { label: string; time: string }[];
  /** Where to drop a photo / caricature for this event. Optional. */
  imagePath: string;
  locationReady: boolean;
};

export const events: WeddingEvent[] = [
  {
    id: "haldi",
    title: "Haldi Hai Rachne Wali",
    subtitle: "Golden Hours",
    tagline: "A morning of turmeric, laughter, and blessings.",
    date: "Wednesday, 9th June 2027",
    time: "10:00 AM",
    startIso: "2027-06-09T10:00:00-07:00",
    endIso: "2027-06-09T13:00:00-07:00",
    venueAddress: "5404 Amber Circle, Calabasas, CA 91302",
    theme: "Haldi & Mehendi",
    designNote: "Soft florals, morning sunlight, pastel turmeric hues.",
    colors: {
      bgGradient: "from-haldi-buttercream via-haldi-blush to-haldi-mistyblue",
      accent: "#E8A23D",
      accentSoft: "#FF8C7A",
      petalColors: ["#FFC857", "#FFD3DC", "#B7D7A8", "#D9CFEA", "#FF8C7A"],
      decor: "marigold",
    },
    imagePath: "/images/haldi.png",
    locationReady: true,
  },
  {
    id: "sangeet",
    title: "Ek Shaam Sangeet Ke Naam",
    subtitle: "Mughal Nights",
    tagline: "A spirited night of music, dance, and joy.",
    date: "Thursday, 10th June 2027",
    time: "7:00 PM onwards",
    startIso: "2027-06-10T19:00:00-07:00",
    endIso: "2027-06-10T23:30:00-07:00",
    venueName: "Majestic Taj Banquet Hall",
    venueAddress: "5716 E Los Angeles Ave, Simi Valley, CA 93063",
    theme: "Sangeet",
    designNote: "Royal jewel tones, Mughal arches, sparkle & dance energy.",
    colors: {
      bgGradient: "from-sangeet-aubergine via-sangeet-rose to-sangeet-peacock",
      accent: "#F0C419",
      accentSoft: "#E0218A",
      textOnDark: true,
      petalColors: ["#F0C419", "#E0218A", "#0B6E4F", "#C1502E"],
      decor: "lights",
    },
    imagePath: "/images/sangeet.png",
    locationReady: true,
  },
  {
    id: "anand-karaj",
    title: "Anand Karaj",
    tagline: "A sacred union, blessed by Waheguru Ji.",
    date: "Friday, 11th June 2027",
    time: "9:30 AM",
    startIso: "2027-06-11T09:30:00-07:00",
    endIso: "2027-06-11T13:00:00-07:00",
    venueName: "Valley Sikh Temple",
    venueAddress: "7400 Jordan Ave, Canoga Park, CA 91303",
    theme: "Anand Karaj",
    designNote: "Peaceful, sacred, bright morning ceremony, sky blue & soft orange.",
    colors: {
      bgGradient: "from-anand-baby via-anand-sky to-anand-tiffany",
      accent: "#F3722C",
      accentSoft: "#357A8C",
      petalColors: ["#F3722C", "#F4A261", "#81D8D0", "#B87333"],
      decor: "petals",
    },
    imagePath: "/images/anand-karaj.png",
    locationReady: true,
  },
  {
    id: "reception",
    title: "The Royal Reception",
    tagline: "An evening of celebration, in royal style.",
    date: "Saturday, 12th June 2027",
    time: "7:00 PM",
    startIso: "2027-06-12T19:00:00-07:00",
    endIso: "2027-06-12T23:59:00-07:00",
    venueName: "Moorpark Country Club",
    venueAddress: "11800 Championship Dr, Moorpark, CA 93201",
    theme: "Royalty & Regalia",
    designNote: "Night-time luxury, navy & antique gold, regal borders.",
    colors: {
      bgGradient: "from-reception-midnight via-reception-plum to-reception-azure",
      accent: "#C7A24C",
      accentSoft: "#F1E3C6",
      textOnDark: true,
      petalColors: ["#C7A24C", "#9B111E", "#F1E3C6", "#5D3FD3"],
      decor: "regal",
    },
    imagePath: "/images/reception.png",
    locationReady: true,
  },
];

// Update this once you have a real RSVP form / WhatsApp number / email.
export const rsvp = {
  ready: false,
  label: "RSVP Link Coming Soon",
  // When ready is true, set href to your Google Form / WhatsApp / mailto link, e.g.
  // href: "https://forms.gle/your-form-id"
  // href: "https://wa.me/11234567890"
  // href: "mailto:jassimranandmohit@example.com"
  href: "#",
};

export const music = {
  // Drop a legally-owned/licensed audio file at this path. See
  // /public/music/README.md for details. The player gracefully
  // disables itself if the file is missing.
  src: "/music/wedding-song.mp3",
};
