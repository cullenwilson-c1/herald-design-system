import * as React from "react";
import { ChevronDown, Copy, ExternalLink, File, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@/design-system/primitives";

export interface PreviewPage {
  route: string;
  label: string;
}

export type PreviewStatus = "live" | "booting" | "error";

export interface AddressBarProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** Host shown before the route, e.g. `adobe-integration.squire.app`. */
  host: string;
  /** Current preview route, e.g. `/overview`. */
  route: string;
  /** Fired on Enter / blur with the normalized (trimmed, leading-slash) route. */
  onRouteChange: (route: string) => void;
  pages?: PreviewPage[];
  status?: PreviewStatus;
  onRefresh?: () => void;
  onCopyLink?: () => void;
  onOpenExternal?: () => void;
}

const statusDot: Record<PreviewStatus, { className: string; label: string }> = {
  live: { className: "bg-dm-success", label: "Preview is live" },
  booting: { className: "bg-dm-text-3 motion-safe:animate-pulse", label: "Preview is starting" },
  error: { className: "bg-dm-danger", label: "Preview failed to load" },
};

function normalizeRoute(value: string) {
  const v = value.trim();
  if (!v) return "";
  return v.startsWith("/") ? v : `/${v}`;
}

/** Pencil `K3OQr`: page picker · divider · status dot + URL (editable route) · refresh / copy / open. */
export function AddressBar({
  host,
  route,
  onRouteChange,
  pages,
  status = "live",
  onRefresh,
  onCopyLink,
  onOpenExternal,
  className,
  ...props
}: AddressBarProps) {
  const [draft, setDraft] = React.useState(route);
  const [prevRoute, setPrevRoute] = React.useState(route);
  const committed = React.useRef(route);
  if (route !== prevRoute) {
    setPrevRoute(route);
    setDraft(route);
    committed.current = route;
  }

  const commit = () => {
    const next = normalizeRoute(draft);
    if (!next) {
      setDraft(route);
      return;
    }
    setDraft(next);
    if (next !== committed.current) {
      committed.current = next;
      onRouteChange(next);
    }
  };

  const currentPage = pages?.find((p) => p.route === route);
  const dot = statusDot[status];

  return (
    <div
      data-slot="address-bar"
      className={cn(
        "flex h-[34px] w-full min-w-0 shrink items-center gap-dm-2 rounded-[10px] border border-dm-border bg-dm-surface px-dm-2 font-dm-sans",
        className,
      )}
      {...props}
    >
      {pages && pages.length > 0 ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Page: ${currentPage?.label ?? route}. Change page`}
                className="inline-flex h-[26px] shrink-0 items-center gap-[7px] rounded-dm-sm px-[6px] text-dm-md font-medium text-dm-text transition-colors hover:bg-dm-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring data-[state=open]:bg-dm-surface-hover"
              >
                <File aria-hidden className="size-[15px] text-dm-text-2" />
                <span>{currentPage?.label ?? route}</span>
                <ChevronDown aria-hidden className="size-[13px] text-dm-text-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {pages.map((p) => (
                <DropdownMenuItem key={p.route} onSelect={() => onRouteChange(p.route)}>
                  {p.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Divider orientation="vertical" className="h-4" />
        </>
      ) : null}

      <div className="flex min-w-0 flex-1 items-center gap-dm-3 overflow-hidden px-[6px]">
        <span
          role="img"
          aria-label={dot.label}
          className={cn("size-[7px] shrink-0 rounded-dm-full", dot.className)}
        />
        <div className="flex min-w-0 flex-1 items-center overflow-hidden text-dm-sm">
          <span className="min-w-0 shrink-[1000] truncate text-dm-text-2">{host}</span>
          <input
            data-testid="design-preview-route"
            aria-label="Preview route"
            type="text"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              } else if (e.key === "Escape") {
                setDraft(route);
              }
            }}
            className="h-[22px] min-w-0 shrink text-ellipsis [field-sizing:content] rounded-dm-xs border border-transparent bg-transparent px-[1px] font-dm-sans text-dm-sm text-dm-text-2 transition-colors hover:border-dm-border hover:bg-dm-chrome focus-visible:border-dm-border focus-visible:bg-dm-surface focus-visible:text-dm-text focus-visible:outline-2 focus-visible:outline-dm-ring"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-dm-2 [&_button]:text-dm-text-3 [&_button:hover]:text-dm-text">
        {onRefresh ? (
          <IconButton size="sm" variant="ghost" label="Refresh preview" onClick={onRefresh}>
            <RefreshCw aria-hidden className="size-3.5" />
          </IconButton>
        ) : null}
        {onCopyLink ? (
          <IconButton size="sm" variant="ghost" label="Copy preview link" onClick={onCopyLink}>
            <Copy aria-hidden className="size-3.5" />
          </IconButton>
        ) : null}
        {onOpenExternal ? (
          <IconButton size="sm" variant="ghost" label="Open preview in new tab" onClick={onOpenExternal}>
            <ExternalLink aria-hidden className="size-3.5" />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
}
