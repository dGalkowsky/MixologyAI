import { useMemo } from "react";

function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

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

function ServiceCard({ s, className, cardColor }: { s: Service; className?: string; cardColor?: string }) {
  return (
    <article
      style={{ "--card": cardColor } as React.CSSProperties}
      className={cx(
        "h-full relative overflow-hidden border backdrop-blur-xl",
        "border-[rgb(var(--card)/0.1)]",
        "shadow-[0_0_0_1px_rgb(var(--card)/0.04),0_25px_90px_rgba(0,0,0,0.55)]",
        className,
      )}>
      <div className="relative p-6 h-full">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-[rgb(var(--card)/0.55)]">
              {s.tag}
            </div>

            <div className="mt-2 font-display text-[20px] font-[900] leading-[1.06] tracking-[-0.03em] text-[rgb(var(--card))]">
              {s.title}
            </div>

            <div className="mt-3 text-sm leading-7 text-[rgb(var(--card)/0.7)]">{s.desc}</div>
          </div>

          <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgb(var(--card)/0.1)] bg-[rgb(var(--card)/0.06)] text-[rgb(var(--card)/0.7)]">
            ✦
          </span>
        </div>

        <div className="pt-5 border-b border-[rgb(var(--card)/0.1)]" />

        <ul className="mt-5 space-y-2 text-sm text-[rgb(var(--card)/0.7)]">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--card)/0.45)]" />
              <span className="leading-7">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MiniStep({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl2 border p-5 h-full
border-[rgba(130,185,20,0.26)]
bg-[rgba(38,58,5,0.40)]
shadow-[inset_0_1px_0_rgba(155,210,30,0.15),inset_0_-1px_0_rgba(0,0,0,0.42),0_14px_44px_rgba(0,0,0,0.72)]">
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${manhattanOverlay} opacity-[0.45]`} />

      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div
            className="text-[11px] font-[850] tracking-[0.12em] uppercase text-mixology-lime opacity-95">
            Step {n}
          </div>

          <span className="rounded-full border px-3 py-1 text-[11px] border-mixology-lime/5 bg-mixology-lime/10">
            <span className="text-mixology-lime opacity-70">{title}</span>
          </span>
        </div>

        <div className="mt-3 text-sm leading-7 text-mixology-lime opacity-75">{desc}</div>
      </div>
    </div>
  );
}

export default function ServiceDark() {
  const services = useMemo<Service[]>(
    () => [
      {
        key: "s1",
        tag: "RECIPE LAB",
        title: "Tworzenie drinków i twistów",
        desc: "Asystent prowadzi Cię od pomysłu do gotowej receptury. Dajesz styl, bazę, ograniczenia i cenę - dostajesz wynik, który ma sens w realnym barze.",
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
        desc: "Szybki sanity check: słodkość, kwas, ABV i tekstura. Idealne, gdy testujesz nowy drink i chcesz korekty bez zgadywania.",
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
        desc: "Wpisujesz ceny składników - dostajesz koszt porcji, rekomendowaną cenę i narzut. Koniec z arkuszem, który żyje własnym życiem.",
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
        desc: "Jedno źródło prawdy dla zespołu. Receptury, alergeny, mise en place i SOP-y w formie odpowiedzi, nie plików do szukania.",
        bullets: ["SOP-y pod prep i serwis", "Checklisty jakości", "Alergeny i preferencje gości"],
        tone: "primary",
      },
    ],
    [],
  );

  return (
    <section id="services" data-header-theme="dark" className="relative w-full overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute top-20 left-32 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-28 -right-40 h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 py-[clamp(72px,9vh,120px)]">
        <div className="grid grid-cols-12 gap-x-4 gap-y-4 items-start">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">04 - SERVICES</div>
                {/* <span className="barcode h-[10px] w-[120px] border border-white/10 bg-white/5" /> */}
              </div>

              <h2 className="mt-5 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.02] tracking-[-0.03em]">
                Funkcje, które realnie przyspieszają bar.
                <span className="block text-white/65">Nie "AI dla AI", tylko narzędzie do pracy.</span>
              </h2>

              <p className="mt-5 text-[15px] leading-7 text-white/70">
                MixologyAI łączy kreatywność z kontrolą: receptura ma być dobra, powtarzalna, policzalna i spójna z
                Twoim stylem.
              </p>
            </div>

            <div className="mt-10 relative overflow-hidden border backdrop-blur-xl border-glass-lime bg-glass-lime shadow-glass-lime">
              <div className="relative p-6">
                <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-mixology-lime opacity-75">
                  How it rolls
                </div>

                <div className="mt-3 text-sm leading-7 text-mixology-lime opacity-50">
                  Wrzucasz swoje zasady, styl i dane. Potem pytasz jak do doświadczonego barmana, który pamięta
                  wszystko.
                </div>

                <div className="mt-5 grid grid-cols-12 gap-3">
                  <div className="col-span-12">
                    <MiniStep n="01" title="Input" desc="Twoje receptury, ceny, styl menu, ograniczenia." />
                  </div>

                  <div className="col-span-12">
                    <MiniStep n="02" title="Answer" desc="Receptura + balans + koszt + opis w Twoim tonie." />
                  </div>

                  <div className="col-span-12">
                    <MiniStep n="03" title="Repeatable" desc={`Zespół robi to samo, a nie "po swojemu".`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <ServiceCard
                  s={services[0]}
                  className="bg-glass-orange border-glass-orange shadow-glass-orange"
                  cardColor="200 130 60"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <ServiceCard
                  s={services[1]}
                  className="bg-glass-violet border-glass-violet shadow-glass-violet"
                  cardColor="168 78 218"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <ServiceCard
                  s={services[2]}
                  className="bg-glass-red border-glass-red shadow-glass-red"
                  cardColor="210 65 75"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <ServiceCard
                  s={services[3]}
                  className="bg-glass-blue border-glass-blue shadow-glass-blue"
                  cardColor="80 190 250"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
