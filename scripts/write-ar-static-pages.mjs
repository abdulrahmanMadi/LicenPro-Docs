import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const arDir = path.join(__dirname, '../src/app/docs/content/static-pages/ar');

function write(name, html) {
  const filePath = path.join(arDir, `${name}.ts`);
  fs.writeFileSync(filePath, `export const HTML = ${JSON.stringify(html)} as const;\n`, 'utf8');
  console.log('Wrote', name);
}

// Batch 1: first-organization, first-product, first-license, rsa-keys
write('first-organization', `<header class="help-page-header">
    <h1>إنشاء مؤسستك الأولى</h1>
    <p class="lead">
      <strong>المؤسسة</strong> هي المستأجر (tenant) الخاص بك في LicenPro — مساحة العمل التي يتعاون فيها أعضاء الفريق،
      وتُربَط بها المنتجات، وتظل التراخيص ضمن نطاق شركتك. يرشدك هذا الدليل إلى تسجيل الدخول،
      وإنشاء مؤسسة في لوحة التحكم، ودعوة الأعضاء، وفتح مساحة العمل التي تستخدمها قبل
      إنشاء أي منتج.
    </p>
  </header>

  <div class="help-callout info">
    <i class="ki-outline ki-time"></i>
    <div>
      <span class="callout-title">الوقت المقدّر: 5–10 دقائق</span>
      <p>تسجيل الحساب (إن لزم)، ومعالج إنشاء المؤسسة، وجولة سريعة في مركز المؤسسة.</p>
    </div>
  </div>

  <h2>ما هي المؤسسة</h2>
  <p>
    كل ما تقوم به كمشغّل بائع يكون ضمن نطاق مؤسسة: <strong>الأعضاء والأدوار</strong>،
    <strong>تعيينات المنتجات</strong>، ومرئية التدقيق، وسياق الفوترة (حيث ينطبق).
    <strong>المنتج</strong> هو ما ترخّصه؛ <strong>المؤسسة</strong> هي من يملكه ويديره.
    يمكنك الانتماء إلى عدة مؤسسات (مثلاً شركتك بالإضافة إلى بيئة sandbox لعميل) والتبديل بينها في لوحة التحكم.
  </p>

  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-people"></i>
      <h4>الفريق والأدوار</h4>
      <p>المالكون والمسؤولون والأعضاء والمشاهدون مع وصول على مستوى المنتج.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-mouse-square"></i>
      <h4>نطاق المنتج</h4>
      <p>منتجات مرتبطة بالمؤسسة؛ تراخيص صادرة تحت تلك المنتجات.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>التدقيق والإعدادات</h4>
      <p>الدعوات والإعدادات الافتراضية وسجلات النشاط على مستوى المستأجر.</p>
    </div>
  </div>

  <h2 style="margin-top: 3rem;">قبل الإنشاء</h2>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>هل تمت دعوتك مسبقاً؟</strong> اقبل دعوة البريد الإلكتروني أو افتح الدعوة المعلّقة في لوحة التحكم — لا تنشئ مؤسسة مكررة إلا إذا كنت تحتاج عمداً إلى مستأجر منفصل.</li>
    <li><strong>بائع جديد؟</strong> سجّل في <a href="https://app.licenpro.tech" target="_blank" rel="noopener noreferrer">app.licenpro.tech</a>، ثم أنشئ مؤسستك الأولى أدناه.</li>
    <li><strong>حدود الخطة</strong> — عدد المؤسسات التي يمكنك إنشاؤها يعتمد على اشتراكك؛ إذا كان زر <strong>Create Institution</strong> مخفياً، قم بالترقية أو استخدم مستأجراً موجوداً.</li>
  </ul>

  <h2>خطوة بخطوة: Create Institution</h2>
  <p>
    افتح <strong>Institutions</strong> في الشريط الجانبي للوحة التحكم (<code>/dashboard/organizations</code>) وانقر
    <strong>Create Institution</strong>. يحتوي المعالج المنبثق على خطوتين — <strong>Identity</strong> و<strong>Branding</strong> — ثم
    <strong>Establish Institution</strong> لحفظ المستأجر.
  </p>

  <figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-create-organization.png" data-doc-image-alt="Create Institution الخطوة 1 Identity: اسم المؤسسة والموقع ودور الدخول الافتراضي" aria-label="عرض لقطة Create Institution بالحجم الكامل">
      <img src="assets/docs/platform-create-organization.png" alt="Create Institution الخطوة 1 Identity: اسم المؤسسة والموقع ودور الدخول الافتراضي" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>

  <div class="doc-stepper">
    <div class="step-item active">
      <div class="step-number">1</div>
      <div class="step-content">
        <h3>تسجيل الدخول إلى لوحة التحكم</h3>
        <p>
          استخدم <a href="https://app.licenpro.tech" target="_blank" rel="noopener noreferrer">app.licenpro.tech</a>
          بالبريد/كلمة المرور أو موفر الهوية المُعدّ. بعد تسجيل الدخول تصل إلى الصفحة الرئيسية للوحة؛
          افتح <strong>Institutions</strong> من القائمة اليسرى.
        </p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">2</div>
      <div class="step-content">
        <h3>الخطوة 1 — Identity</h3>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Institution name</strong> (مطلوب) — الاسم العلني لشركتك أو فريقك (مثلاً <em>Roland Corp Digital</em>).</li>
          <li><strong>Official website</strong> (اختياري) — عنوان URL لشركتك؛ يُعرض في ملف المؤسسة.</li>
          <li><strong>Default entry role</strong> — يُطبَّق عند انضمام شخص دون دور في الدعوة:
            <ul style="margin: 0.5rem 0; padding-left: 1.25rem;">
              <li><strong>Member</strong> — وصول مشغّل قياسي للمنتجات المعيّنة.</li>
              <li><strong>Viewer</strong> — قراءة فقط؛ لا يمكنه تغيير التراخيص أو الإعدادات.</li>
              <li><strong>Admin</strong> — إدارة كاملة للمؤسسة باستثناء إجراءات المالك فقط.</li>
            </ul>
          </li>
        </ul>
        <p>انقر <strong>Next</strong> عندما تكون الحقول المطلوبة صالحة.</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">3</div>
      <div class="step-content">
        <h3>الخطوة 2 — Branding</h3>
        <ul style="margin: 0.75rem 0; padding-left: 1.25rem;">
          <li><strong>Institution logo</strong> (اختياري) — JPEG أو PNG أو GIF أو WebP؛ يظهر في بطل نظرة عامة المؤسسة.</li>
          <li><strong>Institution description</strong> (اختياري) — ملخص نصي غني عن فريقك أو مهمتك؛ يُعرض في تبويب النظرة العامة.</li>
        </ul>
        <p>انقر <strong>Establish Institution</strong>. تصبح <strong>Owner</strong> للمستأجر الجديد.</p>
      </div>
    </div>

    <div class="step-item active">
      <div class="step-number">4</div>
      <div class="step-content">
        <h3>فتح مساحة عمل المؤسسة</h3>
        <p>
          من قائمة المؤسسات، افتح المستأجر. عنوان URL هو
          <code>/dashboard/organization/:orgId</code> مع التبويبات أدناه. تعرض صفحة <strong>Overview</strong> الشعار،
          والوصف، وعدد الأعضاء والمنتجات، والروابط السريعة.
        </p>
      </div>
    </div>
  </div>

  <h2>تبويبات مساحة عمل المؤسسة</h2>
  <div class="integration-grid">
    <div class="integration-card">
      <i class="ki-outline ki-element-11"></i>
      <h4>Overview</h4>
      <p>الملف الشخصي ومعاينة الفريق والإحصائيات والتنقل السريع.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-people"></i>
      <h4>Members</h4>
      <p>الأعضاء النشطون والأدوار والحالة ووصول المنتج.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-sms"></i>
      <h4>Invitations</h4>
      <p>دعوات البريد وإعادة الإرسال والإلغاء والدور في الدعوة.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-mouse-square"></i>
      <h4>Products</h4>
      <p>المنتجات المعيّنة لهذه المؤسسة.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-setting-2"></i>
      <h4>Settings</h4>
      <p>دور العضو الافتراضي وقواعد الدعوة وتحديثات العلامة التجارية.</p>
    </div>
    <div class="integration-card">
      <i class="ki-outline ki-notepad"></i>
      <h4>Audit logs</h4>
      <p>إجراءات المشغّلين المسجّلة للامتثال والدعم.</p>
    </div>
  </div>

  <h2 style="margin-top: 3rem;">الأدوار في لمحة</h2>
  <p>تتحكم الأدوار فيما يمكن للمشغّلين فعله داخل المؤسسة وعلى المنتجات المعيّنة:</p>
  <ul style="margin: 0.5rem 0 1rem 1.25rem;">
    <li><strong>Owner</strong> — تحكم كامل؛ يُعيَّن للمنشئ؛ يمكنه نقل الملكية وحذف المؤسسة.</li>
    <li><strong>Admin</strong> — إدارة الأعضاء والدعوات والمنتجات ومعظم الإعدادات.</li>
    <li><strong>ProductOwner</strong> — يركّز على عمليات نطاق المنتج حيث يعيّن نشرك ذلك الدور.</li>
    <li><strong>Member</strong> — عمل التراخيص والمنتجات اليومي على المنتجات المعيّنة.</li>
    <li><strong>Viewer</strong> — قراءة لوحات المعلومات والسجلات دون تعديل البيانات.</li>
  </ul>
  <p>
    عند دعوة شخص، اختر دوراً في الدعوة أو اعتمد على <strong>default entry role</strong> الذي حددته أثناء الإنشاء.
    مرجع أعمق: دليل المنصة <a href="/guides/platform/organizations" class="doc-inline-link">Institutions</a>.
  </p>

  <h2>دعوة فريقك (اختياري)</h2>
  <p>
    في <strong>Members</strong> أو <strong>Invitations</strong>، أرسل دعوات بريد إلكتروني بدور صريح.
    تظهر الدعوات المعلّقة حتى تُقبل أو تنتهي صلاحيتها. ألغِ الدعوات التي لا ينبغي استخدامها.
    قبول الدعوة يضيف المستخدم إلى المؤسسة بالدور المختار وقواعد وصول المنتج التي يُعدّها المسؤولون.
  </p>

  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">حذف مؤسسة</span>
      <p>
        إنهاء مؤسسة لا رجعة فيه: تُزال المنتجات والأعضاء والدعوات والبيانات التاريخية لذلك المستأجر.
        استخدم مؤسسة sandbox منفصلة للتجارب إذا لم تكن متأكداً.
      </p>
    </div>
  </div>

  <h2>REST API والأتمتة</h2>
  <p>
    يمكن لاستدعاءات JWT للمشغّل إدارة المؤسسات عبر <code>/api/organizations</code> ومسارات العضوية ذات الصلة
    (إنشاء مستأجر، سرد الأعضاء، دعوة، قبول الدعوة). راجع
    <a href="/api/organizations" class="doc-inline-link">Institutions API</a> و<a href="/api/auth-users" class="doc-inline-link">Auth &amp; users</a>.
  </p>

  <h2 style="margin-top: 4rem;">ما التالي؟</h2>
  <div class="integration-grid">
    <a href="/first-product" class="integration-card">
      <i class="ki-outline ki-abstract-26"></i>
      <h4>First product</h4>
      <p>إنشاء منتج وإصدار أولي.</p>
    </a>
    <a href="/quick-start" class="integration-card">
      <i class="ki-outline ki-flag"></i>
      <h4>Quick start</h4>
      <p>حلقة البائع الكاملة عبر SDK.</p>
    </a>
    <a href="/guides/platform/organizations" class="integration-card">
      <i class="ki-outline ki-briefcase"></i>
      <h4>Institutions guide</h4>
      <p>مرجع المنصة للمستأجرين.</p>
    </a>
  </div>`);

console.log('Batch 1 partial - run full script for all files');
