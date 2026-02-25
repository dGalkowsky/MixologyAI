import Reveal from "./ui/Reveal";

export default function FooterDark() {
  return (
    <footer className="relative bg-ink text-white">
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="mx-auto max-w-[1240px] px-8 pb-20 pt-20">
        <div className="grid grid-cols-12 gap-8">
          <Reveal className="col-span-12 lg:col-span-5">
            <div className="text-[11px] font-[800] tracking-[0.12em] uppercase text-white/55">CONTACT</div>
            <div className="mt-2 font-mono text-[12px] text-white/85">+48 123 456 789</div>
            <div className="mt-2 font-display text-[26px] font-[850] tracking-[-0.03em]">
              hello@test.com
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-6 md:col-span-4">
                <div className="text-[11px] font-[800] tracking-[0.12em] uppercase text-white/55">NAVIGATION</div>
                <div className="mt-4 space-y-2 font-mono text-[12px] text-white/80">
                  <a className="block hover:text-white" href="#top">HOME</a>
                  <a className="block hover:text-white" href="#about">ABOUT</a>
                  <a className="block hover:text-white" href="#projects">PROJECTS</a>
                  <a className="block hover:text-white" href="#blog">BLOG</a>
                </div>
              </div>

              <div className="col-span-6 md:col-span-4">
                <div className="text-[11px] font-[800] tracking-[0.12em] uppercase text-white/55">SOCIAL</div>
                <div className="mt-4 space-y-2 font-mono text-[12px] text-white/80">
                  <a className="block hover:text-white" href="#">INSTAGRAM ↗</a>
                  <a className="block hover:text-white" href="#">DRIBBBLE ↗</a>
                  <a className="block hover:text-white" href="#">TWITTER ↗</a>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 md:text-right">
                <a className="inline-flex items-center gap-2 font-mono text-[12px] text-white/80 hover:text-white" href="#top">
                  BACK TO TOP ↑
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 font-mono text-[11px] text-white/55">
          <div>© {new Date().getFullYear()} QWERTY studio | All Rights Reserved</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#">Terms of Service</a>
            <a className="hover:text-white" href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}