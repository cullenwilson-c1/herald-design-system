import { Fragment, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { StatusWorking } from "@/design-system/primitives";
import type { ChatItem } from "@/design-system/types";
import { ActivityRow } from "./activity-row";
import { AssistantMessage } from "./assistant-message";
import { PlanRow } from "./plan-row";
import { QuestionCard, type QuestionAnswer } from "./question-card";
import { UserMessage } from "./user-message";

export type ChatLogProps = Omit<ComponentProps<"div">, "children"> & {
  items: ChatItem[];
  /** Renders assistant markdown. Default: paragraphs split on blank lines. */
  renderMarkdown?: (markdown: string) => ReactNode;
  onAnswerQuestion?: (questionId: string, answer: QuestionAnswer) => void;
  onRetry?: (itemId: string) => void;
  failedItemIds?: string[];
  working?: boolean;
  workingLabel?: string;
  /** Rendered instead of the rows when `items` is empty. */
  empty?: ReactNode;
  /** Extra rows appended after the items. */
  children?: ReactNode;
};

export function defaultRenderMarkdown(markdown: string): ReactNode {
  return markdown
    .split(/\n\s*\n/)
    .filter((p) => p.trim() !== "")
    .map((p, i) => (
      <p key={i} className="whitespace-pre-wrap">
        {p.trim()}
      </p>
    ));
}

type Quiet = Extract<ChatItem, { kind: "activity" | "plan" }>;

export function ChatLog({
  items,
  renderMarkdown = defaultRenderMarkdown,
  onAnswerQuestion,
  onRetry,
  failedItemIds,
  working,
  workingLabel = "Working…",
  empty,
  children,
  className,
  ...props
}: ChatLogProps) {
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({});

  const quietRow = (item: Quiet) =>
    item.kind === "activity" ? (
      <ActivityRow
        key={item.id}
        label={item.label}
        status={item.status}
        detail={item.detail}
        diff={item.diff}
      />
    ) : (
      <PlanRow key={item.id} entries={item.entries} />
    );

  const rows: ReactNode[] = [];
  let run: Quiet[] = [];
  const flush = () => {
    if (run.length === 0) return;
    rows.push(
      <div key={`run-${run.map((r) => r.id).join("-")}`} className="flex flex-col gap-dm-3">
        {run.map(quietRow)}
      </div>,
    );
    run = [];
  };

  for (const item of items) {
    if (item.kind === "activity" || item.kind === "plan") {
      run.push(item);
      continue;
    }
    flush();
    if (item.kind === "user") {
      const failed = failedItemIds?.includes(item.id) ?? false;
      rows.push(
        <UserMessage
          key={item.id}
          text={item.text}
          pending={item.pending}
          failed={failed}
          onRetry={onRetry ? () => onRetry(item.id) : undefined}
        />,
      );
    } else if (item.kind === "assistant") {
      rows.push(
        <AssistantMessage key={item.id} streaming={item.streaming}>
          {renderMarkdown(item.text)}
        </AssistantMessage>,
      );
    } else {
      rows.push(
        <QuestionCard
          key={item.id}
          prompt={item.prompt}
          options={item.options}
          allowText={item.allowText}
          answered={answers[item.id]}
          onAnswer={(answer) => {
            setAnswers((prev) => ({ ...prev, [item.id]: answer }));
            onAnswerQuestion?.(item.id, answer);
          }}
        />,
      );
    }
  }
  flush();

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Conversation"
      tabIndex={0}
      data-testid="design-chat-log"
      data-slot="chat-log"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-dm-7 overflow-y-auto pt-dm-4 pr-dm-6 pb-dm-5 pl-dm-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dm-ring",
        className,
      )}
      {...props}
    >
      {items.length === 0 ? empty : <Fragment>{rows}</Fragment>}
      {working ? <StatusWorking>{workingLabel}</StatusWorking> : null}
      {children}
    </div>
  );
}
