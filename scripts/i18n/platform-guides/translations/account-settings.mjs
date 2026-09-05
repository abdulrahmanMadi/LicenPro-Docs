export default {
  ar: {
    title: 'إعدادات الحساب',
    lead:
      'ملف المشغّل، الأمان، الإشعارات، خطة الاشتراك، الفوترة، مفاتيح REST API، وحذف الحساب — منفصلة عن مفاتيح RSA لكل منتج.',
    body: String.raw`
      <p><strong>إعدادات الحساب</strong> تدير <em>أنت</em> كمستخدم للمنصة — وليس منتجاً أو مؤسسة. مفاتيح توقيع المنتج تعيش تحت Product → Settings (\${link('/rsa-keys', 'دليل مفاتيح RSA')})؛ <strong>مفاتيح API</strong> للحساب تؤتمت استدعاءات REST ببيانات اعتماد JWT بنطاق.</p>

      <h2>المسار</h2>
      <p>افتح <strong>Settings</strong> (أيقونة الترس) من الشريط الجانبي. العلامات تُقاد بمعامل الاستعلام: profile، security، notifications، manage plan، API keys، وdanger zone. الفوترة والدفع صفحات مجاورة للترقيات.</p>

      <h2>أقسام الإعدادات</h2>

      <h3>My Profile</h3>
      <p>اسم العرض، الصورة الرمزية، بريد الاتصال، تفضيلات المنطقة الزمنية. تحدّث هوية المشغّل المعروضة في سجلات التدقيق والدعوات — وليس بيانات الترخيص أو مفاتيح RSA للمنتج.</p>

      <h3>Security</h3>
      <p>تغيير كلمة المرور، المصادقة الثنائية، ومراجعة جلسات تسجيل الدخول النشطة على حساب المشغّل.</p>

      <h3>Notifications</h3>
      <p>تفضيلات البريد وداخل التطبيق: أحداث الترخيص، الدعوات، الفوترة، التسويق (حسب المفاتيح). لا تغيّر قياس تطبيق العميل.</p>

      <h3>Manage plan</h3>
      <p>مستوى الاشتراك الحالي (Free مقابل Pro)، حدود المؤسسات والمنتجات وأنواع التراخيص وموصلات التخزين. تدفقات الترقية ترتبط بالدفع. المنتجات المقفلة تعرض <code>isSubscriptionLocked</code> في واجهة المستخدم — المالكون لا يمكنهم الإدارة حتى استعادة الخطة.</p>

      <h3>Billing</h3>
      <p>الفواتير وطريقة الدفع وسجل المدفوعات — سطح تجاري مجاور لـ manage plan.</p>

      <h3>API keys</h3>
      <p>توليد بيانات اعتماد REST بنطاق لـ CI/CD والأدوات الداخلية:</p>
      <ul style="margin-left:1.25rem;">
        <li>الاسم، الوصف، انتهاء اختياري.</li>
        <li>Scopes: Read/Write Licenses، Activations، Products، Releases.</li>
        <li>السر يُعرض مرة واحدة — خزّنه في خزنة (\${link('/rsa-keys', 'جولة كاملة لمفاتيح API')}).</li>
      </ul>

      <h3>Danger zone</h3>
      <p>حذف حساب المشغّل — لا رجعة. لا يحذف المؤسسات التي تملكها؛ انقل ملكية المؤسسة أولاً.</p>

      <p>\${link('/api/auth-users', 'Auth &amp; users API')} · \${link('/api/security', 'Security API')} · \${link('/api/billing', 'Billing API')} · \${link('/guides/platform/overview', 'نظرة عامة على النظام')}</p>
    `,
  },
  fr: {
    title: 'Paramètres du compte',
    lead:
      "Profil opérateur, sécurité, notifications, forfait abonnement, facturation, clés API REST et suppression compte — séparés des clés RSA par produit.",
    body: String.raw`
      <p>Les <strong>paramètres du compte</strong> gèrent <em>vous</em> en tant qu'utilisateur plateforme — pas un produit ou une institution. Clés signature produit vivent sous Product → Settings (\${link('/rsa-keys', 'Guide clés RSA')}) ; <strong>clés API</strong> compte automatisent appels REST avec identifiants JWT à portée.</p>

      <h2>Route</h2>
      <p>Ouvrez <strong>Settings</strong> (icône engrenage) depuis la sidebar. Onglets pilotés par paramètre requête : profile, security, notifications, manage plan, API keys et danger zone. Facturation et checkout sont pages adjacentes pour upgrades.</p>

      <h2>Sections paramètres</h2>

      <h3>My Profile</h3>
      <p>Nom affiché, avatar, email contact, préférences fuseau horaire. Met à jour identité opérateur affichée dans audit logs et invitations — pas métadonnées licence ni clés RSA produit.</p>

      <h3>Security</h3>
      <p>Changement mot de passe, authentification deux facteurs et revue sessions connexion actives sur votre compte opérateur.</p>

      <h3>Notifications</h3>
      <p>Préférences email et in-app : événements licence, invitations, facturation, marketing (selon bascules). Ne change pas télémétrie app cliente.</p>

      <h3>Manage plan</h3>
      <p>Niveau abonnement actuel (Free vs Pro), limites institutions, produits, types licence et connecteurs stockage. Flux upgrade liés au checkout. Produits verrouillés affichent <code>isSubscriptionLocked</code> dans l'UI — propriétaires ne peuvent pas gérer tant que forfait n'est pas restauré.</p>

      <h3>Billing</h3>
      <p>Factures, moyen de paiement et historique paiements — surface commerce adjacente à manage plan.</p>

      <h3>API keys</h3>
      <p>Générer identifiants REST à portée pour CI/CD et outils internes :</p>
      <ul style="margin-left:1.25rem;">
        <li>Nom, description, expiration optionnelle.</li>
        <li>Scopes : Read/Write Licenses, Activations, Products, Releases.</li>
        <li>Secret affiché une fois — stockez dans un coffre (\${link('/rsa-keys', 'Parcours complet clés API')}).</li>
      </ul>

      <h3>Danger zone</h3>
      <p>Supprimer compte opérateur — irréversible. Ne supprime pas institutions que vous possédez ; transférez propriété institution d'abord.</p>

      <p>\${link('/api/auth-users', 'API Auth &amp; users')} · \${link('/api/security', 'API Sécurité')} · \${link('/api/billing', 'API Facturation')} · \${link('/guides/platform/overview', 'Vue d\'ensemble système')}</p>
    `,
  },
};
