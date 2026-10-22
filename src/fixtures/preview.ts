import type { PreviewPage, SessionSummary } from "@/design-system";

export const PROJECT_NAME = "Adobe integration redesign";
export const PREVIEW_HOST = "adobe-integration.squire.app";
export const PREVIEW_SRC = "/preview-placeholder.html";

export const previewPages: PreviewPage[] = [
  { route: "/overview", label: "Overview" },
  { route: "/accounts", label: "Accounts" },
  { route: "/access-requests", label: "Access requests" },
  { route: "/mcp-servers", label: "MCP servers" },
];

export const sessions: SessionSummary[] = [
  { id: "s1", name: "Adobe integration redesign", updatedLabel: "Now" },
  { id: "s2", name: "Onboarding checklist", updatedLabel: "Yesterday" },
  { id: "s3", name: "Dark theme for settings", updatedLabel: "Mon" },
  { id: "s4", name: "Access request flow", updatedLabel: "Last week" },
];

export const emptySuggestions = [
  "Simplify the Overview page",
  "Give the cards more breathing room",
  "Make the primary button more prominent",
];
