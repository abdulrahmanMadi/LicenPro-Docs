import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

/** Screenshot with lightbox (full-resolution asset, no compression). */
const screenshot = (file: string, alt: string) =>
  `<figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/${file}" data-doc-image-alt="${alt}" aria-label="View screenshot full size">
      <img src="assets/docs/${file}" alt="${alt}" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Click image to open full-resolution preview.</figcaption>
  </figure>`;

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
    title: 'Auto updater & logging',
    lead: 'Publish a new build and your customers install it with one click: "Update & restart" downloads it, verifies it, installs it and reopens the app. No uninstall, no reinstall.',
    body: `
      <h3>What your customers see</h3>
      <p>When a newer build is available for their license, your app shows its version, size and release notes. <strong>Update &amp; restart</strong> installs it now, <strong>Later</strong> asks again the next time the app starts, and <strong>Skip this version</strong> stops prompts for that version. A mandatory update offers only <strong>Update &amp; restart</strong>.</p>
      ${screenshot('sdk-update-prompt.png', 'Update prompt in the WinForms sample: version, size, release notes, Skip this version, Later and Update &amp; restart')}
      <p>The window is yours (the ${L('/sdk/winforms', 'WinForms sample')} has one to copy); the SDK supplies the data and does the work.</p>
      <h3>How it works</h3>
      <ol>
        <li><strong>Publish</strong> a release in the dashboard with a <strong>zip of your app folder</strong> as its file. Publishing hashes the zip (SHA-256) and signs it with the product's RSA key. The release's <strong>Update package</strong> card shows "Ready for one-click update". New licenses receive every new release by default (the license's <strong>Receives new releases</strong> option); the release page shows how many licenses it is offered to.</li>
        <li><code>SdkUpdateManager.CheckForUpdateAsync</code> asks <code>/api/updates/check</code> which build this license may install. The answer depends on the license type, release pins and channel; with no channel, only Stable builds are offered. <code>UpdateAvailable</code> fires once per version.</li>
        <li><code>DownloadUpdateAsync(update, progress)</code> downloads from <code>/api/updates/download/{releaseId}</code> with your API key and the license key, then checks the size, SHA-256 and product-key signature before extracting anything. It refuses zip entries that would land outside the staging folder.</li>
        <li><code>ApplyUpdateAndRestart()</code> starts the new version as the installer and exits your app. The installer backs up the install folder, copies the new files, keeps <code>licenpro.cache</code> and <code>licenpro.settings.json</code>, and starts your app again. If anything fails it restores the backup. For an app in Program Files, Windows shows one UAC prompt.</li>
      </ol>
      <h3>Integrate</h3>
      <pre><code>// Program.Main — first line: installs a staged update, applies mandatory ones, reports restarts
SdkBootstrap.OnApplicationStartup(onRestarted: info =&gt; { /* info.Succeeded, info.FromVersion, info.Error */ });

// After the license validated
// Reports the running build (SdkUpdateManager.RunningVersion); pass currentAppVersion only to override it
client.EnableAutoUpdates(onUpdateAvailable: e =&gt; ShowPrompt(e.Update!));

// In your prompt's "Update &amp; restart" button
if (await SdkUpdateManager.DownloadUpdateAsync(update, progress) != null)
    SdkUpdateManager.ApplyUpdateAndRestart(() =&gt; Application.Exit());</code></pre>
      <h3>Who receives an update</h3>
      <ul>
        <li>The release is <strong>published</strong> with a verified update package, and <strong>Offer product updates to clients</strong> is on (Product → Settings → Client updates).</li>
        <li>The license is active and has <strong>Receives new releases</strong> on (the default for new licenses), or the release is assigned to the license, or its owner has <strong>Grant to all versions</strong> in the product's Manage Access.</li>
        <li>The release level matches the app's channel. Apps get Stable releases; an app that passes <code>releaseChannel: "Beta"</code> gets Beta releases instead.</li>
      </ul>
      <p>The release page shows the result: "Offered as an update to N active license(s)". See ${L('/guides/platform/releases', 'Releases')} for the update package settings.</p>
      <h3>Mandatory updates</h3>
      <ul>
        <li>Tick <strong>Mandatory update</strong> on the release, or set a <strong>Minimum supported version</strong>: clients older than it must install this update.</li>
        <li>The SDK starts the download in the background as soon as it finds the update and installs it at the next start, even if the user closed the app.</li>
        <li>Your prompt offers only "Update &amp; restart". The WinForms sample closes the app when the user refuses.</li>
      </ul>
      ${screenshot('sdk-update-prompt-mandatory.png', 'Mandatory update in the WinForms sample: only Update &amp; restart')}
      <h3>Safety</h3>
      <ul>
        <li>Before anything is extracted, the package's size, SHA-256 and product-key signature are checked, and zip entries that would land outside the staging folder are refused.</li>
        <li>Ship the product <strong>public key</strong> with your app (<code>LicensingSecrets.PublicKey</code> in <code>licenpro.settings.json</code>; it is not secret). Without it <code>UpdateInfo.CanInstall</code> is false and nothing is downloaded.</li>
        <li>The installer backs up the install folder and restores it if anything fails. <code>RollbackAndRestart()</code> returns to the previous version (one backup is kept).</li>
        <li><code>licenpro.cache</code> and <code>licenpro.settings.json</code> are kept, so the app stays activated after the update.</li>
      </ul>
      <h3>More options</h3>
      <ul>
        <li><code>SkipVersion(version)</code> stops prompts for a version.</li>
        <li><code>StageUpdateFromFile(zip, version)</code> stages a package delivered offline, for example on a USB stick to an air-gapped machine. It is not checked against the server.</li>
        <li>Update state lives in <code>%LocalAppData%\\LicenPro\\{app}\\updates</code>.</li>
      </ul>
      <h3>Troubleshooting</h3>
      <ul>
        <li><strong>No update is offered</strong>: the release is still a draft, the license does not receive it (check "Offered as an update to…" on the release page), or the release level is not the app's channel.</li>
        <li><strong>"Update &amp; restart" is unavailable</strong>: the app has no product public key, or the release file is not a verified zip package (release page → Update package → Verify package).</li>
        <li><strong>The app shows the old version after updating</strong>: set the version in your project file before you build the zip, and let the SDK report the running build instead of passing a fixed <code>currentAppVersion</code>.</li>
      </ul>
      <h3>Logging</h3>
      <p>Implement <code>ILicenseLogger</code> for structured logs (file, HTTP to <code>/api/SdkLogs/...</code>, or composite sinks), depending on your compliance needs.</p>
      <p>${L('/api/sdk-host', 'SDK host APIs')} · ${L('/api/telemetry', 'Telemetry topic')} · ${L('/sdk/winforms', 'WinForms sample')}</p>
    `,
  },
};

export function getSdkTopicEn(slug: string): DocTopic | null {
  return SDK_TOPICS_EN[slug] ?? null;
}
