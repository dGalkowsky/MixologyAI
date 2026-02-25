import Reveal from "./ui/Reveal";
import PillButton from "./ui/PillButton";

export default function ContactOrange() {
  return (
    <section id="contact" className="relative bg-riwa text-white">

      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(84px,10vh,132px)] pb-[clamp(44px,7vh,96px)] flex flex-col">
        <div className="grid grid-cols-12 gap-10">
          <Reveal className="col-span-12 lg:col-span-6">
            <div className="text-[11px] font-[800] tracking-[0.12em] uppercase text-white/85">
              12 - GET IN TOUCH
            </div>

            <h3 className="mt-6 font-display text-[86px] font-[900] leading-[0.9] tracking-[-0.06em]">
              READY TO
              <br />
              START YOUR
              <br />
              NEXT PROJECT?
            </h3>

            <p className="mt-10 max-w-[42ch] font-mono text-[11px] leading-[1.55] text-white/85">
              Let's build a brand, product, or digital experience that makes a lasting impact.
              Tell us what you need - we'll handle the rest.
            </p>

            <div className="mt-16 flex items-center gap-10 font-mono text-[10px] text-white/85">
              <div>
                <div className="opacity-80">10:38 AM</div>
                <div className="font-[800] tracking-[0.12em]">MADRID SPAIN</div>
              </div>
              <div>
                <div className="opacity-80">11:38 AM</div>
                <div className="font-[800] tracking-[0.12em]">LUBLIN POLAND</div>
              </div>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-6 lg:pt-10">
            <form className="space-y-8">
              {[
                { label: "NAME", ph: "Jane Smith" },
                { label: "EMAIL", ph: "jane@framer.com" },
                { label: "MESSAGE", ph: "Leave a message" },
              ].map((f) => (
                <div key={f.label} className="border-b border-white/25 pb-6">
                  <div className="text-[10px] font-[800] tracking-[0.12em] uppercase text-white/80">
                    {f.label}
                  </div>
                  <input
                    className="mt-3 w-full bg-transparent font-mono text-[12px] text-white/90 placeholder:text-white/55 outline-none"
                    placeholder={f.ph}
                  />
                </div>
              ))}

              <div className="pt-2">
                <PillButton
                  variant="light"
                  rightPlus
                  rightAvatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60"
                >
                  LET'S TALK
                </PillButton>

                <div className="mt-4 font-mono text-[10px] text-white/70">
                  BY SUBMITTING, YOU AGREE TO OUR TERMS AND PRIVACY POLICY
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}