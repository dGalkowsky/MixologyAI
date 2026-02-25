import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

export default function Marquee({
  text,
  className,
  speed = 18, // seconds
}: {
  text: ReactNode;
  className?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();

  // Dwa identyczne tracki dają płynne loopowanie
  return (
    <div className={clsx("pointer-events-none overflow-hidden", className)} aria-hidden>
      <motion.div
        className="flex w-max"
        initial={{ x: 0 }}
        animate={reduce ? { x: 0 } : { x: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : { duration: speed, ease: "linear", repeat: Infinity }
        }
      >
        <div className="flex">
          <span className="whitespace-nowrap pr-16">{text}</span>
          <span className="whitespace-nowrap pr-16">{text}</span>
        </div>
        <div className="flex">
          <span className="whitespace-nowrap pr-16">{text}</span>
          <span className="whitespace-nowrap pr-16">{text}</span>
        </div>
      </motion.div>
    </div>
  );
}