import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';

export const SDK_TOPICS_AR: Record<string, DocTopic> = {
  overview: {
    title: 'نظرة عامة على .NET SDK',
    lead: 'تخطيط حزمة NuGet، مسؤوليات وقت التشغيل، وروابط للتعمق.',
    body: `
      <p>تتحقق مكتبة <code>LicenPro.SDK</code> من التراخيص الموقّعة دون اتصال باستخدام <strong>المفتاح العام</strong> لمنتجك، وقد تتواصل اختيارياً مع <code>${HOST}/api</code> للتحقق عبر الإنترنت، والتفعيلات، والجلسات، واستخدام الميزات، والتحديثات.</p>
      <h2>المجالات الرئيسية (المصدر: <code>LicenPro.SDK.lib</code>)</h2>
      <ul>
        <li><strong>Core</strong> — <code>LicenseClient</code>، <code>LicenseBuilder</code>، تسلسل حمولات الترخيص.</li>
        <li><strong>Managers</strong> — <code>ActivationManager</code>، <code>SessionManager</code>، <code>OfflineCacheManager</code>، <code>LicenseTransferManager</code>، <code>TrialExtensionManager</code>، <code>GracePeriodManager</code>، <code>NodeLockedDeviceManager</code>.</li>
        <li><strong>Features</strong> — <code>FeatureManager</code>، <code>FeatureUsageTracker</code>، <code>UpdateChecker</code>.</li>
        <li><strong>Updates</strong> — <code>SdkUpdateManager</code> يستدعي ${L('/api/sdk-host', 'واجهات HTTP المضيف لـ SDK')}.</li>
        <li><strong>AppHosting</strong> — <code>SdkBootstrap</code>، مساعدات UX لانتهاء الصلاحية لأغلفة سطح المكتب.</li>
      </ul>
      <p>تابع مع ${L('/sdk/configuration', 'الإعداد')} → ${L('/sdk/license-client', 'LicenseClient')} → ${L('/sdk/dotnet', 'مثال تكامل .NET')}.</p>
    `,
  },
  configuration: {
    title: 'الإعداد والتهيئة',
    lead: 'SdkConfiguration، إعدادات JSON، وخطافات بدء التشغيل.',
    body: `
      <p>يجب أن ينتهي <code>ServerBaseEndpoint</code> بـ <code>/api</code> (الافتراضي السحابي: <code>${HOST}/api</code>). استدعِ <code>SdkConfiguration.Initialize</code> أو اعتمد على اكتشاف <code>licenpro.settings.json</code> / <code>appsettings.json</code> (راجع ${L('/quick-start', 'البدء السريع')}).</p>
      <p>يجب على مضيفات سطح المكتب استدعاء <code>SdkBootstrap.OnApplicationStartup()</code> مرة واحدة قبل حلقة رسائل واجهة المستخدم حتى تُطبَّق التحديثات المعلّقة وافتراضيات المظهر بشكل متسق.</p>
      <p>${L('/sdk/dotnet', 'صفحة تكامل .NET')} · ${L('/api/licenses', 'عقد HTTP للتحقق')}</p>
    `,
  },
  'license-client': {
    title: 'دورة حياة LicenseClient',
    lead: 'التحقق، التخزين المؤقت، التحقق التلقائي، وأسطح الأخطاء.',
    body: `
      <p><code>LicenseClient</code> هو API الأساسي: مسارات إلى <code>license.bin</code>، مواد المفتاح العام، مفتاح الترخيص، نوع الترخيص المتوقع اختيارياً، معرّف المنتج لفحوصات التحديث، وضبط تحذيرات انتهاء الصلاحية.</p>
      <p>بعد تحقق ناجح عبر الإنترنت، استدعِ <code>TryAutoValidateAsync</code> (أو المكافئ الموثّق لإصدارك) حتى تبقى الذاكرة المؤقتة دون اتصال المشفّرة دافئة لسيناريوهات العزل.</p>
      <p>يصل التحقق عبر الإنترنت إلى <code>POST /api/Licenses/validate</code> بـ <code>X-API-KEY</code> للمنتج — راجع ${L('/api/licenses', 'Licenses REST')} و${L('/sdk/dotnet', 'مقالة .NET الكاملة')}.</p>
    `,
  },
  'activation-session': {
    title: 'التفعيل والجلسات في SDK',
    lead: 'المديرون الذين يتواصلون مع Activations و Sessions APIs.',
    body: `
      <p>ينسّق <code>ActivationManager</code> ربط الجهاز واستهلاك المقاعد مقابل ${L('/api/activations-sessions', 'مسارات التفعيل')} على <code>${HOST}/api</code>.</p>
      <p>يحافظ <code>SessionManager</code> على فترات نبض القلب مقابل ${L('/api/activations-sessions', 'مسارات الجلسات')} عندما تتطلب سياسة الترخيص إنفاذ التزامن أو الإنترنت.</p>
      <p>${L('/sessions-activations', 'السرد في لوحة التحكم')} · ${L('/guides/platform/activations', 'دليل منصة التفعيلات')}</p>
    `,
  },
  'features-usage': {
    title: 'الميزات وتتبع الاستخدام',
    lead: 'FeatureManager والقياسات الاختيارية.',
    body: `
      <p>يقيّم <code>FeatureManager</code> الصلاحيات المُ deserialized من الترخيص الموقّع. يمكن لـ <code>FeatureUsageTracker</code> إرسال POST لعدادات الاستخدام إلى نقاط نهاية القياسات عندما يُفعّل تكاملك التحليلات.</p>
      <p>تُؤلَّف تعريفات الميزات في لوحة التحكم وتُعرض عبر REST (مسارات الفهرس على <code>${HOST}/api</code>) — راجع ${L('/api/catalog', 'موضوع Catalog API')}.</p>
    `,
  },
  'offline-grace': {
    title: 'الذاكرة المؤقتة دون اتصال وفترات السماح',
    lead: 'المرونة عندما يكون API غير قابل للوصول.',
    body: `
      <p>يخزّن <code>OfflineCacheManager</code> آخر نتيجة تحقق صالحة معروفة وحملة الترخيص بأمان على القرص.</p>
      <p>يطبّق <code>GracePeriodManager</code> سياستك لمدة تشغيل التطبيق دون الوصول إلى <code>${HOST}/api</code> قبل الإيقاف الصارم أو تخفيض الميزات.</p>
      <p>اربط مع قسم وضع عدم الاتصال في ${L('/sdk/dotnet', 'دليل .NET SDK')}.</p>
    `,
  },
  'updates-logging': {
    title: 'التحديثات والتسجيل',
    lead: 'SdkUpdateManager وتطبيقات ILicenseLogger.',
    body: `
      <p>يستدعي <code>SdkUpdateManager</code> <code>/api/Updates/...</code> بمعرّف الإصدار الحالي وسياق الترخيص حتى تُعرض البنيات المؤهلة فقط.</p>
      <p>نفّذ <code>ILicenseLogger</code> للسجلات المنظّمة — ملف، HTTP إلى <code>/api/SdkLogs/...</code>، أو sinks مركّبة — حسب احتياجات الامتثال.</p>
      <p>${L('/api/sdk-host', 'واجهات API المضيف لـ SDK')} · ${L('/api/telemetry', 'موضوع القياسات')}</p>
    `,
  },
};

export function getSdkTopicAr(slug: string): DocTopic | null {
  return SDK_TOPICS_AR[slug] ?? null;
}
