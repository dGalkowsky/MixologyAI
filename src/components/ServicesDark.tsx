import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const items = [
  { id: "001", title: "Brand identity & rebranding" },
  { id: "002", title: "UX / UI Design" },
  { id: "003", title: "Art Direction" },
  { id: "004", title: "Visual Identity Systems" },
  { id: "005", title: "Typography & Guidelines" },
];

function ServiceRow({
  id,
  title,
  open,
  onToggle,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl2 border border-black/10 bg-black/5">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex h-6 w-12 items-center justify-center rounded-full bg-black/8 font-mono text-[10px] text-black/80">
            {id}
          </span>
          <span className="font-mono text-[13px] text-black/85">{title}</span>
        </div>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={clsx(
            "grid h-8 w-8 place-items-center rounded-full border",
            "border-black/10 bg-black/6 text-black/80"
          )}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden px-5 pb-4"
          >
            <div className="max-w-[78ch] text-[12px] leading-[1.6] text-black/65">
              From strategy to visuals - we craft designs that elevate brands, connect with users,
              and deliver measurable impact.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const slideLeft = {
  hidden: { opacity: 0, x: -34, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 34, filter: "blur(8px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 },
  },
};

export default function ServicesDark() {
  const [open, setOpen] = useState<string>("001");

  return (
    <section
      id="services"
      data-header-theme="light"
      className="relative w-full min-h-[100svh] bg-white text-black"
    >
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(84px,10vh,132px)] pb-[clamp(44px,7vh,96px)]">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-start">
          {/* LEWA - akordeon */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            className="col-span-12 lg:col-span-6"
          > 
            <div className="ml-auto w-full max-w-[860px]">
              <div className="space-y-3">
                {items.map((it) => (
                  <ServiceRow
                    key={it.id}
                    id={it.id}
                    title={it.title}
                    open={open === it.id}
                    onToggle={() => setOpen(open === it.id ? "" : it.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* PRAWA - tekst */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            className="col-span-12 lg:col-span-6 lg:pt-6"
          >
            <h3 className="font-display font-[850] leading-[0.92] tracking-[-0.06em] text-[clamp(44px,6.4vw,86px)]">
              <span className="text-black">DESIGN</span>
              <br />
              <span className="text-black">SERVICES THAT</span>
              <br />
              <span className="text-black/50">DRIVE RESULTS.</span>
            </h3>
            {/* opis POD nagłówkiem */}
            <p className="mt-6 max-w-[52ch] text-[clamp(12px,1.3vw,15px)] leading-[1.6] text-black/70">
              Minimal, editorial, and engineered to feel premium. Zero bootstrapowej plasteliny.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}