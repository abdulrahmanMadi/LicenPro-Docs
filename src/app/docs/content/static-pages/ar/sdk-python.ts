export const HTML = `<header class="help-page-header">
    <h1>Python SDK</h1>
    <p class="lead">
      تجلب حزمة <code>licenpro</code> ترخيص LicenPro إلى Python. وهي ليست إعادة كتابة: منطق الترخيص هو نفسه <bdi>.NET SDK</bdi> من LicenPro، مُترجَماً إلى مكتبة أصلية (native library) مع واجهة Python صغيرة فوقها.
      لذلك تعمل التراخيص والتفعيلات والجلسات تماماً كما في <bdi>.NET</bdi>. لا حاجة إلى <bdi>.NET runtime</bdi> ولا إلى أي حزم Python أخرى.
    </p>
  </header>

  <div class="help-callout warning">
    <i class="ki-outline ki-information"></i>
    <div>
      <span class="callout-title">معاينة: الحزمة ليست على PyPI بعد</span>
      <p>لم تُنشر الحزمة على PyPI بعد، لذا لا يعمل الأمر <code>pip install licenpro</code> حالياً. إلى أن تُنشر، اطلب نسخة المعاينة من <a href="https://licenpro.tech/support" class="doc-inline-link">الدعم</a>.
      تعمل الحزمة حالياً على <strong><bdi>Windows 64-bit (x64)</bdi></strong> فقط: نسخ Linux وmacOS غير متاحة بعد، ولا يستطيع Python بنسخة <bdi>32-bit</bdi> تحميلها.</p>
    </div>
  </div>

  <h2>1. المتطلبات والتثبيت</h2>
  <ul>
    <li>Windows x64 مع Python بنسخة <bdi>64-bit</bdi>، الإصدار 3.8 أو أحدث.</li>
    <li>الأشياء الثلاثة نفسها التي يحتاجها كل عميل LicenPro: ملف <code>license.bin</code> الخاص بالعميل، ومفتاح ترخيصه، والمفتاح العام لمنتجك (Base64 بدون رؤوس PEM؛ راجع <a href="/rsa-keys" class="doc-inline-link">مفاتيح RSA</a>).</li>
  </ul>
  <p>بعد نشر الحزمة على PyPI:</p>

  <pre><code>pip install licenpro</code></pre>

  <h2>2. التحقق من ترخيص</h2>
  <p>استخدم العميل داخل كتلة <code>with</code>. الخروج من الكتلة يُنهي جلسة الترخيص، مثل <code>Using</code> في VB.NET أو <code>using</code> في <bdi>C#</bdi>.</p>

  <pre><code>from licenpro import LicenseClient

PUBLIC_KEY = "MIIBCgKCAQEA..."       # your product public key (Base64, without PEM headers)
LICENSE_KEY = "XXXX-XXXX-XXXX-XXXX"

with LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY) as client:
    result = client.validate()
    if not result.is_valid:
        print(result.status, result.error_title, result.error_message)
    else:
        print("Licensed:", result.license.type, result.license.expiration_date)
        if client.features.is_enabled("Premium"):
            ...  # unlock the premium part of your app</code></pre>

  <p>
    تُجري <code>validate()</code> الفحص الكامل: الملف الموقّع، والخادم، والتفعيل، والجلسة عندما يتطلبها الترخيص.
    رفض الترخيص نتيجةٌ تكون فيها <code>is_valid</code> مساوية لـ <code>False</code>، وليس استثناءً. قيمة <code>result.status</code> واحدة من <code>Valid</code> و<code>MissingInput</code> و<code>WrongFileType</code> و<code>InvalidFormat</code> و<code>SignatureMismatch</code> و<code>ValidationFailed</code> و<code>Expired</code> و<code>Revoked</code> و<code>DeviceBlocked</code> و<code>WrongLicenseType</code> و<code>CredentialsMismatch</code>، وتكون <code>result.license</code> مساوية لـ <code>None</code> عند فشل التحقق.
  </p>
  <p>للترخيص المسموح باستخدامه دون اتصال، تفحص <code>validate_offline()</code> التوقيع والقواعد المحلية دون الاتصال بالخادم:</p>

  <pre><code>result = client.validate_offline()</code></pre>

  <h2>3. الخيارات</h2>

  <pre><code>client = LicenseClient(
    "license.bin",
    public_key=PUBLIC_KEY,
    license_key=LICENSE_KEY,
    server_endpoint="https://licenpro.runasp.net/api",   # the default; change it if you host the API
    product_id="00000000-0000-0000-0000-000000000000",   # optional
    expected_license_type="Subscription",               # optional: refuse other license types
    enable_logging=False,                               # True: log files, and errors sent to the server
)</code></pre>

  <p>
    يقبل <code>expected_license_type</code> القيم <code>Perpetual</code> و<code>Trial</code> و<code>Subscription</code> و<code>NodeLocked</code> و<code>Floating</code> و<code>Concurrent</code> و<code>MeteredToken</code> (Credit-Based) و<code>MeteredCount</code> (Usage-Based).
    مع <code>enable_logging=True</code> يكتب SDK ملفات سجل ويرسل الأخطاء إلى الخادم، كما يفعل <bdi>.NET SDK</bdi>.
  </p>

  <h2>4. التطبيقات طويلة التشغيل</h2>
  <p>
    يحتفظ تطبيق سطح المكتب أو الخادم بعميل واحد طوال عمره ويغلقه عند الخروج. استخدم عميلاً واحداً في كل مرة داخل العملية، كما في <bdi>.NET</bdi>.
    تنتظر <code>validate()</code> حتى ينتهي SDK من عمله، بما في ذلك الاتصال بالشبكة: في تطبيقات الواجهة الرسومية استدعِها من خيط عامل (worker thread).
  </p>

  <pre><code>client = LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY)
try:
    result = client.validate()
    ...  # run your application
finally:
    client.close()  # ends the license session; safe to call more than once</code></pre>

  <h2>5. الميزات وتفاصيل الترخيص</h2>

  <pre><code>features = client.features        # empty until a validation succeeds
features.is_enabled("Premium")    # False when the feature is missing
features.get("MaxUsers", 1)       # numbers, strings, ISO 8601 dates, Base64 for bytes
"Edition" in features
features.as_dict()</code></pre>

  <p>تحتوي <code>result.license</code> أيضاً على <code>type</code> و<code>license_key</code> و<code>issuer</code> و<code>issued_on</code> و<code>expiration_date</code> (قيمة <code>datetime</code>، أو <code>None</code> عندما لا ينتهي الترخيص) و<code>assigned_release_version</code> و<code>requires_online_validation</code> و<code>features</code>.</p>

  <h2>6. الأخطاء</h2>
  <p>يُرفع <code>LicenProError</code> فقط عند سوء الاستخدام أو الأعطال غير المتوقعة: عميل مُغلق (<code>Closed</code>)، أو خيارات غير صالحة (<code>InvalidArgument</code>)، أو مكتبة أصلية مفقودة (<code>NativeLibraryMissing</code>)، أو خطأ غير متوقع داخل SDK (<code>Exception</code>). ويحتوي على <code>code</code> و<code>message</code>.</p>

  <pre><code>from licenpro import LicenseClient, LicenProError

try:
    with LicenseClient("license.bin", public_key=PUBLIC_KEY, license_key=LICENSE_KEY) as client:
        result = client.validate()
except LicenProError as error:
    print(error.code, error.message)   # for example NativeLibraryMissing or InvalidArgument</code></pre>

  <h2>7. معرّف الجهاز وإصدار SDK</h2>

  <pre><code>import licenpro

print(licenpro.sdk_version())   # version of the LicenPro SDK inside the package
print(licenpro.hardware_id())   # the device id LicenPro reports for this machine</code></pre>

  <h2>8. Python و<bdi>.NET</bdi> جنباً إلى جنب</h2>
  <table class="doc-table">
    <thead>
      <tr><th>Python</th><th><bdi>.NET</bdi></th></tr>
    </thead>
    <tbody>
      <tr><td><code>LicenseClient(license_file, public_key, license_key, ...)</code></td><td><code>new LicenseClient(new LicenseClientOptions { ... })</code></td></tr>
      <tr><td><code>client.validate()</code>، <code>client.validate_offline()</code></td><td><code>Validate()</code>، <code>ValidateOffline()</code></td></tr>
      <tr><td><code>result.is_valid</code>، <code>status</code>، <code>error_title</code>، <code>error_message</code>، <code>license</code></td><td><code>IsValid</code>، <code>Status</code>، <code>ErrorTitle</code>، <code>ErrorMessage</code>، <code>License</code></td></tr>
      <tr><td><code>client.features.is_enabled("X")</code>، <code>client.features["X"]</code></td><td><code>FeatureManager.IsFeatureEnabled("X")</code>، <code>FeatureManager.GetFeatureInt("X")</code> …</td></tr>
      <tr><td><code>client.disconnect()</code>، <code>client.close()</code></td><td><code>DisconnectAsync()</code>، <code>DisposeAsync()</code></td></tr>
      <tr><td><code>licenpro.hardware_id()</code></td><td><code>new PersistedHardwareIdentifier().GetHardwareIdentifier()</code></td></tr>
    </tbody>
  </table>

  <h2>9. غير متاح من Python بعد</h2>
  <p>
    لا يوفّر Python إلا ما تعرضه هذه الصفحة. ما يلي يتطلب حزمة <bdi>.NET</bdi> حالياً: العدّادات (metering: <code>ConsumeMeterAsync</code> و<code>GetBalanceAsync</code>)، والتراخيص التجريبية وتمديدها، ونقل التراخيص، وإدارة أجهزة node-locked، والأحداث (فقدان الجلسة، اقتراب انتهاء الترخيص)، وأدوات السجل ومعرّفات الأجهزة المخصّصة.
    التحديث بضغطة واحدة (<code>SdkUpdateManager</code>) مخصّص لتطبيقات <bdi>.NET</bdi> فقط، وهذا مقصود.
  </p>

  <h2>10. قراءة ذات صلة</h2>
  <div class="integration-grid">
    <a href="/quick-start" class="integration-card">
      <i class="ki-outline ki-flag"></i>
      <h4>البداية السريعة</h4>
      <p>المنتج والمفاتيح وملف الترخيص: نفسها لكل اللغات</p>
    </a>
    <a href="/rsa-keys" class="integration-card">
      <i class="ki-outline ki-shield-tick"></i>
      <h4>مفاتيح RSA</h4>
      <p>من أين يأتي المفتاح العام</p>
    </a>
    <a href="/perpetual-license" class="integration-card">
      <i class="ki-outline ki-key"></i>
      <h4>نماذج التراخيص</h4>
      <p>ما يفحصه كل نوع ترخيص</p>
    </a>
  </div>` as const;
