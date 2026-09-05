export default {
  ar: {
    title: 'الجلسات',
    lead:
      'اتصالات عبر الإنترنت حية لتطبيق heartbeat والتزامن العائم ومراقبة Perpetual/Node-Locked ورؤية الدعم في الوقت الفعلي.',
    body: String.raw`
      <p><strong>الجلسة</strong> تمثل اتصال عميل عبر الإنترنت نشط — المستخدم، الجهاز، إصدار التطبيق، آخر heartbeat. الجلسات تكمل التفعيلات: تراخيص floating تحدّ المستخدمين <em>المتزامنين</em>؛ تراخيص perpetual وnode-locked عبر الإنترنت تستخدم الجلسات للمراقبة الحية والتنظيف.</p>
      <p>جولة مشتركة: \${link('/sessions-activations', 'دليل الجلسات والتفعيلات')} · \${link('/perpetual-license', 'Perpetual online')} · \${link('/node-locked-license', 'Node-Locked online')}.</p>

      <h2>دورة حياة الجلسة</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Start</strong> — SDK <code>SessionManager</code> يفتح جلسة بعد تحقق/تفعيل ناجح.</li>
        <li><strong>Heartbeat</strong> — ping دوري يبقي الجلسة حية؛ heartbeats راكدة تُعلّم offline.</li>
        <li><strong>Concurrent check</strong> — نموذج floating يعد الجلسات النشطة مقابل <code>maxActiveUsers</code>.</li>
        <li><strong>End</strong> — إغلاق العميل أو استدعاء end صريح يحرّر المقعد.</li>
        <li><strong>Disconnect (operator)</strong> — إنهاء إجباري من لوحة التحكم للجلسات العالقة.</li>
        <li><strong>Cleanup</strong> — إزالة صفوف offline راكدة بعد تأكيد الدعم أن العميل ذهب.</li>
      </ol>

      <h2>صفحة Sessions العامة</h2>
      <p>الشريط الجانبي: <strong>Sessions</strong> (Active Sessions). مراقبة على نمط NOC لمن متصل الآن.</p>
      \${screenshot('platform-sessions-global-list.png', 'Active Sessions العامة — تبديل Live، بحث، عمر heartbeat، قطع الاتصال')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Live</strong> — تحديث تلقائي أثناء التفعيل (عطلات الإصدار، ترحيل التراخيص).</li>
        <li><strong>Online / offline filter</strong> — التركيز على العملاء الحيين مقابل الصفوف التاريخية.</li>
        <li><strong>Search</strong> — مفتاح الترخيص، بريد المستخدم، اسم الجهاز، إصدار التطبيق.</li>
        <li><strong>Disconnect</strong> — إنهاء عن بُعد؛ العميل يفشل عند heartbeat التالي.</li>
        <li><strong>Details panel</strong> — سلسلة الإصدار، IP/geo عند الجمع، معرّف الجلسة لربط API.</li>
      </ul>

      <h2>علامة Sessions لكل ترخيص</h2>
      <p>نفس البيانات كالصفحة العامة ضمن ترخيص واحد — مثالي لمفتاح perpetual أو node-locked أو floating واحد.</p>
      \${screenshot('platform-node-locked-sessions-tab.png', 'علامة Active Sessions لكل ترخيص مع heartbeat وإجراءات قطع الاتصال')}

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
      <p>الرؤية: system Admin، org Admin، مالك المنتج (مُصفّى API). Members/Viewers لا يديرون الجلسات.</p>

      <p>\${link('/api/activations-sessions', 'موضوع REST')} · \${link('/sdk/activation-session', 'SDK sessions')} · \${link('/guides/platform/activations', 'Activations')}</p>
    `,
  },
  fr: {
    title: 'Sessions',
    lead:
      'Connexions en ligne live pour application heartbeat, concurrence flottante, monitoring Perpetual/Node-Locked et visibilité support temps réel.',
    body: String.raw`
      <p>Une <strong>session</strong> représente une connexion client en ligne active — utilisateur, appareil, version app, dernier heartbeat. Sessions complètent activations : licences floating limitent utilisateurs <em>concurrents</em> ; licences perpetual et node-locked en ligne utilisent sessions pour monitoring live et nettoyage.</p>
      <p>Parcours combiné : \${link('/sessions-activations', 'Guide sessions &amp; activations')} · \${link('/perpetual-license', 'Perpetual online')} · \${link('/node-locked-license', 'Node-Locked online')}.</p>

      <h2>Cycle de vie session</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Start</strong> — SDK <code>SessionManager</code> ouvre session après validation/activation réussie.</li>
        <li><strong>Heartbeat</strong> — ping périodique maintient session vivante ; heartbeats stale marquent offline.</li>
        <li><strong>Concurrent check</strong> — modèle floating compte sessions actives vs <code>maxActiveUsers</code>.</li>
        <li><strong>End</strong> — arrêt client ou appel end explicite libère siège.</li>
        <li><strong>Disconnect (operator)</strong> — terminaison forcée depuis tableau de bord pour sessions bloquées.</li>
        <li><strong>Cleanup</strong> — retirer lignes offline stale après confirmation support que client est parti.</li>
      </ol>

      <h2>Page Sessions globale</h2>
      <p>Sidebar : <strong>Sessions</strong> (Active Sessions). Monitoring style NOC de qui est en ligne maintenant.</p>
      \${screenshot('platform-sessions-global-list.png', 'Active Sessions globales — bascule Live, recherche, âge heartbeat, déconnexion')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Live</strong> — auto-refresh tant qu'activé (week-ends release, migrations licences).</li>
        <li><strong>Online / offline filter</strong> — focus clients live vs lignes historiques.</li>
        <li><strong>Search</strong> — clé licence, email utilisateur, nom machine, version app.</li>
        <li><strong>Disconnect</strong> — terminaison à distance ; client échoue au prochain heartbeat.</li>
        <li><strong>Details panel</strong> — chaîne version, IP/geo si collecté, id session pour corrélation API.</li>
      </ul>

      <h2>Onglet Sessions par licence</h2>
      <p>Mêmes données que page globale limitées à une licence — idéal pour une clé perpetual, node-locked ou floating.</p>
      \${screenshot('platform-node-locked-sessions-tab.png', 'Onglet Active Sessions par licence avec heartbeat et actions déconnexion')}

      <h2>Quand sessions comptent</h2>
      <table>
        <thead><tr><th>Modèle</th><th>Rôle sessions</th></tr></thead>
        <tbody>
          <tr><td><strong>Floating</strong></td><td>Application principale — sessions live concurrentes = nombre sièges</td></tr>
          <tr><td><strong>Perpetual online</strong></td><td>Visibilité, détection abus, déconnexion support</td></tr>
          <tr><td><strong>Node-Locked online</strong></td><td>Une session active typique ; heartbeat prouve client encore actif</td></tr>
          <tr><td><strong>Subscription</strong></td><td>Détecter clients stale après grâce annulation</td></tr>
          <tr><td><strong>Credit-Based / Usage-Based</strong></td><td>Suivi session optionnel aux côtés mesure onglet Usage</td></tr>
        </tbody>
      </table>

      <h2>Rôles</h2>
      <p>Visibilité : system Admin, org Admin, propriétaire produit (filtré API). Members/Viewers ne gèrent pas sessions.</p>

      <p>\${link('/api/activations-sessions', 'Sujet REST')} · \${link('/sdk/activation-session', 'SDK sessions')} · \${link('/guides/platform/activations', 'Activations')}</p>
    `,
  },
};
