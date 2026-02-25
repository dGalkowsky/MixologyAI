import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import PillButton from "./ui/PillButton";

function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

// Manhattan cocktail tint (whiskey + vermouth) - subtle overlays
const manhattanOverlay =
  "bg-[radial-gradient(900px_circle_at_15%_0%,rgba(222,116,50,0.22),transparent_42%),radial-gradient(900px_circle_at_90%_10%,rgba(140,40,28,0.18),transparent_45%),radial-gradient(1100px_circle_at_55%_120%,rgba(255,196,120,0.16),transparent_55%)]";

const IMG = {
  cocktail:
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1800&q=80",
  bar:
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2000&q=80",
  menu:
    "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=2000&q=80",
  prep:
    "https://images.unsplash.com/photo-1541542684-4bf98f7e1d10?auto=format&fit=crop&w=2000&q=80",
};

type Step = {
  key: string;
  n: string;
  chip: string;
  title: string;
  desc: string;
  bullets: string[];
  img: string;
  metric: string;
  tall?: boolean;
};

function ProcessTile({
  s,
  className,
}: {
  s: Step;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cx(
        "group relative overflow-hidden rounded-xl3 border border-black/10 bg-white/60 backdrop-blur-md",
        "shadow-[0_16px_55px_rgba(0,0,0,0.08)]",
        s.tall ? "min-h-[360px]" : "min-h-[260px]",
        className
      )}
    >
      {/* background image + tint like Portfolio, but light */}
      <div className="absolute inset-0">
        <img
          src={s.img}
          alt=""
          className={cx(
            "h-full w-full object-cover opacity-[0.22] transition-transform duration-500",
            "group-hover:scale-[1.03]"
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/55" />
        <div aria-hidden className={`absolute inset-0 ${manhattanOverlay} opacity-[0.70]`} />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                Step {s.n}
              </div>
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] font-[850] tracking-[0.10em] uppercase text-black/65">
                {s.chip}
              </span>
            </div>

            <div className="mt-3 text-sm font-[900] tracking-tight text-black">
              {s.title}
            </div>
            <div className="mt-2 text-sm leading-7 text-black/70">{s.desc}</div>
          </div>

          <span className="shrink-0 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] text-black/70">
            {s.metric}
          </span>
        </div>

        <div className="mt-4 h-px bg-black/10" />

        <ul className="mt-4 space-y-2 text-sm text-black/70">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
              <span className="leading-7">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-black/55">In-app flow</div>
          <div className="text-black/55 transition group-hover:translate-x-0.5">
            ↗
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
      />
    </motion.article>
  );
}

function FlowWide() {
  return (
    <NotchCard
      variant="paper"
      notch="both"
      className="relative overflow-hidden rounded-xl3 border border-black/10 bg-white/60 backdrop-blur-md shadow-[0_16px_55px_rgba(0,0,0,0.08)]"
    >
      <div className="absolute inset-0">
        <img
          src={IMG.bar}
          alt=""
          className="h-full w-full object-cover opacity-[0.18]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-white/60" />
        <div aria-hidden className={`absolute inset-0 ${manhattanOverlay} opacity-[0.65]`} />
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
              The workflow
            </div>
            <div className="mt-3 font-display text-[22px] font-[900] leading-[1.06] tracking-[-0.03em] text-black">
              Webowa aplikacja - koktajle, foodcost i lekki porządek.
            </div>
            <div className="mt-2 text-sm text-black/70">
              Bez POS i bez integracji. Wchodzisz, tworzysz receptury, liczysz koszt i ustawiasz standardy dla ekipy.
            </div>
          </div>

          <span className="hidden sm:grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 bg-black/5 text-black/70">
            ✦
          </span>
        </div>

        <div className="mt-5 grid grid-cols-12 gap-3">
          {[
            { k: "Create", v: "receptury, twisty, wariacje" },
            { k: "Cost", v: "foodcost, marża, cena w menu" },
            { k: "Manage", v: "checklisty, alergeny, standardy" },
          ].map((x) => (
            <div
              key={x.k}
              className="col-span-12 sm:col-span-4 rounded-xl2 border border-black/10 bg-white/70 p-4"
            >
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                {x.k}
              </div>
              <div className="mt-2 text-sm leading-7 text-black/70">{x.v}</div>
            </div>
          ))}
        </div>
      </div>
    </NotchCard>
  );
}

export default function ProcessLight() {
  const reduce = useReducedMotion();

  const steps = useMemo<Step[]>(
    () => [
      {
        key: "p1",
        n: "01",
        chip: "COCKTAILS",
        title: "Tworzysz recepturę i wariacje",
        desc:
          "Wybierasz styl, bazę i kierunek smaku - aplikacja podpowiada proporcje, metodę i garnish w realiach baru.",
        bullets: [
          "Twisty na klasykach i autorskie propozycje",
          "Wersje low-ABV i 0% bez losowości",
          "Szkło, lód, rozcieńczenie w przepisie",
        ],
        img: IMG.cocktail,
        metric: "ready to test",
      },
      {
        key: "p2",
        n: "02",
        chip: "FOODCOST",
        title: "Liczysz koszt porcji i marżę",
        desc:
          "Wpisujesz ceny składników - masz koszt porcji, narzut i sugerowaną cenę w menu.",
        bullets: ["COGS + straty i ubytki", "Sugerowana cena pod target marży", "Szybkie aktualizacje cen"],
        img: IMG.prep,
        metric: "numbers",
      },
      {
        key: "p3",
        n: "03",
        chip: "MENU",
        title: "Składasz menu w jednym stylu",
        desc:
          "Opis, format, długość - wszystko spójne. Menu wygląda jak projekt, nie jak przypadek.",
        bullets: ["Jednolity tone of voice (PL/EN)", "Format składników i opisów", "Szybkie sezonowe wkładki"],
        img: IMG.menu,
        metric: "consistent",
        tall: true,
      },
      {
        key: "p4",
        n: "04",
        chip: "LIGHT MGMT",
        title: "Lekki porządek w barze",
        desc:
          "Podstawy zarządzania bez kombajnów - checklisty, alergeny, standardy i notatki dla zespołu.",
        bullets: ["Checklisty prep i serwisu", "Alergeny + preferencje gości", "Jedno źródło prawdy dla ekipy"],
        img: IMG.bar,
        metric: "less chaos",
      },
    ],
    []
  );

  const a = steps[0];
  const b = steps[1];
  const c = steps[2];
  const d = steps[3];

  return (
    <section
      id="process"
      data-header-theme="light"
      className="relative w-full overflow-hidden bg-white text-black"
    >
      {/* soft blobs - like previous light section */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-[520px] w-[520px] rounded-full bg-[rgba(222,116,50,0.10)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[620px] w-[620px] rounded-full bg-[rgba(140,40,28,0.08)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 py-[clamp(72px,9vh,120px)]">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* left copy */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                  05 - PROCESS
                </div>
                <span className="barcode h-[10px] w-[120px] bg-black/5 border border-black/10" />
              </div>

              <motion.h2
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-5 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.02] tracking-[-0.03em]"
              >
                Jak działa aplikacja - w praktyce.
                <span className="block text-black/55">
                  Koktajle, foodcost i lekki porządek w barze.
                </span>
              </motion.h2>

              <motion.p
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
                className="mt-5 text-[15px] leading-7 text-black/70"
              >
                To jest webowa aplikacja. Bez POS i bez integracji. Wchodzisz, tworzysz receptury,
                liczysz koszt i ustawiasz podstawy dla zespołu - szybko i spójnie.
              </motion.p>

              <div className="mt-8">
              {/*}  <PillButton
                  variant="dark"
                  rightPlus
                  className="shadow-[0_18px_60px_rgba(0,0,0,.18)]"
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                >
                  SEE DEMO FLOW
                </PillButton> */}
              </div>
            </Reveal>
          </div>

          {/* wide card */}
          <div className="col-span-12 lg:col-span-7 lg:translate-y-[-36px]">
            <Reveal delay={0.05}>
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <FlowWide />
              </motion.div>
            </Reveal>
          </div>

          {/* row 2 */}
          <div className="col-span-12 md:col-span-6 lg:translate-y-[-36px] lg:translate-x-[-36px]">
            <Reveal>
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <ProcessTile s={a} />
              </motion.div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-6 lg:translate-y-[-96px] lg:translate-x-[-6px]">
            <Reveal delay={0.05}>
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.03 }}
              >
                <ProcessTile s={b} />
              </motion.div>
            </Reveal>
          </div>

          {/* row 3 */}
          <div className="col-span-12 lg:col-span-7 lg:translate-y-[-25px] lg:translate-x-[-16px]">
            <Reveal>
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <ProcessTile s={c} />
              </motion.div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:translate-y-[-95px] lg:translate-x-[16px]">
            <Reveal delay={0.05}>
              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.03 }}
              >
                <ProcessTile s={d} />
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}