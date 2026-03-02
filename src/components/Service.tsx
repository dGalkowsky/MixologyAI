import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import PillButton from "./ui/PillButton";
import MartiniGlassIcon from "./ui/MartiniGlassIcon";

function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

// Manhattan cocktail tint (whiskey + vermouth) - subtle overlays
const manhattanOverlay =
  "bg-[radial-gradient(900px_circle_at_15%_0%,rgba(222,116,50,0.22),transparent_42%),radial-gradient(900px_circle_at_90%_10%,rgba(140,40,28,0.18),transparent_45%),radial-gradient(1100px_circle_at_55%_120%,rgba(255,196,120,0.16),transparent_55%)]";

type Service = {
  key: string;
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  tone: "primary" | "neutral";
};

function ServiceCard({ s, className }: { s: Service; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cx(
        "relative overflow-hidden rounded-xl3 border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_90px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0",
          manhattanOverlay,
          s.tone === "primary" ? "opacity-100" : "opacity-[0.75]"
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      />

      <div className="relative p-4 sm:p-6 break-words">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
              {s.tag}
            </div>
            <div className="mt-2 font-display text-[clamp(16px,4vw,20px)] font-[900] leading-[1.06] tracking-[-0.03em] text-white">
              {s.title}
            </div>
            <div className="mt-3 text-sm leading-7 text-white/70">{s.desc}</div>
          </div>

          <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/70">
            <MartiniGlassIcon className="h-5 w-5 text-white/70" />
          </span>
        </div>

        <div className="mt-5 h-px bg-white/10" />

        <ul className="mt-5 space-y-2 text-sm text-white/70">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
              <span className="leading-7">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function MiniStep({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-white/10 bg-white/[0.06] p-5">
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${manhattanOverlay} opacity-[0.55]`} />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
            Step {n}
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/65 break-words">
            {title}
          </span>
        </div>
        <div className="mt-3 text-sm leading-7 text-white/70">{desc}</div>
      </div>
    </div>
  );
}

export default function ServiceDark() {
  const reduce = useReducedMotion();

  const services = useMemo<Service[]>(
    () => [
      {
        key: "s1",
        tag: "RECIPE LAB",
        title: "Tworzenie drinków i twistów",
        desc:
          "Asystent prowadzi Cię od pomysłu do gotowej receptury. Dajesz styl, bazę, ograniczenia i cenę - dostajesz wynik, który ma sens w realnym barze.",
        bullets: [
          "Receptura + metoda + garnish",
          "Warianty: klasyczny, sezonowy, low-ABV, 0%",
          "Sugestie szkła, lodu i rozcieńczenia",
        ],
        tone: "primary",
      },
      {
        key: "s2",
        tag: "BALANCE",
        title: "Balans smaku i korekty",
        desc:
          "Szybki sanity check: słodkość, kwas, ABV i tekstura. Idealne, gdy testujesz nowy drink i chcesz korekty bez zgadywania.",
        bullets: [
          "Korekta kwaśności i słodyczy",
          "Utrzymanie charakteru koktajlu",
          "Propozycje zamienników bez psucia profilu",
        ],
        tone: "neutral",
      },
      {
        key: "s3",
        tag: "COST",
        title: "Koszt porcji, marża i menu price",
        desc:
          "Wpisujesz ceny składników - dostajesz koszt porcji, rekomendowaną cenę i narzut. Koniec z arkuszem, który żyje własnym życiem.",
        bullets: [
          "COGS z uwzględnieniem strat",
          "Sugestia ceny pod target marży",
          "Szybkie aktualizacje przy zmianie cen",
        ],
        tone: "neutral",
      },
      {
        key: "s4",
        tag: "TEAM MODE",
        title: "Standardy, szkolenia i procedury",
        desc:
          "Jedno źródło prawdy dla zespołu. Receptury, alergeny, mise en place i SOP-y w formie odpowiedzi, nie plików do szukania.",
        bullets: [
          "SOP-y pod prep i serwis",
          "Checklisty jakości",
          "Alergeny i preferencje gości",
        ],
        tone: "primary",
      },
    ],
    []
  );

  return (
    <section
      id="services"
      data-header-theme="dark"
      className="relative w-full min-h-[100svh] overflow-hidden bg-ink text-white"
    >
      <div className="pointer-events-none absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[720px] w-[720px] rounded-full bg-white/4 blur-3xl" />

      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-10 py-[clamp(72px,9vh,120px)]">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-start">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
                  04 - SERVICES
                </div>
                <span className="barcode h-[10px] w-[120px] border border-white/10 bg-white/5" />
              </div>

              <motion.h2
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="mt-5 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.02] tracking-[-0.03em]"
              >
                Funkcje, które realnie przyspieszają bar.
                <span className="block text-white/65">
                  Nie “AI dla AI”, tylko narzędzie do pracy.
                </span>
              </motion.h2>

              <motion.p
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 0.05,
                }}
                className="mt-5 text-[15px] leading-7 text-white/70"
              >
                MixologyAI łączy kreatywność z kontrolą: receptura ma być dobra, powtarzalna,
                policzalna i spójna z Twoim stylem.
              </motion.p>

              <div className="mt-8">
              {/*}  <PillButton
                  variant="light"
                  rightPlus
                  className="shadow-[0_18px_60px_rgba(0,0,0,.35)]"
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                >
                  REQUEST DEMO
                </PillButton> */}
              </div>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1], delay: 0.08 }}
                className="mt-10"
              >
                <NotchCard
                  variant="glass"
                  notch="tr"
                  className="relative overflow-hidden rounded-xl3 border border-white/10 bg-white/[0.06] backdrop-blur-xl"
                >
                  <div aria-hidden className={`absolute inset-0 ${manhattanOverlay} opacity-[0.8]`} />
                  <div className="relative p-4 sm:p-6 break-words">
                    <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
                      How it rolls
                    </div>
                    <div className="mt-3 text-sm leading-7 text-white/70">
                      Wrzucasz swoje zasady, styl i dane. Potem pytasz jak do doświadczonego
                      barmana, który pamięta wszystko.
                    </div>

                    <div className="mt-5 grid grid-cols-12 gap-3">
                      <div className="col-span-12 sm:col-span-6">
                        <MiniStep
                          n="01"
                          title="Input"
                          desc="Twoje receptury, ceny, styl menu, ograniczenia."
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <MiniStep
                          n="02"
                          title="Answer"
                          desc="Receptura + balans + koszt + opis w Twoim tonie."
                        />
                      </div>
                      <div className="col-span-12">
                        <MiniStep
                          n="03"
                          title="Repeatable"
                          desc="Zespół robi to samo, a nie “po swojemu”."
                        />
                      </div>
                    </div>
                  </div>
                </NotchCard>
              </motion.div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.05}>
              <div className="grid grid-cols-12 gap-4">
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="col-span-12 md:col-span-6"
                >
                  <ServiceCard s={services[0]} />
                </motion.div>

                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.03 }}
                  className="col-span-12 md:col-span-6"
                >
                  <ServiceCard s={services[1]} />
                </motion.div>

                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
                  className="col-span-12 md:col-span-6"
                >
                  <ServiceCard s={services[2]} />
                </motion.div>

                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.08 }}
                  className="col-span-12 md:col-span-6"
                >
                  <ServiceCard s={services[3]} />
                </motion.div>

                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
                  className="col-span-12"
                >
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}