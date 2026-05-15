import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';
const API_BASE = `${HOST}/api`;

export const API_TOPICS: Record<string, DocTopic> = {
  'auth-users': {
    title: 'Authentication & users',
    lead: 'JWT for dashboard operators; user and role management APIs.',
    body: `
      <p>Base URL for samples: <code>${API_BASE}</code>. Use your own deployment host when integrating; path prefixes below match the hosted cloud unless your install customizes routing.</p>
      <h2>Authentication model</h2>
      <p>Dashboard and vendor automation use <strong>Bearer JWT</strong> from routes under <code>/api/Auth/...</code> (login, refresh, registration, external providers where enabled). Attach <code>Authorization: Bearer &lt;token&gt;</code> to management routes unless a route is explicitly anonymous.</p>
      <h2>Route groups</h2>
      <ul>
        <li><strong>Authentication</strong> — <code>/api/Auth/...</code> for sign-in, refresh tokens, password flows, and external identity hooks where enabled.</li>
        <li><strong>Users &amp; roles</strong> — <code>/api/Users/...</code> and related identity routes for profiles, invitations, product membership, preferences, and role assignments.</li>
      </ul>
      <p>Anonymous customer validation uses the <strong>product API key</strong> on <code>/api/Licenses/...</code> — not the user JWT. See ${L('/api/overview', 'API overview')} and ${L('/api/licenses', 'Licenses API')}.</p>
    `,
  },
  security: {
    title: 'Security utilities',
    lead: 'Key derivation, session listing, and hardening helpers.',
    body: `
      <p>Prefix: <code>/api/security</code>. Most actions require an authenticated dashboard or service context unless a specific route is called out on this page as anonymous.</p>
      <ul>
        <li><code>POST /api/security/derive-key</code> — body: <code>licenseKey</code>, <code>saltBase64</code>; returns derived key material for protected file flows.</li>
        <li>Session discovery and revocation helpers for operators live alongside other security routes under the same prefix (exact paths depend on your build).</li>
      </ul>
      <p>Confirm request and response shapes with a test call against your deployment before locking client DTOs.</p>
    `,
  },
  organizations: {
    title: 'Organizations API',
    lead: 'Tenant metadata, membership, invitations.',
    body: `
      <p>Routes under <code>/api/Organization/...</code> (casing may match your host) cover tenant metadata, membership, invitations, and tenant-scoped lists aligned with the organization workspace in the dashboard.</p>
      <h2>Typical integration sequence</h2>
      <ol style="margin-left:1.25rem;">
        <li>Authenticate as a vendor operator (JWT).</li>
        <li>List organizations or fetch a tenant by id.</li>
        <li>Create or revoke invitations; accept flows as documented for your environment.</li>
        <li>Link products using <code>/api/Products/...</code> routes scoped to that tenant.</li>
      </ol>
      <p>${L('/guides/platform/organizations', 'Organizations platform guide')}</p>
    `,
  },
  catalog: {
    title: 'Products, releases, features & entitlements',
    lead: 'Everything you define before issuing a license.',
    body: `
      <h2>Products &amp; RSA keys</h2>
      <p>Prefix <code>/api/Products</code>. Common operations:</p>
      <ul>
        <li><code>POST /api/Products/{id}/keys/generate</code> — create key material for signing.</li>
        <li><code>GET /api/Products/{id}/keys/status</code> — readiness of keys.</li>
        <li><code>GET /api/Products/{id}/keys/public</code> and <code>.../public/download</code> — distribute public key to SDK clients.</li>
      </ul>
      <h2>Releases &amp; entitlements</h2>
      <p><strong>Software releases</strong> — release lines and metadata (REST routes are grouped with your product/release authoring flow).</p>
      <p><strong>Entitlement sets</strong> — bundle features for assignment to licenses.</p>
      <p><strong>Features</strong> — feature definitions and administrative CRUD.</p>
      <p>${L('/guides/platform/products', 'Products guide')} · ${L('/rsa-keys', 'RSA keys')} · ${L('/guides/platform/features-entitlements', 'Features &amp; entitlements')}</p>
    `,
  },
  licenses: {
    title: 'Licenses API',
    lead: 'Operator CRUD plus anonymous validation with X-API-KEY.',
    body: `
      <div class="help-callout info"><i class="ki-outline ki-key"></i><div>
        <span class="callout-title">Product API key</span>
        <p>Used by <code>POST /api/Licenses/validate</code>. Send <code>X-API-KEY: &lt;product key&gt;</code> (or legacy <code>Authorization: X-API-KEY &lt;key&gt;</code>). Never ship the private signing key to clients.</p>
      </div></div>
      <p>Prefix <code>/api/Licenses</code>. Hosted example: <code>${HOST}/api/Licenses/validate</code>.</p>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses</code></div>
      <p>Paginated list. Query: <code>pageNumber</code>, <code>pageSize</code>, <code>search</code>, <code>status</code>, <code>type</code>.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}</code></div>
      <p>Single license by GUID.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses</code></div>
      <p>Create license. Body: <code>CreateLicenseDto</code> — required <code>name</code>, <code>type</code> (Perpetual, Trial, Subscription, NodeLocked, Floating, Concurrent), <code>issuedTo</code>, <code>softwareReleaseId</code>; optional expiry, seats, hardware, entitlement set ids, notes.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/validate</code></div>
      <p><strong>AllowAnonymous</strong> + <strong>X-API-KEY</strong>. <code>multipart/form-data</code>: <code>licenseKey</code>, <code>validationParams</code> (JSON string), optional <code>licenseFile</code>.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/validate/{licenseKey}</code></div>
      <p>Simple validation; optional <code>hardwareId</code> query.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/status/{licenseKey}</code></div>
      <p>Status payload for SDK polling.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/refresh/{licenseKey}</code></div>
      <p>Refresh license material (optional <code>RefreshLicenseDto</code>).</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{licenseKey}/activations</code></div>
      <p>Anonymous activation snapshot.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}/download</code></div>
      <p>Authorized download of license file bytes.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/generate-file</code></div>
      <p>Regenerate license file.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/revoke</code></div>
      <p>Revoke license.</p></div>
      <p>Additional routes cover hardware binding, transfers, and pending bindings; explore responses from your host under the same prefix.</p>
      <p>${L('/guides/platform/licenses', 'Vendor licenses guide')} · ${L('/sdk/license-client', 'SDK LicenseClient')}</p>
    `,
  },
  'activations-sessions': {
    title: 'Activations & sessions',
    lead: 'Runtime enforcement and telemetry at the API boundary.',
    body: `
      <p><strong>Activations</strong> routes manage device bindings, seat consumption, and activation history. <strong>Sessions</strong> routes manage live sessions: creation, heartbeat, termination — important for floating and online-validated models.</p>
      <h2>When to use which</h2>
      <ul>
        <li><strong>Activations</strong> — durable claim that a machine or identity is using the license.</li>
        <li><strong>Sessions</strong> — short-lived online heartbeat; ideal for concurrent limits and live dashboards.</li>
      </ul>
      <h2>Auth</h2>
      <p>Operator dashboards use JWT. SDK and anonymous flows use the product API key only where each route allows it.</p>
      <p>${L('/guides/platform/activations', 'Activations guide')} · ${L('/guides/platform/sessions', 'Sessions guide')} · ${L('/sessions-activations', 'Combined narrative')} · ${L('/sdk/activation-session', 'SDK managers')}</p>
    `,
  },
  'trials-transfers': {
    title: 'Trials & transfers',
    lead: 'Evaluation extensions and license transfer flows.',
    body: `
      <p><strong>Trials</strong> — routes under your host’s trials surface support campaigns, extensions, and evaluation windows aligned with dashboard <strong>Trials</strong> pages.</p>
      <p><strong>Transfers</strong> — move entitlements between identities, devices, or organizations according to your business rules; confirm prerequisites and side effects with test calls on your deployment.</p>
      <p>${L('/guides/platform/trials', 'Trials platform guide')} · ${L('/trial-license', 'Trial license model')}</p>
    `,
  },
  telemetry: {
    title: 'Telemetry, logs & notifications',
    lead: 'Analytics, statistics, audit trails, SDK logs, and in-app notifications.',
    body: `
      <ul>
        <li><code>/api/Analytics/...</code> — adoption and usage aggregates for charts.</li>
        <li><code>/api/Statistics/...</code> — supplementary metrics and rollups.</li>
        <li><code>/api/AuditLogs/...</code> — security-relevant audit trail for sensitive actions.</li>
        <li><code>/api/DashboardLogs/...</code> — operator and UI event diagnostics.</li>
        <li><code>/api/SdkLogs/...</code> — optional log shipping from fielded SDKs.</li>
        <li><code>/api/Notifications/...</code> — in-app notification feed for dashboard users.</li>
      </ul>
      <p>Most of these routes require JWT with analytics or admin roles depending on the operation.</p>
      <p>${L('/guides/platform/analytics', 'Analytics guide')}</p>
    `,
  },
  storage: {
    title: 'Storage APIs',
    lead: 'Connectors for release artifacts.',
    body: `
      <p>Three parallel surfaces for different backends:</p>
      <ul>
        <li><code>/api/Storage/...</code> — Google Drive–backed flows (as configured).</li>
        <li><code>/api/OneDriveStorage/...</code> — Microsoft Graph / OneDrive integration.</li>
        <li><code>/api/CustomServerStorage/...</code> — your own SFTP/HTTP storage endpoint.</li>
      </ul>
      <p>Each implements list/upload/delete semantics appropriate to the provider; filenames and MIME types are validated server-side.</p>
      <p>${L('/guides/platform/storage', 'Storage platform guide')}</p>
    `,
  },
  'sdk-host': {
    title: 'SDK-facing host APIs',
    lead: 'Settings and update checks consumed from customer apps.',
    body: `
      <p><code>/api/SdkSettings/...</code> — product-scoped SDK configuration (feature flags, endpoints, tuning) delivered to licensed clients.</p>
      <p><code>/api/Updates/...</code> — release and update metadata consumed by <code>SdkUpdateManager</code> for license-aware updates.</p>
      <p>Customer apps call these with the product API key or anonymous patterns where each route allows — not the vendor JWT.</p>
      <p>${L('/sdk/updates-logging', 'SDK updates &amp; logging')} · ${L('/sdk/dotnet', '.NET integration')}</p>
    `,
  },
  billing: {
    title: 'Subscriptions & payments',
    lead: 'Commerce surfaces for SaaS billing (role-gated).',
    body: `
      <p><code>/api/Subscriptions/...</code> — subscription lifecycle, entitlements tied to billing.</p>
      <p><code>/api/Payments/...</code> — payment intents, receipts, and provider webhooks (as implemented for your deployment).</p>
      <p>Many actions require elevated tenant roles; some may be host-only in multi-tenant deployments. Treat every operation as <strong>plan- and role-gated</strong> until you have verified access on your environment.</p>
    `,
  },
  admin: {
    title: 'Administration & jobs',
    lead: 'Background jobs, platform settings, email, tickets.',
    body: `
      <ul>
        <li><code>/api/Admin/...</code> — elevated maintenance (tenant or host scope).</li>
        <li><code>/api/Jobs/...</code> — visibility into scheduled/async work (imports, rollups, email batches).</li>
        <li><code>/api/Settings/...</code> — system or tenant configuration keys.</li>
        <li><code>/api/Email/...</code> — diagnostics and template triggers where exposed.</li>
        <li><code>/api/Tickets/...</code> — support ticket integration for vendor helpdesk flows.</li>
      </ul>
      <p>These areas are the most role-sensitive; integrate only after mapping your tenant’s RBAC to the policies enforced on each route.</p>
    `,
  },
};

export function getApiTopic(slug: string): DocTopic | null {
  return API_TOPICS[slug] ?? null;
}
