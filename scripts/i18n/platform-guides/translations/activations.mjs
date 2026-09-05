export default {
  ar: {
    title: 'التفعيلات',
    lead:
      'الأجهزة والبيئات التي استهلكت مقعد ترخيص. مراقبة عامة، علامة لكل ترخيص، حظر/إلغاء الحظر، موافقة node-locked، وسلوك Perpetual مقابل Concurrent.',
    body: String.raw`
      <p><strong>التفعيل</strong> يسجّل أن آلة أو مستخدماً أو بيئة محددة طالبت بسعة على ترخيص. نماذج node-locked وconcurrent تعتمد على التفعيلات؛ perpetual online يتتبعها للامتثال والتدقيق.</p>
      <p>جولة مشتركة مع الجلسات: \${link('/sessions-activations', 'دليل الجلسات والتفعيلات')} · \${link('/perpetual-license', 'Perpetual')} · \${link('/node-locked-license', 'Node-Locked')}.</p>

      <h2>دورة حياة التفعيل</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>تفعيل العميل</strong> — تحقق SDK أو <code>ActivationManager</code> مع بصمة الأجهزة / معرّف الجهاز.</li>
        <li><strong>تسجيل الخادم</strong> — صف تفعيل: معرّف الترخيص، معلومات الجهاز، الطابع الزمني، الحالة (active، pending approval، blocked).</li>
        <li><strong>التطبيق</strong> — حدود المقاعد تحجب تفعيلات جديدة عند الوصول للحد الأقصى.</li>
        <li><strong>موافقة Node-Locked</strong> — صف معلق حتى يوافق مالك المنتج (عندما يتطلب وضع الربط ذلك).</li>
        <li><strong>Block</strong> — المشغّل يحظر جهازاً مشبوهاً؛ العميل يفشل عند الفحص عبر الإنترنت التالي.</li>
        <li><strong>Deactivate</strong> — العميل أو المشغّل يحرّر المقعد لإعادة الاستخدام.</li>
      </ol>

      <h2>صفحة Activations العامة</h2>
      <p>الشريط الجانبي: <strong>Activations</strong>. عرض عبر المنتجات عندما لا تعرف بعد أي مفتاح ترخيص متورط.</p>
      \${screenshot('platform-activations-global-list.png', 'Activations العامة — بحث، مرشحات، مفتاح الترخيص، الجهاز، أعمدة الحالة')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Search</strong> — مفتاح الترخيص، بصمة الجهاز، بريد المستخدم، اسم الجهاز.</li>
        <li><strong>Status filter</strong> — active، blocked، pending، deactivated.</li>
        <li><strong>Date presets</strong> — 7D / 30D / 90D / all / نطاق مخصص لنوافذ الحوادث.</li>
        <li><strong>Block / unblock</strong> — رفض إجباري عند الفحص عبر الإنترنت التالي دون حذف السجل.</li>
        <li><strong>Edit notes</strong> — تعليقات دعم مرئية للمشغّلين الآخرين.</li>
        <li><strong>Drill-down</strong> — فتح تفاصيل التفعيل أو الانتقال للترخيص الأب.</li>
      </ul>
      <p>نطاقات API تسرد المنتجات التي تملكها أو تديرها.</p>

      <h2>علامة Activations لكل ترخيص</h2>
      <p>مسار أسرع عندما يمتلك الدعم مفتاح الترخيص بالفعل. نفس دلالات block/unblock والموافقة كالقائمة العامة لكن مُصفّاة مسبقاً لترخيص واحد.</p>
      \${screenshot('platform-node-locked-activations-tab.png', 'علامة Activations لكل ترخيص — صفوف الأجهزة لترخيص واحد')}

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

      <p>\${link('/api/activations-sessions', 'Activations &amp; sessions API')} · \${link('/sdk/activation-session', 'SDK activation')} · \${link('/guides/platform/sessions', 'Sessions')}</p>
    `,
  },
  fr: {
    title: 'Activations',
    lead:
      'Appareils et environnements ayant consommé un siège licence. Surveillance globale, onglet par licence, block/unblock, approbation node-locked et comportement Perpetual vs Concurrent.',
    body: String.raw`
      <p>Une <strong>activation</strong> enregistre qu'une machine, utilisateur ou environnement spécifique a réclamé une capacité sur une licence. Modèles node-locked et concurrent dépendent des activations ; perpetual online les suit pour conformité et audit.</p>
      <p>Parcours combiné avec sessions : \${link('/sessions-activations', 'Guide sessions &amp; activations')} · \${link('/perpetual-license', 'Perpetual')} · \${link('/node-locked-license', 'Node-Locked')}.</p>

      <h2>Cycle de vie activation</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Client active</strong> — validation SDK ou <code>ActivationManager</code> avec empreinte matérielle / id appareil.</li>
        <li><strong>Serveur enregistre</strong> — ligne activation : id licence, infos appareil, horodatage, statut (active, pending approval, blocked).</li>
        <li><strong>Application</strong> — limites sièges bloquent nouvelles activations quand max atteint.</li>
        <li><strong>Approbation Node-Locked</strong> — ligne pending jusqu'à approbation propriétaire produit (quand mode liaison l'exige).</li>
        <li><strong>Block</strong> — opérateur bloque appareil suspect ; client échoue au prochain contrôle en ligne.</li>
        <li><strong>Deactivate</strong> — client ou opérateur libère siège pour réutilisation.</li>
      </ol>

      <h2>Page Activations globale</h2>
      <p>Sidebar : <strong>Activations</strong>. Vue cross-produit quand vous ne savez pas encore quelle clé licence est impliquée.</p>
      \${screenshot('platform-activations-global-list.png', 'Activations globales — recherche, filtres, clé licence, appareil, colonnes statut')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Search</strong> — clé licence, empreinte appareil, email utilisateur, nom machine.</li>
        <li><strong>Status filter</strong> — active, blocked, pending, deactivated.</li>
        <li><strong>Date presets</strong> — 7D / 30D / 90D / all / plage custom pour fenêtres incident.</li>
        <li><strong>Block / unblock</strong> — refus forcé au prochain contrôle en ligne sans supprimer historique.</li>
        <li><strong>Edit notes</strong> — annotations support visibles aux autres opérateurs.</li>
        <li><strong>Drill-down</strong> — ouvrir détail activation ou sauter vers licence parente.</li>
      </ul>
      <p>Scopes API listent produits que vous possédez ou administrez.</p>

      <h2>Onglet Activations par licence</h2>
      <p>Chemin plus rapide quand support a déjà la clé licence. Mêmes sémantiques block/unblock et approbation que liste globale mais pré-filtré à une licence.</p>
      \${screenshot('platform-node-locked-activations-tab.png', 'Onglet Activations par licence — lignes appareil pour une licence')}

      <h2>Par modèle licence</h2>
      <table>
        <thead><tr><th>Modèle</th><th>Rôle activations</th><th>Affichage liste typique</th></tr></thead>
        <tbody>
          <tr><td><strong>Node-Locked</strong></td><td>Application principale — un appareil lié ; approuver liaisons pending</td><td><code>1/1</code></td></tr>
          <tr><td><strong>Concurrent</strong></td><td>Plafond sièges sur appareils enregistrés</td><td><code>3/5</code></td></tr>
          <tr><td><strong>Perpetual online</strong></td><td>Audit / max activations optionnel</td><td><code>2/∞</code> ou plafonné</td></tr>
          <tr><td><strong>Floating</strong></td><td>Registre appareils ; sièges souvent depuis sessions</td><td>Variable</td></tr>
          <tr><td><strong>Credit-Based / Usage-Based</strong></td><td>Suivi appareil optionnel ; usage sur onglet Usage</td><td>—</td></tr>
          <tr><td><strong>Offline perpetual / trial</strong></td><td>Peut ne pas créer lignes en ligne</td><td>—</td></tr>
        </tbody>
      </table>

      <h2>Rôles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Propriétaire produit / Admin</strong> — voir liste globale, block/unblock, approuver appareils node-locked, onglet par licence.</li>
        <li><strong>Member / Viewer</strong> — pas d'UI gestion activations.</li>
      </ul>

      <p>\${link('/api/activations-sessions', 'API Activations &amp; sessions')} · \${link('/sdk/activation-session', 'SDK activation')} · \${link('/guides/platform/sessions', 'Sessions')}</p>
    `,
  },
};
