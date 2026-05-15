import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';

export const PLATFORM_GUIDES: Record<string, DocTopic> = {
  overview: {
    title: 'System overview',
    lead: 'How the LicenPro dashboard, REST API, and customer-side .NET SDK fit together.',
    body: `
      <figure class="doc-figure">
        <img src="assets/docs/diagram-architecture.svg" width="640" height="120" alt="Dashboard, REST API, and .NET SDK relationship" loading="lazy" />
        <figcaption>High-level architecture: vendor dashboard, hosted API, and SDK in the customer app.</figcaption>
      </figure>
      <div class="help-callout info"><i class="ki-outline ki-information"></i><div>
        <span class="callout-title">Three surfaces</span>
        <p><strong>Dashboard</strong> (JWT) is where vendors define products, releases, keys, and licenses.
        The <strong>REST API</strong> is the automation and runtime boundary for validation, activations, sessions, and telemetry.
        The <strong>.NET SDK</strong> ships inside your app and verifies signed license material using the product public key.</p>
      </div></div>
      <p>Hosted API base (cloud): <code>${HOST}/api</code>. Machine-readable contract: <a class="doc-inline-link" href="${HOST}/swagger/v1/swagger.json" target="_blank" rel="noopener">OpenAPI JSON</a> · ${link('/api/overview', 'human-friendly API hub')}.</p>
      <h2>Typical flow</h2>
      <ol style="margin-left:1.25rem;">
        <li>Create an <strong>organization</strong> and <strong>product</strong>.</li>
        <li>Attach <strong>releases</strong>, optional <strong>features</strong> / <strong>entitlement sets</strong>.</li>
        <li>Generate <strong>RSA keys</strong> for the product, then issue <strong>licenses</strong>.</li>
        <li>Customer apps call <code>POST /api/Licenses/validate</code> (product <code>X-API-KEY</code>) or validate offline via the SDK.</li>
        <li>Optional: <strong>activations</strong> and <strong>sessions</strong> for seat enforcement and support visibility.</li>
      </ol>
      <h2>Where things live in code</h2>
      <p>Dashboard routes mirror these domains (Angular <code>app.routes.ts</code>). REST controllers live under <code>LicenPro.API/Controllers</code> (e.g. <code>ProductsController</code>, <code>LicensesController</code>, <code>ActivationsController</code>, <code>SessionsController</code>). The SDK consumes the same HTTP surface for online validation, sessions, feature usage, and updates.</p>
      <p>Next: ${link('/guides/platform/organizations', 'Organizations')} ·
      ${link('/api/overview', 'REST API overview')} ·
      ${link('/sdk/overview', '.NET SDK overview')}</p>
    `,
  },
  organizations: {
    title: 'Organizations',
    lead: 'Tenants, members, invitations, and where products live.',
    body: `
      <p>Every vendor works inside an <strong>organization</strong>. Products, licenses, audit data, and billing context are scoped to that tenant.</p>
      <h2>Dashboard</h2>
      <p>Use <code>/dashboard/organizations</code> to browse tenants and <code>/dashboard/organization/:id</code> for members, invitations, products, and organization-level settings. Typical operator tasks: invite a colleague, accept an invite, remove a member, switch default product context.</p>
      <h2>REST automation</h2>
      <p><code>OrganizationController</code> backs tenant metadata, membership, and invitation flows. Exact route templates and DTOs are in OpenAPI (paths are usually prefixed <code>/api/Organization</code> with ASP.NET route casing — always verify in Swagger).</p>
      <p>${link('/api/organizations', 'Organizations API topic')} · ${link('/api/auth-users', 'Auth &amp; users')} (JWT acquisition for dashboard calls)</p>
    `,
  },
  products: {
    title: 'Products',
    lead: 'The anchor entity for RSA keys, releases, entitlements, and licenses.',
    body: `
      <p>A <strong>product</strong> represents the application you license. All license files, product API keys, and validation traffic are tied to a product id.</p>
      <h2>Dashboard</h2>
      <p>Navigate to <strong>Products</strong>, open a product for overview, features, entitlements, releases, licenses, users, access matrix, and audit logs. This is the primary workspace before you issue keys or licenses.</p>
      <h2>REST &amp; SDK</h2>
      <p><code>ProductsController</code> exposes RSA key generation/status/public key download, product CRUD, and related settings. Customer apps never use the vendor JWT for validation; they use the <strong>product API key</strong> on anonymous license endpoints (see ${link('/api/licenses', 'Licenses API')}).</p>
      <p>${link('/api/catalog', 'Products &amp; releases API')} · ${link('/rsa-keys', 'RSA keys guide')} · ${link('/sdk/dotnet', '.NET SDK integration')}</p>
    `,
  },
  releases: {
    title: 'Releases',
    lead: 'Version lines your licenses can target and that the update checker can use.',
    body: `
      <p><strong>Software releases</strong> tie licenses to a specific build or channel and power license-aware updates in the dashboard and via <code>UpdatesController</code> for the SDK.</p>
      <h2>Dashboard</h2>
      <p>Manage releases under each product and via global <strong>Releases</strong> routes. When creating a license, you select a <code>softwareReleaseId</code> so validation and update checks can reason about compatibility.</p>
      <h2>API</h2>
      <p><code>SoftwareReleasesController</code> (with <code>ProductsController</code>) models release lines, metadata, and attachments. Pair with storage connectors if binaries live on Drive/OneDrive/custom servers.</p>
      <p>${link('/api/catalog', 'REST: Software releases &amp; products')} · ${link('/sdk/updates-logging', 'SDK updates &amp; logging')}</p>
    `,
  },
  'features-entitlements': {
    title: 'Features & entitlement sets',
    lead: 'Optional gating and packaging of capabilities inside a product.',
    body: `
      <p><strong>Features</strong> describe toggles or capabilities. <strong>Entitlement sets</strong> bundle them for assignment to licenses so you can ship SKUs without hard-coding checks in every build.</p>
      <h2>Dashboard</h2>
      <p>Configure under each product’s <em>Features</em> and <em>Entitlements</em> tabs. Entitlement sets are referenced when creating or editing a license.</p>
      <h2>Runtime</h2>
      <p>REST: <code>FeaturesController</code> and <code>EntitlementSetsController</code>. Client: SDK <code>FeatureManager</code> evaluates entitlements from the signed license; <code>FeatureUsageTracker</code> can emit optional usage counters.</p>
      <p>${link('/sdk/features-usage', 'Features &amp; usage')} · ${link('/api/catalog', 'REST catalog topic')}</p>
    `,
  },
  licenses: {
    title: 'Licenses (vendor workspace)',
    lead: 'Issuing, downloading, revoking, and binding policies from the dashboard.',
    body: `
      <p>Vendors create licenses against a product and release, then distribute <code>license.bin</code> and the <strong>license key</strong> to customers. License <em>types</em> (perpetual, trial, subscription, floating, node-locked, …) drive validation rules and optional activation/session behavior.</p>
      <h2>Dashboard</h2>
      <p>Use global <strong>Licenses</strong> or per-product license lists. Download, revoke, refresh, seat edits, and hardware-binding flows are exposed in the UI and mirrored in <code>LicensesController</code>.</p>
      <h2>Anonymous validation</h2>
      <p>Customer runtimes call <code>POST /api/Licenses/validate</code> with the product <code>X-API-KEY</code> — never the private signing key. See ${link('/api/licenses', 'Licenses API topic')} for multipart and polling endpoints.</p>
      <p>${link('/first-license', 'First license walkthrough')} · ${link('/sdk/license-client', 'SDK LicenseClient')}</p>
    `,
  },
  activations: {
    title: 'Activations',
    lead: 'Devices and environments that have claimed a license seat.',
    body: `
      <p>The <strong>Activations</strong> dashboard shows hardware bindings, floating seat consumption, and history for troubleshooting concurrent and node-locked models.</p>
      <h2>How activations relate to licenses</h2>
      <p>An activation records that a specific machine or identity has consumed capacity on a license. Floating licenses may enforce max concurrent activations; node-locked licenses bind to hardware fingerprints.</p>
      <h2>API</h2>
      <p><code>ActivationsController</code> (with <code>LicensesController</code> for some anonymous reads) is the primary HTTP surface. SDK: <code>ActivationManager</code> coordinates device binding with these routes.</p>
      <p>${link('/api/activations-sessions', 'Activations &amp; sessions API')} · ${link('/sessions-activations', 'Combined guide')}</p>
    `,
  },
  sessions: {
    title: 'Sessions',
    lead: 'Live connections from the SDK for heartbeat, floating licenses, and analytics.',
    body: `
      <p><strong>Sessions</strong> represent an online client session (user/device/app version). They complement activations for concurrent models, heartbeat enforcement, and support visibility.</p>
      <h2>Dashboard</h2>
      <p>Open <strong>Sessions</strong> to inspect heartbeats, versions, and to revoke stale clients when a machine is decommissioned.</p>
      <h2>API &amp; SDK</h2>
      <p><code>SessionsController</code> exposes create/heartbeat/end patterns used by <code>SessionManager</code> in the SDK when online validation is required.</p>
      <p>${link('/api/activations-sessions', 'REST topic')} · ${link('/sdk/activation-session', 'Activation &amp; sessions')}</p>
    `,
  },
  trials: {
    title: 'Trials',
    lead: 'Time-bound evaluation and extension workflows.',
    body: `
      <p><strong>Trials</strong> can be modeled as license types or dedicated trial campaigns depending on your product strategy.</p>
      <h2>Dashboard</h2>
      <p><strong>Trials</strong> routes manage campaign CRUD and reporting. Operators can see which tenants are evaluating and when keys expire.</p>
      <h2>API</h2>
      <p><code>TrialsController</code> supports trial extensions and in-app evaluation flows; <code>TransfersController</code> can move entitlements when a trial converts to paid or hardware changes.</p>
      <p>${link('/api/trials-transfers', 'Trials &amp; transfers API')} · ${link('/trial-license', 'Trial license model')}</p>
    `,
  },
  analytics: {
    title: 'Analytics & statistics',
    lead: 'Usage and health signals for products and licenses.',
    body: `
      <p>Use <strong>Analytics</strong> and statistics views to understand adoption, validation failures, seat pressure, and SDK telemetry.</p>
      <h2>Data sources</h2>
      <p>Charts combine server-side aggregates from <code>AnalyticsController</code> and <code>StatisticsController</code> with audit trails (<code>AuditLogsController</code>, <code>DashboardLogsController</code>) and optional SDK log shipping (<code>SdkLogsController</code>).</p>
      <p>${link('/api/telemetry', 'Telemetry &amp; logs API topic')} · ${link('/guides/platform/overview', 'System overview')}</p>
    `,
  },
  storage: {
    title: 'Storage connectors',
    lead: 'Google Drive, OneDrive, and custom server storage for release artifacts.',
    body: `
      <p>Storage integrations attach binaries or metadata to releases without pushing large files through the core app server for every upload.</p>
      <h2>Dashboard</h2>
      <p>Configure under <strong>Storage</strong> (Google Drive, OneDrive, custom server). After linking, release workflows can reference remote artifacts.</p>
      <h2>API</h2>
      <p>Dedicated controllers: <code>StorageController</code>, <code>OneDriveStorageController</code>, <code>CustomServerStorageController</code> — each implements list/upload/delete semantics appropriate to the backend.</p>
      <p>${link('/api/storage', 'Storage REST topic')}</p>
    `,
  },
};

export function getPlatformTopic(slug: string): DocTopic | null {
  return PLATFORM_GUIDES[slug] ?? null;
}
