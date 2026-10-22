import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center rounded-[5px] px-[6px] py-px font-dm-sans text-dm-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-dm-chrome text-dm-text-2",
        accent: "bg-dm-accent-soft text-dm-accent-text",
        success: "bg-dm-success-soft text-dm-success",
        danger: "bg-dm-danger-soft text-dm-danger",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  tone?: "neutral" | "accent" | "success" | "danger";
}

export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ tone }), className)} {...props} />;
}
