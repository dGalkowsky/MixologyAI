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

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-header-theme]")
    );
    if (!sections.length) return;

    const getScrollY = () => document.body.scrollTop;

    const getAbsoluteTop = (el: HTMLElement): number => {
      let top = 0;
      let cur: HTMLElement | null = el;
      while (cur && cur !== document.body) {
        top += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const update = () => {
      const scrollY = getScrollY();

      let matched: HTMLElement | null = null;
      for (const section of sections) {
        if (getAbsoluteTop(section) <= scrollY + 20) {
          matched = section;
        }
      }

      if (!matched) return;
      const t = matched.dataset.headerTheme as ThemeMode | undefined;
      if (t === "light" || t === "dark") setTheme(t);
    };

    update();

    document.body.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      document.body.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const isLight = theme === "light";

  const brandClass = isLight ? "text-black" : "text-white";
  const linkClass = isLight ? "text-black/75 hover:text-black" : "text-white/80 hover:text-white";
  const pillClass = isLight
    ? "border-black/10 bg-black/5 text-black/80 hover:bg-black/10"
    : "border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.10]";

  const burgerLine = isLight ? "bg-black/80" : "bg-white/90";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-xl3">

            {/* ── Gradient blur layers ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-sm"
                style={{
                  maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[3px]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[2px]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-[1px]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
                }}
              />
              <div
                className={`absolute inset-0 ${
                  isLight
                    ? "bg-gradient-to-b from-white/70 via-white/40 to-transparent"
                    : "bg-gradient-to-b from-black/40 via-black/20 to-transparent"
                }`}
              />
            </div>

            <div className="relative max-w-[1240px] mx-auto flex items-center justify-between px-4 py-3 sm:px-5">
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
                    ${isLight ? "border-black/10 bg-black/5" : "border-white/30 bg-white/[0.06]"}
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
