import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import PillButton from "./ui/PillButton";

const steps = [
  { id: "001", title: "Discovery", desc: "Understanding your goals, audience, brand essence, and unique identity." },
  { id: "002", title: "Strategy", desc: "Defining direction and creative foundations that inspire results." },
  { id: "003", title: "Design", desc: "Creating visuals that connect form, story, emotion and experience." },
  { id: "004", title: "Refinement", desc: "Polishing every element for consistency, coherence, and lasting impact." },
  { id: "005", title: "Delivery", desc: "Launching your brand with confidence, precision, and strategic focus." },
];

export default function ProcessLight() {
  return (
    <section
      id="process"
      data-header-theme="dark"
      className="relative w-full min-h-[100svh] bg-paper text-white"
    >
      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 pb-16 sm:pb-24 pt-14 sm:pt-20">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-4">
            <div className="text-[11px] font-[750] tracking-[0.12em] uppercase text-white/65">
              05 - WORKFLOW
            </div>

            <h3 className="mt-4 font-display text-[42px] sm:text-[54px] lg:text-[66px] font-[850] leading-[0.95] tracking-[-0.06em]">
              <span className="text-white">OUR PROCESS</span>
              <br />
              <span className="text-white/45">FROM IDEA</span>
              <br />
              <span className="text-white/45">TO IMPACT.</span>
            </h3>

            <div className="mt-8">
              <PillButton
                variant="light"
                rightPlus
                rightAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60"
              >
                WORK WITH US
              </PillButton>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.id} delay={0.04 * i}>
                  <NotchCard className="p-6" notch="tr">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="font-mono text-[10px] text-black/75">{s.id}</div>
                        <div className="mt-2 font-display text-[18px] font-[800] tracking-tight">
                          {s.title}
                        </div>
                        <div className="mt-1 text-[12px] leading-[1.55] text-black/65">
                          {s.desc}
                        </div>
                      </div>
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 md:flex">
                        +
                      </div>
                    </div>
                  </NotchCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}