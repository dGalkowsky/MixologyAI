import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import Reveal from "./ui/Reveal";

function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

// Manhattan cocktail tint (whiskey + vermouth) - subtle overlays
const manhattanOverlay =
  "bg-[radial-gradient(900px_circle_at_15%_0%,rgba(222,116,50,0.22),transparent_42%),radial-gradient(900px_circle_at_90%_10%,rgba(140,40,28,0.18),transparent_45%),radial-gradient(1100px_circle_at_55%_120%,rgba(255,196,120,0.16),transparent_55%)]";

type Opinion = {
  key: string;
  quote: string;
  who: string;
  role: string;
  place: string;
  metric: string;
};

function Stars() {
  return (
    <div className="flex items-center gap-1 text-white/75" aria-label="5/5">
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className="text-[12px] leading-none">
          {s}
        </span>
      ))}
    </div>
  );
}

function OpinionCard({ o }: { o: Opinion }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cx(
        "relative w-[340px] sm:w-[380px] shrink-0 overflow-hidden",
        "border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_90px_rgba(0,0,0,0.55)]"
      )}
    >
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${manhattanOverlay} opacity-[0.75]`} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      />

      <div className="relative p-6 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
            {o.metric}
          </div>
          <Stars />
        </div>

        <div className="mt-4 text-sm leading-7 text-white/80">
          “{o.quote}”
        </div>

        <div className="mt-auto pt-5 border-b border-white/10" />

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-[900] tracking-tight text-white">
              {o.who}
            </div>
            <div className="mt-1 text-xs text-white/60">
              {o.role} - {o.place}
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
            verified
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function OpinionsMarquee({
  items,
  speed = 26,
}: {
  items: Opinion[];
  speed?: number;
}) {
  const reduce = useReducedMotion();

  const row = (
    <div className="flex w-max items-stretch gap-4 pr-4">
      {items.map((o) => (
        <OpinionCard key={o.key} o={o} />
      ))}
    </div>
  );

  return (
    <div
      className={cx(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      )}
    >
      {reduce ? (
        <div className="flex w-full gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-ink to-transparent" />
        </>
      )}
    </div>
  );
}

export default function TestimonialsDark() {
  const opinions = useMemo<Opinion[]>(
    () => [
      {
        key: "o1",
        quote:
          "W końcu mamy spójne receptury. Nowa osoba w zespole robi dokładnie to samo, bez domysłów i bez ‘a ja zawsze daję więcej syropu’.",
        who: "Kuba",
        role: "Bar manager",
        place: "Warszawa",
        metric: "spójność serwisu",
      },
      {
        key: "o2",
        quote:
          "Foodcost przestał być tabelką-widmem. Wpisuję ceny i od razu wiem ile kosztuje porcja i jaką cenę dać do menu.",
        who: "Alicja",
        role: "Właścicielka",
        place: "Gdańsk",
        metric: "szybkie wyceny",
      },
      {
        key: "o3",
        quote:
          "Twisty na klasykach wychodzą sensownie. Nie dostaję losowych pomysłów - tylko propozycje, które da się zrobić na serwisie.",
        who: "Michał",
        role: "Head bartender",
        place: "Kraków",
        metric: "mniej testów",
      },
      {
        key: "o4",
        quote:
          "Największy plus - opisy do menu są w jednym stylu. Wygląda to premium i w końcu nie mamy ‘każdy inaczej’.",
        who: "Natalia",
        role: "Manager",
        place: "Wrocław",
        metric: "lepsze menu",
      },
      {
        key: "o5",
        quote:
          "Checklista prepu i alergeny pod ręką. Na spokojnie - bez szukania notatek i bez pytań co 5 minut.",
        who: "Oskar",
        role: "Barman",
        place: "Poznań",
        metric: "mniej chaosu",
      },
      {
        key: "o6",
        quote:
          "Robimy sezonową wkładkę dużo szybciej - receptury, ceny i opisy powstają w jednym miejscu, a nie w 10 zakładkach.",
        who: "Karolina",
        role: "Owner",
        place: "Łódź",
        metric: "seasonal sprint",
      },
    ],
    []
  );

  return (
    <section
      id="testimonials"
      data-header-theme="dark"
      className="relative w-full overflow-hidden bg-ink text-white"
    >
      {/* optionally support #opinions too */}
      <div id="opinions" className="absolute -top-24" />



      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(72px,9vh,110px)]">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
                  06 - OPINIONS
                </div>
                <span className="barcode h-[10px] w-[120px] border border-white/10 bg-white/5" />
              </div>

              <h2 className="mt-5 font-display text-[clamp(30px,3.6vw,46px)] leading-[1.02] tracking-[-0.03em]">
                Opinie, które brzmią jak z baru.
                <span className="block text-white/65">
                  Bo są z baru - nie z generatora.
                </span>
              </h2>

              <p className="mt-5 max-w-[70ch] text-[15px] leading-7 text-white/70">
                MixologyAI ma robić różnicę na serwisie: spójność, szybkość i kontrola kosztów.
                Poniżej masz realne efekty używania aplikacji.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[12px] text-white/70">
                <span className="text-white/85 font-[900]">4.9</span>
                <span className="text-white/45">/ 5</span>
                <span className="mx-1 h-4 w-px bg-white/10" />
                <span className="text-white/60">średnia ocena</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* FULL WIDTH marquee */}
      <div className="mt-10 pb-[clamp(72px,9vh,120px)]">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="px-3 sm:px-6 lg:px-10">
            <OpinionsMarquee items={opinions} speed={28} />
          </div>
        </div>
      </div>
    </section>
  );
}