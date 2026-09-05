export default {
  ar: {
    title: 'موصلات التخزين',
    lead:
      'أرفق ملفات الإصدار عبر Google Drive أو OneDrive أو خادم مخصص بدلاً من دفع ملفات كبيرة عبر API الأساسي في كل رفع.',
    body: String.raw`
      <p><strong>موصلات التخزين</strong> تربط LicenPro بمضيفي ملفات خارجيين. استخدمها عندما تعيش المثبتات أو حزم delta أو ملاحظات الإصدار على محركات سحابية أو CDN خاص بك — سجلات الإصدار في LicenPro ما زالت تشير إلى بيانات الإصدار الوصفية بينما تُحلّ الملفات من التخزين البعيد.</p>

      <h2>دورة حياة التخزين</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Connect</strong> — مصادقة المزود في مركز Storage.</li>
        <li><strong>Configure</strong> — اختر المجلدات أو بيانات الاعتماد أو URL أساس الخادم المخصص.</li>
        <li><strong>Upload / link</strong> — ضع الملفات في واجهة المزود أو متصفح تخزين LicenPro.</li>
        <li><strong>Bind to release</strong> — اربط مسار/معرّف الملف عند تعديل \${link('/guides/platform/releases', 'إصدار')}.</li>
        <li><strong>SDK update check</strong> — العميل يحلّ URL التنزيل عبر update API + بيانات التخزين.</li>
        <li><strong>Revoke</strong> — افصل المزود؛ روابط الإصدار الحالية قد تنكسر حتى إعادة الربط.</li>
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

      <p>\${link('/api/storage', 'موضوع Storage REST')} · \${link('/guides/platform/releases', 'الإصدارات')} · \${link('/sdk/updates-logging', 'تحديثات SDK')}</p>
    `,
  },
  fr: {
    title: 'Connecteurs stockage',
    lead:
      "Attachez binaires de version via Google Drive, OneDrive ou serveur personnalisé au lieu de pousser gros fichiers via l'API core à chaque upload.",
    body: String.raw`
      <p>Les <strong>connecteurs stockage</strong> lient LicenPro à des hôtes de fichiers externes. Utilisez-les quand installateurs, packages delta ou notes de version vivent sur drives cloud ou votre CDN — enregistrements version dans LicenPro pointent toujours vers métadonnées version tandis que artefacts se résolvent depuis stockage distant.</p>

      <h2>Cycle de vie stockage</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Connect</strong> — authentifier fournisseur au hub Storage.</li>
        <li><strong>Configure</strong> — choisir dossiers, identifiants ou URL base serveur personnalisé.</li>
        <li><strong>Upload / link</strong> — placer binaires dans UI fournisseur ou navigateur stockage LicenPro.</li>
        <li><strong>Bind to release</strong> — associer chemin/id artefact en éditant une \${link('/guides/platform/releases', 'version')}.</li>
        <li><strong>SDK update check</strong> — client résout URL téléchargement via update API + métadonnées stockage.</li>
        <li><strong>Revoke</strong> — déconnecter fournisseur ; liens version existants peuvent casser jusqu'à re-liaison.</li>
      </ol>

      <h2>Hub Storage</h2>
      <p>Sidebar : <strong>Storage</strong>. Connectez hôtes fichiers externes avant d'attacher binaires aux versions.</p>

      <h2>Comparaison fournisseurs</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Google Drive</strong> — OAuth Google ; parcourir dossiers ; upload/list/delete via <code>/api/Storage/…</code> ou routes Drive.</li>
        <li><strong>OneDrive</strong> — OAuth Microsoft ; sémantiques list/upload similaires via <code>/api/OneDriveStorage/…</code>.</li>
        <li><strong>Custom server</strong> — votre endpoint HTTPS ; LicenPro proxy list/upload/delete via <code>/api/CustomServerStorage/…</code> ; requiert garde Pro dans l'UI.</li>
      </ul>

      <h2>Workflow opérateur</h2>
      <ol style="margin-left:1.25rem;">
        <li>Ouvrir <strong>Storage</strong> depuis sidebar.</li>
        <li>Choisir fournisseur → compléter OAuth ou saisir URL serveur + identifiants.</li>
        <li>Vérifier qu'un upload test apparaît dans navigateur fournisseur.</li>
        <li>Lors publication version, attacher référence artefact au lieu d'embarquer gros blobs dans charges API.</li>
        <li>Valider que chemin mise à jour SDK télécharge depuis URL attendue en staging.</li>
      </ol>

      <h2>Rôles &amp; forfaits</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Propriétaires produit</strong> — configurent typiquement stockage utilisé par leurs versions.</li>
        <li><strong>Custom server</strong> — peut requérir abonnement Pro (garde forfait sur route).</li>
        <li><strong>System Admin</strong> — dépanner échecs OAuth connecteur à l'échelle plateforme.</li>
      </ul>

      <p>\${link('/api/storage', 'Sujet REST Stockage')} · \${link('/guides/platform/releases', 'Versions')} · \${link('/sdk/updates-logging', 'Mises à jour SDK')}</p>
    `,
  },
};
