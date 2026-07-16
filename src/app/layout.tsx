import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Parisienne, Lora } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jassimran & Mohit — Wedding Invitation",
  description:
    "Join us in celebrating the wedding of Jassimran Kaur Arora & Mohit Singh Sukhija.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5B1A2B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${parisienne.variable} ${lora.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
