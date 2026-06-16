# Documentation images & diagrams

## Screenshots (2026-06 — license wizard & Node-Locked / Perpetual monitoring)

Place PNG files in this folder (`src/assets/docs/`). Reference them from doc pages as `assets/docs/<filename>`.

| File | Used on | Description |
|------|---------|-------------|
| `platform-create-license-step-license-type.png` | Node-locked, First license | Generate License wizard — License Type step (Node-Locked selected) |
| `platform-create-license-step-basic-info.png` | Node-locked, First license | Basic Info — product, release, issued-to, license name |
| `platform-create-license-step-details-binding.png` | Node-locked | Details — Device binding mode (Auto-bind / Product owner approval) |
| `platform-licenses-list.png` | Licenses guide, Perpetual, Node-locked | Licenses list — Type, Mode, Status, Activations columns |
| `platform-create-license-step1-activation.png` | Licenses guide, First license | Step 1 — Online vs Offline activation |
| `platform-node-locked-overview.png` | Node-locked | License details — Overview (binding mode, hardware ID, usage) |
| `platform-node-locked-device-binding.png` | Node-locked | Device Binding tab — bound device + activation history |
| `platform-node-locked-activations-tab.png` | Node-locked, Perpetual | License details — Activations tab |
| `platform-node-locked-sessions-tab.png` | Node-locked, Perpetual | License details — Active Sessions tab |
| `platform-activations-global-list.png` | Activations guide, Sessions & Activations | Global Activations page |
| `platform-sessions-global-list.png` | Sessions guide, Sessions & Activations | Global Active Sessions page |

Legacy alias still referenced in some pages: `platform-create-license-basic-info.png` → prefer `platform-create-license-step-basic-info.png`.

## Naming

- Use lowercase kebab-case: `product-workflow-overview.svg`, `release-publish-flow.png`.
- Prefix with topic when helpful: `platform-licenses-download.png`.

## Versioning

- When the dashboard UI changes, bump a version suffix in the filename or store under a dated folder: `assets/docs/screens/2026-06/...`.
- Update the referencing doc page in the same PR so anchors stay accurate.

## Formats

- Prefer **SVG** for architecture blocks and **PNG/WebP** for screenshots (2x resolution when possible).
- Keep file size reasonable; compress PNGs before commit.

## Alt text

- Every `<img>` must include meaningful `alt` describing what the reader should infer from the figure.
