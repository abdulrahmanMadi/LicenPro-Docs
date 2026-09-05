# LicenPro Docs

Public documentation site for [LicenPro](https://licenpro.tech) — software licensing, the vendor dashboard, REST API, and the .NET SDK.

**Live site:** [docs.licenpro.tech](https://docs.licenpro.tech)  
**Repository:** [github.com/abdulrahmanMadi/LicenPro-Docs](https://github.com/abdulrahmanMadi/LicenPro-Docs)

## Features

- Guides for onboarding, platform (dashboard), license models, SDK, and REST API
- English, Arabic, and French (locale stored as `licenpro-locale`, shared with the main LicenPro app)
- RTL layout for Arabic
- Light / dark theme
- Angular 21 with SSR

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
npm start
```

The app serves at [http://localhost:4202](http://localhost:4202) by default.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Local dev server |
| `npm run build` | Production build (browser + SSR) |
| `npm run watch` | Development build in watch mode |
| `npm run serve:ssr:LicenPro-Docs` | Serve the SSR bundle from `dist/` |

## Locales

The language switcher uses `localStorage` key `licenpro-locale` (`en` \| `ar` \| `fr`).

- Shell strings live in `src/app/core/i18n/dictionaries/`
- Page HTML lives in `src/app/docs/content/`
- Platform guide AR/FR can be regenerated with:

```bash
node scripts/build-platform-guides-locale.mjs
```

## Related

- Product site: [licenpro.tech](https://licenpro.tech)
- Dashboard: [app.licenpro.tech](https://app.licenpro.tech)
