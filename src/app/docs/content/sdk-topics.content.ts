import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';

export const SDK_TOPICS: Record<string, DocTopic> = {
  overview: {
    title: '.NET SDK overview',
    lead: 'NuGet package layout, runtime responsibilities, and links to deep dives.',
    body: `
      <p>The <code>LicenPro.SDK</code> library validates signed licenses offline using your product <strong>public key</strong>, and optionally talks to <code>${HOST}/api</code> for online validation, activations, sessions, feature usage, and updates.</p>
      <h2>Major areas (source: <code>LicenPro.SDK.lib</code>)</h2>
      <ul>
        <li><strong>Core</strong> — <code>LicenseClient</code>, <code>LicenseBuilder</code>, serialization of license payloads.</li>
        <li><strong>Managers</strong> — <code>ActivationManager</code>, <code>SessionManager</code>, <code>OfflineCacheManager</code>, <code>LicenseTransferManager</code>, <code>TrialExtensionManager</code>, <code>GracePeriodManager</code>, <code>NodeLockedDeviceManager</code>.</li>
        <li><strong>Features</strong> — <code>FeatureManager</code>, <code>FeatureUsageTracker</code>, <code>UpdateChecker</code>.</li>
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
    `,
  },
  'activation-session': {
    title: 'Activation & sessions in the SDK',
    lead: 'Managers that talk to Activations and Sessions APIs.',
    body: `
      <p><code>ActivationManager</code> coordinates device binding and seat consumption against ${L('/api/activations-sessions', 'ActivationsController')} routes.</p>
      <p><code>SessionManager</code> maintains heartbeat intervals against ${L('/api/activations-sessions', 'SessionsController')} when your license policy requires concurrent or online enforcement.</p>
      <p>${L('/sessions-activations', 'Dashboard narrative')} · ${L('/guides/platform/activations', 'Activations platform guide')}</p>
    `,
  },
  'features-usage': {
    title: 'Features & usage tracking',
    lead: 'FeatureManager and optional telemetry.',
    body: `
      <p><code>FeatureManager</code> evaluates entitlements deserialized from the signed license. <code>FeatureUsageTracker</code> can POST usage counters to telemetry endpoints when your integration enables analytics.</p>
      <p>Feature definitions are authored in the dashboard and exposed over REST via <code>FeaturesController</code> / <code>EntitlementSetsController</code> — see ${L('/api/catalog', 'Catalog API topic')}.</p>
    `,
  },
  'offline-grace': {
    title: 'Offline cache & grace periods',
    lead: 'Resilience when the API is unreachable.',
    body: `
      <p><code>OfflineCacheManager</code> stores the last known-good validation outcome and license payload securely on disk.</p>
      <p><code>GracePeriodManager</code> applies your policy for how long the app may run without reaching <code>${HOST}/api</code> before hard-stopping or degrading features.</p>
      <p>Pair with the offline section in ${L('/sdk/dotnet', '.NET SDK guide')}.</p>
    `,
  },
  'updates-logging': {
    title: 'Updates & logging',
    lead: 'SdkUpdateManager and ILicenseLogger implementations.',
    body: `
      <p><code>SdkUpdateManager</code> calls <code>UpdatesController</code> with the current release id and license context so only eligible builds are offered.</p>
      <p>Implement <code>ILicenseLogger</code> for structured logs — file, HTTP to <code>SdkLogsController</code>, or composite sinks — depending on compliance needs.</p>
      <p>${L('/api/sdk-host', 'SDK host APIs')} · ${L('/api/telemetry', 'Telemetry topic')}</p>
    `,
  },
};

export function getSdkTopic(slug: string): DocTopic | null {
  return SDK_TOPICS[slug] ?? null;
}
