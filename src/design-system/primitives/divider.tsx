import * as React from "react";
import { cn } from "@/lib/cn";

export interface DividerProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal";
}

export function Divider({ orientation = "vertical", className, ...props }: DividerProps) {
  return (
    <div
      data-slot="divider"
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-dm-border-strong",
        orientation === "vertical" ? "h-5 w-px" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}
