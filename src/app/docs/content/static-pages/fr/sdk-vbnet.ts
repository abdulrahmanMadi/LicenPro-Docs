export const HTML = `<header class="help-page-header">
    <h1>VB.NET</h1>
    <p class="lead">
      Les applications VB.NET utilisent le même package NuGet <strong>LicenPro.SDK</strong> que C# : les mêmes classes, les mêmes fichiers de licence et le même comportement.
      Cette page montre les tâches courantes en syntaxe VB. Tout ce que décrivent les autres pages du SDK .NET s’applique à VB sans changement.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Package et runtime</span>
      <p>Installez <code>LicenPro.SDK</code> depuis NuGet. Il contient des builds <code>net8.0</code> et <code>net9.0</code> : le projet VB.NET doit donc cibler .NET 8 ou plus récent. Les projets .NET Framework, VB6 et VBA ne peuvent pas l’utiliser.</p>
    </div>
  </div>

  <pre><code>dotnet add package LicenPro.SDK</code></pre>

  <h2>1. Démarrage</h2>
  <p>
    Appelez <code>SdkBootstrap.OnApplicationStartup()</code> en premier dans <code>Sub Main</code>, avant d’afficher un formulaire. Il charge <code>licenpro.settings.json</code> et installe une mise à jour téléchargée (l’application redémarre alors dans la nouvelle version).
    Si votre projet utilise le framework d’application VB au lieu de <code>Sub Main</code>, appelez-le dans l’événement <code>Startup</code> de <code>ApplicationEvents.vb</code>.
  </p>

  <pre><code>Imports LicenPro.SDK.AppHosting

Friend Module Program

    &lt;STAThread()&gt;
    Friend Sub Main(args As String())
        ' First line: loads licenpro.settings.json and installs a downloaded update (then exits and restarts).
        SdkBootstrap.OnApplicationStartup()

        Application.SetHighDpiMode(HighDpiMode.SystemAware)
        Application.EnableVisualStyles()
        Application.SetCompatibleTextRenderingDefault(False)
        Application.Run(New MainForm())
    End Sub

End Module</code></pre>

  <h2>2. Valider dans le formulaire principal</h2>
  <p>
    Gardez un seul <code>LicenseClient</code> pendant toute la vie de l’application. Créez-le sur le thread UI, par exemple dans <code>Shown</code> : ses événements arrivent alors sur le thread UI, et les gestionnaires peuvent mettre à jour les contrôles directement.
    <code>Await ValidateAsync()</code> garde la fenêtre réactive pendant la vérification du fichier signé, du serveur, de l’activation et de la session (quand la licence les exige).
  </p>

  <pre><code>Imports LicenPro.SDK
Imports LicenPro.SDK.AppHosting

Public Class MainForm
    ' Your product public key (Base64, without PEM headers).
    Private Const PublicKeyBase64 As String = "MIIBCgKCAQEA..."

    Private _licenseClient As LicenseClient

    Private Async Sub MainForm_Shown(sender As Object, e As EventArgs) Handles MyBase.Shown
        ' Created on the UI thread, so the client's events also arrive on the UI thread.
        _licenseClient = New LicenseClient(New LicenseClientOptions With {
            .LicenseFilePath = "C:\\ProgramData\\MyApp\\license.bin",
            .PublicKey = PublicKeyBase64,
            .LicenseKey = txtLicenseKey.Text
        })
        AddHandler _licenseClient.LicenseExpiringSoon, AddressOf OnLicenseExpiringSoon
        AddHandler _licenseClient.SessionDisconnected, AddressOf OnSessionDisconnected

        Dim result = Await _licenseClient.ValidateAsync()
        If result.IsValid Then
            lblStatus.Text = $"Licensed ({result.License.Type})"
            btnExport.Enabled = FeatureManager.IsFeatureEnabled("Premium")
        Else
            Dim feedback = LicenseValidationFeedback.From(result)
            MessageBox.Show(feedback.DialogMessage, feedback.DialogTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning)
        End If
    End Sub

    Private Sub OnLicenseExpiringSoon(sender As Object, e As LicenseExpiryNoticeEventArgs)
        MessageBox.Show(e.Notice.Message, e.Notice.Title)
    End Sub

    Private Sub OnSessionDisconnected(sender As Object, reason As String)
        lblStatus.Text = $"License session ended: {reason}"
    End Sub

    Private Sub MainForm_FormClosing(sender As Object, e As FormClosingEventArgs) Handles MyBase.FormClosing
        ' Ends the license session. Safe on the UI thread.
        _licenseClient?.Dispose()
    End Sub
End Class</code></pre>

  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title"><code>Dispose()</code> et <code>Using</code> nécessitent un package plus récent que 1.8.7</span>
      <p><code>LicenseClient</code> implémente <code>IDisposable</code> à partir de la prochaine version de <code>LicenPro.SDK</code>. La version 1.8.7, la plus récente sur NuGet aujourd’hui, n’a que <code>DisposeAsync()</code> : avec elle, utilisez le code de la section 5.</p>
    </div>
  </div>

  <p>
    Une licence refusée est un résultat, pas une exception : vérifiez <code>result.IsValid</code> et <code>result.Status</code>. <code>LicenseValidationFeedback.From(result)</code> transforme un refus en titre et message pour une boîte de dialogue.
    Pour une licence autorisée hors ligne, <code>ValidateOfflineAsync()</code> vérifie le fichier signé sans appeler le serveur. <code>Validate()</code> et <code>ValidateOffline()</code> sont des versions synchrones pour les applications console ; dans un formulaire, elles figeraient la fenêtre jusqu’à la réponse du serveur.
  </p>

  <h2>3. Fonctionnalités</h2>
  <p><code>FeatureManager</code> lit les fonctionnalités de la dernière licence validée.</p>

  <pre><code>' After a successful validation; each call reads the validated license.
Dim premium As Boolean = FeatureManager.IsFeatureEnabled("Premium")
Dim maxUsers As Integer = FeatureManager.GetFeatureInt("MaxUsers")    ' 0 when missing
Dim edition As String = FeatureManager.GetFeatureString("Edition")    ' Nothing when missing</code></pre>

  <h2>4. Événements</h2>
  <p>Abonnez-vous avec <code>AddHandler</code>, comme dans le formulaire ci-dessus :</p>
  <ul>
    <li><code>LicenseExpiringSoon</code> : un abonnement se termine dans les <code>SubscriptionExpiryWarningDays</code> jours (7 par défaut ; activez <code>IncludeTrialInExpiryWarnings</code> pour inclure les essais). <code>e.Notice</code> contient <code>Title</code>, <code>Message</code> et <code>WholeDaysRemaining</code>.</li>
    <li><code>SessionDisconnected</code> : un heartbeat a signalé la licence invalide (ses fonctionnalités sont alors désactivées), une reconnexion a échoué, ou le serveur n’a pas répondu à 3 heartbeats de suite (raison <code>Unreachable</code> ; la licence reste chargée et le SDK continue d’essayer). L’argument <code>String</code> est la raison.</li>
  </ul>

  <h2>5. Terminer la session de licence</h2>
  <p>Libérer le client (<code>Dispose</code>) signale au serveur la fin de la session : un siège Floating ou Concurrent est libéré tout de suite, sans attendre des heartbeats manqués.</p>

  <h3>Plus récent que 1.8.7 : Dispose et Using</h3>
  <p>
    Dans un formulaire, appelez <code>Dispose()</code> dans <code>FormClosing</code>, comme ci-dessus. C’est sûr sur le thread UI, et un second appel ne fait rien.
    Pour une vérification courte, comme un outil console, un bloc <code>Using</code> termine la session à <code>End Using</code> :
  </p>

  <pre><code>Imports LicenPro.SDK

Module Program
    Sub Main()
        Dim options As New LicenseClientOptions With {
            .LicenseFilePath = "license.bin",
            .PublicKey = "MIIBCgKCAQEA...",
            .LicenseKey = "XXXX-XXXX-XXXX-XXXX"
        }

        Using client As New LicenseClient(options)
            Dim result = client.Validate()
            If result.IsValid Then
                Console.WriteLine($"Licensed: {result.License.LicenseKey}")
            Else
                Console.WriteLine($"{result.ErrorTitle}: {result.ErrorMessage}")
            End If
        End Using ' ends the license session
    End Sub
End Module</code></pre>

  <h3>1.8.7 et antérieures : DisposeAsync</h3>
  <p>
    Ces versions n’implémentent que <code>IAsyncDisposable</code> : <code>Using</code> ne compile donc pas (erreur BC36010), et VB n’autorise pas <code>Await</code> dans <code>Finally</code>.
    Appelez plutôt <code>Await client.DisposeAsync()</code> après le bloc <code>Try</code> :
  </p>

  <pre><code>Imports LicenPro.Exceptions
Imports LicenPro.SDK

Friend Module LicenseCheck
    Public Async Function CheckLicenseAsync(options As LicenseClientOptions) As Task(Of String)
        Dim client As New LicenseClient(options)
        Dim outcome As String
        Try
            Dim result = Await client.ValidateAsync()
            outcome = If(result.IsValid, "Licensed", result.ErrorMessage)
        Catch ex As LicenseException
            outcome = ex.Message
        End Try

        ' VB cannot Await inside Finally, so the session ends after the Try block.
        Await client.DisposeAsync()
        Return outcome
    End Function
End Module</code></pre>

  <p>Dans un formulaire, gardez la fenêtre ouverte jusqu’à la fin de la session :</p>

  <pre><code>Private Async Sub MainForm_FormClosing(sender As Object, e As FormClosingEventArgs) Handles MyBase.FormClosing
    If _licenseClient Is Nothing Then Return

    e.Cancel = True                 ' keep the form open until the session has ended
    Dim client = _licenseClient
    _licenseClient = Nothing
    Await client.DisposeAsync()
    Close()                         ' runs this handler again, now with no client
End Sub</code></pre>

  <h2>6. Lire les pages C# en VB</h2>
  <p>Les autres pages du SDK montrent du C#. Voici les constructions qui changent :</p>
  <table class="doc-table">
    <thead>
      <tr><th>C#</th><th>VB.NET</th></tr>
    </thead>
    <tbody>
      <tr><td><code>new LicenseClientOptions { LicenseKey = key }</code></td><td><code>New LicenseClientOptions With {.LicenseKey = key}</code></td></tr>
      <tr><td><code>client.LicenseExpiringSoon += OnExpiring;</code></td><td><code>AddHandler client.LicenseExpiringSoon, AddressOf OnExpiring</code></td></tr>
      <tr><td><code>await client.ValidateAsync()</code></td><td><code>Await client.ValidateAsync()</code> dans une <code>Async Sub</code> ou une <code>Async Function</code></td></tr>
      <tr><td><code>using var client = new LicenseClient(options);</code></td><td><code>Using client As New LicenseClient(options)</code> … <code>End Using</code> (plus récent que 1.8.7)</td></tr>
      <tr><td><code>await client.DisposeAsync();</code> dans <code>finally</code></td><td><code>Await client.DisposeAsync()</code> après <code>End Try</code></td></tr>
      <tr><td><code>ConsumeMeterWithRetryAsync("Export", requestId, quantity: 2)</code></td><td><code>ConsumeMeterWithRetryAsync("Export", requestId, quantity:=2)</code></td></tr>
      <tr><td><code>if (client is not null)</code></td><td><code>If client IsNot Nothing Then</code></td></tr>
    </tbody>
  </table>

  <h2>7. Pour aller plus loin</h2>
  <div class="integration-grid">
    <a href="/sdk/dotnet" class="integration-card">
      <i class="ki-outline ki-code"></i>
      <h4>Intégration .NET</h4>
      <p>Toutes les options, cache, mises à jour, sessions</p>
    </a>
    <a href="/sdk/winforms" class="integration-card">
      <i class="ki-outline ki-mouse"></i>
      <h4>WinForms</h4>
      <p>L’application exemple de référence (C#)</p>
    </a>
    <a href="/sdk/updates-logging" class="integration-card">
      <i class="ki-outline ki-cloud-download"></i>
      <h4>Mise à jour automatique</h4>
      <p>Mises à jour en un clic, même API en VB</p>
    </a>
  </div>` as const;
