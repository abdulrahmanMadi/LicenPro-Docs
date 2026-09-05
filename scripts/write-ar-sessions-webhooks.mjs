import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const arDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/app/docs/content/static-pages/ar');
const w = (name, html) => {
  fs.writeFileSync(path.join(arDir, `${name}.ts`), `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
};

w('sessions-activations', `<header class="help-page-header">
    <h1>Sessions &amp; Activations</h1>
    <p class="lead">
      راقب كيف تُستخدم التراخيص في بيئة الإنتاج. <strong>Activations</strong> سجلات أجهزة دائمة؛
      <strong>Sessions</strong> اتصالات SDK حية مع heartbeats. يظهر كلاهما لتراخيص <strong>online</strong>
      <a href="/perpetual-license" class="doc-inline-link">Perpetual</a> و<a href="/node-locked-license" class="doc-inline-link">Node-Locked</a>.
    </p>
  </header>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-screen"></i>
      <h4>Activations</h4>
      <p>رابط دائم بين الجهاز والترخيص (أول validate/activate).</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-timer"></i>
      <h4>Sessions</h4>
      <p>اتصال مؤقت أثناء تشغيل التطبيق (heartbeat).</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-lock"></i>
      <h4>Node-locked</h4>
      <p>عادةً activation واحد؛ الربط في تبويب Device.</p>
    </div>
  </div>

  <h2>دورة الحياة</h2>
  <div class="doc-stepper">
    <div class="step-item active">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>التحقق / التفعيل</h3>
        <p>
          أول تحقق online ناجح ينشئ صف <strong>activation</strong>: بصمة الأجهزة، واسم الجهاز، وIP، والمستخدم.
          Node-Locked يحدّث أيضاً <strong>binding status</strong> (auto-bind أو pending approval).
        </p>
      </div>
    </div>
    <div class="step-item active">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>ربط Session</h3>
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
          heartbeats دورية تحدّث <strong>Last heartbeat</strong>. إذا توقفت (تعطّل أو فقدان شبكة)، تصبح الجلسة offline بعد انتهاء المهلة.
          استخدم تحديث <strong>Live</strong> في جدول Sessions.
        </p>
      </div>
    </div>
    <div class="step-item active">
      <div class="step-number">4</div>
      <div class="step-content">
        <h3>Disconnect / Cleanup</h3>
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
      <tr><td>License → تبويب <strong>Device Binding</strong></td><td>Node-Locked فقط</td><td>ربط الأجهزة، approve/reject، السجل، محاولات الوصول غير المصرّح بها</td></tr>
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
      <tr><td><strong>Activated</strong></td><td>الطابع الزمني لأول ربط ناجح لهذا الجهاز</td></tr>
      <tr><td><strong>Status</strong></td><td><strong>Active</strong> — يمكنه التحقق؛ <strong>Blocked</strong> — مرفوض في الفحص التالي؛ inactive — مُلغى التفعيل</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-activations-global-list.png" data-doc-image-alt="صفحة Activations العامة مع أعمدة الجهاز والمستخدم وIP والحالة" aria-label="عرض لقطة Activations العامة بالحجم الكامل">
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
      <tr><td><strong>Connected</strong></td><td>متى بدأت الجلسة (وقت نسبي + المدة)</td></tr>
      <tr><td><strong>Heartbeat</strong></td><td>آخر ping من SDK — يثبت أن التطبيق ما زال مفتوحاً</td></tr>
    </tbody>
  </table>
  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-sessions-global-list.png" data-doc-image-alt="Active Sessions العامة مع عمود Heartbeat" aria-label="عرض لقطة Sessions العامة بالحجم الكامل">
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
      <tr><td><strong>Activations list</strong></td><td>أجهزة متعددة ممكنة (<code>n / ∞</code>)</td><td>عادةً واحد (<code>1 / 1</code>)</td></tr>
      <tr><td><strong>Sessions</strong></td><td>واحدة أو أكثر أثناء تشغيل التطبيقات</td><td>عادةً جلسة واحدة على الجهاز المربوط</td></tr>
      <tr><td><strong>Device Binding tab</strong></td><td>لا يُعرض</td><td>Hardware ID وapprove/reject والسجل</td></tr>
      <tr><td><strong>Revoke device</strong></td><td>حظر activation → فشل التحقق التالي</td><td>نفس الشيء + الأجهزة تبقى مربوطة حتى unbind</td></tr>
    </tbody>
  </table>

  <div class="help-callout info">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">الإلغاء</span>
      <p>
        احظر activation أو افصل session من لوحة التحكم. يستقبل SDK الرفض في التحقق أو heartbeat أو فحص الحالة التالي.
        Perpetual online يمكنه إلغاء جهاز laptop واحد دون التأثير على الآخرين؛
        Node-Locked يؤثر على الجهاز المربوط الوحيد فقط.
      </p>
    </div>
  </div>

  <h2>انظر أيضاً</h2>
  <div class="integration-grid">
    <a href="/perpetual-license" class="integration-card"><i class="ki-outline ki-key"></i><h4>Perpetual</h4><p>سير العمل الكامل</p></a>
    <a href="/node-locked-license" class="integration-card"><i class="ki-outline ki-lock"></i><h4>Node-locked</h4><p>سير عمل الربط</p></a>
    <a href="/api/licenses" class="integration-card"><i class="ki-outline ki-data"></i><h4>Licenses API</h4><p>نقطة validate</p></a>
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

console.log('Done');
