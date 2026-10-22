import type { ComponentProps } from "react";
import { Check, ChevronRight, Circle } from "lucide-react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { Spinner } from "@/design-system/primitives";
import type { ChatItem } from "@/design-system/types";

type PlanItem = Extract<ChatItem, { kind: "plan" }>;
type Entry = PlanItem["entries"][number];

export type PlanRowProps = Omit<ComponentProps<"div">, "children"> & {
  entries: PlanItem["entries"];
  defaultOpen?: boolean;
};

function EntryGlyph({ status }: { status: Entry["status"] }) {
  if (status === "completed") return <Check className="size-3.5 text-dm-success" aria-hidden />;
  if (status === "in_progress") return <Spinner size={14} />;
  return <Circle className="size-3.5 text-dm-text-3" aria-hidden />;
}

const ENTRY_TEXT: Record<Entry["status"], string> = {
  completed: "Completed: ",
  in_progress: "In progress: ",
  pending: "Pending: ",
};

export function PlanRow({ entries, defaultOpen, className, ...props }: PlanRowProps) {
  const total = entries.length;
  const done = entries.filter((e) => e.status === "completed").length;
  const pct = total === 0 ? 0 : (done / total) * 100;
  return (
    <CollapsiblePrimitive.Root asChild defaultOpen={defaultOpen}>
      <div data-slot="plan-row" className={cn("text-dm-sm text-dm-text-2", className)} {...props}>
        <CollapsiblePrimitive.Trigger className="group flex w-full cursor-pointer items-center gap-dm-3 rounded-dm-xs text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring">
          <ChevronRight
            className="size-3.5 shrink-0 text-dm-text-3 motion-safe:transition-transform group-data-[state=open]:rotate-90"
            aria-hidden
          />
          <span>
            {done} of {total} steps
          </span>
          <span aria-hidden className="h-1 w-16 overflow-hidden rounded-dm-full bg-dm-surface-hover">
            <span className="block h-full rounded-dm-full bg-dm-accent" style={{ width: `${pct}%` }} />
          </span>
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content>
          <ul className="m-0 mt-dm-3 flex list-none flex-col gap-dm-3 p-0 pl-dm-6">
            {entries.map((entry, i) => (
              <li key={i} className="flex items-start gap-dm-3">
                <span className="flex h-[1.4em] w-4 shrink-0 items-center justify-center">
                  <EntryGlyph status={entry.status} />
                </span>
                <span className={cn(entry.status === "completed" && "text-dm-text-3")}>
                  <span className="sr-only">{ENTRY_TEXT[entry.status]}</span>
                  {entry.content}
                </span>
              </li>
            ))}
          </ul>
        </CollapsiblePrimitive.Content>
      </div>
    </CollapsiblePrimitive.Root>
  );
}
