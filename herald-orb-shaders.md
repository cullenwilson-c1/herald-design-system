# Herald Orb — Shader Exploration

Status: **paused** (exploration only, nothing chosen yet)
Last updated: 2026-10-21

## Goal

A small, ambient icon for Herald (Squire Design's in-house "Claude Design"-style tool) that signals agent state:

- **Idle** — passive, only slight movement.
- **Working** — clearly more movement while the agent is busy.

Direction: a ball of light / circular object with a "herald" feel, built with pen.dev (Pencil) **shaders** ("Vibe Shaders"). Latest feedback: the orb should be **slightly amorphous when idle** and **very amorphous when working**.

## Where things live

| What | Location |
|---|---|
| Design file | `~/.pencil/documents/76a2df43-83fa-4b7e-865a-840421086fed/squire-design-shaders.pen` (moved out of `squire-design.pen`) |
| Shader files | `~/.pencil/documents/a1539c25-6b1f-44aa-a434-8d03772735ee/shaders/*.glsl` (still in the original document folder) |
| Canvas board | Frame **"Herald Orb — Concepts"** |

The shaders file references shaders across document folders, e.g. `../a1539c25-6b1f-44aa-a434-8d03772735ee/shaders/orb-drift.glsl`. If either document folder moves or is deleted, the shader fills break.

## How the shaders are built

All orb shaders share one interface, so any of them can be swapped in without changing callers:

| Uniform | Type | Purpose |
|---|---|---|
| `u_energy` | float `0..1` | **0 = idle, 1 = agent working.** Tween between values; don't snap. |
| `u_core` | color, default `#63CFC9` | Bright core / highlight (Herald dark-mode accent text) |
| `u_glow` | color, default `#137C7A` | Deep edge / halo (Herald light-mode accent) |
| `u_resolution` | `@resolution` | Auto-bound node size |
| `u_time` | `@time` | Auto-bound elapsed seconds; drives animation |
| `u_density` | float `5..16` (Signal only) | Dot-grid density |

Notes:

- WebGL 1.0 fragment shaders (`#version 100`); output is **premultiplied alpha** on a transparent background, so the orb sits on any surface (light or dark chrome).
- Energy changes amplitude, speed and glow together, so one number covers the full idle → working range. In-between values (e.g. `0.3` for "thinking", `1.0` for "building") work.
- Apply as a `shader` **fill** on a square frame:
  ```json
  { "type": "shader", "url": "./shaders/orb-drift.glsl",
    "uniforms": { "u_energy": 0, "u_core": "#63CFC9", "u_glow": "#137C7A" } }
  ```

## Concepts

### Round 1 — circular

| Name | File | Idea | Idle | Working | Notes |
|---|---|---|---|---|---|
| Beacon | `orb-beacon.glsl` | A herald calling out | Breathing core, faint ring now and then | Faster pulse, three rings ripple outward | Best legibility at 20–28px |
| Lumen | `orb-lumen.glsl` | Liquid light in a glass sphere | Slow internal drift, highlight, lit rim | Currents speed up and brighten, halo grows | Idle vs. working differs mostly in speed; better as a hero/empty-state orb |
| Crest | `orb-crest.glsl` | Heraldic seal | Small core, two orbit rings, short slow comets | Comets race in opposite directions with long tails | Most "herald"; thin rings get lost below ~28px |
| Signal | `orb-signal.glsl` | Halftone transmission | Shimmering dot sphere | Radial wave + sweep across dots | Distinctive; mushy at 20px, better at 40px+ |

### Round 2 — amorphous (current direction)

| Name | File | Idle | Working | Notes |
|---|---|---|---|---|---|
| **Drift** | `orb-drift.glsl` | Droplet with a gently wobbling edge (~3.5% of radius) | Stretches into a slow, folding zero-g blob (~20% of radius), bigger halo | **Strongest match to the brief**; holds up at 20px |
| Merge | `orb-merge.glsl` | Four metaballs huddled into one orb | Blobs drift apart and re-merge | Most expressive when working, but idle reads almost perfectly round |
| Tide | `orb-tide.glsl` | Drift's soft edge + Lumen's internal liquid swirl | Edge and inner currents both loosen and speed up | Richest; inner texture turns to noise at 20px, so better at larger sizes |

Implementation details for the amorphous set:

- **Drift / Tide** outline = base radius + `wob × amp`, where `wob` is a sum of low-frequency angular sines (2, 3 and 5 lobes, each drifting at a different speed) plus slow 2D noise sampled around the circle (seamless). `amp` goes from `0.035` (idle) to `~0.2` (working).
- The first version used higher-frequency noise and gave a crinkly edge when working. It was replaced with the low-frequency waves above, which read as smooth liquid.
- **Merge** = 4 metaballs (`Σ r² / d²`, threshold 1). Their spread from the centre goes from `0.05` (idle) to `0.40` (working).
- Amorphous shaders use `precision highp float` to avoid noise artifacts.

### Round 3 — shield (Herald Mark silhouette)

These use the same uniforms as the orbs. The silhouette is the lucide `shield` from the Herald Mark. It is traced into a 32-point polygon SDF (`sdShieldLine`, the stroke centreline) that is pasted into each file. `sdShieldLine - SW` gives the icon's outer edge, and `abs(sdShieldLine) - SW` gives the icon's stroke.

| Name | File | Idle | Working | Notes |
|---|---|---|---|---|
| Ward | `shield-ward.glsl` | Breathing shield, one faint shield-shaped ring | Three contour rings ripple outward | Beacon carried over to the shield; reads well at 20px |
| Gleam | `shield-gleam.glsl` | Slow specular sweep every ~6.5s | Sweeps every ~1.7s, rim lights up | Mostly still at rest, so it's the calmest idle |
| Vigil | `shield-vigil.glsl` | Outline icon, one spark patrolling the edge | Two comets racing in opposite directions | Keeps today's stroke icon intact |
| Aegis | `shield-aegis.glsl` | Edge barely wobbles (~1.8%) | Liquid wobble (~13%), corners soften 30% toward a circle | Drift's motion on the shield; matches the amorphous brief |
| Molten | `shield-molten.glsl` | Crisp shield, slow liquid interior | Interior churns and brightens, halo grows | Inner texture gets muddy on light chrome |
| Crest Tile | `shield-tile.glsl` | Herald Mark tile with a soft light pool behind the shield | Two pools swirl, shield edge glows | Extra uniforms `u_tile` / `u_mark` (default: light-mode tile `#1D1C1A`, mark `#F4F3EF`). Most drop-in, since it replaces the current mark directly; nearly invisible on dark chrome |

Board: section **"Shield"** (cards Ward … Crest Tile, two rows) below Amorphous on "Herald Orb — Concepts".

### Signal × Shield

| Name | File | Idle | Working | Notes |
|---|---|---|---|---|
| Signal Shield | `shield-signal.glsl` | Halftone dots inside a crisp shield outline, shimmering under soft top-left light | Shield-shaped waves pulse through the dots, a sweep runs around the outline, and faint dots spill past the edge | `u_density` 8–22, default 16 (dots across the frame). The outline makes it read as the Herald Mark even at 20px; use density ~8 there. Without the outline (first pass), the halftone looked like a hex or egg rather than a shield |
| Signal Shield · Dots | `shield-signal-dots.glsl` | Same as Signal Shield, but no outline. The silhouette comes from the dots alone: dots within ~1.8 cells of the edge are drawn larger and brighter, and edge dots shrink with coverage so the curves read | Same waves and spill; the sweep also runs along the edge band | `u_density` 8–24, default 18; ~10 at 20/28px. Softer, more "transmission"-like, but less crisp than the outlined version at 20px |

Board: section **"Signal × Shield"** at the bottom. The card adds a density strip (8 / 12 / 16 / 19 / 22 at Energy 0.5).

## Board layout ("Herald Orb — Concepts")

Each concept card shows:

1. Idle vs. working at 104–120px, on Herald **light** chrome and **dark** chrome.
2. (Amorphous set) an **energy ramp**: 0, 0.25, 0.5, 0.75, 1 at 56px.
3. **In context**: 20px orb (working) next to "Herald", and a 28px orb (idle), in light and dark.

Screenshots and exports capture one still frame; open the board in Pencil to see the motion.

## Open questions / next steps

- Pick a direction (current lean: **Drift**), then tune:
  - idle wobble amplitude and speed (should feel alive but never distracting);
  - working amplitude and speed;
  - whether there's a mid state (e.g. `0.35` "thinking" vs. `1.0` "building").
- Possible hybrids: Drift's shape + Beacon's outward ripple on task completion; Tide for large/hero use with Drift for the small icon.
- Decide placements: chat header mark, assistant avatar in the thread, a "working" status row, empty states.
- Once chosen, make it a reusable **Herald Orb** component in "Herald — Components" (sizes 20 / 28 / large) with `u_energy` exposed per instance.
- Motion spec for engineering: tween duration/easing between idle and working (e.g. 400–600ms ease-out), and a reduced-motion fallback (static orb, energy shown via glow only).
- Handoff: the GLSL ports almost directly to a WebGL canvas or a CSS-sized `<canvas>` in the product; `@time`/`@resolution` map to standard uniforms.

## Related context

- Herald design system: tokens are `sq-*` variables (light/dark), masters live in "Herald — Components", docs in "Herald — Foundations".
- Teal accents: light `#137C7A`, dark `#1A938F`; accent text `#0E6261` (light) / `#63CFC9` (dark).
- The glass version of the UI is on hold, so glass-style shaders (refracting what's behind via `pencil:background`) aren't being pursued.
