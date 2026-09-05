export default {
  ar: {
    title: 'الإصدارات',
    lead:
      'خطوط إصدار البرمجيات التي تستهدفها التراخيص ويستخدمها فاحص التحديث. القائمة العامة مقابل علامة المنتج، مستويات الإصدار، ودورة الحياة من المسودة إلى مهمل.',
    body: String.raw`
      <p><strong>إصدار البرمجيات</strong> هو خط إصدار تحت منتج — مثل <code>1.0.0 Stable</code> أو <code>2.0.0-beta</code>. كل ترخيص صادر يشير إلى معرّف إصدار حتى يعرف التحقق والاستحقاقات وفحوص التحديث أي قناة build تنطبق.</p>

      <h2>لماذا الإصدارات مهمة في دورة الحياة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إنشاء المنتج</strong> — الإصدار الأولي يزرع أول إصدار (راجع \${link('/first-product', 'أول منتج')}).</li>
        <li><strong>إنشاء الترخيص</strong> — المشغّل يختار <code>softwareReleaseId</code> في الخطوة 1 من المعالج.</li>
        <li><strong>تحقق SDK</strong> — حمولة الترخيص تحمل بيانات الإصدار؛ إصدار التطبيق غير المتطابق قد يفشل فحوص السياسة.</li>
        <li><strong>التحديثات</strong> — مديرو تحديث SDK و<code>/api/Updates/…</code> يقارنون إصدار العميل بفهرس الإصدارات.</li>
        <li><strong>Access matrix</strong> — منح الأعضاء وصولاً لكل صف إصدار، وليس المنتج فقط.</li>
      </ol>

      <h2>علامة تبويب Product Releases</h2>
      <p>السطح الأساسي للمشغّل لإدارة الإصدارات داخل مساحة عمل المنتج. عنصر الشريط الجانبي <strong>Releases</strong> العام يعرض نفس البيانات عبر جميع المنتجات التي يمكنك الوصول إليها.</p>
      \${screenshot('platform-product-releases-list.png', 'علامة Product Releases: قائمة الإصدارات مع النوع والحالة وعدد التراخيص')}

      <h2>حقول الإصدار (نموذجية)</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>سلسلة الإصدار</strong> — دلالية (<code>1.0.0</code>)، ما قبل الإصدار (<code>1.0.0-alpha.1</code>)، بسيطة (<code>1</code>)، أو مبنية على build (<code>1.0.0.1</code>) حسب اختيار المعالج.</li>
        <li><strong>مستوى الإصدار</strong> — Stable (إنتاج)، Beta، Alpha، RC — يشير لتوقعات الدعم وسياسة التحديث.</li>
        <li><strong>الحالة</strong> — Draft (مخفية عن المستخدمين النهائيين) مقابل Published (مرئية في الفهارس ومعالج الترخيص).</li>
        <li><strong>الملاحظات / سجل التغيير</strong> — نص للمشغّل يُعرض في صفحة تفاصيل الإصدار واختيارياً في بيانات التحديث.</li>
        <li><strong>مجموعات الاستحقاق</strong> — ربط المجموعات التي تنطبق على خط الإصدار هذا (انظر الخطوة 2 من المعالج).</li>
        <li><strong>الملفات</strong> — المثبتات عبر \${link('/guides/platform/storage', 'موصلات التخزين')} (Google Drive، OneDrive، خادم مخصص) بدلاً من رفع API كبير.</li>
      </ul>

      <h2>سير عمل المشغّل</h2>
      <ol style="margin-left:1.25rem;">
        <li>افتح المنتج → علامة <strong>Releases</strong> (أو قائمة Releases العامة).</li>
        <li><strong>إنشاء إصدار</strong> — الخطوة 1: تنسيق الإصدار، رقم الإصدار، مستوى الإصدار، draft مقابل published.</li>
        <li>الخطوة 2: اختر مجموعات الاستحقاق التي تنطبق على هذا build.</li>
        <li>الخطوة 3: أرفق ملفات من التخزين أو مراجع الرفع.</li>
        <li>الخطوة 4: سجل التغيير وملاحظات الإصدار لفرق الدعم.</li>
        <li>أصدر تراخيص مقابل معرّف هذا الإصدار <em>قبل</em> أن يرقّي العملاء builds التطبيق.</li>
        <li>عند الإهمال، أرشف الإصدار القديم بعد ترحيل التراخيص أو فرض قناة تحديث.</li>
      </ol>
      \${screenshot('platform-create-release-basic-info.png', 'Create Release الخطوة 1: تنسيق الإصدار ومستوى الإصدار وحالة draft أو published')}

      <h2>صفحة تفاصيل الإصدار</h2>
      <p>تُفتح من صف في جدول الإصدارات أو القائمة العامة. تعرض كل ما يحتاجه الدعم لخط إصدار واحد.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>شارات الرأس</strong> — أسلوب الإصدار (Semantic)، المستوى (Stable)، وحالة Published.</li>
        <li><strong>Changelog &amp; release notes</strong> — سرد قابل للتعديل للمشغّلين والعملاء.</li>
        <li><strong>مجموعات الاستحقاق</strong> — أي SKUs تنطبق على هذا الإصدار.</li>
        <li><strong>بطاقة الملفات</strong> — ملف تخزين مرتبط مع إجراء تنزيل سحابي (مثل ملف Google Drive).</li>
        <li><strong>Edit</strong> — تحديث البيانات الوصفية دون إعادة إنشاء معرّف الإصدار (يُفضّل إصدار جديد لزيادات الإصدار الكاسرة).</li>
      </ul>
      \${screenshot('platform-release-detail.png', 'صفحة تفاصيل الإصدار: سجل التغيير والملاحظات ومجموعات الاستحقاق وتنزيل ملف Google Drive')}

      <h2>الأدوار</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>مالك المنتج / system Admin</strong> — إنشاء وتعديل وحذف الإصدارات.</li>
        <li><strong>Member معيّن مع صف matrix</strong> — عرض صفوف الإصدار المسموحة؛ قد يفعّل تراخيص على الخطوط المسموحة فقط.</li>
        <li><strong>Viewer</strong> — قراءة فقط حسب matrix.</li>
      </ul>

      <h2>API &amp; SDK</h2>
      <p>مسارات الفهرس على <code>/api/Products/…</code> ونقاط نهاية خاصة بالإصدار في \${link('/api/catalog', 'catalog API')}. SDK: \${link('/sdk/updates-logging', 'التحديثات والتسجيل')} لفحوص التحديث الواعية بالترخيص.</p>
    `,
  },
  fr: {
    title: 'Versions',
    lead:
      "Lignes de version logicielle ciblées par les licences et utilisées par le vérificateur de mises à jour. Liste globale vs onglet produit, niveaux de version et cycle de vie du brouillon à déprécié.",
    body: String.raw`
      <p>Une <strong>version logicielle</strong> est une ligne de version sous un produit — p.ex. <code>1.0.0 Stable</code> ou <code>2.0.0-beta</code>. Chaque licence émise référence un id version pour que validation, droits et contrôles mise à jour sachent quel canal build s'applique.</p>

      <h2>Pourquoi les versions comptent dans le cycle de vie</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Création produit</strong> — version initiale amorce la première version (voir \${link('/first-product', 'Premier produit')}).</li>
        <li><strong>Création licence</strong> — opérateur choisit <code>softwareReleaseId</code> à l'étape 1 de l'assistant.</li>
        <li><strong>Validation SDK</strong> — charge licence porte métadonnées version ; version app incompatible peut échouer contrôles politique.</li>
        <li><strong>Mises à jour</strong> — gestionnaires mise à jour SDK et <code>/api/Updates/…</code> comparent version client au catalogue versions.</li>
        <li><strong>Access matrix</strong> — accorder membres accès par ligne version, pas seulement par produit.</li>
      </ol>

      <h2>Onglet Product Releases</h2>
      <p>Surface opérateur principale pour gestion versions dans l'espace produit. L'élément sidebar <strong>Releases</strong> global montre les mêmes données sur tous les produits accessibles.</p>
      \${screenshot('platform-product-releases-list.png', 'Onglet Product Releases : liste versions avec type, statut et comptes licences')}

      <h2>Champs version (typiques)</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Chaîne version</strong> — sémantique (<code>1.0.0</code>), pré-version (<code>1.0.0-alpha.1</code>), simple (<code>1</code>) ou basée build (<code>1.0.0.1</code>) selon choix assistant.</li>
        <li><strong>Niveau version</strong> — Stable (production), Beta, Alpha, RC — signale attentes support et politique mise à jour.</li>
        <li><strong>Statut</strong> — Draft (caché aux utilisateurs finaux) vs Published (visible catalogues et assistant licence).</li>
        <li><strong>Notes / changelog</strong> — texte opérateur sur page détail version et optionnellement dans métadonnées mise à jour.</li>
        <li><strong>Jeux de droits</strong> — lier sets applicables à cette ligne version (voir étape 2 assistant).</li>
        <li><strong>Artefacts</strong> — installateurs via \${link('/guides/platform/storage', 'Connecteurs stockage')} (Google Drive, OneDrive, serveur personnalisé) au lieu de gros uploads API.</li>
      </ul>

      <h2>Workflow opérateur</h2>
      <ol style="margin-left:1.25rem;">
        <li>Ouvrir produit → onglet <strong>Releases</strong> (ou liste Releases globale).</li>
        <li><strong>Créer version</strong> — étape 1 : format versionnement, numéro version, niveau version, draft vs published.</li>
        <li>Étape 2 : choisir jeux de droits applicables à ce build.</li>
        <li>Étape 3 : attacher fichiers depuis stockage ou références upload.</li>
        <li>Étape 4 : changelog et notes de version pour équipes support.</li>
        <li>Émettre licences contre cet id version <em>avant</em> que clients mettent à jour builds app.</li>
        <li>À la dépréciation, archiver ancienne version après migration licences ou forçage canal mise à jour.</li>
      </ol>
      \${screenshot('platform-create-release-basic-info.png', 'Assistant Create Release étape 1 : format versionnement, niveau version et statut draft ou published')}

      <h2>Page détail version</h2>
      <p>Ouverte depuis une ligne du tableau versions ou liste globale. Montre tout ce dont le support a besoin pour une ligne version.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Badges en-tête</strong> — style versionnement (Semantic), niveau (Stable) et statut Published.</li>
        <li><strong>Changelog &amp; release notes</strong> — récit éditable pour opérateurs et clients.</li>
        <li><strong>Jeux de droits</strong> — quels SKU s'appliquent à cette version.</li>
        <li><strong>Carte fichiers</strong> — artefact stockage lié avec action téléchargement cloud (p.ex. fichier Google Drive).</li>
        <li><strong>Edit</strong> — mettre à jour métadonnées sans recréer id version (préférer nouvelle version pour bumps breaking).</li>
      </ul>
      \${screenshot('platform-release-detail.png', 'Page détail version : changelog, notes, jeux de droits et téléchargement fichier Google Drive')}

      <h2>Rôles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Propriétaire produit / system Admin</strong> — créer, modifier, supprimer versions.</li>
        <li><strong>Member assigné avec ligne matrix</strong> — voir lignes version autorisées ; peut activer licences sur lignes permises uniquement.</li>
        <li><strong>Viewer</strong> — lecture seule selon matrix.</li>
      </ul>

      <h2>API &amp; SDK</h2>
      <p>Routes catalogue sur <code>/api/Products/…</code> et endpoints spécifiques version dans \${link('/api/catalog', 'API catalogue')}. SDK : \${link('/sdk/updates-logging', 'Mises à jour &amp; logging')} pour contrôles mise à jour sensibles à la licence.</p>
    `,
  },
};
