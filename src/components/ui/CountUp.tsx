import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

function formatNumber(v: number) {
  return Math.round(v).toString();
}

export default function CountUp({
  to,
  duration = 1.2,
  delay = 0.1,
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const mv = useMotionValue(0);
  const [txt, setTxt] = useState("0");

  const target = useMemo(() => to, [to]);

  useEffect(() => {
    if (!inView) return;

    mv.set(0);
    const controls = animate(mv, target, {
      duration,
      delay,
      ease: [0.2, 0.8, 0.2, 1],
    });

    return () => controls.stop();
  }, [inView, mv, target, duration, delay]);

  useMotionValueEvent(mv, "change", (latest) => {
    setTxt(formatNumber(latest));
  });

  return (
    <span ref={ref}>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}