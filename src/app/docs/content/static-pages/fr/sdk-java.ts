export const HTML = `<header class="help-page-header">
    <h1>Java (prévu)</h1>
    <p class="lead">Le support de Java est prévu. Il n’existe pas encore de package ni d’API Java : cette page ne contient donc pas de code.</p>
  </header>

  <h2>1. Comment cela fonctionnera</h2>
  <p>
    Comme le <a href="/sdk/python" class="doc-inline-link">package Python</a>, le package Java sera une fine couche au-dessus du SDK LicenPro compilé en bibliothèque native.
    La logique de licence n’est pas réécrite pour chaque langage : licences, activations et sessions se comporteront exactement comme en .NET et en Python.
  </p>

  <h2>2. Disponible aujourd’hui</h2>
  <div class="integration-grid">
    <a href="/sdk/dotnet" class="integration-card">
      <i class="ki-outline ki-microsoft"></i>
      <h4>.NET (C#)</h4>
      <p>Le package NuGet LicenPro.SDK</p>
    </a>
    <a href="/sdk/vbnet" class="integration-card">
      <i class="ki-outline ki-code"></i>
      <h4>VB.NET</h4>
      <p>Le même package, syntaxe VB</p>
    </a>
    <a href="/sdk/python" class="integration-card">
      <i class="ki-outline ki-python"></i>
      <h4>Python</h4>
      <p>Aperçu, Windows x64</p>
    </a>
  </div>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Besoin de Java ?</span>
      <p>Indiquez au <a href="https://licenpro.tech/support" class="doc-inline-link">support</a> la version de Java et le système d’exploitation que vous utilisez : cela nous aide à décider quoi construire en premier. Suivez le <a href="/changelog" class="doc-inline-link">journal des modifications</a> pour les versions du SDK.</p>
    </div>
  </div>` as const;
