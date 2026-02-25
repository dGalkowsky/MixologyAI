import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import NotchCard from "./ui/NotchCard";
import CountUp from "./ui/CountUp";
import PillJarScroll from "./PillJarScroll";

export default function WhyChooseLight() {
  return (
    <section id="about"
      data-header-theme="light"
      className="relative w-full min-h-[100svh] bg-white text-black"
    >
      <PillJarScroll targetId="about" />
      <div className="mx-auto min-h-[100svh] max-w-[1240px] px-5 sm:px-8 lg:px-10 pt-[clamp(84px,10vh,132px)] pb-[clamp(44px,7vh,96px)] flex flex-col">
        <div className="grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: -18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-display text-balance text-[86px] font-[900] leading-[0.9] tracking-[-0.06em]"
            >
              <span className="text-black">DESIGN</span>
              <br />
              <span className="text-black">THAT WORKS</span>
              <br />
              <span className="text-black/70">RESULTS</span>
              <br />
              <span className="text-black/70">THAT LAST.</span>
            </motion.h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pt-24">
            <motion.p
              initial={{ opacity: 0, y: -14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="max-w-[44ch] text-[16px] leading-[1.55] text-black/90"
            >
              We blend strategy, aesthetics, and technology to create brands and digital experiences
              - and stay memorable.
            </motion.p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-4">
            <NotchCard className="p-7" notch="tr" variant="ink">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/70">
                CLIENT SATISFACTION
              </div>

              <div className="mt-10 font-display text-[44px] font-[900] tracking-[-0.03em] text-black">
                <CountUp to={100} suffix="%" />
              </div>

              <div className="mt-4 font-mono text-[10px] text-black/70">
                Trusted by growing digital teams
              </div>
            </NotchCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-3 md:mt-20">
            <NotchCard className="p-7" notch="tr" variant="ink">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/70">
                EXPERIENCE
              </div>

              <div className="mt-10 font-display text-[44px] font-[900] tracking-[-0.03em] text-black">
                <CountUp to={8} suffix="+" />
              </div>

              <div className="mt-1 text-[12px] text-black/75">Years</div>
              <div className="mt-4 font-mono text-[10px] text-black/70">
                Designing scalable digital products
              </div>
            </NotchCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-3">
            <NotchCard className="p-7" notch="tr" variant="ink">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/70">
                DELIVERED PROJECTS
              </div>

              <div className="mt-10 font-display text-[44px] font-[900] tracking-[-0.03em] text-black">
                <CountUp to={60} suffix="+" />
              </div>

              <div className="mt-4 font-mono text-[10px] text-black/70">
                Across SaaS, AI & digital platforms
              </div>
            </NotchCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-2 md:mt-20">
            <NotchCard className="p-7" notch="tr" variant="ink">
              <div className="text-[11px] font-[850] tracking-[0.12em] uppercase text-black/70">
                GROWTH IMPACT
              </div>

              <div className="mt-10 font-display text-[40px] font-[900] tracking-[-0.03em] text-black">
                <CountUp to={40} prefix="+" suffix="%" />
              </div>

              <div className="mt-4 font-mono text-[10px] text-black/70">
                Average ROI after new design
              </div>
            </NotchCard>
          </Reveal>
        </div>
      </div>
    </section>
    
  );
}