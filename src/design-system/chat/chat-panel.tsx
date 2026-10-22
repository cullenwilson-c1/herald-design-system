import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ChatPanelProps = Omit<ComponentProps<"section">, "children"> & {
  header: ReactNode;
  log: ReactNode;
  composer: ReactNode;
};

export function ChatPanel({ header, log, composer, className, ...props }: ChatPanelProps) {
  return (
    <section
      aria-label="Herald chat"
      data-slot="chat-panel"
      className={cn("flex h-full w-[392px] shrink-0 flex-col bg-dm-chrome", className)}
      {...props}
    >
      {header}
      <div className="flex min-h-0 flex-1 flex-col">{log}</div>
      {composer}
    </section>
  );
}
