import { useState } from "react";
import { toast } from "sonner";
import { Bell, Download, Plus, Settings } from "lucide-react";
import {
  ActivityRow,
  AddressBar,
  Badge,
  Button,
  ChangeItem,
  ChangeSummary,
  ChatLog,
  Chip,
  Composer,
  ComposerArea,
  ConnectClaudeState,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyChat,
  HeraldMark,
  IconButton,
  Kbd,
  AssistantMessage,
  ModeToggle,
  PlanRow,
  PreviewPane,
  QuestionCard,
  ReasoningToggle,
  ScenarioSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectionOutline,
  StatusLive,
  StatusWorking,
  Tooltip,
  UserMessage,
  Divider,
  Spinner,
  type Scenario,
} from "@/design-system";
import * as fx from "@/fixtures";
import { renderDemoMarkdown } from "./markdown";
import { Group, Labelled, Pair } from "./gallery-parts";

const noop = () => {};
const log = (items: Parameters<typeof ChatLog>[0]["items"], extra?: Partial<Parameters<typeof ChatLog>[0]>) => (
  <div className="flex flex-col">
    <ChatLog items={items} renderMarkdown={renderDemoMarkdown} className="px-0" {...extra} />
  </div>
);

function ScenarioDemo({ value }: { value: Scenario }) {
  const [v, setV] = useState<Scenario>(value);
  return <ScenarioSelect value={v} onValueChange={setV} />;
}

function AddressDemo({ status }: { status: "live" | "booting" | "error" }) {
  const [route, setRoute] = useState("/overview");
  return (
    <AddressBar
      host={fx.PREVIEW_HOST}
      route={route}
      onRouteChange={setRoute}
      pages={fx.previewPages}
      status={status}
      onRefresh={noop}
      onCopyLink={noop}
      onOpenExternal={noop}
      className="w-full max-w-[484px]"
    />
  );
}

function PrimitivesSheet() {
  const [sel, setSel] = useState("a");
  return (
    <div className="flex flex-col gap-dm-6">
      <Labelled label="Buttons: primary / secondary / ghost / danger × sm / md / lg">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-wrap items-center gap-dm-3">
            <Button variant="primary" size={size}>Primary</Button>
            <Button variant="secondary" size={size}>Secondary</Button>
            <Button variant="ghost" size={size}>Ghost</Button>
            <Button variant="danger" size={size}>Danger</Button>
            <Button variant="secondary" size={size} leadingIcon={<Plus aria-hidden />}>Icon</Button>
            <Button variant="secondary" size={size} disabled>Disabled</Button>
          </div>
        ))}
      </Labelled>
      <Labelled label="Icon buttons (ghost, secondary, solid; sm / md; disabled)">
        <div className="flex flex-wrap items-center gap-dm-3">
          <IconButton label="Settings"><Settings aria-hidden /></IconButton>
          <IconButton label="Settings" variant="secondary"><Settings aria-hidden /></IconButton>
          <IconButton label="Download" variant="solid"><Download aria-hidden /></IconButton>
          <IconButton label="Settings" size="sm"><Settings aria-hidden /></IconButton>
          <IconButton label="Settings" size="sm" variant="secondary"><Settings aria-hidden /></IconButton>
          <IconButton label="Settings" disabled><Settings aria-hidden /></IconButton>
        </div>
      </Labelled>
      <Labelled label="Badges">
        <div className="flex flex-wrap items-center gap-dm-3">
          <Badge>v4</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="danger">Danger</Badge>
        </div>
      </Labelled>
      <Labelled label="Chips (element, context, removable) and Kbd">
        <div className="flex flex-wrap items-center gap-dm-3">
          <Chip variant="element">Add MCP server button</Chip>
          <Chip variant="context" onRemove={noop}>Accounts card</Chip>
          <Kbd>S</Kbd>
          <Kbd>⌘K</Kbd>
        </div>
      </Labelled>
      <Labelled label="Status, spinner, mark, divider">
        <div className="flex flex-wrap items-center gap-dm-5">
          <StatusLive>adobe-integration.squire.app</StatusLive>
          <StatusWorking>Updating Add MCP server button…</StatusWorking>
          <Spinner size={20} label="Loading" />
          <HeraldMark size={28} />
          <HeraldMark size={20} />
          <Divider orientation="vertical" />
        </div>
      </Labelled>
      <Labelled label="Menu, select, tooltip, toast">
        <div className="flex flex-wrap items-center gap-dm-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select value={sel} onValueChange={setSel}>
            <SelectTrigger aria-label="Example select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
          <Tooltip content="Notifications">
            <IconButton label="Notifications" tooltip={false}><Bell aria-hidden /></IconButton>
          </Tooltip>
          <Button variant="secondary" onClick={() => toast("Changes saved as v5", { description: "You can restore any version." })}>
            Show toast
          </Button>
        </div>
      </Labelled>
    </div>
  );
}

const COMPOSER_W = 392 - 32;

export function StatesGallery() {
  const [open1, setOpen1] = useState(false);
  void open1;
  void setOpen1;
  return (
    <div>
      <Group title="Preview" />
      <Pair title="Preview: booting" width={420}>
        <div className="h-[260px] w-[420px]"><PreviewPane title="Preview" state="booting" /></div>
      </Pair>
      <Pair title="Preview: error" width={420}>
        <div className="h-[260px] w-[420px]">
          <PreviewPane title="Preview" state="error" errorMessage="The dev server stopped responding (exit code 1)." onRetry={noop} />
        </div>
      </Pair>
      <Pair title="Preview: design image not available" width={420}>
        <div className="h-[260px] w-[420px]">
          <PreviewPane title="Preview" state="image-unavailable" description="This page has no saved design image yet." />
        </div>
      </Pair>
      <Pair title="Preview: selection outline + tag" note="Select mode with an element picked." width={420}>
        <div className="h-[200px] w-[420px]">
          <PreviewPane title="Preview" src={fx.PREVIEW_SRC}>
            <SelectionOutline label="Accounts card" style={{ top: 90, left: 70, width: 300, height: 80 }} />
          </PreviewPane>
        </div>
      </Pair>
      <Pair title="Connect Claude to use design mode: panel" note="Replaces the preview area." width={420}>
        <div className="h-[320px] w-[420px]"><ConnectClaudeState onConnect={noop} onLearnMore={noop} /></div>
      </Pair>
      <Pair title="Connect Claude to use design mode: inline" note="Replaces the chat column." width={392}>
        <div className="flex h-[320px] w-[392px] flex-col"><ConnectClaudeState variant="inline" onConnect={noop} onLearnMore={noop} /></div>
      </Pair>

      <Group title="Workspace controls" />
      <Pair title="Address bar statuses" note="live / booting / error" width={484}>
        <div className="flex flex-col gap-dm-4">
          <AddressDemo status="live" />
          <AddressDemo status="booting" />
          <AddressDemo status="error" />
        </div>
      </Pair>
      <Pair title="Mode toggle" note="On / off / disabled" width={420}>
        <div className="flex items-center gap-dm-4">
          <ModeToggle pressed onPressedChange={noop} />
          <ModeToggle pressed={false} onPressedChange={noop} />
          <ModeToggle pressed={false} disabled />
        </div>
      </Pair>
      <Pair title="Scenario select values" note="Realistic data / Empty tenant / Error states (aria-label “Mock data scenario”)." width={420}>
        <div className="flex flex-wrap items-center gap-dm-4">
          <ScenarioDemo value="realistic" />
          <ScenarioDemo value="empty-tenant" />
          <ScenarioDemo value="everything-broken" />
        </div>
      </Pair>

      <Group title="Chat" />
      <Pair title="Empty chat with suggestions" width={392}>
        <div className="flex h-[480px] w-[392px] flex-col">
          <ChatLog
            items={[]}
            className="px-dm-6"
            empty={<EmptyChat suggestions={fx.emptySuggestions} onPickSuggestion={noop} />}
          />
        </div>
      </Pair>
      <Pair title="Agent working" note="Log shows a working status; composer shows Stop." width={392}>
        <div className="flex w-[392px] flex-col">
          {log([...fx.mainConversationItems, fx.activityRunning], { working: true, workingLabel: "Updating Add MCP server button…", className: "px-dm-6" })}
          <ComposerArea className="px-dm-4">
            <Composer onSend={noop} working onStop={noop} defaultValue="" />
          </ComposerArea>
        </div>
      </Pair>
      <Pair title="Send failed" width={392}>
        <div className="flex w-[392px] flex-col">
          {log([fx.userNormal, fx.userFailed], { failedItemIds: fx.FAILED_IDS, onRetry: noop, className: "px-dm-6" })}
        </div>
      </Pair>

      <Group title="Composer states" />
      <Pair title="Composer" note="default · sending · disabled with reason · working/Stop · context chip · image attachment" width={COMPOSER_W}>
        <div className="flex flex-col gap-dm-5" style={{ width: COMPOSER_W }}>
          <Labelled label="Default (empty)"><Composer onSend={noop} onAttachImage={noop} /></Labelled>
          <Labelled label="With draft"><Composer onSend={noop} onAttachImage={noop} defaultValue="Make this a filled primary button." /></Labelled>
          <Labelled label="Sending"><Composer onSend={noop} sending defaultValue="Make the header sticky." /></Labelled>
          <Labelled label="Disabled with reason">
            <Composer onSend={noop} disabled disabledReason="Connect Claude to start designing." onAttachImage={noop} />
          </Labelled>
          <Labelled label="Working (Stop)"><Composer onSend={noop} working onStop={noop} /></Labelled>
          <Labelled label="With context chip">
            <Composer onSend={noop} onAttachImage={noop} contextChip={{ label: "Accounts card", onRemove: noop }} defaultValue="Add more padding" />
          </Labelled>
          <Labelled label="With image attachment">
            <Composer onSend={noop} onAttachImage={noop} attachments={[{ id: "i1", name: "reference.png", onRemove: noop }]} defaultValue="Match this layout" />
          </Labelled>
        </div>
      </Pair>

      <Group title="Chat rows" />
      <Pair title="User rows: normal · pending · failed" width={392}>
        {log([fx.userNormal, fx.userPending, fx.userFailed], { failedItemIds: fx.FAILED_IDS, onRetry: noop, className: "px-dm-6" })}
      </Pair>
      <Pair title="User row with element chip" width={392}>
        <div className="px-dm-6"><UserMessage text={fx.MAIN_USER_2} elementChip={fx.MAIN_ELEMENT} /></div>
      </Pair>
      <Pair title="Assistant rows: finished markdown · streaming" width={392}>
        {log([fx.assistantFinished, fx.assistantStreaming], { className: "px-dm-6" })}
      </Pair>
      <Pair title="Assistant row with change summary" width={392}>
        <div className="px-dm-6">
          <AssistantMessage
            attachments={
              <ChangeSummary title={fx.MAIN_SUMMARY.title} version={fx.MAIN_SUMMARY.version} restoreLabel={fx.MAIN_SUMMARY.restoreLabel} onRestore={noop}>
                {fx.MAIN_SUMMARY.changes.map((c) => <ChangeItem key={c}>{c}</ChangeItem>)}
              </ChangeSummary>
            }
          >
            <p>{fx.MAIN_ASSISTANT_1}</p>
          </AssistantMessage>
        </div>
      </Pair>
      <Pair title="Activity rows: running · done · detail · error · diff · new-file diff" width={392}>
        {log([fx.activityRunning, fx.activityDone, fx.activityDetail, fx.activityError, fx.activityDiff, fx.activityNewFile], { className: "px-dm-6" })}
      </Pair>
      <Pair title="Activity diff expanded" note="Edited file (old + new text)." width={392}>
        <div className="px-dm-6"><ActivityRow label="Edited Table.tsx" status="done" diff={fx.activityDiff.kind === "activity" ? fx.activityDiff.diff : undefined} defaultOpen /></div>
      </Pair>
      <Pair title="Activity diff expanded: new file" note="No oldText, so every line is an addition." width={392}>
        <div className="px-dm-6"><ActivityRow label="Created EmptyState.tsx" status="done" diff={fx.activityNewFile.kind === "activity" ? fx.activityNewFile.diff : undefined} defaultOpen /></div>
      </Pair>
      <Pair title="Plan: collapsed (“3 of 5 steps”) and expanded" width={392}>
        <div className="flex flex-col gap-dm-5 px-dm-6">
          <PlanRow entries={fx.planMixed.kind === "plan" ? fx.planMixed.entries : []} />
          <PlanRow defaultOpen entries={fx.planMixed.kind === "plan" ? fx.planMixed.entries : []} />
        </div>
      </Pair>
      <Pair title="Question: unanswered (options only · options + free text)" width={392}>
        <div className="flex flex-col gap-dm-5 px-dm-6">
          <QuestionCard prompt={fx.questionOptions.kind === "question" ? fx.questionOptions.prompt : ""} options={fx.questionOptions.kind === "question" ? fx.questionOptions.options : []} onAnswer={noop} />
          <QuestionCard prompt={fx.questionText.kind === "question" ? fx.questionText.prompt : ""} options={fx.questionText.kind === "question" ? fx.questionText.options : []} allowText onAnswer={noop} />
        </div>
      </Pair>
      <Pair title="Question: answered (option · free text)" width={392}>
        <div className="flex flex-col gap-dm-5 px-dm-6">
          <QuestionCard prompt="Which style should the button use?" options={[{ id: "filled", label: "Filled primary" }, { id: "outline", label: "Outlined" }]} answered={{ optionId: "filled" }} />
          <QuestionCard prompt="Where should the new button live?" options={[{ id: "header", label: "Card header" }]} allowText answered={{ text: "Next to the page title" }} />
        </div>
      </Pair>
      <Pair title="Reasoning: collapsed (default) and expanded" width={392}>
        <div className="flex flex-col gap-dm-4 px-dm-6">
          <ReasoningToggle><p>The primary button should be the only filled control in the card so it stays the clear next action.</p></ReasoningToggle>
          <ReasoningToggle defaultOpen><p>The primary button should be the only filled control in the card so it stays the clear next action.</p></ReasoningToggle>
        </div>
      </Pair>
      <Pair title="Every row kind in one log" note="Log is `role=log`; this one scrolls." width={392}>
        <div className="flex h-[640px] w-[392px] flex-col">
          <ChatLog items={fx.allRowKinds} renderMarkdown={renderDemoMarkdown} failedItemIds={fx.FAILED_IDS} onRetry={noop} className="px-dm-6" />
        </div>
      </Pair>

      <Group title="Primitives" />
      <Pair title="Primitives sheet" width={560}>
        <div style={{ width: 560 }}><PrimitivesSheet /></div>
      </Pair>
    </div>
  );
}
