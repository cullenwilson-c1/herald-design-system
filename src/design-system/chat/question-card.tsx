import { useId, useState, type ComponentProps, type FormEvent } from "react";
import { ArrowUp, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button, IconButton } from "@/design-system/primitives";
import type { ChatItem } from "@/design-system/types";

type QuestionItem = Extract<ChatItem, { kind: "question" }>;

export type QuestionAnswer = { optionId?: string; text?: string };

export type QuestionCardProps = Omit<ComponentProps<"div">, "children" | "prompt"> & {
  prompt: string;
  options: QuestionItem["options"];
  allowText?: boolean;
  onAnswer?: (answer: QuestionAnswer) => void;
  /** When set, the card shows the chosen answer and is disabled. */
  answered?: QuestionAnswer;
};

export function QuestionCard({
  prompt,
  options,
  allowText,
  onAnswer,
  answered,
  className,
  ...props
}: QuestionCardProps) {
  const [draft, setDraft] = useState("");
  const promptId = useId();
  const locked = answered !== undefined;

  const submitText = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || locked) return;
    onAnswer?.({ text });
    setDraft("");
  };

  return (
    <div
      role="group"
      aria-labelledby={promptId}
      data-slot="question-card"
      className={cn(
        "flex flex-col gap-dm-4 rounded-dm-lg border border-dm-border bg-dm-surface p-dm-4",
        className,
      )}
      {...props}
    >
      <p id={promptId} className="m-0 text-dm-md font-medium text-dm-text">
        {prompt}
      </p>
      <div className="flex flex-col items-stretch gap-dm-3">
        {options.map((option) => {
          const chosen = answered?.optionId === option.id;
          return (
            <Button
              key={option.id}
              variant="secondary"
              disabled={locked}
              aria-pressed={locked ? chosen : undefined}
              leadingIcon={chosen ? <Check className="size-3.5 text-dm-accent-text" aria-hidden /> : undefined}
              className={cn(
                "justify-start",
                locked && chosen && "border-dm-accent-border bg-dm-accent-soft text-dm-accent-text disabled:opacity-100 [&_svg]:text-dm-accent-text",
                locked && !chosen && "border-transparent bg-transparent text-dm-text-3 disabled:opacity-100",
              )}
              onClick={() => onAnswer?.({ optionId: option.id })}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
      {allowText && !locked ? (
        <form onSubmit={submitText} className="flex items-center gap-dm-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Type your own answer"
            placeholder="Or type your own answer…"
            className="h-8 min-w-0 flex-1 rounded-dm-md border border-dm-border bg-dm-surface px-dm-4 text-dm-md text-dm-text placeholder:text-dm-text-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dm-ring"
          />
          <IconButton
            type="submit"
            label="Send answer"
            variant="solid"
            size="md"
            disabled={draft.trim() === ""}
          >
            <ArrowUp aria-hidden />
          </IconButton>
        </form>
      ) : null}
      {locked && answered?.text ? (
        <p className="m-0 flex items-center gap-dm-3 rounded-dm-md border border-dm-accent-border bg-dm-accent-soft px-dm-4 py-dm-3 text-dm-sm text-dm-accent-text">
          <Check className="size-3.5 shrink-0 text-dm-accent-text" aria-hidden />
          <span className="sr-only">Selected: </span>
          <span className="min-w-0 break-words">{answered.text}</span>
        </p>
      ) : null}
    </div>
  );
}
