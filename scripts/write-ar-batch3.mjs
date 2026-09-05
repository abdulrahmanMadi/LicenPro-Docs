import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/app/docs/content/static-pages/ar');
const w = (name, html) => {
  fs.writeFileSync(path.join(arDir, `${name}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
};

w('first-license', `<header class="help-page-header">
    <h1>إنشاء ترخيصك الأول</h1>
    <p class="lead">
      يربط <strong>الترخيص</strong> الاستحقاقات بالعميل: النوع، ونمط التحقق، والمقاعد، وتاريخ الانتهاء، و<strong>software release</strong>، ومجموعات الميزات الاختيارية.
      بعد الإنشاء توزّع <strong>license key</strong> وملف <code>license.bin</code> الموقّع للتحقق عبر SDK.
      أكمل <a href="/first-product" class="doc-inline-link">المنتج الأول</a> و<a href="/rsa-keys" class="doc-inline-link">RSA keys</a> قبل إصدار التراخيص.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-time"></i>
    <div>
      <span class="callout-title">الوقت المقدّر: 10–15 دقيقة</span>
      <p>يشمل اختيار نمط التفعيل، ونموذج الترخيص، وربط الجهاز (Node-Locked)، وتنزيل الملفات.</p>
    </div>
  </div>

  <div class="help-callout warning">
    <i class="ki-outline ki-shield-tick"></i>
    <div>
      <span class="callout-title">المتطلبات المسبقة</span>
      <p>
        <strong>Product</strong> مع <strong>software release</strong> واحد على الأقل ومستخدمين نهائيين معيّنين لذلك الإصدار (لـ Node-Locked).
        <strong>RSA keys generated</strong> لذلك المنتج (التراخيص غير الموقّعة لا تنتج <code>license.bin</code> صالحاً).
      </p>
    </div>
  </div>

  <h2>فتح Generate License</h2>
  <p>
    <strong>Licenses</strong> → <strong>Generate License</strong> (أو من تبويب Licenses في المنتج).
    يحتوي المعالج على <strong>أربع خطوات</strong>: Activation → License Type → Basic Info → Details.
  </p>

  <div class="doc-stepper">
    <div class="step-item active">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>الخطوة 1 — Activation mode</h3>
        <p>اختر كيف يتحقق SDK وقت التشغيل:</p>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Offline</strong> — يعتمد على الملف؛ Node-Locked وSubscription وTrial. مناسب للبيئات المعزولة.</li>
          <li><strong>Online</strong> — API مباشر؛ كل الأنواع بما فيها Perpetual online وConcurrent وMetered. يفعّل Sessions والإلغاء الفوري.</li>
        </ul>
        <p>لوحة معلومات أسفل البطاقات تشرح سلوك Offline مقابل Online (نفس نمط Device binding mode في الخطوة 4).</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>الخطوة 2 — License type</h3>
        <p>اختر النموذج التجاري. بطاقات كاملة مع أوصاف:</p>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Perpetual</strong> — <a href="/perpetual-license" class="doc-inline-link">دليل</a></li>
          <li><strong>Node-Locked</strong> — <a href="/node-locked-license" class="doc-inline-link">دليل</a> (مرتبط بالأجهزة)</li>
          <li><strong>Concurrent</strong> و<strong>Subscription</strong> و<strong>Floating</strong> و<strong>Trial</strong></li>
          <li><strong>Credit-Based</strong> — <a href="/credit-based-license" class="doc-inline-link">دليل</a> (محفظة رصيد مشتركة)</li>
          <li><strong>Usage-Based</strong> — <a href="/usage-based-license" class="doc-inline-link">دليل</a> (عداد استخدام مشترك)</li>
        </ul>
        <figure class="doc-figure doc-figure-card">
          <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-license-type.png" data-doc-image-alt="خطوة License Type في معالج Generate License" aria-label="عرض لقطة License Type">
            <img src="assets/docs/platform-create-license-step-license-type.png" alt="خطوة License Type في معالج Generate License" loading="lazy" decoding="async" />
          </button>
        </figure>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">3</div>
      <div class="step-content">
        <h3>الخطوة 3 — Basic info</h3>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Product</strong> (مطلوب)</li>
          <li><strong>Software release</strong> (مطلوب) — قائمة منسدلة قابلة للبحث عن الإصدارات المنشورة</li>
          <li><strong>Issued to</strong> — Node-Locked: اختر مستخدماً نهائياً من الإصدار؛ Perpetual: غالباً يُعيَّن تلقائياً</li>
          <li><strong>License name</strong> (مطلوب)</li>
        </ul>
        <figure class="doc-figure doc-figure-card">
          <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-basic-info.png" data-doc-image-alt="خطوة Basic Info: المنتج والإصدار وIssued to وLicense name" aria-label="عرض لقطة Basic Info">
            <img src="assets/docs/platform-create-license-step-basic-info.png" alt="خطوة Basic Info: المنتج والإصدار وIssued to وLicense name" loading="lazy" decoding="async" />
          </button>
        </figure>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">4</div>
      <div class="step-content">
        <h3>الخطوة 4 — Details</h3>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Device binding mode</strong> (Node-Locked فقط) — Auto-bind أو Product owner approval</li>
          <li><strong>Expiry / seats / meter balance</strong> — تظهر فقط للأنواع ذات الصلة</li>
          <li><strong>Entitlement sets</strong> (اختياري)</li>
          <li><strong>Notes</strong> (اختياري، نص غني)</li>
        </ul>
        <figure class="doc-figure doc-figure-card">
          <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-details-binding.png" data-doc-image-alt="خطوة Details: Device binding mode لـ Node-Locked" aria-label="عرض لقطة Details">
            <img src="assets/docs/platform-create-license-step-details-binding.png" alt="خطوة Details: Device binding mode لـ Node-Locked" loading="lazy" decoding="async" />
          </button>
        </figure>
        <p>انقر <strong>Generate License</strong>. انسخ المفتاح ونزّل <code>license.bin</code> من تفاصيل الترخيص.</p>
      </div>
    </div>
  </div>

  <h2>بعد الإصدار</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Licenses list</strong> — النوع، ونمط online/offline، والحالة، وعدد التفعيلات</li>
    <li><strong>License details</strong> — Overview وActivations وActive Sessions (online) وDevice Binding (Node-Locked، بما فيها محاولات الوصول غير المصرّح) وUsage (Credit-Based / Usage-Based)</li>
    <li><strong>SDK</strong> — تحقق على جهاز العميل؛ راجع <a href="/sdk/winforms" class="doc-inline-link">عينة WinForms</a></li>
  </ul>

  <h2>أدلة خاصة بالنموذج</h2>
  <div class="integration-grid">
    <a href="/perpetual-license" class="integration-card"><i class="ki-outline ki-key"></i><h4>Perpetual</h4><p>Online/offline + sessions</p></a>
    <a href="/node-locked-license" class="integration-card"><i class="ki-outline ki-lock"></i><h4>Node-locked</h4><p>Binding + approval</p></a>
    <a href="/credit-based-license" class="integration-card"><i class="ki-outline ki-wallet"></i><h4>Credit-Based</h4><p>Token wallet</p></a>
    <a href="/usage-based-license" class="integration-card"><i class="ki-outline ki-chart-simple"></i><h4>Usage-Based</h4><p>Use counter</p></a>
    <a href="/sessions-activations" class="integration-card"><i class="ki-outline ki-chart-line"></i><h4>Sessions &amp; Activations</h4><p>Monitoring</p></a>
  </div>`);

w('rsa-keys', `<header class="help-page-header">
    <h1>مفاتيح RSA والتوقيع وبيانات اعتماد API</h1>
    <p class="lead">
      يستخدم LicenPro نوعين مختلفين من المفاتيح: <strong>RSA signing keys</strong> (لكل منتج، لـ <code>license.bin</code>)
      و<strong>account API keys</strong> (لسكربتات الأتمتة مع وصول REST محدود النطاق). تحتاج تطبيقات العملاء وSDK
      إلى <strong>public key</strong> للمنتج واختيارياً <code>X-API-KEY</code> للمنتج — وليس RSA private key أو كلمة مرور المشغّل أبداً.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-lock-2"></i>
      <h4>RSA private key</h4>
      <p>خادم فقط؛ يوقّع كل ملف ترخيص.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>RSA public key</h4>
      <p>تضمين في التطبيقات؛ SDK يتحقق من التوقيعات.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-key"></i>
      <h4>Account API keys</h4>
      <p>أتمتة REST مدعومة بـ JWT مع نطاقات.</p>
    </div>
  </div>

  <h2 style="margin-top: 3rem;">الجزء 1 — RSA signing keys (لكل منتج)</h2>
  <p>
    لكل منتج زوج مفاتيح RSA خاص به. عند إصدار ترخيص أو تنزيله، يوقّع LicenPro الحمولة بـ
    <strong>private key</strong> المخزّن على الخادم. يضمّن تطبيقك <strong>public key</strong> المطابق فقط
    حتى يثبت <code>LicenseClient</code> أن الملف صُدر لذلك المنتج ولم يُعدَّل.
  </p>

  <h3>لوحة التحكم: التوليد والتنزيل</h3>
  <ol style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>افتح المنتج → <strong>Settings</strong> (<code>/dashboard/products/.../settings</code>).</li>
    <li>مرّر إلى <strong>License signing keys (RSA)</strong>.</li>
    <li>انقر <strong>Generate keys</strong> إن لم تكن موجودة، أو <strong>Regenerate</strong> عند التدوير (راجع التحذير أدناه).</li>
    <li>انقر <strong>Download public key</strong> (PEM) للمشغّلين أو انسخ مادة Base64 لإعداد SDK.</li>
  </ol>

  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-product-settings-rsa-keys.png" data-doc-image-alt="Product Settings: قسم License signing keys RSA" aria-label="عرض اللقطة بالحجم الكامل">
      <img src="assets/docs/platform-product-settings-rsa-keys.png" alt="Product Settings: قسم License signing keys RSA" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>

  <div class="help-callout warning">
    <i class="ki-outline ki-shield-cross"></i>
    <div>
      <span class="callout-title">لا تشارك private key أبداً</span>
      <p>لا يغادر private key LicenPro. لا تلصقه في التطبيقات أو ملفات الإعداد أو تسليمات العملاء.</p>
    </div>
  </div>

  <h3>كيف يتكامل التوقيع مع التحقق</h3>
  <p>
    <code>LicenseClient.ValidateAsync</code> يحمّل public key (عبر <code>LicenseClientOptions.PublicKey</code>)
    ويتحقق من توقيع RSA على <code>license.bin</code>. ملف منتج خاطئ، أو بايتات معدّلة، أو مفتاح قديم بعد التدوير
    ينتج <code>LicenseValidationStatus.SignatureMismatch</code>.
  </p>

  <pre><code>using LicenPro.SDK;

await using var client = new LicenseClient(new LicenseClientOptions &lbrace;
    LicenseFilePath = "license.bin",
    PublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...",
    LicenseKey = "LP-...."
&rbrace;);</code></pre>

  <h3>REST API (operator JWT)</h3>
  <p>يتطلب وصولاً مصرّحاً للمنتج:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><code>POST /api/Products/&#123;id&#125;/keys/generate</code> — إنشاء أو إعادة توليد الزوج.</li>
    <li><code>GET /api/Products/&#123;id&#125;/keys/status</code> — هل المفاتيح موجودة وبياناتها.</li>
    <li><code>GET /api/Products/&#123;id&#125;/keys/public</code> — public key بصيغة JSON للتكاملات.</li>
    <li><code>GET /api/Products/&#123;id&#125;/keys/public/download</code> — تنزيل ملف PEM.</li>
  </ul>

  <h3>Key rotation</h3>
  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">أثر التدوير</span>
      <p>إعادة توليد مفاتيح RSA تُبطل كل <code>license.bin</code> موقّعاً بـ private key القديم. خطّط: انشر builds تطبيق بالـ public key الجديد، وأعد إصدار التراخيص، ووزّع ترقيات العملاء تدريجياً.</p>
    </div>
  </div>

  <h3>ذات صلة: derive-key endpoint</h3>
  <p>
    <code>POST /api/security/derive-key</code> (anonymous) يشتق مادة من <code>licenseKey</code> وsalt لتدفقات ملفات الترخيص المحمية.
    ينسّق SDK ذلك مع أنماط <code>LicenseFileProtector</code> حيث يشارك مفتاح العميل في فك التشفير.
  </p>

  <h2 style="margin-top: 4rem;">الجزء 2 — Account API keys (أتمتة REST)</h2>
  <p>
    منفصلة عن RSA ومنفصلة عن <code>X-API-KEY</code> لكل منتج المستخدم في مسارات التحقق المجهولة.
    <strong>Account API keys</strong> توثّق الأتمتة (CI، وظائف الفوترة، الأدوات الداخلية) إلى واجهات الإدارة بصلاحيات محددة النطاق.
    أدِرها من <strong>Settings</strong> → <strong>API keys</strong> (<code>/dashboard/settings</code>، قسم Developer &amp; account).
  </p>

  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/account-api-keys.png" data-doc-image-alt="صفحة Account Settings API keys مع زر Generate API Key" aria-label="عرض لقطة صفحة API keys بالحجم الكامل">
      <img src="assets/docs/account-api-keys.png" alt="صفحة Account Settings API keys مع زر Generate API Key" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>

  <h3>Generate API Key modal</h3>
  <p>انقر <strong>Generate API Key</strong> وأكمل النموذج:</p>

  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/account-generate-api-key.png" data-doc-image-alt="Generate API Key modal: الاسم والوصف وتاريخ الانتهاء ونطاقات الصلاحيات" aria-label="عرض لقطة Generate API Key modal بالحجم الكامل">
      <img src="assets/docs/account-generate-api-key.png" alt="Generate API Key modal: الاسم والوصف وتاريخ الانتهاء ونطاقات الصلاحيات" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>

  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Name</strong> (مطلوب) — مثلاً <em>CI/CD Pipeline</em>.</li>
    <li><strong>Description</strong> (اختياري) — نص غني يشرح الغرض.</li>
    <li><strong>Expiration date</strong> (اختياري) — اتركه فارغاً لعدم انتهاء الصلاحية.</li>
    <li><strong>Scopes</strong> — أقل امتياز؛ أزواج نموذجية:
      <ul style="margin: 0.5rem 0; padding-left: 1.25rem;">
        <li>Read / Write Licenses</li>
        <li>Read / Write Activations</li>
        <li>Read / Write Products</li>
        <li>Read / Write Releases</li>
      </ul>
    </li>
  </ul>

  <div class="help-callout warning">
    <i class="ki-outline ki-shield"></i>
    <div>
      <span class="callout-title">عرض لمرة واحدة</span>
      <p>بعد <strong>Generate Key</strong>، يُعرض السر مرة واحدة. انسخه إلى خزنة فوراً؛ لا يمكن استرداد المفاتيح المُلغاة.</p>
    </div>
  </div>

  <h2>ورقة غش بيانات الاعتماد</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Operator JWT</strong> — جلسة المتصفح بعد تسجيل الدخول للوحة؛ مسارات الإدارة.</li>
    <li><strong>Account API key</strong> — أتمتة محددة النطاق من Settings → API keys.</li>
    <li><strong>Product X-API-KEY</strong> — رأس لكل منتج لمسارات المنتج المجهولة (مثلاً validate).</li>
    <li><strong>RSA public key</strong> — تحقق من <code>license.bin</code> في SDK.</li>
    <li><strong>RSA private key</strong> — لا يُوزَّع أبداً؛ يوقّع على الخادم فقط.</li>
  </ul>
  <p>راجع أيضاً <a href="/guides/platform/overview" class="doc-inline-link">Credentials at a glance</a> في نظرة عامة على النظام.</p>

  <section class="next-steps-section" style="margin-top: 3rem;">
    <h2>تابع التعلّم</h2>
    <div class="integration-grid">
      <a href="/first-product" class="integration-card">
        <i class="ki-outline ki-abstract-26"></i>
        <h4>First product</h4>
        <p>أين تعيش مفاتيح RSA</p>
      </a>
      <a href="/first-license" class="integration-card">
        <i class="ki-outline ki-key"></i>
        <h4>First license</h4>
        <p>تنزيل license.bin</p>
      </a>
      <a href="/api/security" class="integration-card">
        <i class="ki-outline ki-lock"></i>
        <h4>Security API</h4>
        <p>API keys &amp; derive-key</p>
      </a>
      <a href="/sdk/dotnet" class="integration-card">
        <i class="ki-outline ki-code"></i>
        <h4>.NET SDK</h4>
        <p>Validation stack</p>
      </a>
    </div>
  </section>`);

w('sessions-activations', `<header class="help-page-header">
    <h1>Sessions &amp; Activations</h1>
    <p class="lead">
      راقب كيف تُستخدم التراخيص في الإنتاج. <strong>Activations</strong> سجلات أجهزة دائمة؛
      <strong>Sessions</strong> اتصالات SDK حية مع heartbeats. يظهر كلاهما لتراخيص <strong>online</strong>
      <a href="/perpetual-license" class="doc-inline-link">Perpetual</a> و<a href="/node-locked-license" class="doc-inline-link">Node-Locked</a>.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-screen"></i>
      <h4>Activations</h4>
      <p>رابط دائم جهاز ↔ ترخيص (أول validate/activate).</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-timer"></i>
      <h4>Sessions</h4>
      <p>اتصال مؤقت أثناء تشغيل التطبيق (heartbeat).</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-lock"></i>
      <h4>Node-locked</h4>
      <p>عادة تفعيل واحد؛ الربط في تبويب Device.</p>
    </div>
  </div>

  <h2>دورة الحياة</h2>
  <div class="doc-stepper">
    <div class="step-item active">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>Validation / activation</h3>
        <p>
          أول تحقق online ناجح ينشئ صف <strong>activation</strong>: بصمة الأجهزة، واسم الجهاز، وIP، والمستخدم.
          Node-Locked يحدّث أيضاً <strong>binding status</strong> (auto-bind أو pending approval).
        </p>
      </div>
    </div>
    <div class="step-item active">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>Session connect</h3>
        <p>
          بعد التحقق، يستدعي SDK <code>POST /api/Sessions/connect</code>. يظهر صف session تحت
          تفاصيل الترخيص → <strong>Active Sessions</strong> وصفحة <strong>Sessions</strong> العامة.
        </p>
      </div>
    </div>
    <div class="step-item active">
      <div class="step-number">3</div>
      <div class="step-content">
        <h3>Heartbeat</h3>
        <p>
          heartbeats دورية تحدّث <strong>Last heartbeat</strong>. إن توقفت (تعطل، فقدان شبكة)، تصبح الجلسة offline بعد انتهاء المهلة.
          استخدم تحديث <strong>Live</strong> في جدول Sessions.
        </p>
      </div>
    </div>
    <div class="step-item active">
      <div class="step-number">4</div>
      <div class="step-content">
        <h3>Disconnect / cleanup</h3>
        <p>خروج التطبيق يرسل disconnect. يمكن للمشغّلين فرض disconnect من إجراءات الجلسة. <strong>Cleanup</strong> في Sessions العامة يزيل الصفوف القديمة.</p>
      </div>
    </div>
  </div>

  <h2>أين تعرض البيانات</h2>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>العرض</th><th>النطاق</th><th>الأفضل لـ</th></tr>
    </thead>
    <tbody>
      <tr><td>License → تبويب <strong>Activations</strong></td><td>ترخيص واحد</td><td>الأجهزة التي تستخدم هذا المفتاح</td></tr>
      <tr><td>License → تبويب <strong>Active Sessions</strong></td><td>ترخيص واحد</td><td>من يشغّل التطبيق الآن</td></tr>
      <tr><td>License → تبويب <strong>Device Binding</strong></td><td>Node-Locked فقط</td><td>ربط الأجهزة، approve/reject، السجل، محاولات الوصول غير المصرّح</td></tr>
      <tr><td>Sidebar → <strong>Activations</strong></td><td>كل التراخيص</td><td>بحث دعم عبر المنتجات</td></tr>
      <tr><td>Sidebar → <strong>Sessions</strong></td><td>كل التراخيص</td><td>مراقبة الأسطول المباشرة</td></tr>
    </tbody>
  </table>

  <h2>حقول Activation (تبويب الترخيص والقائمة العامة)</h2>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>الحقل</th><th>الوصف</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Device</strong></td><td>اسم الكمبيوتر (مثلاً DESKTOP-…) وتجزئة بصمة الأجهزة</td></tr>
      <tr><td><strong>User / System user</strong></td><td>اسم الحساب الذي أبلغ عنه SDK عند التفعيل</td></tr>
      <tr><td><strong>IP address</strong></td><td>IP العام عند تفعيل الجهاز</td></tr>
      <tr><td><strong>Activated</strong></td><td>طابع زمني لأول ربط ناجح لهذا الجهاز</td></tr>
      <tr><td><strong>Status</strong></td><td><strong>Active</strong> — يمكنه التحقق؛ <strong>Blocked</strong> — مرفوض في الفحص التالي؛ inactive — مُلغى التفعيل</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-activations-global-list.png" data-doc-image-alt="صفحة Activations العامة مع أعمدة الجهاز والمستخدم وIP والحالة" aria-label="عرض لقطة Activations العامة">
      <img src="assets/docs/platform-activations-global-list.png" alt="صفحة Activations العامة مع أعمدة الجهاز والمستخدم وIP والحالة" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Activations العامة — كل الأجهزة عبر المنتجات.</figcaption>
  </figure>

  <h2>حقول Session (تبويب الترخيص والقائمة العامة)</h2>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>الحقل</th><th>الوصف</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>User</strong></td><td>مستخدم الجلسة + إصدار التطبيق (مثلاً v1.0.0.0)</td></tr>
      <tr><td><strong>Device</strong></td><td>اسم المضيف وسلسلة إصدار نظام التشغيل</td></tr>
      <tr><td><strong>License name</strong></td><td>رابط لتفاصيل الترخيص (Sessions العامة فقط)</td></tr>
      <tr><td><strong>IP address</strong></td><td>IP العميل المقنّع</td></tr>
      <tr><td><strong>Connected</strong></td><td>متى بدأت الجلسة (نسبي + المدة)</td></tr>
      <tr><td><strong>Heartbeat</strong></td><td>آخر ping من SDK — يثبت أن التطبيق ما زال مفتوحاً</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-sessions-global-list.png" data-doc-image-alt="Active Sessions العامة مع عمود Heartbeat" aria-label="عرض لقطة Sessions العامة">
      <img src="assets/docs/platform-sessions-global-list.png" alt="Active Sessions العامة مع عمود Heartbeat" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Sessions العامة — اتصالات حية عبر الأسطول.</figcaption>
  </figure>

  <h2>سلوك Perpetual مقابل Node-Locked</h2>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th></th><th>Perpetual (online)</th><th>Node-Locked (online)</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Activations list</strong></td><td>أجهزة متعددة ممكنة (<code>n / ∞</code>)</td><td>عادة واحد (<code>1 / 1</code>)</td></tr>
      <tr><td><strong>Sessions</strong></td><td>واحدة أو أكثر أثناء تشغيل التطبيقات</td><td>عادة جلسة واحدة على الجهاز المربوط</td></tr>
      <tr><td><strong>Device Binding tab</strong></td><td>لا يُعرض</td><td>Hardware ID وapprove/reject والسجل</td></tr>
      <tr><td><strong>Revoke device</strong></td><td>حظر activation → فشل التحقق التالي</td><td>نفس الشيء + الأجهزة تبقى مربوطة حتى unbind</td></tr>
    </tbody>
  </table>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">Revocation</span>
      <p>
        احظر activation أو افصل session من لوحة التحكم. يستقبل SDK الرفض في التحقق أو heartbeat أو فحص الحالة التالي.
        Perpetual online يمكنه إلغاء جهاز laptop واحد دون التأثير على الآخرين؛
        Node-Locked يؤثر على الجهاز المربوط الوحيد فقط.
      </p>
    </div>
  </div>

  <h2>انظر أيضاً</h2>
  <div class="integration-grid">
    <a href="/perpetual-license" class="integration-card"><i class="ki-outline ki-key"></i><h4>Perpetual</h4><p>Full workflow</p></a>
    <a href="/node-locked-license" class="integration-card"><i class="ki-outline ki-lock"></i><h4>Node-locked</h4><p>Binding workflow</p></a>
    <a href="/api/licenses" class="integration-card"><i class="ki-outline ki-data"></i><h4>Licenses API</h4><p>Validate endpoint</p></a>
  </div>`);

w('trial-license', `<header class="help-page-header">
    <h1>Trial license</h1>
    <p class="lead">
      ترخيص <strong>Trial</strong> هو وصول تقييم محدود بزمن. تُحدَّد المدة عند الإصدار؛ عند انتهاء الوقت يصبح الترخيص <strong>Expired</strong> ويجب على العميل الشراء أو التمديد أو إدخال مفتاح مدفوع.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-timer"></i>
      <h4>Fixed window</h4>
      <p>أيام + ساعات اختيارية من الإصدار أو التفعيل.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-chart-line"></i>
      <h4>Trials dashboard</h4>
      <p>Active وExpired وConverted وCancelled.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-shield-search"></i>
      <h4>Conversion funnel</h4>
      <p>تمديد أو إنهاء أو ترقية إلى نوع مدفوع.</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="Guide sections">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>Trial license — لمالكي المنتج</h2>
    <p>
      قدّم وصول تقييم محدود بزمن. يدعم LicenPro التجارب عبر
      <strong>license wizard</strong> (نوع Trial) ومنطقة <strong>Trials</strong> المخصصة
      (<code>/dashboard/trials</code>) لطلبات التمديد وتتبع التحويل.
    </p>

    <h3>إصدار trial</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li><strong>License wizard</strong> — Generate License → Trial → حدّد فترة التجربة (أيام/ساعات).</li>
      <li><strong>Trials API</strong> — <code>POST /api/trials</code> لسجلات trial ضمن الإصدار وسير عمل التمديد.</li>
      <li>أرفق <strong>entitlement set</strong> للحد من الميزات أثناء التقييم.</li>
    </ul>

    <h3>التشغيل والتحويل</h3>
    <ul class="guide-checklist">
      <li><strong>Trials dashboard</strong> — فلتر Active وExpired وConverted وCancelled.</li>
      <li><strong>Extend</strong> — أضف أياماً أثناء مفاوضات المبيعات (<code>POST /api/trials/&#123;id&#125;/extend</code>).</li>
      <li><strong>Review extension requests</strong> — يمكن للعملاء المحتملين طلب وقت إضافي؛ وافق أو ارفض في Trials UI.</li>
      <li><strong>Convert</strong> — أصدر Perpetual أو Subscription مدفوعاً؛ علّم التجربة converted.</li>
      <li><strong>End early</strong> — أوقف إساءة الاستخدام قبل انتهاء الصلاحية الطبيعي.</li>
    </ul>
    <p>حسابات LicenPro المجانية يمكنها إصدار أنواع <strong>Perpetual</strong> و<strong>Trial</strong>؛ الأنواع الأخرى تتطلب عادة خطة منصة مدفوعة.</p>
    <p>راجع <a href="/guides/platform/trials" class="doc-inline-link">Trials platform guide</a> و<a href="/api/trials-transfers" class="doc-inline-link">Trials API</a>.</p>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>Trial license — للمستخدمين النهائيين</h2>
    <p>
      تمنح التجربة وصولاً كاملاً أو محدوداً للمنتج حتى <strong>end date</strong>. عند انتهائها،
      يتوقف التطبيق عن التحقق حتى تشتري أو تتلقى تجربة ممدّدة.
    </p>

    <h3>البدء</h3>
    <ol style="margin-left:1.25rem;">
      <li>سجّل أو استلم مفتاح trial من البائع.</li>
      <li>ثبّت التطبيق وفعّل بملف ترخيص التجربة.</li>
      <li>استخدم المنتج ضمن نافذة التجربة — راقب تحذيرات انتهاء الصلاحية داخل التطبيق.</li>
    </ol>

    <h3>عند انتهاء التجربة</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>يعيد التحقق <strong>expired</strong> — اشترِ ترخيصاً مدفوعاً للمتابعة.</li>
      <li>بعض البائعين يقبلون <strong>extension request</strong> قبل الانتهاء (تواصل مع المبيعات أو نموذج داخل التطبيق).</li>
    </ul>

    <h3>استكشاف الأخطاء</h3>
    <table class="doc-table" style="width:100%; margin: 1rem 0;">
      <thead>
        <tr><th>الموقف</th><th>ما يجب فعله</th></tr>
      </thead>
      <tbody>
        <tr><td>انتهت التجربة أمس</td><td>اشترِ مفتاح subscription/perpetual أو اطلب تمديداً من المبيعات</td></tr>
        <tr><td>وُافق على التمديد لكن ما زال expired</td><td>أعد تشغيل التطبيق أو انتظر التحقق online التالي</td></tr>
        <tr><td>ميزات ناقصة مقارنة بصفحة التسويق</td><td>قد يكون entitlement set للتجربة محدوداً — تحقق مع البائع</td></tr>
      </tbody>
    </table>
  </section>

  <h2>مقارنة مع نماذج أخرى</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>مقابل <a href="/subscription-license" class="doc-inline-link">Subscription</a> — Trial تقييم قصير؛ Subscription مدة مدفوعة متكررة.</li>
    <li>مقابل <a href="/perpetual-license" class="doc-inline-link">Perpetual</a> — Trial ينتهي دائماً؛ Perpetual لا ينتهي افتراضياً.</li>
  </ul>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>انظر أيضاً</h2>
    <div class="integration-grid">
      <a href="/guides/platform/trials" class="integration-card"><i class="ki-outline ki-timer"></i><h4>Trials (platform)</h4><p>Dashboard ops</p></a>
      <a href="/subscription-license" class="integration-card"><i class="ki-outline ki-calendar-tick"></i><h4>Subscription</h4><p>Conversion target</p></a>
      <a href="/perpetual-license" class="integration-card"><i class="ki-outline ki-key"></i><h4>Perpetual</h4><p>Conversion target</p></a>
      <a href="/api/trials-transfers" class="integration-card"><i class="ki-outline ki-data"></i><h4>Trials API</h4><p>REST</p></a>
    </div>
  </section>`);

w('subscription-license', `<header class="help-page-header">
    <h1>Subscription license</h1>
    <p class="lead">
      يمنح ترخيص <strong>Subscription</strong> وصولاً لـ <strong>مدة محددة</strong> — شهرية أو سنوية أو مخصصة.
      ينتهي الوصول عند انتهاء المدة دون تجديد. اختر التحقق <strong>online</strong> أو <strong>offline</strong> وقت الإصدار؛
      نمط online يفعّل الإلغاء الفوري ورؤية Sessions.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-calendar"></i>
      <h4>Renewal term</h4>
      <p>المدة أو تاريخ انتهاء صريح عند الإصدار.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-notification"></i>
      <h4>Renewal UX</h4>
      <p>تحذير قبل الانتهاء؛ تجديد بعد الدفع.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-wifi"></i>
      <h4>Online or offline</h4>
      <p>نمط التحقق يُحدَّد عند الإصدار — ليس always-online.</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="Guide sections">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>Subscription license — لمالكي المنتج</h2>
    <p>
      أصدر سجل <strong>License</strong> محدوداً بزمن (<code>type: Subscription</code>) مع
      <strong>expiration date</strong>. هذا منفصل عن خطة منصة LicenPro الخاصة بك (Free/Pro) —
      إنه الاستحقاق الذي تبيعه <em>لعملائك</em>.
    </p>

    <h3>إصدار ترخيص (لوحة التحكم)</h3>
    <ol style="margin-left:1.25rem;">
      <li><strong>Licenses</strong> → <strong>Generate License</strong> → نوع <strong>Subscription</strong>.</li>
      <li>حدّد المدة أو <strong>expiration date</strong> صريحاً.</li>
      <li>اختر التحقق <strong>Online</strong> أو <strong>Offline</strong>.</li>
      <li>اختياري: <strong>Issued to</strong> وentitlements وmax activations.</li>
    </ol>

    <h3>التجديد والتسرب</h3>
    <ul class="guide-checklist">
      <li><strong>Extend expiry</strong> بعد الدفع (تعديل لوحة أو API).</li>
      <li><strong>Revoke immediately</strong> عند chargeback أو مخالفة سياسة.</li>
      <li>أتمت التجديدات عبر <a href="/webhooks" class="doc-inline-link">Webhooks</a> + تكامل الفوترة.</li>
      <li>راقب Activations/Sessions عند تفعيل التحقق online.</li>
    </ul>

    <h3>أتمتة API</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>إنشاء: <code>POST /api/licenses</code> مع <code>type: Subscription</code> و<code>expirationDate</code>.</li>
      <li>تحديث المدة: <code>PUT /api/licenses/&#123;id&#125;</code> — مدّد <code>expirationDate</code>.</li>
      <li>إلغاء: <code>POST /api/licenses/&#123;id&#125;/revoke</code>.</li>
    </ul>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>Subscription license — للمستخدمين النهائيين</h2>
    <p>
      تستلم license key (وعادة <code>license.bin</code>) صالحاً حتى
      <strong>subscription end date</strong>. بعد الانتهاء، يفشل التحقق حتى يجدّد البائع المدة.
    </p>

    <h3>أثناء المدة</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>ثبّت التطبيق وفعّل بالمفتاح/الملف المقدّم عند الشراء.</li>
      <li>Subscriptions online قد تعرض تذكيرات تجديد قبل الانتهاء.</li>
      <li>التجديد يمدّد التاريخ على الخادم — عادة لا تحتاج ملفاً جديداً.</li>
    </ul>

    <h3>استكشاف الأخطاء</h3>
    <table class="doc-table" style="width:100%; margin: 1rem 0;">
      <thead>
        <tr><th>الرسالة</th><th>المعنى</th><th>ما يجب فعله</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>LicenseExpired</strong></td><td>انتهت المدة</td><td>جدّد الاشتراك مع البائع</td></tr>
        <tr><td><strong>LicenseInvalid</strong></td><td>مُلغى أو معطّل</td><td>تواصل مع دعم الفوترة</td></tr>
        <tr><td>التحقق يعمل لكن الميزات ناقصة</td><td>حدود entitlement set</td><td>رقِّ الخطة مع البائع</td></tr>
      </tbody>
    </table>
  </section>

  <div class="help-callout info help-callout--plain">
    <i class="ki-outline ki-information-2" aria-hidden="true"></i>
    <div>
      <span class="callout-title">ليس نفس LicenPro Free/Pro</span>
      <p>نوع ترخيص <strong>Subscription</strong> لدى البائع يتحكم في الوصول إلى <em>منتجه</em>. خطة لوحة LicenPro (Free/Pro) تتحكم في عدد المنتجات والتراخيص التي <em>يمكنك</em> إنشاؤها على المنصة.</p>
    </div>
  </div>

  <h2>مقارنة مع نماذج أخرى</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>مقابل <a href="/perpetual-license" class="doc-inline-link">Perpetual</a> — Subscription يتطلب تجديداً؛ Perpetual لا يتطلب افتراضياً.</li>
    <li>مقابل <a href="/trial-license" class="doc-inline-link">Trial</a> — Subscription مدة مدفوعة؛ Trial تقييم.</li>
  </ul>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>انظر أيضاً</h2>
    <div class="integration-grid">
      <a href="/trial-license" class="integration-card"><i class="ki-outline ki-timer"></i><h4>Trial</h4><p>Upstream funnel</p></a>
      <a href="/guides/platform/licenses" class="integration-card"><i class="ki-outline ki-key-square"></i><h4>Vendor licenses</h4><p>Detail tabs</p></a>
      <a href="/webhooks" class="integration-card"><i class="ki-outline ki-arrow-mix"></i><h4>Webhooks</h4><p>Renewal automation</p></a>
      <a href="/api/licenses" class="integration-card"><i class="ki-outline ki-data"></i><h4>Licenses API</h4><p>REST</p></a>
    </div>
  </section>`);

console.log('Done — batch 3 Arabic static pages written.');
