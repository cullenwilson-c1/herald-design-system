import * as React from "react";
import { cn } from "@/lib/cn";
import { Toaster, TooltipProvider } from "@/design-system/primitives";
import { DesignModeProvider } from "@/design-system/primitives/design-mode-context";

export interface DesignShellProps extends Omit<React.ComponentProps<"div">, "children"> {
  dark?: boolean;
  /** Chat column content (392px wide). */
  chat: React.ReactNode;
  topBar: React.ReactNode;
  preview: React.ReactNode;
}

/** Herald layout root: chat column + workspace (top bar over preview panel) on one chrome surface. */
export function DesignShell({ dark = false, chat, topBar, preview, className, ...props }: DesignShellProps) {
  const [root, setRoot] = React.useState<HTMLDivElement | null>(null);
  const ctx = React.useMemo(() => ({ dark, portalContainer: root }), [dark, root]);

  return (
    <div
      ref={setRoot}
      data-slot="design-shell"
      className={cn(
        "design-mode flex size-full min-h-0 overflow-hidden bg-dm-chrome font-dm-sans text-dm-text",
        dark && "dark",
        className,
      )}
      {...props}
    >
      <DesignModeProvider value={ctx}>
        <TooltipProvider>
          <div className="flex h-full w-[392px] shrink-0 flex-col">{chat}</div>
          <div className="flex h-full min-w-0 flex-1 flex-col">
            {topBar}
            <div className="min-h-0 flex-1">{preview}</div>
          </div>
          <Toaster />
        </TooltipProvider>
      </DesignModeProvider>
    </div>
  );
}
