import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

type Item = { label: string; href: string; hint?: string };

export default function MenuSheet({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
  const items = useMemo<Item[]>(
    () => [
      { label: "Home", href: "#top", hint: "Start" },
      { label: "O Nas", href: "#about", hint: "Jak działamy" },
      { label: "Portfolio", href: "#projects", hint: "Portfolio" },
      { label: "Usługi", href: "#services", hint: "Usługi" },
      { label: "Procesy", href: "#process", hint: "Jak to działa" },
      { label: "Opinie", href: "#testimonials", hint: "Opinie klientów" },
      { label: "Kontakt", href: "#contact", hint: "Kontakt" },
    ],
    []
  );

  // lock scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // esc to close
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const node = (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop - blur over whole page */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/35 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* sheet */}
          <motion.div
            className={[
              "fixed inset-x-0 bottom-0 z-[90] h-[100svh]",
              "rounded-t-xl3 border border-white/10",
              "bg-ink/90 supports-[backdrop-filter]:bg-ink/70 backdrop-blur-2xl",
              "shadow-[0_-30px_120px_rgba(0,0,0,.6)] text-white",
              "flex flex-col",
            ].join(" ")}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            {/* sticky top row */}
            <div className="sticky top-0 z-10 border-b border-white/10 bg-ink/80 backdrop-blur-2xl">
              <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-8 py-6 flex items-center justify-between">
                <div className="font-display text-sm font-[900] tracking-tight">
                  MixologyAI
                  <span className="ml-2 font-normal text-white/55">menu</span>
                </div>

                <button
                  onClick={onClose}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/85 hover:bg-white/10"
                >
                  Zamknij
                </button>
              </div>
            </div>

            {/* scrollable content */}
            <div
              className={[
                "flex-1 overflow-y-auto overscroll-contain",
                "pb-[calc(40px+env(safe-area-inset-bottom))]",
              ].join(" ")}
            >
              <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 pt-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* nav list */}
                  <div className="col-span-12 lg:col-span-7">
                    <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/45">
                      Nawigacja
                    </div>

                    <div className="mt-6 space-y-2">
                      {items.map((it, idx) => (
                        <motion.button
                          key={it.href}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 + idx * 0.03,
                            duration: 0.35,
                            ease: [0.2, 0.8, 0.2, 1],
                          }}
                          onClick={() => onNavigate(it.href)}
                          className="group flex w-full items-end justify-between rounded-xl2 border border-white/10 bg-white/5 px-6 py-5 text-left hover:bg-white/10"
                        >
                          <div>
                            <div className="font-display text-[32px] sm:text-[36px] font-[900] leading-none tracking-[-0.03em]">
                              {it.label}
                            </div>
                            {it.hint && (
                              <div className="mt-2 font-mono text-[11px] text-white/55">
                                {it.hint}
                              </div>
                            )}
                          </div>

                          <div className="mb-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition group-hover:translate-x-0.5 group-hover:bg-white/10">
                            ↗
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => onNavigate("#contact")}
                        className="w-full rounded-xl2 border border-white/10 bg-white/5 px-6 py-4 text-[12px] font-[850] tracking-[0.10em] uppercase text-white/85 hover:bg-white/10"
                      >
                        Request demo
                      </button>
                    </div>
                  </div>

                  {/* quick info */}
                  <div className="col-span-12 lg:col-span-5 lg:pl-6">
                    <div className="rounded-xl3 border border-white/10 bg-white/5 p-6">
                      <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/45">
                        Quick info
                      </div>

                      <div className="mt-5 space-y-3 font-mono text-[12px] text-white/70">
                        <div className="flex items-center justify-between">
                          <span>Mail</span>
                          <span className="text-white/90">hello@mixologyai.com</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Demo</span>
                          <span className="text-white/90">via contact form</span>
                        </div>
                      </div>

                      <div className="mt-6 h-px bg-white/10" />

                      <div className="mt-6 flex flex-wrap gap-2">
                        {["Instagram", "Facebook", "X"].map((s) => (
                          <a
                            key={s}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/80 hover:bg-white/10"
                            href="#"
                          >
                            {s}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl3 border border-white/10 bg-white/5 p-6">
                      <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/45">
                        Tip
                      </div>
                      <div className="mt-3 text-sm leading-7 text-white/70">
                        Jeśli coś nie pasuje - mów śmiało. Tu nie ma “wersji finalnej”, jest wersja
                        “lepsza niż wczoraj”.
                      </div>
                    </div>
                  </div>
                </div>

                {/* extra breathing room at the very bottom */}
                <div className="h-10" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
}