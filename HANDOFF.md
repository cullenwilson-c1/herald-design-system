# Herald Design Mode — Handoff

This repo contains the presentational UI for Squire's design mode ("Herald"): chat on the left, live preview on the right. It is built to drop into an existing React app that owns data, routing and API calls. Components take props in and send callbacks out. They contain no fetching, timers or global state.

**Start here, then read:**
1. `herald-build-plan.md` → "Handoff notes": where things live, what the host owns, deliberate differences from the brief.
2. `herald-ui.md`: layout, tokens, component specs, and the code ↔ Pencil map.
3. `AGENTS.md`: design changes must be made in both code and Pencil.

Run it locally: `pnpm install && pnpm dev`. The gallery at `/` shows the full shell plus every state in light and dark. `pnpm build` runs `tsc --noEmit` and the Vite build.

## What to copy

| Copy | Leave behind (demo only) |
|---|---|
| `src/design-system/`: components, `tokens.css`, `prose.css`, `index.ts`, `types.ts` | `src/demo-utils/`: placeholder markdown renderer, gallery |
| `src/fonts/`: Inter + JetBrains Mono woff2, `fonts.css`, OFL licences | `src/App.tsx`, `src/main.tsx` |
| `src/lib/cn.ts` (or point `cn` at the host's own helper with the same tailwind-merge config) | `public/preview-placeholder.html` |
| `src/fixtures/`: optional; useful as reference props and for tests and stories | |

## Integration checklist

- **Dependencies.** Match `package.json`: `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` v3, `lucide-react`, `sonner` and `tw-animate-css`, on React 19 and Tailwind v4.
- **`@/` alias.** It must resolve to the folder containing `design-system/` and `lib/`.
- **Styles.** If the host already imports Tailwind v4:
  - Do **not** import `src/design-system/index.css`, which brings in Tailwind's global base styles a second time.
  - Import `fonts.css`, `tokens.css` and `prose.css`, plus `tw-animate-css` if it isn't already present.
  - Add `@source "<path>/design-system";` so the component classes get generated.
- **Theming.** All tokens are scoped to `.design-mode`, and dark mode is `.design-mode.dark`.
  - Mount inside `DesignShell` with `dark={…}`.
  - Or use a `.design-mode` element plus `DesignModeProvider`, so portaled menus, selects, tooltips and toasts stay themed.
- **Data.** Use the `ChatItem` / `ActivityStatus` / `Scenario` types from `src/design-system/types.ts`.
  - Pass the host's markdown component via `ChatLog`'s `renderMarkdown`, or as `AssistantMessage` children. `.dm-prose` styles the output.
- **The host owns:**
  - scrolling the log to the bottom (its ref is exposed);
  - the `S` shortcut for Select mode;
  - the image picker behind `onAttachImage`;
  - toasts via sonner's `toast()` (`DesignShell` already renders the `Toaster`);
  - the preview iframe `src`.
- **Test hooks.** Keep these exact:
  - `data-testid="design-chat-log"`
  - `data-testid="design-chat-input"`
  - `data-testid="design-preview-route"`
  - `aria-label="Mock data scenario"`
- **Rules for `src/design-system/`.**
  - Keep components presentational.
  - Use `dm-*` token utilities only, with no hex colours.
  - Add no global element styles.

## Known deliberate deviations from the original brief

- There is no device-width control yet; C1 is desktop-only.
- "Open in Squire" is the **Build with Squire** button in the top bar.
- The scenario select is a pill in the top bar's left zone, and the route is edited inline in the address bar.
- The Herald mark is a static placeholder until the animated orb lands (`herald-orb-shaders.md`).
- The supported shell width is ≥ 1280px.

## Paste-ready prompt

```
Integrate the Herald design-mode UI from <repo/branch> into our app.

Read first: HANDOFF.md, herald-build-plan.md ("Handoff notes"), herald-ui.md, AGENTS.md.

1. Copy src/design-system/, src/fonts/ (keep licence files) and src/lib/cn.ts. Don't copy src/demo-utils/, src/App.tsx, public/preview-placeholder.html.
2. Match dependency versions from package.json; make sure the @/ alias resolves.
3. Styles: we already import Tailwind v4, so import only fonts.css, tokens.css and prose.css (plus tw-animate-css if missing), and add an @source for the design-system folder. Don't add a second preflight.
4. Mount DesignShell for design mode. Wire our data to the components using the types in src/design-system/types.ts; use src/fixtures/ as reference props. Pass our markdown component via renderMarkdown.
5. Host responsibilities: scroll-to-bottom of the log, the S shortcut for Select mode, the image picker, toasts, the preview iframe src.
6. Keep the test hooks exact (design-chat-log, design-chat-input, design-preview-route, aria-label "Mock data scenario").
7. Components stay presentational: no fetching, timers or global state inside src/design-system/.
8. Don't change design tokens or component visuals without flagging it; design changes must also be made in Pencil.

Done = our design mode renders the shell with real data, light and dark; typecheck, build and existing tests pass.
```
