/** @type {{ ar: {title:string,lead:string,body:string}, fr: {title:string,lead:string,body:string} }} */
export default {
  ar: {
    title: 'الميزات ومجموعات الاستحقاق',
    lead:
      'عرّف القدرات، اجمعها في SKUs، عيّن المجموعات للتراخيص، وطبّقها في SDK وقت التشغيل.',
    body: String.raw`
      <p><strong>الميزات</strong> هي مفاتيح أو قدرات ذرية (مثل <code>export_pdf</code>، <code>max_projects</code>). <strong>مجموعات الاستحقاق</strong> تجمع الميزات للتعيين على التراخيص حتى تشحن حزماً دون إعادة compile لكل SKU.</p>

      <h2>دورة حياة التكوين</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>تعريف الميزات</strong> في علامة تبويب <strong>Features</strong> للمنتج (<code>…/features</code>).</li>
        <li><strong>تجميع</strong> في مجموعات استحقاق في علامة <strong>Entitlement Sets</strong> (<code>…/entitlements</code>).</li>
        <li><strong>تعيين</strong> مجموعة اختيارية عند إنشاء/تعديل ترخيص (الخطوة 1 في المعالج أو التفاصيل).</li>
        <li><strong>توزيع</strong> <code>license.bin</code> — الحمولة الموقّعة تتضمن مادة الاستحقاق.</li>
        <li><strong>تطبيق</strong> في التطبيق عبر SDK <code>FeatureManager</code>؛ <code>FeatureUsageTracker</code> اختياري للقياس.</li>
      </ol>

      <h2>علامة تبويب Features</h2>
      <p>مالكو المنتج يعرّفون كتalog القدرات قبل تجميع SKUs. المستخدمون النهائيون وغير المالكين لا يرون هذه العلامة.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>مفتاح الميزة</strong> — معرّف ثابت يُشار إليه في الكود (<code>FeatureManager.IsEnabled("key")</code>).</li>
        <li><strong>اسم العرض والوصف</strong> — توثيق المشغّل وسياق الدعم.</li>
        <li><strong>Assign to groups</strong> — وسوم زرقاء (مثل Groub1، Groub2) تجمع الميزات مسبقاً لكتابة مجموعة الاستحقاق.</li>
        <li><strong>Create Feature</strong> — يضيف صفاً للجدول القابل للبحث مع تاريخ الإنشاء وقائمة الإجراءات.</li>
        <li><strong>Type / default</strong> — بوابات boolean، حدود رقمية، أو قيم منظمة حسب نموذج منتجك.</li>
      </ul>
      <p><strong>نصيحة تصميم:</strong> فضّل مفاتيح أقل ومسماة جيداً على عشرات المفاتيح المتداخلة — العملاء يستلمون الاستحقاقات عبر المجموعات، وليس صفوف الميزات الفردية.</p>
      \${screenshot('platform-product-features.png', 'علامة تبويب Product Features: تعريف الميزات والتعيين لمجموعات الاستحقاق')}

      <h2>علامة تبويب Entitlement Sets</h2>
      <p>اجمع الميزات في حزم قابلة لإعادة الاستخدام يرفقها المشغّلون عند إنشاء الترخيص.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Set</strong> — الاسم، الوصف، ووسوم الإصدار المرتبطة (1.0.0، 1.0.3، …).</li>
        <li><strong>عمود Features</strong> — عدد القدرات في كل مجموعة (مثل «3 features»).</li>
        <li><strong>Add features</strong> — اختيار من الكتalog بقيم لكل ميزة (مفعّل، حدود).</li>
        <li><strong>معالج الترخيص</strong> — المجموعات المحفوظة تظهر في القائمة المنسدلة للخطوة 1.</li>
        <li><strong>تأثير التعديل</strong> — التغييرات تؤثر على الإصدارات <strong>الجديدة</strong>؛ التراخيص الموقّعة الحالية تحتفظ بالمادة القديمة حتى إعادة الإصدار أو التحديث online.</li>
      </ul>
      \${screenshot('platform-product-entitlement-sets.png', 'علامة تبويب Entitlement Sets: تجميع الميزات في مجموعات قابلة لإعادة الاستخدام مرتبطة بالإصدارات')}

      <h2>التطبيق وقت التشغيل</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Offline</strong> — الاستحقاقات داخل <code>license.bin</code> الموقّع؛ SDK يتحقق من التوقيع ثم يقرأ حمولة الميزة.</li>
        <li><strong>تحديث online</strong> — التحقق أو نقاط نهاية الميزات قد تحدّث الاستحقاقات عند تغيّر الاشتراك منتصف المدة.</li>
        <li><strong>تتبع الاستخدام</strong> — عدّادات اختيارية تُرسل لمسارات القياس عن بُعد (\${link('/api/telemetry', 'Telemetry API')}).</li>
      </ul>

      <h2>الأدوار</h2>
      <p>فقط <strong>مالكو المنتج</strong> و<strong>system Admin</strong> يرون علامات Features وEntitlements. الأعضاء يستهلكون الاستحقاقات عبر التراخيص التي يحملونها — ولا يؤلفونها.</p>

      <p>\${link('/sdk/features-usage', 'SDK: Features &amp; usage')} · \${link('/api/catalog', 'REST catalog')} · \${link('/guides/platform/licenses', 'التراخيص (البائع)')} · \${link('/guides/platform/products', 'المنتجات')}</p>
    `,
  },
  fr: {
    title: 'Fonctionnalités et jeux de droits',
    lead:
      'Définissez les capacités, regroupez-les en SKU, assignez les jeux aux licences et appliquez-les dans le SDK à l\'exécution.',
    body: String.raw`
      <p>Les <strong>features</strong> sont des bascules ou capacités atomiques (p.ex. <code>export_pdf</code>, <code>max_projects</code>). Les <strong>jeux de droits</strong> regroupent features pour assignation aux licences afin de livrer des packages sans recompiler pour chaque SKU.</p>

      <h2>Cycle de vie configuration</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Définir features</strong> sur onglet <strong>Features</strong> produit (<code>…/features</code>).</li>
        <li><strong>Regrouper</strong> en jeux de droits sur onglet <strong>Entitlement Sets</strong> (<code>…/entitlements</code>).</li>
        <li><strong>Assigner</strong> jeu optionnel à la création/modification licence (étape 1 assistant ou détails).</li>
        <li><strong>Distribuer</strong> <code>license.bin</code> — charge signée inclut matériel droits.</li>
        <li><strong>Appliquer</strong> dans l'app via SDK <code>FeatureManager</code> ; <code>FeatureUsageTracker</code> optionnel pour mesure.</li>
      </ol>

      <h2>Onglet Features</h2>
      <p>Propriétaires produit définissent le catalogue capacités avant regroupement SKU. Utilisateurs finaux et non-propriétaires ne voient pas cet onglet.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Clé feature</strong> — identifiant stable référencé en code (<code>FeatureManager.IsEnabled("key")</code>).</li>
        <li><strong>Nom affiché et description</strong> — documentation opérateur et contexte support.</li>
        <li><strong>Assign to groups</strong> — tags bleus (p.ex. Groub1, Groub2) pré-groupe features pour rédaction jeux droits.</li>
        <li><strong>Create Feature</strong> — ajoute ligne au tableau searchable avec date création et menu actions.</li>
        <li><strong>Type / default</strong> — portes booléennes, limites numériques ou valeurs structurées selon modèle produit.</li>
      </ul>
      <p><strong>Conseil design :</strong> préférez moins de clés bien nommées à des dizaines de bascules chevauchantes — clients reçoivent droits via sets, pas lignes feature individuelles.</p>
      \${screenshot('platform-product-features.png', 'Onglet Product Features : définir features et assigner aux groupes droits')}

      <h2>Onglet Entitlement Sets</h2>
      <p>Regroupez features en packages réutilisables attachés à la création licence.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Create Set</strong> — nom, description et tags version liés (1.0.0, 1.0.3, …).</li>
        <li><strong>Colonne Features</strong> — nombre capacités par set (p.ex. « 3 features »).</li>
        <li><strong>Add features</strong> — choisir dans catalogue avec valeurs par feature (activé, limites).</li>
        <li><strong>Assistant licence</strong> — sets enregistrés apparaissent dans liste déroulante étape 1.</li>
        <li><strong>Impact édition</strong> — changements affectent émissions <strong>nouvelles</strong> ; licences signées existantes gardent ancien matériel jusqu'à ré-émission ou refresh online.</li>
      </ul>
      \${screenshot('platform-product-entitlement-sets.png', 'Onglet Entitlement Sets : regrouper features en sets réutilisables liés aux versions')}

      <h2>Application runtime</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Offline</strong> — droits dans <code>license.bin</code> signé ; SDK vérifie signature puis lit charge feature.</li>
        <li><strong>Refresh online</strong> — validation ou endpoints feature peuvent mettre à jour droits si abonnement change en cours de terme.</li>
        <li><strong>Suivi usage</strong> — compteurs optionnels envoyés aux routes télémétrie (\${link('/api/telemetry', 'API Télémétrie')}).</li>
      </ul>

      <h2>Rôles</h2>
      <p>Seuls <strong>propriétaires produit</strong> et <strong>system Admin</strong> voient onglets Features et Entitlements. Members consomment droits via licences détenues — ne les rédigent pas.</p>

      <p>\${link('/sdk/features-usage', 'SDK : Features et usage')} · \${link('/api/catalog', 'Catalogue REST')} · \${link('/guides/platform/licenses', 'Licences (éditeur)')} · \${link('/guides/platform/products', 'Produits')}</p>
    `,
  },
};
