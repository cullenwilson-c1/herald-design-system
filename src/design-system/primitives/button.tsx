import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";
import { focusRing } from "./focus";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-dm-3 whitespace-nowrap rounded-dm-md",
    "font-dm-sans text-dm-md transition-colors [&_svg]:size-[15px] [&_svg]:shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-dm-accent font-semibold text-dm-on-accent hover:bg-dm-accent-hover active:bg-dm-accent-hover",
        secondary:
          "border border-dm-border bg-dm-surface font-medium text-dm-text hover:bg-dm-surface-hover active:bg-dm-border [&_svg]:text-dm-text-2",
        ghost:
          "font-medium text-dm-text hover:bg-dm-surface-hover active:bg-dm-border [&_svg]:text-dm-text-2",
        danger:
          "border border-transparent bg-dm-danger-soft font-medium text-dm-danger hover:border-dm-danger active:border-dm-danger",
      },
      size: {
        sm: "h-[26px] px-dm-3 text-dm-sm",
        md: "h-8 px-dm-4",
        lg: "h-[34px] px-[14px]",
      },
      hasLeadingIcon: { true: "", false: "" },
    },
    compoundVariants: [
      { size: "sm", hasLeadingIcon: true, className: "pl-dm-2" },
      { size: "md", hasLeadingIcon: true, className: "pl-[10px]" },
      { size: "lg", hasLeadingIcon: true, className: "pl-dm-4" },
    ],
    defaultVariants: { variant: "secondary", size: "md", hasLeadingIcon: false },
  },
);

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  /** Render the single child as the button (links etc.). Icons are ignored in this mode. */
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  variant,
  size,
  asChild = false,
  leadingIcon,
  trailingIcon,
  type,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size, hasLeadingIcon: leadingIcon != null }),
    className,
  );
  if (asChild) {
    return (
      <Slot.Root data-slot="button" className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <button data-slot="button" type={type ?? "button"} className={classes} {...props}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
