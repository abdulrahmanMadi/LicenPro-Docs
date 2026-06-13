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
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-overview-who-does-what.png" data-doc-image-alt="Who does what: vendor operators in the dashboard, integrators and automation from CI and billing, and customer applications with SDK or HTTPS—all via the LicenPro REST API" aria-label="View who does what diagram full size">
          <img src="assets/docs/platform-overview-who-does-what.png" alt="Who does what: vendor operators in the dashboard, integrators and automation from CI and billing, and customer applications with SDK or HTTPS—all via the LicenPro REST API" loading="lazy" decoding="async" />
        </button>
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
        <li><strong>Licenses</strong> — choose model (perpetual, trial, subscription, floating, node-locked, …), set limits, export <code>license.bin</code> and the license key.</li>
      </ol>
      <p>Deeper reads: ${link('/guides/platform/organizations', 'Organizations')} · ${link('/first-organization', 'First organization')} · ${link('/guides/platform/products', 'Products')} · ${link('/guides/platform/releases', 'Releases')} · ${link('/guides/platform/features-entitlements', 'Features &amp; entitlements')} · ${link('/rsa-keys', 'RSA keys')} · ${link('/guides/platform/licenses', 'Licenses (vendor)')} · ${link('/first-product', 'First product')} · ${link('/first-license', 'First license')}.</p>

      <h2>Dashboard navigation map</h2>
      <p>Main sidebar areas and where to read more:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Home</strong> (<code>/dashboard</code>) — KPI widgets, recent licenses/products.</li>
        <li><strong>Organizations</strong> — ${link('/guides/platform/organizations', 'Organizations guide')} · tabs: Overview, Products, Members, Invitations, Audit, Settings.</li>
        <li><strong>Products</strong> — ${link('/guides/platform/products', 'Products guide')} · tabs: Overview, Features, Entitlements, Releases, Licenses, Users, Access Matrix, Audit, Settings.</li>
        <li><strong>Releases</strong> — ${link('/guides/platform/releases', 'Releases guide')} (global + per-product tab).</li>
        <li><strong>Licenses</strong> — ${link('/guides/platform/licenses', 'Licenses guide')} · wizard + detail tabs (Overview, Activations, Sessions, Device).</li>
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
        <li><strong>License models</strong> — perpetual, trial, subscription, floating, node-locked (sidebar <em>License models</em>).</li>
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

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/organizations</code> — list, create, edit, delete organizations you belong to.</li>
        <li><code>/dashboard/organization/:orgSlug/…</code> — org workspace (URL rewrites from GUID to slug after load).</li>
      </ul>

      <h2>Organization tabs</h2>
      <p>Each tab is a child route under the org layout. Tabs for <strong>Members</strong>, <strong>Invitations</strong>, <strong>Audit Logs</strong>, and <strong>Settings</strong> appear only when <code>myRole</code> is <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code>, or <code>ResellerAdmin</code>. <strong>Overview</strong> and <strong>Products</strong> are visible to all members.</p>

      <h3>Overview</h3>
      <p><code>…/overview</code> (default). Org-level KPIs: license mix, activation trends, quick counts for members, products, and pending invitations. Use this as the landing page after switching org context.</p>

      <h3>Products</h3>
      <p><code>…/products</code>. Lists products assigned to this organization. <strong>Owner / Admin</strong> can assign or unassign products to the org. Members see products they can access via assignment or access matrix—not necessarily every product in your account.</p>

      <h3>Members</h3>
      <p><code>…/members</code>. Team directory: name, email, org role, join date. Actions (API-gated):</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Invite</strong> — email + role: Member, Viewer, ProductOwner, or Admin (Owner assigns Admin).</li>
        <li><strong>Change role</strong> — Owner/Admin/ResellerAdmin; Owner-only rules for Admin role assignment.</li>
        <li><strong>Remove</strong> — Owner, Admin, ProductOwner, ResellerAdmin; cannot remove Owner.</li>
      </ul>

      <h3>Invitations</h3>
      <p><code>…/invitations</code>. Pending invites: resend, revoke, status. Roles offered in UI: Member, Viewer, Admin (Members tab also offers ProductOwner). Token links expire per server policy.</p>

      <h3>Audit Logs</h3>
      <p><code>…/audit-logs</code>. Org-scoped activity: member changes, settings updates, product assignments. Pair with ${link('/guides/platform/analytics', 'Analytics')} for trends and ${link('/api/telemetry', 'Telemetry API')} for exports.</p>

      <h3>Settings</h3>
      <p><code>…/settings</code>. Owner-focused configuration:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — name, description, website.</li>
        <li><strong>Policies</strong> — <code>allowSelfRegistration</code>, <code>requireApprovalForJoining</code>, <code>defaultMemberRole</code> (Member, Viewer, Admin for new joiners).</li>
        <li><strong>Branding</strong> — logo and colors for org presentation.</li>
        <li><strong>Danger zone</strong> — delete organization (Owner only; irreversible).</li>
      </ul>

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

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/products</code> — all products you can access; create via <code>/dashboard/products/create</code>.</li>
        <li><code>/dashboard/products/:productSlug</code> — product workspace (slug replaces GUID in URL after load).</li>
        <li><code>/dashboard/products/:productSlug/edit</code> — edit form (same fields as create modal).</li>
      </ul>

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
      <p>Default tab. Summary cards: status, access type, owners, release/license counts, recent activity. Starting point before drilling into Releases or Licenses.</p>

      <h3>Features</h3>
      <p><code>…/features</code>. Define capability flags (name, key, description). Features are referenced inside entitlement sets and evaluated at runtime by the SDK <code>FeatureManager</code>.</p>

      <h3>Entitlement Sets</h3>
      <p><code>…/entitlements</code> (+ <code>/create</code>, <code>/edit/:setId</code>). Bundle features into SKUs. When creating a license, pick a set to attach packaged entitlements without hard-coding checks in every build. See ${link('/guides/platform/features-entitlements', 'Features &amp; entitlements')}.</p>

      <h3>Releases</h3>
      <p><code>…/releases</code>. Version lines for this product only. Each license binds to a <code>softwareReleaseId</code> for validation and update checks. Create from tab or global <code>/dashboard/releases</code>.</p>

      <h3>Licenses</h3>
      <p><code>…/licenses</code> (+ create/edit routes). Issue keys, download <code>license.bin</code>, revoke, transfer. End users with only assignment see this tab but not management actions.</p>

      <h3>Users</h3>
      <p><code>…/users</code> (owners only). Assign organization members to the product. Assignment does not replace <strong>owners</strong>—owners are explicit in <code>product.owners</code> and control RSA keys and destructive actions.</p>

      <h3>Access Matrix</h3>
      <p><code>…/access-matrix</code> (owners only). Per-member, per-release grants: which org users may view or use specific release lines. Fine-grained alternative to blanket product assignment—critical for Viewer/Member roles.</p>

      <h3>Audit Logs</h3>
      <p><code>…/audit-logs</code>. Product-scoped audit trail: license changes, settings updates, key rotation, member assignment.</p>

      <h3>Settings</h3>
      <p><code>…/settings</code> (owners only). In-tab sections:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — name, description, status, access type (where editable).</li>
        <li><strong>Client Updates</strong> — update-check endpoints and metadata used by SDK update managers.</li>
        <li><strong>License signing keys (RSA)</strong> — generate, regenerate, download public key (${link('/rsa-keys', 'RSA guide')}).</li>
        <li><strong>Danger zone</strong> — delete product (releases and licenses cascade).</li>
      </ul>

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

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/releases</code> — global list across products (filter, search).</li>
        <li><code>/dashboard/releases/create</code> — create release (pick product context).</li>
        <li><code>/dashboard/releases/:id</code> — detail; <code>/edit</code> for modifications.</li>
        <li><code>/dashboard/products/:slug/releases</code> — product-scoped tab (primary operator path).</li>
        <li><code>/dashboard/products/:slug/releases/create</code> — create in product context.</li>
      </ul>

      <h2>Release fields (typical)</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Version string</strong> — semantic, pre-release, simple, or build-based (matches product versioning style).</li>
        <li><strong>Release level</strong> — Stable (production), Beta, Alpha, RC—signals support and update policy.</li>
        <li><strong>Status</strong> — active vs archived; archived releases may block new license issuance.</li>
        <li><strong>Notes / changelog</strong> — operator-facing metadata for support.</li>
        <li><strong>Artifacts</strong> — optional binaries via ${link('/guides/platform/storage', 'Storage connectors')} instead of uploading through core API for every build.</li>
      </ul>

      <h2>Operator workflow</h2>
      <ol style="margin-left:1.25rem;">
        <li>Open product → <strong>Releases</strong> tab (or global Releases list).</li>
        <li><strong>Create release</strong> — version, level, notes; confirm product binding.</li>
        <li>Link storage artifact if installers live on Drive/OneDrive/custom server.</li>
        <li>Issue licenses against this release id before customers upgrade app builds.</li>
        <li>When deprecating, archive old release after migrating licenses or forcing update channel.</li>
      </ol>

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
      <p>Product owners define:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Feature key</strong> — stable identifier referenced in code (<code>FeatureManager.IsEnabled("key")</code>).</li>
        <li><strong>Display name &amp; description</strong> — operator documentation.</li>
        <li><strong>Type / default</strong> — boolean gates, numeric limits, or structured values per your product model.</li>
      </ul>
      <p>End users and non-owners do not see this tab.</p>

      <h2>Entitlement Sets tab</h2>
      <p>Routes: <code>…/entitlements</code>, <code>…/entitlements/create</code>, <code>…/entitlements/edit/:setId</code>.</p>
      <ul style="margin-left:1.25rem;">
        <li>Create a set name and description.</li>
        <li>Add features from the product catalog with per-feature values (enabled, limits).</li>
        <li>Save—sets appear in license create form dropdown.</li>
        <li>Editing a set affects <strong>new</strong> issuances; existing licenses keep signed material until re-issued or refreshed online.</li>
      </ul>

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
    lead: 'Issue, distribute, revoke, and monitor licenses from the dashboard. Covers the two-step create wizard, detail tabs, license types, and vendor vs end-user views.',
    body: `
      <p>Vendors create <strong>licenses</strong> against a product and software release, then distribute the <strong>license key</strong> and signed <code>license.bin</code>. License <em>type</em> drives expiry, seats, activations, sessions, and SDK validation rules.</p>
      <p>Walkthrough: ${link('/first-license', 'Generate your first license')} · Model guides: ${link('/perpetual-license', 'Perpetual')}, ${link('/trial-license', 'Trial')}, ${link('/subscription-license', 'Subscription')}, ${link('/floating-license', 'Floating')}, ${link('/concurrent-license', 'Concurrent')}, ${link('/node-locked-license', 'Node-locked')}.</p>

      <h2>License models at a glance</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Perpetual</strong> — buy-once; online or offline; optional expiry for maintenance.</li>
        <li><strong>Trial</strong> — time-boxed evaluation; extend or convert to paid.</li>
        <li><strong>Subscription</strong> — recurring term; renew or revoke on churn.</li>
        <li><strong>Floating</strong> — shared pool; seats enforced by <em>live sessions</em>; always online.</li>
        <li><strong>Concurrent</strong> — shared team key; seats enforced by <em>device activations</em>.</li>
        <li><strong>Node-locked</strong> — one machine per license; hardware bind + transfer.</li>
      </ul>

      <h2>License lifecycle (vendor view)</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Prerequisites</strong> — product, release, RSA keys generated (${link('/rsa-keys', 'RSA keys')}).</li>
        <li><strong>Create</strong> — two-step wizard (Basic Info → Details).</li>
        <li><strong>Distribute</strong> — copy license key; download <code>license.bin</code> from detail view.</li>
        <li><strong>Activate (customer)</strong> — SDK or <code>POST /api/Licenses/validate</code> with product <code>X-API-KEY</code>.</li>
        <li><strong>Operate</strong> — monitor activations/sessions; extend trials; adjust seats where allowed.</li>
        <li><strong>Revoke / delete</strong> — immediate invalidation for online paths; offline files fail on next online refresh.</li>
        <li><strong>Transfer</strong> — reassign issued-to user or node-locked device where policy allows.</li>
      </ol>

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/licenses</code> — global list (all accessible products).</li>
        <li><code>/dashboard/licenses/create</code> — create wizard (pick product if not in context).</li>
        <li><code>/dashboard/licenses/:id</code> — vendor license detail.</li>
        <li><code>/dashboard/licenses/edit/:id</code> — edit form.</li>
        <li><code>/dashboard/products/:slug/licenses/…</code> — same flows in product context.</li>
        <li><code>/dashboard/my-licenses</code> — <strong>end-user</strong> licenses issued to you (not vendor ops).</li>
        <li><code>/dashboard/my-licenses/:id/activate</code> — customer activation UI.</li>
      </ul>

      <h2>Create wizard — Step 1: Basic Info</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>License type</strong> — Perpetual, Trial, Subscription, Floating, Node-locked, Concurrent (plan may gate types).</li>
        <li><strong>Product</strong> — required in global create mode.</li>
        <li><strong>Software release</strong> — required; binds validation to version line.</li>
        <li><strong>Issuer</strong> — optional vendor name on metadata.</li>
        <li><strong>Issued to</strong> — email, end-user picker, or auto (type-dependent).</li>
        <li><strong>Perpetual mode</strong> — Online (activations tracked) vs Offline (file-based).</li>
        <li><strong>Entitlement set</strong> — optional package from product entitlements tab.</li>
      </ul>

      <h2>Create wizard — Step 2: Details</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>License name</strong> — internal label (required).</li>
        <li><strong>Duration / expiry</strong> — subscription length, trial period, or none for perpetual.</li>
        <li><strong>Seats &amp; limits</strong> — max activations, max concurrent users (floating), hardware binding.</li>
        <li><strong>Notes</strong> — rich-text operator notes.</li>
        <li><strong>Submit</strong> — success screen shows license key + copy; open detail to download file.</li>
      </ul>

      <h2>License detail tabs (vendor)</h2>
      <p><code>/dashboard/licenses/:id</code> — tabs depend on type and ownership:</p>

      <h3>Overview (always)</h3>
      <p>Key metadata, status badge, type, release, issued-to, expiry, download <code>license.bin</code>, revoke, delete, transfer user, edit link.</p>

      <h3>Activations</h3>
      <p>Visible when <strong>Admin or product owner</strong> and license type supports device binding. Per-license activation list, block/unblock, notes. See ${link('/guides/platform/activations', 'Activations')}.</p>

      <h3>Sessions</h3>
      <p>Online-capable licenses only. Live sessions with heartbeat timestamps; disconnect stale clients. See ${link('/guides/platform/sessions', 'Sessions')}.</p>

      <h3>Device</h3>
      <p><strong>Node-locked</strong> licenses: bound hardware fingerprint, activation history, transfer/unbind device workflows.</p>

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
    lead: 'Devices and environments that consumed a license seat. Global monitoring, per-license tab, block/unblock, and troubleshooting concurrent models.',
    body: `
      <p>An <strong>activation</strong> records that a specific machine, user, or environment has claimed capacity on a license. Floating and node-locked models depend on activations; perpetual online tracks them for compliance.</p>

      <h2>Activation lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Client activates</strong> — SDK <code>ActivationManager</code> or validate endpoint with hardware fingerprint / device id.</li>
        <li><strong>Server records</strong> — activation row: license id, device info, timestamp, status.</li>
        <li><strong>Enforcement</strong> — seat limits block new activations when max reached.</li>
        <li><strong>Heartbeat</strong> — some models tie activation to session heartbeats.</li>
        <li><strong>Block</strong> — operator blocks suspicious device; client fails on next online check.</li>
        <li><strong>Deactivate</strong> — client or operator releases seat for reuse.</li>
      </ol>

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/activations</code> — global list across your products.</li>
        <li><code>/dashboard/activations/:id</code> — single activation detail.</li>
        <li><code>/dashboard/licenses/:id</code> → <strong>Activations</strong> tab — per-license slice.</li>
      </ul>

      <h2>Global activations page</h2>
      <p>Sidebar: <strong>Activations</strong>. Operators use:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Search</strong> — license key, device, user email.</li>
        <li><strong>Status filter</strong> — active, blocked, deactivated.</li>
        <li><strong>Date presets</strong> — 7D / 30D / 90D / all / custom range.</li>
        <li><strong>Block / unblock</strong> — force deny without deleting history.</li>
        <li><strong>Edit notes</strong> — support annotations.</li>
      </ul>
      <p>API scopes list to products you own or administer; system Admin sees broader sets.</p>

      <h2>Per-license Activations tab</h2>
      <p>From license detail when type supports binding and you are Admin/product owner. Faster support path when you already have the license key context.</p>

      <h2>By license model</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Node-locked</strong> — one primary binding; transfer workflows on Device tab.</li>
        <li><strong>Floating / Concurrent</strong> — many activations; max concurrent enforced via sessions + activations.</li>
        <li><strong>Perpetual online</strong> — activations for audit; offline perpetual may not create rows.</li>
        <li><strong>Trial / Subscription</strong> — activations expire with license expiry or renewal.</li>
      </ul>

      <h2>Roles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product owner / Admin</strong> — view global list, block/unblock, per-license tab.</li>
        <li><strong>Member / Viewer</strong> — no activations management UI.</li>
      </ul>

      <p>${link('/api/activations-sessions', 'Activations &amp; sessions API')} · ${link('/sdk/activation-session', 'SDK activation')} · ${link('/sessions-activations', 'Combined guide')} · ${link('/guides/platform/sessions', 'Sessions')}</p>
    `,
  },
  sessions: {
    title: 'Sessions',
    lead: 'Live online connections for heartbeat enforcement, floating concurrency, and real-time support visibility.',
    body: `
      <p>A <strong>session</strong> represents an active online client connection—user, device, app version, last heartbeat. Sessions complement activations: floating licenses often limit <em>concurrent</em> sessions, not just registered devices.</p>

      <h2>Session lifecycle</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Start</strong> — SDK <code>SessionManager</code> opens session after successful validation/activation.</li>
        <li><strong>Heartbeat</strong> — periodic ping keeps session alive; stale heartbeats mark offline.</li>
        <li><strong>Concurrent check</strong> — floating model counts active sessions vs <code>maxActiveUsers</code>.</li>
        <li><strong>End</strong> — client shutdown or explicit end call releases seat.</li>
        <li><strong>Disconnect (operator)</strong> — force terminate from dashboard for stuck sessions.</li>
      </ol>

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/sessions</code> — all sessions across licenses (sidebar <strong>Sessions</strong>).</li>
        <li><code>/dashboard/licenses/:id</code> → <strong>Sessions</strong> tab — scoped to one license.</li>
      </ul>

      <h2>Global Sessions page</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online / offline filter</strong> — focus on live clients.</li>
        <li><strong>Search</strong> — license, user, machine name.</li>
        <li><strong>Auto-refresh</strong> — periodic reload for NOC-style monitoring.</li>
        <li><strong>Disconnect</strong> — remote session termination (customer app receives failure on next heartbeat).</li>
        <li><strong>Details</strong> — version string, IP/geo if collected, session id for API correlation.</li>
      </ul>

      <h2>When sessions matter</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Floating licenses</strong> — primary enforcement surface for seat count.</li>
        <li><strong>Perpetual online</strong> — optional visibility and abuse detection.</li>
        <li><strong>Subscription</strong> — detect stale clients holding seats after cancellation grace.</li>
        <li><strong>Support</strong> — “user says they closed app but seat still in use” → disconnect here.</li>
      </ul>

      <h2>Roles</h2>
      <p>Visibility: system Admin, org Admin, product owner (API-filtered). Members/Viewers do not manage sessions.</p>

      <p>${link('/api/activations-sessions', 'REST topic')} · ${link('/sdk/activation-session', 'SDK sessions')} · ${link('/sessions-activations', 'Sessions &amp; activations guide')} · ${link('/guides/platform/activations', 'Activations')}</p>
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

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/trials</code> — trial license list with status filters.</li>
        <li><code>/dashboard/trials/create</code> — may redirect to license create with Trial preset.</li>
        <li><code>/dashboard/licenses/create</code> — pick type Trial in wizard step 1.</li>
      </ul>

      <h2>Trials page operations</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Filter by status</strong> — Active, Expired, Converted, Cancelled.</li>
        <li><strong>Search</strong> — customer email, license key, product.</li>
        <li><strong>Extend trial</strong> — push expiry date; audit log entry.</li>
        <li><strong>End trial</strong> — immediate expiry; validation fails on next check.</li>
        <li><strong>Open license detail</strong> — full activations/sessions context.</li>
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
      <p><code>/dashboard/analytics</code> — single page with sections (no sub-tabs). Sidebar: <strong>Analytics</strong>.</p>

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

      <h2>Dashboard routes</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/storage</code> — Storage hub (provider cards).</li>
        <li><code>/dashboard/storage/google-drive</code> — Google Drive integration UI.</li>
        <li><code>/dashboard/storage/onedrive</code> — Microsoft OneDrive integration.</li>
        <li><code>/dashboard/storage/custom-server</code> — custom HTTP storage (often Pro plan).</li>
      </ul>

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
      <p><code>/dashboard/account-settings</code> with query tab: <code>?tab=profile|security|notifications|manageplan|apikeys|danger</code>. Sidebar: <strong>Settings</strong> (gear icon). Related: <code>/dashboard/billing</code>, <code>/dashboard/checkout</code> (Pro upgrade).</p>

      <h2>Settings sections</h2>

      <h3>My Profile (<code>tab=profile</code>)</h3>
      <p>Display name, avatar, contact email, timezone preferences. Updates operator identity shown in audit logs and invitations—not license metadata.</p>

      <h3>Security (<code>tab=security</code>)</h3>
      <p>Password change, two-factor authentication, active sessions. Pair with <code>/dashboard/login-attempts</code> (admin security views) for breach investigation.</p>

      <h3>Notifications (<code>tab=notifications</code>)</h3>
      <p>Email and in-app preferences: license events, invitations, billing, marketing (per toggles). Does not change customer app telemetry.</p>

      <h3>Manage plan (<code>tab=manageplan</code>)</h3>
      <p>Current subscription tier (Free vs Pro), limits on organizations, products, license types, storage connectors. Upgrade flows link to checkout. Locked products show <code>isSubscriptionLocked</code> in UI—owners cannot manage until plan restored.</p>

      <h3>Billing (<code>/dashboard/billing</code>)</h3>
      <p>Invoices, payment method, history—commerce surface adjacent to manage plan.</p>

      <h3>API keys (<code>tab=apikeys</code>)</h3>
      <p>Generate scoped REST credentials for CI/CD and internal tools:</p>
      <ul style="margin-left:1.25rem;">
        <li>Name, description, optional expiration.</li>
        <li>Scopes: Read/Write Licenses, Activations, Products, Releases.</li>
        <li>Secret shown once—store in vault (${link('/rsa-keys', 'full API keys walkthrough')}).</li>
      </ul>

      <h3>Danger zone (<code>tab=danger</code>)</h3>
      <p>Delete operator account—irreversible; does not delete organizations you own (handle org transfer first).</p>

      <h2>System admin settings (JWT Admin only)</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/system-settings</code> — platform configuration.</li>
        <li><code>/dashboard/roles</code> — custom roles &amp; permissions (<code>Products.View</code>, <code>Licenses.Create</code>, …).</li>
        <li><code>/dashboard/logs</code> — merged Audit | Login | Email | SDK logs.</li>
        <li><code>/dashboard/subscribers</code> — subscription subscriber admin.</li>
      </ul>

      <p>${link('/api/auth-users', 'Auth &amp; users API')} · ${link('/api/security', 'Security API')} · ${link('/api/billing', 'Billing API')} · ${link('/guides/platform/overview', 'System overview')}</p>
    `,
  },
};

export function getPlatformTopic(slug: string): DocTopic | null {
  return PLATFORM_GUIDES[slug] ?? null;
}
