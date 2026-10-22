import * as React from "react";
import { MousePointer2, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { IconButton } from "./icon-button";

export interface ChipProps extends Omit<React.ComponentProps<"span">, "children"> {
  variant: "element" | "context";
  children: React.ReactNode;
  /** Leading icon. Defaults to a pointer; pass `null` to hide. */
  icon?: React.ReactNode;
  /** When provided, renders a remove button. */
  onRemove?: () => void;
  /** Used in the remove button's label when children isn't a plain string. */
  removeLabel?: string;
}

export function Chip({
  variant,
  icon,
  onRemove,
  removeLabel,
  className,
  children,
  ...props
}: ChipProps) {
  const leading =
    icon === undefined ? <MousePointer2 aria-hidden="true" /> : icon;
  const name = typeof children === "string" || typeof children === "number" ? String(children) : removeLabel ?? "item";
  return (
    <span
      data-slot="chip"
      data-variant={variant}
      className={cn(
        "inline-flex max-w-full items-center gap-[6px] font-dm-sans text-[12px] font-medium",
        variant === "element"
          ? "rounded-[6px] bg-dm-accent-soft py-[3px] pl-[6px] pr-dm-3 text-dm-accent-text"
          : "rounded-dm-sm border border-dm-border bg-dm-chrome py-dm-2 pl-dm-3 pr-[6px] text-dm-text",
        className,
      )}
      {...props}
    >
      {leading != null ? (
        <span
          className={cn(
            "inline-flex shrink-0 items-center [&_svg]:size-3",
            variant === "element" ? "text-dm-accent-text" : "text-dm-accent",
          )}
        >
          {leading}
        </span>
      ) : null}
      <span className="truncate">{children}</span>
      {onRemove ? (
        <IconButton
          label={`Remove ${name}`}
          size="sm"
          className="size-4 rounded-dm-xs [&_svg]:size-3"
          onClick={onRemove}
        >
          <X aria-hidden="true" />
        </IconButton>
      ) : null}
    </span>
  );
}
