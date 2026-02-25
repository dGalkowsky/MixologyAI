import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  rightAvatar?: string;
  rightPlus?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PillButton({
  variant = "light",
  className,
  rightAvatar,
  rightPlus = true,
  children,
  type = "button",
  ...rest
}: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 320, damping: 22, mass: 0.45 });
  const y = useSpring(my, { stiffness: 320, damping: 22, mass: 0.45 });

  const base =
    "relative inline-flex items-center rounded-full pl-7 pr-12 py-3 text-[12px] font-[800] tracking-[0.10em] uppercase cursor-pointer select-none transition-[box-shadow,transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 shadow-pill";

  const styles =
    variant === "light"
      ? "bg-white text-black hover:bg-white/95 hover:shadow-[0_18px_60px_rgba(0,0,0,.22)]"
      : "bg-black text-white hover:bg-black/92 hover:shadow-[0_18px_60px_rgba(0,0,0,.30)]";

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.12);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.button
      type={type}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.985 }}
      className={clsx(base, styles, className)}
      {...rest}
    >
      <span className="relative z-10">{children}</span>

      {rightPlus && (
        <motion.span
          className={clsx(
            "relative z-10 ml-4 grid h-7 w-7 place-items-center rounded-full",
            variant === "light" ? "bg-black text-white" : "bg-white text-black"
          )}
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          +
        </motion.span>
      )}

      {rightAvatar && (
        <span className="absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 overflow-hidden rounded-full ring-2 ring-white/70">
          <img className="h-full w-full object-cover" src={rightAvatar} alt="" />
        </span>
      )}
    </motion.button>
  );
}