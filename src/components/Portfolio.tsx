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

type ModuleCard = {
  key: string;
  tag: string;
  title: string;
  desc: string;
  chips: string[];
};

type CaseCard = {
  key: string;
  title: string;
  desc: string;
  img: string;
  tags: string[];
  metric: string;
};

const IMG = {
  cocktail: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1800&q=80",
  bar: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2000&q=80",
  menu: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?auto=format&fit=crop&w=2000&q=80",
  prep: "https://images.unsplash.com/photo-1541542684-4bf98f7e1d10?auto=format&fit=crop&w=2000&q=80",
};

function SoftCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-xl3 border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_25px_90px_rgba(0,0,0,0.55)]",
        className,
      )}>
      <div aria-hidden className={`pointer-events-none absolute inset-0 ${manhattanOverlay}`} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function UseCaseCard({ c, className, tall }: { c: CaseCard; className?: string; tall?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cx(
        "group relative overflow-hidden rounded-xl3 border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        tall ? "min-h-[360px]" : "min-h-[260px]",
        className,
      )}>
      <div className="absolute inset-0">
        <img
          src={c.img}
          alt=""
          className={cx(
            "h-full w-full object-cover opacity-[0.26] transition-transform duration-500",
            "group-hover:scale-[1.03]",
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div aria-hidden className={`absolute inset-0 ${manhattanOverlay}`} />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-[900] tracking-tight text-white">{c.title}</div>
            <div className="mt-2 text-sm leading-7 text-white/70">{c.desc}</div>
          </div>

          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
            {c.metric}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {c.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs text-white/55">Use case</div>
          <div className="text-white/60 transition group-hover:translate-x-0.5">↗</div>
        </div>
      </div>
    </motion.div>
  );
}

function ModulesWide({ modules }: { modules: ModuleCard[] }) {
  return (
    <NotchCard
      variant="glass"
      notch="both"
      className="relative overflow-hidden rounded-xl3 border border-white/10 bg-white/[0.06] backdrop-blur-xl">
      <div className="absolute inset-0">
        <img src={IMG.cocktail} alt="" className="h-full w-full object-cover opacity-[0.30]" loading="lazy" />
        <div className="absolute inset-0 bg-black/55" />
        <div aria-hidden className={`absolute inset-0 ${manhattanOverlay}`} />
      </div>

      {/* podłużny, kompaktowy */}
      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">Product modules</div>
            <div className="mt-3 font-display text-[22px] font-[900] leading-[1.06] tracking-[-0.03em]">
              Jeden asystent - kilka trybów pracy.
            </div>
            <div className="mt-2 text-sm text-white/70">
              Receptury, balans i wycena - spójnie, szybko, w Twoim stylu.
            </div>
          </div>

          <span className="hidden sm:grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/70">
            ✦
          </span>
        </div>

        <div className="mt-5 grid grid-cols-12 gap-3">
          {modules.slice(0, 3).map((m) => (
            <div
              key={m.key}
              className="col-span-12 sm:col-span-4 rounded-xl2 border border-white/10 bg-white/[0.06] p-4">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">{m.tag}</div>
              <div className="mt-1 text-sm font-[900] text-white">{m.title}</div>
              <div className="mt-2 text-xs leading-6 text-white/65">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </NotchCard>
  );
}

export default function Portfolio() {
  const reduce = useReducedMotion();

  const modules = useMemo<ModuleCard[]>(
    () => [
      {
        key: "m1",
        tag: "RECIPE LAB",
        title: "Generator receptur + wariacje",
        desc: "Tworzysz drinka od zera albo robisz twist - AI pilnuje sensu i stylu baru.",
        chips: ["style lock", "variants", "garnish"],
      },
      {
        key: "m2",
        tag: "BALANCE",
        title: "Sanity check balansu",
        desc: "Słodkie/kwas/ABV/rozcieńczenie - szybkie korekty, bez zgadywania.",
        chips: ["acid-sweet", "dilution", "abv"],
      },
      {
        key: "m3",
        tag: "COST",
        title: "Koszt porcji + marża",
        desc: "Podajesz ceny składników - dostajesz koszt, rekomendację ceny i narzut.",
        chips: ["COGS", "margin", "price"],
      },
      {
        key: "m4",
        tag: "MENU",
        title: "Opisy do menu w jednym tonie",
        desc: "Ten sam vibe, ta sama długość, ten sam format - menu wygląda jak projekt.",
        chips: ["tone", "PL/EN", "format"],
      },
      {
        key: "m5",
        tag: "OPS",
        title: "Tryb zespołu i procedury",
        desc: "Standardy, alergeny, mise en place - odpowiedź w sekundę, bez szukania plików.",
        chips: ["SOP", "training", "allergens"],
      },
    ],
    [],
  );

  const seasonal: CaseCard = useMemo(
    () => ({
      key: "c1",
      title: "Seasonal Menu Sprint",
      desc: "W 2 godziny robisz sezonową wkładkę: 6 drinków + opisy + wycena.",
      img: IMG.menu,
      tags: ["menu", "pricing", "tone"],
      metric: "6 drinks / 120 min",
    }),
    [],
  );

  const inventory: CaseCard = useMemo(
    () => ({
      key: "c2",
      title: "Inventory-first Cocktails",
      desc: "Układasz kartę pod to co masz - AI podpowiada zamienniki i backup składników.",
      img: IMG.prep,
      tags: ["stock", "subs", "ops"],
      metric: "less waste",
    }),
    [],
  );

  const signature: CaseCard = useMemo(
    () => ({
      key: "c3",
      title: "Signature Creator",
      desc: "Twisty na klasykach - ale dalej classy. Spójne receptury dla całej ekipy.",
      img: IMG.cocktail,
      tags: ["recipe", "balance", "garnish"],
      metric: "consistent output",
    }),
    [],
  );

  return (
    <section id="projects" data-header-theme="light" className="px-4 py-4 bg-ink ">
      <div className="relative w-full overflow-hidden bg-white text-black rounded-3xl">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full bg-mixology-orange/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[560px] w-[560px] rounded-full bg-mixology-blue/10 blur-3xl" />

        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-10 py-10 sm:py-14 md:py-20">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 xs:col-span-10 xs:col-start-2 md:col-span-5">
              <Reveal>
                <div className="flex items-center gap-3">
                  <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
                    03 - PORTFOLIO (USE CASES)
                  </div>
                  <span className="barcode h-[10px] w-[120px] border border-black/10 bg-black/5" />
                </div>

                <motion.h2
                  initial={reduce ? undefined : { opacity: 0, y: 14 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="mt-5 font-display text-[clamp(30px,3.4vw,44px)] leading-[1.02] tracking-[-0.03em]">
                  Portfolio wyników, które dowozisz na serwisie.
                  <span className="block text-black/65">Receptury, koszt, menu, standardy - w jednym narzędziu.</span>
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
                  className="mt-5 text-[15px] leading-7 text-black/70">
                  MixologyAI działa jak bartender + manager w jednym: robi receptury, pilnuje balansu, liczy koszt
                  porcji i utrzymuje spójny język w menu.
                </motion.p>

                <div className="mt-8">
                  {/* <PillButton
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
              </Reveal>
            </div>
            <div className="col-span-12 xs:col-span-10 xs:col-start-2 md:col-span-6 md:col-start-7 rounded-3xl border border-black/20 bg-black/85 text-white flex flex-col">
              <div className="max-w-full h-[320px] mx-4 mt-4 rounded-3xl overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/917737514/photo/barmans-hands-sprinkling-the-juice-into-the-cocktail-glass.jpg?s=612x612&w=0&k=20&c=9gWN7LlTLDxal1QUpVYHSLUwJ6U9NoYWG52K2GVVFPI="
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-4 py-6 px-8">
                <h3 className="font-bold text-2xl">Lorem ipsum dolor</h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a neque est. Maecenas turpis ligula,
                  ultricies consectetur nibh vitae, vestibulum iaculis metus. Nullam vel ultricies nulla.
                </p>
              </div>
            </div>
            <div className="col-span-12 xs:col-span-10 xs:col-start-2 md:col-span-6 lg:col-span-7 rounded-3xl border border-black/20 bg-black/85 text-white flex flex-col">
              <div className="max-w-full h-[320px] mx-4 mt-4 rounded-3xl overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/917737514/photo/barmans-hands-sprinkling-the-juice-into-the-cocktail-glass.jpg?s=612x612&w=0&k=20&c=9gWN7LlTLDxal1QUpVYHSLUwJ6U9NoYWG52K2GVVFPI="
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-4 py-6 px-8">
                <h3 className="font-bold text-2xl">Lorem ipsum dolor</h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a neque est. Maecenas turpis ligula,
                  ultricies consectetur nibh vitae, vestibulum iaculis metus. Nullam vel ultricies nulla.
                </p>
              </div>
            </div>
            <div className="col-span-12 xs:col-span-10 xs:col-start-2 md:col-span-6 lg:col-span-5 rounded-3xl border border-black/20 bg-black/85 text-white flex flex-col">
              <div className="max-w-full h-[320px] mx-4 mt-4 rounded-3xl overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/917737514/photo/barmans-hands-sprinkling-the-juice-into-the-cocktail-glass.jpg?s=612x612&w=0&k=20&c=9gWN7LlTLDxal1QUpVYHSLUwJ6U9NoYWG52K2GVVFPI="
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-4 py-6 px-8">
                <h3 className="font-bold text-2xl">Lorem ipsum dolor</h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a neque est. Maecenas turpis ligula,
                  ultricies consectetur nibh vitae, vestibulum iaculis metus. Nullam vel ultricies nulla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
