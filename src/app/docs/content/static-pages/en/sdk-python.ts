export const HTML = `<header class="help-page-header">
    <h1>Python SDK</h1>
    <p class="lead">
      The <code>licenpro</code> package brings LicenPro licensing to Python. It is not a rewrite: the licensing logic is the LicenPro .NET SDK itself, compiled into a native library, with a small Python API on top.
      Licenses, activations and sessions therefore behave exactly as in .NET. No .NET runtime and no other Python packages are needed.
    </p>
  </header>

  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Preview: not on PyPI yet</span>
      <p>The package has not been published to PyPI yet, so <code>pip install licenpro</code> does not work today. Until it is published, ask <a href="https://licenpro.tech/support" class="doc-inline-link">support</a> for the preview build.
      It runs on <strong>Windows 64-bit (x64)</strong> only for now: Linux and macOS builds are not available yet, and 32-bit Python cannot load it.</p>
    </div>
  </div>

  <h2>1. Requirements and install</h2>
  <ul>
    <li>Windows x64 with 64-bit Python 3.8 or later.</li>
    <li>The same three things as every LicenPro client: the customer's <code>license.bin</code>, their license key, and your product public key (Base64, without PEM headers; see <a href="/rsa-keys" class="doc-inline-link">RSA keys</a>).</li>
  </ul>
  <p>Once the package is on PyPI:</p>

  <pre><code>pip install licenpro</code></pre>

  <h2>2. Validate a license</h2>
  <p>Use the client in a <code>with</code> block. Leaving the block ends the license session, like <code>Using</code> in VB.NET or <code>using</code> in C#.</p>

  <pre><code>from licenpro import LicenseClient

PUBLIC_KEY = "MIIBCgKCAQEA..."       # your product public key (Base64, without PEM headers)
LICENSE_KEY = "XXXX-XXXX-XXXX-XXXX"

with LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY) as client:
    result = client.validate()
    if not result.is_valid:
        print(result.status, result.error_title, result.error_message)
    else:
        print("Licensed:", result.license.type, result.license.expiration_date)
        if client.features.is_enabled("Premium"):
            ...  # unlock the premium part of your app</code></pre>

  <p>
    <code>validate()</code> runs the full check: the signed file, the server, the activation and the session when the license needs them.
    A refused license is a result with <code>is_valid</code> set to <code>False</code>, not an exception. <code>result.status</code> is one of <code>Valid</code>, <code>MissingInput</code>, <code>WrongFileType</code>, <code>InvalidFormat</code>, <code>SignatureMismatch</code>, <code>ValidationFailed</code>, <code>Expired</code>, <code>Revoked</code>, <code>DeviceBlocked</code>, <code>WrongLicenseType</code> or <code>CredentialsMismatch</code>, and <code>result.license</code> is <code>None</code> when validation fails.
  </p>
  <p>For a license that is allowed offline, <code>validate_offline()</code> checks the signature and the local rules without calling the server:</p>

  <pre><code>result = client.validate_offline()</code></pre>

  <h2>3. Options</h2>

  <pre><code>client = LicenseClient(
    "license.bin",
    public_key=PUBLIC_KEY,
    license_key=LICENSE_KEY,
    server_endpoint="https://licenpro.runasp.net/api",   # the default; change it if you host the API
    product_id="00000000-0000-0000-0000-000000000000",   # optional
    expected_license_type="Subscription",               # optional: refuse other license types
    enable_logging=False,                               # True: log files, and errors sent to the server
)</code></pre>

  <p>
    <code>expected_license_type</code> takes <code>Perpetual</code>, <code>Trial</code>, <code>Subscription</code>, <code>NodeLocked</code>, <code>Floating</code>, <code>Concurrent</code>, <code>MeteredToken</code> (Credit-Based) or <code>MeteredCount</code> (Usage-Based).
    With <code>enable_logging=True</code> the SDK writes log files and sends errors to the server, as the .NET SDK does.
  </p>

  <h2>4. Long-running apps</h2>
  <p>
    A desktop or server app keeps one client for its whole life and closes it when it exits. Use one client at a time per process, as in .NET.
    <code>validate()</code> waits until the SDK is done, network included: in a GUI app, call it from a worker thread.
  </p>

  <pre><code>client = LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY)
try:
    result = client.validate()
    ...  # run your application
finally:
    client.close()  # ends the license session; safe to call more than once</code></pre>

  <h2>5. Features and license details</h2>

  <pre><code>features = client.features        # empty until a validation succeeds
features.is_enabled("Premium")    # False when the feature is missing
features.get("MaxUsers", 1)       # numbers, strings, ISO 8601 dates, Base64 for bytes
"Edition" in features
features.as_dict()</code></pre>

  <p><code>result.license</code> also has <code>type</code>, <code>license_key</code>, <code>issuer</code>, <code>issued_on</code>, <code>expiration_date</code> (a <code>datetime</code>, or <code>None</code> when the license does not expire), <code>assigned_release_version</code>, <code>requires_online_validation</code> and <code>features</code>.</p>

  <h2>6. Errors</h2>
  <p><code>LicenProError</code> is raised only for misuse or unexpected failures: a closed client (<code>Closed</code>), invalid options (<code>InvalidArgument</code>), a missing native library (<code>NativeLibraryMissing</code>) or an unexpected error inside the SDK (<code>Exception</code>). It has <code>code</code> and <code>message</code>.</p>

  <pre><code>from licenpro import LicenseClient, LicenProError

try:
    with LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY) as client:
        result = client.validate()
except LicenProError as error:
    print(error.code, error.message)   # for example NativeLibraryMissing or InvalidArgument</code></pre>

  <h2>7. Device id and SDK version</h2>

  <pre><code>import licenpro

print(licenpro.sdk_version())   # version of the LicenPro SDK inside the package
print(licenpro.hardware_id())   # the device id LicenPro reports for this machine</code></pre>

  <h2>8. Python and .NET side by side</h2>
  <table class="doc-table">
    <thead>
      <tr><th>Python</th><th>.NET</th></tr>
    </thead>
    <tbody>
      <tr><td><code>LicenseClient(license_file, public_key, license_key, ...)</code></td><td><code>new LicenseClient(new LicenseClientOptions { ... })</code></td></tr>
      <tr><td><code>client.validate()</code>, <code>client.validate_offline()</code></td><td><code>Validate()</code>, <code>ValidateOffline()</code></td></tr>
      <tr><td><code>result.is_valid</code>, <code>status</code>, <code>error_title</code>, <code>error_message</code>, <code>license</code></td><td><code>IsValid</code>, <code>Status</code>, <code>ErrorTitle</code>, <code>ErrorMessage</code>, <code>License</code></td></tr>
      <tr><td><code>client.features.is_enabled("X")</code>, <code>client.features["X"]</code></td><td><code>FeatureManager.IsFeatureEnabled("X")</code>, <code>FeatureManager.GetFeatureInt("X")</code> …</td></tr>
      <tr><td><code>client.disconnect()</code>, <code>client.close()</code></td><td><code>DisconnectAsync()</code>, <code>DisposeAsync()</code></td></tr>
      <tr><td><code>licenpro.hardware_id()</code></td><td><code>new PersistedHardwareIdentifier().GetHardwareIdentifier()</code></td></tr>
    </tbody>
  </table>

  <h2>9. Not available from Python yet</h2>
  <p>
    Python exposes only what this page shows. These need the .NET package for now: metering (<code>ConsumeMeterAsync</code>, <code>GetBalanceAsync</code>), trials and trial extensions, license transfers, node-locked device management, events (session lost, license expiring), and custom loggers and hardware identifiers.
    One-click updates (<code>SdkUpdateManager</code>) are for .NET apps only, by design.
  </p>

  <h2>10. Related reading</h2>
  <div class="integration-grid">
    <a href="/quick-start" class="integration-card">
      <i class="ki-outline ki-flag"></i>
      <h4>Quick start</h4>
      <p>Product, keys and license file: the same for every language</p>
    </a>
    <a href="/rsa-keys" class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>RSA keys</h4>
      <p>Where the public key comes from</p>
    </a>
    <a href="/perpetual-license" class="integration-card">
      <i class="ki-outline ki-key"></i>
      <h4>License models</h4>
      <p>What each license type checks</p>
    </a>
  </div>` as const;
