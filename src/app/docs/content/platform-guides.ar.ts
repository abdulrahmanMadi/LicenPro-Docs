import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  `<a class="doc-inline-link" href="${path}">${label}</a>`;

/** Dashboard screenshot with lightbox (full-resolution asset, no compression). */
const screenshot = (file: string, alt: string) =>
  `<figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/${file}" data-doc-image-alt="${alt}" aria-label="عرض لقطة الشاشة بالحجم الكامل">
      <img src="assets/docs/${file}" alt="${alt}" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
  </figure>`;

const HOST = 'https://licenpro.runasp.net';

export const PLATFORM_GUIDES_AR: Record<string, DocTopic> = {
  overview: {
    title: "نظرة عامة على النظام",
    lead: "كيف يتكامل لوحة تحكم LicenPro وREST API المستضاف وSDKs العميل — من إعداد المنتج الأول حتى التحقق وقت التشغيل في تطبيقك المنشور. SDK ‎.NET موثّق اليوم؛ SDKs بلغات إضافية (مع أمثلة لكل مكدس) في خارطة الطريق.",
    body: `
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/overview1.png" data-doc-image-alt="سير عمل LicenPro: لوحة التحكم لإعداد البائع، REST API للعمليات وقت التشغيل، وSDKs العميل في تطبيقات العملاء (SDKs متعددة اللغات وأمثلة مخططة)" aria-label="عرض مخطط سير العمل بالحجم الكامل">
          <img src="assets/docs/overview1.png" alt="سير عمل LicenPro: لوحة التحكم لإعداد البائع، REST API للعمليات وقت التشغيل، وSDKs العميل في تطبيقات العملاء (SDKs متعددة اللغات وأمثلة مخططة)" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
      </figure>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">ثلاثة أسطح</span>
        <p><strong>لوحة التحكم</strong> (JWT) هي حيث يعرّف البائعون المنتجات والإصدارات والمفاتيح والتراخيص.
        <strong>REST API</strong> هو حد الأتمتة ووقت التشغيل للتحقق والتفعيلات والجلسات والقياس عن بُعد.
        <strong>SDKs العميل</strong> تُشحن داخل تطبيقك وتتحقق من مادة الترخيص الموقّعة باستخدام المفتاح العام للمنتج. <strong>SDK ‎.NET</strong> متاح اليوم؛ LicenPro يوسّع إلى <strong>SDKs من الدرجة الأولى لمزيد من اللغات وبيئات التشغيل</strong> (مثل VB وJava وPython)، وستضيف هذه الوثائق <strong>أمثلة خاصة بكل لغة</strong> لكل مكدس إلى جانب REST API — ويمكن لأي بيئة التكامل عبر HTTPS في هذه الأثناء.</p>
      </div></div>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-key" aria-hidden="true"></i><div>
        <span class="callout-title">بيانات الاعتماد في لمحة</span>
        <p><strong>استدعاءات HTTP للوحة التحكم والإدارة</strong> تستخدم <code>Authorization: Bearer &lt;JWT&gt;</code> بعد تسجيل الدخول. يرتبط هذا JWT بـ <strong>جلسة المشغّل</strong> (من أنت في بوابة البائع). استخدمه للمسارات التي تدير المؤسسات والمنتجات والتراخيص وما شابه — ولا تلصقه أبداً في تطبيقات العملاء.</p>
        <p><strong>التحقق المجهول من الخوادم أو SDK عميل</strong> يستخدم <code>X-API-KEY</code> للمنتج على مسارات مثل <code>POST /api/Licenses/validate</code>. <strong>تنشئ هذا المفتاح وتنسخه من لوحة التحكم</strong> في <strong>منطقة API / بيانات الاعتماد للمنتج</strong>، أو حيثما يعرضه نشرك للمستخدم المسجّل (بما في ذلك صفحات <strong>الحساب أو الملف الشخصي</strong> التي تسرد مفاتيح المنتج). إنه <strong>ليس</strong> كلمة مرور تسجيل الدخول. تعامل معه كسرّ: خزّنه في إعدادات الخادم أو خزنة آمنة؛ أرسله إلى ثنائيات المستخدم النهائي فقط عند تضمينه عمداً لاستدعاءات المنتج المجهولة.</p>
        <p><strong>مادة التوقيع RSA</strong>: لكل منتج <strong>مفتاح توقيع خاص</strong> يبقى على LicenPro / حد الاستضافة — <strong>لا</strong> توزّعه أبداً و<strong>لا</strong> تضعه في ثنائيات العميل. التطبيقات وSDKs تستخدم فقط <strong>المفتاح العام</strong> (أو مادة عامة مكافئة) للتحقق من أن <code>license.bin</code> وُقّع لذلك المنتج. باختصار: <strong>JWT</strong> = مشغّل البائع؛ <strong>X-API-KEY</strong> = هوية المنتج لاستدعاءات API المجهولة من كودك؛ <strong>المفتاح العام</strong> = التحقق من التراخيص في الميدان؛ <strong>المفتاح الخاص</strong> = يبقى على الخادم فقط.</p>
      </div></div>
      <p>قاعدة API المستضاف (السحابة): <code>${HOST}/api</code>. ملخصات مسار بمسار: ${link('/api/overview', 'نظرة عامة على REST API')}.</p>

      <h2>من يفعل ماذا</h2>
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-overview-who-does-what.png" data-doc-image-alt="من يفعل ماذا: مشغّلو البائع في لوحة التحكم، المكاملون والأتمتة من CI والفوترة، وتطبيقات العملاء مع SDK أو HTTPS — كل ذلك عبر LicenPro REST API" aria-label="عرض مخطط من يفعل ماذا بالحجم الكامل">
          <img src="assets/docs/platform-overview-who-does-what.png" alt="من يفعل ماذا: مشغّلو البائع في لوحة التحكم، المكاملون والأتمتة من CI والفوترة، وتطبيقات العملاء مع SDK أو HTTPS — كل ذلك عبر LicenPro REST API" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">انقر على الصورة لفتح معاينة بدقة كاملة.</figcaption>
      </figure>
      <ul style="margin-left:1.25rem;">
        <li><strong>مشغّلو البائع</strong> — يعملون في لوحة تحكم المتصفح ضمن مؤسستك؛ تأليف يومي للمنتجات والإصدارات والمفاتيح والتراخيص.</li>
        <li><strong>المكاملون والأتمتة</strong> — يستدعون نفس سطح HTTPS من CI أو الفوترة أو الأدوات الداخلية (JWT للمسارات بنطاق المشغّل، أو مفتاح المنتج فقط حيث صُمّ مسار للوصول المجهول).</li>
        <li><strong>تطبيقات العملاء</strong> — تستخدم SDK عميل مدعوماً (اليوم: .NET) أو تستدعي REST API من مكدسك؛ تتحقق من <code>license.bin</code> دون اتصال بالمفتاح العام واختيارياً تحدّث الحالة عبر الإنترنت مقابل <code>${HOST}/api</code>. SDKs بلغات إضافية وأمثلة لكل لغة (مثل VB وJava وPython) مخططة.</li>
      </ul>

      <h2>المرحلة 1 — التكوين (لوحة التحكم)</h2>
      <p>هذا الجانب الأيسر من المخطط: كل ما تفعله قبل أن تشغّل آلة عميل تطبيقك.</p>
      <ol style="margin-left:1.25rem;">
        <li><strong>المؤسسة</strong> — حد المستأجر للأعضاء والدعوات والمنتجات.</li>
        <li><strong>المنتج</strong> — مرساة لمفاتيح API والإصدارات والاستحقاقات وكل ترخيص صادر.</li>
        <li><strong>الإصدارات</strong> — خطوط إصدار لاستهداف التراخيص وفحوص التحديث بناء أو قناة محددة.</li>
        <li><strong>الميزات ومجموعات الاستحقاق</strong> — تجميع اختياري للقدرات في SKUs تُسند للتراخيص.</li>
        <li><strong>مفاتيح RSA</strong> — توليد لكل منتج قبل إصدار التراخيص؛ يُوزّع المفتاح العام فقط على التطبيقات.</li>
        <li><strong>التراخيص</strong> — اختر النموذج (دائم، تجريبي، اشتراك، عائم، متزامن، مقفل على جهاز، قائم على الرصيد، قائم على الاستخدام، …)، حدّد الحدود، صدّر <code>license.bin</code> ومفتاح الترخيص.</li>
      </ol>
      <p>قراءات أعمق: ${link('/guides/platform/organizations', 'المؤسسات')} · ${link('/first-organization', 'أول مؤسسة')} · ${link('/guides/platform/products', 'المنتجات')} · ${link('/guides/platform/releases', 'الإصدارات')} · ${link('/guides/platform/features-entitlements', 'الميزات والاستحقاقات')} · ${link('/rsa-keys', 'مفاتيح RSA')} · ${link('/guides/platform/licenses', 'التراخيص (البائع)')} · ${link('/first-product', 'أول منتج')} · ${link('/first-license', 'أول ترخيص')}.</p>

      <h2>خريطة تنقل لوحة التحكم</h2>
      <p>مناطق الشريط الجانبي الرئيسية وأين تقرأ المزيد:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>الرئيسية</strong> (<code>/dashboard</code>) — عناصر KPI، تراخيص/منتجات حديثة.</li>
        <li><strong>المؤسسات</strong> — ${link('/guides/platform/organizations', 'دليل المؤسسات')} · علامات تبويب: نظرة عامة، المنتجات، الأعضاء، الدعوات، التدقيق، الإعدادات.</li>
        <li><strong>المنتجات</strong> — ${link('/guides/platform/products', 'دليل المنتجات')} · علامات تبويب: نظرة عامة، الميزات، الاستحقاقات، الإصدارات، التراخيص، المستخدمون، مصفوفة الوصول، التدقيق، الإعدادات.</li>
        <li><strong>الإصدارات</strong> — ${link('/guides/platform/releases', 'دليل الإصدارات')} (عام + علامة تبويب لكل منتج).</li>
        <li><strong>التراخيص</strong> — ${link('/guides/platform/licenses', 'دليل التراخيص')} · معالج + علامات تفاصيل (نظرة عامة، التفعيلات، الجلسات، الاستخدام، الجهاز).</li>
        <li><strong>التفعيلات</strong> — ${link('/guides/platform/activations', 'دليل التفعيلات')}.</li>
        <li><strong>الجلسات</strong> — ${link('/guides/platform/sessions', 'دليل الجلسات')}.</li>
        <li><strong>التجارب</strong> — ${link('/guides/platform/trials', 'دليل التجارب')}.</li>
        <li><strong>التخزين</strong> — ${link('/guides/platform/storage', 'دليل التخزين')} (Drive وOneDrive وخادم مخصص).</li>
        <li><strong>التحليلات</strong> — ${link('/guides/platform/analytics', 'دليل التحليلات')}.</li>
        <li><strong>إعدادات الحساب</strong> — ${link('/guides/platform/account-settings', 'إعدادات الحساب')} (الملف الشخصي، الأمان، الخطة، مفاتيح API).</li>
        <li><strong>تدقيقي</strong> (<code>/dashboard/audit-logs</code>) — سجل تدقيق شخصي؛ راجع دليل التحليلات.</li>
      </ul>

      <h2>المرحلة 2 — التشغيل (REST API)</h2>
      <p>منتصف المخطط: الحد المستضاف عند <code>${HOST}/api</code> (استبدل المضيف عند الاستضافة الذاتية).</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>التحقق عبر الإنترنت</strong> — <code>POST /api/Licenses/validate</code> مع <code>X-API-KEY</code> للمنتج عندما تريد أن يقيّم الخادم السياسة أو ربط الأجهزة أو الإبطال في الوقت الفعلي.</li>
        <li><strong>التفعيلات والجلسات</strong> — فرض مقاعد اختياري، تزامن عائم، ورؤية على نمط نبضات القلب للدعم والامتثال.</li>
        <li><strong>القياس عن بُعد والتحديثات</strong> — مسارات موجهة لـ SDK للإعدادات وبيانات التحديث وشحن السجلات الاختياري (راجع موضوعات SDK لكيفية استدعاء المديرين).</li>
        <li><strong>الأتمتة</strong> — تزويد أو إيقاف التراخيص من مهام الخلفية باستخدام مسارات إدارة بنطاق JWT حيث يسمح RBAC.</li>
      </ul>
      <p>ابدأ هنا: ${link('/api/overview', 'نظرة عامة على REST API')} · ${link('/api/licenses', 'API التراخيص')} · ${link('/api/activations-sessions', 'التفعيلات والجلسات')} · ${link('/api/telemetry', 'القياس عن بُعد والسجلات')}.</p>

      <h2>المرحلة 3 — التطبيق (SDKs العميل)</h2>
      <p>الجانب الأيمن من المخطط: كود يُشحن داخل عمليتك. <strong>.NET</strong> مغطّى بالكامل في هذا الموقع اليوم؛ SDKs إضافية و<strong>أمثلة مخصصة لكل لغة</strong> (بما في ذلك VB وJava وPython وغيرها) ستظهر هنا عند إصدارها. حتى ذلك الحين، أي مكدس يمكنه استخدام عقد HTTPS نفسه كـ REST API.</p>
      <p>الخطوات التالية تستخدم أنواع و<strong>.NET</strong> ونقاط الدخول اليوم؛ SDKs أخرى ستعكس دورة الحياة نفسها بواجهات API أصيلة لكل لغة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Bootstrap مرة واحدة</strong> — حل <code>ServerBaseEndpoint</code> (يجب أن يتضمن <code>/api</code>)، حمّل إعدادات JSON إن استخدمتها، ثم شغّل <code>SdkBootstrap.OnApplicationStartup()</code> على hosts سطح المكتب قبل الواجهة.</li>
        <li><strong>الثقة دون اتصال</strong> — <code>LicenseClient</code> يتحقق من توقيع RSA على <code>license.bin</code> باستخدام المادة العامة المضمّنة؛ لا مفتاح خاص في العميل.</li>
        <li><strong>التحديث عبر الإنترنت</strong> — مسارات اختيارية إلى <code>${HOST}/api</code> لتحديث التحقق والتفعيلات والجلسات واستخدام الميزات والتحديثات الواعية بالترخيص.</li>
      </ul>
      <p>تابع مع ${link('/sdk/overview', 'نظرة عامة على SDK ‎.NET')} · ${link('/sdk/configuration', 'التكوين وBootstrap')} · ${link('/sdk/dotnet', 'تكامل .NET')} · ${link('/sdk/license-client', 'دورة حياة LicenseClient')}.</p>

      <h2>مسارات وقت التشغيل الاختيارية</h2>
      <p>بعد عمل الحلقة الأساسية، تضيف الفرق عادةً واحداً أو أكثر مما يلي:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>التفعيلات والجلسات</strong> — ${link('/sessions-activations', 'دليل الجلسات والتفعيلات')} وصفحات ${link('/guides/platform/activations', 'التفعيلات')} / ${link('/guides/platform/sessions', 'الجلسات')} في المنصة.</li>
        <li><strong>نماذج الترخيص</strong> — دائم، تجريبي، اشتراك، عائم، متزامن، مقفل على جهاز، قائم على الرصيد، قائم على الاستخدام (الشريط الجانبي <em>نماذج الترخيص</em>).</li>
        <li><strong>Webhooks</strong> — ${link('/webhooks', 'Webhooks')} لأحداث دورة الحياة إلى خلفيتك دون استطلاع.</li>
        <li><strong>التحديثات والتسجيل</strong> — ${link('/sdk/updates-logging', 'تحديثات SDK والتسجيل')} لفحوص التحديث الواعية بالترخيص والسجلات المنظمة.</li>
      </ul>
    `,
  },
  organizations: {
    title: "المؤسسات",
    lead: "حد المستأجر لفريقك ومنتجاتك والدعوات وسياق التدقيق. افهم أدوار المؤسسة، كل علامة تبويب في لوحة التحكم، ودورة حياة العضو من الدعوة حتى الإزالة.",
    body: `
      <p>كل بائع يعمل داخل <strong>مؤسسة</strong> — مستأجر يجمع الأشخاص والمنتجات المعيّنة والسياسات وسجل التدقيق. تُصدر التراخيص تحت <strong>المنتجات</strong>، لكن المؤسسة تحدد من يمكنه رؤيتها وإدارتها.</p>
      <p>جولة الإعداد: ${link('/first-organization', 'إنشاء أول مؤسسة')}.</p>

      <h2>نموذج الأدوار (اقرأ هذا أولاً)</h2>
      <p>LicenPro يستخدم <strong>ثلاث طبقات صلاحيات</strong>. وثائق لوحة التحكم غالباً تذكر «admin» بأكثر من معنى — اربط كل إجراء بالطبقة الصحيحة:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>دور JWT النظام</strong> — <code>Admin</code> (مشغّل المنصة) أو <code>User</code> (بائع مسجّل). يتحكم في عناصر الشريط الجانبي مثل سجلات النظام والتذاكر والمشتركين. <em>لا</em> يجعل شخصاً تلقائياً مالك منتج.</li>
        <li><strong>دور المؤسسة</strong> — عضويتك في المستأجر: <code>Owner</code>، <code>Admin</code>، <code>ProductOwner</code>، <code>Member</code>، <code>Viewer</code>، أو <code>ResellerAdmin</code> (backend). يُخزّن كـ <code>myRole</code> في سجل المؤسسة.</li>
        <li><strong>ملكية المنتج</strong> — مدرجة في <code>product.owners</code>. مطلوبة لـ CRUD التراخيص ومفاتيح RSA وعلامة تبويب Users ومصفوفة الوصول ومعظم إجراءات الإعدادات — حتى لو كان دورك في المؤسسة Admin.</li>
      </ul>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">واجهة المستخدم مقابل API</span>
        <p>بعض حراس المسارات يتحققون فقط من أنك مستخدم منصة مسجّل. <strong>الفحوصات المعتمدة تُجرى على API.</strong> إذا ظهر زر لكن الخادم يعيد 403، فدورك في المؤسسة أو المنتج يفتقر إلى تلك الصلاحية.</p>
      </div></div>

      <h2>دورة حياة المؤسسة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إنشاء</strong> — معالج في <code>/dashboard/organizations</code> (الهوية: الاسم، الموقع، دور الدخول الافتراضي؛ العلامة التجارية: الشعار، الألوان، الوصف).</li>
        <li><strong>تكوين</strong> — علامة تبويب الإعدادات: السياسات (التسجيل الذاتي، الموافقة)، دور العضو الافتراضي، العلامة التجارية.</li>
        <li><strong>دعوة</strong> — دعوات بريد إلكتروني مع دور؛ القبول عبر <code>/auth/accept-invitation?token=…</code> (يتطلب تسجيل الدخول).</li>
        <li><strong>تعيين المنتجات</strong> — ربط المنتجات بالمؤسسة؛ إضافة مالكي المنتجات وصفوف access matrix لكل إصدار.</li>
        <li><strong>تشغيل</strong> — الأعضاء يستخدمون تحليلات نظرة عامة المؤسسة؛ المسؤولون يديرون الفريق والتدقيق.</li>
        <li><strong>نقل أو حذف</strong> — نقل الملكية (Owner)؛ حذف المؤسسة (Owner فقط، مدمر).</li>
      </ol>

      <h2>علامات تبويب المؤسسة</h2>
      <p>كل علامة تبويب هي مسار فرعي ضمن تخطيط المؤسسة. علامات تبويب <strong>الأعضاء</strong> و<strong>الدعوات</strong> و<strong>سجلات التدقيق</strong> و<strong>الإعدادات</strong> تظهر فقط عندما يكون <code>myRole</code> <code>Owner</code> أو <code>Admin</code> أو <code>ProductOwner</code> أو <code>ResellerAdmin</code>. <strong>نظرة عامة</strong> و<strong>المنتجات</strong> مرئيتان لجميع الأعضاء.</p>

      <h3>نظرة عامة</h3>
      <p>علامة التبويب الافتراضية عند فتح مؤسسة. استخدمها للإجابة «ماذا يحدث في هذا المستأجر الآن؟» قبل التعمق في المنتجات أو التراخيص.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>بطاقات الملخص</strong> — عدد الأعضاء، المنتجات المعيّنة، إجمالي التراخيص، واتجاهات التفعيل ضمن هذه المؤسسة.</li>
        <li><strong>مزيج التراخيص</strong> — عرض سريع للتراخيص الدائمة والتجريبية والاشتراك والعائمة والمتزامنة المرتبطة بمنتجات المؤسسة.</li>
        <li><strong>النشاط الأخير</strong> — اختصارات لأحدث أحداث التراخيص وتغييرات الفريق دون فتح سجلات التدقيق.</li>
        <li><strong>تبديل السياق</strong> — إذا كنت تنتمي لعدة مؤسسات، تأكد من اسم المؤسسة في الرأس قبل التصرف على البيانات.</li>
      </ul>
      <p><strong>المهام النموذجية:</strong> فحص صحة أسبوعي، لقطة تنفيذية قبل مكالمة تجديد، التحقق من وصول تعيين منتج جديد.</p>

      <h3>المنتجات</h3>
      <p>فهرس المنتجات البرمجية المرتبطة بهذه المؤسسة. التعيين هنا <em>لا</em> يصدر تراخيص — يمنح المؤسسة (وأعضاءها) الرؤية ومسارات الوصول للمنتجات التي أنشأتها مسبقاً في حساب البائع.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>تعيين منتج</strong> — Owner / Admin يفتح <strong>تعيين منتج</strong>، يبحث في فهرس البائع، ويربط منتجاً أو أكثر. يرى الأعضاء بعدها المنتجات المعيّنة في هذه العلامة وفي الشريط الجانبي (خاضعاً لقواعد access matrix على كل منتج).</li>
        <li><strong>إلغاء التعيين</strong> — يزيل ربط المؤسسة؛ لا يحذف المنتج أو تراخيصه على مستوى المنصة.</li>
        <li><strong>عرض العضو</strong> — Member وViewer يرون فقط المنتجات المعيّنة لهم أو الممنوحة عبر صفوف access matrix لكل إصدار — وليس كل منتج في حسابك.</li>
        <li><strong>الخطوة التالية</strong> — بعد التعيين، مالكو المنتج يضيفون مستخدمين وصفوف matrix في مساحة عمل المنتج (${link('/guides/platform/products', 'دليل المنتجات')}).</li>
      </ul>
      ${screenshot('platform-organization-assign-product.png', 'نافذة Assign Product: اختيار المنتجات لربطها بالمؤسسة')}

      <h3>الأعضاء</h3>
      <p>دليل الفريق المعتمد للمؤسسة: من ينتمي، ما دور المؤسسة الذي يحمله، ومتى انضم.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>دعوة</strong> — بريد + دور: Member، Viewer، ProductOwner، أو Admin (Owner فقط يمكنه تعيين Admin).</li>
        <li><strong>تغيير الدور</strong> — Owner، Admin، أو ResellerAdmin؛ قواعد Owner-only تنطبق عند الترقية إلى Admin.</li>
        <li><strong>إزالة</strong> — Owner، Admin، ProductOwner، ResellerAdmin؛ لا يمكن إزالة Owner.</li>
        <li><strong>الدور مقابل وصول المنتج</strong> — دور المؤسسة يتحكم في علامات تبويب المؤسسة؛ مالكو المنتج وaccess matrix يتحكمون في عمل الترخيص لكل منتج.</li>
      </ul>
      <p><strong>دليل الأدوار السريع:</strong> Member = المساهمة في المنتجات المعيّنة؛ Viewer = قراءة فقط؛ ProductOwner = إدارة المنتجات/التراخيص دون إدارة مؤسسة كاملة؛ Admin = الفريق + الإعدادات باستثناء إجراءات Owner-only.</p>
      ${screenshot('platform-organization-invite-member.png', 'نافذة Invite Team Member: البريد، الدور المعيّن، ورسالة الدعوة')}

      <h3>الدعوات</h3>
      <p>قائمة انتظار تشغيلية للأشخاص الذين لم يقبلوا بعد. استخدمها عندما يتعثر الإعداد أو تحتاج إلغاء دعوة خاطئة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>الحالة</strong> — Pending، منتهية، أو ملغاة؛ تصفية وبحث ببريد المستلم.</li>
        <li><strong>إعادة الإرسال</strong> — يولّد بريداً برمز جديد دون تغيير الدور المختار.</li>
        <li><strong>إلغاء</strong> — يبطل الرابط فوراً؛ يجب أن يستلم المستلم دعوة جديدة.</li>
        <li><strong>انتهاء الصلاحية</strong> — كل صف يعرض متى ينتهي الرمز؛ الدعوات المنتهية لا يمكن قبولها حتى إعادة الإرسال.</li>
        <li><strong>الأدوار في واجهة المستخدم</strong> — Member، Viewer، Admin في هذه العلامة؛ علامة الأعضاء تقدم أيضاً ProductOwner عند الدعوة.</li>
      </ul>
      ${screenshot('platform-organization-invitations.png', 'علامة تبويب Institution Team Invitations: دعوات معلقة مع الدور والحالة وانتهاء الصلاحية')}

      <h3>سجلات التدقيق</h3>
      <p>مسار ثابت بنطاق المؤسسة للامتثال والدعم: من غيّر عضوية الفريق أو المنتجات المعيّنة أو إعدادات المؤسسة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>الأعمدة</strong> — الطابع الزمني، الإجراء (مثل InvitationSent، LicenseCreated)، المنتج، نوع الكيان، اسم الكيان، عنوان IP.</li>
        <li><strong>المرشحات</strong> — نوع الإجراء، نوع الكيان، نطاق التاريخ، وبحث نصي حر عبر المستخدم أو الكيان أو المنتج.</li>
        <li><strong>تصدير CSV</strong> — تنزيل العرض المصفّى لـ SIEM أو تحليل جدول بيانات.</li>
        <li><strong>التفاصيل</strong> — أيقونة العين تفتح حمولة منظمة لحدث واحد.</li>
        <li><strong>اقتران مع Analytics</strong> — التدقيق لحظة زمنية؛ ${link('/guides/platform/analytics', 'التحليلات')} يعرض الاتجاهات عبر الزمن.</li>
      </ul>
      ${screenshot('platform-organization-audit-logs.png', 'علامة تبويب Institution سجلات التدقيق: نشاط التراخيص والدعوات مع المرشحات والتصدير')}

      <h3>الإعدادات</h3>
      <p>تكوين يركز على Owner مقسّم إلى أقسام فرعية (تنقل يسار داخل الإعدادات):</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>عام</strong> — اسم الكيان، معرف السجل، وصف نص غني، وURL الموقع العام المعروض في ملف المؤسسة.</li>
        <li><strong>العلامة التجارية</strong> — الشعار والألوان لعرض المؤسسة في لوحة التحكم والدعوات.</li>
        <li><strong>السياسات</strong> — <code>allowSelfRegistration</code>، <code>requireApprovalForJoining</code>، و<code>defaultMemberRole</code> للمنضمين الجدد (Member، Viewer، أو Admin).</li>
        <li><strong>الحوكمة</strong> — نقل الملكية ومفاتيح سياسة متقدمة حيث يعرضها نشرك.</li>
        <li><strong>منطقة الخطر</strong> — حذف المؤسسة (Owner فقط؛ لا رجعة؛ التراخيص تحت منتجات المؤسسة قد تتتابع حسب سياسة الخادم).</li>
      </ul>
      <p><strong>قبل الحفظ:</strong> الوصف والموقع موجهان للعملاء في رأس المؤسسة؛ تغييرات السياسة تؤثر على الدعوة أو محاولة التسجيل الذاتي التالية، وليس بأثر رجعي على الأعضاء الحاليين.</p>
      ${screenshot('platform-organization-settings-general.png', 'الإعدادات العامة للمؤسسة: الاسم، الوصف، الموقع، وتنقل Branding الفرعي')}

      <h2>مصفوفة أدوار المؤسسة</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Owner</strong> — تحكم كامل بالمستأجر: حذف المؤسسة، نقل الملكية، تعيين Admin، جميع عمليات الدعوة/الإزالة/الدور.</li>
        <li><strong>Admin</strong> — دعوة، تغيير الأدوار (ليس إلى Owner؛ لا يمكن تعيين Admin — ذلك Owner-only)، إزالة الأعضاء؛ لا يمكن حذف المؤسسة.</li>
        <li><strong>ProductOwner</strong> — دعوة وإزالة الأعضاء؛ إدارة المنتجات/التراخيص المعيّنة؛ لا حذف مؤسسة ولا ترقية Admin.</li>
        <li><strong>Member</strong> — عرض نظرة عامة المؤسسة والمنتجات المعيّنة؛ استخدام التراخيص حسب access matrix للمنتج؛ لا علامات إدارة الأعضاء في واجهة المستخدم.</li>
        <li><strong>Viewer</strong> — وصول قراءة فقط للمؤسسة؛ رؤية المنتج عبر access matrix فقط.</li>
        <li><strong>ResellerAdmin</strong> — دور backend يُعامل كـ Admin لكثير من عمليات المؤسسة (عرض جزئي في واجهة المستخدم).</li>
      </ul>

      <h2>سير عمل الدعوة (خطوة بخطوة)</h2>
      <ol style="margin-left:1.25rem;">
        <li>Admin يفتح <strong>الأعضاء</strong> أو <strong>الدعوات</strong> → <strong>دعوة</strong>.</li>
        <li>أدخل البريد، اختر الدور، رسالة اختيارية → إرسال.</li>
        <li>المستلم يستلم بريداً برابط رمز.</li>
        <li>المستلم يسجّل الدخول (أو يسجّل) → <code>/auth/accept-invitation?token=…</code>.</li>
        <li>عند النجاح، يُضاف المستخدم للمؤسسة بالدور المختار → إعادة توجيه إلى <code>/dashboard/organization/:orgId</code>.</li>
        <li>المشغّل يمكنه إعادة الإرسال أو إلغاء الصفوف المعلقة من <strong>الدعوات</strong>.</li>
      </ol>

      <h2>أتمتة REST</h2>
      <p>المسارات تحت <code>/api/Organization/…</code> تعكس تدفقات لوحة التحكم: CRUD، الأعضاء، الدعوات، السياسات. استخدم JWT المشغّل أو مفاتيح API للحساب بنطاق (${link('/rsa-keys', 'دليل مفاتيح API')}).</p>
      <p>${link('/api/organizations', 'API المؤسسات')} · ${link('/api/auth-users', 'المصادقة والمستخدمون')} · ${link('/guides/platform/products', 'المنتجات')} · ${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  products: {
    title: "المنتجات",
    lead: "مرساة مفاتيح RSA والإصدارات والاستحقاقات والتراخيص وبيانات اعتماد API. كل علامة تبويب للمنتج ونوع الوصول وقواعد المالك وأقسام الإعدادات موضّحة.",
    body: `
      <p><strong>المنتج</strong> هو البرنامج الذي ترخّصه. جميع ملفات الترخيص وحركة التحقق ومفاتيح التوقيع RSA وقيم <code>X-API-KEY</code> للمنتج تنتمي لمعرّف منتج واحد. المؤسسات تعيّن المنتجات للمستأجرين؛ <strong>مالكو المنتج</strong> يديرون الترخيص اليومي.</p>
      <p>جولة: ${link('/first-product', 'إنشاء أول منتج')} · ${link('/rsa-keys', 'مفاتيح RSA &amp; بيانات اعتماد API')}.</p>

      <h2>دورة حياة المنتج</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إنشاء</strong> — الاسم، إصدار/مستوى الإصدار الأولي، نوع الوصول (Associated مقابل Opened)، وصف وصورة اختياريان.</li>
        <li><strong>تكوين</strong> — Features، مجموعات الاستحقاق، إعدادات تحديث العميل، مفاتيح RSA في الإعدادات.</li>
        <li><strong>الطاقم</strong> — إضافة أعضاء المؤسسة في علامة تبويب <strong>المستخدمون</strong>؛ تحسين وصول الإصدار في <strong>مصفوفة الوصول</strong>.</li>
        <li><strong>إصدار</strong> — شحن خطوط الإصدار تحت علامة <strong>الإصدارات</strong> (${link('/guides/platform/releases', 'دليل الإصدارات')}).</li>
        <li><strong>إصدار التراخيص</strong> — علامة <strong>التراخيص</strong> أو القائمة العامة (${link('/guides/platform/licenses', 'دليل التراخيص')}).</li>
        <li><strong>تشغيل</strong> — التفعيلات والجلسات والتحليلات مصفّاة لهذا المنتج.</li>
        <li><strong>إيقاف</strong> — إلغاء التفعيل أو الحذف من منطقة الخطر في الإعدادات (يتتابع الإصدارات والتراخيص).</li>
      </ol>

      <h2>أنواع الوصول: Associated مقابل Opened</h2>
      <p>يُختار عند الإنشاء؛ يقود واجهة المستخدم وقواعد الترخيص:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Associated (المؤسسة)</strong> — سير عمل بائع كامل. جميع علامات تبويب المنتج، جميع أنواع التراخيص (خاضعاً للخطة). التراخيص مرتبطة بسياق المؤسسة؛ مستخدمو المؤسسة المعيّنة فقط يصلون للمنتج.</li>
        <li><strong>Opened (جميع المستخدمين)</strong> — توزيع مبسّط. لوحة التحكم تعرض فقط علامتي <strong>نظرة عامة</strong> و<strong>الإصدارات</strong>. إنشاء الترخيص مقيّد (مثل أنماط perpetual offline)؛ مخصص لفهارس برمجيات مفتوحة على نطاق واسع.</li>
      </ul>

      <h2>علامات تبويب المنتج (عرض المالك الكامل)</h2>
      <p>رؤية العلامات تُحسب في تخطيط المنتج:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>منتجات Opened</strong> — نظرة عامة + الإصدارات فقط.</li>
        <li><strong>مستخدم نهائي</strong> (ليس في <code>owners[]</code>، وليس Admin النظام) — نظرة عامة، الإصدارات، التراخيص (بدون الإعدادات، Users، مصفوفة الوصول، التدقيق، الميزات، الاستحقاقات).</li>
        <li><strong>مالك المنتج أو Admin النظام</strong> — جميع العلامات أدناه.</li>
      </ul>

      <h3>نظرة عامة</h3>
      <p>علامة التبويب الافتراضية بعد فتح منتج. تؤكد نوع الوصول، قائمة المالكين، خط الإصدار الحالي، وعدد التراخيص قبل إصدار المفاتيح أو تعديل الاستحقاقات.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>شارة الحالة</strong> — Active مقابل locked (حدود الاشتراك/الخطة قد تحجب الإدارة).</li>
        <li><strong>عدّ سريع</strong> — الإصدارات، التراخيص، التفعيلات الأخيرة حيث تعرضها واجهة المستخدم.</li>
        <li><strong>Owners</strong> — من يمكنه إدارة مفاتيح RSA وUsers ومصفوفة الوصول وCRUD التراخيص.</li>
        <li><strong>هبوط المستخدم النهائي</strong> — Members المعيّنون غالباً يبدأون هنا ثم يفتحون Releases أو Licenses.</li>
      </ul>

      <h3>الميزات</h3>
      <p>فهرس القدرات لهذا المنتج. كل ميزة تصبح مفتاحاً ثابتاً يتحقق منه تطبيقك وقت التشغيل عبر SDK <code>FeatureManager</code>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إنشاء ميزة</strong> — الاسم، الوصف، والتعيين لمجموعات الاستحقاق (وسوم Groub/Group في واجهة المستخدم).</li>
        <li><strong>بحث</strong> — تصفية فهارس طويلة قبل التجميع في مجموعات.</li>
        <li><strong>لا تتخطّ المفاتيح</strong> — مفاتيح الميزات يجب أن تبقى ثابتة عبر الإصدارات؛ إعادة التسمية تكسر الاستحقاقات الموقّعة في الميدان.</li>
      </ul>
      <p>تعمّق: ${link('/guides/platform/features-entitlements', 'الميزات والاستحقاقات')}.</p>

      <h3>مجموعات الاستحقاق</h3>
      <p>SKUs قابلة لإعادة الاستخدام تجمع الميزات لإصدار التراخيص. المشغّلون يختارون مجموعة في معالج الترخيص بدلاً من تبديل عشرات الأعلام لكل عميل.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إنشاء مجموعة</strong> — الاسم، الوصف، الإصدارات المرتبطة، وميزات الأعضاء بقيم لكل ميزة.</li>
        <li><strong>نطاق الإصدار</strong> — المجموعات يمكنها استهداف خطوط إصدار محددة (مثل 1.0.0 مقابل 1.0.3).</li>
        <li><strong>معالج الترخيص</strong> — قائمة منسدلة اختيارية في الخطوة 1 ترفق استحقاقات معبّأة بمفاتيح جديدة.</li>
      </ul>

      <h3>الإصدارات</h3>
      <p>خطوط الإصدار لهذا المنتج. كل ترخيص يرتبط بمعرّف إصدار واحد للتحقق ونطاق الاستحقاق وفحوص تحديث SDK.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إصدار جديد</strong> — معالج متعدد الخطوات: معلومات أساسية، مجموعات استحقاق، ملفات، ملاحظات.</li>
        <li><strong>أعمدة الجدول</strong> — الإصدار، النوع (Stable/Beta/…)، حالة النشر، تواريخ الإنشاء/الإصدار، عدد التراخيص.</li>
        <li><strong>القائمة العامة</strong> — <strong>الإصدارات</strong> في الشريط الجانبي يعرض عرضاً عبر المنتجات؛ علامة المنتج هي المسار الأساسي للمشغّل.</li>
      </ul>
      <p>راجع ${link('/guides/platform/releases', 'دليل الإصدارات')} لـ draft مقابل published وربط الملفات.</p>

      <h3>التراخيص</h3>
      <p>إصدار وتعديل وإلغاء وتنزيل مادة الترخيص لهذا المنتج.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إنشاء</strong> — معالج من خطوتين (النوع، المنتج، الإصدار، مجموعة الاستحقاق → المقاعد، انتهاء الصلاحية، الملاحظات).</li>
        <li><strong>توزيع</strong> — سلسلة مفتاح الترخيص + <code>license.bin</code> الموقّع من عرض التفاصيل.</li>
        <li><strong>عرض العضو</strong> — المستخدمون المعيّنون يرون التراخيص التي يمكنهم تفعيلها؛ أزرار الإدارة تتطلب الملكية.</li>
        <li><strong>الأنواع</strong> — perpetual، trial، subscription، floating، concurrent، node-locked، credit-based، usage-based (${link('/guides/platform/licenses', 'دليل التراخيص')}).</li>
      </ul>

      <h3>المستخدمون</h3>
      <p>إعداد أعضاء المؤسسة على هذا المنتج. المستخدمون المضافون هنا يحصلون على نطاق المنتج لكن <strong>لا وصول للإصدار حتى مصفوفة الوصول يمنح الإصدارات</strong>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>اختيار المؤسسة</strong> — القائمة المنسدلة تسرد المؤسسات حيث هذا المنتج معيّن.</li>
        <li><strong>اختيار متعدد للأعضاء</strong> — اختر أشخاصاً ليسوا على المنتج بعد.</li>
        <li><strong>حالة فارغة</strong> — عندما كل عضو المؤسسة معيّن بالفعل، النافذة توضح أن الإعداد مكتمل.</li>
        <li><strong>Owners</strong> — مدرجون في <code>product.owners</code>؛ منفصلون عن تعيين علامة Users.</li>
      </ul>
      ${screenshot('platform-product-add-user.png', 'نافذة Add User: إعداد أعضاء المؤسسة على المنتج')}

      <h3>مصفوفة الوصول</h3>
      <p>منح دقيق لكل مستخدم ولكل إصدار. أساسي عندما ينبغي لـ Members المؤسسة رؤية خطوط إصدار محددة فقط أو عندما يحتاج Viewers وصول قراءة فقط للإصدار.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إدارة الوصول</strong> — قائمة مربعات اختيار لجميع الإصدارات المنشورة بالإضافة إلى <strong>منح لجميع الإصدارات</strong> (يشمل الإصدارات المستقبلية).</li>
        <li><strong>Search versions</strong> — تصفية قوائم إصدار طويلة داخل النافذة.</li>
        <li><strong>شريط الحالة</strong> — يعرض كم إصداراً لدى المستخدم مقابل الإجمالي المتاح.</li>
        <li><strong>بدون صفوف matrix</strong> — Members المعيّنون قد يرون المنتج لكن لا يمكنهم تفعيل تراخيص على إصدارات محجوبة.</li>
      </ul>
      ${screenshot('platform-product-access-matrix-manage.png', 'نافذة إدارة الوصول: منح وصول الإصدار لكل مستخدم بما في ذلك الإصدارات المستقبلية')}

      <h3>سجلات التدقيق</h3>
      <p>مسار تدقيق بنطاق المنتج — أضيق من تدقيق المؤسسة لكن يشمل أحداث دورة حياة الترخيص المرتبطة بهذا البرنامج.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إجراءات نموذجية</strong> — LicenseCreated، LicenseDeleted، LicenseFileDownload، InvitationSent (عندما ينطبق سياق المنتج).</li>
        <li><strong>المرشحات والتصدير</strong> — نفس نمط تدقيق المؤسسة: الإجراء، نوع الكيان، نطاق التاريخ، تصدير CSV.</li>
        <li><strong>سير عمل الدعم</strong> — ربط تذكرة العميل بـ IP والطابع الزمني قبل إلغاء مفتاح.</li>
      </ul>
      ${screenshot('platform-product-audit-logs.png', 'علامة تبويب Product سجلات التدقيق: إنشاء الترخيص والتنزيل ونشاط الدعوات')}

      <h3>الإعدادات</h3>
      <p>مالكو المنتج يكوّنون سلوك وقت التشغيل والمادة التشفيرية. المستخدمون النهائيون وغير المالكين لا يرون هذه العلامة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>عام</strong> — الاسم، الوصف، الحالة، نوع الوصول (حيث يمكن تعديله بعد الإنشاء).</li>
        <li><strong>تحديثات منتج العميل</strong> — تبديل <strong>عرض تحديثات المنتج للعملاء</strong>؛ عند التعطيل، واجهات التحديث لا تعيد ترقية لهذا المنتج.</li>
        <li><strong>مفاتيح توقيع الترخيص (RSA)</strong> — توليد، إعادة توليد، تنزيل PEM العام؛ المفتاح الخاص لا يغادر الخادم (${link('/rsa-keys', 'دليل RSA')}).</li>
        <li><strong>منطقة الخطر</strong> — حذف المنتج؛ الإصدارات والتراخيص تتتابع.</li>
      </ul>
      <p><strong>تحذير التدوير:</strong> إعادة توليد مفاتيح RSA تبطل ملفات <code>license.bin</code> الحالية حتى يعيد العملاء تنزيل التراخيص وتضمّن التطبيقات المفتاح العام الجديد.</p>
      ${screenshot('platform-product-settings-rsa-keys.png', 'إعدادات المنتج: تبديل تحديثات العميل ومفاتيح توقيع الترخيص مع إعادة التوليد وتنزيل المفتاح العام')}

      <h2>من يمكنه فعل ماذا على المنتجات</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>System Admin (JWT)</strong> — يتجاوز كثيراً من فحوص الملكية على API؛ يرى sidebar الإدارة.</li>
        <li><strong>مالك المنتج</strong> — مجموعة علامات كاملة (باستثناء تقليم Opened)؛ إنشاء/تعديل التراخيص، مفاتيح RSA، Users، مصفوفة الوصول.</li>
        <li><strong>Member معيّن</strong> — نظرة عامة، الإصدارات، التراخيص (استهلاك/تفعيل حسب matrix)؛ بدون الإعدادات.</li>
        <li><strong>Viewer</strong> — مسارات قراءة فقط عبر access matrix؛ بدون إنشاء ترخيص.</li>
        <li><strong>Org Admin بدون ملكية</strong> — إدارة فريق المؤسسة لكن ليس مفاتيح RSA للمنتج ما لم يُدرج أيضاً كمالك.</li>
      </ul>

      <h2>REST &amp; وقت التشغيل</h2>
      <p><code>/api/Products/…</code> — CRUD، مسارات مفتاح RSA، الإعدادات. تطبيقات العملاء تستخدم <code>X-API-KEY</code> للمنتج على مسارات الترخيص المجهولة — وليس JWT المشغّل.</p>
      <p>${link('/api/catalog', 'API المنتجات والإصدارات')} · ${link('/api/licenses', 'API التراخيص')} · ${link('/sdk/dotnet', 'SDK .NET')} · ${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  releases: {
    title: "الإصدارات",
    lead: "خطوط إصدار البرمجيات التي تستهدفها التراخيص ويستخدمها فاحص التحديث. القائمة العامة مقابل علامة المنتج، مستويات الإصدار، ودورة الحياة من المسودة إلى مهمل.",
    body: `
      <p><strong>إصدار البرمجيات</strong> هو خط إصدار تحت منتج — مثل <code>1.0.0 Stable</code> أو <code>2.0.0-beta</code>. كل ترخيص صادر يشير إلى معرّف إصدار حتى يعرف التحقق والاستحقاقات وفحوص التحديث أي قناة build تنطبق.</p>

      <h2>لماذا الإصدارات مهمة في دورة الحياة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إنشاء المنتج</strong> — الإصدار الأولي يزرع أول إصدار (راجع ${link('/first-product', 'أول منتج')}).</li>
        <li><strong>إنشاء الترخيص</strong> — المشغّل يختار <code>softwareReleaseId</code> في الخطوة 1 من المعالج.</li>
        <li><strong>تحقق SDK</strong> — حمولة الترخيص تحمل بيانات الإصدار؛ إصدار التطبيق غير المتطابق قد يفشل فحوص السياسة.</li>
        <li><strong>التحديثات</strong> — مديرو تحديث SDK و<code>/api/Updates/…</code> يقارنون إصدار العميل بفهرس الإصدارات.</li>
        <li><strong>Access matrix</strong> — منح الأعضاء وصولاً لكل صف إصدار، وليس المنتج فقط.</li>
      </ol>

      <h2>علامة تبويب Product Releases</h2>
      <p>السطح الأساسي للمشغّل لإدارة الإصدارات داخل مساحة عمل المنتج. عنصر الشريط الجانبي <strong>الإصدارات</strong> العام يعرض نفس البيانات عبر جميع المنتجات التي يمكنك الوصول إليها.</p>
      ${screenshot('platform-product-releases-list.png', 'علامة Product Releases: قائمة الإصدارات مع النوع والحالة وعدد التراخيص')}

      <h2>حقول الإصدار (نموذجية)</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>سلسلة الإصدار</strong> — دلالية (<code>1.0.0</code>)، ما قبل الإصدار (<code>1.0.0-alpha.1</code>)، بسيطة (<code>1</code>)، أو مبنية على build (<code>1.0.0.1</code>) حسب اختيار المعالج.</li>
        <li><strong>مستوى الإصدار</strong> — Stable (إنتاج)، Beta، Alpha، RC — يشير لتوقعات الدعم وسياسة التحديث.</li>
        <li><strong>الحالة</strong> — Draft (مخفية عن المستخدمين النهائيين) مقابل Published (مرئية في الفهارس ومعالج الترخيص).</li>
        <li><strong>الملاحظات / سجل التغيير</strong> — نص للمشغّل يُعرض في صفحة تفاصيل الإصدار واختيارياً في بيانات التحديث.</li>
        <li><strong>مجموعات الاستحقاق</strong> — ربط المجموعات التي تنطبق على خط الإصدار هذا (انظر الخطوة 2 من المعالج).</li>
        <li><strong>الملفات</strong> — المثبتات عبر ${link('/guides/platform/storage', 'موصلات التخزين')} (Google Drive، OneDrive، خادم مخصص) بدلاً من رفع API كبير.</li>
      </ul>

      <h2>سير عمل المشغّل</h2>
      <ol style="margin-left:1.25rem;">
        <li>افتح المنتج → علامة <strong>الإصدارات</strong> (أو قائمة Releases العامة).</li>
        <li><strong>إنشاء إصدار</strong> — الخطوة 1: تنسيق الإصدار، رقم الإصدار، مستوى الإصدار، draft مقابل published.</li>
        <li>الخطوة 2: اختر مجموعات الاستحقاق التي تنطبق على هذا build.</li>
        <li>الخطوة 3: أرفق ملفات من التخزين أو مراجع الرفع.</li>
        <li>الخطوة 4: سجل التغيير وملاحظات الإصدار لفرق الدعم.</li>
        <li>أصدر تراخيص مقابل معرّف هذا الإصدار <em>قبل</em> أن يرقّي العملاء builds التطبيق.</li>
        <li>عند الإهمال، أرشف الإصدار القديم بعد ترحيل التراخيص أو فرض قناة تحديث.</li>
      </ol>
      ${screenshot('platform-create-release-basic-info.png', 'Create Release الخطوة 1: تنسيق الإصدار ومستوى الإصدار وحالة draft أو published')}

      <h2>صفحة تفاصيل الإصدار</h2>
      <p>تُفتح من صف في جدول الإصدارات أو القائمة العامة. تعرض كل ما يحتاجه الدعم لخط إصدار واحد.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>شارات الرأس</strong> — أسلوب الإصدار (Semantic)، المستوى (Stable)، وحالة Published.</li>
        <li><strong>Changelog &amp; release notes</strong> — سرد قابل للتعديل للمشغّلين والعملاء.</li>
        <li><strong>مجموعات الاستحقاق</strong> — أي SKUs تنطبق على هذا الإصدار.</li>
        <li><strong>بطاقة الملفات</strong> — ملف تخزين مرتبط مع إجراء تنزيل سحابي (مثل ملف Google Drive).</li>
        <li><strong>Edit</strong> — تحديث البيانات الوصفية دون إعادة إنشاء معرّف الإصدار (يُفضّل إصدار جديد لزيادات الإصدار الكاسرة).</li>
      </ul>
      ${screenshot('platform-release-detail.png', 'صفحة تفاصيل الإصدار: سجل التغيير والملاحظات ومجموعات الاستحقاق وتنزيل ملف Google Drive')}

      <h2>الأدوار</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>مالك المنتج / Admin النظام</strong> — إنشاء وتعديل وحذف الإصدارات.</li>
        <li><strong>Member معيّن مع صف matrix</strong> — عرض صفوف الإصدار المسموحة؛ قد يفعّل تراخيص على الخطوط المسموحة فقط.</li>
        <li><strong>Viewer</strong> — قراءة فقط حسب matrix.</li>
      </ul>

      <h2>API &amp; SDK</h2>
      <p>مسارات الفهرس على <code>/api/Products/…</code> ونقاط نهاية خاصة بالإصدار في ${link('/api/catalog', 'API الفهرس')}. SDK: ${link('/sdk/updates-logging', 'التحديثات والتسجيل')} لفحوص التحديث الواعية بالترخيص.</p>
    `,
  },
  'features-entitlements': {
    title: "الميزات ومجموعات الاستحقاق",
    lead: "عرّف القدرات، اجمعها في SKUs، عيّن المجموعات للتراخيص، وطبّقها في SDK وقت التشغيل.",
    body: `
      <p><strong>الميزات</strong> هي مفاتيح أو قدرات ذرية (مثل <code>export_pdf</code>، <code>max_projects</code>). <strong>مجموعات الاستحقاق</strong> تجمع الميزات للتعيين على التراخيص حتى تشحن حزماً دون إعادة التجميع لكل SKU.</p>

      <h2>دورة حياة التكوين</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>تعريف الميزات</strong> في علامة <strong>الميزات</strong> للمنتج (<code>…/features</code>).</li>
        <li><strong>تجميع</strong> في مجموعات استحقاق في علامة <strong>مجموعات الاستحقاق</strong> (<code>…/entitlements</code>).</li>
        <li><strong>تعيين</strong> مجموعة اختيارية عند إنشاء/تعديل ترخيص (الخطوة 1 من المعالج أو التفاصيل).</li>
        <li><strong>توزيع</strong> <code>license.bin</code> — الحمولة الموقّعة تتضمن مادة الاستحقاق.</li>
        <li><strong>تطبيق</strong> في التطبيق عبر SDK <code>FeatureManager</code>؛ <code>FeatureUsageTracker</code> اختياري للقياس.</li>
      </ol>

      <h2>علامة Features</h2>
      <p>مالكو المنتج يعرّفون فهرس القدرات قبل تجميع SKUs. المستخدمون النهائيون وغير المالكين لا يرون هذه العلامة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>مفتاح الميزة</strong> — معرّف ثابت يُشار إليه في الكود (<code>FeatureManager.IsEnabled("key")</code>).</li>
        <li><strong>اسم العرض والوصف</strong> — توثيق المشغّل وسياق الدعم.</li>
        <li><strong>تعيين للمجموعات</strong> — وسوم زرقاء (مثل Groub1، Groub2) تجمع الميزات مسبقاً لإنشاء مجموعة الاستحقاق.</li>
        <li><strong>إنشاء ميزة</strong> — يضيف صفاً لجدول قابل للبحث مع تاريخ الإنشاء وقائمة الإجراءات.</li>
        <li><strong>النوع / الافتراضي</strong> — بوابات boolean، حدود رقمية، أو قيم منظمة حسب نموذج منتجك.</li>
      </ul>
      <p><strong>نصيحة تصميم:</strong> فضّل مفاتيح أقل ومسماة جيداً على عشرات المفاتيح المتداخلة — العملاء يستلمون الاستحقاقات عبر المجموعات، وليس صفوف الميزات الفردية.</p>
      ${screenshot('platform-product-features.png', 'علامة Product Features: تعريف الميزات والتعيين لمجموعات الاستحقاق')}

      <h2>علامة مجموعات الاستحقاق</h2>
      <p>اجمع الميزات في حزم قابلة لإعادة الاستخدام يربطها المشغّلون عند إنشاء الترخيص.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إنشاء مجموعة</strong> — الاسم، الوصف، ووسوم الإصدار المرتبطة (1.0.0، 1.0.3، …).</li>
        <li><strong>عمود Features</strong> — عدد القدرات في كل مجموعة (مثل «3 features»).</li>
        <li><strong>إضافة ميزات</strong> — اختر من الفهرس بقيم لكل ميزة (مفعّل، حدود).</li>
        <li><strong>معالج الترخيص</strong> — المجموعات المحفوظة تظهر في القائمة المنسدلة للخطوة 1.</li>
        <li><strong>أثر التعديل</strong> — التغييرات تؤثر على الإصدارات <strong>الجديدة</strong>؛ التراخيص الموقّعة الحالية تحتفظ بالمادة القديمة حتى إعادة الإصدار أو التحديث عبر الإنترنت.</li>
      </ul>
      ${screenshot('platform-product-entitlement-sets.png', 'علامة مجموعات الاستحقاق: تجميع الميزات في مجموعات قابلة لإعادة الاستخدام مرتبطة بالإصدارات')}

      <h2>التطبيق وقت التشغيل</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>دون اتصال</strong> — الاستحقاقات داخل <code>license.bin</code> الموقّع؛ SDK يتحقق من التوقيع ثم يقرأ حمولة الميزة.</li>
        <li><strong>تحديث عبر الإنترنت</strong> — التحقق أو نقاط نهاية الميزات قد تحدّث الاستحقاقات عند تغيّر الاشتراك منتصف المدة.</li>
        <li><strong>تتبع الاستخدام</strong> — عدّادات اختيارية تُرسل لمسارات القياس عن بُعد (${link('/api/telemetry', 'API القياس عن بُعد')}).</li>
      </ul>

      <h2>الأدوار</h2>
      <p>فقط <strong>مالكو المنتج</strong> و<strong>Admin النظام</strong> يرون علامات Features وEntitlements. الأعضاء يستهلكون الاستحقاقات عبر التراخيص التي يحملونها — ولا يؤلفونها.</p>

      <p>${link('/sdk/features-usage', 'SDK: الميزات والاستخدام')} · ${link('/api/catalog', 'فهرس REST')} · ${link('/guides/platform/licenses', 'التراخيص (البائع)')} · ${link('/guides/platform/products', 'المنتجات')}</p>
    `,
  },
  licenses: {
    title: "التراخيص (مساحة عمل البائع)",
    lead: "إصدار وتوزيع وإلغاء ومراقبة التراخيص من لوحة التحكم. يغطي معالج الإنشاء من أربع خطوات، علامات التفاصيل (بما في ذلك Usage للأنواع المقاسة)، أنواع الترخيص، وعروض البائع مقابل المستخدم النهائي.",
    body: `
      <p>البائعون ينشئون <strong>تراخيص</strong> مقابل منتج وإصدار برمجيات، ثم يوزّعون <strong>مفتاح الترخيص</strong> و<code>license.bin</code> الموقّع. <em>نوع</em> الترخيص يقود انتهاء الصلاحية والمقاعد والتفعيلات والجلسات وقواعد تحقق SDK.</p>
      <p>جولة: ${link('/first-license', 'إنشاء أول ترخيص')} · أدلة النماذج: ${link('/perpetual-license', 'دائم')}، ${link('/trial-license', 'تجريبي')}، ${link('/subscription-license', 'اشتراك')}، ${link('/floating-license', 'عائم')}، ${link('/concurrent-license', 'متزامن')}، ${link('/node-locked-license', 'مقفل على جهاز')}، ${link('/credit-based-license', 'قائم على الرصيد')}، ${link('/usage-based-license', 'قائم على الاستخدام')}.</p>

      <h2>نماذج الترخيص في لمحة</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Perpetual</strong> — شراء مرة واحدة؛ عبر الإنترنت أو دون اتصال؛ انتهاء اختياري للصيانة.</li>
        <li><strong>Trial</strong> — تقييم محدود زمنياً؛ تمديد أو تحويل إلى مدفوع.</li>
        <li><strong>Subscription</strong> — مدة متكررة؛ تجديد أو إلغاء عند مغادرة العميل.</li>
        <li><strong>Floating</strong> — مجموعة مشتركة؛ المقاعد تُفرض بـ <em>الجلسات الحية</em>؛ دائماً عبر الإنترنت.</li>
        <li><strong>Concurrent</strong> — مفتاح فريق مشترك؛ المقاعد تُفرض بـ <em>تفعيلات الأجهزة</em>.</li>
        <li><strong>Node-Locked</strong> — جهاز واحد لكل ترخيص؛ ربط أجهزة + نقل؛ ربط تلقائي أو موافقة المالك؛ محاولات المشاركة من أجهزة أخرى تُسجّل وتُبلّغ للمالك.</li>
        <li><strong>Credit-Based</strong> (<code>MeteredToken</code>) — عبر الإنترنت فقط؛ محفظة رصيد مشتركة؛ تسعير رموز لكل ميزة. ${link('/credit-based-license', 'الدليل الكامل')}.</li>
        <li><strong>Usage-Based</strong> (<code>MeteredCount</code>) — عبر الإنترنت فقط؛ عدّاد استخدام مشترك؛ استخدام واحد لكل consume. ${link('/usage-based-license', 'الدليل الكامل')}.</li>
      </ul>

      <h2>دورة حياة الترخيص (عرض البائع)</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>المتطلبات</strong> — منتج، إصدار، مفاتيح RSA مُولّدة (${link('/rsa-keys', 'مفاتيح RSA')}).</li>
        <li><strong>إنشاء</strong> — معالج من أربع خطوات (Activation → License Type → Basic Info → Details).</li>
        <li><strong>توزيع</strong> — نسخ مفتاح الترخيص؛ تنزيل <code>license.bin</code> من عرض التفاصيل.</li>
        <li><strong>تفعيل (العميل)</strong> — SDK أو <code>POST /api/Licenses/validate</code> مع <code>X-API-KEY</code> للمنتج.</li>
        <li><strong>تشغيل</strong> — مراقبة التفعيلات/الجلسات؛ تمديد التجارب؛ ضبط المقاعد حيث مسموح.</li>
        <li><strong>إلغاء / حذف</strong> — إبطال فوري للمسارات عبر الإنترنت؛ الملفات دون اتصال تفشل عند التحديث عبر الإنترنت التالي.</li>
        <li><strong>نقل</strong> — إعادة تعيين المستخدم المُصدر له أو جهاز node-locked حيث تسمح السياسة.</li>
      </ol>

      <h2>أين تعمل في لوحة التحكم</h2>
      <p>استخدم قائمة الشريط الجانبي <strong>التراخيص</strong> للبحث عبر المنتجات، أو افتح منتج → علامة <strong>التراخيص</strong> عندما تعرف سياق البرنامج. العملاء النهائيون يستخدمون <strong>My Licenses</strong> (وليس مساحة البائع) للمفاتيح الصادرة لحسابهم.</p>
      ${screenshot('platform-licenses-list.png', 'قائمة Licenses — أعمدة Type وMode وStatus وActivations (مثل 2/∞ perpetual، 1/1 node-locked)')}

      <h2>معالج الإنشاء — الخطوة 1: Activation</h2>
      <p>اختر كيف يُتحقق من الترخيص وقت التشغيل:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online</strong> — تحقق الخادم والتفعيلات والجلسات؛ مطلوب لـ Floating وSubscription وCredit-Based وUsage-Based.</li>
        <li><strong>Offline</strong> — <code>license.bin</code> الموقّع فقط؛ Perpetual وTrial وNode-Locked يمكنها استخدام وضع offline.</li>
      </ul>
      ${screenshot('platform-create-license-step1-activation.png', 'الخطوة 1 — وضع التفعيل Online مقابل Offline')}

      <h2>معالج الإنشاء — الخطوة 2: License Type</h2>
      <p>اختر بطاقة النموذج — كل ما يلي (المقاعد، الجلسات، الرموز، الربط) يتبع هذا الاختيار.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>بطاقات النوع</strong> — Perpetual، Trial، Subscription، Floating، Concurrent، Node-Locked، <strong>Credit-Based</strong>، <strong>Usage-Based</strong> (الخطة قد تحجب الأنواع).</li>
        <li>الأنواع online-only معطّلة عند اختيار Offline activation في الخطوة 1.</li>
      </ul>
      ${screenshot('platform-create-license-step-license-type.png', 'الخطوة 2 — بطاقات نوع الترخيص بما في ذلك Credit-Based وUsage-Based')}

      <h2>معالج الإنشاء — الخطوة 3: Basic Info</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product</strong> — مطلوب عند الإنشاء من القائمة العامة؛ مُعبأ مسبقاً في سياق المنتج.</li>
        <li><strong>Software release</strong> — مطلوب؛ يربط التحقق وفحوص التحديث بخط إصدار.</li>
        <li><strong>Issuer</strong> — اسم بائع اختياري في بيانات الترخيص.</li>
        <li><strong>Issued to</strong> — بريد، منتقي مستخدم نهائي، أو auto (حسب النوع).</li>
        <li><strong>Entitlement set</strong> — حزمة اختيارية من علامة مجموعات الاستحقاق للمنتج.</li>
      </ul>
      ${screenshot('platform-create-license-step-basic-info.png', 'الخطوة 3 — Basic Info: المنتج، الإصدار، issued-to، اسم الترخيص')}

      <h2>معالج الإنشاء — الخطوة 4: Details</h2>
      <p>حدود تشغيلية وتسميات يعتمد عليها المشغّلون وفرق الدعم بعد الإصدار.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>License name</strong> — تسمية داخلية (مطلوبة)؛ تظهر في القوائم وسجلات التدقيق.</li>
        <li><strong>Duration / expiry</strong> — مدة الاشتراك، فترة التجربة، أو لا شيء للدائم.</li>
        <li><strong>Seats &amp; limits</strong> — أقصى تفعيلات (concurrent/node-locked)، أقصى مستخدمين متزامنين (floating)، رصيد الرموز (credit-based)، حدود الاستخدام (usage-based).</li>
        <li><strong>Node-Locked — device binding mode</strong> — <em>ربط تلقائي عند أول تحقق</em> أو <em>موافقة مالك المنتج</em> (خطوة Details فقط).</li>
        <li><strong>Perpetual online</strong> — username/password اختياري للتحقق من بيانات الاعتماد.</li>
        <li><strong>Notes</strong> — ملاحظات مشغّل نص غني (سياق مبيعات، تذاكر دعم).</li>
        <li><strong>Success screen</strong> — نسخ مفتاح الترخيص؛ فتح التفاصيل لتنزيل <code>license.bin</code>.</li>
      </ul>
      ${screenshot('platform-create-license-step-details-binding.png', 'الخطوة 4 — Node-Locked Details: Auto-bind مقابل موافقة مالك المنتج')}

      <h2>علامات تفاصيل الترخيص (البائع)</h2>
      <p>تُفتح من أي صف ترخيص. رؤية العلامات تعتمد على نوع الترخيص وما إذا كنت مالك منتج أو Admin النظام.</p>

      <h3>نظرة عامة (دائماً)</h3>
      <p>ملخص في لوحة واحدة لعمليات البائع اليومية.</p>
      <ul style="margin-left:1.25rem;">
        <li>مفتاح الترخيص، شارة الحالة، النوع، الإصدار، issued-to، انتهاء الصلاحية.</li>
        <li>تنزيل <code>license.bin</code>، إلغاء، حذف، نقل مستخدم، رابط تعديل.</li>
        <li>نسخ المفتاح للتسليم بالبريد؛ سجل التدقيق يربط التنزيلات بـ IP.</li>
      </ul>

      <h3>التفعيلات</h3>
      <p>مقاعد الجهاز والبيئة لنماذج الربط. مرئية عندما يدعم نوع الترخيص تتبع الأجهزة ولديك حقوق owner/Admin.</p>
      <ul style="margin-left:1.25rem;">
        <li>صفوف لكل جهاز مع block/unblock وملاحظات الدعم.</li>
        <li>السطح الأساسي لحساب مقاعد ${link('/concurrent-license', 'متزامن')} (التفعيلات، وليس الجلسات).</li>
        <li><strong>Node-Locked</strong> — الموافقة على الأجهزة المعلقة عندما يكون وضع الربط موافقة مالك المنتج.</li>
        <li><strong>Perpetual online</strong> — مسار تدقيق للآلات (مثل <code>2/∞</code> في قائمة التراخيص).</li>
      </ul>
      ${screenshot('platform-node-locked-activations-tab.png', 'تفاصيل الترخيص — علامة Activations مع صفوف الأجهزة والحالة')}
      <p>راجع ${link('/guides/platform/activations', 'التفعيلات')}.</p>

      <h3>الجلسات</h3>
      <p>اتصالات عبر الإنترنت حية مع طوابع heartbeat. تُعرض للتراخيص القادرة على الإنترنت — خاصة ${link('/floating-license', 'عائم')} حيث المقاعد تتبع <em>الجلسات الحية</em>، ولـ ${link('/perpetual-license', 'دائم عبر الإنترنت')} / ${link('/node-locked-license', 'مقفل على جهاز عبر الإنترنت')} للمراقبة.</p>
      <ul style="margin-left:1.25rem;">
        <li>قطع الاتصال بالعملاء الراكدين الذين يحجزون مقاعد بعد تعطل التطبيق.</li>
        <li>ربط معرّف الجلسة بسجلات API للدعم.</li>
        <li>تبديل <strong>مباشر</strong> وتحديث تلقائي في صفحة Sessions العامة.</li>
      </ul>
      ${screenshot('platform-node-locked-sessions-tab.png', 'تفاصيل الترخيص — علامة Active Sessions مع heartbeat وقطع الاتصال')}
      <p>راجع ${link('/guides/platform/sessions', 'الجلسات')}.</p>

      <h3>الاستخدام</h3>
      <p>تراخيص <strong>Credit-Based</strong> و<strong>Usage-Based</strong> فقط: رصيد الرموز أو عدّادات مقاسة، سجل الاستهلاك، وتعديلات المشغّل. راجع أدلة ${link('/credit-based-license', 'قائم على الرصيد')} و${link('/usage-based-license', 'قائم على الاستخدام')}.</p>

      <h3>الجهاز</h3>
      <p>تراخيص <strong>Node-locked</strong> فقط: بصمة الأجهزة المربوطة، سجل التفعيل، سير عمل النقل/فك الربط عندما تسمح السياسة بتغيير الجهاز، وبطاقة <strong>محاولات وصول غير مصرّح بها</strong> تسرد الآلات المرفوضة لأن الترخيص مربوط في مكان آخر. المحاولات تحمل معرّفات الأجهزة المحاولة والمربوطة وIP ونقطة الدخول وعداداً لكل جهاز؛ مالكو المنتج يُبلّغون داخل التطبيق مرة واحدة لكل جهاء مخالف يومياً ويمكنهم وضع علامة reviewed على كل واحد. راجع ${link('/node-locked-license', 'كشف مشاركة ترخيص Node-locked')}.</p>

      <h2>دورة حياة حالة الترخيص</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Active</strong> — صالح للتحقق ضمن حدود السياسة.</li>
        <li><strong>Expired</strong> — بعد انتهاء الصلاحية (trial/subscription)؛ التحقق يفشل.</li>
        <li><strong>Revoked</strong> — إيقاف إجباري من المشغّل؛ التحقق عبر الإنترنت يفشل فوراً.</li>
        <li><strong>Suspended / locked</strong> — تعليق فوترة أو امتثال (حسب النشر).</li>
      </ul>

      <h2>الأدوار</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>مالك المنتج / Admin النظام</strong> — إنشاء، تعديل، إلغاء، حذف، رؤية علامة Activations.</li>
        <li><strong>Member معيّن</strong> — قد يرى تراخيص على إصدارات مسموحة؛ عادةً لا يمكنه الإنشاء.</li>
        <li><strong>مستخدم نهائي</strong> — يُوجّه إلى <code>/dashboard/my-licenses</code> للمفاتيح الصادرة لحسابه.</li>
      </ul>

      <h2>التحقق المجهول (وقت تشغيل العميل)</h2>
      <p>التطبيقات تستدعي <code>POST ${HOST}/api/Licenses/validate</code> مع <code>X-API-KEY</code> للمنتج — وليس المفتاح الخاص RSA أو JWT المشغّل.</p>
      <p>${link('/api/licenses', 'API التراخيص')} · ${link('/sdk/license-client', 'LicenseClient في SDK')} · ${link('/guides/platform/products', 'المنتجات')}</p>
    `,
  },
  activations: {
    title: "التفعيلات",
    lead: "الأجهزة والبيئات التي استهلكت مقعد ترخيص. مراقبة عامة، علامة لكل ترخيص، حظر/إلغاء الحظر، موافقة node-locked، وسلوك Perpetual مقابل Concurrent.",
    body: `
      <p><strong>التفعيل</strong> يسجّل أن آلة أو مستخدماً أو بيئة محددة طالبت بسعة على ترخيص. نماذج node-locked وconcurrent تعتمد على التفعيلات؛ perpetual online يتتبعها للامتثال والتدقيق.</p>
      <p>جولة مشتركة مع الجلسات: ${link('/sessions-activations', 'دليل الجلسات والتفعيلات')} · ${link('/perpetual-license', 'دائم')} · ${link('/node-locked-license', 'مقفل على جهاز')}.</p>

      <h2>دورة حياة التفعيل</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>تفعيل العميل</strong> — تحقق SDK أو <code>ActivationManager</code> مع بصمة الأجهزة / معرّف الجهاز.</li>
        <li><strong>تسجيل الخادم</strong> — صف تفعيل: معرّف الترخيص، معلومات الجهاز، الطابع الزمني، الحالة (active، pending approval، blocked).</li>
        <li><strong>التطبيق</strong> — حدود المقاعد تحجب تفعيلات جديدة عند الوصول للحد الأقصى.</li>
        <li><strong>موافقة Node-Locked</strong> — صف معلق حتى يوافق مالك المنتج (عندما يتطلب وضع الربط ذلك).</li>
        <li><strong>حظر</strong> — المشغّل يحظر جهازاً مشبوهاً؛ العميل يفشل عند الفحص عبر الإنترنت التالي.</li>
        <li><strong>إلغاء التفعيل</strong> — العميل أو المشغّل يحرّر المقعد لإعادة الاستخدام.</li>
      </ol>

      <h2>صفحة Activations العامة</h2>
      <p>الشريط الجانبي: <strong>Activations</strong>. عرض عبر المنتجات عندما لا تعرف بعد أي مفتاح ترخيص متورط.</p>
      ${screenshot('platform-activations-global-list.png', 'Activations العامة — بحث، مرشحات، مفتاح الترخيص، الجهاز، أعمدة الحالة')}
      <ul style="margin-left:1.25rem;">
        <li><strong>بحث</strong> — مفتاح الترخيص، بصمة الجهاز، بريد المستخدم، اسم الجهاز.</li>
        <li><strong>Status filter</strong> — active، blocked، pending، deactivated.</li>
        <li><strong>Date presets</strong> — 7D / 30D / 90D / all / نطاق مخصص لنوافذ الحوادث.</li>
        <li><strong>Block / unblock</strong> — رفض إجباري عند الفحص عبر الإنترنت التالي دون حذف السجل.</li>
        <li><strong>Edit notes</strong> — تعليقات دعم مرئية للمشغّلين الآخرين.</li>
        <li><strong>Drill-down</strong> — فتح تفاصيل التفعيل أو الانتقال للترخيص الأب.</li>
      </ul>
      <p>نطاقات API تسرد المنتجات التي تملكها أو تديرها.</p>

      <h2>علامة Activations لكل ترخيص</h2>
      <p>مسار أسرع عندما يمتلك الدعم مفتاح الترخيص بالفعل. نفس دلالات block/unblock والموافقة كالقائمة العامة لكن مُصفّاة مسبقاً لترخيص واحد.</p>
      ${screenshot('platform-node-locked-activations-tab.png', 'علامة Activations لكل ترخيص — صفوف الأجهزة لترخيص واحد')}

      <h2>حسب نموذج الترخيص</h2>
      <table>
        <thead><tr><th>النموذج</th><th>دور التفعيلات</th><th>عرض القائمة النموذجي</th></tr></thead>
        <tbody>
          <tr><td><strong>Node-Locked</strong></td><td>التطبيق الأساسي — جهاز واحد مربوط؛ الموافقة على الربط المعلق</td><td><code>1/1</code></td></tr>
          <tr><td><strong>Concurrent</strong></td><td>حد المقاعد على الأجهزة المسجّلة</td><td><code>3/5</code></td></tr>
          <tr><td><strong>Perpetual online</strong></td><td>تدقيق / أقصى تفعيلات اختياري</td><td><code>2/∞</code> أو محدود</td></tr>
          <tr><td><strong>Floating</strong></td><td>سجل الأجهزة؛ المقاعد غالباً من الجلسات</td><td>يختلف</td></tr>
          <tr><td><strong>Credit-Based / Usage-Based</strong></td><td>تتبع الأجهزة اختياري؛ الاستخدام في علامة Usage</td><td>—</td></tr>
          <tr><td><strong>Offline perpetual / trial</strong></td><td>قد لا ينشئ صفوفاً عبر الإنترنت</td><td>—</td></tr>
        </tbody>
      </table>

      <h2>الأدوار</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>مالك المنتج / Admin</strong> — عرض القائمة العامة، block/unblock، الموافقة على أجهزة node-locked، علامة لكل ترخيص.</li>
        <li><strong>Member / Viewer</strong> — لا واجهة إدارة تفعيلات.</li>
      </ul>

      <p>${link('/api/activations-sessions', 'API التفعيلات والجلسات')} · ${link('/sdk/activation-session', 'تفعيل SDK')} · ${link('/guides/platform/sessions', 'الجلسات')}</p>
    `,
  },
  sessions: {
    title: "الجلسات",
    lead: "اتصالات عبر الإنترنت حية لتطبيق heartbeat والتزامن العائم ومراقبة Perpetual/Node-Locked ورؤية الدعم في الوقت الفعلي.",
    body: `
      <p><strong>الجلسة</strong> تمثل اتصال عميل عبر الإنترنت نشط — المستخدم، الجهاز، إصدار التطبيق، آخر heartbeat. الجلسات تكمل التفعيلات: تراخيص floating تحدّ المستخدمين <em>المتزامنين</em>؛ تراخيص perpetual وnode-locked عبر الإنترنت تستخدم الجلسات للمراقبة الحية والتنظيف.</p>
      <p>جولة مشتركة: ${link('/sessions-activations', 'دليل الجلسات والتفعيلات')} · ${link('/perpetual-license', 'دائم عبر الإنترنت')} · ${link('/node-locked-license', 'مقفل على جهاز عبر الإنترنت')}.</p>

      <h2>دورة حياة الجلسة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>بدء</strong> — SDK <code>SessionManager</code> يفتح جلسة بعد تحقق/تفعيل ناجح.</li>
        <li><strong>نبضات القلب</strong> — ping دوري يبقي الجلسة حية؛ heartbeats راكدة تُعلّم offline.</li>
        <li><strong>Concurrent check</strong> — نموذج floating يعد الجلسات النشطة مقابل <code>maxActiveUsers</code>.</li>
        <li><strong>إنهاء</strong> — إغلاق العميل أو استدعاء end صريح يحرّر المقعد.</li>
        <li><strong>Disconnect (operator)</strong> — إنهاء إجباري من لوحة التحكم للجلسات العالقة.</li>
        <li><strong>تنظيف</strong> — إزالة صفوف offline راكدة بعد تأكيد الدعم أن العميل ذهب.</li>
      </ol>

      <h2>صفحة Sessions العامة</h2>
      <p>الشريط الجانبي: <strong>Sessions</strong> (Active Sessions). مراقبة على نمط NOC لمن متصل الآن.</p>
      ${screenshot('platform-sessions-global-list.png', 'Active Sessions العامة — تبديل Live، بحث، عمر heartbeat، قطع الاتصال')}
      <ul style="margin-left:1.25rem;">
        <li><strong>مباشر</strong> — تحديث تلقائي أثناء التفعيل (عطلات الإصدار، ترحيل التراخيص).</li>
        <li><strong>Online / offline filter</strong> — التركيز على العملاء الحيين مقابل الصفوف التاريخية.</li>
        <li><strong>بحث</strong> — مفتاح الترخيص، بريد المستخدم، اسم الجهاز، إصدار التطبيق.</li>
        <li><strong>قطع الاتصال</strong> — إنهاء عن بُعد؛ العميل يفشل عند heartbeat التالي.</li>
        <li><strong>Details panel</strong> — سلسلة الإصدار، IP/geo عند الجمع، معرّف الجلسة لربط API.</li>
      </ul>

      <h2>علامة Sessions لكل ترخيص</h2>
      <p>نفس البيانات كالصفحة العامة ضمن ترخيص واحد — مثالي لمفتاح perpetual أو node-locked أو floating واحد.</p>
      ${screenshot('platform-node-locked-sessions-tab.png', 'علامة Active Sessions لكل ترخيص مع heartbeat وإجراءات قطع الاتصال')}

      <h2>متى تهم الجلسات</h2>
      <table>
        <thead><tr><th>النموذج</th><th>دور الجلسات</th></tr></thead>
        <tbody>
          <tr><td><strong>Floating</strong></td><td>التطبيق الأساسي — الجلسات الحية المتزامنة = عدد المقاعد</td></tr>
          <tr><td><strong>Perpetual online</strong></td><td>الرؤية، كشف الإساءة، قطع اتصال الدعم</td></tr>
          <tr><td><strong>Node-Locked online</strong></td><td>جلسة نشطة واحدة نموذجية؛ heartbeat يثبت أن العميل ما زال يعمل</td></tr>
          <tr><td><strong>Subscription</strong></td><td>كشف العملاء الراكدين بعد فترة سماح الإلغاء</td></tr>
          <tr><td><strong>Credit-Based / Usage-Based</strong></td><td>تتبع جلسات اختياري إلى جانب قياس علامة Usage</td></tr>
        </tbody>
      </table>

      <h2>الأدوار</h2>
      <p>الرؤية: Admin النظام، org Admin، مالك المنتج (مُصفّى API). Members/Viewers لا يديرون الجلسات.</p>

      <p>${link('/api/activations-sessions', 'موضوع REST')} · ${link('/sdk/activation-session', 'جلسات SDK')} · ${link('/guides/platform/activations', 'التفعيلات')}</p>
    `,
  },
  trials: {
    title: "التجارب",
    lead: "تراخيص تقييم محدودة زمنياً، حملات تجريبية، سير عمل التمديد والتحويل، وكيف تختلف التجارب عن تراخيص الاشتراك.",
    body: `
      <p><strong>تراخيص Trial</strong> هي استحقاقات محدودة زمنياً للتقييم. منطقة <strong>Trials</strong> في لوحة التحكم تجمع تراخيص trial للمراقبة؛ الإنشاء غالباً يستخدم معالج الترخيص القياسي بنوع <strong>Trial</strong> أو مسارات trial مخصصة.</p>

      <h2>دورة حياة التجربة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إصدار</strong> — معالج الترخيص نوع Trial + مدة التجربة (أيام/ساعات).</li>
        <li><strong>تفعيل</strong> — العميل يستخدم المفتاح؛ الساعة تبدأ حسب السياسة (تاريخ الإصدار مقابل أول تفعيل).</li>
        <li><strong>مراقبة</strong> — <code>/dashboard/trials</code> يصفّي Active وExpired وConverted وCancelled.</li>
        <li><strong>تمديد</strong> — المشغّل يضيف وقتاً لمتابعة المبيعات (API + واجهة المستخدم).</li>
        <li><strong>إنهاء مبكر</strong> — المشغّل يلغي التجربة قبل انتهاء الصلاحية الطبيعي.</li>
        <li><strong>تحويل</strong> — استبدال بترخيص perpetual/subscription مدفوع؛ نقل الاستحقاقات/ربط الأجهزة حيث مدعوم.</li>
      </ol>

      <h2>عمليات صفحة Trials</h2>
      <p>الشريط الجانبي: <strong>Trials</strong>. يجمع تراخيص trial-type حتى لا يبحث المبيعات والدعم في قائمة التراخيص الكاملة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Filter by status</strong> — Active، Expired، Converted، Cancelled.</li>
        <li><strong>بحث</strong> — بريد العميل، مفتاح الترخيص، اسم المنتج.</li>
        <li><strong>Extend trial</strong> — دفع تاريخ انتهاء الصلاحية؛ يكتب سجل تدقيق.</li>
        <li><strong>End trial</strong> — انتهاء فوري؛ التحقق يفشل عند فحص SDK أو API التالي.</li>
        <li><strong>إنشاء</strong> — استخدم معالج الترخيص بنوع <strong>Trial</strong> أو اختصار صفحة Trials عند توفره.</li>
        <li><strong>Open license detail</strong> — سياق تفعيلات/جلسات كامل للتصعيد.</li>
      </ul>

      <h2>Trial مقابل subscription</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Trial</strong> — SKU تقييم؛ غالباً مقعد واحد؛ مسارات تسويق؛ قد ينتهي تلقائياً دون دفع.</li>
        <li><strong>Subscription</strong> — مدة متكررة مرتبطة بتجديد الفوترة؛ راجع ${link('/subscription-license', 'نموذج Subscription')}.</li>
      </ul>

      <h2>الأدوار</h2>
      <p>نفس إدارة التراخيص: <strong>مالكو المنتج</strong> و<strong>Admin النظام</strong> يمدّدون/ينهون التجارب. Members لا يصلون لإجراءات إدارة trial.</p>

      <p>${link('/api/trials-transfers', 'API التجارب والنقل')} · ${link('/trial-license', 'نموذج الترخيص التجريبي')} · ${link('/guides/platform/licenses', 'التراخيص (البائع)')} · ${link('/guides/platform/analytics', 'التحليلات')}</p>
    `,
  },
  analytics: {
    title: "التحليلات والإحصائيات",
    lead: "مؤشرات KPI للتبنّي، اتجاهات التفعيل، مزيج التراخيص، التصدير، والتقارير المجدولة عبر المؤسسات والمنتجات.",
    body: `
      <p>لوحة <strong>Analytics</strong> توحّد المقاييس التشغيلية: كم ترخيصاً نشطاً، أين تتصاعد التفعيلات، ضغط تحويل التجارب، وتبنّي على مستوى المنتج. تكمل القوائم اللحظية (Licenses، Activations) بعروض سلاسل زمنية.</p>

      <h2>مسار لوحة التحكم</h2>
      <p>افتح <strong>Analytics</strong> من الشريط الجانبي. صفحة واحدة بأقسام قابلة للتصفية — بدون علامات تبويب فرعية. استخدم منتقي المؤسسة ونطاق التاريخ قبل التصدير أو جدولة التقارير.</p>

      <h2>أقسام الصفحة</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>منتقي المؤسسة</strong> — تحديد الرسوم البيانية لمستأجر واحد (مشغّلون متعددو المؤسسات).</li>
        <li><strong>نطاق التاريخ</strong> — إعدادات مسبقة (7D، 30D، 90D، YTD) ونطاقات مخصصة.</li>
        <li><strong>بطاقات KPI</strong> — إجمالي التراخيص، نشط مقابل منتهٍ، عدد التفعيلات، إحصائيات trial، مقاييس شبيهة بالإيرادات عند تكامل الفوترة.</li>
        <li><strong>الرسوم البيانية</strong> — التفعيلات عبر الزمن، مزيج نوع الترخيص، أعلى المنتجات حسب الاستخدام.</li>
        <li><strong>Ticket KPIs</strong> — عند تفعيل وحدة الدعم، تراكب حجم التذاكر.</li>
      </ul>

      <h2>التصدير والجدولة</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Export dialog</strong> — لقطات PDF وCSV وExcel للمرشحات الحالية.</li>
        <li><strong>Scheduled reports</strong> — إرسال ملخصات متكررة بالبريد لأصحاب المصلحة (حسب النشر/الخطة).</li>
      </ul>

      <h2>أسطح التدقيق ذات الصلة</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/audit-logs</code> — مسار تدقيق بنطاق المستخدم.</li>
        <li>المؤسسة <code>…/audit-logs</code> والمنتج <code>…/audit-logs</code> — مسارات بنطاق.</li>
        <li><code>/dashboard/logs</code> — سجلات مدمجة Admin النظام (audit، login، email، SDK).</li>
      </ul>

      <h2>مصادر البيانات (API)</h2>
      <p>تجميعات من <code>/api/Analytics/…</code> و<code>/api/Statistics/…</code>، بالإضافة إلى ${link('/api/telemetry', 'API القياس عن بُعد والسجلات')} لشحن سجلات SDK وسجلات لوحة التحكم.</p>

      <h2>الأدوار</h2>
      <p>Org Admins ومالكو المنتج يرون analytics بنطاق المؤسسة. System Admin يرى عروضاً على مستوى المنصة. Viewers/Members يرون analytics محدودة أو لا شيء حسب التعيين.</p>

      <p>${link('/guides/platform/organizations', 'المؤسسات')} · ${link('/guides/platform/activations', 'التفعيلات')} · ${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  storage: {
    title: "موصلات التخزين",
    lead: "أرفق ملفات الإصدار عبر Google Drive أو OneDrive أو خادم مخصص بدلاً من دفع ملفات كبيرة عبر API الأساسي في كل رفع.",
    body: `
      <p><strong>موصلات التخزين</strong> تربط LicenPro بمضيفي ملفات خارجيين. استخدمها عندما تعيش المثبتات أو حزم delta أو ملاحظات الإصدار على محركات سحابية أو CDN خاص بك — سجلات الإصدار في LicenPro ما زالت تشير إلى بيانات الإصدار الوصفية بينما تُحلّ الملفات من التخزين البعيد.</p>

      <h2>دورة حياة التخزين</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>اتصال</strong> — مصادقة المزود في مركز Storage.</li>
        <li><strong>تكوين</strong> — اختر المجلدات أو بيانات الاعتماد أو URL أساس الخادم المخصص.</li>
        <li><strong>Upload / link</strong> — ضع الملفات في واجهة المزود أو متصفح تخزين LicenPro.</li>
        <li><strong>Bind to release</strong> — اربط مسار/معرّف الملف عند تعديل ${link('/guides/platform/releases', 'إصدار')}.</li>
        <li><strong>SDK update check</strong> — العميل يحلّ URL التنزيل عبر update API + بيانات التخزين.</li>
        <li><strong>إبطال</strong> — افصل المزود؛ روابط الإصدار الحالية قد تنكسر حتى إعادة الربط.</li>
      </ol>

      <h2>مركز Storage</h2>
      <p>الشريط الجانبي: <strong>Storage</strong>. اربط مضيفي ملفات خارجيين قبل إرفاق الملفات بالإصدارات.</p>

      <h2>مقارنة المزودين</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Google Drive</strong> — OAuth إلى Google؛ تصفح المجلدات؛ upload/list/delete عبر <code>/api/Storage/…</code> أو مسارات Drive.</li>
        <li><strong>OneDrive</strong> — OAuth Microsoft؛ دلالات list/upload مشابهة عبر <code>/api/OneDriveStorage/…</code>.</li>
        <li><strong>Custom server</strong> — نقطة HTTPS خاصة بك؛ LicenPro يوكّل list/upload/delete عبر <code>/api/CustomServerStorage/…</code>؛ يتطلب Pro guard في واجهة المستخدم.</li>
      </ul>

      <h2>سير عمل المشغّل</h2>
      <ol style="margin-left:1.25rem;">
        <li>افتح <strong>Storage</strong> من الشريط الجانبي.</li>
        <li>اختر المزود → أكمل OAuth أو أدخل URL الخادم + بيانات الاعتماد.</li>
        <li>تحقق أن رفع الاختبار يظهر في متصفح المزود.</li>
        <li>عند نشر إصدار، أرفق مرجع الملف بدلاً من تضمين blobs كبيرة في حمولات API.</li>
        <li>تحقق أن مسار تحديث SDK ينزّل من URL المتوقع في staging.</li>
      </ol>

      <h2>الأدوار والخطط</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>مالكو المنتج</strong> — عادةً يكوّنون التخزين المستخدم لإصداراتهم.</li>
        <li><strong>Custom server</strong> — قد يتطلب اشتراك Pro (plan guard على المسار).</li>
        <li><strong>System Admin</strong> — استكشاف أخطاء فشل OAuth للموصل على مستوى المنصة.</li>
      </ul>

      <p>${link('/api/storage', 'موضوع Storage REST')} · ${link('/guides/platform/releases', 'الإصدارات')} · ${link('/sdk/updates-logging', 'تحديثات SDK')}</p>
    `,
  },
  'account-settings': {
    title: "إعدادات الحساب",
    lead: "ملف المشغّل، الأمان، الإشعارات، خطة الاشتراك، الفوترة، مفاتيح REST API، وحذف الحساب — منفصلة عن مفاتيح RSA لكل منتج.",
    body: `
      <p><strong>إعدادات الحساب</strong> تدير <em>أنت</em> كمستخدم للمنصة — وليس منتجاً أو مؤسسة. مفاتيح توقيع المنتج تعيش تحت Product → الإعدادات (${link('/rsa-keys', 'دليل مفاتيح RSA')})؛ <strong>مفاتيح API</strong> للحساب تؤتمت استدعاءات REST ببيانات اعتماد JWT بنطاق.</p>

      <h2>المسار</h2>
      <p>افتح <strong>الإعدادات</strong> (أيقونة الترس) من الشريط الجانبي. العلامات تُقاد بمعامل الاستعلام: profile، security، notifications، manage plan، API keys، ومنطقة الخطر. الفوترة والدفع صفحات مجاورة للترقيات.</p>

      <h2>أقسام الإعدادات</h2>

      <h3>ملفي الشخصي</h3>
      <p>اسم العرض، الصورة الرمزية، بريد الاتصال، تفضيلات المنطقة الزمنية. تحدّث هوية المشغّل المعروضة في سجلات التدقيق والدعوات — وليس بيانات الترخيص أو مفاتيح RSA للمنتج.</p>

      <h3>الأمان</h3>
      <p>تغيير كلمة المرور، المصادقة الثنائية، ومراجعة جلسات تسجيل الدخول النشطة على حساب المشغّل.</p>

      <h3>الإشعارات</h3>
      <p>تفضيلات البريد وداخل التطبيق: أحداث الترخيص، الدعوات، الفوترة، التسويق (حسب المفاتيح). لا تغيّر قياس تطبيق العميل.</p>

      <h3>إدارة الخطة</h3>
      <p>مستوى الاشتراك الحالي (Free مقابل Pro)، حدود المؤسسات والمنتجات وأنواع التراخيص وموصلات التخزين. تدفقات الترقية ترتبط بالدفع. المنتجات المقفلة تعرض <code>isSubscriptionLocked</code> في واجهة المستخدم — المالكون لا يمكنهم الإدارة حتى استعادة الخطة.</p>

      <h3>الفوترة</h3>
      <p>الفواتير وطريقة الدفع وسجل المدفوعات — سطح تجاري مجاور لـ manage plan.</p>

      <h3>مفاتيح API</h3>
      <p>توليد بيانات اعتماد REST بنطاق لـ CI/CD والأدوات الداخلية:</p>
      <ul style="margin-left:1.25rem;">
        <li>الاسم، الوصف، انتهاء اختياري.</li>
        <li>Scopes: Read/Write Licenses، Activations، Products، Releases.</li>
        <li>السر يُعرض مرة واحدة — خزّنه في خزنة (${link('/rsa-keys', 'جولة كاملة لمفاتيح API')}).</li>
      </ul>

      <h3>Danger zone</h3>
      <p>حذف حساب المشغّل — لا رجعة. لا يحذف المؤسسات التي تملكها؛ انقل ملكية المؤسسة أولاً.</p>

      <p>${link('/api/auth-users', 'API المصادقة والمستخدمين')} · ${link('/api/security', 'API الأمان')} · ${link('/api/billing', 'API الفوترة')} · ${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
};
