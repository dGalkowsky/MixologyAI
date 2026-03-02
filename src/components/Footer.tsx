import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./ui/Reveal";

function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

// Manhattan cocktail tint (whiskey + vermouth) - subtle overlays
const manhattanOverlay =
  "bg-[radial-gradient(900px_circle_at_15%_0%,rgba(222,116,50,0.22),transparent_42%),radial-gradient(900px_circle_at_90%_10%,rgba(140,40,28,0.18),transparent_45%),radial-gradient(1100px_circle_at_55%_120%,rgba(255,196,120,0.16),transparent_55%)]";

function smoothScrollTo(hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GlassPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2",
        "text-[12px] font-[850] tracking-[0.08em] uppercase text-white/70",
        className
      )}
    >
      {children}
    </span>
  );
}

function GlassRow({
  left,
  right,
}: {
  left: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl2 border border-white/10 bg-white/[0.05] px-4 py-3">
      <span className="text-white/55">{left}</span>
      {right}
    </div>
  );
}

export default function FooterDark() {
  const reduce = useReducedMotion();

  const links = [
    { label: "Home", href: "#top" },
    { label: "Why", href: "#about" },
    { label: "Portfolio", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Opinions", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-ink text-white">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.9]">
        <div className={`absolute inset-0 ${manhattanOverlay}`} />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="pointer-events-none absolute -top-32 -left-32 h-[560px] w-[560px] rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[720px] w-[720px] rounded-full bg-white/4 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(56px,7vh,92px)] pb-[clamp(28px,4vh,52px)]">
        <Reveal>
          <div className="grid grid-cols-12 gap-10">
            {/* Brand */}
            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/12 bg-white/[0.06]">
                  <span className="h-2 w-2 rounded-full bg-white/75 shadow-[0_0_18px_rgba(255,255,255,0.35)]" />
                </span>
                <div>
                  <div className="font-display text-lg font-[900] tracking-[-0.02em]">
                    MixologyAI
                  </div>
                  <div className="mt-0.5 text-xs text-white/55">
                    Web app do koktajli, foodcostu i lekkiego zarządzania barem
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-[60ch] text-sm leading-7 text-white/70">
                Twórz receptury, licz koszt porcji i dbaj o spójność menu - bez arkuszy,
                bez chaosu i bez dorabiania filozofii. Po prostu narzędzie, które działa.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Cocktails", "Foodcost", "Menu", "Team notes"].map((t) => (
                  <GlassPill key={t}>{t}</GlassPill>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
                Navigation
              </div>

              <ul className="mt-4 space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => smoothScrollTo(l.href)}
                      className="group inline-flex w-full items-center justify-between rounded-xl2 border border-transparent px-3 py-2 text-sm text-white/70 hover:text-white hover:border-white/10 hover:bg-white/[0.05]"
                    >
                      <span>{l.label}</span>
                      <span className="text-white/35 transition group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/55">
                Contact
              </div>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <GlassRow
                  left="Email"
                  right={
                    <a
                      className="text-white hover:text-white/90"
                      href="mailto:hello@mixologyai.com"
                    >
                      hello@mixologyai.com
                    </a>
                  }
                />
                <GlassRow
                  left="Demo"
                  right={
                    <button
                      onClick={() => smoothScrollTo("#contact")}
                      className="text-white hover:text-white/90"
                    >
                      Request demo
                    </button>
                  }
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Instagram", "Facebook", "X"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/70 hover:bg-white/[0.10]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-10 h-px w-full bg-white/10" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/55">
              © {new Date().getFullYear()} MixologyAI. All rights reserved.
            </div>

            <div className="flex items-center gap-2 text-xs text-white/55">
              <button
                onClick={() => smoothScrollTo("#top")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 hover:bg-white/[0.10]"
              >
                Back to top
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={reduce ? undefined : { y: [0, -2, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-white/60"
                >
                  ↑
                </motion.span>
              </button>

              <span className="hidden sm:inline text-white/25">•</span>
              <span className="hidden sm:inline text-white/55">Built with love to mixology</span>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}