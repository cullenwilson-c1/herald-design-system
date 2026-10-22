# Herald — Agent Instructions

The Pencil file is the design source of truth and must stay **1:1 with the code**.

- Design file: `~/.pencil/documents/a1539c25-6b1f-44aa-a434-8d03772735ee/squire-design.pen`. Edit it only through the Pencil MCP; it is encrypted, so never read or grep it directly.
- Spec, node IDs, the code ↔ Pencil component map and the sync rules are in `herald-ui.md`. Stack rules, decisions and handoff notes are in `herald-build-plan.md`.

## When you change UI

1. Make every change to a token, component or state in **both** code (`src/design-system/`) and Pencil, in the same change.
   - Tokens: `--dm-*` in `src/design-system/tokens.css` ↔ `sq-*` Pencil variables, with the same values in light and dark.
   - Components: the Pencil master has the code export's name, with variants written `Name/Variant`.
   - States: add or update the gallery cell in `src/demo-utils/states-gallery.tsx` **and** the matching light/dark cell on the Pencil state boards.
2. Update the map in `herald-ui.md` §5 when you add or rename a component.
3. Verify before finishing:
   - Run `pnpm build`, which includes `tsc --noEmit`.
   - Compare the dev server (`pnpm dev`) against Pencil whole-frame screenshots in both themes.
   - Run a Pencil `problems` scan in a fresh execute call.
