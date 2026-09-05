/** @type {{ ar: {title:string,lead:string,body:string}, fr: {title:string,lead:string,body:string} }} */
export default {
  ar: {
    title: 'المؤسسات',
    lead:
      'حد المستأجر لفريقك ومنتجاتك والدعوات وسياق التدقيق. افهم أدوار المؤسسة، كل علامة تبويب في لوحة التحكم، ودورة حياة الأعضاء من الدعوة حتى الإزالة.',
    body: String.raw`
      <p>كل بائع يعمل داخل <strong>مؤسسة</strong> — مستأجر يجمع الأشخاص والمنتجات المعيّنة والسياسات وسجل التدقيق. تُصدر التراخيص تحت <strong>المنتجات</strong>، لكن المؤسسة تحدد من يمكنه رؤيتها وإدارتها.</p>
      <p>جولة الإعداد: \${link('/first-organization', 'إنشاء أول مؤسسة')}.</p>

      <h2>نموذج الأدوار (اقرأ هذا أولاً)</h2>
      <p>LicenPro يستخدم <strong>ثلاث طبقات صلاحيات</strong>. وثائق لوحة التحكم غالباً تذكر «admin» بأكثر من معنى — اربط كل إجراء بالطبقة الصحيحة:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>دور JWT النظام</strong> — <code>Admin</code> (مشغّل المنصة) أو <code>User</code> (بائع مسجّل). يتحكم في عناصر الشريط الجانبي مثل سجلات النظام والتذاكر والمشتركين. <em>لا</em> يجعل شخصاً تلقائياً مالك منتج.</li>
        <li><strong>دور المؤسسة</strong> — عضويتك في المستأجر: <code>Owner</code>، <code>Admin</code>، <code>ProductOwner</code>، <code>Member</code>، <code>Viewer</code>، أو <code>ResellerAdmin</code> (backend). يُخزّن كـ <code>myRole</code> على سجل المؤسسة.</li>
        <li><strong>ملكية المنتج</strong> — مدرجة في <code>product.owners</code>. مطلوبة لـ CRUD التراخيص ومفاتيح RSA وعلامة تبويب المستخدمين ومصفوفة الوصول ومعظم إجراءات الإعدادات — حتى لو كان دورك في المؤسسة Admin.</li>
      </ul>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">واجهة المستخدم مقابل API</span>
        <p>بعض حراس المسارات يتحققون فقط من أنك مستخدم منصة مسجّل. <strong>الفحوصات الموثوقة تعمل على API.</strong> إذا ظهر زر لكن الخادم يعيد 403، فدورك في المؤسسة أو المنتج يفتقر إلى تلك الصلاحية.</p>
      </div></div>

      <h2>دورة حياة المؤسسة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>إنشاء</strong> — معالج في <code>/dashboard/organizations</code> (الهوية: الاسم، الموقع، دور الدخول الافتراضي؛ العلامة التجارية: الشعار، الألوان، الوصف).</li>
        <li><strong>تكوين</strong> — علامة تبويب الإعدادات: السياسات (التسجيل الذاتي، الموافقة)، دور العضو الافتراضي، العلامة التجارية.</li>
        <li><strong>دعوة</strong> — دعوات بريد إلكتروني مع دور؛ القبول عبر <code>/auth/accept-invitation?token=…</code> (يتطلب تسجيل الدخول).</li>
        <li><strong>تعيين المنتجات</strong> — ربط المنتجات بالمؤسسة؛ إضافة مالكي المنتجات وصفوف مصفوفة الوصول لكل إصدار.</li>
        <li><strong>تشغيل</strong> — الأعضاء يستخدمون تحليلات نظرة عامة على المؤسسة؛ المسؤولون يديرون الفريق والتدقيق.</li>
        <li><strong>نقل أو حذف</strong> — نقل الملكية (Owner)؛ حذف المؤسسة (Owner فقط، مدمر).</li>
      </ol>

      <h2>علامات تبويب المؤسسة</h2>
      <p>كل علامة تبويب هي مسار فرعي تحت تخطيط المؤسسة. علامات تبويب <strong>الأعضاء</strong> و<strong>الدعوات</strong> و<strong>سجلات التدقيق</strong> و<strong>الإعدادات</strong> تظهر فقط عندما يكون <code>myRole</code> <code>Owner</code> أو <code>Admin</code> أو <code>ProductOwner</code> أو <code>ResellerAdmin</code>. <strong>نظرة عامة</strong> و<strong>المنتجات</strong> مرئية لجميع الأعضاء.</p>

      <h3>نظرة عامة</h3>
      <p>علامة تبويب الهبوط الافتراضية عند فتح مؤسسة. استخدمها للإجابة «ماذا يحدث في هذا المستأجر الآن؟» قبل التعمق في المنتجات أو التراخيص.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>بطاقات ملخص</strong> — عدد الأعضاء، المنتجات المعيّنة، إجماليات التراخيص، واتجاهات التفعيل ضمن هذه المؤسسة.</li>
        <li><strong>مزيج التراخيص</strong> — عرض سريع للمفاتيح الدائمة والتجريبية والاشتراك والعائمة والمتزامنة المرتبطة بمنتجات المؤسسة.</li>
        <li><strong>النشاط الأخير</strong> — اختصارات لأحدث أحداث التراخيص وتغييرات الفريق دون فتح سجلات التدقيق.</li>
        <li><strong>تبديل السياق</strong> — إذا كنت تنتمي لعدة مؤسسات، تأكد من اسم المؤسسة في الرأس قبل التصرف على البيانات.</li>
      </ul>
      <p><strong>مهام نموذجية:</strong> فحص صحة أسبوعي، لقطة تنفيذية قبل مكالمة تجديد، التحقق من وصول تعيين منتج جديد.</p>

      <h3>المنتجات</h3>
      <p>كتalog المنتجات البرمجية المرتبطة بهذه المؤسسة. التعيين هنا <em>لا</em> يصدر تراخيص — يمنح المؤسسة (وأعضاءها) الرؤية ومسارات الوصول للمنتجات التي أنشأتها بالفعل في حساب البائع.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>تعيين منتج</strong> — Owner / Admin يفتح <strong>Assign Product</strong>، يبحث في كتalog البائع، ويربط منتجاً أو أكثر. يرى الأعضاء بعدها المنتجات المعيّنة في هذه العلامة وفي الشريط الجانبي (خاضعاً لقواعد مصفوفة الوصول على كل منتج).</li>
        <li><strong>إلغاء التعيين</strong> — يزيل ربط المؤسسة؛ لا يحذف المنتج أو تراخيصه على مستوى المنصة.</li>
        <li><strong>عرض العضو</strong> — Members وViewers يرون فقط المنتجات المعيّنة لهم أو الممنوحة عبر صفوف مصفوفة الوصول لكل إصدار — وليس كل منتج في حسابك.</li>
        <li><strong>الخطوة التالية</strong> — بعد التعيين، مالكو المنتج يضيفون مستخدمين وصفوف مصفوفة في مساحة عمل المنتج (\${link('/guides/platform/products', 'دليل المنتجات')}).</li>
      </ul>
      \${screenshot('platform-organization-assign-product.png', 'نافذة Assign Product: اختيار المنتجات لربطها بالمؤسسة')}

      <h3>الأعضاء</h3>
      <p>دليل الفريق الموثوق للمؤسسة: من ينتمي، أي دور مؤسسة يحمل، ومتى انضم.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>دعوة</strong> — بريد + دور: Member، Viewer، ProductOwner، أو Admin (Owner فقط يمكنه تعيين Admin).</li>
        <li><strong>تغيير الدور</strong> — Owner، Admin، أو ResellerAdmin؛ قواعد Owner-only تنطبق عند الترقية إلى Admin.</li>
        <li><strong>إزالة</strong> — Owner، Admin، ProductOwner، ResellerAdmin؛ لا يمكن إزالة Owner.</li>
        <li><strong>الدور مقابل وصول المنتج</strong> — دور المؤسسة يتحكم في علامات تبويب المؤسسة؛ مالكو المنتج ومصفوفة الوصول يتحكمون في عمل الترخيص لكل منتج.</li>
      </ul>
      <p><strong>دليل سريع للأدوار:</strong> Member = المساهمة في المنتجات المعيّنة؛ Viewer = قراءة فقط؛ ProductOwner = إدارة المنتجات/التراخيص دون إدارة كاملة للمؤسسة؛ Admin = الفريق + الإعدادات باستثناء إجراءات Owner-only.</p>
      \${screenshot('platform-organization-invite-member.png', 'نافذة Invite Team Member: البريد، الدور المعيّن، ورسالة الدعوة')}

      <h3>الدعوات</h3>
      <p>قائمة انتظار تشغيلية للأشخاص الذين لم يقبلوا بعد. استخدمها عندما يتعطل الإعداد أو تحتاج إلغاء دعوة خاطئة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>الحالة</strong> — Pending، منتهية، أو ملغاة؛ تصفية وبحث ببريد المستلم.</li>
        <li><strong>إعادة الإرسال</strong> — يولّد بريداً برمز جديد دون تغيير الدور المختار.</li>
        <li><strong>إلغاء</strong> — يبطل الرابط فوراً؛ يجب أن يستلم المستلم دعوة جديدة.</li>
        <li><strong>انتهاء الصلاحية</strong> — كل صف يعرض متى ينتهي الرمز؛ الدعوات المنتهية لا يمكن قبولها حتى إعادة الإرسال.</li>
        <li><strong>الأدوار في واجهة المستخدم</strong> — Member، Viewer، Admin في هذه العلامة؛ علامة Members تقدم أيضاً ProductOwner عند الدعوة.</li>
      </ul>
      \${screenshot('platform-organization-invitations.png', 'علامة تبويب Institution Team Invitations: دعوات معلقة مع الدور والحالة وانتهاء الصلاحية')}

      <h3>سجلات التدقيق</h3>
      <p>مسار غير قابل للتغيير ضمن المؤسسة للامتثال والدعم: من غيّر عضوية الفريق أو المنتجات المعيّنة أو إعدادات المؤسسة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>الأعمدة</strong> — الطابع الزمني، الإجراء (مثل InvitationSent، LicenseCreated)، المنتج، نوع الكيان، اسم الكيان، عنوان IP.</li>
        <li><strong>المرشحات</strong> — نوع الإجراء، نوع الكيان، نطاق التاريخ، وبحث نص حر عبر المستخدم أو الكيان أو المنتج.</li>
        <li><strong>تصدير CSV</strong> — تنزيل العرض المصفّى لـ SIEM أو تحليل جدول بيانات.</li>
        <li><strong>التفاصيل</strong> — أيقونة العين تفتح حمولة منظمة لحدث واحد.</li>
        <li><strong>اقترن مع التحليلات</strong> — التدقيق لحظة زمنية؛ \${link('/guides/platform/analytics', 'التحليلات')} تعرض اتجاهات عبر الزمن.</li>
      </ul>
      \${screenshot('platform-organization-audit-logs.png', 'علامة تبويب Institution Audit Logs: نشاط التراخيص والدعوات مع مرشحات وتصدير')}

      <h3>الإعدادات</h3>
      <p>تكوين يركز على Owner مقسّم إلى أقسام فرعية (تنقل يسار داخل Settings):</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>عام</strong> — اسم الكيان، معرف السجل، وصف نص غني، وURL الموقع العام المعروض في ملف المؤسسة.</li>
        <li><strong>العلامة التجارية</strong> — الشعار والألوان لعرض المؤسسة في لوحة التحكم والدعوات.</li>
        <li><strong>السياسات</strong> — <code>allowSelfRegistration</code>، <code>requireApprovalForJoining</code>، و<code>defaultMemberRole</code> للمنضمين الجدد (Member، Viewer، أو Admin).</li>
        <li><strong>الحوكمة</strong> — نقل الملكية ومفاتيح سياسة متقدمة حيث يعرضها نشرك.</li>
        <li><strong>منطقة الخطر</strong> — حذف المؤسسة (Owner فقط؛ لا رجعة؛ التراخيص تحت منتجات المؤسسة قد تتتابع حسب سياسة الخادم).</li>
      </ul>
      <p><strong>قبل الحفظ:</strong> الوصف والموقع موجهان للعملاء في رأس المؤسسة؛ تغييرات السياسة تؤثر على الدعوة أو محاولة التسجيل الذاتي التالية، وليس بأثر رجعي على الأعضاء الحاليين.</p>
      \${screenshot('platform-organization-settings-general.png', 'Institution Settings General Configuration: الاسم، الوصف، الموقع، وتنقل فرعي للعلامة التجارية')}

      <h2>مصفوفة أدوار المؤسسة</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Owner</strong> — تحكم كامل في المستأجر: حذف المؤسسة، نقل الملكية، تعيين Admin، جميع عمليات الدعوة/الإزالة/الدور.</li>
        <li><strong>Admin</strong> — دعوة، تغيير الأدوار (ليس إلى Owner؛ لا يمكن تعيين Admin — ذلك Owner-only)، إزالة الأعضاء؛ لا يمكن حذف المؤسسة.</li>
        <li><strong>ProductOwner</strong> — دعوة وإزالة الأعضاء؛ إدارة المنتجات/التراخيص المعيّنة؛ لا حذف مؤسسة أو ترقية Admin.</li>
        <li><strong>Member</strong> — عرض نظرة عامة على المؤسسة والمنتجات المعيّنة؛ استخدام التراخيص حسب مصفوفة وصول المنتج؛ لا علامات إدارة أعضاء في واجهة المستخدم.</li>
        <li><strong>Viewer</strong> — وصول قراءة فقط للمؤسسة؛ رؤية المنتج عبر مصفوفة الوصول فقط.</li>
        <li><strong>ResellerAdmin</strong> — دور backend يُعامل مثل Admin لكثير من عمليات المؤسسة (عرض جزئي في واجهة المستخدم).</li>
      </ul>

      <h2>سير عمل الدعوة (خطوة بخطوة)</h2>
      <ol style="margin-left:1.25rem;">
        <li>Admin يفتح <strong>Members</strong> أو <strong>Invitations</strong> → <strong>Invite</strong>.</li>
        <li>أدخل البريد، اختر الدور، رسالة اختيارية → إرسال.</li>
        <li>المستلم يستلم بريداً برابط رمز.</li>
        <li>المستلم يسجّل الدخول (أو يسجّل) → <code>/auth/accept-invitation?token=…</code>.</li>
        <li>عند النجاح، يُضاف المستخدم للمؤسسة بالدور المختار → إعادة توجيه إلى <code>/dashboard/organization/:orgId</code>.</li>
        <li>المشغّل يمكنه إعادة الإرسال أو إلغاء الصفوف المعلقة من <strong>Invitations</strong>.</li>
      </ol>

      <h2>أتمتة REST</h2>
      <p>المسارات تحت <code>/api/Organization/…</code> تعكس تدفقات لوحة التحكم: CRUD، الأعضاء، الدعوات، السياسات. استخدم JWT المشغّل أو مفاتيح API للحساب ذات النطاق (\${link('/rsa-keys', 'دليل مفاتيح API')}).</p>
      <p>\${link('/api/organizations', 'API المؤسسات')} · \${link('/api/auth-users', 'Auth &amp; users')} · \${link('/guides/platform/products', 'المنتجات')} · \${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  fr: {
    title: 'Institutions',
    lead:
      "Frontière locataire pour votre équipe, vos produits, vos invitations et le contexte d'audit. Comprenez les rôles d'institution, chaque onglet du tableau de bord et le cycle de vie des membres de l'invitation au retrait.",
    body: String.raw`
      <p>Chaque éditeur opère au sein d'une <strong>institution</strong> — un locataire qui regroupe personnes, produits assignés, politiques et historique d'audit. Les licences sont émises sous des <strong>produits</strong>, mais l'institution définit qui peut les voir et les gérer.</p>
      <p>Parcours d'intégration : \${link('/first-organization', 'Créer votre première institution')}.</p>

      <h2>Modèle de rôles (lisez ceci en premier)</h2>
      <p>LicenPro utilise <strong>trois couches de permissions</strong>. La doc du tableau de bord mentionne souvent « admin » dans plusieurs sens — mappez chaque action à la bonne couche :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Rôle JWT système</strong> — <code>Admin</code> (opérateur plateforme) ou <code>User</code> (éditeur inscrit). Contrôle les éléments sidebar comme logs système, tickets et abonnés. Ne fait <em>pas</em> automatiquement de quelqu'un un propriétaire produit.</li>
        <li><strong>Rôle institution</strong> — votre appartenance au locataire : <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code>, <code>Member</code>, <code>Viewer</code>, ou <code>ResellerAdmin</code> (backend). Stocké comme <code>myRole</code> sur l'enregistrement institution.</li>
        <li><strong>Propriété produit</strong> — listée dans <code>product.owners</code>. Requise pour CRUD licences, clés RSA, onglet Users, Access Matrix et la plupart des actions Settings — même si votre rôle institution est Admin.</li>
      </ul>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">UI vs API</span>
        <p>Certaines gardes de route ne vérifient que que vous êtes un utilisateur plateforme connecté. <strong>Les contrôles faisant foi s'exécutent sur l'API.</strong> Si un bouton apparaît mais le serveur renvoie 403, votre rôle institution ou produit manque cette permission.</p>
      </div></div>

      <h2>Cycle de vie institution</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Créer</strong> — assistant à <code>/dashboard/organizations</code> (Identité : nom, site web, rôle d'entrée par défaut ; Branding : logo, couleurs, description).</li>
        <li><strong>Configurer</strong> — onglet paramètres : politiques (auto-inscription, approbation), rôle membre par défaut, branding.</li>
        <li><strong>Inviter</strong> — invitations email avec rôle ; accepter via <code>/auth/accept-invitation?token=…</code> (connexion requise).</li>
        <li><strong>Assigner produits</strong> — lier produits à l'institution ; ajouter propriétaires produit et lignes access matrix par version.</li>
        <li><strong>Exploiter</strong> — les membres utilisent l'analytique overview institution ; les admins gèrent équipe et audit.</li>
        <li><strong>Transférer ou supprimer</strong> — transfert propriété (Owner) ; suppression institution (Owner uniquement, destructif).</li>
      </ol>

      <h2>Onglets institution</h2>
      <p>Chaque onglet est une route enfant sous le layout institution. Les onglets <strong>Members</strong>, <strong>Invitations</strong>, <strong>Audit Logs</strong> et <strong>Settings</strong> n'apparaissent que lorsque <code>myRole</code> est <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code> ou <code>ResellerAdmin</code>. <strong>Overview</strong> et <strong>Products</strong> sont visibles à tous les membres.</p>

      <h3>Overview</h3>
      <p>Onglet d'atterrissage par défaut à l'ouverture d'une institution. Répondez-y à « que se passe-t-il dans ce locataire maintenant ? » avant d'approfondir produits ou licences.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Cartes résumé</strong> — nombre membres, produits assignés, totaux licences et tendances activations dans cette institution.</li>
        <li><strong>Mix licences</strong> — vue rapide des clés perpétuelles, essai, abonnement, flottantes et concurrentes liées aux produits institution.</li>
        <li><strong>Activité récente</strong> — raccourcis vers derniers événements licence et changements équipe sans ouvrir Audit Logs.</li>
        <li><strong>Changement contexte</strong> — si vous appartenez à plusieurs institutions, confirmez le nom institution dans l'en-tête avant d'agir sur les données.</li>
      </ul>
      <p><strong>Tâches typiques :</strong> contrôle santé hebdomadaire, snapshot exécutif avant appel renouvellement, vérifier qu'un nouvel assignement produit est effectif.</p>

      <h3>Products</h3>
      <p>Catalogue des produits logiciels liés à cette institution. L'assignation ici <em>n'émet pas</em> de licences — elle accorde à l'institution (et ses membres) visibilité et chemins d'accès aux produits déjà créés dans votre compte éditeur.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Assign product</strong> — Owner / Admin ouvre <strong>Assign Product</strong>, recherche le catalogue éditeur et lie un ou plusieurs produits. Les membres voient ensuite les produits assignés sur cet onglet et dans la sidebar (sous réserve des règles access matrix par produit).</li>
        <li><strong>Unassign</strong> — retire le lien institution ; ne supprime pas le produit ni ses licences à l'échelle plateforme.</li>
        <li><strong>Vue membre</strong> — Members et Viewers ne voient que les produits qui leur sont assignés ou accordés via lignes access matrix par version — pas tous les produits de votre compte.</li>
        <li><strong>Étape suivante</strong> — après assignation, les propriétaires produit ajoutent utilisateurs et lignes matrix sur l'espace produit (\${link('/guides/platform/products', 'Guide produits')}).</li>
      </ul>
      \${screenshot('platform-organization-assign-product.png', 'Modale Assign Product : sélectionner les produits à lier à l\'institution')}

      <h3>Members</h3>
      <p>Annuaire équipe faisant foi pour l'institution : qui appartient, quel rôle institution il détient, et quand il a rejoint.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Invite</strong> — email + rôle : Member, Viewer, ProductOwner ou Admin (seul Owner peut assigner Admin).</li>
        <li><strong>Change role</strong> — Owner, Admin ou ResellerAdmin ; règles Owner-only lors de promotion vers Admin.</li>
        <li><strong>Remove</strong> — Owner, Admin, ProductOwner, ResellerAdmin ; impossible de retirer Owner.</li>
        <li><strong>Rôle vs accès produit</strong> — rôle institution contrôle onglets institution ; propriétaires produit et access matrix contrôlent le travail licence par produit.</li>
      </ul>
      <p><strong>Guide rapide rôles :</strong> Member = contribuer sur produits assignés ; Viewer = lecture seule ; ProductOwner = gérer produits/licences sans admin institution complet ; Admin = équipe + paramètres sauf actions Owner-only.</p>
      \${screenshot('platform-organization-invite-member.png', 'Modale Invite Team Member : email, rôle assigné et message d\'invitation')}

      <h3>Invitations</h3>
      <p>File opérationnelle pour les personnes n'ayant pas encore accepté. Utilisez-la quand l'onboarding bloque ou pour révoquer une invite erronée.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Status</strong> — Pending, expirée ou révoquée ; filtrer et rechercher par email destinataire.</li>
        <li><strong>Resend</strong> — génère un email token frais sans changer le rôle choisi.</li>
        <li><strong>Revoke</strong> — invalide le lien immédiatement ; le destinataire doit recevoir une nouvelle invite.</li>
        <li><strong>Expiry</strong> — chaque ligne affiche l'expiration du token ; invites expirées inacceptables jusqu'à renvoi.</li>
        <li><strong>Rôles UI</strong> — Member, Viewer, Admin sur cet onglet ; onglet Members propose aussi ProductOwner à l'invitation.</li>
      </ul>
      \${screenshot('platform-organization-invitations.png', 'Onglet Institution Team Invitations : invites en attente avec rôle, statut et expiration')}

      <h3>Audit Logs</h3>
      <p>Piste immuable à portée institution pour conformité et support : qui a modifié appartenance équipe, produits assignés ou paramètres institution.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Columns</strong> — horodatage, action (p.ex. InvitationSent, LicenseCreated), produit, type entité, nom entité, adresse IP.</li>
        <li><strong>Filters</strong> — type action, type entité, plage dates et recherche texte libre sur utilisateur, entité ou produit.</li>
        <li><strong>Export CSV</strong> — télécharger la vue filtrée pour SIEM ou analyse tableur.</li>
        <li><strong>Details</strong> — icône œil ouvre la charge utile structurée d'un événement.</li>
        <li><strong>Pair with Analytics</strong> — audit est instantané ; \${link('/guides/platform/analytics', 'Analytique')} montre tendances dans le temps.</li>
      </ul>
      \${screenshot('platform-organization-audit-logs.png', 'Onglet Institution Audit Logs : activité licences et invitations avec filtres et export')}

      <h3>Settings</h3>
      <p>Configuration orientée Owner divisée en sous-sections (nav gauche dans Settings) :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>General</strong> — nom entité, ID registre, description rich-text et URL site public sur le profil institution.</li>
        <li><strong>Branding</strong> — logo et couleurs pour présentation institution dans tableau de bord et invitations.</li>
        <li><strong>Policies</strong> — <code>allowSelfRegistration</code>, <code>requireApprovalForJoining</code> et <code>defaultMemberRole</code> pour nouveaux arrivants (Member, Viewer ou Admin).</li>
        <li><strong>Governance</strong> — transfert propriété et bascules politique avancées selon votre déploiement.</li>
        <li><strong>Danger zone</strong> — supprimer institution (Owner uniquement ; irréversible ; licences sous produits institution peuvent cascader selon politique serveur).</li>
      </ul>
      <p><strong>Avant enregistrement :</strong> description et site web sont visibles clients sur l'en-tête institution ; changements politique affectent la prochaine invitation ou tentative auto-inscription, pas rétroactivement les membres existants.</p>
      \${screenshot('platform-organization-settings-general.png', 'Institution Settings General Configuration : nom, description, site web et sous-nav branding')}

      <h2>Matrice rôles institution</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Owner</strong> — contrôle locataire complet : supprimer institution, transférer propriété, assigner Admin, toutes opérations invite/remove/rôle.</li>
        <li><strong>Admin</strong> — inviter, changer rôles (pas vers Owner ; ne peut assigner Admin — Owner-only), retirer membres ; ne peut supprimer institution.</li>
        <li><strong>ProductOwner</strong> — inviter et retirer membres ; gérer produits/licences assignés ; pas suppression institution ni promotion Admin.</li>
        <li><strong>Member</strong> — voir overview institution et produits assignés ; utiliser licences selon access matrix produit ; pas d'onglets gestion membres UI.</li>
        <li><strong>Viewer</strong> — accès institution lecture seule ; visibilité produit via access matrix uniquement.</li>
        <li><strong>ResellerAdmin</strong> — rôle backend traité comme Admin pour beaucoup d'opérations institution (affichage UI partiel).</li>
      </ul>

      <h2>Workflow invitation (étape par étape)</h2>
      <ol style="margin-left:1.25rem;">
        <li>Admin ouvre <strong>Members</strong> ou <strong>Invitations</strong> → <strong>Invite</strong>.</li>
        <li>Saisir email, choisir rôle, message optionnel → envoyer.</li>
        <li>Destinataire reçoit email avec lien token.</li>
        <li>Destinataire se connecte (ou s'inscrit) → <code>/auth/accept-invitation?token=…</code>.</li>
        <li>Succès : utilisateur ajouté à l'institution avec rôle choisi → redirection vers <code>/dashboard/organization/:orgId</code>.</li>
        <li>Opérateur peut renvoyer ou annuler lignes pending depuis <strong>Invitations</strong>.</li>
      </ol>

      <h2>Automatisation REST</h2>
      <p>Routes sous <code>/api/Organization/…</code> reflètent flux tableau de bord : CRUD, membres, invitations, politiques. Utilisez JWT opérateur ou clés API compte à portée (\${link('/rsa-keys', 'Guide clés API')}).</p>
      <p>\${link('/api/organizations', 'API Institutions')} · \${link('/api/auth-users', 'Auth &amp; users')} · \${link('/guides/platform/products', 'Produits')} · \${link('/guides/platform/overview', 'Vue d\'ensemble système')}</p>
    `,
  },
};
