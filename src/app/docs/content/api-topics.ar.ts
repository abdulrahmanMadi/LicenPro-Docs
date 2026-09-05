import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';
const API_BASE = `${HOST}/api`;

export const API_TOPICS_AR: Record<string, DocTopic> = {
  'auth-users': {
    title: 'المصادقة والمستخدمون',
    lead: 'JWT لمشغلي لوحة التحكم؛ واجهات API لإدارة المستخدمين والأدوار.',
    body: `
      <p>عنوان URL الأساسي للأمثلة: <code>${API_BASE}</code>. استخدم مضيف النشر الخاص بك عند التكامل؛ بادئات المسارات أدناه تطابق السحابة المستضافة ما لم يخصّص تثبيتك التوجيه.</p>
      <h2>نموذج المصادقة</h2>
      <p>تستخدم لوحة التحكم وأتمتة البائع <strong>Bearer JWT</strong> من مسارات تحت <code>/api/Auth/...</code> (تسجيل الدخول، التحديث، التسجيل، مزودو الهوية الخارجيون حيث يُفعّلون). أرفق <code>Authorization: Bearer &lt;token&gt;</code> بمسارات الإدارة ما لم يكن المسار مجهول الهوية صراحةً.</p>
      <h2>مجموعات المسارات</h2>
      <ul>
        <li><strong>المصادقة</strong> — <code>/api/Auth/...</code> لتسجيل الدخول، وتحديث الرموز، وتدفقات كلمة المرور، وخطافات الهوية الخارجية حيث تُفعّل.</li>
        <li><strong>المستخدمون والأدوار</strong> — <code>/api/Users/...</code> ومسارات الهوية ذات الصلة للملفات الشخصية، والدعوات، وعضوية المنتج، والتفضيلات، وتعيين الأدوار.</li>
      </ul>
      <p>يستخدم التحقق المجهول للعملاء <strong>مفتاح product API key</strong> على <code>/api/Licenses/...</code> — وليس JWT المستخدم. راجع ${L('/api/overview', 'نظرة عامة على API')} و${L('/api/licenses', 'API التراخيص')}.</p>
    `,
  },
  security: {
    title: 'أدوات الأمان',
    lead: 'اشتقاق المفاتيح، وإدراج الجلسات، ومساعدات التقوية.',
    body: `
      <p>البادئة: <code>/api/security</code>. تتطلب معظم الإجراءات سياق لوحة تحكم أو خدمة مصادق عليهما ما لم يُذكر مسار محدد في هذه الصفحة كمجهول الهوية.</p>
      <ul>
        <li><code>POST /api/security/derive-key</code> — الجسم: <code>licenseKey</code>، <code>saltBase64</code>؛ يُرجع مواد المفتاح المشتقة لتدفقات الملفات المحمية.</li>
        <li>تعيش مساعدات اكتشاف الجلسات وإلغائها للمشغلين إلى جانب مسارات الأمان الأخرى تحت نفس البادئة (المسارات الدقيقة تعتمد على بنيتك).</li>
      </ul>
      <p>أكّد أشكال الطلب والاستجابة باستدعاء اختبار ضد نشرك قبل تثبيت DTOs العميل.</p>
    `,
  },
  organizations: {
    title: 'API المؤسسات',
    lead: 'بيانات المستأجر، والعضوية، والدعوات.',
    body: `
      <p>تغطي المسارات تحت <code>/api/Organization/...</code> (قد يطابق حالة الأحرف مضيفك) بيانات المستأجر، والعضوية، والدعوات، والقوائم المحددة نطاق المستأجر المتوافقة مع مساحة عمل المؤسسة في لوحة التحكم.</p>
      <h2>تسلسل التكامل النموذجي</h2>
      <ol style="margin-left:1.25rem;">
        <li>المصادقة كمشغل بائع (JWT).</li>
        <li>إدراج المؤسسات أو جلب مستأجر بالمعرّف.</li>
        <li>إنشاء أو إلغاء الدعوات؛ تدفقات القبول كما هو موثّق لبيئتك.</li>
        <li>ربط المنتجات باستخدام مسارات <code>/api/Products/...</code> المحددة نطاق ذلك المستأجر.</li>
      </ol>
      <p>${L('/guides/platform/organizations', 'دليل منصة المؤسسات')}</p>
    `,
  },
  catalog: {
    title: 'المنتجات والإصدارات والميزات والصلاحيات',
    lead: 'كل ما تعرّفه قبل إصدار ترخيص.',
    body: `
      <h2>المنتجات ومفاتيح RSA</h2>
      <p>البادئة <code>/api/Products</code>. العمليات الشائعة:</p>
      <ul>
        <li><code>POST /api/Products/{id}/keys/generate</code> — إنشاء مواد المفتاح للتوقيع.</li>
        <li><code>GET /api/Products/{id}/keys/status</code> — جاهزية المفاتيح.</li>
        <li><code>GET /api/Products/{id}/keys/public</code> و<code>.../public/download</code> — توزيع المفتاح العام على عملاء SDK.</li>
      </ul>
      <h2>الإصدارات والصلاحيات</h2>
      <p><strong>إصدارات البرمجيات</strong> — خطوط الإصدار والبيانات الوصفية (مسارات REST مجمّعة مع تدفق تأليف المنتج/الإصدار).</p>
      <p><strong>مجموعات الصلاحيات</strong> — تجميع الميزات للتعيين على التراخيص.</p>
      <p><strong>الميزات</strong> — تعريفات الميزات و CRUD الإداري.</p>
      <p>${L('/guides/platform/products', 'دليل المنتجات')} · ${L('/rsa-keys', 'RSA keys')} · ${L('/guides/platform/features-entitlements', 'الميزات والصلاحيات')}</p>
    `,
  },
  licenses: {
    title: 'API التراخيص',
    lead: 'CRUD للمشغل بالإضافة إلى التحقق المجهول بـ X-API-KEY.',
    body: `
      <div class="help-callout info"><i class="ki-outline ki-key"></i><div>
        <span class="callout-title">مفتاح product API key</span>
        <p>يُستخدم في <code>POST /api/Licenses/validate</code>. أرسل <code>X-API-KEY: &lt;product key&gt;</code> (أو <code>Authorization: X-API-KEY &lt;key&gt;</code> القديم). لا تشحن أبداً مفتاح التوقيع الخاص إلى العملاء.</p>
      </div></div>
      <p>البادئة <code>/api/Licenses</code>. مثال مستضاف: <code>${HOST}/api/Licenses/validate</code>.</p>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses</code></div>
      <p>قائمة مقسّمة صفحات. الاستعلام: <code>pageNumber</code>، <code>pageSize</code>، <code>search</code>، <code>status</code>، <code>type</code>.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}</code></div>
      <p>ترخيص واحد بـ GUID.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses</code></div>
      <p>إنشاء ترخيص. الجسم: <code>CreateLicenseDto</code> — مطلوب <code>name</code>، <code>type</code> (Perpetual, Trial, Subscription, NodeLocked, Floating, Concurrent)، <code>issuedTo</code>، <code>softwareReleaseId</code>؛ اختياري: انتهاء الصلاحية، المقاعد، الأجهزة، معرّفات مجموعة الصلاحيات، ملاحظات.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/validate</code></div>
      <p><strong>AllowAnonymous</strong> + <strong>X-API-KEY</strong>. <code>multipart/form-data</code>: <code>licenseKey</code>، <code>validationParams</code> (سلسلة JSON)، <code>licenseFile</code> اختياري.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/validate/{licenseKey}</code></div>
      <p>تحقق بسيط؛ استعلام <code>hardwareId</code> اختياري.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/status/{licenseKey}</code></div>
      <p>حمولة الحالة لاستطلاع SDK.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/refresh/{licenseKey}</code></div>
      <p>تحديث مواد الترخيص (<code>RefreshLicenseDto</code> اختياري).</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{licenseKey}/activations</code></div>
      <p>لقطة تفعيل مجهولة الهوية.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}/download</code></div>
      <p>تنزيل مصرّح به لبايتات ملف الترخيص.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/generate-file</code></div>
      <p>إعادة توليد ملف الترخيص.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/revoke</code></div>
      <p>إلغاء الترخيص.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}/access-attempts</code></div>
      <p>كشف مشاركة Node-locked. يسرد الأجهزة المرفوضة لأن الترخيص مربوط في مكان آخر، مع معرّفات الأجهزة المحاولة والمربوطة، و IP، ونقطة الدخول وعدد المحاولات، بالإضافة إلى الإجماليات الملخّصة. مالك المنتج أو Admin فقط — هذا هو المسار الوحيد الذي يُرجع تفاصيل الجهاز والشبكة غير المقنّعة.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/access-attempts/{attemptId}/acknowledge</code></div>
      <p>وضع علامة على محاولة واحدة كمراجعَة. يُرجع الملخص المحدّث. مالك المنتج أو Admin فقط.</p></div>
      <p>تغطي مسارات إضافية ربط الأجهزة، والتحويلات، والربط المعلّق؛ استكشف الاستجابات من مضيفك تحت نفس البادئة.</p>
      <p>${L('/guides/platform/licenses', 'دليل تراخيص البائع')} · ${L('/sdk/license-client', 'SDK LicenseClient')}</p>
    `,
  },
  'activations-sessions': {
    title: 'التفعيلات والجلسات',
    lead: 'الإنفاذ وقت التشغيل والقياسات عند حدود API.',
    body: `
      <p>تدير مسارات <strong>Activations</strong> ربط الأجهزة، واستهلاك المقاعد، وسجل التفعيل. تدير مسارات <strong>Sessions</strong> الجلسات الحية: الإنشاء، نبض القلب، الإنهاء — مهمة لنماذج Floating والتحقق عبر الإنترنت.</p>
      <h2>متى تستخدم أيهما</h2>
      <ul>
        <li><strong>Activations</strong> — مطالبة دائمة بأن جهازاً أو هوية تستخدم الترخيص.</li>
        <li><strong>Sessions</strong> — نبض قلب قصير الأمد عبر الإنترنت؛ مثالي لحدود التزامن ولوحات التحكم الحية.</li>
      </ul>
      <h2>المصادقة</h2>
      <p>تستخدم لوحات المشغل JWT. يستخدم SDK والتدفقات المجهولة مفتاح product API key فقط حيث يسمح كل مسار بذلك.</p>
      <p>${L('/guides/platform/activations', 'دليل التفعيلات')} · ${L('/guides/platform/sessions', 'دليل الجلسات')} · ${L('/sessions-activations', 'السرد المدمج')} · ${L('/sdk/activation-session', 'مديرو SDK')}</p>
    `,
  },
  'trials-transfers': {
    title: 'النسخ التجريبية والتحويلات',
    lead: 'تمديدات التقييم وتدفقات نقل الترخيص.',
    body: `
      <p><strong>Trials</strong> — تدعم المسارات تحت سطح النسخ التجريبية لمضيفك الحملات، والتمديدات، ونوافذ التقييم المتوافقة مع صفحات <strong>Trials</strong> في لوحة التحكم.</p>
      <p><strong>Transfers</strong> — نقل الصلاحيات بين الهويات، أو الأجهزة، أو المؤسسات وفق قواعد عملك؛ أكّد المتطلبات المسبقة والآثار الجانبية باستدعاءات اختبار على نشرك.</p>
      <p>${L('/guides/platform/trials', 'دليل منصة النسخ التجريبية')} · ${L('/trial-license', 'نموذج الترخيص التجريبي')}</p>
    `,
  },
  telemetry: {
    title: 'القياسات والسجلات والإشعارات',
    lead: 'التحليلات، الإحصائيات، مسارات التدقيق، سجلات SDK، والإشعارات داخل التطبيق.',
    body: `
      <ul>
        <li><code>/api/Analytics/...</code> — تجميعات التبنّي والاستخدام للمخططات.</li>
        <li><code>/api/Statistics/...</code> — مقاييس وتجميعات إضافية.</li>
        <li><code>/api/AuditLogs/...</code> — مسار تدقيق ذو صلة أمنية للإجراءات الحساسة.</li>
        <li><code>/api/DashboardLogs/...</code> — تشخيصات أحداث المشغل وواجهة المستخدم.</li>
        <li><code>/api/SdkLogs/...</code> — شحن سجلات اختياري من SDKs الميدانية.</li>
        <li><code>/api/Notifications/...</code> — موجز إشعارات داخل التطبيق لمستخدمي لوحة التحكم.</li>
      </ul>
      <p>تتطلب معظم هذه المسارات JWT مع أدوار التحليلات أو المسؤول حسب العملية.</p>
      <p>${L('/guides/platform/analytics', 'دليل التحليلات')}</p>
    `,
  },
  storage: {
    title: 'واجهات API التخزين',
    lead: 'موصلات لقطع الإصدارات.',
    body: `
      <p>ثلاثة أسطح متوازية لخلفيات مختلفة:</p>
      <ul>
        <li><code>/api/Storage/...</code> — تدفقات مدعومة بـ Google Drive (كما هو مُعد).</li>
        <li><code>/api/OneDriveStorage/...</code> — تكامل Microsoft Graph / OneDrive.</li>
        <li><code>/api/CustomServerStorage/...</code> — نقطة تخزين SFTP/HTTP خاصة بك.</li>
      </ul>
      <p>ينفّذ كل منها دلالات list/upload/delete المناسبة للمزود؛ تُتحقق أسماء الملفات وأنواع MIME من جانب الخادم.</p>
      <p>${L('/guides/platform/storage', 'دليل منصة التخزين')}</p>
    `,
  },
  'sdk-host': {
    title: 'واجهات API المضيف لـ SDK',
    lead: 'الإعدادات وفحوصات التحديث المستهلكة من تطبيقات العملاء.',
    body: `
      <p><code>/api/SdkSettings/...</code> — إعداد SDK محدد نطاق المنتج (أعلام الميزات، نقاط النهاية، الضبط) المُسلّم للعملاء المرخّصين.</p>
      <p><code>/api/Updates/...</code> — بيانات الإصدار والتحديث المستهلكة بواسطة <code>SdkUpdateManager</code> للتحديثات الواعية بالترخيص.</p>
      <p>تستدعي تطبيقات العملاء هذه بمفتاح product API key أو أنماط مجهولة الهوية حيث يسمح كل مسار — وليس JWT البائع.</p>
      <p>${L('/sdk/updates-logging', 'تحديثات SDK والتسجيل')} · ${L('/sdk/dotnet', 'تكامل .NET')}</p>
    `,
  },
  billing: {
    title: 'الاشتراكات والمدفوعات',
    lead: 'أسطح التجارة لفوترة SaaS (مقيّدة بالدور).',
    body: `
      <p><code>/api/Subscriptions/...</code> — دورة حياة الاشتراك، الصلاحيات المرتبطة بالفوترة.</p>
      <p><code>/api/Payments/...</code> — نوايا الدفع، الإيصالات، وwebhooks المزود (كما هو منفّذ لنشرك).</p>
      <p>تتطلب العديد من الإجراءات أدوار مستأجر مرتفعة؛ قد تكون بعضها للمضيف فقط في نشرات multi-tenant. عامل كل عملية على أنها <strong>مقيّدة بالخطة والدور</strong> حتى تتحقق من الوصول في بيئتك.</p>
    `,
  },
  admin: {
    title: 'الإدارة والمهام',
    lead: 'المهام الخلفية، إعدادات المنصة، البريد، التذاكر.',
    body: `
      <ul>
        <li><code>/api/Admin/...</code> — صيانة مرتفعة (نطاق المستأجر أو المضيف).</li>
        <li><code>/api/Jobs/...</code> — رؤية للعمل المجدول/غير المتزامن (الاستيراد، التجميعات، دفعات البريد).</li>
        <li><code>/api/Settings/...</code> — مفاتيح إعداد النظام أو المستأجر.</li>
        <li><code>/api/Email/...</code> — تشخيصات ومحفّزات القوالب حيث تُعرض.</li>
        <li><code>/api/Tickets/...</code> — تكامل تذاكر الدعم لتدفقات مكتب مساعدة البائع.</li>
      </ul>
      <p>هذه المناطق هي الأكثر حساسية للدور؛ تكامل فقط بعد ربط RBAC لمستأجرك بالسياسات المفروضة على كل مسار.</p>
    `,
  },
};

export function getApiTopicAr(slug: string): DocTopic | null {
  return API_TOPICS_AR[slug] ?? null;
}
