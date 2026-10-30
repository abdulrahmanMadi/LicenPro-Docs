export const HTML = `<header class="help-page-header">
    <h1>VB.NET SDK</h1>
    <p class="lead">
      تستخدم تطبيقات VB.NET حزمة NuGet نفسها التي تستخدمها تطبيقات <bdi>C#</bdi>، وهي <strong>LicenPro.SDK</strong>: الفئات نفسها، وملفات الترخيص نفسها، والسلوك نفسه.
      تعرض هذه الصفحة المهام الشائعة بصياغة VB، وكل ما في صفحات <bdi>.NET SDK</bdi> الأخرى ينطبق على VB كما هو.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">الحزمة ووقت التشغيل</span>
      <p>ثبّت <code>LicenPro.SDK</code> من NuGet. تحتوي الحزمة على نسختين <code>net8.0</code> و<code>net9.0</code>، لذا يجب أن يستهدف مشروع VB.NET الإصدار <bdi>.NET 8</bdi> أو أحدث. لا يمكن استخدامها من مشاريع <bdi>.NET Framework</bdi> ولا من VB6 أو VBA.</p>
    </div>
  </div>

  <pre><code>dotnet add package LicenPro.SDK</code></pre>

  <h2>1. بدء التشغيل</h2>
  <p>
    استدعِ <code>SdkBootstrap.OnApplicationStartup()</code> في أول سطر من <code>Sub Main</code>، قبل عرض أي نافذة. تحمّل الدالة الملف <code>licenpro.settings.json</code> وتثبّت أي تحديث تم تنزيله (ثم يُعاد تشغيل التطبيق بالإصدار الجديد).
    إذا كان مشروعك يستخدم إطار تطبيق VB (application framework) بدلاً من <code>Sub Main</code>، فاستدعِها في الحدث <code>Startup</code> داخل <code>ApplicationEvents.vb</code>.
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

  <h2>2. التحقق في النافذة الرئيسية</h2>
  <p>
    احتفظ بكائن <code>LicenseClient</code> واحد طوال عمر التطبيق. أنشئه على خيط الواجهة، مثلاً في الحدث <code>Shown</code>: عندها تصل أحداثه على خيط الواجهة، فتستطيع المعالجات تحديث عناصر التحكم مباشرة.
    يُبقي <code>Await ValidateAsync()</code> النافذة مستجيبة أثناء التحقق من الملف الموقّع والخادم والتفعيل والجلسة (عندما يتطلبها الترخيص).
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
      <span class="callout-title"><code>Dispose()</code> و<code>Using</code> يتطلبان حزمة أحدث من 1.8.7</span>
      <p>تطبّق الفئة <code>LicenseClient</code> الواجهة <code>IDisposable</code> بدءاً من الإصدار القادم من <code>LicenPro.SDK</code>. الإصدار 1.8.7، وهو الأحدث على NuGet حالياً، لا يوفّر إلا <code>DisposeAsync()</code>: استخدم معه الكود الموجود في القسم 5.</p>
    </div>
  </div>

  <p>
    رفض الترخيص نتيجةٌ وليس استثناءً: افحص <code>result.IsValid</code> و<code>result.Status</code>. ويحوّل <code>LicenseValidationFeedback.From(result)</code> الرفض إلى عنوان ورسالة لنافذة حوار.
    للترخيص المسموح باستخدامه دون اتصال، يتحقق <code>ValidateOfflineAsync()</code> من الملف الموقّع دون الاتصال بالخادم. أما <code>Validate()</code> و<code>ValidateOffline()</code> فنسختان متزامنتان لتطبيقات الكونسول؛ وفي النوافذ تُجمّدان الواجهة حتى يرد الخادم.
  </p>

  <h2>3. الميزات</h2>
  <p>يقرأ <code>FeatureManager</code> ميزات آخر ترخيص تم التحقق منه.</p>

  <pre><code>' After a successful validation; each call reads the validated license.
Dim premium As Boolean = FeatureManager.IsFeatureEnabled("Premium")
Dim maxUsers As Integer = FeatureManager.GetFeatureInt("MaxUsers")    ' 0 when missing
Dim edition As String = FeatureManager.GetFeatureString("Edition")    ' Nothing when missing</code></pre>

  <h2>4. الأحداث</h2>
  <p>اشترك فيها بـ <code>AddHandler</code> كما في النافذة الرئيسية أعلاه:</p>
  <ul>
    <li><code>LicenseExpiringSoon</code>: ينتهي اشتراك خلال <code>SubscriptionExpiryWarningDays</code> يوماً (الافتراضي 7؛ فعّل <code>IncludeTrialInExpiryWarnings</code> لتشمل التراخيص التجريبية). يحتوي <code>e.Notice</code> على <code>Title</code> و<code>Message</code> و<code>WholeDaysRemaining</code>.</li>
    <li><code>SessionDisconnected</code>: أبلغ heartbeat أن الترخيص غير صالح (فتُعطَّل ميزاته)، أو فشلت إعادة الاتصال، أو لم يرد الخادم على 3 heartbeats متتالية (السبب <code>Unreachable</code>؛ يبقى الترخيص محمّلاً ويواصل SDK المحاولة). الوسيط من نوع <code>String</code> هو السبب.</li>
  </ul>

  <h2>5. إنهاء جلسة الترخيص</h2>
  <p>التخلص من العميل يُبلغ الخادم بانتهاء الجلسة، فيُحرَّر مقعد ترخيص Floating أو Concurrent فوراً بدلاً من انتظار فوات heartbeats.</p>

  <h3>الإصدارات الأحدث من 1.8.7: Dispose و Using</h3>
  <p>
    في النوافذ، استدعِ <code>Dispose()</code> في <code>FormClosing</code> كما في الأعلى. الاستدعاء آمن على خيط الواجهة، واستدعاؤها مرة ثانية لا يفعل شيئاً.
    وللفحص القصير، مثل أداة كونسول، تُنهي كتلة <code>Using</code> الجلسة عند <code>End Using</code>:
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

  <h3>الإصدار 1.8.7 وما قبله: DisposeAsync</h3>
  <p>
    هذه الإصدارات لا تطبّق إلا <code>IAsyncDisposable</code>، لذا لا يُترجَم <code>Using</code> (الخطأ BC36010)، ولا تسمح VB باستخدام <code>Await</code> داخل <code>Finally</code>.
    استدعِ <code>Await client.DisposeAsync()</code> بعد كتلة <code>Try</code> بدلاً من ذلك:
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

  <p>وفي النوافذ، أبقِ النافذة مفتوحة حتى تنتهي الجلسة:</p>

  <pre><code>Private Async Sub MainForm_FormClosing(sender As Object, e As FormClosingEventArgs) Handles MyBase.FormClosing
    If _licenseClient Is Nothing Then Return

    e.Cancel = True                 ' keep the form open until the session has ended
    Dim client = _licenseClient
    _licenseClient = Nothing
    Await client.DisposeAsync()
    Close()                         ' runs this handler again, now with no client
End Sub</code></pre>

  <h2>6. قراءة صفحات <bdi>C#</bdi> بصياغة VB</h2>
  <p>تعرض صفحات SDK الأخرى أمثلة بلغة <bdi>C#</bdi>. هذه هي التراكيب التي تختلف:</p>
  <table class="doc-table">
    <thead>
      <tr><th><bdi>C#</bdi></th><th>VB.NET</th></tr>
    </thead>
    <tbody>
      <tr><td><code>new LicenseClientOptions { LicenseKey = key }</code></td><td><code>New LicenseClientOptions With {.LicenseKey = key}</code></td></tr>
      <tr><td><code>client.LicenseExpiringSoon += OnExpiring;</code></td><td><code>AddHandler client.LicenseExpiringSoon, AddressOf OnExpiring</code></td></tr>
      <tr><td><code>await client.ValidateAsync()</code></td><td><code>Await client.ValidateAsync()</code> داخل <code>Async Sub</code> أو <code>Async Function</code></td></tr>
      <tr><td><code>using var client = new LicenseClient(options);</code></td><td><code>Using client As New LicenseClient(options)</code> … <code>End Using</code> (أحدث من 1.8.7)</td></tr>
      <tr><td><code>await client.DisposeAsync();</code> داخل <code>finally</code></td><td><code>Await client.DisposeAsync()</code> بعد <code>End Try</code></td></tr>
      <tr><td><code>ConsumeMeterWithRetryAsync("Export", requestId, quantity: 2)</code></td><td><code>ConsumeMeterWithRetryAsync("Export", requestId, quantity:=2)</code></td></tr>
      <tr><td><code>if (client is not null)</code></td><td><code>If client IsNot Nothing Then</code></td></tr>
    </tbody>
  </table>

  <h2>7. قراءة ذات صلة</h2>
  <div class="integration-grid">
    <a href="/sdk/dotnet" class="integration-card">
      <i class="ki-outline ki-code"></i>
      <h4>تكامل <bdi>.NET</bdi></h4>
      <p>كل الخيارات والذاكرة المؤقتة والتحديثات والجلسات</p>
    </a>
    <a href="/sdk/winforms" class="integration-card">
      <i class="ki-outline ki-mouse"></i>
      <h4>WinForms</h4>
      <p>التطبيق النموذجي المرجعي (<bdi>C#</bdi>)</p>
    </a>
    <a href="/sdk/updates-logging" class="integration-card">
      <i class="ki-outline ki-cloud-download"></i>
      <h4>التحديث التلقائي</h4>
      <p>تحديث بضغطة واحدة، وبالـ API نفسه من VB</p>
    </a>
  </div>` as const;
