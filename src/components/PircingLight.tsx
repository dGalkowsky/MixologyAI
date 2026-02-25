import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import PillButton from "./ui/PillButton";

type PlanKey = "perProject" | "monthly";

type Tile = {
  n: string;
  label: string;
  desc: string;
};

function TogglePill({
  value,
  onChange,
}: {
  value: PlanKey;
  onChange: (v: PlanKey) => void;
}) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-black/15 bg-black/10 p-1 shadow-[0_10px_30px_rgba(0,0,0,.08)]">
      <button
        type="button"
        aria-pressed={value === "perProject"}
        onClick={() => onChange("perProject")}
        className={[
          "relative z-10 rounded-full px-4 sm:px-6 py-2",
          "text-[12px] font-[850] tracking-tight",
          "cursor-pointer select-none transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25",
          value === "perProject"
            ? "text-white"
            : "text-black/70 hover:bg-black/5 hover:text-black",
        ].join(" ")}
      >
        per project
      </button>

      <button
        type="button"
        aria-pressed={value === "monthly"}
        onClick={() => onChange("monthly")}
        className={[
          "relative z-10 rounded-full px-4 sm:px-6 py-2",
          "text-[12px] font-[850] tracking-tight",
          "cursor-pointer select-none transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25",
          value === "monthly"
            ? "text-white"
            : "text-black/70 hover:bg-black/5 hover:text-black",
        ].join(" ")}
      >
        monthly
      </button>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
        className="pointer-events-none absolute inset-y-1 w-1/2 rounded-full bg-black"
        style={{ left: value === "perProject" ? 4 : "calc(50% + 0px)" }}
      />
    </div>
  );
}

function PlanCard({
  plan,
}: {
  plan: {
    tag: string;
    price: string;
    note: string;
    accent: "riwa" | "none";
  };
}) {
  return (
    <div className="relative overflow-hidden border border-black/10 bg-gradient-to-b from-[#17181C] to-[#0B0C10] text-white shadow-soft notch-tl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

      {plan.accent === "riwa" && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-riwa" />
      )}

      <div className="relative p-7">
        <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-[800] tracking-tight">
          {plan.tag}
        </div>

        <div className="mt-9 font-display text-[44px] sm:text-[52px] lg:text-[58px] font-[900] leading-none tracking-[-0.04em]">
          {plan.price}
        </div>

        <div className="mt-3 max-w-[32ch] text-[12px] leading-[1.5] text-white/80">
          {plan.note}
        </div>

        <div className="mt-7">
          <PillButton variant="light" rightPlus>
            GET IN TOUCH
          </PillButton>
        </div>
      </div>
    </div>
  );
}

function TileCard({ tile }: { tile: Tile }) {
  return (
    <div className="relative h-full overflow-hidden border border-black/10 bg-white shadow-soft notch-tr">
      <div className="flex items-center justify-between border-b border-black/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-[3px] bg-riwa" />
          <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
            {tile.label}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-6">
        <div className="font-display text-[40px] sm:text-[48px] lg:text-[54px] font-[900] tracking-[-0.03em]">
          {tile.n}
        </div>
        <div className="mt-3 max-w-[34ch] font-mono text-[10px] leading-[1.45] text-black/55">
          {tile.desc}
        </div>
      </div>
    </div>
  );
}

export default function PricingLight() {
  const [planKey, setPlanKey] = useState<PlanKey>("monthly");

  const plan = useMemo(() => {
    if (planKey === "monthly") {
      return {
        tag: "Monthly",
        price: "$1899",
        note: "You can always change or cancel your plan. No risks.",
        accent: "none" as const,
      };
    }
    return {
      tag: "Per project",
      price: "$2490",
      note: "Fixed scope delivery - start to finish. No risks.",
      accent: "riwa" as const,
    };
  }, [planKey]);

  const tiles = useMemo<Tile[]>(() => {
    if (planKey === "monthly") {
      return [
        { n: "01", label: "Unlimited requests", desc: "Add any number of tasks to your queue." },
        { n: "02", label: "One active task", desc: "Focused execution, delivered step by step." },
        { n: "03", label: "24-48h delivery", desc: "Fast turnaround for most design tasks." },
        { n: "04", label: "Unlimited revisions", desc: "Iterate until the output fits perfectly." },
        { n: "05", label: "Custom illustrations", desc: "Tailored visual assets in your brand style." },
        { n: "06", label: "Team access", desc: "Collaborate via shared workspace." },
        { n: "07", label: "Ongoing support", desc: "Daily communication and progress updates." },
      ];
    }

    return [
      { n: "01", label: "Complete project delivery", desc: "From initial brief to polished final files." },
      { n: "02", label: "Design concepts", desc: "Two strong visual directions to choose from." },
      { n: "03", label: "Included pages", desc: "Any mix of landing or informational pages." },
      { n: "04", label: "Revision rounds", desc: "Structured feedback and refinement loops." },
      { n: "05", label: "Design system essentials", desc: "Typography, colors, components, spacing rules." },
      { n: "06", label: "Handoff package", desc: "Ready-to-use Figma + export assets." },
    ];
  }, [planKey]);

  return (
    <section
      id="pricing"
      data-header-theme="light"
      className="relative w-full min-h-[100svh] bg-[#ECECEC] text-black"
    >
      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 pb-16 sm:pb-24 pt-14 sm:pt-10">
        <div className="grid grid-cols-12 gap-10">
          <Reveal className="col-span-12 lg:col-span-4">
            <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/55">
              08 - PRICE
            </div>

            <h3 className="mt-4 font-display text-[42px] sm:text-[54px] lg:text-[72px] font-[900] leading-[0.95] tracking-[-0.06em]">
              <span className="text-black">OUR</span>
              <br />
              <span className="text-black/45">PLANS.</span>
            </h3>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-8 lg:pt-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="max-w-[70ch] text-[12px] leading-[1.6] text-black/60">
                  Choose the plan that fits your pace. We stay close, listen carefully,
                  and create the design work your brand truly needs.
                </p>

                <div className="mt-5">
                  <TogglePill value={planKey} onChange={setPlanKey} />
                </div>
              </div>

              <div />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-y-10 gap-x-8">
          <Reveal className="col-span-12 lg:col-span-4">
            <PlanCard plan={plan} />
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-8 overflow-visible">
            {planKey === "monthly" ? (
              <div className="grid grid-cols-6 gap-6 items-start overflow-visible pb-14">
                <div className="col-span-6 md:col-span-3 md:translate-y-0">
                  <TileCard tile={tiles[0]} />
                </div>
                <div className="col-span-6 md:col-span-3 md:translate-y-0">
                  <TileCard tile={tiles[1]} />
                </div>

                <div className="col-span-6 md:col-span-2 md:translate-y-2">
                  <TileCard tile={tiles[2]} />
                </div>
                <div className="col-span-6 md:col-span-4 md:translate-y-2">
                  <TileCard tile={tiles[3]} />
                </div>

                <div className="col-span-6 md:col-span-2 md:translate-y-[3px]">
                  <TileCard tile={tiles[4]} />
                </div>
                <div className="col-span-6 md:col-span-2 md:translate-y-[3px]">
                  <TileCard tile={tiles[5]} />
                </div>
                <div className="col-span-6 md:col-span-2 md:translate-y-[3px]">
                  <TileCard tile={tiles[6]} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-6">
                {tiles.map((t) => (
                  <div key={t.n} className="col-span-6 md:col-span-3">
                    <TileCard tile={t} />
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}