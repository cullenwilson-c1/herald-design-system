import type { ChatItem } from "@/design-system";

export const FINISHED_MARKDOWN = `## Simplified the Overview page

I trimmed the page to the **three most-used cards** and gave each one more room. Here's the plan I followed:

- Remove the *Reviews* and *Entitlements* cards
- Stack the remaining cards at full width
- Keep the \`McpServersTable\` unchanged

1. Update the layout
2. Tighten the padding
3. Verify in the preview

\`\`\`tsx
export function Overview() {
  return <Stack gap={24}><AccessRequests /><Accounts /><McpServers /></Stack>;
}
\`\`\`

| Card | Before | After |
| --- | --- | --- |
| Accounts | 32px padding | 24px padding |
| MCP servers | half width | full width |

> Nothing was deleted from the data layer — only the layout changed.

See the [design notes](https://example.com/design-notes) for details.`;

export const STREAMING_MARKDOWN = `I'm moving the **Add MCP server** button into the card header and making it a filled primary button. Next I'll check the hover and focus`;

export const userNormal: ChatItem = {
  kind: "user",
  id: "u-normal",
  text: "Can you simplify the Overview page? It feels busy — give the cards more breathing room.",
};
export const userPending: ChatItem = { kind: "user", id: "u-pending", text: "Make the header sticky.", pending: true };
export const userFailed: ChatItem = { kind: "user", id: "u-failed", text: "Use the teal accent for the tabs." };
export const FAILED_IDS = ["u-failed"];

export const assistantFinished: ChatItem = { kind: "assistant", id: "a-finished", text: FINISHED_MARKDOWN };
export const assistantStreaming: ChatItem = {
  kind: "assistant",
  id: "a-streaming",
  text: STREAMING_MARKDOWN,
  streaming: true,
};

export const activityRunning: ChatItem = { kind: "activity", id: "act-running", label: "Looking through the code", status: "running" };
export const activityDone: ChatItem = { kind: "activity", id: "act-done", label: "Typecheck the frontend", status: "done" };
export const activityDetail: ChatItem = {
  kind: "activity",
  id: "act-detail",
  label: "Run tests",
  status: "done",
  detail: "pnpm test --filter overview",
};
export const activityError: ChatItem = {
  kind: "activity",
  id: "act-error",
  label: "Run tests",
  status: "error",
  detail: "2 failed",
};
export const activityDiff: ChatItem = {
  kind: "activity",
  id: "act-diff",
  label: "Edited Table.tsx",
  status: "done",
  diff: {
    path: "src/components/Table.tsx",
    oldText: `<Card className="p-8">\n  <Table rows={rows} />\n</Card>`,
    newText: `<Card className="p-6">\n  <Table rows={rows} density="comfortable" />\n</Card>`,
  },
};
export const activityNewFile: ChatItem = {
  kind: "activity",
  id: "act-newfile",
  label: "Created EmptyState.tsx",
  status: "done",
  diff: {
    path: "src/components/EmptyState.tsx",
    newText: `export function EmptyState({ title }: { title: string }) {\n  return <p className="text-muted">{title}</p>;\n}`,
  },
};

export const planMixed: ChatItem = {
  kind: "plan",
  id: "plan-mixed",
  entries: [
    { content: "Read the Overview page components", status: "completed" },
    { content: "Remove the Reviews and Entitlements cards", status: "completed" },
    { content: "Stack cards at full width", status: "completed" },
    { content: "Make the Add MCP server button primary", status: "in_progress" },
    { content: "Verify the layout in the preview", status: "pending" },
  ],
};

export const questionOptions: ChatItem = {
  kind: "question",
  id: "q-options",
  prompt: "Which style should the Add MCP server button use?",
  options: [
    { id: "filled", label: "Filled primary" },
    { id: "outline", label: "Outlined" },
    { id: "ghost", label: "Ghost" },
  ],
};
export const questionText: ChatItem = {
  kind: "question",
  id: "q-text",
  prompt: "Where should the new button live?",
  options: [
    { id: "header", label: "Card header" },
    { id: "footer", label: "Below the table" },
  ],
  allowText: true,
};

/** One of every row kind/state, in order. */
export const allRowKinds: ChatItem[] = [
  userNormal,
  userPending,
  userFailed,
  assistantFinished,
  assistantStreaming,
  activityRunning,
  activityDone,
  activityDetail,
  activityError,
  activityDiff,
  activityNewFile,
  planMixed,
  questionOptions,
  questionText,
];

/** Main conversation matching the Pencil mock (the change summary is attached in App as a slot). */
export const MAIN_USER_1 = "Can you simplify the Overview page? It feels busy — give the cards more breathing room.";
export const MAIN_ASSISTANT_1 =
  "Done. I trimmed the page down to the three most-used cards and gave each one more room. Here's what changed:";
export const MAIN_USER_2 = "Make this a filled primary button.";
export const MAIN_STATUS = "Updating Add MCP server button…";
export const MAIN_ELEMENT = "Add MCP server button";
export const MAIN_SUMMARY = {
  title: "App overview",
  version: "v4",
  restoreLabel: "Restore v3",
  changes: [
    "Removed reviews & entitlement cards",
    "Card padding 32 → 24px, stacked full width",
    "Kept the MCP servers table as-is",
  ],
};

/** Same conversation expressed as plain ChatItems (used for the ChatLog-driven states). */
export const mainConversationItems: ChatItem[] = [
  { kind: "user", id: "m1", text: MAIN_USER_1 },
  { kind: "assistant", id: "m2", text: MAIN_ASSISTANT_1 },
  { kind: "user", id: "m3", text: MAIN_USER_2 },
];
