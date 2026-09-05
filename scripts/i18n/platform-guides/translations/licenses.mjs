export default {
  ar: {
    title: 'التراخيص (مساحة عمل البائع)',
    lead:
      'إصدار وتوزيع وإلغاء ومراقبة التراخيص من لوحة التحكم. يغطي معالج الإنشاء من أربع خطوات، علامات التفاصيل (بما في ذلك Usage للأنواع المقاسة)، أنواع الترخيص، وعروض البائع مقابل المستخدم النهائي.',
    body: String.raw`
      <p>البائعون ينشئون <strong>تراخيص</strong> مقابل منتج وإصدار برمجيات، ثم يوزّعون <strong>مفتاح الترخيص</strong> و<code>license.bin</code> الموقّع. <em>نوع</em> الترخيص يقود انتهاء الصلاحية والمقاعد والتفعيلات والجلسات وقواعد تحقق SDK.</p>
      <p>جولة: \${link('/first-license', 'إنشاء أول ترخيص')} · أدلة النماذج: \${link('/perpetual-license', 'Perpetual')}، \${link('/trial-license', 'Trial')}، \${link('/subscription-license', 'Subscription')}، \${link('/floating-license', 'Floating')}، \${link('/concurrent-license', 'Concurrent')}، \${link('/node-locked-license', 'Node-Locked')}، \${link('/credit-based-license', 'Credit-Based')}، \${link('/usage-based-license', 'Usage-Based')}.</p>

      <h2>نماذج الترخيص في لمحة</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Perpetual</strong> — شراء مرة واحدة؛ عبر الإنترنت أو دون اتصال؛ انتهاء اختياري للصيانة.</li>
        <li><strong>Trial</strong> — تقييم محدود زمنياً؛ تمديد أو تحويل إلى مدفوع.</li>
        <li><strong>Subscription</strong> — مدة متكررة؛ تجديد أو إلغاء عند مغادرة العميل.</li>
        <li><strong>Floating</strong> — مجموعة مشتركة؛ المقاعد تُفرض بـ <em>الجلسات الحية</em>؛ دائماً عبر الإنترنت.</li>
        <li><strong>Concurrent</strong> — مفتاح فريق مشترك؛ المقاعد تُفرض بـ <em>تفعيلات الأجهزة</em>.</li>
        <li><strong>Node-Locked</strong> — جهاز واحد لكل ترخيص؛ ربط أجهزة + نقل؛ ربط تلقائي أو موافقة المالك؛ محاولات المشاركة من أجهزة أخرى تُسجّل وتُبلّغ للمالك.</li>
        <li><strong>Credit-Based</strong> (<code>MeteredToken</code>) — عبر الإنترنت فقط؛ محفظة رصيد مشتركة؛ تسعير رموز لكل ميزة. \${link('/credit-based-license', 'الدليل الكامل')}.</li>
        <li><strong>Usage-Based</strong> (<code>MeteredCount</code>) — عبر الإنترنت فقط؛ عدّاد استخدام مشترك؛ استخدام واحد لكل consume. \${link('/usage-based-license', 'الدليل الكامل')}.</li>
      </ul>

      <h2>دورة حياة الترخيص (عرض البائع)</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>المتطلبات</strong> — منتج، إصدار، مفاتيح RSA مُولّدة (\${link('/rsa-keys', 'مفاتيح RSA')}).</li>
        <li><strong>إنشاء</strong> — معالج من أربع خطوات (Activation → License Type → Basic Info → Details).</li>
        <li><strong>توزيع</strong> — نسخ مفتاح الترخيص؛ تنزيل <code>license.bin</code> من عرض التفاصيل.</li>
        <li><strong>تفعيل (العميل)</strong> — SDK أو <code>POST /api/Licenses/validate</code> مع <code>X-API-KEY</code> للمنتج.</li>
        <li><strong>تشغيل</strong> — مراقبة التفعيلات/الجلسات؛ تمديد التجارب؛ ضبط المقاعد حيث مسموح.</li>
        <li><strong>إلغاء / حذف</strong> — إبطال فوري للمسارات عبر الإنترنت؛ الملفات دون اتصال تفشل عند التحديث عبر الإنترنت التالي.</li>
        <li><strong>نقل</strong> — إعادة تعيين المستخدم المُصدر له أو جهاز node-locked حيث تسمح السياسة.</li>
      </ol>

      <h2>أين تعمل في لوحة التحكم</h2>
      <p>استخدم قائمة الشريط الجانبي <strong>Licenses</strong> للبحث عبر المنتجات، أو افتح منتج → علامة <strong>Licenses</strong> عندما تعرف سياق البرنامج. العملاء النهائيون يستخدمون <strong>My Licenses</strong> (وليس مساحة البائع) للمفاتيح الصادرة لحسابهم.</p>
      \${screenshot('platform-licenses-list.png', 'قائمة Licenses — أعمدة Type وMode وStatus وActivations (مثل 2/∞ perpetual، 1/1 node-locked)')}

      <h2>معالج الإنشاء — الخطوة 1: Activation</h2>
      <p>اختر كيف يُتحقق من الترخيص وقت التشغيل:</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online</strong> — تحقق الخادم والتفعيلات والجلسات؛ مطلوب لـ Floating وSubscription وCredit-Based وUsage-Based.</li>
        <li><strong>Offline</strong> — <code>license.bin</code> الموقّع فقط؛ Perpetual وTrial وNode-Locked يمكنها استخدام وضع offline.</li>
      </ul>
      \${screenshot('platform-create-license-step1-activation.png', 'الخطوة 1 — وضع التفعيل Online مقابل Offline')}

      <h2>معالج الإنشاء — الخطوة 2: License Type</h2>
      <p>اختر بطاقة النموذج — كل ما يلي (المقاعد، الجلسات، الرموز، الربط) يتبع هذا الاختيار.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>بطاقات النوع</strong> — Perpetual، Trial، Subscription، Floating، Concurrent، Node-Locked، <strong>Credit-Based</strong>، <strong>Usage-Based</strong> (الخطة قد تحجب الأنواع).</li>
        <li>الأنواع online-only معطّلة عند اختيار Offline activation في الخطوة 1.</li>
      </ul>
      \${screenshot('platform-create-license-step-license-type.png', 'الخطوة 2 — بطاقات نوع الترخيص بما في ذلك Credit-Based وUsage-Based')}

      <h2>معالج الإنشاء — الخطوة 3: Basic Info</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product</strong> — مطلوب عند الإنشاء من القائمة العامة؛ مُعبأ مسبقاً في سياق المنتج.</li>
        <li><strong>Software release</strong> — مطلوب؛ يربط التحقق وفحوص التحديث بخط إصدار.</li>
        <li><strong>Issuer</strong> — اسم بائع اختياري في بيانات الترخيص.</li>
        <li><strong>Issued to</strong> — بريد، منتقي مستخدم نهائي، أو auto (حسب النوع).</li>
        <li><strong>Entitlement set</strong> — حزمة اختيارية من علامة Entitlement Sets للمنتج.</li>
      </ul>
      \${screenshot('platform-create-license-step-basic-info.png', 'الخطوة 3 — Basic Info: المنتج، الإصدار، issued-to، اسم الترخيص')}

      <h2>معالج الإنشاء — الخطوة 4: Details</h2>
      <p>حدود تشغيلية وتسميات يعتمد عليها المشغّلون وفرق الدعم بعد الإصدار.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>License name</strong> — تسمية داخلية (مطلوبة)؛ تظهر في القوائم وسجلات التدقيق.</li>
        <li><strong>Duration / expiry</strong> — مدة الاشتراك، فترة التجربة، أو لا شيء للدائم.</li>
        <li><strong>Seats &amp; limits</strong> — أقصى تفعيلات (concurrent/node-locked)، أقصى مستخدمين متزامنين (floating)، رصيد الرموز (credit-based)، حدود الاستخدام (usage-based).</li>
        <li><strong>Node-Locked — device binding mode</strong> — <em>Auto-bind on first validation</em> أو <em>Product owner approval</em> (خطوة Details فقط).</li>
        <li><strong>Perpetual online</strong> — username/password اختياري للتحقق من بيانات الاعتماد.</li>
        <li><strong>Notes</strong> — ملاحظات مشغّل نص غني (سياق مبيعات، تذاكر دعم).</li>
        <li><strong>Success screen</strong> — نسخ مفتاح الترخيص؛ فتح التفاصيل لتنزيل <code>license.bin</code>.</li>
      </ul>
      \${screenshot('platform-create-license-step-details-binding.png', 'الخطوة 4 — Node-Locked Details: Auto-bind مقابل Product owner approval')}

      <h2>علامات تفاصيل الترخيص (البائع)</h2>
      <p>تُفتح من أي صف ترخيص. رؤية العلامات تعتمد على نوع الترخيص وما إذا كنت مالك منتج أو system Admin.</p>

      <h3>Overview (دائماً)</h3>
      <p>ملخص في لوحة واحدة لعمليات البائع اليومية.</p>
      <ul style="margin-left:1.25rem;">
        <li>مفتاح الترخيص، شارة الحالة، النوع، الإصدار، issued-to، انتهاء الصلاحية.</li>
        <li>تنزيل <code>license.bin</code>، إلغاء، حذف، نقل مستخدم، رابط تعديل.</li>
        <li>نسخ المفتاح للتسليم بالبريد؛ سجل التدقيق يربط التنزيلات بـ IP.</li>
      </ul>

      <h3>Activations</h3>
      <p>مقاعد الجهاز والبيئة لنماذج الربط. مرئية عندما يدعم نوع الترخيص تتبع الأجهزة ولديك حقوق owner/Admin.</p>
      <ul style="margin-left:1.25rem;">
        <li>صفوف لكل جهاز مع block/unblock وملاحظات الدعم.</li>
        <li>السطح الأساسي لحساب مقاعد \${link('/concurrent-license', 'Concurrent')} (التفعيلات، وليس الجلسات).</li>
        <li><strong>Node-Locked</strong> — الموافقة على الأجهزة المعلقة عندما يكون وضع الربط Product owner approval.</li>
        <li><strong>Perpetual online</strong> — مسار تدقيق للآلات (مثل <code>2/∞</code> في قائمة التراخيص).</li>
      </ul>
      \${screenshot('platform-node-locked-activations-tab.png', 'تفاصيل الترخيص — علامة Activations مع صفوف الأجهزة والحالة')}
      <p>راجع \${link('/guides/platform/activations', 'Activations')}.</p>

      <h3>Sessions</h3>
      <p>اتصالات عبر الإنترنت حية مع طوابع heartbeat. تُعرض للتراخيص القادرة على الإنترنت — خاصة \${link('/floating-license', 'Floating')} حيث المقاعد تتبع <em>الجلسات الحية</em>، ولـ \${link('/perpetual-license', 'Perpetual online')} / \${link('/node-locked-license', 'Node-Locked online')} للمراقبة.</p>
      <ul style="margin-left:1.25rem;">
        <li>قطع الاتصال بالعملاء الراكدين الذين يحجزون مقاعد بعد تعطل التطبيق.</li>
        <li>ربط معرّف الجلسة بسجلات API للدعم.</li>
        <li>تبديل <strong>Live</strong> وتحديث تلقائي في صفحة Sessions العامة.</li>
      </ul>
      \${screenshot('platform-node-locked-sessions-tab.png', 'تفاصيل الترخيص — علامة Active Sessions مع heartbeat وقطع الاتصال')}
      <p>راجع \${link('/guides/platform/sessions', 'Sessions')}.</p>

      <h3>Usage</h3>
      <p>تراخيص <strong>Credit-Based</strong> و<strong>Usage-Based</strong> فقط: رصيد الرموز أو عدّادات مقاسة، سجل الاستهلاك، وتعديلات المشغّل. راجع أدلة \${link('/credit-based-license', 'Credit-Based')} و\${link('/usage-based-license', 'Usage-Based')}.</p>

      <h3>Device</h3>
      <p>تراخيص <strong>Node-locked</strong> فقط: بصمة الأجهزة المربوطة، سجل التفعيل، سير عمل النقل/فك الربط عندما تسمح السياسة بتغيير الجهاز، وبطاقة <strong>Unauthorized Access Attempts</strong> تسرد الآلات المرفوضة لأن الترخيص مربوط في مكان آخر. المحاولات تحمل معرّفات الأجهزة المحاولة والمربوطة وIP ونقطة الدخول وعداداً لكل جهاز؛ مالكو المنتج يُبلّغون داخل التطبيق مرة واحدة لكل جهاء مخالف يومياً ويمكنهم وضع علامة reviewed على كل واحد. راجع \${link('/node-locked-license', 'كشف مشاركة ترخيص Node-locked')}.</p>

      <h2>دورة حياة حالة الترخيص</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Active</strong> — صالح للتحقق ضمن حدود السياسة.</li>
        <li><strong>Expired</strong> — بعد انتهاء الصلاحية (trial/subscription)؛ التحقق يفشل.</li>
        <li><strong>Revoked</strong> — إيقاف إجباري من المشغّل؛ التحقق عبر الإنترنت يفشل فوراً.</li>
        <li><strong>Suspended / locked</strong> — تعليق فوترة أو امتثال (حسب النشر).</li>
      </ul>

      <h2>الأدوار</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>مالك المنتج / system Admin</strong> — إنشاء، تعديل، إلغاء، حذف، رؤية علامة Activations.</li>
        <li><strong>Member معيّن</strong> — قد يرى تراخيص على إصدارات مسموحة؛ عادةً لا يمكنه الإنشاء.</li>
        <li><strong>مستخدم نهائي</strong> — يُوجّه إلى <code>/dashboard/my-licenses</code> للمفاتيح الصادرة لحسابه.</li>
      </ul>

      <h2>التحقق المجهول (وقت تشغيل العميل)</h2>
      <p>التطبيقات تستدعي <code>POST \${HOST}/api/Licenses/validate</code> مع <code>X-API-KEY</code> للمنتج — وليس المفتاح الخاص RSA أو JWT المشغّل.</p>
      <p>\${link('/api/licenses', 'Licenses API')} · \${link('/sdk/license-client', 'SDK LicenseClient')} · \${link('/guides/platform/products', 'المنتجات')}</p>
    `,
  },
  fr: {
    title: 'Licences (espace éditeur)',
    lead:
      "Émettre, distribuer, révoquer et surveiller licences depuis le tableau de bord. Couvre l'assistant création en quatre étapes, onglets détail (dont Usage pour types mesurés), types licence et vues éditeur vs utilisateur final.",
    body: String.raw`
      <p>Les éditeurs créent des <strong>licences</strong> contre un produit et une version logicielle, puis distribuent la <strong>clé licence</strong> et <code>license.bin</code> signé. Le <em>type</em> licence pilote expiration, sièges, activations, sessions et règles validation SDK.</p>
      <p>Parcours : \${link('/first-license', 'Générer votre première licence')} · Guides modèles : \${link('/perpetual-license', 'Perpetual')}, \${link('/trial-license', 'Trial')}, \${link('/subscription-license', 'Subscription')}, \${link('/floating-license', 'Floating')}, \${link('/concurrent-license', 'Concurrent')}, \${link('/node-locked-license', 'Node-Locked')}, \${link('/credit-based-license', 'Credit-Based')}, \${link('/usage-based-license', 'Usage-Based')}.</p>

      <h2>Modèles licence en un coup d'œil</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Perpetual</strong> — achat unique ; en ligne ou hors ligne ; expiration optionnelle maintenance.</li>
        <li><strong>Trial</strong> — évaluation limitée dans le temps ; prolonger ou convertir en payant.</li>
        <li><strong>Subscription</strong> — terme récurrent ; renouveler ou révoquer au churn.</li>
        <li><strong>Floating</strong> — pool partagé ; sièges appliqués par <em>sessions live</em> ; toujours en ligne.</li>
        <li><strong>Concurrent</strong> — clé équipe partagée ; sièges appliqués par <em>activations appareil</em>.</li>
        <li><strong>Node-Locked</strong> — une machine par licence ; liaison matérielle + transfert ; auto-bind ou approbation propriétaire ; tentatives partage depuis autres machines enregistrées et signalées au propriétaire.</li>
        <li><strong>Credit-Based</strong> (<code>MeteredToken</code>) — en ligne uniquement ; portefeuille crédits partagé ; tarification tokens par feature. \${link('/credit-based-license', 'Guide complet')}.</li>
        <li><strong>Usage-Based</strong> (<code>MeteredCount</code>) — en ligne uniquement ; compteur usage partagé ; un usage par consume. \${link('/usage-based-license', 'Guide complet')}.</li>
      </ul>

      <h2>Cycle de vie licence (vue éditeur)</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Prérequis</strong> — produit, version, clés RSA générées (\${link('/rsa-keys', 'Clés RSA')}).</li>
        <li><strong>Créer</strong> — assistant quatre étapes (Activation → License Type → Basic Info → Details).</li>
        <li><strong>Distribuer</strong> — copier clé licence ; télécharger <code>license.bin</code> depuis vue détail.</li>
        <li><strong>Activer (client)</strong> — SDK ou <code>POST /api/Licenses/validate</code> avec <code>X-API-KEY</code> produit.</li>
        <li><strong>Exploiter</strong> — surveiller activations/sessions ; prolonger essais ; ajuster sièges où permis.</li>
        <li><strong>Révoquer / supprimer</strong> — invalidation immédiate chemins en ligne ; fichiers offline échouent au prochain refresh en ligne.</li>
        <li><strong>Transférer</strong> — réassigner utilisateur issued-to ou appareil node-locked selon politique.</li>
      </ol>

      <h2>Où travailler dans le tableau de bord</h2>
      <p>Utilisez liste sidebar <strong>Licenses</strong> pour recherche cross-produit, ou ouvrez produit → onglet <strong>Licenses</strong> quand vous connaissez le contexte logiciel. Clients finaux utilisent <strong>My Licenses</strong> (pas l'espace éditeur) pour clés émises sur leur compte.</p>
      \${screenshot('platform-licenses-list.png', 'Liste Licenses — colonnes Type, Mode, Status et Activations (p.ex. 2/∞ perpetual, 1/1 node-locked)')}

      <h2>Assistant création — Étape 1 : Activation</h2>
      <p>Choisissez comment la licence est validée à l'exécution :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online</strong> — validation serveur, activations et sessions ; requis pour Floating, Subscription, Credit-Based et Usage-Based.</li>
        <li><strong>Offline</strong> — <code>license.bin</code> signé uniquement ; Perpetual, Trial et Node-Locked peuvent utiliser mode offline.</li>
      </ul>
      \${screenshot('platform-create-license-step1-activation.png', 'Étape 1 — Mode activation Online vs Offline')}

      <h2>Assistant création — Étape 2 : License Type</h2>
      <p>Choisissez la carte modèle — tout en aval (sièges, sessions, tokens, liaison) suit ce choix.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Cartes type</strong> — Perpetual, Trial, Subscription, Floating, Concurrent, Node-Locked, <strong>Credit-Based</strong>, <strong>Usage-Based</strong> (forfait peut restreindre types).</li>
        <li>Types online-only désactivés quand Offline activation sélectionné à l'étape 1.</li>
      </ul>
      \${screenshot('platform-create-license-step-license-type.png', 'Étape 2 — Cartes type licence incluant Credit-Based et Usage-Based')}

      <h2>Assistant création — Étape 3 : Basic Info</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product</strong> — requis depuis liste globale ; pré-rempli en contexte produit.</li>
        <li><strong>Software release</strong> — requis ; lie validation et contrôles mise à jour à une ligne version.</li>
        <li><strong>Issuer</strong> — nom éditeur optionnel sur métadonnées licence.</li>
        <li><strong>Issued to</strong> — email, sélecteur utilisateur final ou auto (selon type).</li>
        <li><strong>Entitlement set</strong> — package optionnel depuis onglet Entitlement Sets produit.</li>
      </ul>
      \${screenshot('platform-create-license-step-basic-info.png', 'Étape 3 — Basic Info : produit, version, issued-to, nom licence')}

      <h2>Assistant création — Étape 4 : Details</h2>
      <p>Limites opérationnelles et libellés dont opérateurs et support dépendent après émission.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>License name</strong> — libellé interne (requis) ; apparaît listes et audit logs.</li>
        <li><strong>Duration / expiry</strong> — durée abonnement, période essai ou aucune pour perpétuel.</li>
        <li><strong>Seats &amp; limits</strong> — max activations (concurrent/node-locked), max utilisateurs concurrents (floating), solde tokens (credit-based), plafonds usage (usage-based).</li>
        <li><strong>Node-Locked — device binding mode</strong> — <em>Auto-bind on first validation</em> ou <em>Product owner approval</em> (étape Details uniquement).</li>
        <li><strong>Perpetual online</strong> — username/password optionnels pour validation identifiants.</li>
        <li><strong>Notes</strong> — notes opérateur rich-text (contexte ventes, tickets support).</li>
        <li><strong>Success screen</strong> — copier clé licence ; ouvrir détail pour télécharger <code>license.bin</code>.</li>
      </ul>
      \${screenshot('platform-create-license-step-details-binding.png', 'Étape 4 — Node-Locked Details : Auto-bind vs Product owner approval')}

      <h2>Onglets détail licence (éditeur)</h2>
      <p>Ouverts depuis toute ligne licence. Visibilité onglets dépend du type licence et si vous êtes propriétaire produit ou system Admin.</p>

      <h3>Overview (toujours)</h3>
      <p>Résumé single-pane pour ops éditeur quotidiennes.</p>
      <ul style="margin-left:1.25rem;">
        <li>Clé licence, badge statut, type, version, issued-to, expiration.</li>
        <li>Télécharger <code>license.bin</code>, révoquer, supprimer, transférer utilisateur, lien édition.</li>
        <li>Copier clé pour livraison email ; audit log corrèle téléchargements avec IP.</li>
      </ul>

      <h3>Activations</h3>
      <p>Sièges appareil et environnement pour modèles liaison. Visible quand type licence supporte suivi matériel et vous avez droits owner/Admin.</p>
      <ul style="margin-left:1.25rem;">
        <li>Lignes par appareil avec block/unblock et notes support.</li>
        <li>Surface principale pour math sièges \${link('/concurrent-license', 'Concurrent')} (activations, pas sessions).</li>
        <li><strong>Node-Locked</strong> — approuver appareils pending quand mode liaison est Product owner approval.</li>
        <li><strong>Perpetual online</strong> — piste audit machines (p.ex. <code>2/∞</code> dans liste licences).</li>
      </ul>
      \${screenshot('platform-node-locked-activations-tab.png', 'Détail licence — onglet Activations avec lignes appareil et statut')}
      <p>Voir \${link('/guides/platform/activations', 'Activations')}.</p>

      <h3>Sessions</h3>
      <p>Connexions en ligne live avec horodatages heartbeat. Affichées pour licences online-capable — surtout \${link('/floating-license', 'Floating')} où sièges suivent <em>sessions live</em>, et pour \${link('/perpetual-license', 'Perpetual online')} / \${link('/node-locked-license', 'Node-Locked online')} monitoring.</p>
      <ul style="margin-left:1.25rem;">
        <li>Déconnecter clients bloqués retenant sièges après crash app.</li>
        <li>Corréler id session avec logs API pour support.</li>
        <li>Bascule <strong>Live</strong> et auto-refresh sur page Sessions globale.</li>
      </ul>
      \${screenshot('platform-node-locked-sessions-tab.png', 'Détail licence — onglet Active Sessions avec heartbeat et déconnexion')}
      <p>Voir \${link('/guides/platform/sessions', 'Sessions')}.</p>

      <h3>Usage</h3>
      <p>Licences <strong>Credit-Based</strong> et <strong>Usage-Based</strong> uniquement : solde tokens ou compteurs mesurés, historique consommation et ajustements opérateur. Voir guides \${link('/credit-based-license', 'Credit-Based')} et \${link('/usage-based-license', 'Usage-Based')}.</p>

      <h3>Device</h3>
      <p>Licences <strong>Node-locked</strong> uniquement : empreinte matérielle liée, historique activation, workflows transfert/délier quand politique permet changement machine, et carte <strong>Unauthorized Access Attempts</strong> listant machines refusées car licence liée ailleurs. Tentatives portent IDs matériel tenté et lié, IP, point d'entrée et compteur par machine ; propriétaires produit notifiés in-app une fois par machine fautive par jour et peuvent marquer chacune reviewed. Voir \${link('/node-locked-license', 'Détection partage licence node-locked')}.</p>

      <h2>Cycle de vie statut licence</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Active</strong> — valide pour validation dans limites politique.</li>
        <li><strong>Expired</strong> — après expiration (trial/subscription) ; validation échoue.</li>
        <li><strong>Revoked</strong> — arrêt forcé opérateur ; validation en ligne échoue immédiatement.</li>
        <li><strong>Suspended / locked</strong> — holds facturation ou conformité (selon déploiement).</li>
      </ul>

      <h2>Rôles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Propriétaire produit / system Admin</strong> — créer, modifier, révoquer, supprimer, voir onglet Activations.</li>
        <li><strong>Member assigné</strong> — peut voir licences sur versions permises ; typiquement pas création.</li>
        <li><strong>Utilisateur final</strong> — routé vers <code>/dashboard/my-licenses</code> pour clés émises sur son compte.</li>
      </ul>

      <h2>Validation anonyme (runtime client)</h2>
      <p>Apps appellent <code>POST \${HOST}/api/Licenses/validate</code> avec <code>X-API-KEY</code> produit — jamais clé privée RSA ni JWT opérateur.</p>
      <p>\${link('/api/licenses', 'API Licences')} · \${link('/sdk/license-client', 'SDK LicenseClient')} · \${link('/guides/platform/products', 'Produits')}</p>
    `,
  },
};
