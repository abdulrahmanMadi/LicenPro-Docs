import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  `<a class="doc-inline-link" href="${path}">${label}</a>`;

/** Dashboard screenshot with lightbox (full-resolution asset, no compression). */
const screenshot = (file: string, alt: string) =>
  `<figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/${file}" data-doc-image-alt="${alt}" aria-label="View screenshot full size">
      <img src="assets/docs/${file}" alt="${alt}" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Click image to open full-resolution preview.</figcaption>
  </figure>`;

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
        <figcaption class="doc-figure-caption">Click image to open full-resolution preview.</figcaption>
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
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-overview-who-does-what.png" data-doc-image-alt="Who does what: vendor operators in the dashboard, integrators and automation from CI and billing, and customer applications with SDK or HTTPS—all via the LicenPro REST API" aria-label="View who does what diagram full size">
          <img src="assets/docs/platform-overview-who-does-what.png" alt="Who does what: vendor operators in the dashboard, integrators and automation from CI and billing, and customer applications with SDK or HTTPS—all via the LicenPro REST API" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">Click image to open full-resolution preview.</figcaption>
      </figure>
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
        <li><strong>Licenses</strong> — choose model (perpetual, trial, subscription, floating, concurrent, node-locked, credit-based, usage-based, …), set limits, export <code>license.bin</code> and the license key.</li>
      </ol>
      <p>Deeper reads: ${link('/guides/platform/organizations', 'Organizations')} · ${link('/first-organization', 'First organization')} · ${link('/guides/platform/products', 'Products')} · ${link('/guides/platform/releases', 'Releases')} · ${link('/guides/platform/features-entitlements', 'Features &amp; entitlements')} · ${link('/rsa-keys', 'RSA keys')} · ${link('/guides/platform/licenses', 'Licenses (vendor)')} · ${link('/first-product', 'First product')} · ${link('/first-license', 'First license')}.</p>

      <h2>Dashboard navigation map</h2>
      <p>Main sidebar areas and where to read more:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Home</strong> (<code>/dashboard</code>) — KPI widgets, recent licenses/products.</li>
        <li><strong>Organizations</strong> — ${link('/guides/platform/organizations', 'Organizations guide')} · tabs: Overview, Products, Members, Invitations, Audit, Settings.</li>
        <li><strong>Products</strong> — ${link('/guides/platform/products', 'Products guide')} · tabs: Overview, Features, Entitlements, Releases, Licenses, Users, Access Matrix, Audit, Settings.</li>
        <li><strong>Releases</strong> — ${link('/guides/platform/releases', 'Releases guide')} (global + per-product tab).</li>
        <li><strong>Licenses</strong> — ${link('/guides/platform/licenses', 'Licenses guide')} · wizard + detail tabs (Overview, Activations, Sessions, Usage, Device).</li>
        <li><strong>Activations</strong> — ${link('/guides/platform/activations', 'Activations guide')}.</li>
        <li><strong>Sessions</strong> — ${link('/guides/platform/sessions', 'Sessions guide')}.</li>
        <li><strong>Trials</strong> — ${link('/guides/platform/trials', 'Trials guide')}.</li>
        <li><strong>Storage</strong> — ${link('/guides/platform/storage', 'Storage guide')} (Drive, OneDrive, custom server).</li>
        <li><strong>Analytics</strong> — ${link('/guides/platform/analytics', 'Analytics guide')}.</li>
        <li><strong>Account settings</strong> — ${link('/guides/platform/account-settings', 'Account settings')} (profile, security, plan, API keys).</li>
        <li><strong>My Audit</strong> (<code>/dashboard/audit-logs</code>) — personal audit trail; see Analytics guide.</li>
      </ul>

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
        <li><strong>License models</strong> — perpetual, trial, subscription, floating, concurrent, node-locked, credit-based, usage-based (sidebar <em>License models</em>).</li>
        <li><strong>Webhooks</strong> — ${link('/webhooks', 'Webhooks')} for lifecycle events to your backend without polling.</li>
        <li><strong>Updates &amp; logging</strong> — ${link('/sdk/updates-logging', 'SDK updates &amp; logging')} for license-aware update checks and structured logs.</li>
      </ul>
    `,
  },
  organizations: {
    title: 'Organizations',
    lead: 'Tenant boundary for your team, products, invitations, and audit context. Understand org roles, each dashboard tab, and the member lifecycle from invite through removal.',
    body: `
      <p>Every vendor operates inside an <strong>organization</strong>—a tenant that groups people, assigned products, policies, and audit history. Licenses are issued under <strong>products</strong>, but the organization defines who can see and manage them.</p>
      <p>Onboarding walkthrough: ${link('/first-organization', 'Create your first organization')}.</p>

      <h2>Role model (read this first)</h2>
      <p>LicenPro uses <strong>three permission layers</strong>. Dashboard docs often mention “admin” in more than one sense—map each action to the correct layer:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>System JWT role</strong> — <code>Admin</code> (platform operator) or <code>User</code> (registered vendor). Controls sidebar items like system logs, tickets, and subscribers. Does <em>not</em> automatically make someone a product owner.</li>
        <li><strong>Organization role</strong> — your membership in a tenant: <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code>, <code>Member</code>, <code>Viewer</code>, or <code>ResellerAdmin</code> (backend). Stored as <code>myRole</code> on the org record.</li>
        <li><strong>Product ownership</strong> — listed in <code>product.owners</code>. Required for license CRUD, RSA keys, Users tab, Access Matrix, and most Settings actions—even if your org role is Admin.</li>
      </ul>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">UI vs API</span>
        <p>Some route guards only verify that you are a signed-in platform user. <strong>Authoritative checks run on the API.</strong> If a button appears but the server returns 403, your org or product role lacks that permission.</p>
      </div></div>

      <h2>Organization lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Create</strong> — wizard at <code>/dashboard/organizations</code> (Identity: name, website, default entry role; Branding: logo, colors, description).</li>
        <li><strong>Configure</strong> — settings tab: policies (self-registration, approval), default member role, branding.</li>
        <li><strong>Invite</strong> — email invitations with role; accept via <code>/auth/accept-invitation?token=…</code> (login required).</li>
        <li><strong>Assign products</strong> — link products to the org; add product owners and access-matrix rows per release.</li>
        <li><strong>Operate</strong> — members use org overview analytics; admins manage team and audit.</li>
        <li><strong>Transfer or delete</strong> — ownership transfer (Owner); org delete (Owner only, destructive).</li>
      </ol>

      <h2>Organization tabs</h2>
      <p>Each tab is a child route under the org layout. Tabs for <strong>Members</strong>, <strong>Invitations</strong>, <strong>Audit Logs</strong>, and <strong>Settings</strong> appear only when <code>myRole</code> is <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code>, or <code>ResellerAdmin</code>. <strong>Overview</strong> and <strong>Products</strong> are visible to all members.</p>

      <h3>Overview</h3>
      <p>Default landing tab when you open an organization. Use it to answer “what is happening in this tenant right now?” before you drill into products or licenses.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Summary cards</strong> — member count, assigned products, license totals, and activation trends scoped to this org.</li>
        <li><strong>License mix</strong> — quick view of perpetual, trial, subscription, floating, and concurrent keys tied to org products.</li>
        <li><strong>Recent activity</strong> — shortcuts to the latest license events and team changes without opening Audit Logs.</li>
        <li><strong>Context switch</strong> — if you belong to multiple orgs, confirm the org name in the header before acting on data.</li>
      </ul>
      <p><strong>Typical tasks:</strong> weekly health check, executive snapshot before a renewal call, verify a new product assignment landed.</p>

      <h3>Products</h3>
      <p>Catalog of software products linked to this organization. Assignment here does <em>not</em> issue licenses—it grants the org (and its members) visibility and access paths to products you already created in your vendor account.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Assign product</strong> — Owner / Admin opens <strong>Assign Product</strong>, searches the vendor catalog, and links one or more products. Members then see assigned products on this tab and in their sidebar (subject to access matrix rules on each product).</li>
        <li><strong>Unassign</strong> — removes org linkage; does not delete the product or its licenses platform-wide.</li>
        <li><strong>Member view</strong> — Members and Viewers only see products they are assigned to or granted via per-release access matrix rows—not every product in your account.</li>
        <li><strong>Next step</strong> — after assignment, product owners add users and matrix rows on the product workspace (${link('/guides/platform/products', 'Products guide')}).</li>
      </ul>
      ${screenshot('platform-organization-assign-product.png', 'Assign Product modal: select products to link to the organization')}

      <h3>Members</h3>
      <p>Authoritative team directory for the organization: who belongs, what org role they hold, and when they joined.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Invite</strong> — email + role: Member, Viewer, ProductOwner, or Admin (only Owner can assign Admin).</li>
        <li><strong>Change role</strong> — Owner, Admin, or ResellerAdmin; Owner-only rules apply when promoting to Admin.</li>
        <li><strong>Remove</strong> — Owner, Admin, ProductOwner, ResellerAdmin; cannot remove the Owner.</li>
        <li><strong>Role vs product access</strong> — org role controls org tabs; product owners and access matrix control per-product license work.</li>
      </ul>
      <p><strong>Role quick guide:</strong> Member = contribute on assigned products; Viewer = read-only; ProductOwner = manage products/licenses without full org admin; Admin = team + settings except Owner-only actions.</p>
      ${screenshot('platform-organization-invite-member.png', 'Invite Team Member modal: email, assigned role, and invitation message')}

      <h3>Invitations</h3>
      <p>Operational queue for people who have not yet accepted. Use it when onboarding is stuck or you need to revoke a mistaken invite.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Status</strong> — Pending, expired, or revoked; filter and search by recipient email.</li>
        <li><strong>Resend</strong> — generates a fresh token email without changing the chosen role.</li>
        <li><strong>Revoke</strong> — invalidates the link immediately; recipient must receive a new invite.</li>
        <li><strong>Expiry</strong> — each row shows when the token expires; expired invites cannot be accepted until resent.</li>
        <li><strong>Roles in UI</strong> — Member, Viewer, Admin on this tab; Members tab also offers ProductOwner when inviting.</li>
      </ul>
      ${screenshot('platform-organization-invitations.png', 'Organization Team Invitations tab: pending invites with role, status, and expiry')}

      <h3>Audit Logs</h3>
      <p>Immutable org-scoped trail for compliance and support: who changed team membership, assigned products, or org settings.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Columns</strong> — timestamp, action (e.g. InvitationSent, LicenseCreated), product, entity type, entity name, IP address.</li>
        <li><strong>Filters</strong> — action type, entity type, date range, and free-text search across user, entity, or product.</li>
        <li><strong>Export CSV</strong> — download the filtered view for SIEM or spreadsheet analysis.</li>
        <li><strong>Details</strong> — eye icon opens structured payload for a single event.</li>
        <li><strong>Pair with Analytics</strong> — audit is point-in-time; ${link('/guides/platform/analytics', 'Analytics')} shows trends over time.</li>
      </ul>
      ${screenshot('platform-organization-audit-logs.png', 'Organization Audit Logs tab: license and invitation activity with filters and export')}

      <h3>Settings</h3>
      <p>Owner-focused configuration split into sub-sections (left nav inside Settings):</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — entity name, registry ID, rich-text description, and public website URL shown on the org profile.</li>
        <li><strong>Branding</strong> — logo and colors for org presentation in the dashboard and invitations.</li>
        <li><strong>Policies</strong> — <code>allowSelfRegistration</code>, <code>requireApprovalForJoining</code>, and <code>defaultMemberRole</code> for new joiners (Member, Viewer, or Admin).</li>
        <li><strong>Governance</strong> — ownership transfer and advanced policy toggles where your deployment exposes them.</li>
        <li><strong>Danger zone</strong> — delete organization (Owner only; irreversible; licenses under org products may cascade per server policy).</li>
      </ul>
      <p><strong>Before you save:</strong> description and website are customer-facing on the org header; policy changes affect the next invitation or self-registration attempt, not retroactively on existing members.</p>
      ${screenshot('platform-organization-settings-general.png', 'Organization Settings General Configuration: name, description, website, and branding sub-nav')}

      <h2>Organization roles matrix</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Owner</strong> — full tenant control: delete org, transfer ownership, assign Admin, all invite/remove/role operations.</li>
        <li><strong>Admin</strong> — invite, change roles (not to Owner; cannot assign Admin—that is Owner-only), remove members; cannot delete org.</li>
        <li><strong>ProductOwner</strong> — invite and remove members; manage assigned products/licenses; no org delete or Admin promotion.</li>
        <li><strong>Member</strong> — view org overview and assigned products; use licenses per product access matrix; no member management tabs in UI.</li>
        <li><strong>Viewer</strong> — read-only org access; product visibility via access matrix only.</li>
        <li><strong>ResellerAdmin</strong> — backend role treated like Admin for many org operations (partial UI surfacing).</li>
      </ul>

      <h2>Invitation workflow (step-by-step)</h2>
      <ol style="margin-left:1.25rem;">
        <li>Admin opens <strong>Members</strong> or <strong>Invitations</strong> → <strong>Invite</strong>.</li>
        <li>Enter email, pick role, optional message → send.</li>
        <li>Recipient receives email with token link.</li>
        <li>Recipient signs in (or registers) → <code>/auth/accept-invitation?token=…</code>.</li>
        <li>On success, user is added to org with chosen role → redirect to <code>/dashboard/organization/:orgId</code>.</li>
        <li>Operator can resend or cancel pending rows from <strong>Invitations</strong>.</li>
      </ol>

      <h2>REST automation</h2>
      <p>Routes under <code>/api/Organization/…</code> mirror dashboard flows: CRUD, members, invitations, policies. Use operator JWT or scoped account API keys (${link('/rsa-keys', 'API keys guide')}).</p>
      <p>${link('/api/organizations', 'Organizations API')} · ${link('/api/auth-users', 'Auth &amp; users')} · ${link('/guides/platform/products', 'Products')} · ${link('/guides/platform/overview', 'System overview')}</p>
    `,
  },
  products: {
    title: 'Products',
    lead: 'The anchor for RSA keys, releases, entitlements, licenses, and API credentials. Every product tab, access type, owner rule, and settings section explained.',
    body: `
      <p>A <strong>product</strong> is the software you license. All license files, validation traffic, RSA signing keys, and product <code>X-API-KEY</code> values belong to one product id. Organizations assign products to tenants; <strong>product owners</strong> run day-to-day licensing.</p>
      <p>Walkthrough: ${link('/first-product', 'Create your first product')} · ${link('/rsa-keys', 'RSA keys &amp; API credentials')}.</p>

      <h2>Product lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Create</strong> — name, initial release version/level, access type (Associated vs Opened), optional description and image.</li>
        <li><strong>Configure</strong> — Features, entitlement sets, client-update settings, RSA keys in Settings.</li>
        <li><strong>Staff</strong> — add org members on <strong>Users</strong> tab; refine release access on <strong>Access Matrix</strong>.</li>
        <li><strong>Release</strong> — ship version lines under <strong>Releases</strong> tab (${link('/guides/platform/releases', 'Releases guide')}).</li>
        <li><strong>Issue licenses</strong> — <strong>Licenses</strong> tab or global list (${link('/guides/platform/licenses', 'Licenses guide')}).</li>
        <li><strong>Operate</strong> — activations, sessions, analytics filtered to this product.</li>
        <li><strong>Retire</strong> — deactivate or delete from Settings danger zone (cascades releases and licenses).</li>
      </ol>

      <h2>Access types: Associated vs Opened</h2>
      <p>Chosen at create time; drives UI and license rules:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Associated (Organization)</strong> — full vendor workflow. All product tabs, all license types (subject to plan). Licenses tie to org context; only assigned org users access the product.</li>
        <li><strong>Opened (All users)</strong> — simplified distribution. Dashboard shows only <strong>Overview</strong> and <strong>Releases</strong> tabs. License creation is restricted (e.g. perpetual offline patterns); intended for broadly opened software catalogs.</li>
      </ul>

      <h2>Product tabs (full owner view)</h2>
      <p>Tab visibility is computed in the product layout:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Opened products</strong> — Overview + Releases only.</li>
        <li><strong>End user</strong> (not in <code>owners[]</code>, not system Admin) — Overview, Releases, Licenses (no Settings, Users, Access Matrix, Audit, Features, Entitlements).</li>
        <li><strong>Product owner or system Admin</strong> — all tabs below.</li>
      </ul>

      <h3>Overview</h3>
      <p>Default tab after opening a product. Confirms access type, owner list, current release line, and license counts before you issue keys or edit entitlements.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Status badge</strong> — Active vs locked (subscription/plan limits may block management).</li>
        <li><strong>Quick counts</strong> — releases, licenses, recent activations where the UI surfaces them.</li>
        <li><strong>Owners</strong> — who can manage RSA keys, Users, Access Matrix, and license CRUD.</li>
        <li><strong>End-user landing</strong> — assigned Members often start here then open Releases or Licenses.</li>
      </ul>

      <h3>Features</h3>
      <p>Capability catalog for this product. Each feature becomes a stable key your app checks at runtime via the SDK <code>FeatureManager</code>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Feature</strong> — name, description, and assignment to entitlement groups (Groub/Group tags in UI).</li>
        <li><strong>Search</strong> — filter long catalogs before bundling into sets.</li>
        <li><strong>Do not skip keys</strong> — feature keys must stay stable across releases; renaming breaks signed entitlements in the field.</li>
      </ul>
      <p>Deep dive: ${link('/guides/platform/features-entitlements', 'Features &amp; entitlements')}.</p>

      <h3>Entitlement Sets</h3>
      <p>Reusable SKUs that bundle features for license issuance. Operators pick a set in the license wizard instead of toggling dozens of flags per customer.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Set</strong> — name, description, linked releases, and member features with per-feature values.</li>
        <li><strong>Release scope</strong> — sets can target specific version lines (e.g. 1.0.0 vs 1.0.3).</li>
        <li><strong>License wizard</strong> — optional dropdown on step 1 attaches packaged entitlements to new keys.</li>
      </ul>

      <h3>Releases</h3>
      <p>Version lines for this product. Every license binds to one release id for validation, entitlement scope, and SDK update checks.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>New Release</strong> — multi-step wizard: basic info, entitlement sets, files, notes.</li>
        <li><strong>Table columns</strong> — version, type (Stable/Beta/…), published status, created/released dates, license count.</li>
        <li><strong>Global list</strong> — sidebar <strong>Releases</strong> shows cross-product view; product tab is the primary operator path.</li>
      </ul>
      <p>See ${link('/guides/platform/releases', 'Releases guide')} for draft vs published and artifact linking.</p>

      <h3>Licenses</h3>
      <p>Issue, edit, revoke, and download license material for this product.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create</strong> — two-step wizard (type, product, release, entitlement set → seats, expiry, notes).</li>
        <li><strong>Distribute</strong> — license key string + signed <code>license.bin</code> from detail view.</li>
        <li><strong>Member view</strong> — assigned users see licenses they can activate; management buttons require ownership.</li>
        <li><strong>Types</strong> — perpetual, trial, subscription, floating, concurrent, node-locked, credit-based, usage-based (${link('/guides/platform/licenses', 'Licenses guide')}).</li>
      </ul>

      <h3>Users</h3>
      <p>Onboard organization members onto this product. Users added here gain product scope but <strong>no release access until the Access Matrix grants versions</strong>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Select organization</strong> — dropdown lists orgs where this product is assigned.</li>
        <li><strong>Multi-select members</strong> — pick people who are not already on the product.</li>
        <li><strong>Empty state</strong> — when every org member is already assigned, the modal explains that onboarding is complete.</li>
        <li><strong>Owners</strong> — listed in <code>product.owners</code>; separate from Users tab assignment.</li>
      </ul>
      ${screenshot('platform-product-add-user.png', 'Add User modal: onboard organization members to the product')}

      <h3>Access Matrix</h3>
      <p>Fine-grained per-user, per-release grants. Essential when org Members should see only specific version lines or when Viewers need read-only release access.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Manage Access</strong> — checkbox list of all published releases plus <strong>Grant to all versions</strong> (includes future releases).</li>
        <li><strong>Search versions</strong> — filter long release lists inside the modal.</li>
        <li><strong>Status banner</strong> — shows how many versions a user already has vs total available.</li>
        <li><strong>Without matrix rows</strong> — assigned Members may see the product but cannot activate licenses on blocked versions.</li>
      </ul>
      ${screenshot('platform-product-access-matrix-manage.png', 'Manage Access modal: grant version access per user including future releases')}

      <h3>Audit Logs</h3>
      <p>Product-scoped audit trail—narrower than org audit but includes license lifecycle events tied to this software.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Typical actions</strong> — LicenseCreated, LicenseDeleted, LicenseFileDownload, InvitationSent (when product context applies).</li>
        <li><strong>Filters &amp; export</strong> — same pattern as org audit: action, entity type, date range, CSV export.</li>
        <li><strong>Support workflow</strong> — correlate customer ticket with IP and timestamp before revoking a key.</li>
      </ul>
      ${screenshot('platform-product-audit-logs.png', 'Product Audit Logs tab: license creation, download, and invitation activity')}

      <h3>Settings</h3>
      <p>Product owners configure runtime behavior and cryptographic material. End users and non-owners never see this tab.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — name, description, status, access type (where editable after create).</li>
        <li><strong>Client product updates</strong> — toggle <strong>Offer product updates to clients</strong>; when disabled, update APIs return no upgrade for this product.</li>
        <li><strong>License signing keys (RSA)</strong> — generate, regenerate, download public PEM; private key never leaves the server (${link('/rsa-keys', 'RSA guide')}).</li>
        <li><strong>Danger zone</strong> — delete product; releases and licenses cascade.</li>
      </ul>
      <p><strong>Rotation warning:</strong> regenerating RSA keys invalidates existing <code>license.bin</code> files until customers re-download licenses and apps embed the new public key.</p>
      ${screenshot('platform-product-settings-rsa-keys.png', 'Product Settings: client updates toggle and License signing keys with regenerate and download public key')}

      <h2>Who can do what on products</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>System Admin (JWT)</strong> — bypasses many ownership checks on API; sees admin sidebar.</li>
        <li><strong>Product owner</strong> — full tab set (except Opened trim); create/edit licenses, RSA keys, Users, Access Matrix.</li>
        <li><strong>Assigned Member</strong> — Overview, Releases, Licenses (consume/activate per matrix); no Settings.</li>
        <li><strong>Viewer</strong> — read-only paths via access matrix; no license creation.</li>
        <li><strong>Org Admin without ownership</strong> — org team management but not product RSA keys unless also listed as owner.</li>
      </ul>

      <h2>REST &amp; runtime</h2>
      <p><code>/api/Products/…</code> — CRUD, RSA key routes, settings. Customer apps use product <code>X-API-KEY</code> on anonymous license routes—not your operator JWT.</p>
      <p>${link('/api/catalog', 'Products &amp; releases API')} · ${link('/api/licenses', 'Licenses API')} · ${link('/sdk/dotnet', '.NET SDK')} · ${link('/guides/platform/overview', 'System overview')}</p>
    `,
  },
  releases: {
    title: 'Releases',
    lead: 'Software version lines that licenses target and the update checker uses. Global list vs product tab, release levels, and lifecycle from draft to deprecated.',
    body: `
      <p>A <strong>software release</strong> is a version line under a product—e.g. <code>1.0.0 Stable</code> or <code>2.0.0-beta</code>. Every issued license references a release id so validation, entitlements, and update checks know which build channel applies.</p>

      <h2>Why releases matter in the lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Product create</strong> — initial version seeds the first release (see ${link('/first-product', 'First product')}).</li>
        <li><strong>License create</strong> — operator picks <code>softwareReleaseId</code> in step 1 of the wizard.</li>
        <li><strong>SDK validation</strong> — license payload carries release metadata; mismatched app version may fail policy checks.</li>
        <li><strong>Updates</strong> — SDK update managers and <code>/api/Updates/…</code> compare client version to release catalog.</li>
        <li><strong>Access matrix</strong> — grant members access per release row, not only per product.</li>
      </ol>

      <h2>Product Releases tab</h2>
      <p>Primary operator surface for version management inside a product workspace. The global <strong>Releases</strong> sidebar item shows the same data across all products you can access.</p>
      ${screenshot('platform-product-releases-list.png', 'Product Releases tab: version list with type, status, and license counts')}

      <h2>Release fields (typical)</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Version string</strong> — semantic (<code>1.0.0</code>), pre-release (<code>1.0.0-alpha.1</code>), simple (<code>1</code>), or build-based (<code>1.0.0.1</code>) depending on wizard choice.</li>
        <li><strong>Release level</strong> — Stable (production), Beta, Alpha, RC—signals support expectations and update policy.</li>
        <li><strong>Status</strong> — Draft (hidden from end users) vs Published (visible in catalogs and license wizard).</li>
        <li><strong>Notes / changelog</strong> — operator-facing text shown on the release detail page and optionally in update metadata.</li>
        <li><strong>Entitlement sets</strong> — link sets that apply to this version line (see wizard step 2).</li>
        <li><strong>Artifacts</strong> — installers via ${link('/guides/platform/storage', 'Storage connectors')} (Google Drive, OneDrive, custom server) instead of large API uploads.</li>
      </ul>

      <h2>Operator workflow</h2>
      <ol style="margin-left:1.25rem;">
        <li>Open product → <strong>Releases</strong> tab (or global Releases list).</li>
        <li><strong>Create release</strong> — step 1: versioning format, version number, release level, draft vs published.</li>
        <li>Step 2: pick entitlement sets that apply to this build.</li>
        <li>Step 3: attach files from storage or upload references.</li>
        <li>Step 4: changelog and release notes for support teams.</li>
        <li>Issue licenses against this release id <em>before</em> customers upgrade app builds.</li>
        <li>When deprecating, archive old release after migrating licenses or forcing an update channel.</li>
      </ol>
      ${screenshot('platform-create-release-basic-info.png', 'Create Release wizard step 1: versioning format, release level, and draft or published status')}

      <h2>Release detail page</h2>
      <p>Opened from a row in the releases table or global release list. Shows everything support needs for a single version line.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Header badges</strong> — versioning style (Semantic), level (Stable), and Published status.</li>
        <li><strong>Changelog &amp; release notes</strong> — editable narrative for operators and customers.</li>
        <li><strong>Entitlement sets</strong> — which SKUs apply to this release.</li>
        <li><strong>Files card</strong> — linked storage artifact with cloud download action (e.g. Google Drive file).</li>
        <li><strong>Edit</strong> — update metadata without re-creating the release id (prefer new release for breaking version bumps).</li>
      </ul>
      ${screenshot('platform-release-detail.png', 'Release detail page: changelog, notes, entitlement sets, and Google Drive file download')}

      <h2>Roles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product owner / system Admin</strong> — create, edit, delete releases.</li>
        <li><strong>Assigned Member with matrix row</strong> — view permitted release rows; may activate licenses on allowed lines only.</li>
        <li><strong>Viewer</strong> — read-only per matrix.</li>
      </ul>

      <h2>API &amp; SDK</h2>
      <p>Catalog routes on <code>/api/Products/…</code> and release-specific endpoints in ${link('/api/catalog', 'catalog API')}. SDK: ${link('/sdk/updates-logging', 'Updates &amp; logging')} for license-aware update checks.</p>
    `,
  },
  'features-entitlements': {
    title: 'Features & entitlement sets',
    lead: 'Define capabilities, bundle them into SKUs, assign sets to licenses, and enforce them in the SDK at runtime.',
    body: `
      <p><strong>Features</strong> are atomic toggles or capabilities (e.g. <code>export_pdf</code>, <code>max_projects</code>). <strong>Entitlement sets</strong> group features for assignment to licenses so you ship packages without recompiling for every SKU.</p>

      <h2>Configuration lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Define features</strong> on product <strong>Features</strong> tab (<code>…/features</code>).</li>
        <li><strong>Bundle</strong> into entitlement sets on <strong>Entitlement Sets</strong> tab (<code>…/entitlements</code>).</li>
        <li><strong>Assign</strong> optional set when creating/editing a license (wizard step 1 or details).</li>
        <li><strong>Distribute</strong> <code>license.bin</code>—signed payload includes entitlement material.</li>
        <li><strong>Enforce</strong> in app via SDK <code>FeatureManager</code>; optional <code>FeatureUsageTracker</code> for metering.</li>
      </ol>

      <h2>Features tab</h2>
      <p>Product owners define the capability catalog before bundling SKUs. End users and non-owners do not see this tab.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Feature key</strong> — stable identifier referenced in code (<code>FeatureManager.IsEnabled("key")</code>).</li>
        <li><strong>Display name &amp; description</strong> — operator documentation and support context.</li>
        <li><strong>Assign to groups</strong> — blue tags (e.g. Groub1, Groub2) pre-group features for entitlement set authoring.</li>
        <li><strong>Create Feature</strong> — adds a row to the searchable table with created-on date and actions menu.</li>
        <li><strong>Type / default</strong> — boolean gates, numeric limits, or structured values per your product model.</li>
      </ul>
      <p><strong>Design tip:</strong> prefer fewer, well-named keys over dozens of overlapping toggles—customers receive entitlements through sets, not individual feature rows.</p>
      ${screenshot('platform-product-features.png', 'Product Features tab: define features and assign to entitlement groups')}

      <h2>Entitlement Sets tab</h2>
      <p>Bundle features into reusable packages operators attach at license creation.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Set</strong> — name, description, and linked release tags (1.0.0, 1.0.3, …).</li>
        <li><strong>Features column</strong> — count of capabilities in each set (e.g. “3 features”).</li>
        <li><strong>Add features</strong> — pick from catalog with per-feature values (enabled, limits).</li>
        <li><strong>License wizard</strong> — saved sets appear in the step 1 dropdown.</li>
        <li><strong>Edit impact</strong> — changes affect <strong>new</strong> issuances; existing signed licenses keep old material until re-issued or refreshed online.</li>
      </ul>
      ${screenshot('platform-product-entitlement-sets.png', 'Entitlement Sets tab: group features into reusable sets linked to releases')}

      <h2>Runtime enforcement</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Offline</strong> — entitlements inside signed <code>license.bin</code>; SDK verifies signature then reads feature payload.</li>
        <li><strong>Online refresh</strong> — validation or feature endpoints may update entitlements when subscription changes mid-term.</li>
        <li><strong>Usage tracking</strong> — optional counters shipped to telemetry routes (${link('/api/telemetry', 'Telemetry API')}).</li>
      </ul>

      <h2>Roles</h2>
      <p>Only <strong>product owners</strong> and <strong>system Admin</strong> see Features and Entitlements tabs. Members consume entitlements through licenses they hold—not author them.</p>

      <p>${link('/sdk/features-usage', 'SDK: Features &amp; usage')} · ${link('/api/catalog', 'REST catalog')} · ${link('/guides/platform/licenses', 'Licenses (vendor)')} · ${link('/guides/platform/products', 'Products')}</p>
    `,
  },
  licenses: {
    title: 'Licenses (vendor workspace)',
    lead: 'Issue, distribute, revoke, and monitor licenses from the dashboard. Covers the four-step create wizard, detail tabs (including Usage for metered types), license types, and vendor vs end-user views.',
    body: `
      <p>Vendors create <strong>licenses</strong> against a product and software release, then distribute the <strong>license key</strong> and signed <code>license.bin</code>. License <em>type</em> drives expiry, seats, activations, sessions, and SDK validation rules.</p>
      <p>Walkthrough: ${link('/first-license', 'Generate your first license')} · Model guides: ${link('/perpetual-license', 'Perpetual')}, ${link('/trial-license', 'Trial')}, ${link('/subscription-license', 'Subscription')}, ${link('/floating-license', 'Floating')}, ${link('/concurrent-license', 'Concurrent')}, ${link('/node-locked-license', 'Node-locked')}, ${link('/credit-based-license', 'Credit-Based')}, ${link('/usage-based-license', 'Usage-Based')}.</p>

      <h2>License models at a glance</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Perpetual</strong> — buy-once; online or offline; optional expiry for maintenance.</li>
        <li><strong>Trial</strong> — time-boxed evaluation; extend or convert to paid.</li>
        <li><strong>Subscription</strong> — recurring term; renew or revoke on churn.</li>
        <li><strong>Floating</strong> — shared pool; seats enforced by <em>live sessions</em>; always online.</li>
        <li><strong>Concurrent</strong> — shared team key; seats enforced by <em>device activations</em>.</li>
        <li><strong>Node-locked</strong> — one machine per license; hardware bind + transfer; auto-bind or owner approval.</li>
        <li><strong>Credit-Based</strong> (<code>MeteredToken</code>) — online-only; shared credit wallet; per-feature token pricing. ${link('/credit-based-license', 'Full guide')}.</li>
        <li><strong>Usage-Based</strong> (<code>MeteredCount</code>) — online-only; shared use counter; one use per consume. ${link('/usage-based-license', 'Full guide')}.</li>
      </ul>

      <h2>License lifecycle (vendor view)</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Prerequisites</strong> — product, release, RSA keys generated (${link('/rsa-keys', 'RSA keys')}).</li>
        <li><strong>Create</strong> — four-step wizard (Activation → License Type → Basic Info → Details).</li>
        <li><strong>Distribute</strong> — copy license key; download <code>license.bin</code> from detail view.</li>
        <li><strong>Activate (customer)</strong> — SDK or <code>POST /api/Licenses/validate</code> with product <code>X-API-KEY</code>.</li>
        <li><strong>Operate</strong> — monitor activations/sessions; extend trials; adjust seats where allowed.</li>
        <li><strong>Revoke / delete</strong> — immediate invalidation for online paths; offline files fail on next online refresh.</li>
        <li><strong>Transfer</strong> — reassign issued-to user or node-locked device where policy allows.</li>
      </ol>

      <h2>Where to work in the dashboard</h2>
      <p>Use the sidebar <strong>Licenses</strong> list for cross-product search, or open a product → <strong>Licenses</strong> tab when you already know the software context. End customers use <strong>My Licenses</strong> (not the vendor workspace) for keys issued to their account.</p>
      ${screenshot('platform-licenses-list.png', 'Licenses list — Type, Mode, Status, and Activations columns (e.g. 2/∞ perpetual, 1/1 node-locked)')}

      <h2>Create wizard — Step 1: Activation</h2>
      <p>Choose how the license is validated at runtime:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online</strong> — server validation, activations, and sessions; required for Floating, Subscription, Credit-Based, and Usage-Based.</li>
        <li><strong>Offline</strong> — signed <code>license.bin</code> only; Perpetual, Trial, and Node-Locked can use offline mode.</li>
      </ul>
      ${screenshot('platform-create-license-step1-activation.png', 'Step 1 — Online vs Offline activation mode')}

      <h2>Create wizard — Step 2: License Type</h2>
      <p>Pick the model card—everything downstream (seats, sessions, tokens, binding) follows this choice.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Type cards</strong> — Perpetual, Trial, Subscription, Floating, Concurrent, Node-Locked, <strong>Credit-Based</strong>, <strong>Usage-Based</strong> (plan may gate types).</li>
        <li>Online-only types are disabled when Offline activation is selected on step 1.</li>
      </ul>
      ${screenshot('platform-create-license-step-license-type.png', 'Step 2 — License type cards including Credit-Based and Usage-Based')}

      <h2>Create wizard — Step 3: Basic Info</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product</strong> — required when creating from the global list; pre-filled in product context.</li>
        <li><strong>Software release</strong> — required; binds validation and update checks to a version line.</li>
        <li><strong>Issuer</strong> — optional vendor name on license metadata.</li>
        <li><strong>Issued to</strong> — email, end-user picker, or auto (type-dependent).</li>
        <li><strong>Entitlement set</strong> — optional package from the product Entitlement Sets tab.</li>
      </ul>
      ${screenshot('platform-create-license-step-basic-info.png', 'Step 3 — Basic Info: product, release, issued-to, license name')}

      <h2>Create wizard — Step 4: Details</h2>
      <p>Operational limits and labels operators and support teams rely on after issuance.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>License name</strong> — internal label (required); appears in lists and audit logs.</li>
        <li><strong>Duration / expiry</strong> — subscription length, trial period, or none for perpetual.</li>
        <li><strong>Seats &amp; limits</strong> — max activations (concurrent/node-locked), max concurrent users (floating), token balance (credit-based), usage caps (usage-based).</li>
        <li><strong>Node-Locked — device binding mode</strong> — <em>Auto-bind on first validation</em> or <em>Product owner approval</em> (Details step only).</li>
        <li><strong>Perpetual online</strong> — optional username/password for credential validation.</li>
        <li><strong>Notes</strong> — rich-text operator notes (sales context, support tickets).</li>
        <li><strong>Success screen</strong> — copy license key; open detail to download <code>license.bin</code>.</li>
      </ul>
      ${screenshot('platform-create-license-step-details-binding.png', 'Step 4 — Node-Locked Details: Auto-bind vs Product owner approval')}

      <h2>License detail tabs (vendor)</h2>
      <p>Opened from any license row. Tab visibility depends on license type and whether you are a product owner or system Admin.</p>

      <h3>Overview (always)</h3>
      <p>Single-pane summary for day-to-day vendor ops.</p>
      <ul style="margin-left:1.25rem;">
        <li>License key, status badge, type, release, issued-to, expiry.</li>
        <li>Download <code>license.bin</code>, revoke, delete, transfer user, edit link.</li>
        <li>Copy key for email delivery; audit log correlates downloads with IP.</li>
      </ul>

      <h3>Activations</h3>
      <p>Device and environment seats for binding models. Visible when the license type supports hardware or device tracking and you have owner/Admin rights.</p>
      <ul style="margin-left:1.25rem;">
        <li>Per-device rows with block/unblock and support notes.</li>
        <li>Primary surface for ${link('/concurrent-license', 'Concurrent')} seat math (activations, not sessions).</li>
        <li><strong>Node-Locked</strong> — approve pending devices when binding mode is Product owner approval.</li>
        <li><strong>Perpetual online</strong> — audit trail of machines (e.g. <code>2/∞</code> in licenses list).</li>
      </ul>
      ${screenshot('platform-node-locked-activations-tab.png', 'License detail — Activations tab with device rows and status')}
      <p>See ${link('/guides/platform/activations', 'Activations')}.</p>

      <h3>Sessions</h3>
      <p>Live online connections with heartbeat timestamps. Shown for online-capable licenses—especially ${link('/floating-license', 'Floating')} where seats follow <em>live sessions</em>, and for ${link('/perpetual-license', 'Perpetual online')} / ${link('/node-locked-license', 'Node-Locked online')} monitoring.</p>
      <ul style="margin-left:1.25rem;">
        <li>Disconnect stale clients holding seats after app crash.</li>
        <li>Correlate session id with API logs for support.</li>
        <li><strong>Live</strong> toggle and auto-refresh on global Sessions page.</li>
      </ul>
      ${screenshot('platform-node-locked-sessions-tab.png', 'License detail — Active Sessions tab with heartbeat and disconnect')}
      <p>See ${link('/guides/platform/sessions', 'Sessions')}.</p>

      <h3>Usage</h3>
      <p><strong>Credit-Based</strong> and <strong>Usage-Based</strong> licenses only: token balance or metered counters, consumption history, and operator adjustments. See ${link('/credit-based-license', 'Credit-Based')} and ${link('/usage-based-license', 'Usage-Based')} guides.</p>

      <h3>Device</h3>
      <p><strong>Node-locked</strong> licenses only: bound hardware fingerprint, activation history, transfer/unbind workflows when policy allows a machine change.</p>

      <h2>License status lifecycle</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Active</strong> — valid for validation within policy limits.</li>
        <li><strong>Expired</strong> — past expiry (trial/subscription); validation fails.</li>
        <li><strong>Revoked</strong> — operator-forced stop; online validation fails immediately.</li>
        <li><strong>Suspended / locked</strong> — billing or compliance holds (deployment-specific).</li>
      </ul>

      <h2>Roles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product owner / system Admin</strong> — create, edit, revoke, delete, see Activations tab.</li>
        <li><strong>Assigned Member</strong> — may view licenses on permitted releases; typically cannot create.</li>
        <li><strong>End user</strong> — routed to <code>/dashboard/my-licenses</code> for keys issued to their account.</li>
      </ul>

      <h2>Anonymous validation (customer runtime)</h2>
      <p>Apps call <code>POST ${HOST}/api/Licenses/validate</code> with product <code>X-API-KEY</code>—never the RSA private key or operator JWT.</p>
      <p>${link('/api/licenses', 'Licenses API')} · ${link('/sdk/license-client', 'SDK LicenseClient')} · ${link('/guides/platform/products', 'Products')}</p>
    `,
  },
  activations: {
    title: 'Activations',
    lead: 'Devices and environments that consumed a license seat. Global monitoring, per-license tab, block/unblock, node-locked approval, and Perpetual vs Concurrent behavior.',
    body: `
      <p>An <strong>activation</strong> records that a specific machine, user, or environment has claimed capacity on a license. Node-locked and concurrent models depend on activations; perpetual online tracks them for compliance and audit.</p>
      <p>Combined walkthrough with sessions: ${link('/sessions-activations', 'Sessions & activations guide')} · ${link('/perpetual-license', 'Perpetual')} · ${link('/node-locked-license', 'Node-Locked')}.</p>

      <h2>Activation lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Client activates</strong> — SDK validation or <code>ActivationManager</code> with hardware fingerprint / device id.</li>
        <li><strong>Server records</strong> — activation row: license id, device info, timestamp, status (active, pending approval, blocked).</li>
        <li><strong>Enforcement</strong> — seat limits block new activations when max reached.</li>
        <li><strong>Node-Locked approval</strong> — pending row until product owner approves (when binding mode requires it).</li>
        <li><strong>Block</strong> — operator blocks suspicious device; client fails on next online check.</li>
        <li><strong>Deactivate</strong> — client or operator releases seat for reuse.</li>
      </ol>

      <h2>Global Activations page</h2>
      <p>Sidebar: <strong>Activations</strong>. Cross-product view when you do not yet know which license key is involved.</p>
      ${screenshot('platform-activations-global-list.png', 'Global Activations — search, filters, license key, device, status columns')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Search</strong> — license key, device fingerprint, user email, machine name.</li>
        <li><strong>Status filter</strong> — active, blocked, pending, deactivated.</li>
        <li><strong>Date presets</strong> — 7D / 30D / 90D / all / custom range for incident windows.</li>
        <li><strong>Block / unblock</strong> — force deny on next online check without deleting history.</li>
        <li><strong>Edit notes</strong> — support annotations visible to other operators.</li>
        <li><strong>Drill-down</strong> — open activation detail or jump to parent license.</li>
      </ul>
      <p>API scopes list products you own or administer.</p>

      <h2>Per-license Activations tab</h2>
      <p>Faster path when support already has the license key. Same block/unblock and approve semantics as the global list but pre-filtered to one license.</p>
      ${screenshot('platform-node-locked-activations-tab.png', 'Per-license Activations tab — device rows for a single license')}

      <h2>By license model</h2>
      <table>
        <thead><tr><th>Model</th><th>Activations role</th><th>Typical list display</th></tr></thead>
        <tbody>
          <tr><td><strong>Node-Locked</strong></td><td>Primary enforcement — one bound device; approve pending binds</td><td><code>1/1</code></td></tr>
          <tr><td><strong>Concurrent</strong></td><td>Seat cap on registered devices</td><td><code>3/5</code></td></tr>
          <tr><td><strong>Perpetual online</strong></td><td>Audit / optional max activations</td><td><code>2/∞</code> or capped</td></tr>
          <tr><td><strong>Floating</strong></td><td>Device registry; seats often from sessions</td><td>Varies</td></tr>
          <tr><td><strong>Credit-Based / Usage-Based</strong></td><td>Device tracking optional; usage on Usage tab</td><td>—</td></tr>
          <tr><td><strong>Offline perpetual / trial</strong></td><td>May not create online rows</td><td>—</td></tr>
        </tbody>
      </table>

      <h2>Roles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product owner / Admin</strong> — view global list, block/unblock, approve node-locked devices, per-license tab.</li>
        <li><strong>Member / Viewer</strong> — no activations management UI.</li>
      </ul>

      <p>${link('/api/activations-sessions', 'Activations &amp; sessions API')} · ${link('/sdk/activation-session', 'SDK activation')} · ${link('/guides/platform/sessions', 'Sessions')}</p>
    `,
  },
  sessions: {
    title: 'Sessions',
    lead: 'Live online connections for heartbeat enforcement, floating concurrency, Perpetual/Node-Locked monitoring, and real-time support visibility.',
    body: `
      <p>A <strong>session</strong> represents an active online client connection—user, device, app version, last heartbeat. Sessions complement activations: floating licenses limit <em>concurrent</em> sessions; perpetual and node-locked online licenses use sessions for live monitoring and cleanup.</p>
      <p>Combined walkthrough: ${link('/sessions-activations', 'Sessions & activations guide')} · ${link('/perpetual-license', 'Perpetual online')} · ${link('/node-locked-license', 'Node-Locked online')}.</p>

      <h2>Session lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Start</strong> — SDK <code>SessionManager</code> opens session after successful validation/activation.</li>
        <li><strong>Heartbeat</strong> — periodic ping keeps session alive; stale heartbeats mark offline.</li>
        <li><strong>Concurrent check</strong> — floating model counts active sessions vs <code>maxActiveUsers</code>.</li>
        <li><strong>End</strong> — client shutdown or explicit end call releases seat.</li>
        <li><strong>Disconnect (operator)</strong> — force terminate from dashboard for stuck sessions.</li>
        <li><strong>Cleanup</strong> — remove stale offline rows after support confirms client is gone.</li>
      </ol>

      <h2>Global Sessions page</h2>
      <p>Sidebar: <strong>Sessions</strong> (Active Sessions). NOC-style monitoring of who is online right now.</p>
      ${screenshot('platform-sessions-global-list.png', 'Global Active Sessions — Live toggle, search, heartbeat age, disconnect')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Live</strong> — auto-refresh while enabled (release weekends, license migrations).</li>
        <li><strong>Online / offline filter</strong> — focus on live clients vs historical rows.</li>
        <li><strong>Search</strong> — license key, user email, machine name, app version.</li>
        <li><strong>Disconnect</strong> — remote termination; client fails on next heartbeat.</li>
        <li><strong>Details panel</strong> — version string, IP/geo when collected, session id for API correlation.</li>
      </ul>

      <h2>Per-license Sessions tab</h2>
      <p>Same data as the global page scoped to one license—ideal for a single perpetual, node-locked, or floating key.</p>
      ${screenshot('platform-node-locked-sessions-tab.png', 'Per-license Active Sessions tab with heartbeat and disconnect actions')}

      <h2>When sessions matter</h2>
      <table>
        <thead><tr><th>Model</th><th>Sessions role</th></tr></thead>
        <tbody>
          <tr><td><strong>Floating</strong></td><td>Primary enforcement — concurrent live sessions = seat count</td></tr>
          <tr><td><strong>Perpetual online</strong></td><td>Visibility, abuse detection, support disconnect</td></tr>
          <tr><td><strong>Node-Locked online</strong></td><td>One active session typical; heartbeat proves client still running</td></tr>
          <tr><td><strong>Subscription</strong></td><td>Detect stale clients after cancellation grace</td></tr>
          <tr><td><strong>Credit-Based / Usage-Based</strong></td><td>Optional session tracking alongside Usage tab metering</td></tr>
        </tbody>
      </table>

      <h2>Roles</h2>
      <p>Visibility: system Admin, org Admin, product owner (API-filtered). Members/Viewers do not manage sessions.</p>

      <p>${link('/api/activations-sessions', 'REST topic')} · ${link('/sdk/activation-session', 'SDK sessions')} · ${link('/guides/platform/activations', 'Activations')}</p>
    `,
  },
  trials: {
    title: 'Trials',
    lead: 'Time-bound evaluation licenses, trial campaigns, extension and conversion workflows, and how trials differ from subscription licenses.',
    body: `
      <p><strong>Trial licenses</strong> are time-limited entitlements for evaluation. The dashboard <strong>Trials</strong> area aggregates trial-specific licenses for monitoring; creation often uses the standard license wizard with type <strong>Trial</strong> or dedicated trial routes.</p>

      <h2>Trial lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Issue</strong> — license wizard type Trial + trial duration (days/hours).</li>
        <li><strong>Activate</strong> — customer uses key; clock starts per policy (issue date vs first activation).</li>
        <li><strong>Monitor</strong> — <code>/dashboard/trials</code> filters Active, Expired, Converted, Cancelled.</li>
        <li><strong>Extend</strong> — operator adds time for sales follow-up (API + UI).</li>
        <li><strong>End early</strong> — operator cancels trial before natural expiry.</li>
        <li><strong>Convert</strong> — replace with paid perpetual/subscription license; transfer entitlements/device bindings where supported.</li>
      </ol>

      <h2>Trials page operations</h2>
      <p>Sidebar: <strong>Trials</strong>. Aggregates trial-type licenses so sales and support do not hunt through the full license list.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Filter by status</strong> — Active, Expired, Converted, Cancelled.</li>
        <li><strong>Search</strong> — customer email, license key, product name.</li>
        <li><strong>Extend trial</strong> — push expiry date; writes an audit entry.</li>
        <li><strong>End trial</strong> — immediate expiry; validation fails on next SDK or API check.</li>
        <li><strong>Create</strong> — use license wizard with type <strong>Trial</strong> or Trials page shortcut when offered.</li>
        <li><strong>Open license detail</strong> — full activations/sessions context for escalations.</li>
      </ul>

      <h2>Trial vs subscription</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Trial</strong> — evaluation SKU; often single-seat; marketing funnels; may auto-expire without payment.</li>
        <li><strong>Subscription</strong> — recurring term tied to billing renewal; see ${link('/subscription-license', 'Subscription model')}.</li>
      </ul>

      <h2>Roles</h2>
      <p>Same as license management: <strong>product owners</strong> and <strong>system Admin</strong> extend/end trials. Members cannot access trial admin actions.</p>

      <p>${link('/api/trials-transfers', 'Trials &amp; transfers API')} · ${link('/trial-license', 'Trial license model')} · ${link('/guides/platform/licenses', 'Licenses (vendor)')} · ${link('/guides/platform/analytics', 'Analytics')}</p>
    `,
  },
  analytics: {
    title: 'Analytics & statistics',
    lead: 'Adoption KPIs, activation trends, license mix, exports, and scheduled reports across organizations and products.',
    body: `
      <p>The <strong>Analytics</strong> dashboard consolidates operational metrics: how many licenses are active, where activations spike, trial conversion pressure, and product-level adoption. It complements point-in-time lists (Licenses, Activations) with time-series views.</p>

      <h2>Dashboard route</h2>
      <p>Open <strong>Analytics</strong> from the sidebar. Single page with filterable sections—no sub-tabs. Use org selector and date range before exporting or scheduling reports.</p>

      <h2>Page sections</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Organization selector</strong> — scope charts to one tenant (multi-org operators).</li>
        <li><strong>Date range</strong> — presets (7D, 30D, 90D, YTD) and custom ranges.</li>
        <li><strong>KPI cards</strong> — license totals, active vs expired, activation counts, trial stats, revenue-style metrics when billing integrated.</li>
        <li><strong>Charts</strong> — activations over time, license type mix, top products by usage.</li>
        <li><strong>Ticket KPIs</strong> — when support module enabled, ticket volume overlays.</li>
      </ul>

      <h2>Export &amp; scheduling</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Export dialog</strong> — PDF, CSV, Excel snapshots of current filters.</li>
        <li><strong>Scheduled reports</strong> — email recurring summaries to stakeholders (deployment/plan dependent).</li>
      </ul>

      <h2>Related audit surfaces</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/audit-logs</code> — user-scoped audit trail.</li>
        <li>Org <code>…/audit-logs</code> and product <code>…/audit-logs</code> — scoped trails.</li>
        <li><code>/dashboard/logs</code> — system Admin merged logs (audit, login, email, SDK).</li>
      </ul>

      <h2>Data sources (API)</h2>
      <p>Aggregates from <code>/api/Analytics/…</code>, <code>/api/Statistics/…</code>, plus ${link('/api/telemetry', 'Telemetry &amp; logs API')} for SDK log shipping and dashboard logs.</p>

      <h2>Roles</h2>
      <p>Org Admins and product owners see org-scoped analytics. System Admin sees platform-wide views. Viewers/Members see limited or no analytics depending on assignment.</p>

      <p>${link('/guides/platform/organizations', 'Organizations')} · ${link('/guides/platform/activations', 'Activations')} · ${link('/guides/platform/overview', 'System overview')}</p>
    `,
  },
  storage: {
    title: 'Storage connectors',
    lead: 'Attach release binaries via Google Drive, OneDrive, or a custom server instead of pushing large files through the core API on every upload.',
    body: `
      <p><strong>Storage connectors</strong> link LicenPro to external file hosts. Use them when installers, delta packages, or release notes live on cloud drives or your own CDN—release records in LicenPro still point to version metadata while artifacts resolve from remote storage.</p>

      <h2>Storage lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Connect</strong> — authenticate provider at Storage hub.</li>
        <li><strong>Configure</strong> — pick folders, credentials, or custom server base URL.</li>
        <li><strong>Upload / link</strong> — place binaries in provider UI or LicenPro storage browser.</li>
        <li><strong>Bind to release</strong> — associate artifact path/id when editing a ${link('/guides/platform/releases', 'release')}.</li>
        <li><strong>SDK update check</strong> — client resolves download URL via update API + storage metadata.</li>
        <li><strong>Revoke</strong> — disconnect provider; existing release links may break until re-linked.</li>
      </ol>

      <h2>Storage hub</h2>
      <p>Sidebar: <strong>Storage</strong>. Connect external file hosts before you attach binaries to releases.</p>

      <h2>Provider comparison</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Google Drive</strong> — OAuth to Google; browse folders; upload/list/delete via <code>/api/Storage/…</code> or Drive-specific routes.</li>
        <li><strong>OneDrive</strong> — Microsoft OAuth; similar list/upload semantics via <code>/api/OneDriveStorage/…</code>.</li>
        <li><strong>Custom server</strong> — your HTTPS endpoint; LicenPro proxies list/upload/delete per <code>/api/CustomServerStorage/…</code>; requires Pro guard in UI.</li>
      </ul>

      <h2>Operator workflow</h2>
      <ol style="margin-left:1.25rem;">
        <li>Open <strong>Storage</strong> from sidebar.</li>
        <li>Choose provider → complete OAuth or enter server URL + credentials.</li>
        <li>Verify test upload appears in provider browser.</li>
        <li>When publishing a release, attach artifact reference instead of embedding large blobs in API payloads.</li>
        <li>Validate SDK update path downloads from expected URL in staging.</li>
      </ol>

      <h2>Roles &amp; plans</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product owners</strong> — typically configure storage used by their releases.</li>
        <li><strong>Custom server</strong> — may require Pro subscription (plan guard on route).</li>
        <li><strong>System Admin</strong> — troubleshoot connector OAuth failures platform-wide.</li>
      </ul>

      <p>${link('/api/storage', 'Storage REST topic')} · ${link('/guides/platform/releases', 'Releases')} · ${link('/sdk/updates-logging', 'SDK updates')}</p>
    `,
  },
  'account-settings': {
    title: 'Account settings',
    lead: 'Operator profile, security, notifications, subscription plan, billing, REST API keys, and account deletion—separate from per-product RSA keys.',
    body: `
      <p><strong>Account settings</strong> manage <em>you</em> as a platform user—not a product or organization. Product signing keys live under Product → Settings (${link('/rsa-keys', 'RSA keys guide')}); account <strong>API keys</strong> automate REST calls with scoped JWT-backed credentials.</p>

      <h2>Route</h2>
      <p>Open <strong>Settings</strong> (gear icon) from the sidebar. Tabs are driven by query parameter: profile, security, notifications, manage plan, API keys, and danger zone. Billing and checkout live as adjacent pages for upgrades.</p>

      <h2>Settings sections</h2>

      <h3>My Profile</h3>
      <p>Display name, avatar, contact email, timezone preferences. Updates operator identity shown in audit logs and invitations—not license metadata or product RSA keys.</p>

      <h3>Security</h3>
      <p>Password change, two-factor authentication, and review of active login sessions on your operator account.</p>

      <h3>Notifications</h3>
      <p>Email and in-app preferences: license events, invitations, billing, marketing (per toggles). Does not change customer app telemetry.</p>

      <h3>Manage plan</h3>
      <p>Current subscription tier (Free vs Pro), limits on organizations, products, license types, and storage connectors. Upgrade flows link to checkout. Locked products show <code>isSubscriptionLocked</code> in the UI—owners cannot manage until the plan is restored.</p>

      <h3>Billing</h3>
      <p>Invoices, payment method, and payment history—commerce surface adjacent to manage plan.</p>

      <h3>API keys</h3>
      <p>Generate scoped REST credentials for CI/CD and internal tools:</p>
      <ul style="margin-left:1.25rem;">
        <li>Name, description, optional expiration.</li>
        <li>Scopes: Read/Write Licenses, Activations, Products, Releases.</li>
        <li>Secret shown once—store in a vault (${link('/rsa-keys', 'full API keys walkthrough')}).</li>
      </ul>

      <h3>Danger zone</h3>
      <p>Delete operator account—irreversible. Does not delete organizations you own; transfer org ownership first.</p>

      <p>${link('/api/auth-users', 'Auth &amp; users API')} · ${link('/api/security', 'Security API')} · ${link('/api/billing', 'Billing API')} · ${link('/guides/platform/overview', 'System overview')}</p>
    `,
  },
};

export function getPlatformTopic(slug: string): DocTopic | null {
  return PLATFORM_GUIDES[slug] ?? null;
}
