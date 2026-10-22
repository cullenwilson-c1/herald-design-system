import * as React from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

export function StatusWorking({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-working"
      role="status"
      className={cn("flex items-center gap-dm-3 font-dm-sans text-dm-md text-dm-text-2", className)}
      {...props}
    >
      <Spinner size={14} />
      <span>{children}</span>
    </div>
  );
}

export function StatusLive({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="status-live"
      className={cn("flex min-w-0 items-center gap-dm-3 font-dm-sans text-dm-sm text-dm-text-2", className)}
      {...props}
    >
      <span aria-hidden="true" className="size-[7px] shrink-0 rounded-dm-full bg-dm-success" />
      <span className="truncate">{children}</span>
    </div>
  );
}
