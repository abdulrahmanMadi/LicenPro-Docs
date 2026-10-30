export const HTML = `<header class="help-page-header">
    <h1>VB.NET</h1>
    <p class="lead">
      VB.NET apps use the same <strong>LicenPro.SDK</strong> NuGet package as C#: the same classes, the same license files and the same behavior.
      This page shows the common tasks in VB syntax. Everything on the other .NET SDK pages applies to VB unchanged.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Package and runtime</span>
      <p>Install <code>LicenPro.SDK</code> from NuGet. It ships <code>net8.0</code> and <code>net9.0</code> builds, so the VB.NET project must target .NET 8 or later. Projects on .NET Framework, VB6 and VBA cannot use it.</p>
    </div>
  </div>

  <pre><code>dotnet add package LicenPro.SDK</code></pre>

  <h2>1. Startup</h2>
  <p>
    Call <code>SdkBootstrap.OnApplicationStartup()</code> first in <code>Sub Main</code>, before any form is shown. It loads <code>licenpro.settings.json</code> and installs a downloaded update (the app then restarts as the new version).
    If your project uses the VB application framework instead of <code>Sub Main</code>, call it in the <code>Startup</code> event in <code>ApplicationEvents.vb</code>.
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

  <h2>2. Validate in the main form</h2>
  <p>
    Keep one <code>LicenseClient</code> for the life of the app. Create it on the UI thread, for example in <code>Shown</code>: its events are then raised on the UI thread, so the handlers can update controls directly.
    <code>Await ValidateAsync()</code> keeps the window responsive while it checks the signed file, the server, the activation and the session (when the license needs them).
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
      <span class="callout-title"><code>Dispose()</code> and <code>Using</code> need a package newer than 1.8.7</span>
      <p><code>LicenseClient</code> implements <code>IDisposable</code> from the next <code>LicenPro.SDK</code> release. Version 1.8.7, the latest on NuGet today, only has <code>DisposeAsync()</code>: use the code in section 5 with it.</p>
    </div>
  </div>

  <p>
    A refused license is a result, not an exception: check <code>result.IsValid</code> and <code>result.Status</code>. <code>LicenseValidationFeedback.From(result)</code> turns a refusal into a title and message for a dialog.
    For a license that is allowed offline, <code>ValidateOfflineAsync()</code> checks the signed file without calling the server. <code>Validate()</code> and <code>ValidateOffline()</code> are synchronous versions for console apps; in a form they would freeze the window until the server answers.
  </p>

  <h2>3. Features</h2>
  <p><code>FeatureManager</code> reads the features of the license that was validated last.</p>

  <pre><code>' After a successful validation; each call reads the validated license.
Dim premium As Boolean = FeatureManager.IsFeatureEnabled("Premium")
Dim maxUsers As Integer = FeatureManager.GetFeatureInt("MaxUsers")    ' 0 when missing
Dim edition As String = FeatureManager.GetFeatureString("Edition")    ' Nothing when missing</code></pre>

  <h2>4. Events</h2>
  <p>Subscribe with <code>AddHandler</code>, as in the main form above:</p>
  <ul>
    <li><code>LicenseExpiringSoon</code>: a subscription ends within <code>SubscriptionExpiryWarningDays</code> (default 7; set <code>IncludeTrialInExpiryWarnings</code> to include trials). <code>e.Notice</code> has <code>Title</code>, <code>Message</code> and <code>WholeDaysRemaining</code>.</li>
    <li><code>SessionDisconnected</code>: a heartbeat reported the license invalid (its features are then disabled), a reconnect failed, or the server missed 3 heartbeats in a row (reason <code>Unreachable</code>; the license stays loaded and the SDK keeps retrying). The <code>String</code> argument is the reason.</li>
  </ul>

  <h2>5. Ending the license session</h2>
  <p>Disposing the client tells the server that the session ended, so a Floating or Concurrent seat is released at once instead of after missed heartbeats.</p>

  <h3>Newer than 1.8.7: Dispose and Using</h3>
  <p>
    In a form, call <code>Dispose()</code> in <code>FormClosing</code>, as above. It is safe on the UI thread, and calling it again does nothing.
    For a short check, such as a console tool, a <code>Using</code> block ends the session at <code>End Using</code>:
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

  <h3>1.8.7 and earlier: DisposeAsync</h3>
  <p>
    These versions only implement <code>IAsyncDisposable</code>, so <code>Using</code> does not compile (error BC36010), and VB cannot <code>Await</code> inside <code>Finally</code>.
    Call <code>Await client.DisposeAsync()</code> after the <code>Try</code> block instead:
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

  <p>In a form, keep the window open until the session has ended:</p>

  <pre><code>Private Async Sub MainForm_FormClosing(sender As Object, e As FormClosingEventArgs) Handles MyBase.FormClosing
    If _licenseClient Is Nothing Then Return

    e.Cancel = True                 ' keep the form open until the session has ended
    Dim client = _licenseClient
    _licenseClient = Nothing
    Await client.DisposeAsync()
    Close()                         ' runs this handler again, now with no client
End Sub</code></pre>

  <h2>6. Reading the C# pages in VB</h2>
  <p>The other SDK pages show C#. These are the constructs that change:</p>
  <table class="doc-table">
    <thead>
      <tr><th>C#</th><th>VB.NET</th></tr>
    </thead>
    <tbody>
      <tr><td><code>new LicenseClientOptions { LicenseKey = key }</code></td><td><code>New LicenseClientOptions With {.LicenseKey = key}</code></td></tr>
      <tr><td><code>client.LicenseExpiringSoon += OnExpiring;</code></td><td><code>AddHandler client.LicenseExpiringSoon, AddressOf OnExpiring</code></td></tr>
      <tr><td><code>await client.ValidateAsync()</code></td><td><code>Await client.ValidateAsync()</code> inside an <code>Async Sub</code> or <code>Async Function</code></td></tr>
      <tr><td><code>using var client = new LicenseClient(options);</code></td><td><code>Using client As New LicenseClient(options)</code> … <code>End Using</code> (newer than 1.8.7)</td></tr>
      <tr><td><code>await client.DisposeAsync();</code> in <code>finally</code></td><td><code>Await client.DisposeAsync()</code> after <code>End Try</code></td></tr>
      <tr><td><code>ConsumeMeterWithRetryAsync("Export", requestId, quantity: 2)</code></td><td><code>ConsumeMeterWithRetryAsync("Export", requestId, quantity:=2)</code></td></tr>
      <tr><td><code>if (client is not null)</code></td><td><code>If client IsNot Nothing Then</code></td></tr>
    </tbody>
  </table>

  <h2>7. Related reading</h2>
  <div class="integration-grid">
    <a href="/sdk/dotnet" class="integration-card">
      <i class="ki-outline ki-code"></i>
      <h4>.NET integration</h4>
      <p>All options, cache, updates, sessions</p>
    </a>
    <a href="/sdk/winforms" class="integration-card">
      <i class="ki-outline ki-mouse"></i>
      <h4>WinForms</h4>
      <p>The reference sample app (C#)</p>
    </a>
    <a href="/sdk/updates-logging" class="integration-card">
      <i class="ki-outline ki-cloud-download"></i>
      <h4>Auto updater</h4>
      <p>One-click updates, same API from VB</p>
    </a>
  </div>` as const;
