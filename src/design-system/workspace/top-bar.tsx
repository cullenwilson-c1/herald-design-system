import type * as React from "react";
import { Hammer } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/design-system/primitives";

export interface TopBarProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Left zone (content-sized): `<ScenarioSelect/>`. */
  left?: React.ReactNode;
  /** Center zone (fills the free width): `<AddressBar/>`. */
  center?: React.ReactNode;
  /** Right zone (content-sized, right-aligned): `<ModeToggle/>` + `<BuildWithSquireButton/>`. */
  right?: React.ReactNode;
}

/** Pencil `qB8WS`: 56px, three zones, no border (shares the chrome surface with chat). */
export function TopBar({ left, center, right, className, ...props }: TopBarProps) {
  return (
    <div
      data-slot="top-bar"
      className={cn("grid h-14 shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-dm-4 pr-dm-5 pl-0", className)}
      {...props}
    >
      <div className="flex h-[34px] items-center gap-dm-3">{left}</div>
      <div className="flex h-[34px] min-w-0 items-center">{center}</div>
      <div className="flex h-[34px] items-center justify-end gap-dm-3">{right}</div>
    </div>
  );
}

/** Pencil `ydaoY`: the single solid-accent button on screen. */
export function BuildWithSquireButton({
  children = "Build with Squire",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "variant" | "size" | "leadingIcon">) {
  return (
    <Button
      variant="primary"
      size="lg"
      leadingIcon={<Hammer aria-hidden className="size-4" />}
      {...props}
    >
      {children}
    </Button>
  );
}
