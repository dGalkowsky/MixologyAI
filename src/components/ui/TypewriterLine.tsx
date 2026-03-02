import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";

export default function TypewriterLine({
  text,
  start,
  onDone,
  className,
  stagger = 0.035,
  delay = 0.05,
}: {
  text: string;
  start: boolean;
  onDone?: () => void;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      onDone?.();
      return;
    }

    const ms = Math.round((delay + stagger * Math.max(0, chars.length - 1) + 0.12) * 1000);
    const t = window.setTimeout(() => onDone?.(), ms);
    return () => window.clearTimeout(t);
  }, [start, reduce, onDone, chars.length, stagger, delay]);

  if (reduce) {
    return <div className={className}>{text}</div>;
  }

  return (
    <motion.div
      className={clsx("inline-block", className)}
      initial="hidden"
      animate={start ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 6, filter: "blur(2px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] },
            },
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.div>
  );
}