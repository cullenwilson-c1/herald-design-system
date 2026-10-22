import type * as React from "react";
import { MousePointer2 } from "lucide-react";
import { Toggle as TogglePrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { Kbd } from "@/design-system/primitives";

export interface ModeToggleProps
  extends Omit<React.ComponentProps<typeof TogglePrimitive.Root>, "children"> {
  /** Shortcut hint shown in the Kbd chip. Keyboard handling is the host's job. */
  shortcut?: string;
  label?: string;
}

/** Select-mode toggle. Pencil `qpl6p` (on) / `lhxDA` (off). Renders `aria-pressed`. */
export function ModeToggle({
  pressed,
  onPressedChange,
  shortcut = "S",
  label = "Select",
  className,
  ...props
}: ModeToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="mode-toggle"
      pressed={pressed}
      onPressedChange={onPressedChange}
      className={cn(
        "inline-flex h-[34px] shrink-0 items-center gap-[7px] rounded-dm-md border py-0 pr-[10px] pl-[9px] font-dm-sans text-dm-md font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "border-dm-border bg-transparent text-dm-text-2 hover:bg-dm-surface-hover",
        "data-[state=off]:[&_kbd]:bg-dm-surface-hover data-[state=off]:[&_kbd]:text-dm-text-3",
        "data-[state=on]:border-dm-accent-border data-[state=on]:bg-dm-accent-soft data-[state=on]:text-dm-accent-text data-[state=on]:hover:bg-dm-accent-soft",
        className,
      )}
      {...props}
    >
      <MousePointer2 aria-hidden className="size-[15px] shrink-0" />
      <span>{label}</span>
      {shortcut ? <Kbd aria-hidden>{shortcut}</Kbd> : null}
    </TogglePrimitive.Root>
  );
}
