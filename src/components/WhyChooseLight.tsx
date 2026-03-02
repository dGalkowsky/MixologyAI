import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import CountUp from "./ui/CountUp";
import MartiniGlassIcon from "./ui/MartiniGlassIcon";

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const fade = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
  },
};

// Manhattan cocktail tint (whiskey + vermouth) - subtle overlays
const manhattanOverlay =
  "bg-[radial-gradient(900px_circle_at_15%_0%,rgba(222,116,50,0.22),transparent_42%),radial-gradient(900px_circle_at_90%_10%,rgba(140,40,28,0.18),transparent_45%),radial-gradient(1100px_circle_at_55%_120%,rgba(255,196,120,0.16),transparent_55%)]";

type Tile = {
  key: string;
  tag: string;
  title: string;
  desc: string;
};

function FlowTiles({
  items,
  speed = 22,
}: {
  items: Tile[];
  speed?: number;
}) {
  const reduce = useReducedMotion();

  const row = (
    <div className="flex w-max items-stretch gap-4 pr-4">
      {items.map((t) => (
        <motion.div
          key={t.key}
          whileHover={reduce ? undefined : { y: -2 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="relative w-[340px] shrink-0 overflow-hidden rounded-xl3 border border-black/10 bg-white/60 backdrop-blur-md shadow-[0_16px_55px_rgba(0,0,0,0.08)]"
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 ${manhattanOverlay}`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
          />
          <div className="relative p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                  {t.tag}
                </div>
                <div className="mt-2 text-sm font-[900] tracking-tight text-black">
                  {t.title}
                </div>
              </div>
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 bg-black/5 text-black/70">
                <MartiniGlassIcon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-3 text-sm leading-7 text-black/65">{t.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div
      className={[
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
      ].join(" ")}
    >
      {reduce ? (
        <div className="flex w-full gap-4 overflow-x-auto pb-2">
          {row}
        </div>
      ) : (
        <motion.div
          className="flex w-max gap-4"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {row}
          {row}
        </motion.div>
      )}

      {!reduce && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
        </>
      )}
    </div>
  );
}

export default function WhyChooseLight() {
  const tiles = useMemo<Tile[]>(
    () => [
      {
        key: "t-recipe",
        tag: "RECIPE",
        title: "Tworzenie receptur na żądanie",
        desc: "Dajesz bazę, styl i ograniczenia - dostajesz gotowy przepis + wariacje i garnish.",
      },
      {
        key: "t-balance",
        tag: "BALANCE",
        title: "Balans smaku bez zgadywania",
        desc: "AI pilnuje proporcji - słodycz, kwas, ABV i rozcieńczenie mają grać razem.",
      },
      {
        key: "t-cost",
        tag: "COST",
        title: "Koszt porcji i marża",
        desc: "Wpisujesz ceny składników - dostajesz koszt drinka i sugerowaną cenę w menu.",
      },
      {
        key: "t-sub",
        tag: "STOCK",
        title: "Zamienniki składników",
        desc: "Brakuje składnika - dostajesz sensowne alternatywy bez psucia profilu smaku.",
      },
      {
        key: "t-menu",
        tag: "MENU",
        title: "Spójne opisy do menu",
        desc: "Jeden tone of voice, jedna długość, jeden format - menu wygląda jak projekt.",
      },
      {
        key: "t-team",
        tag: "TEAM",
        title: "Tryb szkoleniowy dla zespołu",
        desc: "Procedury, alergeny, mise en place - odpowiedź w sekundę, bez szukania notatek.",
      },
      {
        key: "t-style",
        tag: "STYLE",
        title: "Styl baru w odpowiedziach",
        desc: "Ustalasz vibe - premium/hotel/tiki. AI trzyma to konsekwentnie.",
      },
    ],
    []
  );

  return (
    <section
      id="about"
      data-header-theme="light"
      className="relative w-full min-h-[100svh] bg-white text-black overflow-hidden"
    >
      {/* no grid - only soft blobs */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full bg-[rgba(222,116,50,0.12)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[620px] w-[620px] rounded-full bg-[rgba(140,40,28,0.08)] blur-3xl" />

      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(84px,10vh,132px)] pb-[clamp(44px,7vh,96px)] flex flex-col">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-start">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                  02 - WHY MIXOLOGYAI
                </div>
                <span className="barcode h-[10px] w-[120px] bg-black/5 border border-black/10" />
              </div>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className="mt-5 font-display text-[clamp(34px,4.2vw,54px)] leading-[0.98] tracking-[-0.04em]"
              >
                Drinks that work.
                <span className="block text-black/55">
                  Recipes that scale - with an AI bartender.
                </span>
              </motion.h2>

              <motion.p
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className="mt-5 max-w-[62ch] text-[15px] leading-7 text-black/70"
              >
                MixologyAI pomaga budować receptury, robi szybki sanity check balansu,
                liczy koszt porcji i pilnuje spójności menu. Działa na Twoich zasadach - więc
                wynik jest użyteczny, a nie “kreatywny”.
              </motion.p>

              {/* prompt -> answer card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                className="mt-8"
              >
                <NotchCard
                  variant="paper"
                  notch="both"
                  className="relative overflow-hidden rounded-xl3 bg-white/60 backdrop-blur-md border border-black/10 shadow-soft"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 ${manhattanOverlay}`}
                  />
                  <div className="relative p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                          Example
                        </div>
                        <div className="mt-3 font-display text-[22px] font-[900] leading-[1.06] tracking-[-0.03em]">
                          “Zrób twist na Manhattan - ma być bardziej kawowy, ale nadal classy.”
                        </div>
                        <div className="mt-3 text-sm leading-7 text-black/65">
                          Dostajesz recepturę, proporcje, metodę, garnish, wariacje i krótką notkę do menu.
                        </div>
                      </div>

                      <div className="hidden sm:block shrink-0 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[12px] font-[850] tracking-[0.10em] uppercase text-black/70">
                        AI assistant
                      </div>
                    </div>

                    <div className="mt-6 text-sm text-black/70">
                      W skrócie - mniej szukania, więcej serwisu. I zero “kto ostatnio zmieniał recepturę?”.
                    </div>
                  </div>
                </NotchCard>
              </motion.div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.05}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              >
                <NotchCard
                  variant="paper"
                  notch="tr"
                  className="relative overflow-hidden rounded-xl3 bg-white/60 backdrop-blur-md border border-black/10 shadow-soft"
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 ${manhattanOverlay}`}
                  />
                  <div className="relative p-6">
                    <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                      Speed & consistency
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-end justify-between gap-6">
                        <div className="min-w-0">
                          <div className="text-sm font-[900] tracking-tight">
                            Avg response
                          </div>
                          <div className="mt-1 text-xs text-black/60">
                            od promptu do receptury
                          </div>
                        </div>
                        <div className="font-display text-3xl font-[900] tracking-tight">
                          <CountUp to={10} suffix="s" />
                        </div>
                      </div>

                      <div className="h-px bg-black/10" />

                      <div className="flex items-end justify-between gap-6">
                        <div className="min-w-0">
                          <div className="text-sm font-[900] tracking-tight">
                            Costing
                          </div>
                          <div className="mt-1 text-xs text-black/60">
                            koszt + sugerowana cena
                          </div>
                        </div>
                        <div className="font-display text-3xl font-[900] tracking-tight">
                          <CountUp to={1} suffix=" min" />
                        </div>
                      </div>

                      <div className="h-px bg-black/10" />

                      <div className="flex items-end justify-between gap-6">
                        <div className="min-w-0">
                          <div className="text-sm font-[900] tracking-tight">
                            Consistency score
                          </div>
                          <div className="mt-1 text-xs text-black/60">
                            spójność opisów i formatów menu
                          </div>
                        </div>
                        <div className="font-display text-4xl font-[900] tracking-tight">
                          <CountUp to={92} suffix="%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </NotchCard>
              </motion.div>
            </Reveal>
          </div>
        </div>

        {/* FULL WIDTH - single strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="mt-10"
        >
          <div className="mb-4 text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
            Co robi asystent
          </div>

          {/* full-bleed breakout from max-width container */}
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
            <div className="px-3 sm:px-6 lg:px-10">
              <FlowTiles items={tiles} speed={18} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}