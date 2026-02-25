import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import PillButton from "./ui/PillButton";

function ProjectCard({
  title,
  tag,
  img,
  className,
}: {
  title: string;
  tag: string;
  img: string;
  className?: string;
}) {
  return (
    <NotchCard className={className} notch="tr">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-3">
        <div className="text-[11px] font-[750] tracking-[0.12em] uppercase text-black/60">
          {title}
        </div>
        <div className="text-[11px] text-black/45">{tag}</div>
      </div>
      <div className="p-5">
        <div className="overflow-hidden rounded-xl2">
          <img className="h-[280px] w-full object-cover" src={img} alt="" />
        </div>
      </div>
    </NotchCard>
  );
}

export default function PortfolioLight() {
  return (
    <section id="projects" data-header-theme="dark" className="relative w-full min-h-[100svh] bg-paper text-black">
      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-8 pb-24 pt-14">     
          <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-4">
            <div className="text-[11px] font-[750] tracking-[0.12em] uppercase text-white/55">
              02 - PORTFOLIO
            </div>
            <h3 className="mt-4 font-display text-[76px] font-[850] leading-[0.95] tracking-[-0.06em]">
              <span className="text-white">OUR</span>
              <br />
              <span className="text-white/45">PROJECTS.</span>
            </h3>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-8 lg:pt-10">
            <p className="max-w-[68ch] text-[12px] leading-[1.55] text-white/90">
              Discover how our creative vision transforms ideas into powerful, conversion-driven brand
              experiences that truly stand out.
            </p>
            <div className="mt-6">
              <PillButton variant="light" rightPlus>
                ALL PROJECTS
              </PillButton>
            </div>
          </Reveal>
        </div>

        {/* asymetryczny układ kart */}
        <div className="mt-6 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-4">
            <ProjectCard
              title="FORGE"
              tag=""
              img="https://picsum.photos/seed/forge/1600/900"           />
          </Reveal>

          <Reveal className="col-span-12 md:col-span-8 md:mt-7">
            <ProjectCard
              title="ATLAS"
              tag=""
              img="https://picsum.photos/seed/atlas/1600/900"
              className="md:ml-2"
            />
          </Reveal>

          <Reveal className="col-span-12 md:col-span-8 md:mt-4">
            <ProjectCard
              title="QWERTY°"
              tag=""
              img="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80"
            />
          </Reveal>

          <Reveal className="col-span-12 md:col-span-4 md:mt-18">
            <ProjectCard
              title="FOUNDRY"
              tag=""
              img="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1200&q=80"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}