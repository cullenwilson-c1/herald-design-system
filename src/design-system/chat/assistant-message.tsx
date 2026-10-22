import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { HeraldMark } from "@/design-system/primitives";

export type AssistantMessageProps = Omit<ComponentProps<"div">, "children"> & {
  /** Host-rendered (markdown) body. Wrapped in `.dm-prose`. */
  children?: ReactNode;
  streaming?: boolean;
  /** Slot below the body (change summaries, status rows…). */
  attachments?: ReactNode;
};

const CARET =
  "[&>:last-child]:after:ml-0.5 [&>:last-child]:after:inline-block [&>:last-child]:after:h-[1.1em] [&>:last-child]:after:w-[2px] [&>:last-child]:after:translate-y-[0.2em] [&>:last-child]:after:bg-dm-text [&>:last-child]:after:motion-safe:animate-pulse";

export function AssistantMessage({
  children,
  streaming,
  attachments,
  className,
  ...props
}: AssistantMessageProps) {
  return (
    <div
      data-slot="assistant-message"
      aria-busy={streaming || undefined}
      className={cn("flex w-full flex-col gap-[10px]", className)}
      {...props}
    >
      <div className="flex items-center gap-dm-3">
        <HeraldMark size={20} />
        <span className="text-dm-md font-semibold text-dm-text">Herald</span>
      </div>
      {children != null && children !== false ? (
        <div className={cn("dm-prose text-dm-body text-dm-text", streaming && CARET)}>
          {children}
        </div>
      ) : null}
      {attachments ? <div className="flex w-full flex-col gap-dm-3">{attachments}</div> : null}
    </div>
  );
}
