import { Children } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";

function visibleAt(i: number) {
  if (i === 0) return "";
  if (i === 1) return "hidden sm:block";
  if (i === 2) return "hidden md:block";
  if (i === 3) return "hidden lg:block";
  if (i === 4) return "hidden xl:block";
  return "hidden 2xl:block"; // i === 5
}

export default function ProgressiveTiles({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const items = Children.toArray(children).slice(0, 6);

  return (
    <div
      className={clsx(
        "grid gap-6",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
        className
      )}
    >
      {items.map((node, i) => (
        <div key={i} className={visibleAt(i)}>
          {node}
        </div>
      ))}
    </div>
  );
}