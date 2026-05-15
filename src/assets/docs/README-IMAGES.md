# Documentation images & diagrams

## Naming

- Use lowercase kebab-case: `product-workflow-overview.svg`, `release-publish-flow.png`.
- Prefix with topic when helpful: `platform-licenses-download.png`.

## Versioning

- When the dashboard UI changes, bump a version suffix in the filename or store under a dated folder: `assets/docs/screens/2026-05/...`.
- Update the referencing doc page in the same PR so anchors stay accurate.

## Formats

- Prefer **SVG** for architecture blocks and **PNG/WebP** for screenshots (2x resolution when possible).
- Keep file size reasonable; compress PNGs before commit.

## Alt text

- Every `<img>` must include meaningful `alt` describing what the reader should infer from the figure.
