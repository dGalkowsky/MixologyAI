import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import PillButton from "./ui/PillButton";
import Reveal from "./ui/Reveal";
import Marquee from "./ui/Marquee";
import TypewriterLine from "./ui/TypewriterLine";

type Phase = "image" | "headline" | "rest";

const HERO =
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2400&q=80";
const FALLBACK = "https://picsum.photos/id/1011/2400/1400";

export default function HeroOrange() {
  const [src, setSrc] = useState(HERO);
  const [phase, setPhase] = useState<Phase>("image");

  const goContact = useCallback(() => {
    const el = document.querySelector("#contact");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>(
        "#contact input, #contact textarea"
      );
      input?.focus();
    }, 450);
  }, []);

  return (
    <section
      id="top"
      data-header-theme="dark"
      className="relative w-full min-h-[100svh] overflow-hidden bg-ink text-white"
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
          initial={{ scale: 1.16, opacity: 0.001 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.35, 0.17, 0.3, 0.9] }}
          onAnimationComplete={() => setPhase("headline")}
        />

        {/* lżejsze przyciemnienie */}
        <div className="absolute inset-0 bg-riwa/12 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 noise" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/8 via-transparent to-transparent" />
      </div>

<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={
    phase === "rest"
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: -10 }
  }
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  className="absolute inset-x-0 top-[72px] z-[5] pointer-events-none"
>
<Marquee
  speed={35}
  className="py-2"
  text={
    <span className="flex items-center gap-5 font-display font-[450] tracking-[-0.07em] text-white/20 text-[clamp(56px,9vw,132px)] leading-none blur-[0.35px] select-none whitespace-nowrap">
      <span>CREATIVE</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>INSPIRED</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>PRECISE</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>CRAFT</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>MIXOLOGY</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>INNOVATE</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>FLAVOR</span>
      <span className="inline-flex items-center justify-center text-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[0.52em] w-[0.52em]"
          aria-hidden="true"
        >
          <path
            d="M4 5H20L13.4 12V18H10.6V12L4 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 20H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>FUTURE</span>
    </span>
  }
/>
</motion.div>
      

      {/* Content */}
      <div className="relative z-10 mx-auto h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[68px]">
        <div className="flex h-full flex-col justify-end pb-14">
          {/* Left */}
          <div className="relative z-20 w-full lg:w-7/12">
            <Reveal>
              <div className="text-center lg:text-left">
                <TypewriterLine
                  text="Mixology AI. Twój personalny asystent baru."
                  start={phase !== "image"}
                  onDone={() => setPhase("rest")}
                  className="text-[clamp(18px,5vw,24px)] font-[850] tracking-[0.05em] uppercase text-white/95"
                />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={
                    phase === "rest"
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 16 }
                  }
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="mx-auto mt-4 max-w-[44ch] font-mono text-[14px] leading-[1.55] text-white/88 lg:mx-0">
                    Receptury, koszty porcji, zamienniki i spójne menu - na Twoich
                    materiałach (RAG). Bez zgadywania, bez chaosu, bez "gdzie ja
                    to mam zapisane".
                  </p>

                  <div className="mt-7 flex justify-center gap-3 lg:justify-start">
                    {/* 
                    <PillButton
                      variant="dark"
                      rightPlus
                      className="inline-flex items-center rounded-full border border-white/15 bg-black/5 px-6 py-3 text-[12px] font-[850] tracking-[0.10em] uppercase text-white/85 hover:bg-white/10"
                      onClick={goContact}
                    >
                      REQUEST DEMO
                    </PillButton> 
                    */}

                    {/*
                    <a
                      href="#pricing"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector("#pricing")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="inline-flex items-center rounded-full border border-white/15 bg-black/5 px-6 py-3 text-[12px] font-[850] tracking-[0.10em] uppercase text-white/85 hover:bg-white/10"
                    >
                      PRICING
                    </a>
                    */}
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <div className="absolute right-0 top-1/2 z-10 mt-10 w-full -translate-y-1/2 lg:mt-0 lg:w-7/12 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                phase === "rest" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="lg:pl-8"
            >
              <div className="rounded-xl2 border border-white/12 bg-black/35 backdrop-blur-md shadow-soft">
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
                        Live preview
                      </div>
                      <div className="mt-3 font-display text-[28px] font-[900] leading-[1.02] tracking-[-0.03em]">
                        Panel barowy w jednym miejscu.
                      </div>
                      <div className="mt-3 text-sm text-white/65">
                        Pytasz o recepturę, koszt, alergeny, zamiennik - dostajesz
                        odpowiedź w sekundę.
                      </div>
                    </div>

                    <div className="hidden flex-col items-end gap-2 sm:flex">
                      <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-[850] text-white/80">
                        RAG
                      </div>
                      <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-[850] text-white/80">
                        COST
                      </div>
                      <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-[850] text-white/80">
                        MENU
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-12 gap-3">
                    {[
                      {
                        t: "Koszt porcji",
                        d: "Przeliczanie składników + narzut bez Excela.",
                      },
                      {
                        t: "Zamienniki",
                        d: "Braki na magazynie nie blokują pracy.",
                      },
                      {
                        t: "Spójność menu",
                        d: "Ten sam styl opisów i format cen.",
                      },
                      {
                        t: "Procedury zespołu",
                        d: "Szkolenia i standardy zawsze pod ręką.",
                      },
                    ].map((x) => (
                      <div
                        key={x.t}
                        className="col-span-12 rounded-xl2 border border-white/10 bg-white/5 p-4 sm:col-span-6"
                      >
                        <div className="text-sm font-[850] text-white">
                          {x.t}
                        </div>
                        <div className="mt-1 text-xs leading-5 text-white/60">
                          {x.d}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="items-center gap-2 px-6 py-4 text-[11px] font-[850] tracking-[0.10em] uppercase text-white/55">
                  <span className="barcode h-6 w-20 border border-white/10 bg-white/5" />
                  <span>Fast</span>
                  <span className="opacity-40">•</span>
                  <span>Secure</span>
                  <span className="opacity-40">•</span>
                  <span>Customizable</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}