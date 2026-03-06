import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import Marquee from "./ui/Marquee";
import heroImage from "../assets/hero2.png";

type Phase = "image" | "headline" | "rest";

// const HERO =
//   "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2400&q=80";
const HERO = heroImage;
const FALLBACK = "https://picsum.photos/id/1011/2400/1400";

export default function HeroOrange() {
  const [src, setSrc] = useState(HERO);
  const [phase, setPhase] = useState<Phase>("image");

  const goContact = useCallback(() => {
    const el = document.querySelector("#contact");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>("#contact input, #contact textarea");
      input?.focus();
    }, 450);
  }, []);

  return (
    <section
      id="top"
      data-header-theme="dark"
      className="relative w-full min-h-[100svh] overflow-hidden bg-ink text-white">
      {/* Background image scale-down */}
      <div className="absolute inset-0">
        <motion.img
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setSrc(FALLBACK)}
          className="h-full w-full object-cover"
          initial={{ scale: 1.16, opacity: 0.001 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          onAnimationComplete={() => setPhase("headline")}
        />

        <div className="absolute inset-0 bg-riwa/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/35" />
      </div>

      {/* subtle marquee */}
      <div className="absolute inset-x-0 top-[72px] z-[5]">
        <Marquee
          speed={22}
          className="py-2"
          text={
            <span className="font-display font-[450] tracking-[-0.08em] text-white/14 text-[clamp(82px,13vw,210px)] leading-none"></span>
          }
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-6 justify-center z-10 mx-auto h-screen max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[68px]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tight max-w-3xl">
          Stworzone dla osób, które <span className="text-mixology-orange">myślą do przodu</span>
        </h1>
        <p className="max-w-3xl text-center text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eleifend egestas vehicula. Pellentesque eget
          erat quis lorem rutrum congue. Suspendisse eget mi eu massa aliquam mattis eget et purus. Praesent nunc
          lectus, iaculis quis luctus vel, aliquam eget lorem.
        </p>
        <button
          className="relative px-4 py-2 rounded-full bg-gradient-to-r from-[rgba(153,39,4,0.30)] to-[rgba(25,100,207,0.30)]"
          style={{
            border: "1px solid transparent",
            backgroundClip: "padding-box",
            WebkitBackgroundClip: "padding-box",
          }}>
          <span
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background: "linear-gradient(to right, rgba(153,39,4,0.60), rgba(25,100,207,0.60))",
              padding: "1px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
          Zacznij już teraz
        </button>
      </div>
    </section>
  );
}
