import type * as React from "react";
import { AlertTriangle, ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button, Spinner } from "@/design-system/primitives";
import { panelClassName } from "./panel";

export type PreviewState = "ready" | "booting" | "error" | "image-unavailable";

export interface PreviewPaneProps extends Omit<React.ComponentProps<"div">, "title"> {
  src?: string;
  /** Accessible iframe title. */
  title: string;
  state?: PreviewState;
  errorMessage?: string;
  /** Description for the `image-unavailable` state. */
  description?: string;
  onRetry?: () => void;
  /** Overlay content (e.g. `SelectionOutline` / `SelectionTag`), positioned over the iframe. */
  children?: React.ReactNode;
  iframeProps?: Omit<React.ComponentProps<"iframe">, "src" | "title">;
}

function CenteredState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-dm-4 p-dm-8 text-center">
      {children}
    </div>
  );
}

/** Pencil `VvX8Y` panel + booting / error / image-unavailable states (not yet in Pencil). */
export function PreviewPane({
  src,
  title,
  state = "ready",
  errorMessage,
  description,
  onRetry,
  children,
  iframeProps,
  className,
  ...props
}: PreviewPaneProps) {
  return (
    <div data-slot="preview-pane" data-state={state} className={cn(panelClassName, className)} {...props}>
      {state === "ready" ? (
        <>
          {src ? (
            <iframe
              {...iframeProps}
              src={src}
              title={title}
              className={cn("size-full flex-1 border-0 bg-dm-surface", iframeProps?.className)}
            />
          ) : null}
          {children ? <div className="pointer-events-none absolute inset-0">{children}</div> : null}
        </>
      ) : null}

      {state === "booting" ? (
        <CenteredState>
          <div role="status" className="flex flex-col items-center gap-dm-4">
            <Spinner size={24} />
            <div className="flex flex-col gap-dm-2">
              <p className="text-dm-input font-medium text-dm-text">Starting preview environment…</p>
              <p className="text-dm-sm text-dm-text-2">This usually takes a few seconds.</p>
            </div>
          </div>
          <div aria-hidden className="h-1 w-48 overflow-hidden rounded-dm-full bg-dm-surface-hover">
            <div className="h-full w-1/3 rounded-dm-full bg-dm-accent motion-safe:w-full motion-safe:animate-in motion-safe:slide-in-from-left-full motion-safe:duration-1000 motion-safe:repeat-infinite motion-safe:direction-alternate" />
          </div>
        </CenteredState>
      ) : null}

      {state === "error" ? (
        <CenteredState>
          <div role="alert" className="flex flex-col items-center gap-dm-4">
            <span className="flex size-10 items-center justify-center rounded-dm-full bg-dm-danger-soft text-dm-danger">
              <AlertTriangle aria-hidden className="size-5" />
            </span>
            <div className="flex max-w-[360px] flex-col gap-dm-2">
              <p className="text-dm-input font-medium text-dm-text">Preview couldn&rsquo;t load</p>
              {errorMessage ? <p className="text-dm-sm text-dm-text-2">{errorMessage}</p> : null}
            </div>
          </div>
          {onRetry ? (
            <Button variant="secondary" size="md" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </CenteredState>
      ) : null}

      {state === "image-unavailable" ? (
        <CenteredState>
          <ImageOff aria-hidden className="size-6 text-dm-text-3" />
          <div className="flex max-w-[360px] flex-col gap-dm-2">
            <p className="text-dm-input font-medium text-dm-text-2">Design image not available</p>
            {description ? <p className="text-dm-sm text-dm-text-2">{description}</p> : null}
          </div>
        </CenteredState>
      ) : null}
    </div>
  );
}
