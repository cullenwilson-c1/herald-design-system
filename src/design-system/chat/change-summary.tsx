import type { ComponentProps, ReactNode } from "react";
import { Check, Layers } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge, Button } from "@/design-system/primitives";

export type ChangeItemProps = Omit<ComponentProps<"li">, "children"> & {
  children: ReactNode;
};

export function ChangeItem({ children, className, ...props }: ChangeItemProps) {
  return (
    <li
      data-slot="change-item"
      className={cn("flex items-center gap-dm-3 text-dm-sm text-dm-text-2", className)}
      {...props}
    >
      <Check className="size-3.5 shrink-0 text-dm-success" aria-hidden />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export type ChangeSummaryProps = Omit<ComponentProps<"section">, "title"> & {
  title: string;
  /** Version label, e.g. "v4". */
  version: string;
  /** Visible Restore label, e.g. "Restore v3". Required for Restore to render. */
  restoreLabel?: string;
  onRestore?: () => void;
  /** `ChangeItem`s. */
  children?: ReactNode;
};

export function ChangeSummary({
  title,
  version,
  restoreLabel,
  onRestore,
  children,
  className,
  ...props
}: ChangeSummaryProps) {
  return (
    <section
      data-slot="change-summary"
      aria-label={`${title} ${version} changes`}
      className={cn("flex w-full flex-col rounded-dm-lg border border-dm-border bg-dm-surface", className)}
      {...props}
    >
      <header className="flex items-center justify-between gap-dm-3 border-b border-dm-border px-dm-4 py-[10px]">
        <div className="flex min-w-0 items-center gap-dm-3">
          <Layers className="size-3.5 shrink-0 text-dm-text-2" aria-hidden />
          <span className="truncate text-dm-sm font-semibold text-dm-text">{title}</span>
          <Badge>{version}</Badge>
        </div>
        {onRestore ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRestore}
            className="h-auto shrink-0 px-dm-2 py-dm-1 text-[12px] font-normal text-dm-text-3 hover:text-dm-text"
          >
            {restoreLabel ?? "Restore"}
          </Button>
        ) : null}
      </header>
      <ul className="m-0 flex list-none flex-col gap-dm-3 p-0 px-dm-4 pt-[10px] pb-dm-4">{children}</ul>
    </section>
  );
}
