import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SpinnerProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Pixel size. */
  size?: number;
  /** Screen-reader label; when omitted the spinner is decorative. */
  label?: string;
}

export function Spinner({ size = 14, label, className, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      className={cn("inline-flex shrink-0 items-center justify-center text-dm-accent", className)}
      {...props}
    >
      <LoaderCircle
        width={size}
        height={size}
        aria-hidden="true"
        className="motion-safe:animate-spin"
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
