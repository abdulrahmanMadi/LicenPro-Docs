export const HTML = `<header class="help-page-header">
    <h1>Python SDK</h1>
    <p class="lead">
      Le package <code>licenpro</code> apporte les licences LicenPro à Python. Ce n’est pas une réécriture : la logique de licence est le SDK .NET de LicenPro lui-même, compilé en bibliothèque native, avec une petite API Python par-dessus.
      Les licences, activations et sessions se comportent donc exactement comme en .NET. Aucun runtime .NET ni autre package Python n’est nécessaire.
    </p>
  </header>

  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Aperçu : pas encore sur PyPI</span>
      <p>Le package n’est pas encore publié sur PyPI : <code>pip install licenpro</code> ne fonctionne donc pas aujourd’hui. En attendant, demandez la version d’aperçu au <a href="https://licenpro.tech/support" class="doc-inline-link">support</a>.
      Il fonctionne pour l’instant uniquement sous <strong>Windows 64 bits (x64)</strong> : les builds Linux et macOS ne sont pas encore disponibles, et un Python 32 bits ne peut pas le charger.</p>
    </div>
  </div>

  <h2>1. Prérequis et installation</h2>
  <ul>
    <li>Windows x64 avec Python 64 bits 3.8 ou plus récent.</li>
    <li>Les trois mêmes éléments que pour tout client LicenPro : le <code>license.bin</code> du client, sa clé de licence et la clé publique de votre produit (Base64, sans en-têtes PEM ; voir <a href="/rsa-keys" class="doc-inline-link">Clés RSA</a>).</li>
  </ul>
  <p>Une fois le package publié sur PyPI :</p>

  <pre><code>pip install licenpro</code></pre>

  <h2>2. Valider une licence</h2>
  <p>Utilisez le client dans un bloc <code>with</code>. Quitter le bloc termine la session de licence, comme <code>Using</code> en VB.NET ou <code>using</code> en C#.</p>

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
    <code>validate()</code> exécute la vérification complète : le fichier signé, le serveur, l’activation et la session quand la licence les exige.
    Une licence refusée est un résultat dont <code>is_valid</code> vaut <code>False</code>, pas une exception. <code>result.status</code> vaut <code>Valid</code>, <code>MissingInput</code>, <code>WrongFileType</code>, <code>InvalidFormat</code>, <code>SignatureMismatch</code>, <code>ValidationFailed</code>, <code>Expired</code>, <code>Revoked</code>, <code>DeviceBlocked</code>, <code>WrongLicenseType</code> ou <code>CredentialsMismatch</code>, et <code>result.license</code> vaut <code>None</code> en cas d’échec.
  </p>
  <p>Pour une licence autorisée hors ligne, <code>validate_offline()</code> vérifie la signature et les règles locales sans appeler le serveur :</p>

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
    <code>expected_license_type</code> accepte <code>Perpetual</code>, <code>Trial</code>, <code>Subscription</code>, <code>NodeLocked</code>, <code>Floating</code>, <code>Concurrent</code>, <code>MeteredToken</code> (Credit-Based) ou <code>MeteredCount</code> (Usage-Based).
    Avec <code>enable_logging=True</code>, le SDK écrit des fichiers de log et envoie les erreurs au serveur, comme le SDK .NET.
  </p>

  <h2>4. Applications de longue durée</h2>
  <p>
    Une application desktop ou serveur garde un seul client pendant toute sa vie et le ferme en quittant. Utilisez un seul client à la fois par processus, comme en .NET.
    <code>validate()</code> attend que le SDK ait fini, réseau compris : dans une application graphique, appelez-la depuis un thread de travail.
  </p>

  <pre><code>client = LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY)
try:
    result = client.validate()
    ...  # run your application
finally:
    client.close()  # ends the license session; safe to call more than once</code></pre>

  <h3>Exemple PyQt5</h3>
  <p>Exécutez <code>validate()</code> dans un <code>QThread</code> et renvoyez le résultat à l’interface avec un signal ; ne touchez les widgets Qt que depuis le thread de l’interface. Testé avec PyQt5 5.15 sous Windows x64.</p>

  <pre><code>import sys

from PyQt5.QtCore import QObject, QThread, pyqtSignal
from PyQt5.QtWidgets import QApplication, QLabel

from licenpro import LicenseClient

PUBLIC_KEY = "MIIBCgKCAQEA..."       # your product public key (Base64, without PEM headers)
LICENSE_KEY = "XXXX-XXXX-XXXX-XXXX"


class LicenseWorker(QObject):
    done = pyqtSignal(object)

    def __init__(self, client):
        super().__init__()
        self.client = client

    def run(self):
        self.done.emit(self.client.validate())  # runs on the worker thread


app = QApplication(sys.argv)
label = QLabel("Checking license...")
label.show()

client = LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY)
thread = QThread()
worker = LicenseWorker(client)
worker.moveToThread(thread)
thread.started.connect(worker.run)


def on_done(result):  # runs on the GUI thread
    if result.is_valid:
        label.setText(f"Licensed: {result.license.type}")
    else:
        label.setText(f"{result.error_title}: {result.error_message}")


worker.done.connect(on_done)
worker.done.connect(thread.quit)
app.aboutToQuit.connect(thread.wait)
app.aboutToQuit.connect(client.close)  # ends the license session
thread.start()
sys.exit(app.exec_())</code></pre>

  <h2>5. Fonctionnalités et détails de la licence</h2>

  <pre><code>features = client.features        # empty until a validation succeeds
features.is_enabled("Premium")    # False when the feature is missing
features.get("MaxUsers", 1)       # numbers, strings, ISO 8601 dates, Base64 for bytes
"Edition" in features
features.as_dict()</code></pre>

  <p><code>result.license</code> contient aussi <code>type</code>, <code>license_key</code>, <code>issuer</code>, <code>issued_on</code>, <code>expiration_date</code> (un <code>datetime</code>, ou <code>None</code> si la licence n’expire pas), <code>assigned_release_version</code>, <code>requires_online_validation</code> et <code>features</code>.</p>

  <h2>6. Erreurs</h2>
  <p><code>LicenProError</code> n’est levée qu’en cas de mauvaise utilisation ou d’échec inattendu : client fermé (<code>Closed</code>), options invalides (<code>InvalidArgument</code>), bibliothèque native absente (<code>NativeLibraryMissing</code>) ou erreur inattendue dans le SDK (<code>Exception</code>). Elle contient <code>code</code> et <code>message</code>.</p>

  <pre><code>from licenpro import LicenseClient, LicenProError

try:
    with LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY) as client:
        result = client.validate()
except LicenProError as error:
    print(error.code, error.message)   # for example NativeLibraryMissing or InvalidArgument</code></pre>

  <h2>7. Identifiant de l’appareil et version du SDK</h2>

  <pre><code>import licenpro

print(licenpro.sdk_version())   # version of the LicenPro SDK inside the package
print(licenpro.hardware_id())   # the device id LicenPro reports for this machine</code></pre>

  <h2>8. Python et .NET côte à côte</h2>
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

  <h2>9. Pas encore disponible en Python</h2>
  <p>
    Python n’expose que ce que montre cette page. Ces fonctions demandent pour l’instant le package .NET : le comptage (<code>ConsumeMeterAsync</code>, <code>GetBalanceAsync</code>), les essais et leurs prolongations, les transferts de licence, la gestion des appareils node-locked, les événements (session perdue, licence bientôt expirée), ainsi que les loggers et identifiants matériels personnalisés.
    Les mises à jour en un clic (<code>SdkUpdateManager</code>) sont réservées aux applications .NET, par conception.
  </p>

  <h2>10. Pour aller plus loin</h2>
  <div class="integration-grid">
    <a href="/quick-start" class="integration-card">
      <i class="ki-outline ki-flag"></i>
      <h4>Démarrage rapide</h4>
      <p>Produit, clés et fichier de licence : les mêmes pour chaque langage</p>
    </a>
    <a href="/rsa-keys" class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>Clés RSA</h4>
      <p>D’où vient la clé publique</p>
    </a>
    <a href="/perpetual-license" class="integration-card">
      <i class="ki-outline ki-key"></i>
      <h4>Modèles de licence</h4>
      <p>Ce que vérifie chaque type de licence</p>
    </a>
  </div>` as const;
