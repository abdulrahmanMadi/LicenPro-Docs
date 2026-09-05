export default {
  ar: {
    title: 'التحليلات والإحصائيات',
    lead:
      'مؤشرات KPI للتبنّي، اتجاهات التفعيل، مزيج التراخيص، التصدير، والتقارير المجدولة عبر المؤسسات والمنتجات.',
    body: String.raw`
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
        <li><code>/dashboard/logs</code> — سجلات مدمجة system Admin (audit، login، email، SDK).</li>
      </ul>

      <h2>مصادر البيانات (API)</h2>
      <p>تجميعات من <code>/api/Analytics/…</code> و<code>/api/Statistics/…</code>، بالإضافة إلى \${link('/api/telemetry', 'Telemetry &amp; logs API')} لشحن سجلات SDK وسجلات لوحة التحكم.</p>

      <h2>الأدوار</h2>
      <p>Org Admins ومالكو المنتج يرون analytics بنطاق المؤسسة. System Admin يرى عروضاً على مستوى المنصة. Viewers/Members يرون analytics محدودة أو لا شيء حسب التعيين.</p>

      <p>\${link('/guides/platform/organizations', 'المؤسسات')} · \${link('/guides/platform/activations', 'Activations')} · \${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  fr: {
    title: 'Analytique & statistiques',
    lead:
      "KPI adoption, tendances activations, mix licences, exports et rapports planifiés à travers institutions et produits.",
    body: String.raw`
      <p>Le tableau de bord <strong>Analytics</strong> consolide métriques opérationnelles : combien de licences actives, où activations pic, pression conversion essai et adoption par produit. Complète listes ponctuelles (Licenses, Activations) avec vues séries temporelles.</p>

      <h2>Route tableau de bord</h2>
      <p>Ouvrez <strong>Analytics</strong> depuis la sidebar. Page unique avec sections filtrables — pas de sous-onglets. Utilisez sélecteur institution et plage dates avant export ou planification rapports.</p>

      <h2>Sections page</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Sélecteur institution</strong> — limiter graphiques à un locataire (opérateurs multi-org).</li>
        <li><strong>Plage dates</strong> — préréglages (7D, 30D, 90D, YTD) et plages custom.</li>
        <li><strong>Cartes KPI</strong> — totaux licences, actif vs expiré, comptes activations, stats essai, métriques type revenus si facturation intégrée.</li>
        <li><strong>Graphiques</strong> — activations dans le temps, mix types licence, top produits par usage.</li>
        <li><strong>Ticket KPIs</strong> — quand module support activé, superposition volume tickets.</li>
      </ul>

      <h2>Export &amp; planification</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Export dialog</strong> — instantanés PDF, CSV, Excel des filtres courants.</li>
        <li><strong>Scheduled reports</strong> — envoyer résumés récurrents par email aux parties prenantes (selon déploiement/forfait).</li>
      </ul>

      <h2>Surfaces audit associées</h2>
      <ul style="margin-left:1.25rem;">
        <li><code>/dashboard/audit-logs</code> — piste audit à portée utilisateur.</li>
        <li>Institution <code>…/audit-logs</code> et produit <code>…/audit-logs</code> — pistes à portée.</li>
        <li><code>/dashboard/logs</code> — logs fusionnés system Admin (audit, login, email, SDK).</li>
      </ul>

      <h2>Sources données (API)</h2>
      <p>Agrégats depuis <code>/api/Analytics/…</code>, <code>/api/Statistics/…</code>, plus \${link('/api/telemetry', 'API Télémétrie &amp; logs')} pour envoi logs SDK et logs tableau de bord.</p>

      <h2>Rôles</h2>
      <p>Org Admins et propriétaires produit voient analytics à portée institution. System Admin voit vues plateforme. Viewers/Members voient analytics limitées ou aucune selon assignation.</p>

      <p>\${link('/guides/platform/organizations', 'Institutions')} · \${link('/guides/platform/activations', 'Activations')} · \${link('/guides/platform/overview', 'Vue d\'ensemble système')}</p>
    `,
  },
};
