import * as React from "react";
import { cn } from "@/lib/cn";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex items-center rounded-dm-xs bg-dm-accent-muted px-[5px] py-px font-dm-sans text-[10.5px] font-semibold text-dm-accent-text",
        className,
      )}
      {...props}
    />
  );
}
