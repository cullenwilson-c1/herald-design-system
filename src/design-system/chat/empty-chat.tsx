import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Button, HeraldMark } from "@/design-system/primitives";

export type EmptyChatProps = Omit<ComponentProps<"div">, "children"> & {
  title?: string;
  description?: string;
  suggestions: string[];
  onPickSuggestion: (suggestion: string) => void;
};

export function EmptyChat({
  title = "What would you like to change?",
  description = "Describe an edit, or turn on Select and click something in the preview.",
  suggestions,
  onPickSuggestion,
  className,
  ...props
}: EmptyChatProps) {
  return (
    <div
      data-slot="empty-chat"
      className={cn("flex flex-1 flex-col items-center justify-center gap-dm-5 py-dm-8 text-center", className)}
      {...props}
    >
      <HeraldMark size={28} />
      <div className="flex flex-col gap-dm-2">
        <h2 className="m-0 text-dm-lg font-semibold text-dm-text">{title}</h2>
        <p className="m-0 text-dm-md text-dm-text-2">{description}</p>
      </div>
      <ul className="m-0 flex w-full list-none flex-col gap-dm-3 p-0">
        {suggestions.map((s) => (
          <li key={s} className="flex">
            <Button
              variant="secondary"
              className="h-auto min-h-8 w-full justify-start whitespace-normal py-dm-3 text-left"
              onClick={() => onPickSuggestion(s)}
            >
              {s}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
