import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import PillButton from "./ui/PillButton";

const posts = [
  { date: "18 NOVEMBER 2025", title: "The Rules of Modern Branding", img: "https://picsum.photos/seed/mery/120/120" },
  { date: "12 NOVEMBER 2025", title: "Branding Is a System, Not just a Logo", img: "https://picsum.photos/seed/jason/120/120" },
  { date: "24 OCT 2025", title: "Clarity Is the New Advantage", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
  { date: "11 OCTOBER 2025", title: "From Aesthetic to Experience", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80" },
];

export default function BlogLight() {
  return (
    <section id="blog" data-header-theme="dark" className="relative bg-paper text-black">
      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(84px,10vh,132px)] pb-[clamp(44px,7vh,96px)] flex flex-col">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="text-[11px] font-[750] tracking-[0.12em] uppercase text-white/55">11 - INSIGHTS</div>
            <h3 className="mt-4 font-display text-[62px] font-[850] leading-[0.95] tracking-[-0.06em]">
              <span className="text-white">LATEST FROM</span>
              <br />
              <span className="text-white/45">OUR STUDIO.</span>
            </h3>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-8 lg:pt-8">
            <p className="max-w-[72ch] text-[13px] leading-[1.6] text-white">
              Ideas, strategies, and innovative creative explorations shaping the future of design,
              emerging technology, and digital experiences.
            </p>
            <div className="mt-6">
              <PillButton variant="light" rightPlus>
                ALL ARTICLES
              </PillButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={0.04 * i} className="col-span-12 md:col-span-3">
              <NotchCard className="p-0" notch="tr">
                <div className="border-b border-black/10 px-6 py-3">
                  <div className="font-mono text-[10px] text-black/55">{p.date}</div>
                </div>
                <div className="p-4">
                  <div className="overflow-hidden rounded-xl2">
                    <img className="h-[190px] w-full object-cover" src={p.img} alt="" />
                  </div>
                  <div className="mt-3 font-mono text-[12px] leading-[1.45] text-black/85">{p.title}</div>
                </div>
              </NotchCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}