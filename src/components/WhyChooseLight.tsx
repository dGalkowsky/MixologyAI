import { motion, useReducedMotion, useAnimationFrame } from "framer-motion";
import { useMemo, useRef, useCallback } from "react";
import Glass from "./ui/Glass";

type Tile = {
  key: string;
  tag: string;
  title: string;
  desc: string;
};

function lerpColor(t: number) {
  const clamp = Math.max(0, Math.min(1, t));
  const r = Math.round(80 + (222 - 80) * clamp);
  const g = Math.round(190 + (116 - 190) * clamp);
  const b = Math.round(250 + (50 - 250) * clamp);
  return `${r}, ${g}, ${b}`;
}

function applyCardColor(el: HTMLElement, rgb: string) {
  el.style.borderColor = `rgba(${rgb}, 0.30)`;
  el.style.background = `rgba(${rgb}, 0.05)`;

  const tag = el.querySelector<HTMLElement>(".c-tag");
  const title = el.querySelector<HTMLElement>(".c-title");
  const desc = el.querySelector<HTMLElement>(".c-desc");
  const icon = el.querySelector<HTMLElement>(".c-icon");
  const corner = el.querySelector<HTMLElement>(".c-corner");

  if (tag) tag.style.color = `rgba(${rgb}, 0.55)`;
  if (title) title.style.color = `rgb(${rgb})`;
  if (desc) desc.style.color = `rgba(${rgb}, 0.70)`;
  if (icon) {
    icon.style.borderColor = `rgba(${rgb}, 0.30)`;
    icon.style.background = `rgba(${rgb}, 0.08)`;
    icon.style.color = `rgba(${rgb}, 0.70)`;
  }
  if (corner) corner.style.background = `rgba(${rgb}, 0.30)`;
}

function FlowTiles({ items, speed = 22 }: { items: Tile[]; speed?: number }) {
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    if (!stripRef.current) return;
    const vw = window.innerWidth;
    const cards = stripRef.current.querySelectorAll<HTMLElement>(".flow-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const t = 1 - cardCenterX / vw;
      const rgb = lerpColor(t);
      applyCardColor(card, rgb);
    });
  });

  const row = (
    <div className="flex w-max items-stretch gap-4 pr-4">
      {items.map((t) => (
        <motion.div
          key={t.key}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flow-card relative w-[340px] shrink-0 overflow-hidden backdrop-blur-lg border"
          style={{
            clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)",
            borderColor: "rgba(80,190,250,0.30)",
            background: "rgba(80,190,250,0.05)",
          }}>
          <div
            className="c-corner absolute w-7 h-px top-5 right-0 origin-top-right rotate-45"
            style={{ background: "rgba(80,190,250,0.30)" }}
          />

          <div className="relative p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="c-tag text-[11px] font-[850] tracking-[0.12em] uppercase"
                  style={{ color: "rgba(80,190,250,0.55)" }}>
                  {t.tag}
                </div>
                <div className="c-title mt-2 text-sm font-[900] tracking-tight" style={{ color: "rgb(80,190,250)" }}>
                  {t.title}
                </div>
              </div>
              <span
                className="c-icon mt-0.5 grid h-10 w-10 shrink-0 place-items-center border text-sm"
                style={{
                  background: "rgba(80,190,250,0.08)",
                  borderColor: "rgba(80,190,250,0.30)",
                  color: "rgba(80,190,250,0.70)",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
                }}>
                ✦
              </span>
            </div>
            <div className="c-desc mt-3 text-sm leading-7" style={{ color: "rgba(80,190,250,0.70)" }}>
              {t.desc}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-48 z-10"
        style={{
          background: "linear-gradient(to right, rgba(222,116,50,0.10) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-48 z-10"
        style={{
          background: "linear-gradient(to left, rgba(80,190,250,0.10) 0%, transparent 100%)",
        }}
      />

      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}>
        {reduce ? (
          <div ref={stripRef} className="flex w-full gap-4 overflow-x-auto pb-2">
            {row}
          </div>
        ) : (
          <motion.div
            ref={stripRef}
            className="flex w-max gap-4"
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{
              duration: speed,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}>
            {row}
            {row}
          </motion.div>
        )}
      </div>
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
    [],
  );

  return (
    <section id="about" data-header-theme="dark" className="relative w-full bg-ink text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full bg-mixology-orange/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 h-[560px] w-[560px] translate-y-1/3 rounded-full bg-mixology-blue/5 blur-3xl" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(84px,10vh,132px)] pb-[clamp(44px,7vh,96px)] flex flex-col">
        <div className="">
          <div className="flex items-center gap-3">
            <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">02 - WHY MIXOLOGYAI</div>
            <span className="barcode h-[10px] w-[120px] bg-white/20 border border-white/30" />
          </div>

          <h2 className="mt-5 font-display text-[clamp(34px,4.2vw,54px)] leading-[0.98] tracking-[-0.04em]">
            Drinks that work.
            <span className="block text-white/55">Recipes that scale - with an AI bartender.</span>
          </h2>

          <p className="mt-5 max-w-[62ch] text-[15px] leading-7 text-white/70">
            MixologyAI pomaga budować receptury, robi szybki sanity check balansu, liczy koszt porcji i pilnuje
            spójności menu. Działa na Twoich zasadach - więc wynik jest użyteczny, a nie "kreatywny".
          </p>
        </div>

        <div className="relative lg:mt-10 py-10 w-full max-w-[944px] mx-auto">
          <Glass className="flex justify-center mt-10" classGlassSize="h-80 sm:h-mixology-120" />

          <div className="hidden lg:block absolute top-0">
            <div
              className="relative w-56 min-h-64 bg-mixology-orange/5 backdrop-blur-lg border border-mixology-orange/30"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)" }}>
              <div className="absolute w-7 h-px bg-mixology-orange/30 top-5 right-0 origin-top-right rotate-45" />
              <div className="px-4 py-6 flex flex-col gap-4 min-h-64">
                <h5 className="font-bold text-lg text-mixology-bronze">Dekoracje</h5>
                <p className="text-sm text-mixology-bronze/80">Wyglad zawsze jak najlepszy</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Wyglad
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Wybór
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Swoboda
                  </p>
                </div>
              </div>
            </div>
            <svg className="absolute overflow-visible z-50 top-[20%] left-full">
              <path d="M 0,0 L 80,0 L 170,65" fill="none" stroke="rgb(153, 39, 4)" strokeWidth="1.5" />
              <circle cx={0} cy={0} r={4} fill="rgb(153, 39, 4)" />
              <circle cx={170} cy={65} r={4} fill="rgb(153, 39, 4)" />
            </svg>
          </div>

          <div className="hidden lg:block absolute bottom-0">
            <div
              className="relative w-56 min-h-64 bg-mixology-orange/5 backdrop-blur-lg border border-mixology-orange/30"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)" }}>
              <div className="absolute w-7 h-px bg-mixology-orange/30 top-5 right-0 origin-top-right rotate-45" />
              <div className="px-4 py-6 flex flex-col gap-4 min-h-64">
                <h5 className="font-bold text-lg text-mixology-bronze">Szklo</h5>
                <p className="text-sm text-mixology-bronze/80">
                  Idealby wybor szkla pod wybrany koktajl aby zapewnic jak najlepsze doswiadczenie spozywania oraz
                  zapamietnie chwili XD
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Dopasowanie
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Koktajl
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Swoboda
                  </p>
                </div>
              </div>
            </div>
            <svg className="absolute overflow-visible z-50 top-[80%] left-full">
              <path d="M 0,0 L 80,0 L 170,-50" fill="none" stroke="rgb(153, 39, 4)" strokeWidth="1.5" />
              <circle cx={0} cy={0} r={4} fill="rgb(153, 39, 4)" />
              <circle cx={170} cy={-50} r={4} fill="rgb(153, 39, 4)" />
            </svg>
          </div>

          <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2">
            <div
              className="relative w-56 min-h-64 bg-mixology-blue/5 backdrop-blur-lg border border-mixology-blue/30"
              style={{ clipPath: "polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)" }}>
              <div className="absolute w-7 h-px bg-mixology-blue/30 top-5 left-0 origin-top-left -rotate-45" />
              <div className="px-4 py-6 flex flex-col gap-4 min-h-64">
                <h5 className="font-bold text-lg text-mixology-sky">Skladniki</h5>
                <p className="text-sm text-mixology-sky/80">
                  Skladniki sa zawsze wybierane dokladnie i selektywnie aby utrzymac najbardziej satysfakcjonujacy smak
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <p className="w-fit px-2 py-1 bg-mixology-sky/10 border border-mixology-sky/30 rounded-full text-mixology-sky/80 text-xs">
                    Smak
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-sky/10 border border-mixology-sky/30 rounded-full text-mixology-sky/80 text-xs">
                    Wybór
                  </p>
                </div>
              </div>
            </div>
            <svg className="absolute overflow-visible z-50 left-0 top-[80%]">
              <path d="M 0,0 L -120,0 L -220,-120" fill="none" stroke="rgb(80, 190, 250)" strokeWidth="1.5" />
              <circle cx={0} cy={0} r={4} fill="rgb(80, 190, 250)" />
              <circle cx={-220} cy={-120} r={4} fill="rgb(80, 190, 250)" />
            </svg>
          </div>

          <div className="lg:hidden flex flex-wrap justify-center gap-4">
            <div className="relative w-full mixology-xs:w-56 min-h-64 bg-mixology-orange/5 backdrop-blur-lg border border-mixology-orange/30">
              <div className="px-4 py-6 flex flex-col gap-4 min-h-64">
                <h5 className="font-bold text-lg text-mixology-bronze">Dekoracje</h5>
                <p className="text-sm text-mixology-bronze/80">Wyglad zawsze jak najlepszy</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Wyglad
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Wybór
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Swoboda
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full mixology-xs:w-56 min-h-64 bg-mixology-blue/5 backdrop-blur-lg border border-mixology-blue/30">
              <div className="px-4 py-6 flex flex-col gap-4 min-h-64">
                <h5 className="font-bold text-lg text-mixology-sky">Skladniki</h5>
                <p className="text-sm text-mixology-sky/80">
                  Skladniki sa zawsze wybierane dokladnie i selektywnie aby utrzymac najbardziej satysfakcjonujacy smak
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <p className="w-fit px-2 py-1 bg-mixology-sky/10 border border-mixology-sky/30 rounded-full text-mixology-sky/80 text-xs">
                    Smak
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-sky/10 border border-mixology-sky/30 rounded-full text-mixology-sky/80 text-xs">
                    Wybór
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full mixology-xs:w-56 min-h-64 bg-mixology-orange/5 backdrop-blur-lg border border-mixology-orange/30">
              <div className="px-4 py-6 flex flex-col gap-4 min-h-64">
                <h5 className="font-bold text-lg text-mixology-bronze">Szklo</h5>
                <p className="text-sm text-mixology-bronze/80">
                  Idealby wybor szkla pod wybrany koktajl aby zapewnic jak najlepsze doswiadczenie spozywania oraz
                  zapamietnie chwili XD
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Dopasowanie
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Koktajl
                  </p>
                  <p className="w-fit px-2 py-1 bg-mixology-bronze/10 border border-mixology-bronze/30 rounded-full text-mixology-bronze/80 text-xs">
                    Swoboda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div className="mt-10">
          <div className="mb-4 text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">Co robi asystent</div>
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
