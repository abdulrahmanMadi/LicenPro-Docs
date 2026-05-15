import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';
const OPENAPI = `${HOST}/swagger/v1/swagger.json`;

export const API_TOPICS: Record<string, DocTopic> = {
  'auth-users': {
    title: 'Authentication & users',
    lead: 'JWT for dashboard operators; user and role management APIs.',
    body: `
      <p>Base URL for all samples: <code>${HOST}/api</code>. OpenAPI: <a class="doc-inline-link" href="${OPENAPI}" target="_blank" rel="noopener">${OPENAPI}</a>.</p>
      <h2>Authentication model</h2>
      <p>Dashboard and vendor automation use <strong>Bearer JWT</strong> from <code>AuthController</code> (login, refresh, registration, external providers where enabled). Attach <code>Authorization: Bearer &lt;token&gt;</code> to management routes unless explicitly anonymous.</p>
      <h2>Controllers</h2>
      <ul>
        <li><code>AuthController</code> — sign-in, refresh tokens, password flows, external identity hooks.</li>
        <li><code>UsersController</code> — profiles, invitations, product membership, preferences.</li>
        <li><code>RoleController</code> — role catalog and assignments for RBAC-aware actions.</li>
      </ul>
      <p>Anonymous customer validation uses the <strong>product API key</strong> on <code>LicensesController</code> — not the user JWT. See ${L('/api/overview', 'API overview')} and ${L('/api/licenses', 'Licenses API')}.</p>
    `,
  },
  security: {
    title: 'Security utilities',
    lead: 'Key derivation, session listing, and hardening helpers.',
    body: `
      <p>Prefix: <code>/api/security</code> (<code>SecurityController</code>). Requires authenticated dashboard/service context unless a specific action is documented as anonymous in OpenAPI.</p>
      <ul>
        <li><code>POST /api/security/derive-key</code> — body: <code>licenseKey</code>, <code>saltBase64</code>; returns derived key material for protected file flows.</li>
        <li>Session discovery and revocation helpers for operators (exact action names in Swagger).</li>
      </ul>
      <p>Always confirm request bodies and response DTOs in <a class="doc-inline-link" href="${OPENAPI}" target="_blank" rel="noopener">OpenAPI</a> before integrating.</p>
    `,
  },
  organizations: {
    title: 'Organizations API',
    lead: 'Tenant metadata, membership, invitations.',
    body: `
      <p><code>OrganizationController</code> backs the organization workspace in the dashboard (members, invites, tenant-scoped lists). ASP.NET route naming may use <code>/api/Organization/...</code> — verify exact segments in Swagger.</p>
      <h2>Typical integration sequence</h2>
      <ol style="margin-left:1.25rem;">
        <li>Authenticate as a vendor operator (JWT).</li>
        <li>List organizations or fetch a tenant by id.</li>
        <li>Create or revoke invitations; accept flows as documented.</li>
        <li>Link to products under that org from <code>ProductsController</code>.</li>
      </ol>
      <p>${L('/guides/platform/organizations', 'Organizations platform guide')}</p>
    `,
  },
  catalog: {
    title: 'Products, releases, features & entitlements',
    lead: 'Everything you define before issuing a license.',
    body: `
      <h2>Products &amp; RSA keys</h2>
      <p><code>ProductsController</code> — prefix <code>/api/Products</code>. Common operations:</p>
      <ul>
        <li><code>POST /api/Products/{id}/keys/generate</code> — create key material for signing.</li>
        <li><code>GET /api/Products/{id}/keys/status</code> — readiness of keys.</li>
        <li><code>GET /api/Products/{id}/keys/public</code> and <code>.../public/download</code> — distribute public key to SDK clients.</li>
      </ul>
      <h2>Releases &amp; entitlements</h2>
      <p><code>SoftwareReleasesController</code> — release lines and metadata.<br/>
      <code>EntitlementSetsController</code> — bundle features for assignment to licenses.<br/>
      <code>FeaturesController</code> — feature definitions and CRUD.</p>
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
      <p><code>LicensesController</code> — prefix <code>/api/Licenses</code>. Hosted example: <code>${HOST}/api/Licenses/validate</code>.</p>
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
      <p>Hardware binding, transfers, pending bindings — see OpenAPI for the exhaustive list.</p>
      <p>${L('/guides/platform/licenses', 'Vendor licenses guide')} · ${L('/sdk/license-client', 'SDK LicenseClient')}</p>
    `,
  },
  'activations-sessions': {
    title: 'Activations & sessions',
    lead: 'Runtime enforcement and telemetry at the API boundary.',
    body: `
      <p><code>ActivationsController</code> manages device bindings, seat consumption, and activation history. <code>SessionsController</code> manages live sessions: creation, heartbeat, termination — used heavily by floating and online-validated models.</p>
      <h2>When to use which</h2>
      <ul>
        <li><strong>Activations</strong> — durable claim that a machine or identity is using the license.</li>
        <li><strong>Sessions</strong> — short-lived online heartbeat; ideal for concurrent limits and live dashboards.</li>
      </ul>
      <h2>Auth</h2>
      <p>Operator dashboards use JWT. SDK and anonymous flows use product-scoped keys where documented on each action in Swagger.</p>
      <p>${L('/guides/platform/activations', 'Activations guide')} · ${L('/guides/platform/sessions', 'Sessions guide')} · ${L('/sessions-activations', 'Combined narrative')} · ${L('/sdk/activation-session', 'SDK managers')}</p>
    `,
  },
  'trials-transfers': {
    title: 'Trials & transfers',
    lead: 'Evaluation extensions and license transfer flows.',
    body: `
      <p><code>TrialsController</code> — trial campaigns, extensions, and evaluation windows aligned with dashboard <strong>Trials</strong> pages.</p>
      <p><code>TransfersController</code> — move entitlements between identities, devices, or organizations according to your business rules (always confirm prerequisites and side effects in OpenAPI).</p>
      <p>${L('/guides/platform/trials', 'Trials platform guide')} · ${L('/trial-license', 'Trial license model')}</p>
    `,
  },
  telemetry: {
    title: 'Telemetry, logs & notifications',
    lead: 'Analytics, statistics, audit trails, SDK logs, and in-app notifications.',
    body: `
      <ul>
        <li><code>AnalyticsController</code> — adoption and usage aggregates for charts.</li>
        <li><code>StatisticsController</code> — supplementary metrics and rollups.</li>
        <li><code>AuditLogsController</code> — security-relevant audit trail for sensitive actions.</li>
        <li><code>DashboardLogsController</code> — operator and UI event diagnostics.</li>
        <li><code>SdkLogsController</code> — optional log shipping from fielded SDKs.</li>
        <li><code>NotificationsController</code> — in-app notification feed for dashboard users.</li>
      </ul>
      <p>Most endpoints require JWT with analytics or admin roles depending on the operation — check each operation’s security scheme in Swagger.</p>
      <p>${L('/guides/platform/analytics', 'Analytics guide')}</p>
    `,
  },
  storage: {
    title: 'Storage APIs',
    lead: 'Connectors for release artifacts.',
    body: `
      <p>Three parallel surfaces for different backends:</p>
      <ul>
        <li><code>StorageController</code> — Google Drive–backed flows (as configured).</li>
        <li><code>OneDriveStorageController</code> — Microsoft Graph / OneDrive integration.</li>
        <li><code>CustomServerStorageController</code> — your own SFTP/HTTP storage endpoint.</li>
      </ul>
      <p>Each implements list/upload/delete semantics appropriate to the provider; filenames and MIME types are validated server-side.</p>
      <p>${L('/guides/platform/storage', 'Storage platform guide')}</p>
    `,
  },
  'sdk-host': {
    title: 'SDK-facing host APIs',
    lead: 'Settings and update checks consumed from customer apps.',
    body: `
      <p><code>SdkSettingsController</code> — product-scoped SDK configuration (feature flags, endpoints, tuning) delivered to licensed clients.</p>
      <p><code>UpdatesController</code> — release/update metadata consumed by <code>SdkUpdateManager</code> for license-aware updates.</p>
      <p>Customer apps call these with the product API key or anonymous patterns as documented per operation — not the vendor JWT.</p>
      <p>${L('/sdk/updates-logging', 'SDK updates &amp; logging')} · ${L('/sdk/dotnet', '.NET integration')}</p>
    `,
  },
  billing: {
    title: 'Subscriptions & payments',
    lead: 'Commerce surfaces for SaaS billing (role-gated).',
    body: `
      <p><code>SubscriptionsController</code> — subscription lifecycle, entitlements tied to billing.</p>
      <p><code>PaymentsController</code> — payment intents, receipts, and provider webhooks (as implemented for your deployment).</p>
      <p>Many actions require elevated tenant roles; some may be host-only in multi-tenant deployments. Treat every operation as <strong>plan- and role-gated</strong> until verified in OpenAPI.</p>
    `,
  },
  admin: {
    title: 'Administration & jobs',
    lead: 'Background jobs, platform settings, email, tickets.',
    body: `
      <ul>
        <li><code>AdminController</code> — elevated maintenance (tenant or host scope).</li>
        <li><code>JobsController</code> — visibility into scheduled/async work (imports, rollups, email batches).</li>
        <li><code>SettingsController</code> — system or tenant configuration keys.</li>
        <li><code>EmailController</code> — diagnostics and template triggers where exposed.</li>
        <li><code>TicketsController</code> — support ticket integration for vendor helpdesk flows.</li>
      </ul>
      <p>These controllers are the most role-sensitive; integrate only after mapping your tenant’s RBAC to the documented policies.</p>
    `,
  },
};

export function getApiTopic(slug: string): DocTopic | null {
  return API_TOPICS[slug] ?? null;
}
