# Herald UI — Decisions & Context

Status: **direction chosen**. Build on **Herald — Light** and **Herald — Dark**, using the **Herald Foundations** design system.
Last updated: 2026-10-21
Related: `herald-orb-shaders.md` (ambient orb exploration). The glass version is tracked separately.

---

## 1. Product

**Herald** (formerly "Squire Design") is Squire's in-house take on Claude Design: an AI design tool for designers and less-technical people. **Simplicity is the top priority.**

- Desktop browser experience.
- **Left:** chat with the agent. **Right:** live preview of the user's app.
- The chat column and the bar above the preview read as **one seamless surface**. The preview is a separate panel with a **rounded top-left corner only**, flush to the right and bottom edges.
- Feel: modern, light, calm, easy to take in.
- Naming: the product is **Herald**. The CTA that hands a project to the full Squire harness stays **"Build with Squire"**.

## 2. Files & canvas

| What | Where |
|---|---|
| Design file | `~/.pencil/documents/a1539c25-6b1f-44aa-a434-8d03772735ee/squire-design.pen` |
| Shaders (orb work) | same folder, `shaders/` |
| Notes | this repo (`herald-ui.md`, `herald-orb-shaders.md`) |

Top-level frames (node IDs are stable; positions may move):

| Frame | ID | Status |
|---|---|---|
| Herald — Light | `A8zxQ` | **Source of truth** (theme `mode: light`) |
| Herald — Dark | `MhngC` | **Source of truth** (theme `mode: dark`, `m:mode: dark`) |
| Herald — Components | `g5AzF` | **Component masters** |
| Herald — Foundations | `flbwM` | **Design system docs** |
| Top Bar Iterations — Dark | `q9ZHsJ` | Archive (variants A–H, previews blanked) |
| Herald Orb — Concepts | `g7iiy0` | Exploration (see orb notes) |
| halo: design system components | `4:vtHps` | Imported shadcn-style kit, not used by Herald |

## 3. Screen layout (1440 × 900)

```
┌───────────── Chat Panel (392) ─────────────┬──────────────── Workspace (fill) ────────────────┐
│ Top Bar (56): [Scenario ▾] · [Address Bar (fill)] · [Select S][Build]│
│                                            ├──╮───────────────────────────────────────────────┤
│ Thread (fill, padding 12/20/16/20, gap 24) │  │ Preview (white/app bg, radius 14 top-left,    │
│   Message/User · Message/Assistant …       │  │ 1px border top+left, faint shadow, clip)      │
│ Composer Area (padding 0/16/14/16)         │  │                                               │
│   Composer + "Changes are saved as         │  │                                               │
│   versions — you can always go back."      │  │                                               │
└────────────────────────────────────────────┴──┴───────────────────────────────────────────────┘
```

- Root frame fill `$sq-chrome`, horizontal layout, clipped.
- Chat Panel: 392px wide, vertical layout. Workspace: fills the remaining width, vertical layout.
- Preview: `cornerRadius [14,0,0,0]`, stroke `$sq-border` on top and left only, shadow `0 1 3 #1D1C1A0A`. Its fill is the previewed app's own background (currently `$m:bg-default` from the C1 import).

### Top bar — final: variant **E**

Three zones, all 34px tall (from the user's hand-edited Pencil copy `P1huB`). Pencil `qB8WS`: padding `[0,16,0,0]`, gap 12; left zone hug (148), centre zone `fill_container` (591 at 1440; the address bar fills it), right zone hug (269, right-aligned). The scenario select pill looks the same for every scenario. Code grid: `grid-cols-[auto_minmax(0,1fr)_auto]`, `pl-0 pr-dm-5`, gap 12.

| Zone | Contents |
|---|---|
| Left | **Scenario Select** (mock-data scenario, "Realistic data ▾"), drawn as an address-bar-style pill (h34, radius 10, 1px border, surface fill, inner 26px "Page" chip). Accent-soft fill when not "Realistic". |
| Center | **Address Bar** (fills the free width, was 484w): Page Picker ("Overview ▾") · divider · status dot + host + editable **Route Field** (`/overview`) · refresh · copy · open |
| Right | **Mode Toggle/On** ("Select", `S` shortcut, h34) then **Button/Primary** "Build with Squire" (hammer icon, h34). The only solid-accent button on screen. Selector mode gives the agent element-specific instructions. |

Decisions behind it:

- **Device-size toggles (desktop/tablet/mobile) were removed**; they're likely unnecessary.
- The page picker, refresh and preview link were merged into one address bar (familiar browser pattern).
- Rejected or archived alternatives: A (address bar + devices), B (Browse/Select switch centre), C (two grouped capsules), D (breadcrumb), F (Browse/Select centred, no devices), G (two zones), H (Browse/Select left + address bar). **H** was the runner-up; a Browse/Select switch makes the mode state more explicit for non-technical users.

### Two dropdowns (don't confuse them)

| Control | Scope | Menu would list |
|---|---|---|
| **Project Switcher** (chat header, "Adobe integration redesign ▾") | Whole project: chat, versions, preview link | Past projects / conversations (how users "see past projects") |
| **Page Picker** (inside the address bar, "Overview ▾") | Which screen of this project the preview shows | Screens of the project |

The preview URL is per project (`adobe-integration.squire.app`), not per page. The chat header's History and New Project buttons sit next to the switcher.

### Selector mode

- When on, the user clicks an element in the preview. It gets a 2px `$sq-accent` outline and a **Selection Tag** (top-right corner of the element, label = element name).
- The picked element appears as a **Chip/Context** in the composer, and as a **Chip/Element** at the top of the sent user message.

### Sample content (current mocks)

- Project: **Adobe integration redesign**. Page: **Overview**. URL: **adobe-integration.squire.app**.
- Thread: the user asks to simplify the Overview page → Herald replies with a **Change Summary** ("App overview" v4, Restore v3, three changes) → the user selects "Add MCP server button" and asks "Make this a filled primary button." → Herald shows a working status ("Updating Add MCP server button…").
- Composer context chip: "Accounts card". The preview shows the Accounts management card selected.
- Preview content is a simplified slice of the **C1 / Adobe App Settings** UI: collapsed icon rail, page header, and the Access requests, Accounts management and MCP servers cards. It's copied from the user's pasted frame (since deleted) and uses the imported `m:` variables, which follow `m:mode` light/dark. **The preview content is illustrative only and not part of Herald's UI.**

## 4. Design system ("Herald Foundations")

### Theming

- Every Herald token is a Pencil variable prefixed **`sq-`**, with values on the **`mode`** theme axis (`light` / `dark`).
- Set `theme: { mode: "light" | "dark" }` on a frame and every descendant resolves.
- The C1 preview uses its own axis **`m:mode`**. Herald — Dark sets both (`mode: dark`, `m:mode: dark`).

### Color tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `sq-chrome` | `#F4F3EF` | `#1B1A1E` | App chrome (chat + top bar) |
| `sq-surface` | `#FFFFFF` | `#26252A` | Cards, composer, inputs |
| `sq-surface-hover` | `#ECEAE4` | `#2D2C32` | User bubble, hover, tracks |
| `sq-surface-raised` | `#FFFFFF` | `#3B3A41` | Selected segment |
| `sq-border` | `#E5E2DA` | `#34333A` | Default border |
| `sq-border-strong` | `#D6D2C8` | `#46444C` | Dividers, outlined buttons |
| `sq-text` | `#1D1C1A` | `#EDECEF` | Primary text |
| `sq-text-2` | `#57534D` | `#B5B3BA` | Secondary text, icons (7.6:1 light / 7.3:1 dark on surface) |
| `sq-text-3` | `#6E6960` | `#94939A` | Hints, placeholders (5.45:1 light / 5.0:1 dark on surface) |
| `sq-accent` | `#137C7A` | `#177F7C` | Primary action, selection. **Fills / UI only, never text** |
| `sq-accent-hover` | `#0F6A68` | `#17837F` | Primary hover |
| `sq-accent-soft` | `#E2F2F0` | `#15302F` | Active mode fill, chips |
| `sq-accent-muted` | `#137C7A1A` | `#177F7C26` | Kbd, subtle accent |
| `sq-accent-border` | `#137C7A33` | `#177F7C40` | Active mode border |
| `sq-accent-text` | `#0E6261` | `#63CFC9` | Text on soft accent |
| `sq-on-accent` | `#FFFFFF` | `#FFFFFF` | Text on accent |
| `sq-success` | `#297B4E` | `#4CC38A` | Live dot, checks |
| `sq-success-soft` | `#E3F3EA` | `#173226` | Success fill |
| `sq-danger` | `#BD3F2C` | `#F07B65` | Errors, destructive |
| `sq-danger-soft` | `#FBE9E5` | `#3A1F1A` | Error fill |
| `sq-shadow` | `#1D1C1A14` | `#00000059` | Elevation shadow |
| `sq-overlay` | `#1D1C1A66` | `#000000A6` | Modal scrim |
| `sq-ring` | `#137C7A` | `#177F7C` | Keyboard focus outline (= accent) |

Accent rule: `sq-accent` / `sq-accent-hover` are fills and UI only (≥3:1 vs chrome and surface; white `sq-on-accent` text on them ≥4.5:1). Accent-colored **text** uses `sq-accent-text`. Text ladder on surface: `sq-text` 16+:1, `sq-text-2` 7.6:1 (light) / 7.3:1 (dark), `sq-text-3` 5.45:1 / 5.0:1. All `sq-*` values equal `src/design-system/tokens.css` (`--dm-*`) exactly.

Accent history: it started as blue `#3E63DD`, became dark teal per feedback, then was darkened in dark mode for contrast. The dark greys are slightly violet so they sit well next to C1's dark background (`#131216`).

### Type, radius, spacing, control sizes

- Font: `sq-font` = **Inter**. Weights: 400 body, 500 controls/labels, 600 titles/names.

| Token | Value | Use |
|---|---|---|
| `sq-size-xl` | 22 | Sheet/page titles |
| `sq-size-lg` | 16 | Section titles |
| `sq-size-input` | 14 | Project name, composer input |
| `sq-size-body` | 13.5 | Chat message body (line-height 1.55) |
| `sq-size-md` | 13 | Controls, labels, buttons |
| `sq-size-sm` | 12.5 | Secondary rows, URLs, change items |
| `sq-size-xs` | 11 | Meta, badges, overlines |

- Radius: `xs 4 · sm 7 · md 9 · lg 12 · xl 16 · full 999`. Buttons and toggles use `md`; the composer uses `xl`; cards use `lg`; the preview uses 14 top-left.
- Spacing: `space-1..8` = `2 · 4 · 8 · 12 · 16 · 20 · 24 · 32`.
- Control heights: `control-sm 26` (small icon buttons, page picker), `control-md 32` (buttons, toggles), `control-lg 34` (primary CTA, address bar). **Reference values only; see the gotchas in section 6.**

### Elevation

- **Flat:** chrome (chat + top bar), with no border between them.
- **Raised:** composer (border + `0 2 8 $sq-shadow`).
- **Panel:** preview (border on top and left only, 14px top-left corner).
- Avoid other shadows.

## 5. Code ↔ Pencil sync map

Pencil frames (all masters use `$sq-*` tokens, so they work in both themes):

| Frame | ID | Holds |
|---|---|---|
| Herald — Components | `g5AzF` | Primitive, workspace-bar and message masters |
| Herald — Components: Chat | `Ehy8x` | Chat-row, question, plan, reasoning, composer-variant masters |
| Herald — Chat States | `N8seIZ` | State board mirroring the chat sections of the gallery (light + dark cells) |
| Herald — Components: Workspace | `brvsy` | Select, menu, tooltip, toast, preview-state, connect-state masters |
| Herald — Workspace States | `EneNY` | State board mirroring the primitives/workspace sections of the gallery (light + dark cells) |

### Code export → Pencil master ID

Format: `export / variant` → master (ID). "—" means the export is layout/assembly only and has no master of its own.

**Primitives** (`src/design-system/primitives`)

| Code export / variant | Pencil master (ID) |
|---|---|
| `Button` primary (lg, leading icon) | `Button/Primary` (`ydaoY`) |
| `Button` secondary | `Button/Secondary` (`fwb4C`) |
| `Button` ghost | `Button/Ghost` (`Zsxue`) |
| `Button` danger | `Button/Danger` (`mD3XQ`) |
| `IconButton` ghost md / sm | `Icon Button/Medium` (`V0bljh`) / `Icon Button/Small` (`coQck`) |
| `IconButton` secondary md / sm | `Icon Button/Secondary Medium` (`r70Hda`) / `Icon Button/Secondary Small` (`KO0Te`) |
| `IconButton` solid | `Send Button` (`RV7EW`); Stop glyph: `Send Button/Stop` (`TqmvU`) |
| `Kbd` | `Kbd` (`F91ST`) |
| `Badge` neutral / accent / success / danger | `Badge` (`D6cX8`) / `Badge/Accent` (`pGgUq`) / `Badge/Success` (`NMfwd`) / `Badge/Danger` (`JX9JD`) |
| `Chip` element / context | `Chip/Element` (`FIitp`) / `Chip/Context` (`hEcc1`) |
| `Divider` vertical | `Divider/Vertical` (`rJmR0`) |
| `HeraldMark` large / small | `Herald Mark/Large` (`AKH87`) / `Herald Mark/Small` (`sjprM`) |
| `Spinner` | `Spinner` (`m2FNo8`) (static icon in Pencil) |
| `StatusWorking` | `Status/Working` (`C0D2V`) |
| `StatusLive` | `Status/Live` (`kV8So`) |
| Status dot (AddressBar `status`) live / booting / error | `Status Dot/Live` (`HqZAg`) / `Status Dot/Booting` (`a3cVT4`) / `Status Dot/Error` (`TvDh1`) |
| `SelectTrigger` outline | `Select/Trigger` (`CiOz0`) |
| `SelectContent` + `SelectItem` | `ScenarioSelect/Open` (`yHqTx`) built from `Select/Item` (`AHFer`) |
| `DropdownMenuContent` / `Item` / `Label` / `Separator` | `DropdownMenu` (`qpPCs`) / `DropdownMenu/Item` (`Y1T4K`) / `DropdownMenu/Label` (`kSRlV`) / `DropdownMenu/Separator` (`I9jhmM`) |
| `Tooltip` | `Tooltip` (`Ifofm`) (no arrow) |
| `Toaster` (sonner toast) | `Toast` (`uPDiF`) |
| `DesignModeProvider`, `TooltipProvider`, `DropdownMenu`/`Select`/`DropdownMenuTrigger`/`SelectValue`/`DropdownMenuShortcut` roots | — (behavior only) |

**Chat** (`src/design-system/chat`)

| Code export / variant | Pencil master (ID) |
|---|---|
| `ChatHeader` + `SessionsMenu` trigger | `Chat Header` (`Z9PzwT`) + `Project Switcher` (`qxhbV`) |
| `UserMessage` (with chip) | `Message/User` (`uOVPK`) |
| `UserMessage` pending / failed | `Message/User Pending` (`kkn3n`) / `Message/User Failed` (`paAXM`) |
| `AssistantMessage` | `Message/Assistant` (`EZpSQ`) |
| `AssistantMessage` streaming | `Message/Assistant Streaming` (`OWcKA`) |
| `AssistantMessage` + `.dm-prose` | `Message/Assistant Markdown` (`TIdow`), `Prose Sample` (`O9MyA`) |
| `ChangeSummary` | `Change Summary` (`F4Z3d`) |
| `ChangeItem` | `Change Item` (`XYHb9`) |
| `ActivityRow` running / done / error / with detail | `ActivityRow/Running` (`uHiKg`) / `/Done` (`C8SZy6`) / `/Error` (`piuWu`) / `/WithDetail` (`TxWS6`) |
| `ActivityRow` collapsible / expanded (edited) / expanded (new file) | `ActivityRow/Collapsible` (`VYh1H`) / `/Expanded` (`NiXdZ`) / `/Expanded NewFile` (`qaLYd`) |
| `DiffBlock` edited / new file, `DiffLine` removed / added | `DiffBlock` (`iGYcl`) / `DiffBlock/NewFile` (`xza7C`), `DiffLine/Removed` (`BacDQ`) / `DiffLine/Added` (`p8czQd`) |
| `PlanRow` collapsed / expanded | `PlanRow/Collapsed` (`gAZJf`) / `PlanRow/Expanded` (`DBV2R`) |
| Plan entry completed / in progress / pending | `PlanEntry/Completed` (`RSSKi`) / `/InProgress` (`S83NYL`) / `/Pending` (`q3tV6F`) |
| `QuestionCard` unanswered / with text / answered / answered text | `QuestionCard/Unanswered` (`Fsm1O`) / `/WithText` (`xNFHM`) / `/Answered` (`kkXab`) / `/AnsweredText` (`m6phSJ`) |
| `ReasoningToggle` collapsed / expanded | `ReasoningToggle/Collapsed` (`XwucH`) / `/Expanded` (`OGNWJ`) |
| `Composer` default (empty) | **`Composer`** (`jjO3j`), the single canonical default |
| `Composer` with draft / sending / disabled / working / with chip / with attachment | `Composer/WithDraft` (`CboH6`) / `/Sending` (`CqdM9`) / `/Disabled` (`u8TxeK`) / `/Working` (`r3M0Xm`) / `/WithChip` (`CWg9G`) / `/WithAttachment` (`pzG12`) |
| `ComposerArea` (composer + footnote) | — (one-off frame "Composer Area" in the mocks) |
| `EmptyChat` | `EmptyChat` (`CvS1S`) |
| `ChatLog`, `ChatPanel` | — (assembly; the Thread / Chat Panel frames in the mocks) |

**Workspace** (`src/design-system/workspace`)

| Code export / variant | Pencil master (ID) |
|---|---|
| `TopBar` | `Top Bar` (`qB8WS`) |
| `BuildWithSquireButton` | `Button/Primary` (`ydaoY`) |
| `ModeToggle` on / off | `Mode Toggle/On` (`qpl6p`) / `Mode Toggle/Off` (`lhxDA`) |
| `ScenarioSelect` realistic / empty tenant / error states | `ScenarioSelect/Realistic` (`KPwfr`) / `/Empty tenant` (`zKooE`) / `/Error states` (`PJTaQ`) |
| `AddressBar` (+ page picker, route field) | `Address Bar` (`K3OQr`), `Page Picker` (`a88gsh`), `Route Field` (`juniW`) |
| `AddressBar` route hover / focused | `Address Bar/Route Hover` (`w2WoyS`) / `Address Bar/Route Focused` (`O9O9e`) |
| `PreviewPane` ready | `Preview` (`VvX8Y`, in the mocks) |
| `PreviewPane` booting / error / image unavailable | `PreviewPane/Booting` (`DSdtg`) / `/Error` (`Wh0M5`) / `/Image Unavailable` (`Jtxwq`) |
| `ConnectClaudeState` panel / inline | `ConnectClaudeState/Panel` (`fbtkI`) / `/Inline` (`b9yAM`) |
| `SelectionTag` | `Selection Tag` (`gyBDl`) |
| `SelectionOutline` | `SelectionOutline` (`vCjZG`) |
| `DesignShell` | — (Herald — Light `A8zxQ` / Herald — Dark `MhngC`) |

### Pencil ↔ code sync rules

- **Names.** Masters are named exactly as the code export, with `/Variant` for variants (`QuestionCard/Answered`, `Composer/WithChip`). There is one master per default; never keep a second "default" copy.
- **Tokens.** `$sq-*` ↔ `--dm-*` 1:1, same values in both modes. Change a token in `tokens.css` and in the Pencil variables in the same change.
- **Strokes.** CSS borders add to box size, Pencil strokes are inside. Add the stroke width to the padding of every bordered master (e.g. `Button/Secondary` is `[0,13,0,11]` for CSS `px 12 / pl 10` + 1px border). Fixed-size bordered controls (icon buttons, 32px tall) need no change. Don't override padding on instances to compensate; only override for real variants (size, no leading icon).
- **Line-heights.** Set `lineHeight` on every text node using the code ratios (see §6). Pencil rounds fractional line boxes up, so heights can be ~1px taller than the DOM.
- **Same-change rule.** Every new or changed component updates both code and Pencil (master + a cell in the state board, light and dark) in the same change. Update the tables above too.
- **State boards mirror the gallery.** `Herald — Chat States` (`N8seIZ`) and `Herald — Workspace States` (`EneNY`) follow the sections of `src/demo-utils/states-gallery.tsx`, same order and labels.
- **Top bar zones.** Pencil (`qB8WS`): left zone hug (Scenario Select pill), centre zone fills (address bar fills it), right zone hug (Mode Toggle + Build), padding `[0,16,0,0]`, all controls 34px.
- **Unrepresentable in Pencil** (approximated, keep a note in the master): animations (booting dot pulse, spinner rotation, streaming caret blink, progress bar), text underline (drawn as a 1px rectangle), mixed text runs in one paragraph (bold/italic/code/link are separate positioned texts in the prose samples), hover/focus/pressed states (separate variants only for the address bar route field), responsive/min-content layout (fixed widths), tooltip arrow, `JetBrains Mono` (no mono variable, literal font name).

### Common overrides

- Hide a user message's chip: `descendants: { "X1tNE": { enabled: false } }`.
- Assistant message with only a status: hide the body (`"mY28K": { enabled: false }`) and set `"aeVBm/E2OZyU"` to the status text.
- Assistant message with a summary: `Replace(instance + "/TKLNW", { type: "frame", name: "Attachments", layout: "vertical", width: "fill_container", gap: 8, children: [{ type: "ref", ref: "F4Z3d", width: "fill_container", descendants: {...} }] })`.
- Change icons via `descendants: { Icon: { icon: "<lucide-name>" } }`. The icon library is **lucide**.

## 6. Pencil gotchas learned

- **Number variables don't work for frame `width`/`height`.** They're silently dropped and the frame falls back to fit-content, so controls collapsed to 16px. Use pixel values for sizes. Variables do work for padding, gap, corner radius and font size.
- **Existing instances don't always reflow** after a master's size changes. Fix by replacing each stale instance with a fresh `ref` that keeps its properties and descendants. Check with `Get(..., { resolveInstances: true })` bounds.
- You can't `Insert` into a slot inside an instance; `Replace` the slot node with a frame that contains the children.
- Screenshots of a **sub-node** of a dark-themed frame can render the text faded (the theme context isn't applied). Screenshot the whole frame to judge dark mode.
- "Partially/fully clipped" warnings printed in the same call as deletes or rebuilds are often stale. Re-check in a fresh call.
- **Text line-heights** follow the code type tokens (xs 1.35, sm/md 1.4, input 1.5, body 1.55, lg 1.4, xl 1.3; 12px chips/links 1.5). Set `lineHeight` on every text node or Pencil heights drift from the DOM.
- **Stroke vs. padding:** CSS borders add to box size, Pencil strokes (inner) don't. Add the stroke width to padding on bordered masters (chip, composer, change summary, address bar, mode toggle) to match the DOM.
- `.pen` files are encrypted. Only edit them through the Pencil MCP, never as raw text.

## 7. Open items / next steps

- Replace the shield **Herald Mark** with the chosen orb (Drift is the current lean) as a component with an `energy` input; use it in the chat header and the assistant avatar.
- States not yet designed:
  - Project Switcher / History menu (past projects);
  - Page Picker menu;
  - empty thread / new project;
  - error and loading states;
  - a **Build with Squire** confirmation or hand-off flow;
  - Select mode off (Mode Toggle/Off), and hover/pressed states.
- Still one-off rather than components: the "Changes are saved as versions" disclaimer and the Preview panel frame.
- Possibly revisit the Browse/Select switch (variant H) if users miss which mode they're in.
