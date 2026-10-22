import * as React from "react";
import { cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { useDesignMode } from "./design-mode-context";
import { floatingItem, floatingMotion, floatingSurface, focusRing } from "./focus";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-between whitespace-nowrap font-dm-sans text-dm-md font-medium text-dm-text",
    "transition-colors hover:bg-dm-surface-hover data-[placeholder]:text-dm-text-3",
    "disabled:cursor-not-allowed disabled:opacity-50",
    focusRing,
  ],
  {
    variants: {
      size: {
        sm: "h-[26px] gap-dm-3 rounded-dm-sm px-dm-3",
        md: "h-8 gap-dm-3 rounded-dm-md px-dm-4",
        none: "",
      },
      variant: {
        outline: "border border-dm-border bg-dm-surface",
        ghost: "bg-transparent",
        pill: "h-[34px] gap-dm-2 rounded-[10px] border border-dm-border bg-dm-surface px-dm-2 hover:bg-dm-surface",
      },
    },
    defaultVariants: { size: "md", variant: "outline" },
  },
);

export interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: "sm" | "md";
  variant?: "outline" | "ghost" | "pill";
}

export function SelectTrigger({ size, variant, className, children, ...props }: SelectTriggerProps) {
  const chevron = (
    <SelectPrimitive.Icon asChild>
      <ChevronDown aria-hidden="true" className="size-[14px] shrink-0 text-dm-text-2" />
    </SelectPrimitive.Icon>
  );
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ size: variant === "pill" ? "none" : size, variant }), variant === "pill" && "group/pill", className)}
      {...props}
    >
      {variant === "pill" ? (
        <span className="inline-flex h-[26px] items-center gap-[7px] rounded-dm-sm px-[6px] transition-colors group-hover/pill:bg-dm-surface-hover group-data-[state=open]/pill:bg-dm-surface-hover">
          {children}
          {chevron}
        </span>
      ) : (
        <>
          {children}
          {chevron}
        </>
      )}
    </SelectPrimitive.Trigger>
  );
}

export interface SelectContentProps extends React.ComponentProps<typeof SelectPrimitive.Content> {
  /** Portal target; defaults to the DesignModeContext container, then document.body. */
  container?: HTMLElement | null;
}

export function SelectContent({
  container,
  className,
  children,
  position = "popper",
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  const { dark, portalContainer } = useDesignMode();
  return (
    <SelectPrimitive.Portal container={container ?? portalContainer}>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "design-mode",
          dark && "dark",
          floatingSurface,
          floatingMotion,
          "max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(floatingItem, "pr-8", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-dm-3 inline-flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check aria-hidden="true" className="size-[14px] text-dm-accent" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}
