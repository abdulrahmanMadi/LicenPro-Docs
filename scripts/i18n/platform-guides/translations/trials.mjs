export default {
  ar: {
    title: 'التجارب',
    lead:
      'تراخيص تقييم محدودة زمنياً، حملات تجريبية، سير عمل التمديد والتحويل، وكيف تختلف التجارب عن تراخيص الاشتراك.',
    body: String.raw`
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
        <li><strong>Search</strong> — بريد العميل، مفتاح الترخيص، اسم المنتج.</li>
        <li><strong>Extend trial</strong> — دفع تاريخ انتهاء الصلاحية؛ يكتب سجل تدقيق.</li>
        <li><strong>End trial</strong> — انتهاء فوري؛ التحقق يفشل عند فحص SDK أو API التالي.</li>
        <li><strong>Create</strong> — استخدم معالج الترخيص بنوع <strong>Trial</strong> أو اختصار صفحة Trials عند توفره.</li>
        <li><strong>Open license detail</strong> — سياق تفعيلات/جلسات كامل للتصعيد.</li>
      </ul>

      <h2>Trial مقابل subscription</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Trial</strong> — SKU تقييم؛ غالباً مقعد واحد؛ مسارات تسويق؛ قد ينتهي تلقائياً دون دفع.</li>
        <li><strong>Subscription</strong> — مدة متكررة مرتبطة بتجديد الفوترة؛ راجع \${link('/subscription-license', 'نموذج Subscription')}.</li>
      </ul>

      <h2>الأدوار</h2>
      <p>نفس إدارة التراخيص: <strong>مالكو المنتج</strong> و<strong>system Admin</strong> يمدّدون/ينهون التجارب. Members لا يصلون لإجراءات إدارة trial.</p>

      <p>\${link('/api/trials-transfers', 'Trials &amp; transfers API')} · \${link('/trial-license', 'نموذج Trial')} · \${link('/guides/platform/licenses', 'التراخيص (البائع)')} · \${link('/guides/platform/analytics', 'Analytics')}</p>
    `,
  },
  fr: {
    title: 'Essais',
    lead:
      "Licences d'évaluation limitées dans le temps, campagnes d'essai, workflows prolongation et conversion, et différences avec licences abonnement.",
    body: String.raw`
      <p>Les <strong>licences Trial</strong> sont des droits limités dans le temps pour évaluation. La zone <strong>Trials</strong> du tableau de bord agrège licences trial pour monitoring ; création utilise souvent l'assistant licence standard type <strong>Trial</strong> ou routes trial dédiées.</p>

      <h2>Cycle de vie essai</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Émettre</strong> — assistant licence type Trial + durée essai (jours/heures).</li>
        <li><strong>Activer</strong> — client utilise clé ; horloge démarre selon politique (date émission vs première activation).</li>
        <li><strong>Surveiller</strong> — <code>/dashboard/trials</code> filtre Active, Expired, Converted, Cancelled.</li>
        <li><strong>Prolonger</strong> — opérateur ajoute du temps pour suivi ventes (API + UI).</li>
        <li><strong>Terminer tôt</strong> — opérateur annule essai avant expiration naturelle.</li>
        <li><strong>Convertir</strong> — remplacer par licence perpetual/subscription payante ; transférer droits/liaisons appareil où supporté.</li>
      </ol>

      <h2>Opérations page Trials</h2>
      <p>Sidebar : <strong>Trials</strong>. Agrège licences trial-type pour que ventes et support ne chassent pas dans la liste licences complète.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Filter by status</strong> — Active, Expired, Converted, Cancelled.</li>
        <li><strong>Search</strong> — email client, clé licence, nom produit.</li>
        <li><strong>Extend trial</strong> — repousser date expiration ; écrit entrée audit.</li>
        <li><strong>End trial</strong> — expiration immédiate ; validation échoue au prochain contrôle SDK ou API.</li>
        <li><strong>Create</strong> — utiliser assistant licence type <strong>Trial</strong> ou raccourci page Trials si proposé.</li>
        <li><strong>Open license detail</strong> — contexte activations/sessions complet pour escalades.</li>
      </ul>

      <h2>Trial vs subscription</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Trial</strong> — SKU évaluation ; souvent mono-siège ; entonnoirs marketing ; peut expirer auto sans paiement.</li>
        <li><strong>Subscription</strong> — terme récurrent lié au renouvellement facturation ; voir \${link('/subscription-license', 'Modèle Subscription')}.</li>
      </ul>

      <h2>Rôles</h2>
      <p>Comme gestion licences : <strong>propriétaires produit</strong> et <strong>system Admin</strong> prolongent/terminent essais. Members n'accèdent pas aux actions admin trial.</p>

      <p>\${link('/api/trials-transfers', 'API Essais &amp; transferts')} · \${link('/trial-license', 'Modèle Trial')} · \${link('/guides/platform/licenses', 'Licences (éditeur)')} · \${link('/guides/platform/analytics', 'Analytics')}</p>
    `,
  },
};
