import type { ComponentProps, ReactNode } from "react";
import { Check, ChevronDown, History, SquarePen } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HeraldMark,
  IconButton,
} from "@/design-system/primitives";

export type SessionSummary = { id: string; name: string; updatedLabel?: string };

export type SessionsMenuProps = {
  /** The trigger element (rendered `asChild`). */
  children: ReactNode;
  recentSessions?: SessionSummary[];
  currentSessionId?: string;
  onSelectSession?: (id: string) => void;
  onNewSession?: () => void;
};

export function SessionsMenu({
  children,
  recentSessions = [],
  currentSessionId,
  onSelectSession,
  onNewSession,
}: SessionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        {recentSessions.length > 0 ? (
          <>
            <DropdownMenuLabel>Recent sessions</DropdownMenuLabel>
            {recentSessions.map((s) => (
              <DropdownMenuItem key={s.id} onSelect={() => onSelectSession?.(s.id)}>
                <span className="min-w-0 flex-1 truncate">{s.name}</span>
                {s.updatedLabel ? (
                  <span className="shrink-0 text-dm-xs text-dm-text-3">{s.updatedLabel}</span>
                ) : null}
                {s.id === currentSessionId ? (
                  <>
                    <Check className="size-3.5 shrink-0 text-dm-accent" aria-hidden />
                    <span className="sr-only">(current)</span>
                  </>
                ) : null}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem onSelect={() => onNewSession?.()}>
          <SquarePen className="size-4 shrink-0 text-dm-text-2" aria-hidden />
          New session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type ChatHeaderProps = Omit<ComponentProps<"header">, "children"> & {
  sessionName: string;
  recentSessions?: SessionSummary[];
  currentSessionId?: string;
  onSelectSession?: (id: string) => void;
  onNewSession?: () => void;
};

export function ChatHeader({
  sessionName,
  recentSessions,
  currentSessionId,
  onSelectSession,
  onNewSession,
  className,
  ...props
}: ChatHeaderProps) {
  const menu = { recentSessions, currentSessionId, onSelectSession, onNewSession };
  return (
    <header
      data-slot="chat-header"
      className={cn("flex h-14 shrink-0 items-center justify-between pr-dm-4 pl-dm-5", className)}
      {...props}
    >
      <SessionsMenu {...menu}>
        <button
          type="button"
          aria-label={`Herald, session: ${sessionName}. Switch session`}
          className="flex min-w-0 cursor-pointer items-center gap-[10px] rounded-[10px] py-[6px] pr-dm-3 pl-[6px] text-left hover:bg-dm-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring data-[state=open]:bg-dm-surface-hover"
        >
          <HeraldMark size={28} />
          <span className="flex min-w-0 flex-col gap-px">
            <span className="text-dm-xs font-medium text-dm-text-3">Herald</span>
            <span className="flex min-w-0 items-center gap-dm-2">
              <span className="truncate text-dm-input font-semibold text-dm-text">{sessionName}</span>
              <ChevronDown className="size-3.5 shrink-0 text-dm-text-3" aria-hidden />
            </span>
          </span>
        </button>
      </SessionsMenu>
      <div className="flex shrink-0 items-center gap-dm-1">
        <SessionsMenu {...menu}>
          <IconButton label="Session history" variant="ghost">
            <History aria-hidden />
          </IconButton>
        </SessionsMenu>
        <IconButton label="New session" variant="ghost" onClick={onNewSession}>
          <SquarePen aria-hidden />
        </IconButton>
      </div>
    </header>
  );
}
