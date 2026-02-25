import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import PillButton from "./ui/PillButton";
import Reveal from "./ui/Reveal";
import Marquee from "./ui/Marquee";
import TypewriterLine from "./ui/TypewriterLine";

type Phase = "image" | "headline" | "rest";

const UNSPLASH =   "https://source.unsplash.com/2400x1400/?portrait,lowkey,dark,studio,shadow&sig=41";
const FALLBACK = "https://picsum.photos/id/1011/2400/1400";

export default function HeroOrange() {
  const [src, setSrc] = useState(UNSPLASH);
  const [phase, setPhase] = useState<Phase>("image");

  const goContact = useCallback(() => {
    const el = document.querySelector("#contact");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // mały luksus: focus na pierwsze pole formularza (jak istnieje)
    window.setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>("#contact input, #contact textarea");
      input?.focus();
    }, 450);
  }, []);

  return (
    <section
      id="top" data-header-theme="dark"
      className="relative w-full min-h-[100svh] overflow-hidden bg-riwa text-white"
    >
      {/* Background image scale-down */}
      <div className="absolute inset-0">
        <motion.img
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setSrc(FALLBACK)}
          className="h-full w-full object-cover object-[50%_35%]"
          initial={{ scale: 1.18, opacity: 0.001 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          onAnimationComplete={() => setPhase("headline")}
        />

        {/* tint */}
        <div className="absolute inset-0 bg-riwa/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />
      </div>

      {/* Marquee "RIVA" */}
      <div className="absolute inset-x-0 top-[72px] z-[5]">
        <Marquee
          speed={22}
          className="py-2"
          text={
            <span className="font-display font-[900] tracking-[-0.08em] text-white/18 text-[clamp(90px,14vw,220px)] leading-none">
              0-81 0-81
            </span>
          }
        />
      </div>

      {/* Content: pinned to bottom of viewport */}
      <div className="relative z-10 mx-auto h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[68px]">
        <div className="grid h-full grid-cols-12 items-end gap-8 pb-14">
          {/* Left */}
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <div className="text-center lg:text-left">
                {/* Typewriter headline */}
                <TypewriterLine
                  text="LESS NOISE. MORE IMPACT."
                  start={phase !== "image"}
                  onDone={() => setPhase("rest")}
                  className="text-[12px] font-[850] tracking-[0.12em] uppercase text-white/95"
                />

                {/* Description + CTA (fade up after headline done) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={phase === "rest" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <p className="mx-auto mt-3 max-w-[36ch] font-mono text-[11px] leading-[1.45] text-white/88 lg:mx-0">
                    We help ambitious companies launch memorable brands, build high-impact websites,
                    design digital products people love to use.
                  </p>

                  <div className="mt-7 flex justify-center lg:justify-start">
                    <PillButton
                      variant="light"
                      rightPlus
                      className="shadow-[0_18px_60px_rgba(0,0,0,.25)]"
                      onClick={goContact}
                    >
                      BOOK A CALL
                    </PillButton>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right: badge appears together with description (no arrow) */}
          <div className="relative col-span-12 hidden lg:col-span-8 lg:block">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase === "rest" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute bottom-6 right-8 flex items-end gap-3"
            >
              <div className="rounded-full bg-black/55 px-3 py-1 text-[11px] font-[850]">
                12+
              </div>
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/92">
                ALL PROJECTS
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}