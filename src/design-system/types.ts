export type ActivityStatus = "running" | "done" | "error";

export type ChatItem =
  | { kind: "user"; id: string; text: string; pending?: boolean }
  | { kind: "assistant"; id: string; text: string /* markdown */; streaming?: boolean }
  | {
      kind: "activity";
      id: string;
      label: string;
      status: ActivityStatus;
      detail?: string;
      diff?: { path: string; oldText?: string; newText: string };
    }
  | {
      kind: "plan";
      id: string;
      entries: { content: string; status: "pending" | "in_progress" | "completed" }[];
    }
  | {
      kind: "question";
      id: string;
      prompt: string;
      options: { id: string; label: string }[];
      allowText?: boolean;
    };

export type Scenario = "realistic" | "empty-tenant" | "everything-broken";
