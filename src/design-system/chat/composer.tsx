import {
  useId,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowUp, Image as ImageIcon, Paperclip, Square } from "lucide-react";
import { cn } from "@/lib/cn";
import { Chip, IconButton, Spinner } from "@/design-system/primitives";

export type ComposerAttachment = {
  id: string;
  name: string;
  thumbnailUrl?: string;
  onRemove: () => void;
};

export type ComposerProps = Omit<
  ComponentProps<"div">,
  "children" | "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the trimmed text. Uncontrolled composers clear themselves afterwards. */
  onSend: (text: string) => void;
  sending?: boolean;
  disabled?: boolean;
  /** Explains why the composer is disabled; shown under the field. */
  disabledReason?: string;
  /** While the agent works the Send button becomes Stop and Enter does not send. */
  working?: boolean;
  onStop?: () => void;
  contextChip?: { label: string; onRemove: () => void };
  /** Attach button renders only when provided; the host opens its picker. */
  onAttachImage?: () => void;
  attachments?: ComposerAttachment[];
  placeholder?: string;
  /** Extra controls rendered after the attach button. */
  tools?: ReactNode;
};

export function Composer({
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  sending,
  disabled,
  disabledReason,
  working,
  onStop,
  contextChip,
  onAttachImage,
  attachments,
  placeholder = "Describe a change, or select something in the preview…",
  tools,
  className,
  ...props
}: ComposerProps) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const text = controlled ? value : inner;
  const reasonId = useId();

  const setText = (next: string) => {
    if (!controlled) setInner(next);
    onValueChange?.(next);
  };

  const trimmed = text.trim();
  const canSend = trimmed !== "" && !sending && !disabled && !working;

  const send = () => {
    if (!canSend) return;
    onSend(trimmed);
    if (!controlled) setInner("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
    e.preventDefault();
    send();
  };

  return (
    <div
      data-slot="composer"
      className={cn(
        "flex flex-col gap-[14px] rounded-dm-xl border border-dm-border bg-dm-surface pt-dm-4 pr-dm-4 pb-[10px] pl-[14px] shadow-dm-raised",
        "has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-offset-2 has-[textarea:focus-visible]:outline-dm-ring",
        disabled && "opacity-70",
        className,
      )}
      {...props}
    >
      {contextChip || attachments?.length ? (
        <div className="flex flex-wrap items-center gap-dm-3">
          {contextChip ? (
            <Chip
              variant="context"
              onRemove={contextChip.onRemove}
            >
              {contextChip.label}
            </Chip>
          ) : null}
          {attachments?.map((a) => (
            <Chip
              key={a.id}
              variant="context"
              icon={
                a.thumbnailUrl ? (
                  <img src={a.thumbnailUrl} alt="" className="size-4 rounded-dm-xs object-cover" />
                ) : (
                  <Paperclip className="size-3 text-dm-text-2" aria-hidden />
                )
              }
              onRemove={a.onRemove}
            >
              {a.name}
            </Chip>
          ))}
        </div>
      ) : null}
      <textarea
        data-testid="design-chat-input"
        aria-label="Message Herald"
        aria-describedby={disabled && disabledReason ? reasonId : undefined}
        rows={1}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        className="max-h-40 min-h-[1.55em] w-full resize-none border-0 bg-transparent p-0 font-dm-sans text-dm-input leading-[1.55] text-dm-text outline-none [field-sizing:content] placeholder:text-dm-text-3 disabled:cursor-not-allowed"
      />
      {disabled && disabledReason ? (
        <p id={reasonId} className="m-0 text-dm-xs text-dm-text-3">
          {disabledReason}
        </p>
      ) : null}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-dm-1">
          {onAttachImage ? (
            <IconButton
              label="Attach image"
              variant="ghost"
              className="size-[30px]"
              disabled={disabled}
              onClick={onAttachImage}
            >
              <ImageIcon aria-hidden />
            </IconButton>
          ) : null}
          {tools}
        </div>
        {working ? (
          <IconButton label="Stop" variant="solid" onClick={onStop} disabled={!onStop}>
            <Square className="fill-current" aria-hidden />
          </IconButton>
        ) : (
          <IconButton
            label={sending ? "Sending" : "Send message"}
            variant="solid"
            onClick={send}
            disabled={!canSend}
          >
            {sending ? <Spinner size={16} /> : <ArrowUp aria-hidden />}
          </IconButton>
        )}
      </div>
    </div>
  );
}

export type ComposerAreaProps = Omit<ComponentProps<"div">, "children"> & {
  children: ReactNode;
  /** Text under the composer. Pass `null` to hide. */
  footnote?: ReactNode;
};

export function ComposerArea({
  children,
  footnote = "Changes are saved as versions — you can always go back.",
  className,
  ...props
}: ComposerAreaProps) {
  return (
    <div
      data-slot="composer-area"
      className={cn("flex flex-col gap-dm-3 px-dm-5 pb-[14px]", className)}
      {...props}
    >
      {children}
      {footnote ? <p className="m-0 text-center text-dm-xs text-dm-text-3">{footnote}</p> : null}
    </div>
  );
}
