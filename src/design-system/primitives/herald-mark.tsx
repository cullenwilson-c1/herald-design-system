import * as React from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/cn";

export interface HeraldMarkProps extends Omit<React.ComponentProps<"span">, "children"> {
  size?: 20 | 28;
  /** Accessible name; when omitted the mark is decorative. */
  label?: string;
}

/** Static shield placeholder (Pencil Herald Mark/Large 28, Small 20). To be replaced by the orb. */
export function HeraldMark({ size = 28, label, className, ...props }: HeraldMarkProps) {
  return (
    <span
      data-slot="herald-mark"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-flex shrink-0 items-center justify-center bg-dm-text text-dm-chrome",
        size === 28 ? "size-7 rounded-[8px]" : "size-5 rounded-[6px]",
        className,
      )}
      {...props}
    >
      <Shield
        aria-hidden="true"
        className={size === 28 ? "size-[15px]" : "size-[11px]"}
      />
    </span>
  );
}
