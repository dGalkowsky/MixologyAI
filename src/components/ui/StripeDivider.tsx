import clsx from "clsx";

type Variant = "orangeToPaper" | "paperToInk" | "inkToPaper" | "paperToOrange";

export default function StripeDivider({ variant }: { variant: Variant }) {
  const top =
    variant === "orangeToPaper" ? "bg-riwa" :
    variant === "paperToInk" ? "bg-paper" :
    variant === "inkToPaper" ? "bg-ink" : "bg-paper";

  const bottom =
    variant === "orangeToPaper" ? "bg-paper" :
    variant === "paperToInk" ? "bg-ink" :
    variant === "inkToPaper" ? "bg-paper" : "bg-riwa";

  const lineA =
    variant === "orangeToPaper" || variant === "paperToOrange" ? "bg-riwaDeep" : "bg-white/80";

  const lineB =
    variant === "paperToInk" || variant === "inkToPaper" ? "bg-black/70" : "bg-white/80";

  return (
    <div className={clsx(top, "relative")}>
      <div className="h-3" />
      <div className="space-y-[3px] px-0">
        <div className={clsx("h-[2px]", lineA)} />
        <div className={clsx("h-[2px]", lineB)} />
        <div className={clsx("h-[2px]", lineA)} />
        <div className={clsx("h-[2px]", lineB)} />
        <div className={clsx("h-[2px]", lineA)} />
      </div>
      <div className={clsx(bottom, "h-3")} />
    </div>
  );
}