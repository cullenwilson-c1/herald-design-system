# Herald Front-end — Build Plan

Static, presentational React front-end for Herald (see `herald-ui.md`), handed off to another agent and dropped into an existing React app.

## Stack (match exactly)

Vite 6 · React 19 · TypeScript strict · pnpm · Tailwind CSS v4 CSS-first (`@theme`, no `tailwind.config.js`) · `tw-animate-css` · Radix via `radix-ui` · `class-variance-authority` · `cn()` = `clsx` + `tailwind-merge` · `lucide-react` · `sonner` · `@/` → `src/`.

Not allowed: a router, Next/RSC, CSS-in-JS or CSS modules, MUI/Chakra/Mantine, Redux/Zustand/Jotai, data fetching, framer-motion, Google Fonts links.

## Rules

- Presentational only: props in, callbacks out. No fetching, timers or global state.
- Tokens are CSS variables scoped to `.design-mode` in `src/design-system/tokens.css`. Dark mode is `.design-mode.dark`. Tailwind names are prefixed (`bg-dm-surface`). No global element styles.
- Markdown is rendered by the host. Style its output under `.dm-prose` only.
- Test hooks: `data-testid="design-chat-log"`, `data-testid="design-chat-input"`, `data-testid="design-preview-route"`, and `aria-label="Mock data scenario"`.
- Accessibility: keyboard reachable, visible focus, the log is `role="log"`, AA contrast, `prefers-reduced-motion` respected.
- Use the provided `ChatItem` / `ActivityStatus` / `Scenario` types verbatim.

## Decisions

| Topic | Decision |
|---|---|
| Device width control | **Not now.** C1 only supports desktop; can be added later. |
| Change Summary, versions/Restore, Select mode + Selection Tag, Project Switcher, Build with Squire | **Keep** as presentational components with callbacks; features come later. |
| Herald mark / orb | **Static placeholder** mark now; swap in the orb later (see `herald-orb-shaders.md`). |
| Token names | Foundations `sq-*` become `--dm-*` in code. |
| Route field / scenario select | Pending (see the open question). The brief puts both in the preview toolbar with test hooks. |
| Device width (desktop/tablet/mobile) | **Deferred**, even though the brief lists it in the PreviewPane toolbar. C1 only supports desktop. Flag this in the handoff. |
| Layout paths | Fonts in `src/fonts/` (+ OFL licences); demo/gallery is `src/App.tsx`; fixtures in `src/fixtures/`. |
| Brief naming → Herald design | DesignShell = Herald layout (chat column + top bar + preview). Header/SessionsMenu = Chat Header + Project Switcher (session name, recent sessions, New session); "Open in Squire" = the existing **Build with Squire** button (label TBD). |

## Phases

### Phase 0 — Foundation ✅
Scaffold, dependencies, alias, `cn()`, `tokens.css` (light + dark, Tailwind mapping), `.dm-prose`, self-hosted Inter + JetBrains Mono with licences, `index.ts`, empty demo page. `pnpm build` and `tsc --noEmit` pass.

### Phase 1 — Components ✅
- **Primitives:** Button, IconButton, Kbd, Badge, Chip, Status, Divider, Spinner, Mark (placeholder), Select/DropdownMenu/Tooltip, Toaster.
- **Chat:** Header + SessionsMenu (session name, recent sessions, New session, Open in Squire), ChatLog (`role="log"`, polite), UserMessage (pending), AssistantMessage (streaming, `.dm-prose`), ActivityRow (+ diff), PlanRow, QuestionCard (2–4 options or free text), ReasoningToggle (hidden by default), ChangeSummary, Composer (Enter/Shift+Enter, sending, disabled, Stop, optional image attach), empty chat with suggestions, send failed.
- **Workspace:** DesignShell, TopBar, AddressBar/PreviewPane toolbar (route field, scenario select, refresh), ModeToggle, Build with Squire / Open in Squire, PreviewPane (iframe `src` slot, booting, error, design image not available), Connect Claude gate, SelectionTag.

### Phase 2 — Integration ✅
Fixtures for every row type and state, demo page (shell in light and dark, plus a state gallery), build and typecheck, browser comparison against the Pencil mocks, accessibility pass.

### Phase 3 — Follow-up: design new states in Pencil
These are built in code first from Foundations, then designed properly in Pencil:
- [ ] Activity row (running / done / error, diff expanded)
- [ ] Plan row ("3 of 5 steps")
- [ ] Question card (options + free text)
- [ ] Reasoning toggle (collapsed / expanded)
- [ ] Composer: sending, disabled, Stop while working
- [ ] Empty chat with suggestions
- [ ] Send failed
- [ ] Preview booting / preview error / design image not available
- [ ] "Connect Claude to use design mode"
- [ ] Scenario select (left zone) + inline route field in the address bar (agreed "middle ground")
- [ ] Back-port any contrast fixes to the `sq-` tokens in Pencil
- [ ] Back-port code-side changes: address bar widened 460 → 484px (route field truncated at 460)

## Handoff notes (for the receiving agent)

- **Entry points:** `src/design-system/index.ts` (all components, `cn`, types); styles `src/design-system/index.css`; fonts and OFL licences in `src/fonts/`; fixtures in `src/fixtures/`; gallery in `src/App.tsx` (demo-only helpers in `src/demo-utils/`, including a throwaway markdown renderer; don't ship those).
- **Folders:** `primitives/` (Button, IconButton, Kbd, Badge, Chip, Status*, Divider, Spinner, HeraldMark, Tooltip, Select*, DropdownMenu*, Toaster, DesignModeProvider), `chat/` (ChatHeader/SessionsMenu, ChatLog, UserMessage, AssistantMessage, ActivityRow, PlanRow, QuestionCard, ReasoningToggle, ChangeSummary, Composer, EmptyChat, ChatPanel), `workspace/` (DesignShell, TopBar, BuildWithSquireButton, ModeToggle, ScenarioSelect, AddressBar, PreviewPane, ConnectClaudeState, SelectionTag/SelectionOutline).
- **Theming:** wrap in `DesignShell` (or a `.design-mode` element + `DesignModeProvider`); pass `dark` for `.design-mode.dark`. Portaled menus, selects, tooltips and toasts re-apply `.design-mode` (+ `.dark`) so tokens resolve outside the shell.
- **Markdown:** `AssistantMessage` takes host-rendered children; `ChatLog` takes `renderMarkdown(md)`. Output is styled by `.dm-prose`.
- **Host responsibilities:** scroll-to-bottom of the log (ref is exposed), keyboard shortcut for Select mode (`S`), the image picker behind `onAttachImage`, and toasts via sonner's `toast()`.
- **Deliberate deviations from the brief:**
  - No device-width control (C1 is desktop-only; can be added later).
  - "Open in Squire" is the **Build with Squire** button in the top bar (copy kept on purpose).
  - The scenario select sits in the top bar's left zone; the route field is inline in the address bar URL.
  - Mark is a static shield placeholder; the animated orb comes later (`herald-orb-shaders.md`).
- **Tailwind preflight:** `index.css` does `@import "tailwindcss"` (per the brief), which includes Tailwind's global preflight. If the host already imports Tailwind v4, import only `tokens.css`, `prose.css` and `fonts.css` (+ `@source` the design-system folder) to avoid a second preflight.
- **Gallery test hooks:** the gallery renders the test-hook attributes many times; in host tests only one shell instance exists.
- **Known gaps:** the composer has no `+` (tools) button by default (use the `tools` slot); the user bubble is full width per the Pencil master.

## Contrast adjustments

WCAG 2.x contrast, normal text target 4.5:1, checked against chrome, surface, surface-hover (neutral text) and the paired soft fill. **Accent rule:** `accent` / `accent-hover` are fills/UI only (>= 3:1 vs chrome and surface; white `on-accent` text on them >= 4.5:1). Accent-colored text uses `accent-text`, never `accent`. `on-accent` stays `#FFFFFF` in both modes. Only failing tokens changed (hue kept, lightness nudged). `herald-ui.md` is untouched; back-port to Pencil `sq-` tokens (Phase 3).

| Token (`--dm-*`) | Mode | Before | After | Worst failing pair before → after |
|---|---|---|---|---|
| `text-2` | light | `#6B6760` | `#57534D` | was ≈ text-3 once text-3 was darkened; now surface 7.6, clearly above text-3 (5.45) |
| `text-2` | dark | `#AAA8B0` | `#B5B3BA` | surface 7.3, above text-3 (5.0) |
| `text-3` | light | `#9C978E` | `#6E6960` | surface 2.90, hover 2.41 → ≥4.5 on chrome/surface/hover (surface 5.45; hierarchy vs `text-2` 7.6 and `text` 16+) |
| `text-3` | dark | `#7C7A83` | `#94939A` | surface 3.60 → 5.0 (hover 4.55) |
| `accent` | dark | `#1A938F` | `#177F7C` | white on accent 3.74 → 4.81; vs surface 3.16, vs chrome 3.60 (UI/fill only, see rule) |
| `accent-hover` | dark | `#22A5A0` | `#17837F` | white 3.02 → 4.58; lighter than accent |
| `accent-muted` / `accent-border` | dark | `#1A938F26` / `…40` | `#177F7C26` / `…40` | follow accent |
| `success` | light | `#2E8A57` | `#297B4E` | chrome 3.87, surface 4.30, success-soft 3.74 → ≥4.5 |
| `danger` | light | `#C2412D` | `#BD3F2C` | danger-soft 4.38 → ≥4.5 |

Passing unchanged: `text` (9.6–17.0 all pairs), `accent-text` on chrome/surface/accent-soft (6.2–9.3), `accent` light (white 5.01, chrome 4.51 / surface 5.01) and `accent-hover` light (white 6.40); `on-accent` white in both modes, dark `success`/`danger` (≥5.5). Text ladder on surface: light 16+ / 7.6 / 5.45, dark text-2 7.3 / text-3 5.0.

## Change log

- 2026-10-21: top bar re-layout applied (scenario select left, address bar fills center, mode toggle + Build right; all zones 34px).
