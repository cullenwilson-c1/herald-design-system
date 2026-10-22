import type * as React from "react";
import { cn } from "@/lib/cn";
import { Button, HeraldMark } from "@/design-system/primitives";
import { panelClassName } from "./panel";

export interface ConnectClaudeStateProps extends Omit<React.ComponentProps<"div">, "children"> {
  onConnect: () => void;
  onLearnMore?: () => void;
  /** `panel`: preview-panel chrome (use in the preview area). `inline`: transparent, for the chat column. */
  variant?: "panel" | "inline";
}

/** Gate shown when no Claude credentials are connected. */
export function ConnectClaudeState({
  onConnect,
  onLearnMore,
  variant = "panel",
  className,
  ...props
}: ConnectClaudeStateProps) {
  return (
    <div
      data-slot="connect-claude-state"
      data-variant={variant}
      className={cn(variant === "panel" ? panelClassName : "flex size-full min-h-0 flex-col", className)}
      {...props}
    >
      <div className="flex size-full flex-col items-center justify-center gap-dm-5 p-dm-8 text-center">
        <HeraldMark size={28} />
        <div className="flex max-w-[320px] flex-col gap-dm-3">
          <h2 className="text-dm-lg font-semibold text-dm-text">Connect Claude to use design mode</h2>
          <p className="text-dm-md text-dm-text-2">
            Design mode uses your Claude account to make changes to your app. Connect it once and you can start
            designing right away.
          </p>
        </div>
        <div className="flex flex-col items-center gap-dm-2">
          <Button variant="primary" size="lg" onClick={onConnect}>
            Connect Claude
          </Button>
          {onLearnMore ? (
            <Button variant="ghost" size="md" onClick={onLearnMore}>
              Learn more
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
