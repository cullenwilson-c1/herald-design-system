import { useState, type ReactNode } from "react";
import { cn, DesignModeProvider } from "@/design-system";

/** Themed cell (own `.design-mode` root, light or dark). Menus/tooltips portal into it so they stay themed. */
export function ThemeCell({
  dark,
  width,
  children,
  className,
}: {
  dark: boolean;
  width?: number;
  children: ReactNode;
  className?: string;
}) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  return (
    <div
      ref={setRoot}
      className={cn(
        "design-mode relative rounded-dm-lg border border-dm-border bg-dm-chrome p-dm-5 text-dm-text",
        dark && "dark",
        className,
      )}
      style={width ? { width: width + 34 } : undefined}
    >
      <p className="mb-dm-4 font-dm-mono text-dm-xs text-dm-text-2">{dark ? "dark" : "light"}</p>
      <DesignModeProvider value={{ dark, portalContainer: root }}>{children}</DesignModeProvider>
    </div>
  );
}

/** One labelled state rendered in light and dark side by side. */
export function Pair({
  title,
  note,
  width,
  children,
}: {
  title: string;
  note?: string;
  width?: number;
  children: ReactNode;
}) {
  return (
    <section className="mb-dm-8">
      <h3 className="text-dm-input font-semibold text-dm-text">{title}</h3>
      {note ? <p className="mt-dm-1 mb-dm-4 text-dm-sm text-dm-text-2">{note}</p> : <div className="mb-dm-4" />}
      <div className="flex flex-wrap items-start gap-dm-5">
        <ThemeCell dark={false} width={width}>
          {children}
        </ThemeCell>
        <ThemeCell dark width={width}>
          {children}
        </ThemeCell>
      </div>
    </section>
  );
}

export function Labelled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-dm-3">
      <span className="text-dm-xs font-medium text-dm-text-2">{label}</span>
      {children}
    </div>
  );
}

export function Group({ title }: { title: string }) {
  return (
    <h2 className="mt-dm-8 mb-dm-6 border-b border-dm-border pb-dm-3 text-dm-lg font-semibold text-dm-text">{title}</h2>
  );
}
