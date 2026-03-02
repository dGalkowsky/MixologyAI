import { useCallback, useEffect, useMemo, useState } from "react";
import MenuSheet from "./MenuSheet";

type ThemeMode = "light" | "dark";

function smoothScrollTo(hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useIsDesktop(minWidth = 1024) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${minWidth}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, [minWidth]);

  return ok;
}

export default function TopBar() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // menu
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop(1024);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const links = useMemo(
    () => [
      { label: "O NAS", href: "#about" },
      { label: "PORTFOLIO", href: "#projects" },
      { label: "USŁUGI", href: "#services" },
      { label: "PROCESY", href: "#process" },
      { label: "OPINIE", href: "#testimonials" },
      { label: "KONTAKT", href: "#contact" },
    ],
    []
  );

  const onNavigate = useCallback((href: string) => {
    setOpen(false);
    window.setTimeout(() => {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      smoothScrollTo(href);
    }, 140);
  }, []);

  // zamknij sheet gdy przechodzisz na desktop
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  // theme z sekcji (data-header-theme)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;

    const applyThemeFrom = (el: HTMLElement | null) => {
      if (!el) return;
      const t = el.dataset.headerTheme as ThemeMode | undefined;
      if (t === "light" || t === "dark") setTheme(t);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target) applyThemeFrom(visible.target as HTMLElement);
      },
      {
        root: null,
        rootMargin: "-90px 0px -75% 0px",
        threshold: [0.12, 0.2, 0.35, 0.5],
      }
    );

    sections.forEach((s) => obs.observe(s));

    // initial
    const first = sections.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= 90 && r.bottom > 90;
    });
    applyThemeFrom((first as HTMLElement) ?? (sections[0] as HTMLElement));

    return () => obs.disconnect();
  }, []);

  const isLight = theme === "light";

  const headerGlass = isLight
    ? "backdrop-blur-md bg-white/70 supports-[backdrop-filter]:bg-white/60 border-black/10"
    : "backdrop-blur-md bg-black/30 supports-[backdrop-filter]:bg-black/22 border-white/10";

  const brandClass = isLight ? "text-black" : "text-white";
  const linkClass = isLight ? "text-black/75 hover:text-black" : "text-white/80 hover:text-white";
  const pillClass = isLight
    ? "border-black/10 bg-black/5 text-black/80 hover:bg-black/10"
    : "border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.10]";

  const burgerLine = isLight ? "bg-black/80" : "bg-white/90";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div
            className={`mt-4 rounded-xl3 border ${headerGlass} shadow-[0_18px_60px_rgba(0,0,0,0.22)]`}
          >
            <div className="flex items-center justify-between px-4 py-2 sm:py-3 sm:px-5">
              {/* Brand */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3"
                aria-label="Go to top"
              >
                <span
                  className={`
                    grid h-9 w-9 place-items-center rounded-2xl border
                    ${isLight ? "border-black/10 bg-black/5" : "border-white/12 bg-white/[0.06]"}
                  `}
                >
                  <span
                    className={`
                      h-2 w-2 rounded-full
                      ${isLight ? "bg-black/70" : "bg-white/75"}
                      shadow-[0_0_18px_rgba(255,255,255,0.25)]
                    `}
                  />
                </span>

                <span className={`font-display text-sm font-[900] tracking-tight ${brandClass}`}>
                  MixologyAI
                  <span className={isLight ? "ml-2 font-normal text-black/55" : "ml-2 font-normal text-white/55"}>
                    - cocktail lab
                  </span>
                </span>
              </button>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-1 lg:flex">
                {links.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => onNavigate(l.href)}
                    className={`rounded-xl2 px-3 py-2 text-[12px] font-[850] tracking-[0.10em] uppercase transition-colors ${linkClass}`}
                  >
                    {l.label}
                  </button>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate("#contact")}
                  className={`
                    hidden lg:inline-flex items-center justify-center rounded-full border px-4 py-2
                    text-[12px] font-[850] tracking-[0.10em] uppercase transition-colors
                    ${pillClass}
                  `}
                >
                  Sprawdź DEMO
                </button>

                <button
                  className={`
                    lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border
                    ${isLight ? "border-black/10 bg-black/5" : "border-white/12 bg-white/[0.06]"}
                  `}
                  onClick={toggle}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  <span className="relative block h-4 w-5">
                    <span
                      className={`absolute left-0 top-0 h-[2px] w-5 transition-transform duration-200 ${burgerLine} ${
                        open ? "translate-y-[7px] rotate-45" : ""
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-[7px] h-[2px] w-5 transition-opacity duration-200 ${burgerLine} ${
                        open ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <span
                      className={`absolute left-0 top-[14px] h-[2px] w-5 transition-transform duration-200 ${burgerLine} ${
                        open ? "translate-y-[-7px] -rotate-45" : ""
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MenuSheet open={open} onClose={close} onNavigate={onNavigate} />
    </>
  );
}