export default {
  ar: {
    title: 'المنتجات',
    lead:
      'مرساة مفاتيح RSA والإصدارات والاستحقاقات والتراخيص وبيانات اعتماد API. كل علامة تبويب للمنتج ونوع الوصول وقواعد المالك وأقسام الإعدادات موضّحة.',
    body: String.raw`
      <p><strong>المنتج</strong> هو البرنامج الذي ترخّصه. جميع ملفات الترخيص وحركة التحقق ومفاتيح التوقيع RSA وقيم <code>X-API-KEY</code> للمنتج تنتمي لمعرّف منتج واحد. المؤسسات تعيّن المنتجات للمستأجرين؛ <strong>مالكو المنتج</strong> يديرون الترخيص اليومي.</p>
      <p>جولة: \${link('/first-product', 'إنشاء أول منتج')} · \${link('/rsa-keys', 'مفاتيح RSA &amp; بيانات اعتماد API')}.</p>

      <h2>دورة حياة المنتج</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إنشاء</strong> — الاسم، إصدار/مستوى الإصدار الأولي، نوع الوصول (Associated مقابل Opened)، وصف وصورة اختياريان.</li>
        <li><strong>تكوين</strong> — Features، مجموعات الاستحقاق، إعدادات تحديث العميل، مفاتيح RSA في Settings.</li>
        <li><strong>الطاقم</strong> — إضافة أعضاء المؤسسة في علامة تبويب <strong>Users</strong>؛ تحسين وصول الإصدار في <strong>Access Matrix</strong>.</li>
        <li><strong>إصدار</strong> — شحن خطوط الإصدار تحت علامة <strong>Releases</strong> (\${link('/guides/platform/releases', 'دليل الإصدارات')}).</li>
        <li><strong>إصدار التراخيص</strong> — علامة <strong>Licenses</strong> أو القائمة العامة (\${link('/guides/platform/licenses', 'دليل التراخيص')}).</li>
        <li><strong>تشغيل</strong> — التفعيلات والجلسات والتحليلات مصفّاة لهذا المنتج.</li>
        <li><strong>إيقاف</strong> — إلغاء التفعيل أو الحذف من danger zone في Settings (يتتابع الإصدارات والتراخيص).</li>
      </ol>

      <h2>أنواع الوصول: Associated مقابل Opened</h2>
      <p>يُختار عند الإنشاء؛ يقود واجهة المستخدم وقواعد الترخيص:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Associated (المؤسسة)</strong> — سير عمل بائع كامل. جميع علامات تبويب المنتج، جميع أنواع التراخيص (خاضعاً للخطة). التراخيص مرتبطة بسياق المؤسسة؛ مستخدمو المؤسسة المعيّنة فقط يصلون للمنتج.</li>
        <li><strong>Opened (All users)</strong> — توزيع مبسّط. لوحة التحكم تعرض فقط علامتي <strong>Overview</strong> و<strong>Releases</strong>. إنشاء الترخيص مقيّد (مثل أنماط perpetual offline)؛ مخصص لفهارس برمجيات مفتوحة على نطاق واسع.</li>
      </ul>

      <h2>علامات تبويب المنتج (عرض المالك الكامل)</h2>
      <p>رؤية العلامات تُحسب في تخطيط المنتج:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>منتجات Opened</strong> — Overview + Releases فقط.</li>
        <li><strong>مستخدم نهائي</strong> (ليس في <code>owners[]</code>، وليس system Admin) — Overview، Releases، Licenses (بدون Settings، Users، Access Matrix، Audit، Features، Entitlements).</li>
        <li><strong>مالك المنتج أو system Admin</strong> — جميع العلامات أدناه.</li>
      </ul>

      <h3>Overview</h3>
      <p>علامة التبويب الافتراضية بعد فتح منتج. تؤكد نوع الوصول، قائمة المالكين، خط الإصدار الحالي، وعدد التراخيص قبل إصدار المفاتيح أو تعديل الاستحقاقات.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>شارة الحالة</strong> — Active مقابل locked (حدود الاشتراك/الخطة قد تحجب الإدارة).</li>
        <li><strong>عدّ سريع</strong> — الإصدارات، التراخيص، التفعيلات الأخيرة حيث تعرضها واجهة المستخدم.</li>
        <li><strong>Owners</strong> — من يمكنه إدارة مفاتيح RSA وUsers وAccess Matrix وCRUD التراخيص.</li>
        <li><strong>هبوط المستخدم النهائي</strong> — Members المعيّنون غالباً يبدأون هنا ثم يفتحون Releases أو Licenses.</li>
      </ul>

      <h3>Features</h3>
      <p>فهرس القدرات لهذا المنتج. كل ميزة تصبح مفتاحاً ثابتاً يتحقق منه تطبيقك وقت التشغيل عبر SDK <code>FeatureManager</code>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Feature</strong> — الاسم، الوصف، والتعيين لمجموعات الاستحقاق (وسوم Groub/Group في واجهة المستخدم).</li>
        <li><strong>Search</strong> — تصفية فهارس طويلة قبل التجميع في مجموعات.</li>
        <li><strong>لا تتخطّ المفاتيح</strong> — مفاتيح الميزات يجب أن تبقى ثابتة عبر الإصدارات؛ إعادة التسمية تكسر الاستحقاقات الموقّعة في الميدان.</li>
      </ul>
      <p>تعمّق: \${link('/guides/platform/features-entitlements', 'الميزات والاستحقاقات')}.</p>

      <h3>Entitlement Sets</h3>
      <p>SKUs قابلة لإعادة الاستخدام تجمع الميزات لإصدار التراخيص. المشغّلون يختارون مجموعة في معالج الترخيص بدلاً من تبديل عشرات الأعلام لكل عميل.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Set</strong> — الاسم، الوصف، الإصدارات المرتبطة، وميزات الأعضاء بقيم لكل ميزة.</li>
        <li><strong>نطاق الإصدار</strong> — المجموعات يمكنها استهداف خطوط إصدار محددة (مثل 1.0.0 مقابل 1.0.3).</li>
        <li><strong>معالج الترخيص</strong> — قائمة منسدلة اختيارية في الخطوة 1 ترفق استحقاقات معبّأة بمفاتيح جديدة.</li>
      </ul>

      <h3>Releases</h3>
      <p>خطوط الإصدار لهذا المنتج. كل ترخيص يرتبط بمعرّف إصدار واحد للتحقق ونطاق الاستحقاق وفحوص تحديث SDK.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>New Release</strong> — معالج متعدد الخطوات: معلومات أساسية، مجموعات استحقاق، ملفات، ملاحظات.</li>
        <li><strong>أعمدة الجدول</strong> — الإصدار، النوع (Stable/Beta/…)، حالة النشر، تواريخ الإنشاء/الإصدار، عدد التراخيص.</li>
        <li><strong>القائمة العامة</strong> — <strong>Releases</strong> في الشريط الجانبي يعرض عرضاً عبر المنتجات؛ علامة المنتج هي المسار الأساسي للمشغّل.</li>
      </ul>
      <p>راجع \${link('/guides/platform/releases', 'دليل الإصدارات')} لـ draft مقابل published وربط الملفات.</p>

      <h3>Licenses</h3>
      <p>إصدار وتعديل وإلغاء وتنزيل مادة الترخيص لهذا المنتج.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create</strong> — معالج من خطوتين (النوع، المنتج، الإصدار، مجموعة الاستحقاق → المقاعد، انتهاء الصلاحية، الملاحظات).</li>
        <li><strong>توزيع</strong> — سلسلة مفتاح الترخيص + <code>license.bin</code> الموقّع من عرض التفاصيل.</li>
        <li><strong>عرض العضو</strong> — المستخدمون المعيّنون يرون التراخيص التي يمكنهم تفعيلها؛ أزرار الإدارة تتطلب الملكية.</li>
        <li><strong>الأنواع</strong> — perpetual، trial، subscription، floating، concurrent، node-locked، credit-based، usage-based (\${link('/guides/platform/licenses', 'دليل التراخيص')}).</li>
      </ul>

      <h3>Users</h3>
      <p>إعداد أعضاء المؤسسة على هذا المنتج. المستخدمون المضافون هنا يحصلون على نطاق المنتج لكن <strong>لا وصول للإصدار حتى Access Matrix يمنح الإصدارات</strong>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>اختيار المؤسسة</strong> — القائمة المنسدلة تسرد المؤسسات حيث هذا المنتج معيّن.</li>
        <li><strong>اختيار متعدد للأعضاء</strong> — اختر أشخاصاً ليسوا على المنتج بعد.</li>
        <li><strong>حالة فارغة</strong> — عندما كل عضو المؤسسة معيّن بالفعل، النافذة توضح أن الإعداد مكتمل.</li>
        <li><strong>Owners</strong> — مدرجون في <code>product.owners</code>؛ منفصلون عن تعيين علامة Users.</li>
      </ul>
      \${screenshot('platform-product-add-user.png', 'نافذة Add User: إعداد أعضاء المؤسسة على المنتج')}

      <h3>Access Matrix</h3>
      <p>منح دقيق لكل مستخدم ولكل إصدار. أساسي عندما ينبغي لـ Members المؤسسة رؤية خطوط إصدار محددة فقط أو عندما يحتاج Viewers وصول قراءة فقط للإصدار.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Manage Access</strong> — قائمة مربعات اختيار لجميع الإصدارات المنشورة بالإضافة إلى <strong>Grant to all versions</strong> (يشمل الإصدارات المستقبلية).</li>
        <li><strong>Search versions</strong> — تصفية قوائم إصدار طويلة داخل النافذة.</li>
        <li><strong>شريط الحالة</strong> — يعرض كم إصداراً لدى المستخدم مقابل الإجمالي المتاح.</li>
        <li><strong>بدون صفوف matrix</strong> — Members المعيّنون قد يرون المنتج لكن لا يمكنهم تفعيل تراخيص على إصدارات محجوبة.</li>
      </ul>
      \${screenshot('platform-product-access-matrix-manage.png', 'نافذة Manage Access: منح وصول الإصدار لكل مستخدم بما في ذلك الإصدارات المستقبلية')}

      <h3>Audit Logs</h3>
      <p>مسار تدقيق بنطاق المنتج — أضيق من تدقيق المؤسسة لكن يشمل أحداث دورة حياة الترخيص المرتبطة بهذا البرنامج.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>إجراءات نموذجية</strong> — LicenseCreated، LicenseDeleted، LicenseFileDownload، InvitationSent (عندما ينطبق سياق المنتج).</li>
        <li><strong>المرشحات والتصدير</strong> — نفس نمط تدقيق المؤسسة: الإجراء، نوع الكيان، نطاق التاريخ، تصدير CSV.</li>
        <li><strong>سير عمل الدعم</strong> — ربط تذكرة العميل بـ IP والطابع الزمني قبل إلغاء مفتاح.</li>
      </ul>
      \${screenshot('platform-product-audit-logs.png', 'علامة تبويب Product Audit Logs: إنشاء الترخيص والتنزيل ونشاط الدعوات')}

      <h3>Settings</h3>
      <p>مالكو المنتج يكوّنون سلوك وقت التشغيل والمادة التشفيرية. المستخدمون النهائيون وغير المالكين لا يرون هذه العلامة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — الاسم، الوصف، الحالة، نوع الوصول (حيث يمكن تعديله بعد الإنشاء).</li>
        <li><strong>Client product updates</strong> — تبديل <strong>Offer product updates to clients</strong>؛ عند التعطيل، واجهات التحديث لا تعيد ترقية لهذا المنتج.</li>
        <li><strong>License signing keys (RSA)</strong> — توليد، إعادة توليد، تنزيل PEM العام؛ المفتاح الخاص لا يغادر الخادم (\${link('/rsa-keys', 'دليل RSA')}).</li>
        <li><strong>Danger zone</strong> — حذف المنتج؛ الإصدارات والتراخيص تتتابع.</li>
      </ul>
      <p><strong>تحذير التدوير:</strong> إعادة توليد مفاتيح RSA تبطل ملفات <code>license.bin</code> الحالية حتى يعيد العملاء تنزيل التراخيص وتضمّن التطبيقات المفتاح العام الجديد.</p>
      \${screenshot('platform-product-settings-rsa-keys.png', 'Product Settings: تبديل تحديثات العميل ومفاتيح توقيع الترخيص مع إعادة التوليد وتنزيل المفتاح العام')}

      <h2>من يمكنه فعل ماذا على المنتجات</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>System Admin (JWT)</strong> — يتجاوز كثيراً من فحوص الملكية على API؛ يرى sidebar الإدارة.</li>
        <li><strong>مالك المنتج</strong> — مجموعة علامات كاملة (باستثناء تقليم Opened)؛ إنشاء/تعديل التراخيص، مفاتيح RSA، Users، Access Matrix.</li>
        <li><strong>Member معيّن</strong> — Overview، Releases، Licenses (استهلاك/تفعيل حسب matrix)؛ بدون Settings.</li>
        <li><strong>Viewer</strong> — مسارات قراءة فقط عبر access matrix؛ بدون إنشاء ترخيص.</li>
        <li><strong>Org Admin بدون ملكية</strong> — إدارة فريق المؤسسة لكن ليس مفاتيح RSA للمنتج ما لم يُدرج أيضاً كمالك.</li>
      </ul>

      <h2>REST &amp; وقت التشغيل</h2>
      <p><code>/api/Products/…</code> — CRUD، مسارات مفتاح RSA، الإعدادات. تطبيقات العملاء تستخدم <code>X-API-KEY</code> للمنتج على مسارات الترخيص المجهولة — وليس JWT المشغّل.</p>
      <p>\${link('/api/catalog', 'API المنتجات والإصدارات')} · \${link('/api/licenses', 'API التراخيص')} · \${link('/sdk/dotnet', 'SDK .NET')} · \${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  fr: {
    title: 'Produits',
    lead:
      "Ancrage pour clés RSA, versions, droits, licences et identifiants API. Chaque onglet produit, type d'accès, règle propriétaire et section paramètres expliqués.",
    body: String.raw`
      <p>Un <strong>produit</strong> est le logiciel que vous licencez. Tous les fichiers licence, le trafic de validation, les clés de signature RSA et les valeurs <code>X-API-KEY</code> produit appartiennent à un id produit. Les institutions assignent des produits aux locataires ; les <strong>propriétaires produit</strong> gèrent le licensing au quotidien.</p>
      <p>Parcours : \${link('/first-product', 'Créer votre premier produit')} · \${link('/rsa-keys', 'Clés RSA &amp; identifiants API')}.</p>

      <h2>Cycle de vie produit</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Créer</strong> — nom, version/niveau version initiale, type d'accès (Associated vs Opened), description et image optionnelles.</li>
        <li><strong>Configurer</strong> — Features, jeux de droits, paramètres mises à jour client, clés RSA dans Settings.</li>
        <li><strong>Équipe</strong> — ajouter membres institution sur onglet <strong>Users</strong> ; affiner accès version sur <strong>Access Matrix</strong>.</li>
        <li><strong>Publier</strong> — livrer lignes de version sous onglet <strong>Releases</strong> (\${link('/guides/platform/releases', 'Guide versions')}).</li>
        <li><strong>Émettre licences</strong> — onglet <strong>Licenses</strong> ou liste globale (\${link('/guides/platform/licenses', 'Guide licences')}).</li>
        <li><strong>Exploiter</strong> — activations, sessions, analytics filtrés à ce produit.</li>
        <li><strong>Retirer</strong> — désactiver ou supprimer depuis danger zone Settings (cascade versions et licences).</li>
      </ol>

      <h2>Types d'accès : Associated vs Opened</h2>
      <p>Choisi à la création ; pilote UI et règles licence :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Associated (Institution)</strong> — workflow éditeur complet. Tous onglets produit, tous types licence (selon forfait). Licences liées au contexte institution ; seuls utilisateurs institution assignés accèdent au produit.</li>
        <li><strong>Opened (All users)</strong> — distribution simplifiée. Tableau de bord n'affiche que <strong>Overview</strong> et <strong>Releases</strong>. Création licence restreinte (p.ex. patterns perpetual offline) ; destiné aux catalogues logiciels largement ouverts.</li>
      </ul>

      <h2>Onglets produit (vue propriétaire complète)</h2>
      <p>Visibilité onglets calculée dans le layout produit :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Produits Opened</strong> — Overview + Releases uniquement.</li>
        <li><strong>Utilisateur final</strong> (pas dans <code>owners[]</code>, pas system Admin) — Overview, Releases, Licenses (pas Settings, Users, Access Matrix, Audit, Features, Entitlements).</li>
        <li><strong>Propriétaire produit ou system Admin</strong> — tous les onglets ci-dessous.</li>
      </ul>

      <h3>Overview</h3>
      <p>Onglet par défaut à l'ouverture d'un produit. Confirme type d'accès, liste propriétaires, ligne version courante et comptes licences avant d'émettre des clés ou modifier droits.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Badge statut</strong> — Active vs locked (limites abonnement/forfait peuvent bloquer gestion).</li>
        <li><strong>Comptes rapides</strong> — versions, licences, activations récentes où l'UI les affiche.</li>
        <li><strong>Owners</strong> — qui peut gérer clés RSA, Users, Access Matrix et CRUD licences.</li>
        <li><strong>Atterrissage utilisateur final</strong> — Members assignés commencent souvent ici puis ouvrent Releases ou Licenses.</li>
      </ul>

      <h3>Features</h3>
      <p>Catalogue de capacités pour ce produit. Chaque feature devient une clé stable que votre app vérifie à l'exécution via SDK <code>FeatureManager</code>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Feature</strong> — nom, description et assignation à groupes de droits (tags Groub/Group dans l'UI).</li>
        <li><strong>Search</strong> — filtrer longs catalogues avant regroupement en sets.</li>
        <li><strong>Ne sautez pas les clés</strong> — clés feature doivent rester stables entre versions ; renommer casse droits signés sur le terrain.</li>
      </ul>
      <p>Approfondir : \${link('/guides/platform/features-entitlements', 'Fonctionnalités &amp; droits')}.</p>

      <h3>Entitlement Sets</h3>
      <p>SKU réutilisables regroupant features pour émission licence. Opérateurs choisissent un set dans l'assistant licence au lieu de basculer des dizaines de flags par client.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Set</strong> — nom, description, versions liées et features membres avec valeurs par feature.</li>
        <li><strong>Portée version</strong> — sets peuvent cibler lignes version spécifiques (p.ex. 1.0.0 vs 1.0.3).</li>
        <li><strong>Assistant licence</strong> — liste déroulante optionnelle étape 1 attache droits empaquetés aux nouvelles clés.</li>
      </ul>

      <h3>Releases</h3>
      <p>Lignes de version pour ce produit. Chaque licence se lie à un id version pour validation, portée droits et contrôles mise à jour SDK.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>New Release</strong> — assistant multi-étapes : infos de base, jeux de droits, fichiers, notes.</li>
        <li><strong>Colonnes tableau</strong> — version, type (Stable/Beta/…), statut publié, dates création/sortie, nombre licences.</li>
        <li><strong>Liste globale</strong> — <strong>Releases</strong> sidebar montre vue cross-produit ; onglet produit est le chemin opérateur principal.</li>
      </ul>
      <p>Voir \${link('/guides/platform/releases', 'Guide versions')} pour draft vs published et liaison artefacts.</p>

      <h3>Licenses</h3>
      <p>Émettre, modifier, révoquer et télécharger matériel licence pour ce produit.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create</strong> — assistant deux étapes (type, produit, version, jeu droits → sièges, expiration, notes).</li>
        <li><strong>Distribuer</strong> — chaîne clé licence + <code>license.bin</code> signé depuis vue détail.</li>
        <li><strong>Vue membre</strong> — utilisateurs assignés voient licences activables ; boutons gestion requièrent propriété.</li>
        <li><strong>Types</strong> — perpetual, trial, subscription, floating, concurrent, node-locked, credit-based, usage-based (\${link('/guides/platform/licenses', 'Guide licences')}).</li>
      </ul>

      <h3>Users</h3>
      <p>Intégrer membres institution sur ce produit. Utilisateurs ajoutés ici obtiennent portée produit mais <strong>pas d'accès version tant qu'Access Matrix n'accorde pas les versions</strong>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Sélectionner institution</strong> — liste déroulante des institutions où ce produit est assigné.</li>
        <li><strong>Multi-sélection membres</strong> — choisir personnes pas encore sur le produit.</li>
        <li><strong>État vide</strong> — quand chaque membre institution est déjà assigné, la modale indique onboarding terminé.</li>
        <li><strong>Owners</strong> — listés dans <code>product.owners</code> ; séparés de l'assignation onglet Users.</li>
      </ul>
      \${screenshot('platform-product-add-user.png', 'Modale Add User : intégrer membres institution au produit')}

      <h3>Access Matrix</h3>
      <p>Octrois fins par utilisateur et par version. Essentiel quand Members institution ne doivent voir que lignes version spécifiques ou quand Viewers ont besoin d'accès version lecture seule.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Manage Access</strong> — liste cases à cocher de toutes versions publiées plus <strong>Grant to all versions</strong> (inclut versions futures).</li>
        <li><strong>Search versions</strong> — filtrer longues listes version dans la modale.</li>
        <li><strong>Bannière statut</strong> — montre combien de versions un utilisateur a vs total disponible.</li>
        <li><strong>Sans lignes matrix</strong> — Members assignés peuvent voir le produit mais pas activer licences sur versions bloquées.</li>
      </ul>
      \${screenshot('platform-product-access-matrix-manage.png', 'Modale Manage Access : accorder accès version par utilisateur y compris versions futures')}

      <h3>Audit Logs</h3>
      <p>Piste audit à portée produit — plus étroite qu'audit institution mais inclut événements cycle vie licence liés à ce logiciel.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Actions typiques</strong> — LicenseCreated, LicenseDeleted, LicenseFileDownload, InvitationSent (quand contexte produit s'applique).</li>
        <li><strong>Filtres &amp; export</strong> — même pattern qu'audit org : action, type entité, plage dates, export CSV.</li>
        <li><strong>Workflow support</strong> — corréler ticket client avec IP et horodatage avant révocation clé.</li>
      </ul>
      \${screenshot('platform-product-audit-logs.png', 'Onglet Product Audit Logs : création licence, téléchargement et activité invitations')}

      <h3>Settings</h3>
      <p>Propriétaires produit configurent comportement runtime et matériel cryptographique. Utilisateurs finaux et non-propriétaires ne voient pas cet onglet.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — nom, description, statut, type d'accès (où modifiable après création).</li>
        <li><strong>Client product updates</strong> — bascule <strong>Offer product updates to clients</strong> ; si désactivé, APIs mise à jour ne renvoient pas d'upgrade pour ce produit.</li>
        <li><strong>License signing keys (RSA)</strong> — générer, régénérer, télécharger PEM public ; clé privée ne quitte jamais le serveur (\${link('/rsa-keys', 'Guide RSA')}).</li>
        <li><strong>Danger zone</strong> — supprimer produit ; versions et licences cascadent.</li>
      </ul>
      <p><strong>Avertissement rotation :</strong> régénérer clés RSA invalide fichiers <code>license.bin</code> existants jusqu'à re-téléchargement licences et intégration nouvelle clé publique dans les apps.</p>
      \${screenshot('platform-product-settings-rsa-keys.png', 'Product Settings : bascule mises à jour client et clés signature licence avec régénération et téléchargement clé publique')}

      <h2>Qui peut faire quoi sur les produits</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>System Admin (JWT)</strong> — contourne beaucoup de contrôles propriété sur API ; voit sidebar admin.</li>
        <li><strong>Propriétaire produit</strong> — jeu d'onglets complet (sauf trim Opened) ; créer/modifier licences, clés RSA, Users, Access Matrix.</li>
        <li><strong>Member assigné</strong> — Overview, Releases, Licenses (consommer/activer selon matrix) ; pas Settings.</li>
        <li><strong>Viewer</strong> — chemins lecture seule via access matrix ; pas création licence.</li>
        <li><strong>Org Admin sans propriété</strong> — gestion équipe institution mais pas clés RSA produit sauf aussi listé comme owner.</li>
      </ul>

      <h2>REST &amp; runtime</h2>
      <p><code>/api/Products/…</code> — CRUD, routes clé RSA, paramètres. Apps clientes utilisent <code>X-API-KEY</code> produit sur routes licence anonymes — pas votre JWT opérateur.</p>
      <p>\${link('/api/catalog', 'API Produits &amp; versions')} · \${link('/api/licenses', 'API Licences')} · \${link('/sdk/dotnet', 'SDK .NET')} · \${link('/guides/platform/overview', 'Vue d\'ensemble système')}</p>
    `,
  },
};
