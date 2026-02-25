import type { ReactNode } from "react";
import clsx from "clsx";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}