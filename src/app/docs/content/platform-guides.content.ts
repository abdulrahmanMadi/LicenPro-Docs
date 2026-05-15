import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';

export const PLATFORM_GUIDES: Record<string, DocTopic> = {
  overview: {
    title: 'System overview',
    lead: 'How the LicenPro dashboard, hosted REST API, and client SDKs fit together—from first product setup through runtime validation in your shipped application. The .NET SDK is documented today; additional language SDKs (with examples per stack) are on the roadmap.',
    body: `
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/overview1.png" data-doc-image-alt="LicenPro workflow: Dashboard for vendor setup, REST API for runtime operations, and client SDKs in customer applications (multi-language SDKs and examples planned)" aria-label="View workflow diagram full size">
          <img src="assets/docs/overview1.png" alt="LicenPro workflow: Dashboard for vendor setup, REST API for runtime operations, and client SDKs in customer applications (multi-language SDKs and examples planned)" loading="lazy" decoding="async" />
        </button>
      </figure>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">Three surfaces</span>
        <p><strong>Dashboard</strong> (JWT) is where vendors define products, releases, keys, and licenses.
        The <strong>REST API</strong> is the automation and runtime boundary for validation, activations, sessions, and telemetry.
        <strong>Client SDKs</strong> ship inside your app and verify signed license material using the product public key. The <strong>.NET SDK</strong> is available today; LicenPro is expanding to <strong>first-class SDKs for more languages and runtimes</strong> (for example VB, Java, Python), and this documentation will add <strong>language-specific examples</strong> for each stack alongside the REST API—any environment can integrate via HTTPS in the meantime.</p>
      </div></div>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-key" aria-hidden="true"></i><div>
        <span class="callout-title">Credentials at a glance</span>
        <p><strong>Dashboard &amp; management HTTP calls</strong> use <code>Authorization: Bearer &lt;JWT&gt;</code> after you sign in. That JWT is tied to <strong>your operator session</strong> (who you are in the vendor portal). Use it for routes that manage organizations, products, licenses, and similar—never paste it into customer apps.</p>
        <p><strong>Anonymous validation from servers or a client SDK</strong> uses the product <code>X-API-KEY</code> on routes such as <code>POST /api/Licenses/validate</code>. You <strong>create and copy that key from the dashboard</strong> in the <strong>product’s API / credentials area</strong>, or wherever your deployment surfaces it for your signed-in user (including <strong>account or profile</strong> pages that list product keys). It is <strong>not</strong> your login password. Treat it like a secret: store it in server config or a secure vault; ship it to end-user binaries only when you intentionally embed it for anonymous product calls.</p>
        <p><strong>RSA signing material</strong>: each product has a <strong>private signing key</strong> that stays on LicenPro / your hosted boundary—<strong>never</strong> distribute it and <strong>never</strong> put it in client binaries. Apps and SDKs use only the <strong>public key</strong> (or equivalent public material) to verify that <code>license.bin</code> was signed for that product. So in short: <strong>JWT</strong> = vendor operator; <strong>X-API-KEY</strong> = product identity for anonymous API calls from your code; <strong>public key</strong> = verify licenses in the field; <strong>private key</strong> = stays server-side only.</p>
      </div></div>
      <p>Hosted API base (cloud): <code>${HOST}/api</code>. Route-by-route summaries: ${link('/api/overview', 'REST API overview')}.</p>

      <h2>Who does what</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Vendor operators</strong> — work in the browser dashboard under your organization; day-to-day authoring of products, releases, keys, and licenses.</li>
        <li><strong>Integrators &amp; automation</strong> — call the same HTTPS surface from CI, billing, or internal tools (JWT for operator-scoped routes, or product key only where a route is designed for anonymous access).</li>
        <li><strong>Customer applications</strong> — use a supported client SDK (today: .NET) or call the REST API from your stack; verify <code>license.bin</code> offline with the public key and optionally refresh state online against <code>${HOST}/api</code>. More language SDKs and per-language examples (e.g. VB, Java, Python) are planned.</li>
      </ul>

      <h2>Phase 1 — Configure (dashboard)</h2>
      <p>This is the left side of the diagram: everything you do before a customer machine ever runs your app.</p>
      <ol style="margin-left:1.25rem;">
        <li><strong>Organization</strong> — tenant boundary for members, invitations, and products.</li>
        <li><strong>Product</strong> — anchor for API keys, releases, entitlements, and every issued license.</li>
        <li><strong>Releases</strong> — version lines so licenses and update checks target a specific build or channel.</li>
        <li><strong>Features &amp; entitlement sets</strong> — optional packaging of capabilities into SKUs you assign to licenses.</li>
        <li><strong>RSA keys</strong> — generate per product before issuing licenses; only the public key is distributed to apps.</li>
        <li><strong>Licenses</strong> — choose model (perpetual, trial, subscription, floating, node-locked, …), set limits, export <code>license.bin</code> and the license key.</li>
      </ol>
      <p>Deeper reads: ${link('/guides/platform/organizations', 'Organizations')} · ${link('/guides/platform/products', 'Products')} · ${link('/guides/platform/releases', 'Releases')} · ${link('/guides/platform/features-entitlements', 'Features &amp; entitlements')} · ${link('/rsa-keys', 'RSA keys')} · ${link('/guides/platform/licenses', 'Licenses (vendor)')} · ${link('/first-product', 'First product')} · ${link('/first-license', 'First license')}.</p>

      <h2>Phase 2 — Operate (REST API)</h2>
      <p>The middle of the diagram: the hosted boundary at <code>${HOST}/api</code> (substitute your own host when self-hosting).</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online validation</strong> — <code>POST /api/Licenses/validate</code> with the product <code>X-API-KEY</code> when you want the server to evaluate policy, hardware binding, or revocation in real time.</li>
        <li><strong>Activations &amp; sessions</strong> — optional seat enforcement, floating concurrency, and heartbeat-style visibility for support and compliance.</li>
        <li><strong>Telemetry &amp; updates</strong> — SDK-facing routes for settings, update metadata, and optional log shipping (see SDK topics for how managers call these).</li>
        <li><strong>Automation</strong> — provision or retire licenses from backend jobs using JWT-scoped management routes where your RBAC allows it.</li>
      </ul>
      <p>Start here: ${link('/api/overview', 'REST API overview')} · ${link('/api/licenses', 'Licenses API')} · ${link('/api/activations-sessions', 'Activations &amp; sessions')} · ${link('/api/telemetry', 'Telemetry &amp; logs')}.</p>

      <h2>Phase 3 — Enforce (client SDKs)</h2>
      <p>The right side of the diagram: code that ships inside your process. <strong>.NET</strong> is fully covered in this site today; additional SDKs and <strong>dedicated examples per language</strong> (including VB, Java, Python, and others) will appear here as they ship. Until then, any stack can use the same HTTPS contract as the REST API.</p>
      <p>The following steps use today’s <strong>.NET</strong> types and entry points; other SDKs will mirror the same lifecycle with idiomatic APIs per language.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Bootstrap once</strong> — resolve <code>ServerBaseEndpoint</code> (must include <code>/api</code>), load JSON settings if you use them, then run <code>SdkBootstrap.OnApplicationStartup()</code> on desktop hosts before UI.</li>
        <li><strong>Offline trust</strong> — <code>LicenseClient</code> verifies the RSA signature on <code>license.bin</code> using the embedded public key material; no private key in the client.</li>
        <li><strong>Online refresh</strong> — optional paths back to <code>${HOST}/api</code> for validation refresh, activations, sessions, feature usage, and license-aware updates.</li>
      </ul>
      <p>Continue with ${link('/sdk/overview', '.NET SDK overview')} · ${link('/sdk/configuration', 'Configuration &amp; bootstrap')} · ${link('/sdk/dotnet', '.NET integration')} · ${link('/sdk/license-client', 'LicenseClient lifecycle')}.</p>

      <h2>Optional runtime paths</h2>
      <p>After the core loop works, teams usually add one or more of the following:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Activations &amp; sessions</strong> — ${link('/sessions-activations', 'Sessions &amp; activations guide')} and ${link('/guides/platform/activations', 'Activations')} / ${link('/guides/platform/sessions', 'Sessions')} platform pages.</li>
        <li><strong>License models</strong> — perpetual, trial, subscription, floating, node-locked (sidebar <em>License models</em>).</li>
        <li><strong>Webhooks</strong> — ${link('/webhooks', 'Webhooks')} for lifecycle events to your backend without polling.</li>
        <li><strong>Updates &amp; logging</strong> — ${link('/sdk/updates-logging', 'SDK updates &amp; logging')} for license-aware update checks and structured logs.</li>
      </ul>
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
      <p>HTTP routes under <code>/api/Organization/...</code> (path casing follows your deployment) cover tenant metadata, membership, and invitation flows that match the dashboard.</p>
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
      <p><code>/api/Products/...</code> covers RSA key generation, status, public key download, product CRUD, and related settings. Customer apps never use the vendor JWT for validation; they use the <strong>product API key</strong> on anonymous license endpoints (see ${link('/api/licenses', 'Licenses API')}).</p>
      <p>${link('/api/catalog', 'Products &amp; releases API')} · ${link('/rsa-keys', 'RSA keys guide')} · ${link('/sdk/dotnet', '.NET SDK integration')}</p>
    `,
  },
  releases: {
    title: 'Releases',
    lead: 'Version lines your licenses can target and that the update checker can use.',
    body: `
      <p><strong>Software releases</strong> tie licenses to a specific build or channel and power license-aware updates in the dashboard and from <code>/api/Updates/...</code> for the SDK.</p>
      <h2>Dashboard</h2>
      <p>Manage releases under each product and via global <strong>Releases</strong> routes. When creating a license, you select a <code>softwareReleaseId</code> so validation and update checks can reason about compatibility.</p>
      <h2>API</h2>
      <p>Release lines, metadata, and attachments are exposed alongside product routes (see ${link('/api/catalog', 'catalog topic')}). Pair with storage connectors if binaries live on Drive/OneDrive/custom servers.</p>
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
      <p>REST: catalog routes for feature and entitlement-set authoring. Client: SDK <code>FeatureManager</code> evaluates entitlements from the signed license; <code>FeatureUsageTracker</code> can emit optional usage counters.</p>
      <p>${link('/sdk/features-usage', 'Features &amp; usage')} · ${link('/api/catalog', 'REST catalog topic')}</p>
    `,
  },
  licenses: {
    title: 'Licenses (vendor workspace)',
    lead: 'Issuing, downloading, revoking, and binding policies from the dashboard.',
    body: `
      <p>Vendors create licenses against a product and release, then distribute <code>license.bin</code> and the <strong>license key</strong> to customers. License <em>types</em> (perpetual, trial, subscription, floating, node-locked, …) drive validation rules and optional activation/session behavior.</p>
      <h2>Dashboard</h2>
      <p>Use global <strong>Licenses</strong> or per-product license lists. Download, revoke, refresh, seat edits, and hardware-binding flows are exposed in the UI and mirrored under <code>/api/Licenses/...</code>.</p>
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
      <p>Activation routes (see ${link('/api/activations-sessions', 'Activations &amp; sessions API')}) are the primary HTTP surface for binding; some anonymous reads still flow through <code>/api/Licenses/...</code>. SDK: <code>ActivationManager</code> coordinates device binding with those routes.</p>
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
      <p>Session routes expose create/heartbeat/end patterns used by <code>SessionManager</code> in the SDK when online validation is required.</p>
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
      <p>Trial routes support extensions and in-app evaluation flows; transfer routes can move entitlements when a trial converts to paid or hardware changes.</p>
      <p>${link('/api/trials-transfers', 'Trials &amp; transfers API')} · ${link('/trial-license', 'Trial license model')}</p>
    `,
  },
  analytics: {
    title: 'Analytics & statistics',
    lead: 'Usage and health signals for products and licenses.',
    body: `
      <p>Use <strong>Analytics</strong> and statistics views to understand adoption, validation failures, seat pressure, and SDK telemetry.</p>
      <h2>Data sources</h2>
      <p>Charts combine server-side aggregates from <code>/api/Analytics/...</code> and <code>/api/Statistics/...</code> with audit trails (<code>/api/AuditLogs/...</code>, <code>/api/DashboardLogs/...</code>) and optional SDK log shipping (<code>/api/SdkLogs/...</code>).</p>
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
      <p>Parallel route groups: <code>/api/Storage/...</code>, <code>/api/OneDriveStorage/...</code>, <code>/api/CustomServerStorage/...</code> — each implements list/upload/delete semantics appropriate to the backend.</p>
      <p>${link('/api/storage', 'Storage REST topic')}</p>
    `,
  },
};

export function getPlatformTopic(slug: string): DocTopic | null {
  return PLATFORM_GUIDES[slug] ?? null;
}
