import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type Item = { label: string; href: string; hint?: string };

const ITEMS: Item[] = [
  { label: "Home", href: "#top", hint: "Start" },
  { label: "About", href: "#about", hint: "What we do" },
  { label: "Projects", href: "#projects", hint: "Selected work" },
  { label: "Pricing", href: "#pricing", hint: "Plans" },
  { label: "FAQ", href: "#faq", hint: "Before you start" },
  { label: "Contact", href: "#contact", hint: "Let’s talk" },
];

export default function MenuSheet({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
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
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[90] h-[92vh] rounded-t-[28px] border border-white/10 bg-ink text-white shadow-[0_-30px_120px_rgba(0,0,0,.6)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >

            <div className="relative mx-auto h-full max-w-[1240px] px-8 pb-10 pt-8">
              {/* top row */}
              <div className="flex items-center justify-between">
                <div className="font-display text-sm font-[850] tracking-tight">QWERTY°</div>

                <button
                  onClick={onClose}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/85 hover:bg-white/10"
                >
                  Close <span className="opacity-70">ESC</span>
                </button>
              </div>

              {/* content */}
              <div className="mt-10 grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-7">
                  <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/45">
                    Navigation
                  </div>

                  <div className="mt-6 space-y-2">
                    {ITEMS.map((it, idx) => (
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
                          <div className="font-display text-[34px] font-[900] leading-none tracking-[-0.03em]">
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
                </div>

                <div className="col-span-12 lg:col-span-5 lg:pl-6">
                  <div className="rounded-xl3 border border-white/10 bg-white/5 p-6">
                    <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-white/45">
                      Quick info
                    </div>

                    <div className="mt-5 space-y-3 font-mono text-[12px] text-white/70">
                      <div className="flex items-center justify-between">
                        <span>Mail</span>
                        <span className="text-white/90">hello@test.com</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Phone</span>
                        <span className="text-white/90">+48 123 456 789</span>
                      </div>
                    </div>

                    <div className="mt-6 h-px bg-white/10" />

                    <div className="mt-6 flex flex-wrap gap-2">
                      <a
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/80 hover:bg-white/10"
                        href="#"
                      >
                        Instagram 
                      </a>
                      <a
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/80 hover:bg-white/10"
                        href="#"
                      >
                        Facebook
                      </a>
                      <a
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-[850] tracking-[0.08em] uppercase text-white/80 hover:bg-white/10"
                        href="#"
                      >
                        X
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
}