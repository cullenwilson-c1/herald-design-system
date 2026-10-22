import { useState } from "react";
import { toast } from "sonner";
import {
  AddressBar,
  AssistantMessage,
  BuildWithSquireButton,
  ChangeItem,
  ChangeSummary,
  ChatHeader,
  ChatLog,
  ChatPanel,
  Composer,
  ComposerArea,
  ConnectClaudeState,
  DesignShell,
  ModeToggle,
  PreviewPane,
  ScenarioSelect,
  SelectionOutline,
  StatusWorking,
  TopBar,
  UserMessage,
  Button,
  cn,
  type PreviewState,
  type Scenario,
} from "@/design-system";
import { Group } from "@/demo-utils/gallery-parts";
import { StatesGallery } from "@/demo-utils/states-gallery";
import { renderDemoMarkdown } from "@/demo-utils/markdown";
import * as fx from "@/fixtures";

type Sent = { id: string; text: string; element?: string };

function ShellDemo({ dark, previewState, connected }: { dark: boolean; previewState: PreviewState; connected: boolean }) {
  const [route, setRoute] = useState("/overview");
  const [scenario, setScenario] = useState<Scenario>("realistic");
  const [selectMode, setSelectMode] = useState(true);
  const [chip, setChip] = useState<string | null>("Accounts card");
  const [draft, setDraft] = useState("");
  const [working, setWorking] = useState(true);
  const [sent, setSent] = useState<Sent[]>([]);
  const [sessionId, setSessionId] = useState("s1");

  const send = (text: string) => {
    setSent((s) => [...s, { id: `sent-${s.length}`, text, element: selectMode && chip ? chip : undefined }]);
    setDraft("");
    setWorking(true);
  };

  const session = fx.sessions.find((s) => s.id === sessionId);

  return (
    <DesignShell
      dark={dark}
      className="h-[900px] w-[1440px]"
      chat={
        <ChatPanel
          header={
            <ChatHeader
              sessionName={session?.name ?? fx.PROJECT_NAME}
              recentSessions={fx.sessions}
              currentSessionId={sessionId}
              onSelectSession={setSessionId}
              onNewSession={() => toast("New session")}
            />
          }
          log={
            connected ? (
              <ChatLog items={[]}>
                <UserMessage text={fx.MAIN_USER_1} />
                <AssistantMessage
                  attachments={
                    <ChangeSummary
                      title={fx.MAIN_SUMMARY.title}
                      version={fx.MAIN_SUMMARY.version}
                      restoreLabel={fx.MAIN_SUMMARY.restoreLabel}
                      onRestore={() => toast("Restored v3")}
                    >
                      {fx.MAIN_SUMMARY.changes.map((c) => (
                        <ChangeItem key={c}>{c}</ChangeItem>
                      ))}
                    </ChangeSummary>
                  }
                >
                  {renderDemoMarkdown(fx.MAIN_ASSISTANT_1)}
                </AssistantMessage>
                <UserMessage text={fx.MAIN_USER_2} elementChip={fx.MAIN_ELEMENT} />
                {sent.map((m) => (
                  <UserMessage key={m.id} text={m.text} elementChip={m.element} />
                ))}
                {working ? (
                  <AssistantMessage attachments={<StatusWorking>{fx.MAIN_STATUS}</StatusWorking>} />
                ) : null}
              </ChatLog>
            ) : (
              <ConnectClaudeState variant="inline" onConnect={() => toast("Connecting…")} />
            )
          }
          composer={
            <ComposerArea>
              <Composer
                value={draft}
                onValueChange={setDraft}
                onSend={send}
                working={working}
                onStop={() => setWorking(false)}
                disabled={!connected}
                disabledReason="Connect Claude to start designing."
                contextChip={selectMode && chip ? { label: chip, onRemove: () => setChip(null) } : undefined}
                onAttachImage={() => toast("Attach image")}
              />
            </ComposerArea>
          }
        />
      }
      topBar={
        <TopBar
          left={<ScenarioSelect value={scenario} onValueChange={setScenario} />}
          center={
            <AddressBar
              host={fx.PREVIEW_HOST}
              route={route}
              onRouteChange={setRoute}
              pages={fx.previewPages}
              status={previewState === "ready" ? "live" : previewState === "booting" ? "booting" : "error"}
              onRefresh={() => toast("Preview refreshed")}
              onCopyLink={() => toast("Link copied")}
              onOpenExternal={() => toast("Opening preview…")}
            />
          }
          right={
            <>
              <ModeToggle pressed={selectMode} onPressedChange={setSelectMode} />
              <BuildWithSquireButton onClick={() => toast("Handing off to Squire…")} />
            </>
          }
        />
      }
      preview={
        connected ? (
          <PreviewPane
            title="Preview of Adobe integration redesign"
            src={`${fx.PREVIEW_SRC}#${route}${dark ? "&dark" : ""}`}
            state={previewState}
            errorMessage="The dev server stopped responding."
            description="This page has no saved design image yet."
            onRetry={() => toast("Retrying…")}
          >
            {selectMode && chip ? (
              <SelectionOutline label={chip} style={{ top: 242, left: 86, width: 925, height: 119 }} />
            ) : null}
          </PreviewPane>
        ) : (
          <ConnectClaudeState onConnect={() => toast("Connecting…")} />
        )
      }
    />
  );
}

const PREVIEW_STATES: PreviewState[] = ["ready", "booting", "error", "image-unavailable"];

export function App() {
  const [dark, setDark] = useState(false);
  const [previewState, setPreviewState] = useState<PreviewState>("ready");
  const [connected, setConnected] = useState(true);
  return (
    <div className="design-mode min-h-screen bg-dm-surface-hover p-dm-7 font-dm-sans text-dm-text">
      <header className="mb-dm-6 flex flex-wrap items-center gap-dm-4">
        <h1 className="text-dm-xl font-semibold text-dm-text">Herald design mode</h1>
        <div className="flex items-center gap-dm-3" role="group" aria-label="Demo controls">
          <Button variant="secondary" aria-pressed={dark} onClick={() => setDark((d) => !d)}>
            Theme: {dark ? "Dark" : "Light"}
          </Button>
          <Button variant="secondary" aria-pressed={!connected} onClick={() => setConnected((c) => !c)}>
            Claude: {connected ? "Connected" : "Not connected"}
          </Button>
          {PREVIEW_STATES.map((s) => (
            <Button
              key={s}
              variant={previewState === s ? "primary" : "secondary"}
              size="sm"
              aria-pressed={previewState === s}
              onClick={() => setPreviewState(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </header>

      <div className={cn("overflow-x-auto rounded-dm-lg border border-dm-border-strong")}>
        <ShellDemo dark={dark} previewState={previewState} connected={connected} />
      </div>

      <Group title="States gallery" />
      <StatesGallery />
    </div>
  );
}
