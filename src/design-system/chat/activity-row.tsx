import type { ComponentProps } from "react";
import { AlertCircle, Check, ChevronRight } from "lucide-react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { Spinner } from "@/design-system/primitives";
import type { ActivityStatus, ChatItem } from "@/design-system/types";

type ActivityItem = Extract<ChatItem, { kind: "activity" }>;

export type ActivityRowProps = Omit<ComponentProps<"div">, "children"> & {
  label: string;
  status: ActivityStatus;
  detail?: string;
  diff?: ActivityItem["diff"];
  /** Start with the diff expanded (only applies when `diff` is set). */
  defaultOpen?: boolean;
};

const STATUS_TEXT: Record<ActivityStatus, string> = {
  running: "In progress: ",
  done: "Done: ",
  error: "Failed: ",
};

export function StatusGlyph({ status }: { status: ActivityStatus }) {
  if (status === "running") return <Spinner size={14} />;
  if (status === "done") return <Check className="size-3.5 text-dm-success" aria-hidden />;
  return <AlertCircle className="size-3.5 text-dm-danger" aria-hidden />;
}

function splitLines(text: string) {
  return text === "" ? [] : text.replace(/\n$/, "").split("\n");
}

function DiffBlock({ diff }: { diff: NonNullable<ActivityItem["diff"]> }) {
  const removed = diff.oldText ? splitLines(diff.oldText) : [];
  const added = splitLines(diff.newText);
  return (
    <div className="mt-dm-3 overflow-hidden rounded-dm-md border border-dm-border bg-dm-surface">
      <div className="truncate border-b border-dm-border px-dm-4 py-dm-2 font-dm-mono text-dm-xs text-dm-text-2">
        {diff.path}
      </div>
      <pre className="m-0 max-h-64 overflow-auto font-dm-mono text-dm-xs leading-5 text-dm-text">
        <code className="block min-w-max">
          {removed.map((line, i) => (
            <span key={`r${i}`} className="block bg-dm-danger-soft px-dm-4">
              <span className="sr-only">Removed: </span>
              <span aria-hidden className="select-none pr-dm-3 text-dm-danger">-</span>
              {line}
            </span>
          ))}
          {added.map((line, i) => (
            <span key={`a${i}`} className="block bg-dm-success-soft px-dm-4">
              <span className="sr-only">Added: </span>
              <span aria-hidden className="select-none pr-dm-3 text-dm-success">+</span>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function ActivityRow({ label, status, detail, diff, defaultOpen, className, ...props }: ActivityRowProps) {
  const line = (
    <>
      <span className="flex size-4 shrink-0 items-center justify-center">
        <StatusGlyph status={status} />
      </span>
      <span className="shrink-0">
        <span className="sr-only">{STATUS_TEXT[status]}</span>
        {label}
      </span>
      {detail ? <span className="min-w-0 truncate text-dm-text-3">{detail}</span> : null}
    </>
  );

  if (!diff) {
    return (
      <div
        data-slot="activity-row"
        className={cn("flex min-w-0 items-center gap-dm-3 text-dm-sm text-dm-text-2", className)}
        {...props}
      >
        {line}
      </div>
    );
  }

  return (
    <CollapsiblePrimitive.Root asChild defaultOpen={defaultOpen}>
      <div data-slot="activity-row" className={cn("min-w-0 text-dm-sm text-dm-text-2", className)} {...props}>
        <div className="flex min-w-0 items-center gap-dm-3">
          {line}
          <CollapsiblePrimitive.Trigger
            aria-label={`Show changes to ${diff.path}`}
            className="group ml-auto flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-dm-xs text-dm-text-3 hover:text-dm-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring"
          >
            <ChevronRight
              className="size-3.5 motion-safe:transition-transform group-data-[state=open]:rotate-90"
              aria-hidden
            />
          </CollapsiblePrimitive.Trigger>
        </div>
        <CollapsiblePrimitive.Content>
          <DiffBlock diff={diff} />
        </CollapsiblePrimitive.Content>
      </div>
    </CollapsiblePrimitive.Root>
  );
}
