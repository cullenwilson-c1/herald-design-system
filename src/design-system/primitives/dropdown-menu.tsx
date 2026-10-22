import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { useDesignMode } from "./design-mode-context";
import { floatingItem, floatingMotion, floatingSurface } from "./focus";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export interface DropdownMenuContentProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {
  /** Portal target; defaults to the DesignModeContext container, then document.body. */
  container?: HTMLElement | null;
}

export function DropdownMenuContent({
  container,
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  const { dark, portalContainer } = useDesignMode();
  return (
    <DropdownMenuPrimitive.Portal container={container ?? portalContainer}>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "design-mode",
          dark && "dark",
          floatingSurface,
          floatingMotion,
          "max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(floatingItem, "[&_svg]:size-[15px] [&_svg]:shrink-0 [&_svg]:text-dm-text-2", className)}
      {...props}
    />
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn("px-dm-3 py-dm-2 font-dm-sans text-dm-xs font-medium text-dm-text-2", className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-dm-2 my-dm-2 h-px bg-dm-border", className)}
      {...props}
    />
  );
}

export function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto font-dm-sans text-dm-xs text-dm-text-3", className)}
      {...props}
    />
  );
}
