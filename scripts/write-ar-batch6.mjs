import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/app/docs/content/static-pages/ar');
const w = (name, html) => {
  fs.writeFileSync(path.join(arDir, `${name}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
};

w('sdk-dotnet', `<header class="help-page-header">
    <h1>.NET SDK</h1>
    <p class="lead">
      حزمة <strong>LicenPro</strong> على NuGet هي الطريقة المدعومة للتحقق من <code>license.bin</code>، وتشغيل activations وsessions،
      وعرض تحذيرات انتهاء الاشتراك، وتنفيذ تحديثات المنتج <strong>الواعية بالترخيص</strong>. تعكس هذه الصفحة واجهة API العامة المستخدمة في تطبيق WinForms المرجعي ومصدر SDK (وليس عينات قديمة أشارت إلى حزم غير موجودة).
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">الحزمة ووقت التشغيل</span>
      <p>استهدف <strong>.NET 6+</strong> أو <strong>.NET Framework 4.7.2+</strong>. ثبّت <code>LicenPro</code> من NuGet (تُشحن تجميعة SDK كإصدار 1.7.x — راجع NuGet للأحدث). مساحات الأسماء الأكثر استخداماً: <code>LicenPro.SDK</code>، <code>LicenPro.Models.Utils</code>، <code>LicenPro.SDK.AppHosting</code>، <code>LicenPro.SDK.Updates</code>.</p>
    </div>
  </div>

  <h2>1. الإعداد وعنوان URL الأساسي لـ API</h2>
  <p>
    تذهب تقريباً كل استدعاء إلى LicenPro API الخاص بك. يجب أن يكون عنوان URL الأساسي مطلقاً وينتهي بـ <code>/api</code>.
    المضيف السحابي المشترك هو <code>https://licenpro.runasp.net/api</code>. إذا استضفت API بنفسك، استبدل المضيف بنشرك (نفس لاحقة <code>/api</code>).
  </p>
  <p>ترتيب حل الإعدادات:</p>
  <ol style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><code>SdkConfiguration.Initialize(...)</code> إذا استدعيتها بنفسك.</li>
    <li>وإلا يفحص SDK مجلد قاعدة التطبيق بحثاً عن <code>licenpro.settings.json</code>، ثم <code>appsettings.json</code> (قد يحتوي أي من الملفين على كائن <code>LicenPro</code> متداخل بنفس شكل <code>SdkSettings</code>).</li>
    <li>إذا لم يُعثر على شيء، تُطبَّق القيم الافتراضية المدمجة (أعد التعريف للاستضافة الذاتية).</li>
  </ol>

  <pre><code>dotnet add package LicenPro

using LicenPro.Models.Utils;
using LicenPro.SDK;

var settings = new SdkSettings {{ '{' }}
    ServerBaseEndpoint = "https://licenpro.runasp.net/api"
{{ '}' }};
SdkConfiguration.Initialize(settings);</code></pre>

  <p>
    عند إنشاء <code>LicenseClient</code>، يمكنك تعيين <code>LicenseClientOptions.ServerEndpoint</code>؛ يُطبِّع العميل العنوان لينتهي بـ <code>/api</code> ويستدعي <code>SdkConfiguration.Initialize</code> أثناء التحقق عند الحاجة.
    يُلتقط <code>LicensingSecrets:ApiKey</code> الاختياري في ملفات JSON نفسها لاستدعاءات dashboard API المصادق عليها (تتبع الاستخدام وبعض التدفقات المتقدمة).
  </p>

  <h2>2. بدء تشغيل سطح المكتب: تحديثات مُجهَّزة</h2>
  <p>
    لـ WinForms أو WPF أو أي عملية سطح مكتب، استدعِ <code>SdkBootstrap.OnApplicationStartup()</code> مرة واحدة قبل عرض واجهة المستخدم.
    يمس <code>SdkConfiguration.Settings</code> (ما يُطلق تحميل الملف الافتراضي) ويكمل أي <strong>تحديث منتج معلّق</strong> تم تجهيزه في تشغيل سابق.
  </p>

  <pre><code>using LicenPro.SDK.AppHosting;

SdkBootstrap.OnApplicationStartup();</code></pre>

  <h2>3. LicenseClient والتحقق</h2>
  <p>
    <code>LicenseClient</code> هو الواجهة الرئيسية. أنشئه بـ <code>LicenseClientOptions</code>: على الأقل <code>LicenseFilePath</code>، و<code>PublicKey</code> (Base64، بدون رؤوس PEM)، و<code>LicenseKey</code>.
    استدعِ <code>ValidateAsync()</code> للمسار الكامل عبر الإنترنت (التوقيع، قواعد الخادم، التفعيل، ربط session). استخدم <code>ValidateOfflineAsync()</code> عندما تتخطّى فحوصات الخادم المباشرة عمداً بعد أن تثق بالملف.
  </p>

  <pre><code>using LicenPro.SDK;
using LicenPro.SDK.Enums;

var client = new LicenseClient(new LicenseClientOptions {{ '{' }}
    LicenseFilePath = "C:/ProgramData/MyApp/license.bin",
    PublicKey = publicKeyBase64,
    LicenseKey = "LP-XXXX-...",
    ExpectedLicenseType = LicenseType.Perpetual, // optional filter
    ProductId = "00000000-0000-0000-0000-000000000000", // optional; helps update checks if not in file
    SubscriptionExpiryWarningDays = 7,          // default; 0 disables
    IncludeTrialInExpiryWarnings = false          // set true to warn on trial expiry too
{{ '}' }});

var result = await client.ValidateAsync();

if (result.IsValid)
{{ '{' }}
    // result.License — strongly typed graph
    // result.ExpiryNotice — populated for subscription/trial inside warning window
    client.LicenseExpiringSoon += (_, e) =&gt; {{ '{' }} /* UI prompt */ {{ '}' }};
{{ '}' }}
else
{{ '{' }}
    // result.Status — LicenseValidationStatus enum
    // result.ErrorTitle / result.ErrorMessage — user-facing copy
{{ '}' }}

await client.DisposeAsync();</code></pre>

  <div class="help-callout warning">
    <i class="ki-outline ki-shield-cross"></i>
    <div>
      <span class="callout-title">نموذج الحالة</span>
      <p>استخدم <code>result.IsValid</code> و<code>result.Status</code> (<code>LicenseValidationStatus</code>: Valid، Expired، Revoked، SignatureMismatch، CredentialsMismatch، WrongLicenseType، DeviceBlocked، InvalidFormat، وغيرها). العينات القديمة التي أشارت إلى <code>LicenseStatus</code> في نتيجة التحقق غير صحيحة لهذه واجهة API.</p>
    </div>
  </div>

  <h2>4. عرض الفشل بشكل مناسب للواجهة</h2>
  <p>
    <code>LicenPro.SDK.AppHosting.LicenseValidationFeedback.From(result)</code> يحوّل <code>LicenseValidationResult</code> الفاشلة إلى عناوين ونص وألوان ARGB لشرائط الحالة أو مربعات الرسائل دون سحب أنواع WinForms إلى view models.
  </p>

  <h2>5. الذاكرة المؤقتة دون اتصال و«التشغيل التالي»</h2>
  <p>
    <code>LicenseClient.ValidateAndCacheAsync(...)</code> يقرأ <code>license.bin</code> (بما في ذلك الحمولات المحمية/المشفّرة المفكوكة بمفتاح الترخيص)، يتحقق، وعند النجاح يحفظ بيانات الاعتماد والبايتات للبدء السريع.
    في تشغيل لاحق، <code>LicenseClient.TryAutoValidateAsync(licenseKey, publicKey)</code> يعيد تحميل الذاكرة المؤقتة، يعيد التحقق، ويُرجع <code>CacheValidationResult</code> مع <code>Client</code> جاهز لـ <code>ConnectSessionAsync</code> إذا كنت ما زلت تحتاج ميزات عبر الإنترنت.
    إذا كُتبت الذاكرة المؤقتة بتنسيق مشفّر أقدم، قد يُرجع TryAuto <code>LicenseKeyRequired</code> حتى يُدخل المستخدم المفتاح مرة واحدة.
  </p>

  <h2>6. إشعارات انتهاء الاشتراك</h2>
  <p>
    قد يضبط التحقق الناجح <code>result.ExpiryNotice</code> عندما يكون الاشتراك (أو trial، إن فُعّل) داخل نافذة التحذير المكونة بالأيام الكاملة.
    يُطلق العميل أيضاً <code>LicenseExpiringSoon</code> على سياق المزامنة المُلتقط في المُنشئ (مثالي لخيوط واجهة WinForms/WPF).
  </p>

  <h2>7. تحديثات المنتج الواعية بالترخيص</h2>
  <p>
    بعد التحقق، يُبقي SDK مدير التحديثات متزامناً مع مفتاح الترخيص وhardware id وproduct id (من حمولة الترخيص الموسّعة أو <code>LicenseClientOptions.ProductId</code>).
    استخدم <code>SdkUpdateExtensions</code> على مثيل <code>LicenseClient</code>: <code>EnableAutoUpdates(...)</code> للفحوصات الدورية، <code>CheckAndApplyUpdateAsync(...)</code> للتنزيل والتجهيز الصريح، و<code>DisableAutoUpdates()</code> لإيقاف المؤقتات.
    قواعد الأهلية (perpetual مقابل subscription مقابل node-locked، وتثبيت الإصدارات، و«كل الإصدارات») تُفرَض من جانب الخادم؛ يوفّر SDK الهوية وسياق الإصدار فقط.
  </p>

  <h2>8. Sessions والقياس عن بُعد</h2>
  <p>
    يحاول التحقق الناجح عبر الإنترنت التفعيل وربط session داخل <code>ValidateAsync</code>. يمكنك استدعاء <code>ConnectSessionAsync</code> لاحقاً لتطبيقات سطح المكتب طويلة التشغيل. اشترك في <code>SessionDisconnected</code> للاستجابة لفقدان heartbeat.
    يرى مشغّلو لوحة التحكم البيانات ضمن Sessions / Activations — راجع <a href="/sessions-activations" class="doc-inline-link">Sessions &amp; activations</a>.
  </p>

  <h2>9. سلسلة الإصدار للتحديثات</h2>
  <p>
    <code>SdkAssemblyInfo.GetSemanticVersionString(Assembly.GetExecutingAssembly())</code> مساعد صغير ليستقبل قناة التحديث سلسلة بأسلوب semver متسقة مع الإصدارات المعبأة.
  </p>

  <h2>10. قراءة ذات صلة</h2>
  <div class="integration-grid">
    <a href="/sdk/winforms" class="integration-card">
      <i class="ki-outline ki-mouse"></i>
      <h4>WinForms</h4>
      <p>أنماط مرجعية من التطبيق النموذجي</p>
    </a>
    <a href="/sdk/wpf" class="integration-card">
      <i class="ki-outline ki-element-11"></i>
      <h4>WPF</h4>
      <p>نفس SDK، دورة حياة متوافقة مع MVVM</p>
    </a>
    <a href="/api/overview" class="integration-card">
      <i class="ki-outline ki-data"></i>
      <h4>REST API</h4>
      <p>أتمتة التراخيص خارج العميل</p>
    </a>
  </div>`);

w('sdk-winforms', `<header class="help-page-header">
    <h1>تكامل WinForms</h1>
    <p class="lead">
      يستضيف WinForms حزمة <strong>LicenPro</strong> على NuGet نفسها كأي تطبيق .NET لسطح المكتب. لا توجد حزمة منفصلة <code>LicenPro.WinForms</code> — تربط التحقق والذاكرة المؤقتة وsessions والتحديثات بـ <code>LicenseClient</code> و<code>SdkBootstrap</code> وواجهة اختيارية تبنيها في نماذجك.
      تعكس الأنماط أدناه تطبيق <strong>Licenses-Test-Winforms-App</strong> الرسمي المُشحن بجانب SDK.
    </p>
  </header>

  <h2>1. نقطة دخول Program</h2>
  <p>استخدم <code>STAThread</code>، وتهيئة إعداد WinForms، وتشغيل bootstrap، ثم اعرض النموذج الرئيسي.</p>

  <pre><code>using System.Windows.Forms;
using LicenPro.SDK.AppHosting;

internal static class Program
{{ '{' }}
    [STAThread]
    static void Main()
    {{ '{' }}
        ApplicationConfiguration.Initialize();
        SdkBootstrap.OnApplicationStartup();
        Application.Run(new MainForm());
    {{ '}' }}
{{ '}' }}</code></pre>

  <h2>2. بدء تشغيل غير متزامن على نموذج الواجهة</h2>
  <p>
    اجعل <code>Main</code> متزامناً؛ نفّذ عمل الترخيص في حدث <code>Shown</code> الأول (أو تدفق splash/bootstrap صغير) بمعالجات <code>async void</code> أو تنسيق <code>Task</code> كما تفضّل.
    دائماً تخلّص من <code>LicenseClient</code> النشط عند خروج التطبيق حتى تُحرَّر heartbeats الـ session بشكل نظيف.
  </p>

  <pre><code>using LicenPro.SDK;

public partial class MainForm : Form
{{ '{' }}
    private LicenseClient? _licenseClient;

    public MainForm()
    {{ '{' }}
        Shown += async (_, __) =&gt; await RunStartupLicenseCheckAsync();
        FormClosing += async (_, __) =&gt;
        {{ '{' }}
            if (_licenseClient is not null)
                await _licenseClient.DisposeAsync();
        {{ '}' }};
    {{ '}' }}

    private async Task RunStartupLicenseCheckAsync()
    {{ '{' }}
        if (!LicenseCache.Exists()) return;

        var r = await LicenseClient.TryAutoValidateAsync(
            string.IsNullOrWhiteSpace(txtLicenseKey.Text) ? null : txtLicenseKey.Text,
            string.IsNullOrWhiteSpace(txtPublicKey.Text) ? null : txtPublicKey.Text);

        if (r.IsSuccess &amp;&amp; r.Client is not null)
        {{ '{' }}
            _licenseClient = r.Client;
            // Update status strip; optionally show ExpiryNotice from r.ValidationResult
            return;
        {{ '}' }}

        // Handle LicenseKeyRequired / CacheCorrupted / ValidationFailed with clear UX
    {{ '}' }}
{{ '}' }}</code></pre>

  <h2>3. التفعيل لأول مرة (تحقق + ذاكرة مؤقتة)</h2>
  <p>
    عندما يختار المستخدم <code>license.bin</code> ويدخل مفتاحه، استدعِ <code>LicenseClient.ValidateAndCacheAsync(path, publicKey, licenseKey, expectedLicenseType: null, productId)</code>.
    مرّر <strong>product GUID</strong> من لوحة التحكم عندما لا يضمّ ملف الترخيص product id — يحسّن فحوصات التحديث الواعية بالترخيص.
    أزل رؤوس PEM من ملف المفتاح العام قبل تمرير السلسلة (يستخدم النموذج <code>SecurityUtils.StripPemHeaders</code> من أدوات SDK).
  </p>

  <h2>4. «التحقق من الذاكرة المؤقتة» يدوياً</h2>
  <p>اربط زراً بنفس مسار <code>TryAutoValidateAsync</code> المستخدم عند البدء حتى يتمكن فريق الدعم من تحديث الحالة دون إعادة فتح التطبيق.</p>

  <h2>5. عرض الفشل وانتهاء الصلاحية</h2>
  <p>
    عند الفشل، استدعِ <code>LicenseValidationFeedback.From(result)</code> لملء نص الحوار وألوان شريط الحالة بشكل متسق.
    للاشتراكات قرب التجديد، اقرأ <code>result.ExpiryNotice</code> بعد التحقق أو استمع إلى <code>LicenseClient.LicenseExpiringSoon</code> لتذكيرات غير معطّلة أثناء التحقق التلقائي.
  </p>

  <h2>6. اختياري: sessions والتحديثات</h2>
  <p>
    بعد تحقق ناجح، يمكنك استدعاء <code>await _licenseClient.ConnectSessionAsync()</code> في مهمة خلفية لتبقى الواجهة مستجيبة.
    فعّل <code>EnableAutoUpdates</code> من <code>SdkUpdateExtensions</code> بمجرد معرفة سلسلة إصدار التطبيق (مثلاً عبر <code>SdkAssemblyInfo.GetSemanticVersionString</code>).
  </p>

  <div class="help-callout success">
    <i class="ki-outline ki-check-circle"></i>
    <div>
      <span class="callout-title">الخطوات التالية</span>
      <p>اقرأ صفحة <a href="/sdk/dotnet" class="doc-inline-link">.NET SDK</a> لمصفوفة الخيارات الكاملة، ثم اربط تجربة التفعيل (معالج مقابل نموذج واحد) فوق نفس البنى الأساسية.</p>
    </div>
  </div>`);

w('sdk-wpf', `<header class="help-page-header">
    <h1>تكامل WPF</h1>
    <p class="lead">
      يستخدم WPF حزمة <strong>LicenPro</strong> وواجهات API نفسها كـ WinForms. لا يوجد SDK خاص بـ WPF ولا <code>ILicenseService</code> تُشحنه LicenPro — تلف <code>LicenseClient</code> في خدمتك المسجّلة في DI، تُبقيه حياً طوال عمر العملية، وتوجّه الأحداث إلى خيط الواجهة عند الحاجة.
    </p>
  </header>

  <h2>1. بدء تشغيل التطبيق</h2>
  <p>استدعِ bootstrap قبل عرض النافذة الرئيسية حتى تُحمَّل إعدادات JSON والتحديثات المُجهَّزة تماماً كما في WinForms.</p>

  <pre><code>using System.Windows;
using LicenPro.SDK.AppHosting;

public partial class App : Application
{{ '{' }}
    protected override void OnStartup(StartupEventArgs e)
    {{ '{' }}
        SdkBootstrap.OnApplicationStartup();
        base.OnStartup(e);
    {{ '}' }}
{{ '}' }}</code></pre>

  <h2>2. تحقق غير متزامن دون حظر خيط الواجهة</h2>
  <p>
    أنشئ <code>LicenseClient</code> على خيط خلفي أو خيط الواجهة، لكن دائماً <code>await</code> التحقق.
    يلتقط <code>LicenseClient</code> <code>SynchronizationContext.Current</code> عند الإنشاء؛ تُرسل تحذيرات انتهاء الصلاحية (<code>LicenseExpiringSoon</code>) إلى ذلك السياق، لذا إنشاء العميل على خيط الواجهة يُبقي الحوارات آمناً.
  </p>

  <h2>3. طبقات موجهة نحو MVVM</h2>
  <p>الشكل الموصى به:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>ILicenseService</strong> (واجهتك) تلف <code>LicenseClient</code>، وتعرض validate / try-auto-validate قائمة على <code>Task</code>، وتُمرّر <code>SessionDisconnected</code>.</li>
    <li><strong>مضيف على مستوى التطبيق</strong> يملك عمر الخدمة ويستدعي <code>DisposeAsync</code> عند الإغلاق.</li>
    <li><strong>View models</strong> تربط أوامر بالخدمة؛ لا تحظر خيط الواجهة بـ APIs تحقق متزامنة.</li>
  </ul>

  <h2>4. هوية الأجهزة</h2>
  <p>
    يحسب SDK بصمة hardware مركّبة داخلياً للتفعيل وفحوصات التحديث. عادة لا تحتاج «موفر hardware لـ WPF» منفصلاً؛ زوّد <code>IHardwareIdentifier</code> فقط في سيناريوهات اختبار متقدمة.
  </p>

  <h2>5. قراءة إضافية</h2>
  <div class="integration-grid">
    <a href="/sdk/dotnet" class="integration-card">
      <i class="ki-outline ki-code"></i>
      <h4>.NET SDK</h4>
      <p>الخيارات والذاكرة المؤقتة والتحديثات وsessions</p>
    </a>
    <a href="/sdk/winforms" class="integration-card">
      <i class="ki-outline ki-mouse"></i>
      <h4>مرجع WinForms</h4>
      <p>أنماط دورة حياة موازية</p>
    </a>
  </div>`);

w('quick-start-before', `<header class="help-page-header">
    <h1>البدء السريع</h1>
    <p class="lead">
      LicenPro حلقة مغلقة: <strong>تُعدّ</strong> المنتجات والتراخيص في <strong>لوحة تحكم المورّد</strong>،
      <strong>توزّع</strong> ملفات <code>license.bin</code> الموقّعة ومفاتيح الترخيص على العملاء،
      وتطبيقك المُشحن <strong>يفرض</strong> الاستحقاقات بـ <strong>.NET SDK</strong> (التحقق بالمفتاح العام مع استدعاءات اختيارية إلى REST API المستضاف).
      تتبع هذه الصفحة تلك الحلقة بنفس الترتيب الذي تتوقعه لوحة التحكم وSDK — المؤسسة أولاً، ثم المنتج والمفاتيح والترخيص والكود.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-abstract-26"></i>
    <div>
      <span class="callout-title">النموذج الذهني</span>
      <p>
        <strong>المؤسسة</strong> هي حدود المستأجر — الأعضاء والدعوات وملكية المنتجات.
        <strong>المنتج</strong> هو مرساة الإصدارات وتوقيع RSA وبيانات اعتماد API والاستحقاقات وكل ترخيص.
        <strong>لوحة التحكم</strong> توقّع التراخيص بمفتاح خاص على الخادم؛ يحتاج <strong>SDK</strong> فقط <strong>المفتاح العام</strong> للمنتج و<strong>مفتاح الترخيص</strong> للعميل و<code>license.bin</code>.
        التحقق عبر الإنترنت والأتمتة يستخدمان <code>https://licenpro.runasp.net/api</code> (أو قاعدة API المستضافة ذاتياً) — دائماً مع لاحقة <code>/api</code>.
      </p>
    </div>
  </div>

  <h2>سير عمل المورّد من البداية للنهاية</h2>
  <p>
    المسار أدناه يطابق <a href="/guides/platform/overview" class="doc-inline-link">نظرة عامة على النظام</a> ولوحة التحكم المباشرة على
    <a href="https://app.licenpro.tech" target="_blank" rel="noopener noreferrer">app.licenpro.tech</a>.
    أكمل كل مرحلة قبل التالية؛ تخطّي مفاتيح RSA أو software release يمنع إصدار التراخيص.
  </p>

  <ol style="margin: 0.5rem 0 1.5rem 1.25rem;">
    <li><strong>الحساب والمؤسسة</strong> — سجّل الدخول وأنشئ مستأجراً أو انضم إليه.</li>
    <li><strong>المنتج والإصدار الأول</strong> — عرّف التطبيق الذي ترخّصه وسطر الإصدار الأول.</li>
    <li><strong>مفاتيح RSA</strong> — أنشئ مواد التوقيع لكل منتج (إلزامي قبل التراخيص).</li>
    <li><strong>التراخيص</strong> — أصدر المفاتيح، وصدّر <code>license.bin</code>، وحدّد المقاعد والنوع والاستحقاقات.</li>
    <li><strong>SDK bootstrap</strong> — وجّه العميل إلى API، حمّل الإعدادات، وتحقق في التطبيق.</li>
    <li><strong>وقت التشغيل الاختياري</strong> — activations وsessions وwebhooks وأتمتة REST.</li>
  </ol>

  <h2>1. تسجيل الدخول وإنشاء مؤسسة</h2>
  <p>
    سجّل أو ادخل على <a href="https://app.licenpro.tech" target="_blank" rel="noopener noreferrer">app.licenpro.tech</a>،
    ثم أنشئ <strong>مؤسسة</strong> أو انضم إليها — مستأجرك للأعضاء والمنتجات والتراخيص.
    إذا دعاك زميل مسبقاً، اقبل الدعوة بدلاً من إنشاء مؤسسة ثانية.
  </p>
  <p>
    دليل كامل (معالج Identity &amp; Branding، تبويبات مساحة العمل، الأدوار، الدعوات، API):
    <a href="/first-organization" class="doc-inline-link">أنشئ مؤسستك الأولى</a>.
    مرجع المنصة: <a href="/guides/platform/organizations" class="doc-inline-link">المؤسسات</a> · <a href="/api/organizations" class="doc-inline-link">Institutions API</a>.
  </p>

  <h2>2. إنشاء منتجك الأول وإصداره</h2>
  <p>
    <strong>المنتج</strong> هو التطبيق الذي ترخّصه. كل زوج RSA وبيانات اعتماد API وسطر إصدار واستحقاق وترخيص ينتمي إلى product id واحد.
    من الشريط الجانبي افتح <strong>Products</strong> → <strong>Create Product</strong>، أو أنشئ من تبويب <strong>Products</strong> في المؤسسة.
  </p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Product name</strong> (مطلوب) — تسمية فريدة في حسابك.</li>
    <li><strong>Initial version</strong> (مطلوب عند الإنشاء) — أول <strong>software release</strong> (semver أو رقم build أو تنسيق مخصّص). تستهدف التراخيص وفحوصات التحديث <code>softwareReleaseId</code>.</li>
    <li><strong>Release channel</strong> — مثلاً Stable أو Beta أو Alpha أو RC — لفصل builds الإنتاج والمعاينة.</li>
    <li><strong>Product access type</strong> — <strong>Associated</strong> (تراخيص مرتبطة بمؤسسات محددة) أو <strong>Opened</strong> (أي حامل ترخيص صالح).</li>
    <li><strong>Description &amp; image</strong> (اختياري) — توثيق داخلي وعلامة تجارية.</li>
  </ul>
  <p>
    بعد الحفظ تدخل مساحة عمل المنتج (overview وfeatures وentitlements وreleases وlicenses وusers وaccess matrix وaudit).
    دليل على مستوى الحقول: <a href="/first-product" class="doc-inline-link">أنشئ منتجك الأول</a> · <a href="/guides/platform/products" class="doc-inline-link">Products</a> · <a href="/guides/platform/releases" class="doc-inline-link">Releases</a>.
  </p>

  <h2>3. توليد مفاتيح RSA (قبل أي ترخيص)</h2>
  <p>
    لكل منتج هوية توقيع خاصة. من مساحة عمل المنتج افتح <strong>Settings</strong> / keys و<strong>generate an RSA key pair</strong>.
    تحتفظ LicenPro بـ <strong>المفتاح الخاص</strong> على الخادم لتوقيع <code>license.bin</code>؛ يضمّ تطبيقك وSDK <strong>المفتاح العام</strong> فقط للتحقق.
  </p>
  <div class="help-callout warning">
    <i class="ki-outline ki-shield"></i>
    <div>
      <span class="callout-title">لا تشحن المفتاح الخاص</span>
      <p>لا تلصق المفتاح الخاص في ثنائيات العملاء أو ملفات الإعداد أو التحكم بالمصدر. التدوير يتطلب إعادة إصدار تراخيص موقّعة بالزوج الجديد.</p>
    </div>
  </div>
  <p>دليل كامل: <a href="/rsa-keys" class="doc-inline-link">RSA keys &amp; signing</a> · REST: <code>POST /api/Products/&#123;id&#125;/keys/generate</code> · <code>GET .../keys/public</code>.</p>

  <h2>4. نسخ بيانات اعتماد API للمنتج</h2>
  <p>
    استدعاءات وقت التشغيل من SDK أو الخادم الخلفي (مثلاً <code>POST /api/Licenses/validate</code>) تستخدم رأس <strong>X-API-KEY</strong> للمنتج — وليس JWT تسجيل الدخول الشخصي.
    أنشئ أو انسخ هذا المفتاح من منطقة <strong>API / credentials</strong> للمنتج في لوحة التحكم (أو صفحات الحساب التي تسرد مفاتيح المنتج).
    احفظه في إعداد الخادم أو vault؛ ضمّنه في تطبيقات المستخدم النهائي فقط عندما تسمح عمداً باستدعاءات product API مجهولة من العميل.
  </p>
  <p>راجع <a href="/guides/platform/overview" class="doc-inline-link">Credentials at a glance</a> في نظرة عامة على النظام و<a href="/api/licenses" class="doc-inline-link">Licenses API</a>.</p>

  <h2>5. إصدار ترخيص وتوزيع المخرجات</h2>
  <p>
    افتح المنتج → <strong>Licenses</strong> → <strong>Create License</strong>. اختر <strong>software release</strong> ونموذج الترخيص (perpetual أو trial أو subscription أو floating أو node-locked) والمقاعد وانتهاء الصلاحية والاستحقاقات الاختيارية.
  </p>
  <p>بعد الحفظ، وزّع على العملاء:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><code>license.bin</code> — حمولة موقّعة؛ نزّل من تفاصيل الترخيص (مسار SDK دون اتصال).</li>
    <li><strong>License key</strong> — مفتاح قابل للقراءة (مثلاً <code>LP-…</code>) لواجهة التفعيل.</li>
    <li><strong>Public key</strong> — تصدير PEM أو Base64 من مفاتيح المنتج (تحقق SDK).</li>
  </ul>
  <p>
    خطوة بخطوة: <a href="/first-license" class="doc-inline-link">أنشئ ترخيصك الأول</a>.
    قواعد حسب النموذج: الشريط الجانبي <strong>License models</strong> · <a href="/guides/platform/licenses" class="doc-inline-link">Licenses (vendor)</a>.
  </p>

  <h2>6. إعداد SDK (قبل التحقق)</h2>
  <p>تُحل الإعدادات بهذا الترتيب:</p>
  <ol style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><code>SdkConfiguration.Initialize(...)</code> صريح إذا استدعيته في الكود.</li>
    <li>وإلا أول ملف في مجلد التطبيق: <code>licenpro.settings.json</code>، ثم <code>appsettings.json</code> (قسم <code>LicenPro</code> متداخل اختياري).</li>
    <li>تُطبَّق القيم الافتراضية إذا لم يُعثر على شيء — أعد تعريف <code>ServerBaseEndpoint</code> للتجريب أو الاستضافة الذاتية.</li>
  </ol>

  <pre><code>// Typical explicit bootstrap (any host)
using LicenPro.Models.Utils;
using LicenPro.SDK;

var settings = new SdkSettings {{ '{' }}
    // Absolute URL ending with /api
    ServerBaseEndpoint = "https://licenpro.runasp.net/api"
{{ '}' }};
SdkConfiguration.Initialize(settings);</code></pre>

  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">خطأ شائع</span>
      <p>حذف <code>/api</code> أو التوجيه إلى نطاق تسويقي بدلاً من مضيف API يعطل التحقق وsessions وفحوصات التحديث. طابق URL مع نشرك.</p>
    </div>
  </div>

  <h2>7. bootstrap سطح المكتب والتحقق</h2>
  <p>
    لـ WinForms أو WPF أو مضيفات سطح مكتب أخرى، استدعِ <code>SdkBootstrap.OnApplicationStartup()</code> مرة عند دخول العملية (قبل <code>Application.Run</code>).
    يحمّل إعدادات JSON الافتراضية ويطبّق أي تحديث منتج مُجهَّز من تشغيل سابق.
  </p>

  <pre><code>using LicenPro.SDK.AppHosting;

ApplicationConfiguration.Initialize();
SdkBootstrap.OnApplicationStartup();
Application.Run(new MainForm());</code></pre>

  <p>
    استخدم <code>LicenseClient</code> مع <code>LicenseClientOptions</code>: مسارات <code>license.bin</code>، والمفتاح العام، ومفتاح الترخيص، والنوع المتوقع اختيارياً، وproduct id اختياري للتحديثات، وضبط تحذير انتهاء الصلاحية.
  التحقق الناجح قد يملأ <strong>license cache</strong> على القرص لـ <code>LicenseClient.TryAutoValidateAsync</code> في التشغيل التالي.
  </p>
  <p>
    تعمّق: <a href="/sdk/dotnet" class="doc-inline-link">.NET SDK</a> · <a href="/sdk/configuration" class="doc-inline-link">Configuration &amp; bootstrap</a> ·
    <a href="/sdk/license-client" class="doc-inline-link">LicenseClient lifecycle</a> · <a href="/sdk/winforms" class="doc-inline-link">WinForms</a> · <a href="/sdk/wpf" class="doc-inline-link">WPF</a>.
  </p>`);

console.log('Batch 6 done');
