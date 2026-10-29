import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';

export const SDK_TOPICS_EN: Record<string, DocTopic> = {
  overview: {
    title: '.NET SDK overview',
    lead: 'NuGet package layout, runtime responsibilities, and links to deep dives.',
    body: `
      <p>The <code>LicenPro.SDK</code> library validates signed licenses offline using your product <strong>public key</strong>, and optionally talks to <code>${HOST}/api</code> for online validation, activations, sessions, feature usage, and updates.</p>
      <h2>Major areas (source: <code>LicenPro.SDK.lib</code>)</h2>
      <ul>
        <li><strong>Core</strong> — <code>LicenseClient</code>, <code>LicenseBuilder</code>, serialization of license payloads.</li>
        <li><strong>Managers</strong> — <code>ActivationManager</code>, <code>SessionManager</code>, <code>OfflineCacheManager</code>, <code>LicenseTransferManager</code>, <code>TrialExtensionManager</code>, <code>GracePeriodManager</code>, <code>NodeLockedDeviceManager</code>.</li>
        <li><strong>Features</strong> — <code>FeatureManager</code>, <code>UpdateChecker</code> (<code>FeatureUsageTracker</code> is obsolete; metered billing uses <code>MeterManager</code>).</li>
        <li><strong>Updates</strong> — <code>SdkUpdateManager</code> calling ${L('/api/sdk-host', 'SDK host HTTP APIs')}.</li>
        <li><strong>AppHosting</strong> — <code>SdkBootstrap</code>, expiry UX helpers for desktop shells.</li>
      </ul>
      <p>Continue with ${L('/sdk/configuration', 'Configuration')} → ${L('/sdk/license-client', 'LicenseClient')} → ${L('/sdk/dotnet', '.NET integration sample')}.</p>
    `,
  },
  configuration: {
    title: 'Configuration & bootstrap',
    lead: 'SdkConfiguration, JSON settings, and startup hooks.',
    body: `
      <p><code>ServerBaseEndpoint</code> must end with <code>/api</code> (cloud default: <code>${HOST}/api</code>). Call <code>SdkConfiguration.Initialize</code> or rely on <code>licenpro.settings.json</code> / <code>appsettings.json</code> discovery (see ${L('/quick-start', 'Quick Start')}).</p>
      <p>Desktop hosts should invoke <code>SdkBootstrap.OnApplicationStartup()</code> once before the UI message loop so pending updates and theme defaults apply consistently.</p>
      <p>${L('/sdk/dotnet', '.NET integration page')} · ${L('/api/licenses', 'Validate HTTP contract')}</p>
    `,
  },
  'license-client': {
    title: 'LicenseClient lifecycle',
    lead: 'Validation, caching, auto-validation, and error surfaces.',
    body: `
      <p><code>LicenseClient</code> is the primary API: paths to <code>license.bin</code>, public key material, license key, optional expected license type, product id for update checks, and tuning for expiry warnings.</p>
      <p>After a successful online validation, call <code>TryAutoValidateAsync</code> (or the documented equivalent for your version) so the encrypted offline cache stays warm for air-gapped scenarios.</p>
      <p>Online validation hits <code>POST /api/Licenses/validate</code> with the product <code>X-API-KEY</code> — see ${L('/api/licenses', 'Licenses REST')} and ${L('/sdk/dotnet', 'full .NET article')}.</p>
      <p>Nothing stays licensed after a rejection. When <code>ValidateAsync</code> rejects a license after loading it (wrong license type, wrong license key, failed activation or session), the SDK disconnects the session and clears <code>LicenseManager.Current</code> and the features. A later failed validation of the same key, a heartbeat that reports the license invalid, and <code>LicenseManager.CloseAsync</code> clear them too.</p>
    `,
  },
  'activation-session': {
    title: 'Activation & sessions in the SDK',
    lead: 'Managers that talk to Activations and Sessions APIs.',
    body: `
      <p><code>ActivationManager</code> coordinates device binding and seat consumption against ${L('/api/activations-sessions', 'activation routes')} on <code>${HOST}/api</code>.</p>
      <p><code>SessionManager</code> maintains heartbeat intervals against ${L('/api/activations-sessions', 'session routes')} when your license policy requires concurrent or online enforcement. The cadence comes from the server's connect response, not from the license file.</p>
      <p><code>SessionDisconnected</code> fires when a heartbeat reports the license invalid (revoked, suspended, expired, blocked — the license's features are disabled), when a reconnect fails, and once with reason <code>Unreachable</code> after 3 unanswered heartbeats (the license stays loaded and retries continue). Handle it to tell the user what happened.</p>
      <p>${L('/sessions-activations', 'Dashboard narrative')} · ${L('/guides/platform/activations', 'Activations platform guide')}</p>
    `,
  },
  'features-usage': {
    title: 'Features & metered usage',
    lead: 'FeatureManager for entitlements, MeterManager for billable usage.',
    body: `
      <p><code>FeatureManager</code> evaluates entitlements deserialized from the signed license. Features are cleared as soon as the SDK decides the license is no longer good, so <code>IsFeatureEnabled</code> returns <code>false</code> after a revoke reaches the app.</p>
      <p><strong>Billable usage goes through <code>MeterManager</code>, not <code>FeatureUsageTracker</code>.</strong> <code>FeatureUsageTracker</code> is <code>[Obsolete]</code>: its sync endpoint no longer exists and it reports nothing, so metering built on it silently never bills. Call <code>LicenseClient.ConsumeMeterAsync</code> (or <code>ConsumeMeterWithRetryAsync</code>) with an operation id you create with <code>MeterManager.CreateOperationId</code> and persist before the call — see ${L('/credit-based-license', 'Credit-Based')} and ${L('/usage-based-license', 'Usage-Based')} for the full pattern, and ${L('/api/metering', 'Metering API')} for the routes.</p>
      <p>Feature definitions are authored in the dashboard and exposed over REST (catalog routes on <code>${HOST}/api</code>) — see ${L('/api/catalog', 'Catalog API topic')}.</p>
    `,
  },
  'offline-grace': {
    title: 'Offline cache & grace periods',
    lead: 'Expiry grace, offline files, and what happens when the API is unreachable.',
    body: `
      <p><code>GracePeriodManager</code> lets an <strong>expired</strong> license keep running for <code>GracePeriodDays</code> (default 0, off). It covers genuine expiry only — a license on the wrong device or with the wrong key is never accepted — and its start time is stored on the device, so restarting the app does not begin a new grace period.</p>
      <p>Offline (file) licenses validate locally after a one-time online check on the first run on each machine; <code>ValidateOfflineAsync</code> never contacts the server.</p>
      <p>Online licenses need the server. If <code>${HOST}/api</code> is unreachable at validation, validation fails: <code>OfflineCacheManager</code> records successful online validations, but there is no automatic fallback to it yet. During a run, unanswered heartbeats raise <code>SessionDisconnected</code> with reason <code>Unreachable</code>.</p>
      <p>Pair with the offline section in ${L('/sdk/dotnet', '.NET SDK guide')}.</p>
    `,
  },
  'updates-logging': {
    title: 'Updates & logging',
    lead: 'SdkUpdateManager and ILicenseLogger implementations.',
    body: `
      <p><code>SdkUpdateManager</code> calls <code>/api/Updates/...</code> with the current release id and license context so only eligible builds are offered.</p>
      <p>Implement <code>ILicenseLogger</code> for structured logs — file, HTTP to <code>/api/SdkLogs/...</code>, or composite sinks — depending on compliance needs.</p>
      <p>${L('/api/sdk-host', 'SDK host APIs')} · ${L('/api/telemetry', 'Telemetry topic')}</p>
    `,
  },
};

export function getSdkTopicEn(slug: string): DocTopic | null {
  return SDK_TOPICS_EN[slug] ?? null;
}
