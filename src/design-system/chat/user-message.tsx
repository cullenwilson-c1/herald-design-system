import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Chip } from "@/design-system/primitives";

export type UserMessageProps = Omit<ComponentProps<"div">, "children"> & {
  text: string;
  /** Name of the preview element the message refers to (Chip/Element). */
  elementChip?: string;
  pending?: boolean;
  failed?: boolean;
  onRetry?: () => void;
};

export function UserMessage({
  text,
  elementChip,
  pending,
  failed,
  onRetry,
  className,
  ...props
}: UserMessageProps) {
  return (
    <div
      data-slot="user-message"
      className={cn("flex flex-col items-end gap-dm-2 pl-10", className)}
      {...props}
    >
      <div
        className={cn(
          "flex w-full flex-col items-start gap-dm-3 rounded-[14px] bg-dm-surface-hover px-[14px] py-[10px]",
          pending && !failed && "opacity-60",
        )}
      >
        {elementChip ? (
          <Chip variant="element">
            {elementChip}
          </Chip>
        ) : null}
        <p className="m-0 w-full whitespace-pre-wrap break-words text-dm-body text-dm-text">
          {text}
        </p>
      </div>
      {failed ? (
        <p role="alert" className="m-0 flex items-center gap-dm-2 text-dm-xs text-dm-danger">
          <span>Couldn’t send.</span>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="cursor-pointer rounded-dm-xs font-medium underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring"
            >
              Retry
            </button>
          ) : null}
        </p>
      ) : pending ? (
        <p className="m-0 text-dm-xs text-dm-text-3">Sending…</p>
      ) : null}
    </div>
  );
}
