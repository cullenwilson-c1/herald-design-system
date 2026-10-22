import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { useDesignMode } from "./design-mode-context";
import { floatingMotion } from "./focus";

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  /** Portal target; defaults to the DesignModeContext container, then document.body. */
  container?: HTMLElement | null;
  className?: string;
  /** Trigger element (rendered with asChild). */
  children: React.ReactElement;
}

export function Tooltip({
  content,
  side = "bottom",
  align,
  sideOffset = 6,
  container,
  className,
  children,
}: TooltipProps) {
  const { dark, portalContainer } = useDesignMode();
  return (
    // Own provider so a Tooltip works even when no TooltipProvider is mounted above it.
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal container={container ?? portalContainer}>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "design-mode",
              dark && "dark",
              "z-50 rounded-dm-sm bg-dm-text px-dm-3 py-dm-2 font-dm-sans text-dm-xs font-medium text-dm-surface",
              floatingMotion,
              className,
            )}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
