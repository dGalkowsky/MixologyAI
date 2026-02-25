import { motion } from "framer-motion";
import clsx from "clsx";
import { useRef } from "react";
import type { PropsWithChildren } from "react";

export default function NotchCard({
  children,
  className,
  variant = "paper",
  notch = "tr",
}: PropsWithChildren<{
  className?: string;
  variant?: "paper" | "ink" | "ghost";
  notch?: "tr" | "tl" | "both";
}>) {
  const bg =
    variant === "paper"
      ? "bg-white/55 text-black"
      : variant === "ink"
      ? "bg-black/17 text-white"
      : "bg-transparent";

  const border =
    variant === "paper"
      ? "border border-black/10"
      : variant === "ink"
      ? "border border-black/10"
      : "border border-transparent";

  const notchClass = notch === "tr" ? "notch-tr" : notch === "tl" ? "notch-tl" : "notch-both";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className={clsx("relative overflow-hidden shadow-soft", bg, border, notchClass, className)}
    >
      {children}
    </motion.div>
  );
}