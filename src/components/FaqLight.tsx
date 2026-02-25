import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    id: "001",
    q: "What can I request within a monthly design subscription?",
    a: "Branding, web pages, UI flows, landing pages, pitch decks - basically anything design-related that fits the scope.",
  },
  {
    id: "002",
    q: "How does the subscription work?",
    a: "You submit requests, we work through them in order. One active task at a time to keep quality high.",
  },
  {
    id: "003",
    q: "How many requests can I submit at once?",
    a: "As many as you want - we queue them. The pipeline stays clean, like good git history.",
  },
  {
    id: "004",
    q: "How fast will I receive all updates?",
    a: "Typically 1-3 business days per request, depending on complexity.",
  },
  {
    id: "005",
    q: "Can I cancel or pause my subscription at any time I want?",
    a: "Yes. Pause, cancel, resume - your call.",
  },
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function FaqLight() {
  const [open, setOpen] = useState<string>("001");

  const sectionRef = useRef<HTMLElement | null>(null);
  const inViewRef = useRef<HTMLDivElement | null>(null);

  // ACCORDION - pokazuj tylko gdy sekcja jest w widoku
  const showLabel = useInView(inViewRef, { margin: "-25% 0px -25% 0px" });

  // Nagłówek: motion value + sprężynka
  const yRaw = useMotionValue(0);
  const y = useSpring(yRaw, { stiffness: 220, damping: 28, mass: 0.55 });

  // ile maksymalnie ma "zjechać" w dół
  const SHIFT = 180;

  // linia pod TopBareм (dopasuj jeśli zmienisz wysokość headera)
  const START_LINE = 86;

  useEffect(() => {
    const update = () => {
      const sec = sectionRef.current;
      if (!sec) return;

      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;

      // progress działa nawet jeśli sekcja ma ~100vh (nie stoi w miejscu)
      // 0: gdy top sekcji jest na dole viewportu
      // 1: gdy bottom sekcji jest na górze viewportu
      const total = Math.max(1, r.height + vh);
      const passed = vh - r.top; // rośnie gdy przewijasz w dół
      const progress = clamp(passed / total, 0, 1);

      // dodatkowy offset - niech zacznie "po wejściu pod menu"
      // (przesuwa start reakcji o START_LINE px)
      const offsetProgress = clamp((passed - START_LINE) / total, 0, 1);

      yRaw.set(offsetProgress * SHIFT);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [yRaw]);

  return (
    <section
      ref={sectionRef}
      id="before"
      data-header-theme="dark"
      className="relative w-full min-h-[100svh] bg-paper text-black"
    >
      {/* marker do inView */}
      <div ref={inViewRef} className="absolute left-0 top-0 h-full w-px opacity-0" />

      {/* ACCORDION - zawsze na środku viewportu, tylko gdy FAQ w widoku */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            key="accordion-label"
            className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 rotate-90 lg:block"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-mono text-[11px] tracking-[0.28em] text-black/35">
              ACCORDION
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 pb-16 sm:pb-24 pt-14 sm:pt-20">
        <div className="grid grid-cols-12 gap-8">
          {/* LEWA: sticky + zjeżdża w dół podczas scrolla sekcji */}
          <div className="col-span-12 lg:col-span-4">
            <motion.div
              style={{ y }}
              className="lg:sticky lg:top-[86px] will-change-transform"
            >
              <Reveal>
                <div className="text-[11px] font-[750] tracking-[0.12em] uppercase text-white/55">
                  10 - FAQ
                </div>

                <h3 className="mt-4 font-display text-[42px] sm:text-[56px] lg:text-[68px] font-[850] leading-[0.95] tracking-[-0.06em]">
                  <span className="text-white">BEFORE YOU</span>
                  <br />
                  <span className="text-white/45">START.</span>
                </h3>
              </Reveal>
            </motion.div>
          </div>

          {/* PRAWA: akordeon */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-7">
              {faqs.map((f) => {
                const isOpen = open === f.id;

                return (
                  <Reveal key={f.id}>
                    <NotchCard className="p-1" notch="tr">
                      <button
                        onClick={() => setOpen(isOpen ? "" : f.id)}
                        className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left"
                      >
                        <div>
                          <div className="font-mono text-[10px] text-black/65">{f.id}</div>
                          <div className="mt-4 font-mono text-[13px] leading-[1.35] text-black/95">
                            {f.q}
                          </div>
                        </div>

                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          className="mt-1 grid h-9 w-9 place-items-center rounded-full border border-black/20 bg-black/5"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden px-6 pb-6"
                          >
                            <div className="text-[12px] leading-[1.6] text-black/60">
                              {f.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </NotchCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}