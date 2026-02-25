import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  // id sekcji, na której liczymy progress (Twoje WhyChooseLight ma id="about")
  targetId?: string;
  // ukryj na małych ekranach jeśli chcesz (domyślnie false)
  hideBelowLg?: boolean;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function PillJarScroll({ targetId = "about", hideBelowLg = false }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  // podepnij prawdziwą sekcję po id
  useEffect(() => {
    const el = document.getElementById(targetId) as HTMLElement | null;
    sectionRef.current = el;
    setReady(!!el);
  }, [targetId]);

  // progress w obrębie tej sekcji
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // globalny scroll do "lotu" tabletki do końca strony
  const { scrollY } = useScroll();
  const [range, setRange] = useState({ start: 0, end: 1 });
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;

      // start: moment "wypadania" tabletki (około 55% sekcji)
      const start = Math.round(top + rect.height * 0.55);
      // end: prawie koniec strony
      const end = Math.max(start + 1, Math.round(docH - winH - 60));

      setRange({ start, end });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [targetId]);

  // -----------------------
  // SŁOIK - animacja na scrollYProgress sekcji
  // -----------------------
  const jarY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const jarRotZ = useTransform(scrollYProgress, [0.18, 0.75], [0, -55]);
  const jarRotX = useTransform(scrollYProgress, [0.18, 0.75], [5, -12]);
  const jarRotY = useTransform(scrollYProgress, [0.18, 0.75], [12, -20]);

  const lidRotZ = useTransform(scrollYProgress, [0.42, 0.62], [0, -125]);
  const lidLift = useTransform(scrollYProgress, [0.42, 0.62], [0, -12]);

  // tabletka "lokalna" - wypada ze słoika
  const localPillOpacity = useTransform(scrollYProgress, [0.54, 0.58, 0.72], [0, 1, 0]);
  const localPillY = useTransform(scrollYProgress, [0.58, 0.75], [0, 140]);
  const localPillX = useTransform(scrollYProgress, [0.58, 0.75], [0, 50]);
  const localPillRot = useTransform(scrollYProgress, [0.58, 0.75], [0, 320]);

  // -----------------------
  // TABLETKA "GLOBALNA" - leci do końca strony
  // -----------------------
  const inputRange = useMemo(() => [range.start, range.end], [range.start, range.end]);

  const pillGlobalY = useTransform(scrollY, inputRange, [0, vh * 0.82]);
  const pillGlobalX = useTransform(scrollY, inputRange, [0, -110]);
  const pillGlobalRot = useTransform(scrollY, inputRange, [90, 1400]);
  const pillGlobalOpacity = useTransform(
    scrollY,
    [range.start - 40, range.start + 60, range.end - 140, range.end],
    [0, 1, 1, 0]
  );

  // optional: ukryj na małych
  const responsive = hideBelowLg ? "hidden lg:block" : "";

  if (!ready) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 z-[30] ${responsive}`} aria-hidden>
      {/* SŁOIK */}
      <motion.div
        style={{ y: jarY, rotateZ: jarRotZ, rotateX: jarRotX, rotateY: jarRotY }}
        className="absolute right-[clamp(12px,4vw,56px)] top-[clamp(120px,16vh,210px)]"
      >
        <div className="perspective-[900px]">
          <div className="relative h-[320px] w-[220px]" style={{ transformStyle: "preserve-3d" }}>
            {/* BODY */}
            <div className="absolute inset-0 rounded-[42px] border border-white/25 bg-white/10 shadow-[0_30px_120px_rgba(0,0,0,.18)] backdrop-blur-md" />
            <div className="absolute inset-[14px] rounded-[34px] border border-white/18 bg-gradient-to-b from-white/20 via-white/10 to-white/5" />

            {/* GLASS HIGHLIGHT */}
            <div className="absolute left-[18px] top-[38px] h-[210px] w-[30px] rounded-full bg-white/18" />
            <div className="absolute right-[22px] top-[70px] h-[170px] w-[10px] rounded-full bg-white/10" />

            {/* LABEL */}
            <div className="absolute bottom-[40px] left-1/2 w-[150px] -translate-x-1/2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-center font-mono text-[10px] tracking-[0.22em] text-white/85">
              MEDS
            </div>

            {/* LID */}
            <motion.div
              style={{ rotateZ: lidRotZ, y: lidLift }}
              className="absolute -top-[18px] left-1/2 h-[54px] w-[170px] -translate-x-1/2 rounded-[28px] border border-white/25 bg-white/12 shadow-[0_18px_60px_rgba(0,0,0,.20)]"
              transformOrigin="20% 80%"
            >
              <div className="absolute inset-[10px] rounded-[18px] bg-white/10" />
            </motion.div>

            {/* LOCAL PILL */}
            <motion.div
              style={{ opacity: localPillOpacity, x: localPillX, y: localPillY, rotateZ: localPillRot }}
              className="absolute left-1/2 top-[58px] h-[26px] w-[58px] -translate-x-1/2 rounded-full bg-gradient-to-r from-white via-white/90 to-white/70 shadow-[0_16px_50px_rgba(0,0,0,.25)]"
            >
              <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-black/10" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* GLOBAL PILL */}
      <motion.div
        style={{ opacity: pillGlobalOpacity, x: pillGlobalX, y: pillGlobalY, rotateZ: pillGlobalRot }}
        className="fixed right-[clamp(16px,4vw,64px)] top-[110px] z-[60]"
      >
        <div className="relative h-[26px] w-[58px] rounded-full bg-gradient-to-r from-white via-white/90 to-white/70 shadow-[0_18px_60px_rgba(0,0,0,.25)]">
          <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-black/10" />
        </div>
      </motion.div>
    </div>
  );
}