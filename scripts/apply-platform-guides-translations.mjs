/**
 * Applies Arabic and French translations to extracted EN platform guide JSON files.
 * Run: node scripts/apply-platform-guides-translations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = path.join(__dirname, 'i18n/platform-guides');
const enDir = path.join(base, 'en');

const SLUGS = [
  'overview',
  'organizations',
  'products',
  'releases',
  'features-entitlements',
  'licenses',
  'activations',
  'sessions',
  'trials',
  'analytics',
  'storage',
  'account-settings',
];

/** @type {Record<string, { ar: {title:string,lead:string,body:string}, fr: {title:string,lead:string,body:string} }>} */
const TOPICS = {};

// --- overview ---
TOPICS.overview = {
  ar: {
    title: 'نظرة عامة على النظام',
    lead:
      'كيف يتكامل لوحة تحكم LicenPro وREST API المستضاف وSDKs العميل — من إعداد المنتج الأول حتى التحقق وقت التشغيل في تطبيقك المنشور. SDK ‎.NET موثّق اليوم؛ SDKs بلغات إضافية (مع أمثلة لكل مكدس) في خارطة الطريق.',
    body: String.raw`
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
      <p>قاعدة API المستضاف (السحابة): <code>\${HOST}/api</code>. ملخصات مسار بمسار: \${link('/api/overview', 'نظرة عامة على REST API')}.</p>

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
        <li><strong>تطبيقات العملاء</strong> — تستخدم SDK عميل مدعوماً (اليوم: .NET) أو تستدعي REST API من مكدسك؛ تتحقق من <code>license.bin</code> دون اتصال بالمفتاح العام واختيارياً تحدّث الحالة عبر الإنترنت مقابل <code>\${HOST}/api</code>. SDKs بلغات إضافية وأمثلة لكل لغة (مثل VB وJava وPython) مخططة.</li>
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
      <p>قراءات أعمق: \${link('/guides/platform/organizations', 'المؤسسات')} · \${link('/first-organization', 'أول مؤسسة')} · \${link('/guides/platform/products', 'المنتجات')} · \${link('/guides/platform/releases', 'الإصدارات')} · \${link('/guides/platform/features-entitlements', 'الميزات والاستحقاقات')} · \${link('/rsa-keys', 'مفاتيح RSA')} · \${link('/guides/platform/licenses', 'التراخيص (البائع)')} · \${link('/first-product', 'أول منتج')} · \${link('/first-license', 'أول ترخيص')}.</p>

      <h2>خريطة تنقل لوحة التحكم</h2>
      <p>مناطق الشريط الجانبي الرئيسية وأين تقرأ المزيد:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>الرئيسية</strong> (<code>/dashboard</code>) — عناصر KPI، تراخيص/منتجات حديثة.</li>
        <li><strong>المؤسسات</strong> — \${link('/guides/platform/organizations', 'دليل المؤسسات')} · علامات تبويب: نظرة عامة، المنتجات، الأعضاء، الدعوات، التدقيق، الإعدادات.</li>
        <li><strong>المنتجات</strong> — \${link('/guides/platform/products', 'دليل المنتجات')} · علامات تبويب: نظرة عامة، الميزات، الاستحقاقات، الإصدارات، التراخيص، المستخدمون، مصفوفة الوصول، التدقيق، الإعدادات.</li>
        <li><strong>الإصدارات</strong> — \${link('/guides/platform/releases', 'دليل الإصدارات')} (عام + علامة تبويب لكل منتج).</li>
        <li><strong>التراخيص</strong> — \${link('/guides/platform/licenses', 'دليل التراخيص')} · معالج + علامات تفاصيل (نظرة عامة، التفعيلات، الجلسات، الاستخدام، الجهاز).</li>
        <li><strong>التفعيلات</strong> — \${link('/guides/platform/activations', 'دليل التفعيلات')}.</li>
        <li><strong>الجلسات</strong> — \${link('/guides/platform/sessions', 'دليل الجلسات')}.</li>
        <li><strong>التجارب</strong> — \${link('/guides/platform/trials', 'دليل التجارب')}.</li>
        <li><strong>التخزين</strong> — \${link('/guides/platform/storage', 'دليل التخزين')} (Drive وOneDrive وخادم مخصص).</li>
        <li><strong>التحليلات</strong> — \${link('/guides/platform/analytics', 'دليل التحليلات')}.</li>
        <li><strong>إعدادات الحساب</strong> — \${link('/guides/platform/account-settings', 'إعدادات الحساب')} (الملف الشخصي، الأمان، الخطة، مفاتيح API).</li>
        <li><strong>تدقيقي</strong> (<code>/dashboard/audit-logs</code>) — سجل تدقيق شخصي؛ راجع دليل التحليلات.</li>
      </ul>

      <h2>المرحلة 2 — التشغيل (REST API)</h2>
      <p>منتصف المخطط: الحد المستضاف عند <code>\${HOST}/api</code> (استبدل المضيف عند الاستضافة الذاتية).</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>التحقق عبر الإنترنت</strong> — <code>POST /api/Licenses/validate</code> مع <code>X-API-KEY</code> للمنتج عندما تريد أن يقيّم الخادم السياسة أو ربط الأجهزة أو الإبطال في الوقت الفعلي.</li>
        <li><strong>التفعيلات والجلسات</strong> — فرض مقاعد اختياري، تزامن عائم، ورؤية على نمط نبضات القلب للدعم والامتثال.</li>
        <li><strong>القياس عن بُعد والتحديثات</strong> — مسارات موجهة لـ SDK للإعدادات وبيانات التحديث وشحن السجلات الاختياري (راجع موضوعات SDK لكيفية استدعاء المديرين).</li>
        <li><strong>الأتمتة</strong> — تزويد أو إيقaf التراخيص من مهام الخلفية باستخدام مسارات إدارة بنطاق JWT حيث يسمح RBAC.</li>
      </ul>
      <p>ابدأ هنا: \${link('/api/overview', 'نظرة عامة على REST API')} · \${link('/api/licenses', 'API التراخيص')} · \${link('/api/activations-sessions', 'التفعيلات والجلسات')} · \${link('/api/telemetry', 'القياس عن بُعد والسجلات')}.</p>

      <h2>المرحلة 3 — التطبيق (SDKs العميل)</h2>
      <p>الجانب الأيمن من المخطط: كود يُشحن داخل عمليتك. <strong>.NET</strong> مغطّى بالكامل في هذا الموقع اليوم؛ SDKs إضافية و<strong>أمثلة مخصصة لكل لغة</strong> (بما في ذلك VB وJava وPython وغيرها) ستظهر هنا عند إصدارها. حتى ذلك الحين، أي مكدس يمكنه استخدام عقد HTTPS نفسه كـ REST API.</p>
      <p>الخطوات التالية تستخدم أنواع و<strong>.NET</strong> ونقاط الدخول اليوم؛ SDKs أخرى ستعكس دورة الحياة نفسها بواجهات API أصيلة لكل لغة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Bootstrap مرة واحدة</strong> — حل <code>ServerBaseEndpoint</code> (يجب أن يتضمن <code>/api</code>)، حمّل إعدادات JSON إن استخدمتها، ثم شغّل <code>SdkBootstrap.OnApplicationStartup()</code> على م hosts سطح المكتب قبل الواجهة.</li>
        <li><strong>الثقة دون اتصال</strong> — <code>LicenseClient</code> يتحقق من توقيع RSA على <code>license.bin</code> باستخدام المادة العامة المضمّنة؛ لا مفتاح خاص في العميل.</li>
        <li><strong>التحديث عبر الإنترنت</strong> — مسارات اختيارية إلى <code>\${HOST}/api</code> لتحديث التحقق والتفعيلات والجلسات واستخدام الميزات والتحديثات الواعية بالترخيص.</li>
      </ul>
      <p>تابع مع \${link('/sdk/overview', 'نظرة عامة على SDK ‎.NET')} · \${link('/sdk/configuration', 'التكوين وBootstrap')} · \${link('/sdk/dotnet', 'تكامل .NET')} · \${link('/sdk/license-client', 'دورة حياة LicenseClient')}.</p>

      <h2>مسارات وقت التشغيل الاختيارية</h2>
      <p>بعد عمل الحلقة الأساسية، تضيف الفرق عادةً واحداً أو أكثر مما يلي:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>التفعيلات والجلسات</strong> — \${link('/sessions-activations', 'دليل الجلسات والتفعيلات')} وصفحات \${link('/guides/platform/activations', 'التفعيلات')} / \${link('/guides/platform/sessions', 'الجلسات')} في المنصة.</li>
        <li><strong>نماذج الترخيص</strong> — دائم، تجريبي، اشتراك، عائم، متزامن، مقفل على جهاز، قائم على الرصيد، قائم على الاستخدام (الشريط الجانبي <em>نماذج الترخيص</em>).</li>
        <li><strong>Webhooks</strong> — \${link('/webhooks', 'Webhooks')} لأحداث دورة الحياة إلى خلفيتك دون استطلاع.</li>
        <li><strong>التحديثات والتسجيل</strong> — \${link('/sdk/updates-logging', 'تحديثات SDK والتسجيل')} لفحوص التحديث الواعية بالترخيص والسجلات المنظمة.</li>
      </ul>
    `,
  },
  fr: {
    title: "Vue d'ensemble du système",
    lead:
      "Comment le tableau de bord LicenPro, l'API REST hébergée et les SDK clients s'articulent — de la première configuration produit jusqu'à la validation à l'exécution dans votre application livrée. Le SDK .NET est documenté aujourd'hui ; des SDK pour d'autres langages (avec exemples par stack) sont prévus.",
    body: String.raw`
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/overview1.png" data-doc-image-alt="Flux LicenPro : tableau de bord pour la configuration éditeur, API REST pour les opérations runtime, et SDK clients dans les applications clientes (SDK multilingues et exemples prévus)" aria-label="Afficher le diagramme de flux en taille réelle">
          <img src="assets/docs/overview1.png" alt="Flux LicenPro : tableau de bord pour la configuration éditeur, API REST pour les opérations runtime, et SDK clients dans les applications clientes (SDK multilingues et exemples prévus)" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">Cliquez sur l'image pour ouvrir l'aperçu en pleine résolution.</figcaption>
      </figure>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">Trois surfaces</span>
        <p><strong>Tableau de bord</strong> (JWT) : les éditeurs y définissent produits, versions, clés et licences.
        L'<strong>API REST</strong> est la frontière d'automatisation et runtime pour la validation, les activations, les sessions et la télémétrie.
        Les <strong>SDK clients</strong> s'intègrent dans votre application et vérifient le matériel de licence signé avec la clé publique du produit. Le <strong>SDK .NET</strong> est disponible aujourd'hui ; LicenPro étend vers des <strong>SDK de première classe pour plus de langages et runtimes</strong> (par ex. VB, Java, Python), et cette documentation ajoutera des <strong>exemples spécifiques à chaque langage</strong> pour chaque stack aux côtés de l'API REST — tout environnement peut s'intégrer via HTTPS en attendant.</p>
      </div></div>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-key" aria-hidden="true"></i><div>
        <span class="callout-title">Identifiants en un coup d'œil</span>
        <p><strong>Appels HTTP tableau de bord et gestion</strong> : <code>Authorization: Bearer &lt;JWT&gt;</code> après connexion. Ce JWT est lié à <strong>votre session opérateur</strong> (qui vous êtes dans le portail éditeur). Utilisez-le pour les routes qui gèrent institutions, produits, licences, etc. — ne le collez jamais dans les applications clientes.</p>
        <p><strong>Validation anonyme depuis serveurs ou SDK client</strong> : <code>X-API-KEY</code> du produit sur des routes comme <code>POST /api/Licenses/validate</code>. Vous <strong>créez et copiez cette clé depuis le tableau de bord</strong> dans la <strong>zone API / identifiants du produit</strong>, ou là où votre déploiement l'affiche pour l'utilisateur connecté (y compris pages <strong>compte ou profil</strong> listant les clés produit). Ce n'est <strong>pas</strong> votre mot de passe. Traitez-la comme un secret : stockez-la en config serveur ou coffre sécurisé ; intégrez-la aux binaires utilisateur final uniquement si vous l'embarquez volontairement pour des appels produit anonymes.</p>
        <p><strong>Matériel de signature RSA</strong> : chaque produit a une <strong>clé privée de signature</strong> qui reste sur LicenPro / votre frontière hébergée — <strong>ne la distribuez jamais</strong> et <strong>ne la mettez jamais</strong> dans les binaires clients. Apps et SDK n'utilisent que la <strong>clé publique</strong> (ou matériel public équivalent) pour vérifier que <code>license.bin</code> a été signé pour ce produit. En bref : <strong>JWT</strong> = opérateur éditeur ; <strong>X-API-KEY</strong> = identité produit pour appels API anonymes ; <strong>clé publique</strong> = vérifier les licences sur le terrain ; <strong>clé privée</strong> = reste côté serveur uniquement.</p>
      </div></div>
      <p>Base API hébergée (cloud) : <code>\${HOST}/api</code>. Résumés route par route : \${link('/api/overview', 'Vue d\'ensemble API REST')}.</p>

      <h2>Qui fait quoi</h2>
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-overview-who-does-what.png" data-doc-image-alt="Qui fait quoi : opérateurs éditeur dans le tableau de bord, intégrateurs et automatisation depuis CI et facturation, applications clientes avec SDK ou HTTPS — le tout via l'API REST LicenPro" aria-label="Afficher le diagramme qui fait quoi en taille réelle">
          <img src="assets/docs/platform-overview-who-does-what.png" alt="Qui fait quoi : opérateurs éditeur dans le tableau de bord, intégrateurs et automatisation depuis CI et facturation, applications clientes avec SDK ou HTTPS — le tout via l'API REST LicenPro" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">Cliquez sur l'image pour ouvrir l'aperçu en pleine résolution.</figcaption>
      </figure>
      <ul style="margin-left:1.25rem;">
        <li><strong>Opérateurs éditeur</strong> — travaillent dans le tableau de bord navigateur sous votre institution ; création quotidienne de produits, versions, clés et licences.</li>
        <li><strong>Intégrateurs et automatisation</strong> — appellent la même surface HTTPS depuis CI, facturation ou outils internes (JWT pour routes opérateur, ou clé produit uniquement où la route est conçue pour accès anonyme).</li>
        <li><strong>Applications clientes</strong> — utilisent un SDK client supporté (aujourd'hui : .NET) ou appellent l'API REST depuis votre stack ; vérifient <code>license.bin</code> hors ligne avec la clé publique et rafraîchissent optionnellement l'état en ligne contre <code>\${HOST}/api</code>. Plus de SDK par langage et exemples prévus (p.ex. VB, Java, Python).</li>
      </ul>

      <h2>Phase 1 — Configurer (tableau de bord)</h2>
      <p>C'est le côté gauche du diagramme : tout ce que vous faites avant qu'une machine cliente n'exécute votre app.</p>
      <ol style="margin-left:1.25rem;">
        <li><strong>Institution</strong> — frontière locataire pour membres, invitations et produits.</li>
        <li><strong>Produit</strong> — ancrage pour clés API, versions, droits et chaque licence émise.</li>
        <li><strong>Versions</strong> — lignes de version pour cibler builds ou canaux dans licences et contrôles de mise à jour.</li>
        <li><strong>Fonctionnalités et jeux de droits</strong> — regroupement optionnel de capacités en SKU assignés aux licences.</li>
        <li><strong>Clés RSA</strong> — générer par produit avant d'émettre des licences ; seule la clé publique est distribuée aux apps.</li>
        <li><strong>Licences</strong> — choisir le modèle (perpétuel, essai, abonnement, flottant, concurrent, nœud verrouillé, basé crédits, basé usage, …), définir limites, exporter <code>license.bin</code> et la clé de licence.</li>
      </ol>
      <p>Lectures approfondies : \${link('/guides/platform/organizations', 'Institutions')} · \${link('/first-organization', 'Première institution')} · \${link('/guides/platform/products', 'Produits')} · \${link('/guides/platform/releases', 'Versions')} · \${link('/guides/platform/features-entitlements', 'Fonctionnalités et droits')} · \${link('/rsa-keys', 'Clés RSA')} · \${link('/guides/platform/licenses', 'Licences (éditeur)')} · \${link('/first-product', 'Premier produit')} · \${link('/first-license', 'Première licence')}.</p>

      <h2>Carte de navigation du tableau de bord</h2>
      <p>Zones principales de la barre latérale et où en savoir plus :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Accueil</strong> (<code>/dashboard</code>) — widgets KPI, licences/produits récents.</li>
        <li><strong>Institutions</strong> — \${link('/guides/platform/organizations', 'Guide institutions')} · onglets : Aperçu, Produits, Membres, Invitations, Audit, Paramètres.</li>
        <li><strong>Produits</strong> — \${link('/guides/platform/products', 'Guide produits')} · onglets : Aperçu, Fonctionnalités, Droits, Versions, Licences, Utilisateurs, Matrice d'accès, Audit, Paramètres.</li>
        <li><strong>Versions</strong> — \${link('/guides/platform/releases', 'Guide versions')} (global + onglet par produit).</li>
        <li><strong>Licences</strong> — \${link('/guides/platform/licenses', 'Guide licences')} · assistant + onglets détail (Aperçu, Activations, Sessions, Usage, Appareil).</li>
        <li><strong>Activations</strong> — \${link('/guides/platform/activations', 'Guide activations')}.</li>
        <li><strong>Sessions</strong> — \${link('/guides/platform/sessions', 'Guide sessions')}.</li>
        <li><strong>Essais</strong> — \${link('/guides/platform/trials', 'Guide essais')}.</li>
        <li><strong>Stockage</strong> — \${link('/guides/platform/storage', 'Guide stockage')} (Drive, OneDrive, serveur personnalisé).</li>
        <li><strong>Analytique</strong> — \${link('/guides/platform/analytics', 'Guide analytique')}.</li>
        <li><strong>Paramètres du compte</strong> — \${link('/guides/platform/account-settings', 'Paramètres du compte')} (profil, sécurité, forfait, clés API).</li>
        <li><strong>Mon audit</strong> (<code>/dashboard/audit-logs</code>) — piste d'audit personnelle ; voir guide Analytique.</li>
      </ul>

      <h2>Phase 2 — Exploiter (API REST)</h2>
      <p>Le centre du diagramme : la frontière hébergée à <code>\${HOST}/api</code> (substituez votre hôte en auto-hébergement).</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Validation en ligne</strong> — <code>POST /api/Licenses/validate</code> avec <code>X-API-KEY</code> produit quand vous voulez que le serveur évalue politique, liaison matérielle ou révocation en temps réel.</li>
        <li><strong>Activations et sessions</strong> — application optionnelle des sièges, concurrence flottante et visibilité type heartbeat pour support et conformité.</li>
        <li><strong>Télémétrie et mises à jour</strong> — routes SDK pour paramètres, métadonnées de mise à jour et envoi optionnel de logs (voir sujets SDK).</li>
        <li><strong>Automatisation</strong> — provisionner ou retirer des licences depuis jobs backend via routes gestion JWT selon votre RBAC.</li>
      </ul>
      <p>Commencez ici : \${link('/api/overview', 'Vue d\'ensemble API REST')} · \${link('/api/licenses', 'API Licences')} · \${link('/api/activations-sessions', 'Activations et sessions')} · \${link('/api/telemetry', 'Télémétrie et logs')}.</p>

      <h2>Phase 3 — Appliquer (SDK clients)</h2>
      <p>Le côté droit : code embarqué dans votre processus. <strong>.NET</strong> est entièrement couvert sur ce site aujourd'hui ; d'autres SDK et <strong>exemples dédiés par langage</strong> (VB, Java, Python, etc.) apparaîtront ici à mesure de leur publication. En attendant, toute stack peut utiliser le même contrat HTTPS que l'API REST.</p>
      <p>Les étapes suivantes utilisent les types et points d'entrée <strong>.NET</strong> actuels ; d'autres SDK reproduiront le même cycle de vie avec des API idiomatiques par langage.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Bootstrap une fois</strong> — résoudre <code>ServerBaseEndpoint</code> (doit inclure <code>/api</code>), charger les paramètres JSON si utilisés, puis exécuter <code>SdkBootstrap.OnApplicationStartup()</code> sur hôtes desktop avant l'UI.</li>
        <li><strong>Confiance hors ligne</strong> — <code>LicenseClient</code> vérifie la signature RSA sur <code>license.bin</code> avec le matériel de clé publique embarqué ; pas de clé privée côté client.</li>
        <li><strong>Rafraîchissement en ligne</strong> — chemins optionnels vers <code>\${HOST}/api</code> pour rafraîchissement validation, activations, sessions, usage fonctionnalités et mises à jour sensibles à la licence.</li>
      </ul>
      <p>Poursuivre avec \${link('/sdk/overview', 'Vue d\'ensemble SDK .NET')} · \${link('/sdk/configuration', 'Configuration et bootstrap')} · \${link('/sdk/dotnet', 'Intégration .NET')} · \${link('/sdk/license-client', 'Cycle de vie LicenseClient')}.</p>

      <h2>Chemins runtime optionnels</h2>
      <p>Après la boucle principale, les équipes ajoutent généralement un ou plusieurs des éléments suivants :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Activations et sessions</strong> — \${link('/sessions-activations', 'Guide sessions et activations')} et pages \${link('/guides/platform/activations', 'Activations')} / \${link('/guides/platform/sessions', 'Sessions')}.</li>
        <li><strong>Modèles de licence</strong> — perpétuel, essai, abonnement, flottant, concurrent, nœud verrouillé, basé crédits, basé usage (barre latérale <em>Modèles de licence</em>).</li>
        <li><strong>Webhooks</strong> — \${link('/webhooks', 'Webhooks')} pour événements de cycle de vie vers votre backend sans polling.</li>
        <li><strong>Mises à jour et logging</strong> — \${link('/sdk/updates-logging', 'Mises à jour SDK et logging')} pour contrôles de mise à jour sensibles à la licence et logs structurés.</li>
      </ul>
    `,
  },
};

for (const locale of ['ar', 'fr']) {
  const dir = path.join(base, locale);
  fs.mkdirSync(dir, { recursive: true });
}

for (const slug of SLUGS) {
  if (!TOPICS[slug]) {
    console.warn('Missing translation for', slug);
    continue;
  }
  for (const locale of ['ar', 'fr']) {
    const out = path.join(base, locale, `${slug}.json`);
    fs.writeFileSync(out, JSON.stringify(TOPICS[slug][locale], null, 2));
    console.log('wrote', locale, slug);
  }
}

console.log('Done partial translations:', Object.keys(TOPICS).join(', '));
