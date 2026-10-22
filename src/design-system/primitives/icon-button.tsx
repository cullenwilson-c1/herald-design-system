import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { focusRing } from "./focus";
import { Tooltip } from "./tooltip";

export const iconButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    focusRing,
  ],
  {
    variants: {
      variant: {
        ghost: "text-dm-text-2 hover:bg-dm-surface-hover active:bg-dm-border",
        secondary:
          "border border-dm-border bg-dm-surface text-dm-text-2 hover:bg-dm-surface-hover active:bg-dm-border",
        solid: "rounded-dm-full bg-dm-text text-dm-surface hover:opacity-85 active:opacity-70",
      },
      size: {
        sm: "size-[26px] [&_svg]:size-[14px]",
        md: "size-8 [&_svg]:size-4",
      },
    },
    compoundVariants: [
      { variant: ["ghost", "secondary"], size: "sm", className: "rounded-dm-sm" },
      { variant: ["ghost", "secondary"], size: "md", className: "rounded-dm-md" },
    ],
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends Omit<React.ComponentProps<"button">, "aria-label">,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible name; also the tooltip text. */
  label: string;
  size?: "sm" | "md";
  variant?: "ghost" | "secondary" | "solid";
  /** Show `label` as a tooltip. Default true. */
  tooltip?: boolean;
}

export function IconButton({
  label,
  variant,
  size,
  tooltip = true,
  type = "button",
  className,
  children,
  ...props
}: IconButtonProps) {
  const button = (
    <button
      data-slot="icon-button"
      type={type}
      aria-label={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
  return tooltip ? <Tooltip content={label}>{button}</Tooltip> : button;
}
