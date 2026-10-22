import type * as React from "react";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/cn";

/** Pencil `gyBDl`: overlay label on a selected preview element. Position it via `className`/`style`. */
export function SelectionTag({ label, className, ...props }: { label: string } & React.ComponentProps<"span">) {
  return (
    <span
      data-slot="selection-tag"
      className={cn(
        "pointer-events-none inline-flex items-center gap-[5px] whitespace-nowrap rounded-[6px_6px_6px_0] bg-dm-accent py-[3px] pr-dm-3 pl-[6px] font-dm-sans text-[11.5px] font-semibold text-dm-on-accent",
        className,
      )}
      {...props}
    >
      <MousePointer2 aria-hidden className="size-[11px] shrink-0" />
      {label}
    </span>
  );
}

/**
 * 2px accent outline around an element, with the tag at its top-right corner (sitting just above it).
 * Absolutely positioned by the caller (`style={{ top, left, width, height }}`) inside a positioned parent.
 */
export function SelectionOutline({
  label,
  className,
  children,
  ...props
}: { label?: string } & React.ComponentProps<"div">) {
  return (
    <div
      data-slot="selection-outline"
      className={cn("pointer-events-none absolute outline-2 outline-dm-accent", className)}
      {...props}
    >
      {label ? <SelectionTag label={label} className="absolute right-0 bottom-full" /> : null}
      {children}
    </div>
  );
}
