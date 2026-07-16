import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Landing card / closed invitation — cream & gold only
        cream: {
          50: "#FFFDF8",
          100: "#FBF6EC",
          200: "#F4EAD3",
        },
        gold: {
          300: "#E3C567",
          400: "#C9A227",
          500: "#B8860B",
          600: "#8B6914",
        },
        bark: "#5C4326",

        // Site-wide light background, used EVERYWHERE after the envelope
        // opens — replaces the old heavy dark-maroon full-bleed sections.
        // Individual events/boxes still carry their own accent color; this
        // is just the calm canvas they sit on.
        ivory: {
          50: "#FFFDF9",
          100: "#FBF3E7",
          200: "#F5E6D3",
        },

        // Hero / blessing section accent — used for text & borders only now
        // (no longer a full-bleed background)
        maroon: {
          DEFAULT: "#5B1A2B",
          dark: "#3D1020",
        },
        plum: {
          DEFAULT: "#3D1830",
          dark: "#26101F",
        },

        // Haldi / Mehendi — pastel florals
        haldi: {
          buttercream: "#FFF3D6",
          marigold: "#FFC857",
          blush: "#FFD3DC",
          peach: "#FFB997",
          pistachio: "#B7D7A8",
          lavender: "#D9CFEA",
          coral: "#FF8C7A",
          mauve: "#C99CB4",
          mistyblue: "#C7DDE8",
        },

        // Sangeet — Mughal jewel tones
        sangeet: {
          rani: "#E0218A",
          rose: "#9C2B5A",
          peacock: "#0E5C73",
          emerald: "#0B6E4F",
          mimosa: "#F0C419",
          aubergine: "#3D1E40",
          terracotta: "#C1502E",
        },

        // Anand Karaj — peaceful blue / orange
        anand: {
          baby: "#D6ECF3",
          sky: "#A9D6E5",
          carolina: "#7EC8E3",
          tiffany: "#81D8D0",
          teal: "#357A8C",
          tangelo: "#F3722C",
          sunset: "#F4A261",
          copper: "#B87333",
          terracotta: "#C76A3F",
        },

        // Reception — royal navy / gold / plum / champagne
        reception: {
          midnight: "#0B1B33",
          azure: "#1E3A8A",
          ruby: "#9B111E",
          plum: "#4B1248",
          purple: "#5D3FD3",
          gold: "#C7A24C",
          champagne: "#F1E3C6",
          onyx: "#0A0A0A",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        script: ["var(--font-parisienne)", "cursive"],
        body: ["var(--font-lora)", "serif"],
      },
      boxShadow: {
        gold: "0 0 25px rgba(201,162,39,0.35)",
        card: "0 25px 60px -15px rgba(0,0,0,0.35)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(8deg)" },
        },
        // Blinking fairy / string lights (reception + sangeet)
        twinkle: {
          "0%, 100%": { opacity: "1", filter: "brightness(1.35)" },
          "50%": { opacity: "0.35", filter: "brightness(0.8)" },
        },
        // Gentle sway for hanging garlands / lights
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        // Soft pulsing glow (haldi sun, diyas)
        glow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        // Sparkle pop for sangeet sequins
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0.4)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 3.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 1.8s ease-in-out infinite",
        sway: "sway 5s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        sparkle: "sparkle 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
