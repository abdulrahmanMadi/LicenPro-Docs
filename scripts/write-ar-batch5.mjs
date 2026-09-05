import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/app/docs/content/static-pages/ar');
const w = (name, html) => {
  fs.writeFileSync(path.join(arDir, `${name}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
};

w('node-locked-license', `<header class="help-page-header">
    <h1>ترخيص Node-locked</h1>
    <p class="lead">
      يربط ترخيص <strong>node-locked</strong> الاستحقاق بـ <strong>جهاز واحد</strong> عبر بصمة hardware مستقرة.
      فشل التحقق عند نسخ ملف الترخيص إلى جهاز آخر. اختر <strong>Auto-bind</strong> (قفل فوري عند أول تحقق)
      أو <strong>Product owner approval</strong> (مراجعة في تبويب Device Binding قبل أن يتمكن المستخدم النهائي من تشغيل التطبيق).
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-lock"></i>
      <h4>جهاز واحد</h4>
      <p>يُخزَّن HWID على الخادم وفي <code>license.bin</code>.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>أنماط الربط</h4>
      <p>Auto-bind أو موافقة مالك المنتج عند الإنشاء.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-monitor"></i>
      <h4>تبويب Device</h4>
      <p>حالة الربط، موافقة/رفض، نقل، وسجل.</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="Guide sections">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>ترخيص Node-locked — لمالكي المنتج</h2>
    <p>
      اربط الاستحقاق بـ <strong>جهاز واحد</strong> ومستخدم <strong>Issued to</strong> واحد. اختر
      <strong>Auto-bind</strong> أو <strong>Product owner approval</strong> عند الإصدار.
    </p>
    <ul class="guide-checklist">
      <li>أصدر مع <strong>Issued to</strong> المطلوب (يجب أن يكون عضو منتج، وليس حساب المالك).</li>
      <li>راجع عمليات الربط المعلّقة في تبويب <strong>Device Binding</strong> — Approve أو Reject.</li>
      <li>انقل hardware عبر Device Binding عندما يستبدل المستخدمون أجهزة المحمول.</li>
      <li>احظر الأجهزة المشبوهة من Activations دون إلغاء الترخيص.</li>
      <li>راقب <strong>Unauthorized Access Attempts</strong> في Device Binding — تتلقى إشعاراً عندما يحاول جهاز آخر استخدام ترخيص مربوط مسبقاً.</li>
    </ul>
    <p>يتابع أدناه جولة في لوحة التحكم مع لقطات شاشة.</p>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>ترخيص Node-locked — للمستخدمين النهائيين</h2>
    <p>
      يعمل ترخيصك على <strong>جهاز كمبيوتر واحد فقط</strong>. يرسل التطبيق بصمة hardware وبريدك
      المعيّن (<strong>Issued to</strong>) أثناء التحقق — يجب أن يتطابق كلاهما.
    </p>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li><strong>Auto-bind</strong> — أول تحقق ناجح يقفل ذلك الجهاز فوراً.</li>
      <li><strong>Approval mode</strong> — التشغيل الأول يظهر pending حتى يوافق البائع على الجهاز.</li>
      <li>نسخ ملف الترخيص إلى جهاز آخر يُرجع <strong>hardware mismatch</strong>.</li>
      <li>تسجيل دخول/بريد خاطئ يُرجع <strong>credential mismatch</strong>.</li>
    </ul>
    <p>تحتاج جهازاً جديداً؟ اطلب من البائع <strong>device transfer</strong> — لا تشارك ملف الترخيص.</p>
  </section>

  <h2>إنشاء ترخيص node-locked (لوحة التحكم)</h2>
  <p>
    افتح <strong>Licenses</strong> → <strong>Generate License</strong>. يتكون المعالج من أربع خطوات:
    <strong>Activation</strong>، <strong>License Type</strong>، <strong>Basic Info</strong>، و<strong>Details</strong>.
  </p>

  <h3>الخطوة 1 — Activation mode</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Offline</strong> — نموذجي لتطبيقات سطح المكتب node-locked. وزّع <code>license.bin</code>؛ يتحقق SDK محلياً بعد bootstrap اختياري عبر الإنترنت.</li>
    <li><strong>Online</strong> — تحقق API مباشر عند كل تشغيل؛ تظهر activations وsessions في لوحة التحكم في الوقت الفعلي.</li>
  </ul>

  <h3>الخطوة 2 — License type</h3>
  <p>اختر <strong>Node-Locked</strong>. تشرح البطاقة أن hardware يُلتقط عند التشغيل الأول ويُربَط الترخيص بذلك الجهاز.</p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-license-type.png" data-doc-image-alt="معالج Generate License خطوة License Type مع Node-Locked محدّد" aria-label="عرض لقطة خطوة License Type بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-license-type.png" alt="معالج Generate License خطوة License Type مع Node-Locked محدّد" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">License Type — اختر Node-Locked.</figcaption>
  </figure>

  <h3>الخطوة 3 — Basic info</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Product</strong> (مطلوب) — مثلاً IntelliJ IDEA.</li>
    <li><strong>Software release</strong> (مطلوب) — سطر الإصدار الذي يُربَط به الترخيص (مثلاً 1.0.2).</li>
    <li><strong>Issued to</strong> (مطلوب) — المستخدم النهائي المعيّن لذلك الإصدار. يرسل SDK هذا كـ <code>IssuedTo</code> أثناء التحقق؛ يجب أن يطابق سجل الترخيص.</li>
    <li><strong>License name</strong> (مطلوب) — تسمية داخلية تظهر في القوائم والتصدير.</li>
  </ul>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-basic-info.png" data-doc-image-alt="خطوة Generate License Basic Info: المنتج وsoftware release والمستخدم issued-to واسم الترخيص" aria-label="عرض لقطة خطوة Basic Info بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-basic-info.png" alt="خطوة Generate License Basic Info: المنتج وsoftware release والمستخدم issued-to واسم الترخيص" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Basic Info — المنتج والإصدار والمستخدم النهائي المعيّن.</figcaption>
  </figure>

  <h3>الخطوة 4 — Details (device binding mode)</h3>
  <p>في خطوة <strong>Details</strong>، اختر كيف يُقفَل الجهاز الأول:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Auto-bind</strong> — أول تحقق يقفل ذلك الجهاز فوراً. لا يلزم إجراء في لوحة التحكم. الأفضل للنشر الموثوق أو أحادي المستخدم.</li>
    <li><strong>Product owner approval</strong> — أول تحقق يُرسل طلب ربط. يجب على مالك المنتج النقر على <strong>Approve Device</strong> في License details → Device Binding قبل أن يعمل الترخيص على ذلك الجهاز.</li>
  </ul>
  <p>عيّن أيضاً <strong>Entitlement sets</strong> و<strong>Notes</strong> الاختيارية، ثم انقر <strong>Generate License</strong>.</p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-details-binding.png" data-doc-image-alt="خطوة Generate License Details: Device binding mode Auto-bind مقابل Product owner approval" aria-label="عرض لقطة خطوة Details binding بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-details-binding.png" alt="خطوة Generate License Details: Device binding mode Auto-bind مقابل Product owner approval" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Details — Device binding mode (نفس أسلوب بطاقة Activation mode).</figcaption>
  </figure>

  <h2>بعد الإنشاء — قائمة التراخيص</h2>
  <p>
    صفوف node-locked تعرض <strong>Type: NodeLocked</strong>، <strong>Mode: Online</strong> أو <strong>Offline</strong>،
    <strong>Status: Valid</strong>، و<strong>Activations</strong> (مثلاً <code>1 / 1</code> عند ربط جهاز واحد).
  </p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-licenses-list.png" data-doc-image-alt="قائمة Licenses تعرض صفوف NodeLocked وPerpetual مع الوضع وعدد activations" aria-label="عرض لقطة قائمة التراخيص بالحجم الكامل">
      <img src="assets/docs/platform-licenses-list.png" alt="قائمة Licenses تعرض صفوف NodeLocked وPerpetual مع الوضع وعدد activations" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">قائمة Licenses — قارن Node-Locked (1/1) مقابل Perpetual (activations غير محدودة).</figcaption>
  </figure>

  <h2>سير العمل على الجهاز (SDK / تطبيق WinForms للاختبار)</h2>
  <ol style="margin-left:1.25rem;">
    <li>حمّل <code>license.bin</code> وانسخ <strong>license key</strong> من تفاصيل الترخيص.</li>
    <li>اضبط SDK: <strong>public key</strong> للمنتج، <strong>API key</strong>، و<code>ServerBaseEndpoint</code> في <code>licenpro.settings.json</code>.</li>
    <li>حمّل ملف الترخيص والمفتاح في تطبيقك، ثم <strong>Validate License</strong> (online).</li>
    <li>يرسل SDK <strong>hardware fingerprint</strong> مستقراً، <strong>IssuedTo</strong>، وبيانات الجهاز إلى <code>POST /api/Licenses/validate</code>.</li>
    <li>عند النجاح، قد يبدأ SDK <strong>session</strong> online (heartbeat أثناء تشغيل التطبيق).</li>
  </ol>

  <h3>Auto-bind — أول تحقق على الجهاز</h3>
  <div class="help-callout info help-callout--plain">
    <i class="ki-outline ki-flash-circle" aria-hidden="true"></i>
    <div>
      <span class="callout-title">النتيجة المتوقعة</span>
      <p><strong>VALID</strong> على العميل. لوحة التحكم → Device Binding تعرض <strong>Bound</strong> مع HWID واسم الجهاز ونظام التشغيل. تبويب Activations يعرض جهازاً نشطاً واحداً.</p>
    </div>
  </div>

  <h3>Product owner approval — أول تحقق على الجهاز</h3>
  <div class="help-callout warning help-callout--plain">
    <i class="ki-outline ki-user-tick" aria-hidden="true"></i>
    <div>
      <span class="callout-title">النتيجة المتوقعة (قبل الموافقة)</span>
      <p><strong>INVALID</strong> على العميل مع رسالة pending-binding. تعرض لوحة التحكم شريطاً أصفر و<strong>Pending Approval</strong> في Device Binding. يجب على المستخدم النهائي الانتظار حتى ينقر المالك <strong>Approve Device</strong>، ثم التحقق مرة أخرى.</p>
    </div>
  </div>

  <h3>الجهاز الثاني (نفس ملف الترخيص)</h3>
  <p>يفشل التحقق برسالة <strong>hardware mismatch</strong> — الترخيص مربوط مسبقاً ببصمة الجهاز الأول.</p>

  <h2>اكتشاف مشاركة الترخيص</h2>
  <p>
    حظر الجهاز الثاني نصف القصة فقط: كمالك منتج تريد أيضاً معرفة أن ذلك حدث. كلما قُدِّم ترخيص
    node-locked مربوط من جهاز مختلف، يسجّل LicenPro المحاولة ويرسل لك إشعاراً داخل التطبيق.
    تجربة المستخدم النهائي لا تتغير — يرى نفس رسالة hardware mismatch، ولا يُلغى شيء تلقائياً.
  </p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>ما الذي يُفعّله</strong> — ترخيص حالة ربطه <strong>Bound</strong> يُستخدم من بصمة غير المربوطة، أثناء validation أو activation أو session connect.</li>
    <li><strong>ما تراه</strong> — HWID المحاول، الجهاز الذي يجب أن يكون مربوطاً، اسم الجهاز، عنوان IP، نقطة الدخول المستخدمة، عدد مرات محاولة ذلك الجهاز، والوقت.</li>
    <li><strong>من يراه</strong> — مالكو المنتج فقط. المستخدمون النهائيون وأعضاء المنتج الآخرون لا يمكنهم قراءة هذه السجلات.</li>
    <li><strong>تكرار التنبيه</strong> — مرة واحدة لكل جهاء مخالف يومياً. عميل عالق في حلقة إعادة المحاولة لن يغرق إشعاراتك؛ عداد المحاولات يستمر بالارتفاع في الخلفية.</li>
    <li><strong>المراجعة</strong> — علّم المحاولة كمراجع بعد التحقيق. يختفي الشريط التحذيري، لكن السجل وعدادّه يبقيان.</li>
  </ul>
  <div class="help-callout warning help-callout--plain">
    <i class="ki-outline ki-information-2" aria-hidden="true"></i>
    <div>
      <span class="callout-title">المحاولة إشارة وليست حكماً</span>
      <p>
        جهاز جديد على ترخيص مربوط يبدو متشابهاً سواء شارك المستخدم ترخيصه أو استبدل جهاز المحمول ببساطة أو
        أعاد تثبيت Windows. تواصل مع المستخدم قبل الإجراء. الإصلاح المعتاد لتغيير hardware حقيقي هو <strong>device transfer</strong>
        أو <strong>unbind</strong>، وليس الإلغاء.
      </p>
    </div>
  </div>
  <div class="help-callout help-callout--plain">
    <i class="ki-outline ki-wifi-square" aria-hidden="true"></i>
    <div>
      <span class="callout-title">التراخيص Offline مغطاة جزئياً فقط</span>
      <p>
        ترخيص offline ما زال يتصل بالخادم أول مرة يعمل على جهاز، لذا الترخيص المنسوخ يظهر عادة كمحاولة عند
        ذلك التشغيل الأول. بعد ذلك يتحقق محلياً ويتوقف عن الإبلاغ — ولا يُسجَّل شيء إذا كان الجهاز الآخر
        offline أثناء تشغيله الأول. استخدم التحقق <strong>online</strong> إذا احتجت رؤية مستمرة.
      </p>
    </div>
  </div>
  <p>
    قيمة <strong>Issued to</strong> خاطئة فشل مختلف: تُرفض مبكراً كـ <strong>credential mismatch</strong> ولا
    تُحسب كمحاولة مشاركة. اكتشاف المشاركة يغطي الحالة التي تكون فيها بيانات الاعتماد صحيحة لكن الجهاز ليس كذلك.
  </p>

  <h2>تفاصيل الترخيص — تبويب Overview</h2>
  <p>استخدم Overview لبيانات الترخيص وملخص الربط:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>License type</strong> — NodeLocked</li>
    <li><strong>Validation mode</strong> — Online أو Offline</li>
    <li><strong>Binding mode</strong> — Auto-bind أو Product owner approval</li>
    <li><strong>Binding status</strong> — Not bound، Pending confirmation، Bound to device، أو Rejected</li>
    <li><strong>Hardware ID</strong> — hash بصمة كامل (زر نسخ)</li>
    <li><strong>Usage statistics</strong> — الأجهزة النشطة مقابل المسموح (عادة 1 / 1)</li>
    <li><strong>Online activity</strong> — روابط لعدادات Activations وActive Sessions</li>
  </ul>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-node-locked-overview.png" data-doc-image-alt="تبويب Overview لترخيص Node-Locked: binding mode وحالة الربط وHWID وإحصائيات الاستخدام" aria-label="عرض لقطة تبويب Overview بالحجم الكامل">
      <img src="assets/docs/platform-node-locked-overview.png" alt="تبويب Overview لترخيص Node-Locked: binding mode وحالة الربط وHWID وإحصائيات الاستخدام" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Overview — binding mode والحالة وHWID.</figcaption>
  </figure>

  <h2>تبويب Device Binding</h2>
  <p>العرض الرئيسي للمشغّل لـ hardware في node-locked:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Bound device</strong> — HWID واسم الجهاز ونظام التشغيل ووقت التفعيل وآخر ظهور</li>
    <li><strong>Pending state</strong> — HWID المطلوب مع <strong>Approve Device</strong> / <strong>Reject</strong> (مالك المنتج فقط)</li>
    <li><strong>Activation history</strong> — جدول أحداث Activated / Deactivated / Transferred مع IP والطابع الزمني</li>
    <li><strong>Unbind / transfer</strong> — إعادة تعيين الربط لنقل hardware مشروع (إجراءات المالك)</li>
    <li><strong>Unauthorized Access Attempts</strong> — أجهزة رُفضت لأن الترخيص مربوط في مكان آخر، مع HWID المحاول والمربوط وIP ونقطة الدخول وعدد المحاولات والطوابع الزمنية. شارة على التبويب وشريط على الترخيص يعرضان ما لم تراجعه بعد؛ <strong>Mark as reviewed</strong> يمسحها (المالك فقط).</li>
  </ul>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-node-locked-device-binding.png" data-doc-image-alt="تبويب Device Binding لـ Node-Locked: الجهاز المفعّل وHWID وسجل activation" aria-label="عرض لقطة تبويب Device Binding بالحجم الكامل">
      <img src="assets/docs/platform-node-locked-device-binding.png" alt="تبويب Device Binding لـ Node-Locked: الجهاز المفعّل وHWID وسجل activation" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Device Binding — الجهاز المربوط وسجل activation.</figcaption>
  </figure>

  <h2>تبويب Activations (لكل ترخيص)</h2>
  <p>
    يعرض سجل الجهاز الذي أُنشئ عندما تحقق الترخيص أو فُعّل. لتراخيص node-locked online يوجد عادة
    <strong>activation واحد لكل ترخيص</strong>.
  </p>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>العمود</th><th>المعنى</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Device</strong></td><td>Hostname (مثلاً DESKTOP-…) وبادئة hardware fingerprint</td></tr>
      <tr><td><strong>User</strong></td><td>اسم مستخدم Windows / SDK المُبلَّغ عند activation</td></tr>
      <tr><td><strong>IP</strong></td><td>IP العام وقت activation</td></tr>
      <tr><td><strong>Activated</strong></td><td>الوقت النسبي منذ أول ربط</td></tr>
      <tr><td><strong>Status</strong></td><td>Active أو inactive أو blocked</td></tr>
      <tr><td><strong>Actions</strong></td><td>Block أو deactivate أو إدارة الجهاز (المالك)</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-node-locked-activations-tab.png" data-doc-image-alt="تبويب Activations لترخيص Node-Locked مع صف جهاز نشط واحد" aria-label="عرض لقطة تبويب Activations بالحجم الكامل">
      <img src="assets/docs/platform-node-locked-activations-tab.png" alt="تبويب Activations لترخيص Node-Locked مع صف جهاز نشط واحد" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Activations — صف واحد لكل جهاز مربوط.</figcaption>
  </figure>

  <h2>تبويب Active Sessions (node-locked online)</h2>
  <p>
    عندما يكون validation mode <strong>Online</strong>، يفتح SDK session مباشراً ويرسل <strong>heartbeats</strong> أثناء تشغيل التطبيق.
    يسرد هذا التبويب الاتصالات الحالية لهذا الترخيص فقط.
  </p>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>العمود</th><th>المعنى</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>User</strong></td><td>اسم مستخدم session وإصدار التطبيق (مثلاً v1.0.0)</td></tr>
      <tr><td><strong>Device</strong></td><td>Hostname وسلسلة نظام التشغيل</td></tr>
      <tr><td><strong>IP Address</strong></td><td>IP عام مُقنَّع للعميل</td></tr>
      <tr><td><strong>Connected</strong></td><td>متى بدأت session (وقت نسبي)</td></tr>
      <tr><td><strong>Heartbeat</strong></td><td>آخر ping من SDK — يثبت أن التطبيق ما زال يعمل</td></tr>
      <tr><td><strong>Actions</strong></td><td>عرض تفاصيل session أو قطع الاتصال عن بُعد</td></tr>
    </tbody>
  </table>
  <p>استخدم التحديث التلقائي <strong>Live</strong> والفلاتر (All / Online / Offline) لمراقبة الاستخدام.</p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-node-locked-sessions-tab.png" data-doc-image-alt="تبويب Active Sessions لترخيص Node-Locked مع heartbeat مباشر" aria-label="عرض لقطة تبويب Active Sessions بالحجم الكامل">
      <img src="assets/docs/platform-node-locked-sessions-tab.png" alt="تبويب Active Sessions لترخيص Node-Locked مع heartbeat مباشر" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Active Sessions — اتصال SDK مباشر لهذا الترخيص.</figcaption>
  </figure>

  <h2>صفحات Activations &amp; Sessions العامة</h2>
  <p>
    <strong>Activations</strong> و<strong>Sessions</strong> في الشريط الجانبي تعرض سجلاتاً عبر كل المنتجات والتراخيص — مفيدة لمكاتب الدعم.
    راجع <a href="/sessions-activations" class="doc-inline-link">Sessions &amp; Activations</a> لتعريفات الأعمدة ودورة الحياة.
  </p>

  <h2>رسائل الخادم (المستخدم النهائي)</h2>
  <p>عند فشل validation أو الربط، يُرجع API رسائل واضحة (تظهر أيضاً في تفاصيل حالة تطبيق SDK للاختبار):</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Binding submitted / pending</strong> — وضع الموافقة؛ انتظر إجراء المالك</li>
    <li><strong>Binding rejected</strong> — رفض المالك؛ تواصل مع الدعم أو أعد تعيين الربط</li>
    <li><strong>Hardware mismatch</strong> — جهاز خاطئ</li>
    <li><strong>Credential mismatch</strong> — Issued To لا يطابق معاملات validation</li>
    <li><strong>Device blocked</strong> — المشغّل حظر هذا الجهاز من Activations</li>
  </ul>

  <h2>المقارنة مع نماذج أخرى</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>مقابل <a href="/perpetual-license" class="doc-inline-link">Perpetual</a> — node-locked جهاز واحد؛ perpetual قد يسمح بعدة activations (∞).</li>
    <li>مقابل <a href="/concurrent-license" class="doc-inline-link">Concurrent</a> — node-locked ربط حصري؛ concurrent هو N أجهزة متزامنة.</li>
    <li>مقابل <a href="/floating-license" class="doc-inline-link">Floating</a> — node-locked hardware ثابت؛ floating مجموعة مقاعد مشتركة.</li>
  </ul>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>راجع أيضاً</h2>
    <div class="integration-grid">
      <a href="/perpetual-license" class="integration-card"><i class="ki-outline ki-key"></i><h4>Perpetual</h4><p>نموذج متعدد الأجهزة</p></a>
      <a href="/sessions-activations" class="integration-card"><i class="ki-outline ki-chart-line"></i><h4>Sessions &amp; Activations</h4><p>مراقبة عامة</p></a>
      <a href="/first-license" class="integration-card"><i class="ki-outline ki-plus-square"></i><h4>First license</h4><p>جولة في المعالج</p></a>
      <a href="/sdk/winforms" class="integration-card"><i class="ki-outline ki-code"></i><h4>WinForms SDK</h4><p>أداة تحقق للاختبار</p></a>
    </div>
  </section>`);

w('credit-based-license', `<header class="help-page-header">
    <h1>ترخيص Credit-Based</h1>
    <p class="lead">
      ترخيص <strong>Credit-Based</strong> (<code>MeteredToken</code>، metering mode <code>Token</code>)
      <strong>online دائماً</strong>. يشارك العملاء <strong>credit wallet</strong> واحداً عبر كل الأجهزة على
      مفتاح الترخيص. كل ميزة مستحقة تخصم credits وفق <strong>per-feature token pricing</strong> على
      المنتج — وليس «استخداماً واحداً لكل استدعاء» كما في Usage-Based.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-wallet"></i>
      <h4>محفظة مشتركة</h4>
      <p>رصيد واحد لكل مفتاح ترخيص — وليس لكل جهاز.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-price-tag"></i>
      <h4>تكلفة متغيرة</h4>
      <p>لكل ميزة <code>TokenCost</code> × quantity.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-chart-line-up"></i>
      <h4>تبويب Usage</h4>
      <p>الرصيد، ledger، top-ups يدوية (المالكون).</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="Guide sections">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>ترخيص Credit-Based — لمالكي المنتج</h2>
    <ul class="guide-checklist">
      <li>أصدر مع <strong>initial credit balance</strong> وvalidation online (online دائماً).</li>
      <li>عيّن <strong>per-feature token pricing</strong> عبر <code>PUT /api/meter/features/&#123;featureId&#125;/pricing</code>.</li>
      <li>أضف رصيداً، عدّل، عيّن low-balance threshold، وسوِّ من تبويب <strong>Usage</strong> للترخيص أو meter API.</li>
      <li>افحص ledger للاستهلاكات والمنح وإعادات idempotent.</li>
      <li>لا حد لـ activation seats — أجهزة كثيرة تشارك محفظة واحدة.</li>
    </ul>
    <p>خطوات المعالج التفصيلية والتسعير ومسارات API للمشغّل موثّقة أدناه.</p>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>ترخيص Credit-Based — للمستخدمين النهائيين</h2>
    <p>
      تشارك مؤسستك مفتاح ترخيص مع <strong>credit wallet</strong>. يبقى التطبيق صالحاً حتى
      عند صفر credits، لكن <strong>الميزات القابلة للفوترة تفشل</strong> حتى تُضاف credits.
    </p>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>فعّل مرة واحدة — validation لا يخصم credits.</li>
      <li>كل إجراء مدفوع (export، render، API call) ينفق credits وفق تسعير الميزة.</li>
      <li><strong>Insufficient balance</strong> — تواصل مع المسؤول لشراء المزيد من credits.</li>
      <li>تحقق من الرصيد المتبقي داخل التطبيق إذا كشف المُدمِج <code>GetBalanceAsync</code>.</li>
    </ul>
  </section>

  <h2>متى تختار Credit-Based</h2>
  <p>
    اختر <strong>Credit-Based</strong> عندما تبيع <strong>مجموعة credits مدفوعة مسبقاً</strong> ويجب أن تكلف
    ميزات مختلفة في منتجك <strong>مبالغ مختلفة</strong>. يبدأ العميل برصيد
    (مثلاً 10,000 credits). في كل مرة ينفّذ إجراءً قابلاً للفوترة، يستدعي تطبيقك
    <code>ConsumeAsync</code> ويخصم الخادم credits وفق السعر المُعدّ لتلك الميزة.
  </p>
  <p>
    فكّر فيه كخطة هاتف مدفوعة مسبقاً بأسعار مكالمات متغيرة: دقيقة إلى البلد A تكلف 2 credits،
    دقيقة إلى البلد B تكلف 5 credits — نفس المحفظة، أسعار مختلفة لكل إجراء.
  </p>

  <h3>حالات مناسبة</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>API أو SaaS بإجراءات متدرجة</strong> — «10,000 API credits شهرياً»؛ قراءة بسيطة تكلف 1 credit، export ثقيل يكلف 25.</li>
    <li><strong>منتجات مستندات / OCR / AI</strong> — «5,000 صفحة مشمولة»؛ OCR يكلف 10 credits للصفحة، الملخص يكلف 40.</li>
    <li><strong>أدوات إبداعية أو حوسبة</strong> — «1,000 render credits»؛ المعاينة رخيصة، export 4K مكلف.</li>
    <li><strong>مبيعات top-up</strong> — يشتري العميل 5,000 credits أخرى عند انخفاض المحفظة (منح يدوي من تبويب Usage حالياً).</li>
  </ul>

  <h3>كيف يتصرف في LicenPro</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>تسمية لوحة التحكم: <strong>Credit-Based</strong>. API enum: <code>MeteredToken</code>.</li>
    <li>يُعرض الرصيد بـ <strong>credits</strong> (مشترك عبر كل الأجهزة على مفتاح الترخيص).</li>
    <li>يجب تعيين <strong>token cost لكل ميزة</strong> قبل أن يعمل consume (عبر metering API؛ واجهة لاحقاً).</li>
    <li>مثال: ميزة <code>ExportPdf</code> بسعر 25 → consume واحد يخصم <strong>25 credits</strong>، وليس 1.</li>
  </ul>

  <h3>متى تستخدم Usage-Based بدلاً من ذلك</h3>
  <p>
    إذا كان كل إجراء قابل للفوترة يجب أن يكلف <strong>استخداماً واحداً بالضبط</strong> — «500 exports مشمولة»، «1,000 API calls» —
    و<strong>لا</strong> تحتاج أسعاراً مختلفة لكل ميزة، استخدم
    <a href="/usage-based-license" class="doc-inline-link">Usage-Based</a> (<code>MeteredCount</code>). أبسط: بدون خطوة تسعير الميزات.
  </p>

  <h2>نظرة سريعة</h2>
  <table class="doc-table">
    <thead>
      <tr><th>الخاصية</th><th>القيمة</th></tr>
    </thead>
    <tbody>
      <tr><td>Backend enum</td><td><code>LicenseType.MeteredToken</code> (value <code>6</code>)</td></tr>
      <tr><td>Dashboard label</td><td><strong>Credit-Based</strong></td></tr>
      <tr><td>Metering mode</td><td><code>MeteringMode.Token</code></td></tr>
      <tr><td>Balance unit</td><td><strong>credits</strong></td></tr>
      <tr><td>Cost per consume</td><td><code>FeatureMeterPricing.TokenCost × quantity</code></td></tr>
      <tr><td>Activation mode</td><td><strong>Online only</strong> — offline غير متاح</td></tr>
      <tr><td>Seat limit</td><td>None — أي عدد من الأجهزة قد يفعّل؛ المحفظة هي الحد</td></tr>
    </tbody>
  </table>

  <h2>الثابت الأساسي</h2>
  <p>
    يُفحص الرصيد ويُخصم <strong>فقط</strong> في <code>POST /api/meter/consume</code>.
    validation الترخيص وactivation وsession connect <strong>لا</strong> ينظرون إلى الرصيد أبداً.
    يمكن تفعيل ترخيص Credit-Based عند صفر credits؛ يجب على تطبيقك استدعاء <code>ConsumeAsync</code> عند تشغيل
    ميزة قابلة للفوترة ومعالجة <code>InsufficientBalance</code> (HTTP 402).
  </p>

  <h2>إنشاء ترخيص Credit-Based (لوحة التحكم)</h2>
  <p>
    افتح <strong>Licenses</strong> → <strong>Generate License</strong>. أربع خطوات:
    <strong>Activation</strong> → <strong>License Type</strong> → <strong>Basic Info</strong> → <strong>Details</strong>.
  </p>

  <h3>الخطوة 1 — Activation</h3>
  <p>اختر <strong>Online</strong>. Credit-Based نوع online دائماً — المعالج يفرض online mode ويخفي بطاقات metered إذا اخترت Offline.</p>

  <h3>الخطوة 2 — License type</h3>
  <p>اختر بطاقة <strong>Credit-Based</strong> («Variable cost per feature»). العنوان الفرعي يشرح credit pool المشترك وtop-ups اليدوية.</p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-license-type.png" data-doc-image-alt="خطوة License Type مع Credit-Based محدّد" aria-label="عرض لقطة خطوة License Type بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-license-type.png" alt="خطوة License Type مع Credit-Based محدّد" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">License Type — Credit-Based (MeteredToken).</figcaption>
  </figure>

  <h3>الخطوة 3 — Basic info</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Product</strong> و<strong>Software release</strong> (مطلوب).</li>
    <li><strong>Issued to</strong> — المستخدم النهائي المعيّن للإصدار (مطلوب لأنواع غير perpetual).</li>
    <li><strong>License name</strong> — تسمية داخلية في القوائم والتدقيق.</li>
    <li><strong>Entitlement set</strong> اختياري — عند التعيين، فقط الميزات المستحقة يمكن consume.</li>
  </ul>

  <h3>الخطوة 4 — Details</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Initial credits balance</strong> (<code>initialMeterBalance</code>) — مطلوب، يجب أن يكون <strong>&gt; 0</strong> (الافتراضي في النموذج غالباً 10,000).</li>
    <li><strong>Notes</strong> — سياق المشغّل (فاتورة، SKU، تذكرة دعم).</li>
  </ul>
  <p>عند الحفظ، ينشئ backend <code>MeterWallet</code> بوضع <code>Token</code> ويكتب صف ledger <strong>InitialGrant</strong> عندما balance &gt; 0.</p>
  <pre ngNonBindable style="margin: 0.75rem 0 1rem; padding: 1rem; background: var(--bs-gray-100, #f5f5f5); border-radius: 0.5rem; font-size: 0.875rem; overflow-x: auto;"><code>Create Credit-Based license, initial 10,000
└─ MeterWallet &#123; mode: Token, balance: 10000 &#125;
   └─ UsageLedger &#123; type: InitialGrant, amount: +10000, balanceAfter: 10000 &#125;</code></pre>

  <h2>ضبط per-feature pricing (Credit-Based فقط)</h2>
  <p>
    قبل أن يستهلك العملاء ميزة، عيّن token cost على المنتج.
    API: <code>PUT /api/meter/features/&#123;featureId&#125;/pricing</code> (مالك المنتج / admin).
  </p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><code>TokenCost</code> يجب أن يكون <strong>&gt; 0</strong>.</li>
    <li>صفوف pricing النشطة السابقة تُعطَّل؛ السجل يُحفظ.</li>
    <li>consume ميزة <strong>بدون pricing نشط</strong> يُرجع <code>PricingNotConfigured</code> (HTTP 422).</li>
  </ul>
  <p><em>ملاحظة:</em> واجهة pricing مخصصة في لوحة التحكم مخططة؛ حالياً يُضبط التسعير عبر API.</p>

  <h2>Activation &amp; sessions</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>Online دائماً — activation وsessions مطلوبان كـ Floating.</li>
    <li><strong>لا activation seat cap</strong> — <code>EnforceSeatLimitOnActivation</code> false لأنواع metered؛ أجهزة كثيرة قد تشارك مفتاحاً واحداً.</li>
    <li>Activations وsessions تظهر في لوحة التحكم لرؤية الدعم (إسناد اختياري على consume عبر <code>hardwareId</code> / <code>activationId</code>).</li>
  </ul>
  <p>راجع <a href="/guides/platform/activations" class="doc-inline-link">Activations</a> و<a href="/guides/platform/sessions" class="doc-inline-link">Sessions</a> أدلة المنصة.</p>

  <h2>Runtime — SDK &amp; API</h2>
  <p>تدفق عميل نموذجي:</p>
  <pre ngNonBindable style="margin: 0.75rem 0 1rem; padding: 1rem; background: var(--bs-gray-100, #f5f5f5); border-radius: 0.5rem; font-size: 0.875rem; overflow-x: auto;"><code>var client = new LicenseClient(options);

// 1. Validate (always online — does NOT check credit balance)
var result = await client.ValidateAsync();
if (!result.IsValid) return;

// 2. Before running a billable feature — deduct credits
var consume = await client.ConsumeAsync("ExportPdf", quantity: 1);
if (!consume.Success &amp;&amp; consume.IsInsufficientBalance)
    ShowTopUpPrompt();

// 3. Optional — show remaining credits
var balance = await client.GetBalanceAsync();</code></pre>
  <p>
    <code>ConsumeAsync</code> يستدعي <code>POST /api/meter/consume</code> مع <code>X-API-KEY</code> للمنتج.
    مرّر <strong>idempotency key</strong> لجعل إعادة المحاولات آمناً — replays تُرجع النتيجة السابقة دون خصم مزدوج.
  </p>

  <h3>Consume request</h3>
  <table class="doc-table">
    <thead><tr><th>الحقل</th><th>مطلوب</th><th>ملاحظات</th></tr></thead>
    <tbody>
      <tr><td><code>licenseKey</code></td><td>Yes</td><td>مفتاح ترخيص العميل</td></tr>
      <tr><td><code>featureName</code></td><td>Yes</td><td>يجب أن تكون مستحقة؛ يجب أن يكون لها pricing نشط</td></tr>
      <tr><td><code>idempotencyKey</code></td><td>Yes</td><td>أعد الاستخدام عند إعادة محاولة نفس العملية المنطقية</td></tr>
      <tr><td><code>quantity</code></td><td>No (default 1)</td><td>Cost = <code>TokenCost × quantity</code></td></tr>
      <tr><td><code>hardwareId</code></td><td>No</td><td>يُكتشف تلقائياً بواسطة SDK عند الحذف</td></tr>
      <tr><td><code>activationId</code></td><td>No</td><td>إسناد الاستخدام إلى صف جهاز</td></tr>
    </tbody>
  </table>

  <h3>مثال عملي</h3>
  <ol style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>أنشئ ترخيصاً برصيد أولي <strong>10,000 credits</strong>.</li>
    <li>سعّر ميزة <code>"render"</code> بـ <strong>TokenCost 40</strong>.</li>
    <li>SDK يستهلك <code>render</code> ×1 → cost 40 → balance <strong>9,960</strong>.</li>
    <li>أعد المحاولة بنفس <code>idempotencyKey</code> → replay، balance ما زال <strong>9,960</strong>.</li>
    <li>Consume ميزة غير مسعّرة → <code>PricingNotConfigured</code> (422).</li>
    <li>المالك يمنح <strong>+5,000</strong> → balance <strong>14,960</strong>، ledger <code>AdminGrant</code>.</li>
  </ol>

  <h2>تبويب Usage (تفاصيل الترخيص)</h2>
  <p>افتح ترخيص Credit-Based → تبويب <strong>Usage</strong>.</p>
  <table class="doc-table">
    <thead><tr><th>الدور</th><th>ما تراه</th></tr></thead>
    <tbody>
      <tr><td><strong>Product owner / Admin</strong></td><td>الرصيد المتبقي، نموذج <strong>Grant balance</strong> (المبلغ، السبب، مرجع خارجي)، ledger استخدام كامل</td></tr>
      <tr><td><strong>Assigned end user</strong> (My Licenses → detail)</td><td>بطاقة رصيد للقراءة فقط؛ ledger بدون إجراءات grant</td></tr>
      <tr><td><strong>Member / Viewer</strong></td><td>بدون واجهة grant؛ للقراءة فقط حيث مسموح</td></tr>
    </tbody>
  </table>
  <p>أنواع صفوف ledger: <strong>InitialGrant</strong>، <strong>Consume</strong> (مبلغ سالب)، <strong>AdminGrant</strong>، <strong>Adjust</strong>.</p>
  <p>Top-ups <strong>يدوية فقط</strong> — لا تكامل payment gateway في الإصدار الحالي.</p>

  <h2>Analytics</h2>
  <p>
    تحليلات المؤسسة تتضمن قسم metered usage من
    <code>GET /api/statistics/meter-usage</code>: عدد تراخيص metered، إجمالي الرصيد المتبقي،
    consumed/granted في الفترة، تنبيهات low-balance، اتجاه الاستهلاك اليومي، أهم الميزات، وأهم التراخيص.
  </p>

  <h2>رموز أخطاء Consume</h2>
  <table class="doc-table">
    <thead><tr><th>ErrorCode</th><th>HTTP</th><th>المعنى</th></tr></thead>
    <tbody>
      <tr><td><code>InvalidRequest</code></td><td>400</td><td>مفتاح أو ميزة أو idempotency key مفقود</td></tr>
      <tr><td><code>LicenseNotFound</code></td><td>404</td><td>لا ترخيص للمفتاح</td></tr>
      <tr><td><code>NotMeteredLicense</code></td><td>400</td><td>نوع ترخيص خاطئ</td></tr>
      <tr><td><code>LicenseInvalid</code></td><td>400</td><td>الحالة ليست Valid</td></tr>
      <tr><td><code>FeatureNotEntitled</code></td><td>403</td><td>الميزة ليست في entitlement sets (عند ضبط sets)</td></tr>
      <tr><td><code>WalletNotFound</code></td><td>400</td><td>المحفظة مفقودة</td></tr>
      <tr><td><code>PricingNotConfigured</code></td><td>422</td><td>لا <code>TokenCost</code> نشط لهذه الميزة</td></tr>
      <tr><td><code>InsufficientBalance</code></td><td>402</td><td><code>balance &lt; cost</code></td></tr>
      <tr><td><code>ConcurrencyConflict</code></td><td>409</td><td>أعد محاولة consume</td></tr>
    </tbody>
  </table>

  <h2>Credit-Based مقابل Usage-Based</h2>
  <p>استخدم هذا الدليل السريع إذا كنت تختار بين النوعين metered:</p>
  <table class="doc-table">
    <thead><tr><th>السؤال</th><th>Credit-Based</th><th><a href="/usage-based-license" class="doc-inline-link">Usage-Based</a></th></tr></thead>
    <tbody>
      <tr><td>ماذا تبيع؟</td><td><strong>credit wallet</strong> (مثلاً «10,000 credits»)</td><td><strong>عدد إجراءات</strong> (مثلاً «500 exports»)</td></tr>
      <tr><td>التكلفة لكل إجراء</td><td><strong>تختلف حسب الميزة</strong> — تعيّن token price لكل ميزة</td><td><strong>دائماً نفسها</strong> — عادة 1 use لكل consume</td></tr>
      <tr><td>الإعداد قبل أول consume</td><td>اضبط <code>TokenCost</code> لكل ميزة</td><td>لا شيء إضافي — فقط أنشئ الترخيص بعدد uses أولي</td></tr>
      <tr><td>أفضل تشبيه</td><td>Credits مدفوعة مسبقاً بأسعار مختلفة لكل خدمة</td><td>«يشمل 500 uses» — كل نقرة زر تُحسب كواحدة</td></tr>
    </tbody>
  </table>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>راجع أيضاً</h2>
    <div class="integration-grid">
      <a href="/usage-based-license" class="integration-card"><i class="ki-outline ki-chart-simple"></i><h4>Usage-Based</h4><p>عداد uses مسطح</p></a>
      <a href="/guides/platform/licenses" class="integration-card"><i class="ki-outline ki-key"></i><h4>Licenses guide</h4><p>مساحة عمل البائع</p></a>
      <a href="/first-license" class="integration-card"><i class="ki-outline ki-plus-square"></i><h4>First license</h4><p>جولة في المعالج</p></a>
      <a href="/sdk/features-usage" class="integration-card"><i class="ki-outline ki-microsoft"></i><h4>SDK features &amp; usage</h4><p>ConsumeAsync</p></a>
    </div>
  </section>`);

w('usage-based-license', `<header class="help-page-header">
    <h1>ترخيص Usage-Based</h1>
    <p class="lead">
      ترخيص <strong>Usage-Based</strong> (<code>MeteredCount</code>، metering mode <code>Count</code>)
      <strong>online دائماً</strong>. يشارك العملاء <strong>use counter</strong> واحداً عبر كل الأجهزة على
      مفتاح الترخيص. كل consume يخصم <strong>quantity</strong> من uses المتبقية — لا per-feature
      token pricing (عكس <a href="/credit-based-license" class="doc-inline-link">Credit-Based</a>).
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-chart-simple"></i>
      <h4>عداد مشترك</h4>
      <p>رصيد «uses» واحد لكل مفتاح ترخيص.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-abstract-26"></i>
      <h4>خصم مسطح</h4>
      <p>كل consume يكلف <code>quantity</code> (عادة 1).</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-chart-line-up"></i>
      <h4>تبويب Usage</h4>
      <p>الرصيد، ledger، top-ups يدوية (المالكون).</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="Guide sections">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>ترخيص Usage-Based — لمالكي المنتج</h2>
    <ul class="guide-checklist">
      <li>أصدر مع <strong>initial use balance</strong> — لا per-feature pricing مطلوب.</li>
      <li>امنح أو عدّل الرصيد من تبويب <strong>Usage</strong> أو meter API (<code>POST /api/meter/grant</code>، <code>adjust</code>).</li>
      <li>راجع ledger ونفّذ reconciliation للتحقق من المحفظة مقابل الصفوف.</li>
      <li>Entitlement sets تقيّد أسماء الميزات التي يمكن consume.</li>
      <li>Online دائماً — لا وضع Usage-Based offline.</li>
    </ul>
    <p>المعالج التفصيلي وأمثلة API موثّقة أدناه.</p>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>ترخيص Usage-Based — للمستخدمين النهائيين</h2>
    <p>
      يتضمن ترخيصك عدداً ثابتاً من <strong>uses</strong> مشتركة عبر أجهزة فريقك.
      يبقى التطبيق مرخّصاً عند صفر uses، لكن الإجراءات metered تتوقف مع <strong>insufficient balance</strong>.
    </p>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>كل إجراء قابل للفوترة يكلف عادة <strong>1 use</strong> (قد يمرّر المُدمِج quantity أعلى).</li>
      <li>عند نفاد uses، اطلب top-up أو ترقية خطة من المسؤول.</li>
      <li>اعرض uses المتبقية داخل التطبيق إذا كشف البائع واجهة الرصيد.</li>
    </ul>
  </section>

  <h2>متى تختار Usage-Based</h2>
  <p>
    اختر <strong>Usage-Based</strong> عندما تبيع <strong>عدداً ثابتاً من الإجراءات</strong> ويجب أن يُحسب
    كل عمل قابل للفوترة بنفس الطريقة — عادة <strong>use واحد لكل استدعاء</strong>. يبدأ العميل برصيد
    (مثلاً 500 uses). في كل مرة ينفّذ ميزة metered، يستدعي تطبيقك <code>ConsumeAsync</code> و
    يطرح الخادم use واحداً (أو أكثر إذا مرّرت <code>quantity</code> أعلى).
  </p>
  <p>
    فكّر فيه كبطاقة perforation: «يتضمن هذا الترخيص 500 exports.» Export #1 يستخدم perforation واحدة، export #2
    واحدة — لا يهم أي قالب export يختارون؛ كل export يكلف نفسه.
  </p>

  <h3>حالات مناسبة</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>SKUs بسيطة مجمّعة</strong> — «500 PDF exports سنوياً» أو «1,000 API calls مشمولة.»</li>
    <li><strong>حدود تقييم</strong> — «جرّب 50 تشغيلاً كاملاً قبل شراء حزمة أكبر.»</li>
    <li><strong>فوترة مسطحة لكل حدث</strong> — كل تقرير مُولَّد، كل sync job، كل upload يُحسب كـ use واحد.</li>
    <li><strong>عمليات لا تحتاج جدول أسعار</strong> — لا تريد صيانة credit costs مختلفة لكل ميزة.</li>
  </ul>

  <h3>كيف يتصرف في LicenPro</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>تسمية لوحة التحكم: <strong>Usage-Based</strong>. API enum: <code>MeteredCount</code>.</li>
    <li>يُعرض الرصيد بـ <strong>uses</strong> (مشترك عبر كل الأجهزة على مفتاح الترخيص).</li>
    <li><strong>لا per-feature pricing</strong> — اسم الميزة للاستحقاق والتدقيق؛ التكلفة دائماً <code>quantity</code>.</li>
    <li>مثال: لدى العميل 500 uses → consume واحد بـ <code>quantity: 1</code> يترك <strong>499 uses</strong>، بغض النظر عن اسم الميزة.</li>
  </ul>

  <h3>متى تستخدم Credit-Based بدلاً من ذلك</h3>
  <p>
    إذا كان يجب أن تستهلك ميزات مختلفة المحفظة <strong>بمعدلات مختلفة</strong> — API call خفيف يكلف 1 credit
    لكن مهمة AI ثقيلة تكلف 50 — استخدم <a href="/credit-based-license" class="doc-inline-link">Credit-Based</a> (<code>MeteredToken</code>)
    واضبط token price لكل ميزة.
  </p>

  <h2>نظرة سريعة</h2>
  <table class="doc-table">
    <thead>
      <tr><th>الخاصية</th><th>القيمة</th></tr>
    </thead>
    <tbody>
      <tr><td>Backend enum</td><td><code>LicenseType.MeteredCount</code> (value <code>7</code>)</td></tr>
      <tr><td>Dashboard label</td><td><strong>Usage-Based</strong></td></tr>
      <tr><td>Metering mode</td><td><code>MeteringMode.Count</code></td></tr>
      <tr><td>Balance unit</td><td><strong>uses</strong></td></tr>
      <tr><td>Cost per consume</td><td><code>quantity</code> (1 use لكل وحدة افتراضياً)</td></tr>
      <tr><td>Feature pricing</td><td><strong>Not used</strong> — اسم الميزة للاستحقاق/التدقيق فقط</td></tr>
      <tr><td>Activation mode</td><td><strong>Online only</strong></td></tr>
      <tr><td>Seat limit</td><td>None — المحفظة/العداد هو الحد، وليس device seats</td></tr>
    </tbody>
  </table>

  <h2>الثابت الأساسي</h2>
  <p>
    يُفحص الرصيد ويُخصم <strong>فقط</strong> في <code>POST /api/meter/consume</code>.
    validation وactivation ينجحان حتى عند <strong>صفر uses</strong>؛ يجب على تطبيقك استدعاء consume عند تشغيل
    الإجراء metered ومعالجة <code>InsufficientBalance</code> (HTTP 402).
  </p>

  <h2>إنشاء ترخيص Usage-Based (لوحة التحكم)</h2>
  <p>
    افتح <strong>Licenses</strong> → <strong>Generate License</strong>. أربع خطوات:
    <strong>Activation</strong> → <strong>License Type</strong> → <strong>Basic Info</strong> → <strong>Details</strong>.
  </p>

  <h3>الخطوة 1 — Activation</h3>
  <p>اختر <strong>Online</strong>. Usage-Based online دائماً؛ offline mode يخفي بطاقات الأنواع metered.</p>

  <h3>الخطوة 2 — License type</h3>
  <p>اختر بطاقة <strong>Usage-Based</strong> («One use per action»). الوصف: use counter مشترك، top-ups يدوية من لوحة التحكم.</p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-license-type.png" data-doc-image-alt="خطوة License Type مع Usage-Based محدّد" aria-label="عرض لقطة خطوة License Type بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-license-type.png" alt="خطوة License Type مع Usage-Based محدّد" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">License Type — Usage-Based (MeteredCount).</figcaption>
  </figure>

  <h3>الخطوة 3 — Basic info</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Product</strong> و<strong>Software release</strong> (مطلوب).</li>
    <li><strong>Issued to</strong> — المستخدم النهائي للإصدار.</li>
    <li><strong>License name</strong> — تسمية داخلية.</li>
    <li><strong>Entitlement set</strong> اختياري — يقيّد أسماء الميزات التي يمكن consume.</li>
  </ul>

  <h3>الخطوة 4 — Details</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Initial uses balance</strong> (<code>initialMeterBalance</code>) — مطلوب، يجب أن يكون <strong>&gt; 0</strong> (مثلاً 500 uses).</li>
    <li><strong>Notes</strong> — سياق المشغّل.</li>
  </ul>
  <p>ينشئ backend <code>MeterWallet &#123; mode: Count &#125;</code> وصف ledger <strong>InitialGrant</strong>.</p>
  <pre ngNonBindable style="margin: 0.75rem 0 1rem; padding: 1rem; background: var(--bs-gray-100, #f5f5f5); border-radius: 0.5rem; font-size: 0.875rem; overflow-x: auto;"><code>Create Usage-Based license, initial 500 uses
└─ MeterWallet &#123; mode: Count, balance: 500 &#125;
   └─ UsageLedger &#123; type: InitialGrant, amount: +500, balanceAfter: 500 &#125;</code></pre>

  <h2>لا خطوة feature pricing</h2>
  <p>
    عكس Credit-Based، Usage-Based <strong>يتجاهل</strong> <code>FeatureMeterPricing</code>.
    <code>ResolveCostAsync</code> يضبط <code>cost = quantity</code> بغض النظر عن اسم الميزة.
    اضبط entitlements إذا احتجت تقييد الميزات التي يمكن meter.
  </p>

  <h2>Activation &amp; sessions</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>Online دائماً — نفس متطلبات activation/session للأنواع online الأخرى.</li>
    <li><strong>لا activation seat cap</strong> — أجهزة غير محدودة قد تفعّل نفس المفتاح.</li>
    <li>استخدم صفحات <strong>Activations</strong> / <strong>Sessions</strong> العامة لعروض دعم عبر التراخيص.</li>
  </ul>

  <h2>Runtime — SDK &amp; API</h2>
  <pre ngNonBindable style="margin: 0.75rem 0 1rem; padding: 1rem; background: var(--bs-gray-100, #f5f5f5); border-radius: 0.5rem; font-size: 0.875rem; overflow-x: auto;"><code>var client = new LicenseClient(options);

var result = await client.ValidateAsync();
if (!result.IsValid) return;

// Each call deducts \`quantity\` uses (default 1)
var consume = await client.ConsumeAsync("ApiCall", quantity: 1);
if (!consume.Success &amp;&amp; consume.IsInsufficientBalance)
    ShowTopUpPrompt();

var balance = await client.GetBalanceAsync(); // remaining uses</code></pre>
  <p>
    اقرأ الرصيد دون خصم: <code>GET /api/meter/balance?licenseKey=...</code> (API key) أو
    لوحة التحكم <code>GET /api/meter/balance/&#123;licenseId&#125;</code>.
  </p>

  <h3>مثال عملي</h3>
  <ol style="margin: 0.5rem 0 1rem 1.25rem;">
    <li>أنشئ ترخيصاً برصيد أولي <strong>500 uses</strong>.</li>
    <li>Consume أي ميزة مستحقة ×1 → balance <strong>499</strong>.</li>
    <li>Consume ×600 في استدعاء واحد → <code>InsufficientBalance</code> (402); balance دون تغيير عند <strong>499</strong>.</li>
    <li>Consume ×499 → balance <strong>0</strong>.</li>
    <li>Consume التالي ×1 → <code>InsufficientBalance</code> (402).</li>
    <li>المالك يمنح <strong>+1,000</strong> → balance <strong>1,000</strong>، ledger <code>AdminGrant</code>.</li>
  </ol>
  <pre ngNonBindable style="margin: 0.75rem 0 1rem; padding: 1rem; background: var(--bs-gray-100, #f5f5f5); border-radius: 0.5rem; font-size: 0.875rem; overflow-x: auto;"><code>Usage-Based, balance 100, consume quantity 3
└─ cost = 3 → balance 97
   └─ UsageLedger &#123; type: Consume, amount: -3, balanceAfter: 97 &#125;</code></pre>

  <h2>تبويب Usage (تفاصيل الترخيص)</h2>
  <p>افتح ترخيص Usage-Based → تبويب <strong>Usage</strong>.</p>
  <table class="doc-table">
    <thead><tr><th>الدور</th><th>ما تراه</th></tr></thead>
    <tbody>
      <tr><td><strong>Product owner / Admin</strong></td><td>uses المتبقية، نموذج grant، ledger كامل (consumes + grants)</td></tr>
      <tr><td><strong>End user</strong> (My Licenses)</td><td>رصيد للقراءة فقط؛ سجل الاستهلاك حيث مكشوف</td></tr>
      <tr><td><strong>Member / Viewer</strong></td><td>للقراءة فقط؛ بدون إجراءات grant</td></tr>
    </tbody>
  </table>
  <p>
    بطاقة الرصيد تعرض «Use mode — each consume deducts one use regardless of feature.»
    Grants تتطلب amount &gt; 0 وتُسجَّل كـ <strong>AdminGrant</strong> مع سبب ومرجع خارجي اختياري (فاتورة / PO).
  </p>

  <h2>Analytics</h2>
  <p>
    <code>GET /api/statistics/meter-usage</code> يجمع كلا النوعين metered:
    <code>meteredCountLicenseCount</code>، إجمالي الرصيد، استهلاك الفترة، تراخيص low-balance، الاتجاه اليومي، وأهم التراخيص.
  </p>

  <h2>رموز أخطاء Consume</h2>
  <table class="doc-table">
    <thead><tr><th>ErrorCode</th><th>HTTP</th><th>المعنى</th></tr></thead>
    <tbody>
      <tr><td><code>InvalidRequest</code></td><td>400</td><td>حقول مطلوبة مفقودة</td></tr>
      <tr><td><code>LicenseNotFound</code></td><td>404</td><td>مفتاح ترخيص غير معروف</td></tr>
      <tr><td><code>NotMeteredLicense</code></td><td>400</td><td>ليس Usage-Based أو Credit-Based</td></tr>
      <tr><td><code>LicenseInvalid</code></td><td>400</td><td>ملغى / منتهٍ</td></tr>
      <tr><td><code>FeatureNotEntitled</code></td><td>403</td><td>الميزة محظورة بواسطة entitlement sets</td></tr>
      <tr><td><code>InsufficientBalance</code></td><td>402</td><td>uses متبقية غير كافية</td></tr>
      <tr><td><code>ConcurrencyConflict</code></td><td>409</td><td>أعد محاولة consume</td></tr>
    </tbody>
  </table>
  <p><em>Usage-Based لا يُرجع <code>PricingNotConfigured</code> أبداً</em> — ينطبق على Credit-Based فقط.</p>

  <h2>Usage-Based مقابل Credit-Based</h2>
  <p>استخدم هذا الدليل السريع إذا كنت تختار بين النوعين metered:</p>
  <table class="doc-table">
    <thead><tr><th>السؤال</th><th>Usage-Based</th><th><a href="/credit-based-license" class="doc-inline-link">Credit-Based</a></th></tr></thead>
    <tbody>
      <tr><td>ماذا تبيع؟</td><td><strong>use counter</strong> (مثلاً «500 exports»)</td><td><strong>credit wallet</strong> (مثلاً «10,000 credits»)</td></tr>
      <tr><td>التكلفة لكل إجراء</td><td><strong>مسطح</strong> — 1 use لكل consume (ما لم تمرّر quantity أعلى)</td><td><strong>متغير</strong> — لكل ميزة token cost خاص</td></tr>
      <tr><td>الإعداد قبل أول consume</td><td>أنشئ الترخيص بعدد uses أولي فقط</td><td>اضبط <code>TokenCost</code> لكل ميزة، ثم consume</td></tr>
      <tr><td>أفضل تشبيه</td><td>بطاقة perforation — كل إجراء يستخدم perforation واحدة</td><td>محفظة مدفوعة مسبقاً — خدمات مختلفة تكلف مبالغ مختلفة</td></tr>
    </tbody>
  </table>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>راجع أيضاً</h2>
    <div class="integration-grid">
      <a href="/credit-based-license" class="integration-card"><i class="ki-outline ki-wallet"></i><h4>Credit-Based</h4><p>Token wallet</p></a>
      <a href="/guides/platform/licenses" class="integration-card"><i class="ki-outline ki-key"></i><h4>Licenses guide</h4><p>مساحة عمل البائع</p></a>
      <a href="/sessions-activations" class="integration-card"><i class="ki-outline ki-chart-line"></i><h4>Sessions &amp; Activations</h4><p>مراقبة</p></a>
      <a href="/sdk/features-usage" class="integration-card"><i class="ki-outline ki-microsoft"></i><h4>SDK features &amp; usage</h4><p>ConsumeAsync</p></a>
    </div>
  </section>`);
