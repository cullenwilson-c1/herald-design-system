import * as React from "react";
import { Toaster as Sonner } from "sonner";
import { cn } from "@/lib/cn";
import { useDesignMode } from "./design-mode-context";

export type ToasterProps = React.ComponentProps<typeof Sonner>;

/** sonner Toaster styled with dm tokens. Re-export `toast` from "sonner" in the host. */
export function Toaster({ className, toastOptions, ...props }: ToasterProps) {
  const { dark } = useDesignMode();
  return (
    <Sonner
      theme={dark ? "dark" : "light"}
      className={cn("design-mode", dark && "dark", className)}
      style={
        {
          "--normal-bg": "var(--dm-surface)",
          "--normal-text": "var(--dm-text)",
          "--normal-border": "var(--dm-border)",
          "--border-radius": "var(--dm-radius-lg)",
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "font-dm-sans! text-dm-md! rounded-dm-lg! border-dm-border! bg-dm-surface! text-dm-text! shadow-dm-raised!",
          title: "font-medium! text-dm-text!",
          description: "text-dm-sm! text-dm-text-2!",
          actionButton: "rounded-dm-md! bg-dm-accent! text-dm-on-accent!",
          cancelButton: "rounded-dm-md! bg-dm-surface-hover! text-dm-text!",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}
