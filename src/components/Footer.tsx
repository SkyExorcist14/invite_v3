import OrnamentalDivider from "./OrnamentalDivider";
import { couple } from "@/data/weddingData";

export default function Footer() {
  return (
    <footer className="relative bg-ivory-200 px-6 py-12 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <span className="font-script text-3xl text-gold-600">
          {couple.brideFirst[0]}
          <span className="mx-1 font-heading text-xl text-bark/50">&amp;</span>
          {couple.groomFirst[0]}
        </span>
        <OrnamentalDivider className="my-5" />
        <p className="font-heading text-base italic text-bark/70">
          Made with love for {couple.brideFirst} &amp; {couple.groomFirst}
        </p>
        <p className="mt-2 font-body text-xs tracking-wide text-bark/40">
          11th June 2027 · Los Angeles, California
        </p>
      </div>
    </footer>
  );
}
