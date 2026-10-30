export const HTML = `<header class="help-page-header">
    <h1>Java (planned)</h1>
    <p class="lead">Java support is planned. There is no Java package or API yet, so this page has no code.</p>
  </header>

  <h2>1. How it will work</h2>
  <p>
    Like the <a href="/sdk/python" class="doc-inline-link">Python package</a>, the Java package will be a thin wrapper over the LicenPro SDK compiled into a native library.
    The licensing logic is not rewritten for each language, so licenses, activations and sessions will behave exactly as they do in .NET and Python.
  </p>

  <h2>2. Available today</h2>
  <div class="integration-grid">
    <a href="/sdk/dotnet" class="integration-card">
      <i class="ki-outline ki-microsoft"></i>
      <h4>.NET (C#)</h4>
      <p>The LicenPro.SDK NuGet package</p>
    </a>
    <a href="/sdk/vbnet" class="integration-card">
      <i class="ki-outline ki-code"></i>
      <h4>VB.NET</h4>
      <p>The same package, VB syntax</p>
    </a>
    <a href="/sdk/python" class="integration-card">
      <i class="ki-outline ki-python"></i>
      <h4>Python</h4>
      <p>Preview, Windows x64</p>
    </a>
  </div>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Need Java?</span>
      <p>Tell <a href="https://licenpro.tech/support" class="doc-inline-link">support</a> which Java version and operating system you use: it helps us decide what to build first. Follow the <a href="/changelog" class="doc-inline-link">changelog</a> for SDK releases.</p>
    </div>
  </div>` as const;
