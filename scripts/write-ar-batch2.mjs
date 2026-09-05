import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/app/docs/content/static-pages/ar');
const w = (name, html) => {
  fs.writeFileSync(path.join(arDir, `${name}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
};

w('first-product', `<header class="help-page-header">
    <h1>إنشاء منتجك الأول</h1>
    <p class="lead">
      <strong>المنتج</strong> هو التطبيق الذي ترخّصه في LicenPro. يرتكز على <strong>software release</strong> الأول،
      ومفاتيح توقيع RSA، وبيانات اعتماد API للمنتج، والاستحقاقات، وكل ترخيص تصدره. يطابق هذا الدليل
      نافذة <strong>Create Product</strong> في لوحة التحكم.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-time"></i>
    <div>
      <span class="callout-title">الوقت المقدّر: 5–10 دقائق</span>
      <p>يتطلب مؤسسة ووصولاً إلى لوحة التحكم. تُولَّد مفاتيح RSA بعد وجود المنتج — راجع <a href="/rsa-keys" class="doc-inline-link">RSA keys</a>.</p>
    </div>
  </div>

  <h2>قبل البدء</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>سجّل الدخول في <a href="https://app.licenpro.tech" target="_blank" rel="noopener noreferrer">app.licenpro.tech</a> وأكمل <a href="/first-organization" class="doc-inline-link">مؤسستك الأولى</a> إن لزم.</li>
    <li>افتح <strong>Products</strong> في الشريط الجانبي (<code>/dashboard/products</code>) وانقر <strong>Create Product</strong>.</li>
    <li>حدود المنتجات تعتمد على خطتك؛ قم بالترقية إذا كان إجراء الإنشاء محظوراً.</li>
  </ul>

  <h2>نموذج Create Product</h2>
  <p>تلتقط النافذة هوية المنتج، و<strong>initial release</strong> (مطلوب)، وقواعد الوصول، والعلامة التجارية الاختيارية.</p>

  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-product.png" data-doc-image-alt="Create Product: الاسم وإعداد الإصدار ومستوى الإصدار ونوع الوصول والوصف والصورة" aria-label="عرض لقطة Create Product بالحجم الكامل">
      <img src="assets/docs/platform-create-product.png" alt="Create Product: الاسم وإعداد الإصدار ومستوى الإصدار ونوع الوصول والوصف والصورة" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>

  <div class="doc-stepper">
    <div class="step-item active">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>Product name</h3>
        <p><strong>Product name</strong> (مطلوب، 100 حرفاً كحد أقصى) — تسمية فريدة في حسابك (مثلاً <em>My Awesome Software</em>).</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>Version setup</h3>
        <p><strong>Initial version</strong> (مطلوب) ينشئ <strong>software release</strong> الأول:</p>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Version format</strong> — Semantic (مثلاً 1.0.0)، pre-release، simple، أو build-based.</li>
          <li><strong>Release level</strong> — Stable أو Beta أو Alpha أو RC.</li>
        </ul>
        <p>كل ترخيص وفحص تحديث يشيران إلى <code>softwareReleaseId</code> من هذا السطر.</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">3</div>
      <div class="step-content">
        <h3>Product access type</h3>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Associated (Institution)</strong> — التراخيص مرتبطة بمؤسسات محددة؛ فقط أعضاء المؤسسات المعيّنة يستخدمون المنتج.</li>
          <li><strong>Opened (All users)</strong> — أي حامل لمفتاح ترخيص صالح يمكنه استخدام المنتج عبر المؤسسات.</li>
        </ul>
        <p>نوع الوصول يؤثر على نماذج الترخيص المتاحة عند إصدار المفاتيح.</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">4</div>
      <div class="step-content">
        <h3>Description &amp; image (optional)</h3>
        <p><strong>Description</strong> نص غني (1000 حرفاً كحد أقصى) و<strong>product image</strong> اختياري (PNG أو JPG أو GIF أو WebP، 2MB كحد أقصى).</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">5</div>
      <div class="step-content">
        <h3>Create Product</h3>
        <p>انقر <strong>Create Product</strong>. تدخل مساحة عمل المنتج: overview وfeatures وentitlements وreleases وlicenses وusers وaccess matrix وaudit logs.</p>
      </div>
    </div>
  </div>

  <h2 style="margin-top: 3rem;">بعد الإنشاء</h2>
  <ol style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Generate RSA keys</strong> — Product → <strong>Settings</strong> → <strong>License signing keys (RSA)</strong>. إلزامي قبل تنزيل <code>license.bin</code> الموقّع. راجع <a href="/rsa-keys" class="doc-inline-link">RSA keys</a>.</li>
    <li><strong>Product API key</strong> — انسخ <code>X-API-KEY</code> للمنتج لمسارات التحقق المجهولة (مختلف عن مفاتيح API للحساب في Settings).</li>
    <li><strong>Issue a license</strong> — <a href="/first-license" class="doc-inline-link">أنشئ ترخيصك الأول</a>.</li>
  </ol>

  <h2 style="margin-top: 4rem;">ما التالي؟</h2>
  <div class="integration-grid">
    <a href="/rsa-keys" class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>RSA keys</h4>
      <p>توقيع التراخيص وتضمين المفتاح العام</p>
    </a>
    <a href="/first-license" class="integration-card">
      <i class="ki-outline ki-key"></i>
      <h4>First license</h4>
      <p>إصدار المفاتيح وlicense.bin</p>
    </a>
    <a href="/guides/platform/products" class="integration-card">
      <i class="ki-outline ki-mouse-square"></i>
      <h4>Products guide</h4>
      <p>مرجع المنصة</p>
    </a>
  </div>`);

w('webhooks', `<header class="help-page-header">
    <h1>Webhooks</h1>
    <p class="lead">اربط LicenPro بخادمك الخلفي أو CRM أو نظام الفوترة باستخدام استدعاءات HTTP آلية.</p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-notification-on"></i>
    <div>
      <span class="callout-title">مدفوع بالأحداث</span>
      <p>تُخبر Webhooks نظامك عند حدوث شيء مهم (مثلاً إصدار ترخيص جديد أو فشل تفعيل).</p>
    </div>
  </div>

  <h2>الأحداث المدعومة</h2>
  <table class="feature-table">
    <thead>
      <tr>
        <th>Event</th>
        <th>Trigger</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>license.created</code></td>
        <td>يُطلَق عند إصدار مفتاح جديد.</td>
      </tr>
      <tr>
        <td><code>activation.success</code></td>
        <td>يُطلَق عند ربط جهاز بنجاح.</td>
      </tr>
      <tr>
        <td><code>session.start</code></td>
        <td>يُطلَق في كل مرة يرسل فيها مثيل التطبيق heartbeat.</td>
      </tr>
    </tbody>
  </table>

  <h2>الأمان والتحقق</h2>
  <p>يتضمن كل طلب webhook رأس <code>X-LicenPro-Signature</code>. يجب التحقق من هذا التجزئة باستخدام Secret Key للتأكد من أن الطلب منّا.</p>

  <pre><code>// Example Header
X-LicenPro-Signature: t=161245,v1=sha256...</code></pre>

  <div class="integration-grid">
    <div class="integration-card">
       <i class="ki-outline ki-data"></i>
       <h4>JSON Payload</h4>
       <p>بنى موحّدة لسهولة التحليل.</p>
    </div>
    <div class="integration-card">
       <i class="ki-outline ki-arrows-loop"></i>
       <h4>Automatic Retries</h4>
       <p>نعيد المحاولة حتى 5 مرات إذا كان خادمك متوقفاً.</p>
    </div>
  </div>`);

w('quick-start-after', `<h2>8. اختياري: activations وsessions والأتمتة</h2>
  <p>
    عندما يسجّل SDK activations أو sessions، تعكس لوحة التحكم <strong>Activations</strong> و<strong>Sessions</strong> استخدام المقاعد — مهم لتراخيص Floating والامتثال والدعم.
    تُرسل <strong>Webhooks</strong> أحداث دورة حياة الترخيص إلى خادمك؛ يوفّر REST API التراخيص أو إيقافها من CI أو الفوترة باستخدام JWT للمشغّل حيث يسمح RBAC.
  </p>
  <p>
    <a href="/sessions-activations" class="doc-inline-link">Sessions &amp; activations</a> ·
    <a href="/webhooks" class="doc-inline-link">Webhooks</a> ·
    <a href="/api/overview" class="doc-inline-link">REST API overview</a> ·
    <a href="https://licenpro.runasp.net/api" target="_blank" rel="noopener">Hosted API</a>
  </p>

  <section class="next-steps-section" style="margin-top: 3rem;">
    <h2>تابع التعلّم</h2>
    <div class="integration-grid">
      <a href="/guides/platform/overview" class="integration-card">
        <i class="ki-outline ki-element-11"></i>
        <h4>System overview</h4>
        <p>أدوار لوحة التحكم وAPI وSDK</p>
      </a>
      <a href="/first-organization" class="integration-card">
        <i class="ki-outline ki-briefcase"></i>
        <h4>First institution</h4>
        <p>إعداد المستأجر في لوحة التحكم</p>
      </a>
      <a href="/first-product" class="integration-card">
        <i class="ki-outline ki-abstract-26"></i>
        <h4>First product</h4>
        <p>نموذج المنتج وإعداد الإصدار</p>
      </a>
      <a href="/first-license" class="integration-card">
        <i class="ki-outline ki-key"></i>
        <h4>First license</h4>
        <p>إصدار المفاتيح وlicense.bin</p>
      </a>
      <a href="/sdk/dotnet" class="integration-card">
        <i class="ki-outline ki-code"></i>
        <h4>.NET SDK</h4>
        <p>التحقق والذاكرة المؤقتة والتحديثات</p>
      </a>
    </div>
  </section>`);

w('api-overview-before', `<article class="help-page">
  <header class="help-page-header">
    <h1>نظرة عامة على REST API</h1>
    <p class="lead">
      يوفّر LicenPro API مبني على ASP.NET Core تحت <code>/api/...</code> على نشرك (السحابة:
      <code>https://licenpro.runasp.net/api</code>). معظم مسارات الإدارة تتطلب
      <strong>Bearer JWT</strong> (مستخدمو لوحة التحكم). تستخدم تكاملات SDK والخادم المجهولة
      <strong><code>X-API-KEY</code></strong> على مسارات محددة مثل <code>POST /api/Licenses/validate</code>.
    </p>
  </header>`);

w('api-overview-mid', `<div class="help-callout info">
    <i class="ki-outline ki-key"></i>
    <div>
      <span class="callout-title">Product API key</span>
      <p>
        أرسل <code>X-API-KEY: &lt;your product key&gt;</code> (أو <code>Authorization: X-API-KEY &lt;key&gt;</code> القديم).
        تُجزَّأ المفاتيح على الخادم؛ احفظ النص الصريح فقط على خوادم المُدمِج.
      </p>
    </div>
  </div>`);

w('api-overview-after', `<h2>استكشف حسب المجال</h2>
  <div class="integration-grid">
    <a href="/api/auth-users" class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>Auth &amp; users</h4>
      <p>JWT والمستخدمون والأدوار</p>
    </a>
    <a href="/api/catalog" class="integration-card">
      <i class="ki-outline ki-package"></i>
      <h4>Catalog</h4>
      <p>Products وreleases وfeatures</p>
    </a>
    <a href="/api/licenses" class="integration-card">
      <i class="ki-outline ki-key"></i>
      <h4>Licenses</h4>
      <p>CRUD والتحقق</p>
    </a>
    <a href="/api/activations-sessions" class="integration-card">
      <i class="ki-outline ki-chart-line"></i>
      <h4>Activations &amp; sessions</h4>
      <p>فرض وقت التشغيل</p>
    </a>
  </div>

  <h2>Base URL وخريطة المواضيع</h2>
  <p>
    ادمج مع جذر API لنشرك (الافتراضي للسحابة: <code>https://licenpro.runasp.net/api</code>).
    يعرض تبويب <strong>API reference</strong> في الشريط الجانبي مواضيع مركّزة على المسارات (auth وcatalog وlicenses وactivations والمزيد) مع مسارات وحمولات ملموسة — لا يوجد عارض schema منفصل هنا.
  </p>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <div class="integration-grid">
      <a href="/sdk/dotnet" class="integration-card">
        <i class="ki-outline ki-microsoft"></i>
        <h4>.NET SDK</h4>
        <p>تكامل العميل</p>
      </a>
      <a href="/webhooks" class="integration-card">
        <i class="ki-outline ki-arrow-mix"></i>
        <h4>Webhooks</h4>
        <p>أحداث الأتمتة</p>
      </a>
    </div>
  </section>
</article>`);

console.log('Batch 2 done');
