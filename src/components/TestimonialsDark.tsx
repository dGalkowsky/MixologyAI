import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";

const quotes = [
  {
    id: "#1",
    text:
      "QWERTY transformed our chaotic vision into a clear, polished identity. Everything felt intentional - and the final result exceeded expectations.",
    name: "MERY M.",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60",
  },
  {
    id: "#2",
    text:
      "They think strategically, design boldly, and move fast. QWERTY didn't just refresh our product - they elevated our entire brand presence and appearance.",
    name: "JASON CHEN",
    role: "Art Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=60",
  },
  {
    id: "#3",
    text:
      "QWERTY brought structure, clarity to our ideas, turning them into a refined, cohesive brand. The process was seamless - and the outcome felt thoughtfully crafted.",
    name: "RON SIMPSON",
    role: "Founder of Asterio",
    avatar: "https://images.unsplash.com/photo-1520975958225-0f1f2c77f93a?auto=format&fit=crop&w=120&q=60",
  },
];

export default function TestimonialsDark() {
  return (
    <section
      id="testimonials"
      data-header-theme="dark"
      className="relative w-full min-h-[100svh] bg-ink text-white"
    >
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 pb-16 sm:pb-24 pt-16 sm:pt-24">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="text-[11px] font-[750] tracking-[0.12em] uppercase text-white/55">
              07 - CLIENT STORIES
            </div>

            <h3 className="mt-4 font-display text-[42px] sm:text-[54px] lg:text-[64px] font-[850] leading-[0.95] tracking-[-0.06em]">
              <span className="text-white">REAL WORK.</span>
              <br />
              <span className="text-white/45">REAL WORDS.</span>
            </h3>
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-6">
              <Reveal className="col-span-12 md:col-span-6 md:mt-10">
                <NotchCard variant="paper" notch="tr" className="p-6">
                  <div className="font-mono text-[10px] text-black/55">{quotes[0].id}</div>
                  <p className="mt-4 font-mono text-[12px] leading-[1.6] text-black/80">{quotes[0].text}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img className="h-9 w-9 rounded-full object-cover" src={quotes[0].avatar} alt="" />
                    <div className="leading-tight">
                      <div className="text-[11px] font-[800] tracking-[0.06em]">{quotes[0].name}</div>
                      <div className="text-[11px] text-black/55">{quotes[0].role}</div>
                    </div>
                  </div>
                </NotchCard>
              </Reveal>

              <Reveal className="col-span-12 md:col-span-6">
                <NotchCard variant="paper" notch="tr" className="p-6">
                  <div className="font-mono text-[10px] text-black/55">{quotes[1].id}</div>
                  <p className="mt-4 font-mono text-[12px] leading-[1.6] text-black/80">{quotes[1].text}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img className="h-9 w-9 rounded-full object-cover" src={quotes[1].avatar} alt="" />
                    <div className="leading-tight">
                      <div className="text-[11px] font-[800] tracking-[0.06em]">{quotes[1].name}</div>
                      <div className="text-[11px] text-black/55">{quotes[1].role}</div>
                    </div>
                  </div>
                </NotchCard>
              </Reveal>

              <Reveal className="col-span-12 md:col-span-6 md:col-start-7 md:-mt-2">
                <NotchCard variant="paper" notch="tr" className="p-6">
                  <div className="font-mono text-[10px] text-black/55">{quotes[2].id}</div>
                  <p className="mt-4 font-mono text-[12px] leading-[1.6] text-black/80">{quotes[2].text}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img className="h-9 w-9 rounded-full object-cover" src={quotes[2].avatar} alt="" />
                    <div className="leading-tight">
                      <div className="text-[11px] font-[800] tracking-[0.06em]">{quotes[2].name}</div>
                      <div className="text-[11px] text-black/55">{quotes[2].role}</div>
                    </div>
                  </div>
                </NotchCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}