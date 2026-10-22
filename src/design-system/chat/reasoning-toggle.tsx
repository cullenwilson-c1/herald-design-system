import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export type ReasoningToggleProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function ReasoningToggle({
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
}: ReasoningToggleProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="reasoning-toggle"
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={cn("text-dm-sm", className)}
    >
      <CollapsiblePrimitive.Trigger className="group flex cursor-pointer items-center gap-dm-2 rounded-dm-sm px-dm-2 py-dm-1 text-dm-text-2 hover:bg-dm-surface-hover hover:text-dm-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring">
        <ChevronRight
          className="size-3.5 motion-safe:transition-transform group-data-[state=open]:rotate-90"
          aria-hidden
        />
        <span className="font-medium group-data-[state=open]:hidden">Show reasoning</span>
        <span className="hidden font-medium group-data-[state=open]:inline">Hide reasoning</span>
      </CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content>
        <div className="mt-dm-3 border-l border-dm-border pl-dm-4 text-dm-sm text-dm-text-2">
          {children}
        </div>
      </CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}
