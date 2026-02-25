import { useCallback, useEffect, useState } from "react";
import MenuSheet from "./MenuSheet";

type ThemeMode = "light" | "dark";

function smoothScrollTo(hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function TopBar() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  // menu
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const onNavigate = useCallback((href: string) => {
    setOpen(false);
    window.setTimeout(() => {
      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      smoothScrollTo(href);
    }, 160);
  }, []);

  // theme z sekcji
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
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
    applyThemeFrom(first ?? sections[0]);

    return () => obs.disconnect();
  }, []);

  const isLight = theme === "light";

  // tylko kolor tekstu - bez zmian czcionek
  const brandClass = isLight ? "text-black" : "text-white";
  const linkClass = isLight ? "text-black/75 hover:text-black" : "text-white/85 hover:text-white";
  const burgerLine = isLight ? "bg-black/80" : "bg-white/90";

  // BLUR NA CAŁĄ SZEROKOŚĆ (header)
  // Uwaga: blur działa tylko jeśli jest choć minimalnie przezroczyste tło.
  const headerGlass = isLight
    ? "backdrop-blur-md bg-white/65 supports-[backdrop-filter]:bg-white/55"
    : "backdrop-blur-md bg-black/30 supports-[backdrop-filter]:bg-black/22";

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 ${headerGlass}`}>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="flex h-[48px] items-center justify-between">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`font-display text-sm font-[850] tracking-tight ${brandClass}`}
            >
              RIVA°
            </a>

            <nav
              className={`hidden items-center gap-16 text-[12px] font-[650] tracking-[0.12em] md:flex ${linkClass}`}
            >
              <a
                className="opacity-90"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#about");
                }}
              >
                ABOUT
              </a>
              <a
                className="opacity-90"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#projects");
                }}
              >
                PROJECTS
              </a>
              <a
                className="opacity-90"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#contact");
                }}
              >
                CONTACT
              </a>
            </nav>

            <button
              onClick={toggle}
              className="group inline-flex h-10 w-10 items-center justify-center"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className="relative block h-[12px] w-[18px]">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full transition group-hover:w-[70%] ${burgerLine}`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full transition group-hover:w-[85%] ${burgerLine}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuSheet open={open} onClose={close} onNavigate={onNavigate} />
    </>
  );
}