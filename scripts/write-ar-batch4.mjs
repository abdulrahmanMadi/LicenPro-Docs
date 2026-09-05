import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/app/docs/content/static-pages/ar');
const w = (name, html) => {
  fs.writeFileSync(path.join(arDir, `${name}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
};

w('perpetual-license', `<header class="help-page-header">
    <h1>ترخيص Perpetual</h1>
    <p class="lead">
      يمنح ترخيص <strong>Perpetual</strong> استخداماً طويل الأمد دون مدة اشتراك. اختر <strong>online</strong>
      (تحقق مباشر، activations، وsessions في لوحة التحكم) أو <strong>offline</strong> (ملف <code>license.bin</code> موقّع لبيئات معزولة عن الشبكة).
      Perpetual online مثالي عندما تحتاج إلغاءً فورياً ورؤية للاستخدام.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>استحقاق طويل الأمد</h4>
      <p>لا دورة تجديد ما لم تحدّد انتهاءً اختيارياً.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-wifi"></i>
      <h4>Online أو offline</h4>
      <p>الخطوة 1 في معالج الإنشاء — Activation mode.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-people"></i>
      <h4>أجهزة متعددة</h4>
      <p>Perpetual online قد يعرض activations كثيرة (حد ∞ عند عدم التعيين).</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="أقسام الدليل">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>ترخيص Perpetual — لمالكي المنتج</h2>
    <p>
      امنح استخداماً طويل الأمد دون دورة تجديد اشتراك. اختر التحقق <strong>online</strong> لـ
      إلغاء مباشر ورؤية في لوحة التحكم، أو <strong>offline</strong> للتثبيتات المعزولة مع ملفات
      <code>license.bin</code> موقّعة بـ RSA.
    </p>
    <ul class="guide-checklist">
      <li>أصدر عبر <strong>Licenses → Generate License</strong> → Perpetual.</li>
      <li>اضبط مفاتيح RSA للمنتج قبل توزيع ملفات الترخيص.</li>
      <li>راقب <strong>Activations</strong> و<strong>Sessions</strong> لـ Perpetual online.</li>
      <li>احظر أو ألغِ تفعيل أجهزة فردية دون إلغاء المفتاح بالكامل.</li>
      <li>ألغِ الترخيص بالكامل من Overview عند الحاجة.</li>
    </ul>
    <p><strong>Issued to</strong> الاختياري + وضع online يفرض تطابق بيانات الاعتماد عند التحقق.</p>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>ترخيص Perpetual — للمستخدمين النهائيين</h2>
    <p>
      تستلم <strong>license key</strong> و<code>license.bin</code> (إضافة إلى المفتاح العام للمنتج من المورّد).
      Perpetual يعني عدم انتهاء تلقائي ما لم يحدّد المورّد تاريخ صيانة اختياري.
    </p>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li><strong>Perpetual online</strong> — يتحقق التطبيق من الخادم؛ يدعم activations وsessions مباشرة.</li>
      <li><strong>Perpetual offline</strong> — يتحقق التطبيق محلياً بعد فحص التوقيع؛ لا يلزم إنترنت يومي.</li>
    </ul>
    <p>أخطاء شائعة: <strong>signature mismatch</strong> (مفتاح عام خاطئ)، <strong>device blocked</strong>، <strong>credential mismatch</strong> (مستخدم issued-to).</p>
  </section>

  <h2>إنشاء ترخيص Perpetual (لوحة التحكم)</h2>
  <p>
    <strong>Licenses</strong> → <strong>Generate License</strong>. معالج من أربع خطوات:
    <strong>Activation</strong> → <strong>License Type</strong> → <strong>Basic Info</strong> → <strong>Details</strong>.
  </p>

  <h3>الخطوة 1 — Activation mode</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Online</strong> — يستدعي SDK الـ API عند التحقق؛ تُتتبَّع activations وsessions. ألغِ جهازاً من لوحة التحكم ويفشل الفحص التالي فوراً.</li>
    <li><strong>Offline</strong> — وزّع <code>license.bin</code>؛ الاستخدام اليومي لا يتطلب اتصال API. غير متاح لجميع أنواع وصول المنتج (منتجات Opened قد تقصر على Perpetual offline فقط).</li>
  </ul>

  <h3>الخطوة 2 — License type</h3>
  <p>اختر <strong>Perpetual</strong> — استخدام متعدد المستخدمين، غير محدود؛ يعمل online أو offline حسب الخطوة 1.</p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-license-type.png" data-doc-image-alt="خطوة License Type في Generate License تعرض بطاقات Perpetual وNode-Locked" aria-label="عرض لقطة خطوة License Type بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-license-type.png" alt="خطوة License Type في Generate License تعرض بطاقات Perpetual وNode-Locked" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">License Type — اختر Perpetual (أو قارن مع Node-Locked).</figcaption>
  </figure>

  <h3>الخطوة 3 — Basic info</h3>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Product</strong> و<strong>Software release</strong> (مطلوب)</li>
    <li><strong>Issued to</strong> — لـ Perpetual، غالباً يُعيَّن تلقائياً أو وصول مفتوح حسب نوع المنتج. عند التعيين، يجب أن يطابق SDK <code>UserName</code> في ملف الترخيص للتحقق online.</li>
    <li><strong>License name</strong> (مطلوب)</li>
  </ul>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-license-step-basic-info.png" data-doc-image-alt="Generate License Basic Info: المنتج والإصدار واسم الترخيص" aria-label="عرض لقطة خطوة Basic Info بالحجم الكامل">
      <img src="assets/docs/platform-create-license-step-basic-info.png" alt="Generate License Basic Info: المنتج والإصدار واسم الترخيص" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Basic Info — سياق المنتج والإصدار.</figcaption>
  </figure>

  <h3>الخطوة 4 — Details</h3>
  <p>
    تراخيص Perpetual لا تعرض <strong>Device binding mode</strong> (ذلك لـ node-locked فقط).
    اضبط <strong>expiration</strong> اختياري (نافذة صيانة)، <strong>entitlement sets</strong>، و<strong>notes</strong>، ثم أنشئ.
  </p>

  <h2>قائمة Licenses — Perpetual مقابل node-locked</h2>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>العمود</th><th>Perpetual (مثال)</th><th>Node-Locked (مثال)</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Type</strong></td><td>Perpetual badge</td><td>NodeLocked badge</td></tr>
      <tr><td><strong>Mode</strong></td><td>Online / Offline</td><td>Online / Offline</td></tr>
      <tr><td><strong>Expiration</strong></td><td>غالباً ∞ (بدون انتهاء)</td><td>غالباً Never</td></tr>
      <tr><td><strong>Activations</strong></td><td>مثلاً <code>2 / ∞</code> — أجهزة متعددة مسموحة</td><td>مثلاً <code>1 / 1</code> — جهاز واحد مربوط</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-licenses-list.png" data-doc-image-alt="قائمة Licenses: Perpetual بـ 2/infinity activations وNodeLocked بـ 1/1" aria-label="عرض لقطة قائمة التراخيص بالحجم الكامل">
      <img src="assets/docs/platform-licenses-list.png" alt="قائمة Licenses: Perpetual بـ 2/infinity activations وNodeLocked بـ 1/1" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">قائمة Licenses — أعداد activations تختلف حسب النوع.</figcaption>
  </figure>

  <h2>سير العمل على الجهاز (Perpetual online)</h2>
  <ol style="margin-left:1.25rem;">
    <li>وزّع license key + <code>license.bin</code> + المفتاح العام المضمّن.</li>
    <li>يستدعي التطبيق <code>LicenseClient.ValidateAsync</code> أو <strong>Validate License</strong> في عينة WinForms.</li>
    <li>يفحص الخادم التوقيع والحالة والانتهاء وتطابق <code>UserName</code> / issued-to اختياري وقائمة حظر الأجهزة.</li>
    <li>عند النجاح، ينشئ SDK سجل <strong>activation</strong> (أول مرة لكل جهاز) و<strong>session</strong> مباشرة.</li>
    <li>تُبقي heartbeats الـ session متصلة أثناء تشغيل التطبيق؛ افصل عند الخروج.</li>
  </ol>

  <div class="help-callout info help-callout--plain">
    <i class="ki-outline ki-wifi" aria-hidden="true"></i>
    <div>
      <span class="callout-title">الإلغاء</span>
      <p>احظر أو ألغِ تفعيل جهاز من تبويب <strong>Activations</strong> للترخيص. يفشل التحقق online أو heartbeat التالي على ذلك الجهاز برسالة device-blocked أو invalid — تبقى activations الأخرى صالحة.</p>
    </div>
  </div>

  <h2>تفاصيل الترخيص — تبويب Overview</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>License type</strong> — Perpetual</li>
    <li><strong>Validation mode</strong> — Online أو Offline</li>
    <li><strong>Expiration</strong> — No expiration (∞) ما لم تحدّد تاريخاً</li>
    <li><strong>Usage statistics</strong> — أجهزة نشطة مقابل الحد الأقصى (غير محدود عند عدم تعيين max)</li>
    <li><strong>Online activity</strong> — اختصارات لعدد Activations وActive Sessions</li>
  </ul>
  <p>تراخيص Perpetual online لا تعرض حقول Device Binding (لا وضع ربط hardware).</p>

  <h2>تبويب Activations</h2>
  <p>
    كل صف هو <strong>جهاز تحقق أو فعّل</strong> مفتاح الترخيص هذا. Perpetual online قد يكون له صفوف كثيرة؛
    لا قفل لجهاز واحد ما لم تحدّد <strong>max activations</strong> عند الإنشاء.
  </p>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>العمود</th><th>المعنى</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Device</strong></td><td>اسم المضيف وبصمة hardware</td></tr>
      <tr><td><strong>User</strong></td><td>مستخدم OS / SDK عند التفعيل</td></tr>
      <tr><td><strong>IP</strong></td><td>IP العميل عند التفعيل</td></tr>
      <tr><td><strong>Activated</strong></td><td>وقت أول ظهور لهذا الجهاز</td></tr>
      <tr><td><strong>Status</strong></td><td>Active — قد يتحقق الجهاز؛ Blocked — مرفوض في الفحص التالي</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-node-locked-activations-tab.png" data-doc-image-alt="تبويب Activations للترخيص يعرض صفوف الأجهزة (نفس التخطيط لـ Perpetual وNode-Locked)" aria-label="عرض لقطة تبويب Activations بالحجم الكامل">
      <img src="assets/docs/platform-node-locked-activations-tab.png" alt="تبويب Activations للترخيص يعرض صفوف الأجهزة" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">تبويب Activations — نفس واجهة المستخدم لجميع أنواع التراخيص online.</figcaption>
  </figure>

  <h2>تبويب Active Sessions (online فقط)</h2>
  <p>
    يسرد التطبيقات المتصلة حالياً بـ heartbeat مباشر. قد توجد sessions متعددة عندما يشغّل عدة مستخدمين التطبيق معاً
    (خاضع لحد max concurrent seats إن وُجد).
  </p>
  <table class="doc-table" style="width:100%; margin: 1rem 0;">
    <thead>
      <tr><th>العمود</th><th>المعنى</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>User</strong></td><td>هوية الـ session + إصدار التطبيق</td></tr>
      <tr><td><strong>Device</strong></td><td>اسم الجهاز ونظام التشغيل</td></tr>
      <tr><td><strong>IP Address</strong></td><td>IP الاتصال الحالي (مخفي في الواجهة)</td></tr>
      <tr><td><strong>Connected</strong></td><td>وقت بدء الـ session</td></tr>
      <tr><td><strong>Heartbeat</strong></td><td>آخر ping من SDK — heartbeats قديمة تُعلّم الـ session offline</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-node-locked-sessions-tab.png" data-doc-image-alt="تبويب Active Sessions للترخيص بأعمدة User وDevice وIP وConnected وHeartbeat" aria-label="عرض لقطة تبويب Active Sessions بالحجم الكامل">
      <img src="assets/docs/platform-node-locked-sessions-tab.png" alt="تبويب Active Sessions للترخيص بأعمدة User وDevice وIP وConnected وHeartbeat" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Active Sessions — اتصالات مباشرة لهذا الترخيص.</figcaption>
  </figure>

  <h2>سير عمل Perpetual offline</h2>
  <ol style="margin-left:1.25rem;">
    <li>أنشئ بوضع تفعيل <strong>Offline</strong>.</li>
    <li>يستورد العميل <code>license.bin</code>؛ يتحقق SDK من توقيع RSA محلياً.</li>
    <li>قد يُطلب تحقق online أول مرة لتهيئة الذاكرة المؤقتة (يعتمد على SDK).</li>
    <li>قد تعرض لوحة التحكم sessions مباشرة أقل؛ لا يُستخدم تبويب Device Binding.</li>
  </ol>

  <h2>المراقبة العامة</h2>
  <p>
    <strong>Activations</strong> و<strong>Sessions</strong> في الشريط الجانبي تجمع كل التراخيص.
    رشّح حسب الجهاز أو المستخدم أو IP للدعم. راجع <a href="/sessions-activations" class="doc-inline-link">Sessions &amp; Activations</a>.
  </p>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-sessions-global-list.png" data-doc-image-alt="صفحة Global Active Sessions تسرد sessions عبر جميع التراخيص" aria-label="عرض لقطة صفحة Sessions العامة بالحجم الكامل">
      <img src="assets/docs/platform-sessions-global-list.png" alt="صفحة Global Active Sessions تسرد sessions عبر جميع التراخيص" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Global Sessions — كل المنتجات؛ اسم الترخيص يربط بالتفاصيل.</figcaption>
  </figure>

  <h2>المقارنة مع node-locked</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Perpetual online</strong> — أجهزة متعددة ممكنة؛ ركّز على Activations + Sessions.</li>
    <li><strong>Node-locked</strong> — ربط hardware واحد؛ ركّز على تبويب Device Binding + binding mode عند الإنشاء.</li>
    <li>راجع <a href="/node-locked-license" class="doc-inline-link">ترخيص Node-locked</a> لتدفقات Auto-bind والموافقة.</li>
  </ul>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>انظر أيضاً</h2>
    <div class="integration-grid">
      <a href="/node-locked-license" class="integration-card"><i class="ki-outline ki-lock"></i><h4>Node-locked</h4><p>جهاز واحد</p></a>
      <a href="/sessions-activations" class="integration-card"><i class="ki-outline ki-chart-line"></i><h4>Sessions &amp; Activations</h4><p>دورة الحياة</p></a>
      <a href="/first-license" class="integration-card"><i class="ki-outline ki-plus-square"></i><h4>First license</h4><p>المعالج</p></a>
      <a href="/sdk/license-client" class="integration-card"><i class="ki-outline ki-microsoft"></i><h4>LicenseClient</h4><p>SDK API</p></a>
    </div>
  </section>`);

w('floating-license', `<header class="help-page-header">
    <h1>ترخيص Floating</h1>
    <p class="lead">
      ترخيص <strong>Floating</strong> هو <strong>enterprise seat pool</strong> يُفرَض عبر <strong>live sessions</strong> (connect + heartbeat).
      مفتاح ترخيص واحد يخدم مستخدمين كثيرين، لكن <em>N</em> فقط يمكنهم تشغيل التطبيق في الوقت نفسه. Floating <strong>always online</strong> دائماً — لا يوجد وضع Floating offline.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-pulse"></i>
      <h4>مقاعد session</h4>
      <p>حد المجمّع = الحد الأقصى للـ sessions المباشرة المتزامنة.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-wifi"></i>
      <h4>Always online</h4>
      <p>Heartbeats مطلوبة؛ لا فرض offline.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-chart-line"></i>
      <h4>لوحة Sessions</h4>
      <p>استخدام المجمّع مقابل الحد في الوقت الفعلي.</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="أقسام الدليل">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>ترخيص Floating — لمالكي المنتج</h2>
    <p>
      بِع <strong>concurrent seat pool</strong> يُفرَض عبر <strong>live SDK sessions</strong> (connect + heartbeat).
      Floating <strong>always online</strong> دائماً — لا يوجد وضع offline. تبويب Activations مخفي؛ استخدم Sessions لحساب المقاعد.
    </p>

    <h3>متى تختار Floating</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li><strong>صفقة concurrent للمؤسسة</strong> — «100 مستخدم متزامن» على مستوى الشركة.</li>
      <li><strong>دوران مقاعد مرتفع</strong> — المستخدمون يفتحون/يغلقون التطبيق كثيراً؛ تُعاد المقاعد عند الانقطاع.</li>
      <li><strong>مجمّع موقع / قسم</strong> — مفتاح مؤسسة واحد، الخادم يفرض التزامن.</li>
    </ul>

    <h3>إصدار ترخيص (لوحة التحكم)</h3>
    <ol style="margin-left:1.25rem;">
      <li><strong>Licenses</strong> → <strong>Generate License</strong>.</li>
      <li>الخطوة 2 — اختر <strong>Floating</strong>؛ يُفرَض وضع online.</li>
      <li>اضبط <strong>Max active users</strong> = حد الـ sessions المتزامنة.</li>
      <li>أكمل المنتج والإصدار والاستحقاقات → أنشئ ووزّع مفتاح مؤسسة واحد.</li>
    </ol>

    <h3>التشغيل والدعم</h3>
    <ul class="guide-checklist">
      <li><strong>Sessions tab</strong> — استخدام المجمّع مقابل الحد في الوقت الفعلي.</li>
      <li><strong>Force disconnect</strong> — حرّر مقعداً عالقاً بعد تعطل (دون إعادة إصدار).</li>
      <li><strong>Session cleanup</strong> — heartbeats قديمة تُعلّم sessions offline وتُحرّر المقاعد.</li>
      <li><strong>Revoke license</strong> — يعطّل المجمّع بالكامل من Overview.</li>
    </ul>
    <p>راقب عالمياً على <code>/dashboard/sessions</code>.</p>

    <h3>أتمتة API</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>إنشاء: <code>POST /api/licenses</code> مع <code>type: Floating</code>.</li>
      <li>Connect: <code>POST /api/sessions/connect</code> — يستهلك مقعداً ما دامت الـ session نشطة.</li>
      <li>Heartbeat: <code>POST /api/sessions/heartbeat</code> — يُبقي المقعد حياً.</li>
      <li>Disconnect: <code>POST /api/sessions/disconnect</code> أو force-disconnect من المشغّل.</li>
    </ul>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>ترخيص Floating — للمستخدمين النهائيين</h2>
    <p>
      تشارك مؤسستك <strong>مفتاح ترخيص واحد</strong>. <em>N</em> أشخاص فقط يمكنهم تشغيل التطبيق
      <strong>في الوقت نفسه</strong>. عند إغلاق التطبيق، يعود مقعدك إلى المجمّع خلال فترة heartbeat.
    </p>

    <h3>المتطلبات</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>اتصال شبكة مستمر بـ LicenPro API (always online).</li>
      <li>License key / ملف من IT — نفس المفتاح لجميع المستخدمين في المجمّع.</li>
    </ul>

    <h3>أثناء تشغيل التطبيق</h3>
    <ol style="margin-left:1.25rem;">
      <li>يتحقق التطبيق و<strong>يربط session</strong> — يشغل مقعداً في المجمّع.</li>
      <li><strong>Heartbeats</strong> دورية تُبقي المقعد محجوزاً.</li>
      <li>الخروج المنظم يرسل disconnect ويحرّر المقعد بسرعة.</li>
    </ol>

    <h3>استكشاف الأخطاء</h3>
    <table class="doc-table" style="width:100%; margin: 1rem 0;">
      <thead>
        <tr><th>الرسالة</th><th>المعنى</th><th>ما الذي تفعله</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>MaxConcurrentSessionsReached</strong></td><td>المجمّع ممتلئ</td><td>انتظر خروج زميل، أو اطلب من IT قطع sessions قديمة</td></tr>
        <tr><td><strong>RateLimited</strong></td><td>Heartbeats كثيرة جداً</td><td>انتظر — الـ session تبقى عادةً صالحة</td></tr>
        <tr><td><strong>SessionNotFound</strong></td><td>الخادم ألغى الـ session</td><td>أعد تشغيل التطبيق لإعادة الاتصال</td></tr>
        <tr><td>أخطاء شبكة</td><td>تعذّر الوصول للخادم</td><td>Floating لا يعمل offline — أعد الاتصال</td></tr>
      </tbody>
    </table>
  </section>

  <h2>Floating مقابل Concurrent</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Floating</strong> — حد المقاعد على <em>live sessions</em>؛ always online؛ الأفضل لدوران مقاعد سريع.</li>
    <li><strong><a href="/concurrent-license" class="doc-inline-link">Concurrent</a></strong> — حد المقاعد على <em>device activations</em>؛ sessions تُظهر من متصل لكن activations تحجز المقاعد.</li>
  </ul>

  <div class="help-callout warning">
    <i class="ki-outline ki-wifi"></i>
    <div>
      <span class="callout-title">ليس للمواقع المعزولة</span>
      <p>لا يمكن لـ Floating أن يفرض بدون heartbeats من الخادم. استخدم <a href="/perpetual-license" class="doc-inline-link">Perpetual offline</a> أو <a href="/node-locked-license" class="doc-inline-link">Node-locked</a> للبيئات المنفصلة عن الشبكة.</p>
    </div>
  </div>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>انظر أيضاً</h2>
    <div class="integration-grid">
      <a href="/concurrent-license" class="integration-card"><i class="ki-outline ki-users"></i><h4>Concurrent</h4><p>مقاعد قائمة على activation</p></a>
      <a href="/sessions-activations" class="integration-card"><i class="ki-outline ki-chart-line"></i><h4>Sessions guide</h4><p>عمليات heartbeat</p></a>
      <a href="/guides/platform/sessions" class="integration-card"><i class="ki-outline ki-pulse"></i><h4>Platform Sessions</h4><p>لوحة التحكم</p></a>
      <a href="/api/activations-sessions" class="integration-card"><i class="ki-outline ki-data"></i><h4>REST API</h4><p>التكامل</p></a>
    </div>
  </section>`);

w('concurrent-license', `<header class="help-page-header">
    <h1>ترخيص Concurrent</h1>
    <p class="lead">
      يسمح ترخيص <strong>Concurrent</strong> لعدد ثابت من <strong>الأجهزة</strong> باستخدام المنتج في وقت واحد عبر الفريق.
      تُفرَض المقاعد عبر <strong>device activations</strong> — عند إغلاق المستخدم للتطبيق، قد يُطلَق الـ activation ويصبح المقعد متاحاً لجهاز آخر.
      على عكس <a href="/floating-license" class="doc-inline-link">Floating</a>، Concurrent لا يقتصر على live session heartbeats لعدّ المقاعد.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-users"></i>
      <h4>مقاعد activation</h4>
      <p>Max active users = حد device activation.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-verify"></i>
      <h4>تبويب Activations</h4>
      <p>استخدام المقاعد يُعرض لكل صف جهاز.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-chart-line"></i>
      <h4>تبويب Sessions</h4>
      <p>اتصالات مباشرة لرؤية الدعم.</p>
    </div>
  </div>

  <nav class="guide-audience-nav" aria-label="أقسام الدليل">
    <span class="guide-audience-nav__label">انتقل إلى:</span>
    <a href="#product-owner-guide" class="guide-audience-nav__link guide-audience-nav__link--owner">دليل مالك المنتج</a>
    <a href="#end-user-guide" class="guide-audience-nav__link guide-audience-nav__link--user">دليل المستخدم النهائي</a>
  </nav>

  <section id="product-owner-guide" class="guide-audience-section guide-audience-section--owner">
    <h2>ترخيص Concurrent — لمالكي المنتج</h2>
    <p>
      أصدر مفتاح فريق مشترك بحد <strong>max active users</strong>. تُفرَض المقاعد على
      <strong>device activations</strong>، وليس sessions المباشرة وحدها. استخدم هذا عندما تريد سجل تدقيق على مستوى الجهاز
      ومقاعد تبقى حتى إلغاء التفعيل.
    </p>

    <h3>متى تختار Concurrent</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li><strong>ترخيص فريق</strong> — «5 مستخدمين متزامنين» لفريق تصميم.</li>
      <li><strong>فصل دراسي / مختبر</strong> — أجهزة كثيرة، مقاعد concurrent أقل.</li>
      <li><strong>بديل mid-market لـ Floating</strong> — مقاعد قائمة على activation دون دلالات session-only.</li>
    </ul>

    <h3>إصدار ترخيص (لوحة التحكم)</h3>
    <ol style="margin-left:1.25rem;">
      <li><strong>Licenses</strong> → <strong>Generate License</strong>.</li>
      <li>الخطوة 1 — اختر <strong>Online</strong> (معتاد) أو <strong>Offline</strong> activation mode.</li>
      <li>الخطوة 2 — اختر <strong>Concurrent</strong> واضبط <strong>Max active users</strong> (حد المقاعد).</li>
      <li>الخطوات 3–4 — المنتج والإصدار وissued-to (اختياري) والاستحقاقات والملاحظات → أنشئ.</li>
    </ol>

    <h3>التشغيل والدعم</h3>
    <ul class="guide-checklist">
      <li><strong>Activations tab</strong> — عدّاد المقاعد المرجعي (<code>N / max</code>).</li>
      <li><strong>Sessions tab</strong> — من متصل الآن (رؤية الدعم؛ لا يحرّر المقاعد بذاته).</li>
      <li><strong>Deactivate</strong> device activation لتحرير مقعد لجهاز آخر.</li>
      <li><strong>Block device</strong> — ارفض laptop واحداً دون إلغاء مفتاح الفريق بالكامل.</li>
      <li><strong>Revoke license</strong> — عطّل المفتاح بالكامل من Overview.</li>
    </ul>
    <p>عروض عامة: <code>/dashboard/activations</code> و<code>/dashboard/sessions</code>.</p>

    <h3>أتمتة API</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>إنشاء: <code>POST /api/licenses</code> مع <code>type: Concurrent</code> و<code>maxActiveUsersCount</code>.</li>
      <li>Activate: <code>POST /api/activations</code> (SDK، API key).</li>
      <li>Deactivate seat: <code>DELETE /api/activations/current</code> أو block من لوحة التحكم.</li>
    </ul>
    <p>راجع <a href="/guides/platform/activations" class="doc-inline-link">Activations platform guide</a> و<a href="/api/activations-sessions" class="doc-inline-link">REST API</a>.</p>
  </section>

  <section id="end-user-guide" class="guide-audience-section guide-audience-section--user">
    <h2>ترخيص Concurrent — للمستخدمين النهائيين</h2>
    <p>
      تستلم <strong>shared license key</strong> (وعادة <code>license.bin</code>) من مؤسستك.
      كل جهاز يشغّل التطبيق يستهلك <strong>activation seat</strong> واحداً حتى يُلغِ التطبيق التفعيل أو IT يزيل الجهاز.
    </p>

    <h3>ما تحتاجه</h3>
    <ul style="margin: 0.5rem 0 1rem 1.25rem;">
      <li>License key وملف ترخيص موقّع من المسؤول.</li>
      <li><strong>Public key</strong> للمنتج ونقطة نهاية API مضبوطة في التطبيق (مسؤولية المُدمِج).</li>
      <li>اتصال شبكة إذا كان الترخيص يستخدم <strong>online validation</strong>.</li>
    </ul>

    <h3>أول تشغيل</h3>
    <ol style="margin-left:1.25rem;">
      <li>ثبّت التطبيق واستورد ملف الترخيص أو أدخل المفتاح.</li>
      <li>تحقق / فعّل — يسجّل الخادم هذا الجهاز كمقعد واحد.</li>
      <li>أثناء التشغيل online، قد يُظهر <strong>session heartbeat</strong> أنك «online» في أدوات المسؤول.</li>
      <li>عند الخروج، استخدم إجراء deactivate في التطبيق إن وُجد لتحرير المقعد لزميل.</li>
    </ol>

    <h3>الحدود</h3>
    <p>
      عندما تكون كل المقاعد مستخدمة، يحصل الجهاز التالي على <strong>Max activations reached</strong>.
      إغلاق التطبيق دون deactivate قد يُبقي المقعد مشغولاً حتى ينظفه مسؤول.
    </p>

    <h3>استكشاف الأخطاء</h3>
    <table class="doc-table" style="width:100%; margin: 1rem 0;">
      <thead>
        <tr><th>الرسالة</th><th>ماذا تعني</th><th>ما الذي تفعله</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>MaxActivationsReached</strong></td><td>مجمّع المقاعد ممتلئ</td><td>اطلب من زميل deactivate، أو اتصل بـ IT</td></tr>
        <tr><td><strong>DeviceBlocked</strong></td><td>المسؤول حظر هذا الجهاز</td><td>اتصل بالدعم</td></tr>
        <tr><td><strong>LicenseInvalid / revoked</strong></td><td>المفتاح معطّل</td><td>اطلب مفتاحاً جديداً من المورّد</td></tr>
        <tr><td><strong>LicenseExpired</strong></td><td>انتهت المدة</td><td>جدّد أو اطلب ترخيصاً محدّثاً</td></tr>
      </tbody>
    </table>
  </section>

  <h2>Concurrent مقابل Floating</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Seat counter</strong> — Concurrent: <em>activations</em>؛ Floating: <em>live sessions</em>.</li>
    <li><strong>Online rule</strong> — Floating: always online؛ Concurrent: online validation معتاد لكن ليس «always online type» في السياسة.</li>
    <li><strong>Dashboard</strong> — Concurrent يعرض تبويب Activations؛ Floating يخفيه ويستخدم Sessions فقط.</li>
    <li><strong>Best for</strong> — Concurrent: تدقيق أجهزة الفريق؛ Floating: مؤسسة كبيرة بدوران مقاعد سريع.</li>
  </ul>

  <section class="next-steps-section" style="margin-top: 2rem;">
    <h2>انظر أيضاً</h2>
    <div class="integration-grid">
      <a href="/floating-license" class="integration-card"><i class="ki-outline ki-people"></i><h4>Floating</h4><p>مجمّع قائم على session</p></a>
      <a href="/guides/platform/activations" class="integration-card"><i class="ki-outline ki-verify"></i><h4>Activations</h4><p>دليل المنصة</p></a>
      <a href="/sessions-activations" class="integration-card"><i class="ki-outline ki-chart-line"></i><h4>Sessions guide</h4><p>اتصالات مباشرة</p></a>
      <a href="/api/activations-sessions" class="integration-card"><i class="ki-outline ki-data"></i><h4>REST API</h4><p>التكامل</p></a>
    </div>
  </section>`);

console.log('Batch 4 done');
