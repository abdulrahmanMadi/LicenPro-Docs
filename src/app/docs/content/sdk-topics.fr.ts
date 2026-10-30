import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';

export const SDK_TOPICS_FR: Record<string, DocTopic> = {
  overview: {
    title: 'Vue d’ensemble du .NET SDK',
    lead: 'Structure du package NuGet, responsabilités runtime et liens vers les approfondissements.',
    body: `
      <p>La bibliothèque <code>LicenPro.SDK</code> valide les licences signées hors ligne avec la <strong>clé publique</strong> de votre produit, et peut optionnellement communiquer avec <code>${HOST}/api</code> pour validation en ligne, activations, sessions, usage des fonctionnalités et mises à jour.</p>
      <h2>Domaines principaux (source : <code>LicenPro.SDK.lib</code>)</h2>
      <ul>
        <li><strong>Core</strong> — <code>LicenseClient</code>, <code>LicenseBuilder</code>, sérialisation des charges licence.</li>
        <li><strong>Managers</strong> — <code>ActivationManager</code>, <code>SessionManager</code>, <code>OfflineCacheManager</code>, <code>LicenseTransferManager</code>, <code>TrialExtensionManager</code>, <code>GracePeriodManager</code>, <code>NodeLockedDeviceManager</code>.</li>
        <li><strong>Features</strong> — <code>FeatureManager</code>, <code>UpdateChecker</code> (<code>FeatureUsageTracker</code> est obsolète ; la facturation metered passe par <code>MeterManager</code>).</li>
        <li><strong>Updates</strong> — <code>SdkUpdateManager</code> appelle les ${L('/api/sdk-host', 'API HTTP hôte SDK')}.</li>
        <li><strong>AppHosting</strong> — <code>SdkBootstrap</code>, aides UX d’expiration pour shells desktop.</li>
      </ul>
      <p>Poursuivez avec ${L('/sdk/configuration', 'Configuration')} → ${L('/sdk/license-client', 'LicenseClient')} → ${L('/sdk/dotnet', 'Exemple d’intégration .NET')}.</p>
    `,
  },
  configuration: {
    title: 'Configuration et initialisation',
    lead: 'SdkConfiguration, paramètres JSON et hooks de démarrage.',
    body: `
      <p><code>ServerBaseEndpoint</code> doit se terminer par <code>/api</code> (défaut cloud : <code>${HOST}/api</code>). Appelez <code>SdkConfiguration.Initialize</code> ou comptez sur la découverte <code>licenpro.settings.json</code> / <code>appsettings.json</code> (voir ${L('/quick-start', 'Démarrage rapide')}).</p>
      <p>Les hôtes desktop doivent invoquer <code>SdkBootstrap.OnApplicationStartup()</code> une fois avant la boucle de messages UI pour appliquer les mises à jour en attente et les défauts de thème de façon cohérente.</p>
      <p>${L('/sdk/dotnet', 'Page intégration .NET')} · ${L('/api/licenses', 'Contrat HTTP Validate')}</p>
    `,
  },
  'license-client': {
    title: 'Cycle de vie LicenseClient',
    lead: 'Validation, cache, auto-validation et surfaces d’erreur.',
    body: `
      <p><code>LicenseClient</code> est l’API principale : chemins vers <code>license.bin</code>, matériel de clé publique, clé de licence, type de licence attendu optionnel, id produit pour contrôles de mise à jour, et réglage des avertissements d’expiration.</p>
      <p>Après une validation en ligne réussie, appelez <code>TryAutoValidateAsync</code> (ou l’équivalent documenté pour votre version) pour garder le cache hors ligne chiffré prêt pour les scénarios isolés.</p>
      <p>La validation en ligne appelle <code>POST /api/Licenses/validate</code> avec la <code>X-API-KEY</code> produit — voir ${L('/api/licenses', 'Licenses REST')} et ${L('/sdk/dotnet', 'article .NET complet')}.</p>
      <p>Rien ne reste sous licence après un rejet. Lorsque <code>ValidateAsync</code> rejette une licence après l’avoir chargée (mauvais type de licence, mauvaise clé de licence, échec d’activation ou de session), le SDK déconnecte la session et efface <code>LicenseManager.Current</code> ainsi que les fonctionnalités. Une validation ultérieure échouée de la même clé, un heartbeat qui signale la licence comme invalide et <code>LicenseManager.CloseAsync</code> les effacent également.</p>
    `,
  },
  'activation-session': {
    title: 'Activation et sessions dans le SDK',
    lead: 'Gestionnaires qui parlent aux API Activations et Sessions.',
    body: `
      <p><code>ActivationManager</code> coordonne la liaison appareil et la consommation de sièges contre les ${L('/api/activations-sessions', 'routes d’activation')} sur <code>${HOST}/api</code>.</p>
      <p><code>SessionManager</code> maintient les intervalles heartbeat contre les ${L('/api/activations-sessions', 'routes de session')} lorsque votre politique de licence exige une application concurrente ou en ligne. La cadence provient de la réponse de connexion du serveur, pas du fichier de licence.</p>
      <p><code>SessionDisconnected</code> se déclenche lorsqu’un heartbeat signale la licence comme invalide (révoquée, suspendue, expirée, bloquée — les fonctionnalités de la licence sont désactivées), lorsqu’une reconnexion échoue, et une fois avec la raison <code>Unreachable</code> après 3 heartbeats sans réponse (la licence reste chargée et les tentatives continuent). Gérez-le pour indiquer à l’utilisateur ce qui s’est passé.</p>
      <p>${L('/sessions-activations', 'Récit tableau de bord')} · ${L('/guides/platform/activations', 'Guide plateforme Activations')}</p>
    `,
  },
  'features-usage': {
    title: 'Fonctionnalités et usage facturé',
    lead: 'FeatureManager pour les droits, MeterManager pour l’usage facturé.',
    body: `
      <p><code>FeatureManager</code> évalue les droits désérialisés depuis la licence signée. Les fonctionnalités sont effacées dès que le SDK juge que la licence n’est plus valable, donc <code>IsFeatureEnabled</code> renvoie <code>false</code> une fois qu’une révocation atteint l’app.</p>
      <p><strong>L’usage facturé passe par <code>MeterManager</code>, pas par <code>FeatureUsageTracker</code>.</strong> <code>FeatureUsageTracker</code> est <code>[Obsolete]</code> : son endpoint de synchronisation n’existe plus et il ne remonte rien, donc une facturation bâtie dessus ne facture jamais, sans la moindre erreur. Appelez <code>LicenseClient.ConsumeMeterAsync</code> (ou <code>ConsumeMeterWithRetryAsync</code>) avec un identifiant d’opération créé via <code>MeterManager.CreateOperationId</code> et enregistré avant l’appel — voir ${L('/credit-based-license', 'Credit-Based')} et ${L('/usage-based-license', 'Usage-Based')} pour le schéma complet, et ${L('/api/metering', 'API Metering')} pour les routes.</p>
      <p>Les définitions de fonctionnalités sont créées dans le tableau de bord et exposées via REST (routes catalogue sur <code>${HOST}/api</code>) — voir ${L('/api/catalog', 'Sujet API Catalogue')}.</p>
    `,
  },
  'offline-grace': {
    title: 'Cache hors ligne et périodes de grâce',
    lead: 'Période de grâce à l’expiration, fichiers hors ligne et comportement lorsque l’API est inaccessible.',
    body: `
      <p><code>GracePeriodManager</code> permet à une licence <strong>expirée</strong> de continuer à fonctionner pendant <code>GracePeriodDays</code> (0 par défaut, désactivé). La période de grâce ne couvre que l’expiration réelle — une licence sur le mauvais appareil ou avec la mauvaise clé n’est jamais acceptée — et son heure de début est stockée sur l’appareil, donc redémarrer l’app ne lance pas une nouvelle période de grâce.</p>
      <p>Les licences hors ligne (fichier) sont validées localement après une vérification en ligne unique lors du premier lancement sur chaque machine ; <code>ValidateOfflineAsync</code> ne contacte jamais le serveur.</p>
      <p>Les licences en ligne ont besoin du serveur. Si <code>${HOST}/api</code> est inaccessible lors de la validation, la validation échoue : <code>OfflineCacheManager</code> enregistre les validations en ligne réussies, mais il n’existe pas encore de repli automatique sur ce cache. En cours d’exécution, les heartbeats sans réponse déclenchent <code>SessionDisconnected</code> avec la raison <code>Unreachable</code>.</p>
      <p>Associez à la section hors ligne du ${L('/sdk/dotnet', 'guide .NET SDK')}.</p>
    `,
  },
  'updates-logging': {
    title: 'Mises à jour en un clic et journalisation',
    lead: 'Prévenez les utilisateurs licenciés des nouvelles versions et laissez-les mettre à jour via « Update & restart », sans désinstaller ni réinstaller.',
    body: `
      <h3>Fonctionnement</h3>
      <ol>
        <li><strong>Publiez</strong> une version dans le tableau de bord avec un <strong>zip du dossier de l’application</strong> comme fichier. La publication calcule le SHA-256 du zip et le signe avec la clé RSA du produit ; la carte <strong>Paquet de mise à jour</strong> affiche « Prêt pour la mise à jour en un clic ». Les nouvelles licences reçoivent chaque nouvelle version par défaut (option <strong>Reçoit les nouvelles versions</strong> de la licence) ; la page de la version indique à combien de licences elle est proposée.</li>
        <li><code>SdkUpdateManager.CheckForUpdateAsync</code> demande à <code>/api/updates/check</code> quelle version cette licence peut installer. La réponse dépend du type de licence, des versions associées et du canal ; sans canal, seules les versions Stable sont proposées. <code>UpdateAvailable</code> est déclenché une fois par version.</li>
        <li><code>DownloadUpdateAsync(update, progress)</code> télécharge depuis <code>/api/updates/download/{releaseId}</code> avec votre clé API et la clé de licence, puis vérifie la taille, le SHA-256 et la signature du produit avant toute extraction. Les entrées du zip qui sortiraient du dossier de préparation sont refusées.</li>
        <li><code>ApplyUpdateAndRestart()</code> lance la nouvelle version comme installateur et ferme votre application. L’installateur sauvegarde le dossier d’installation, copie les nouveaux fichiers, conserve <code>licenpro.cache</code> et <code>licenpro.settings.json</code>, puis relance l’application. En cas d’échec, il restaure la sauvegarde. Pour une application dans Program Files, Windows affiche une invite UAC.</li>
      </ol>
      <h3>Intégration</h3>
      <pre><code>// Program.Main — première ligne : installe la mise à jour préparée, applique les obligatoires, signale le redémarrage
SdkBootstrap.OnApplicationStartup(onRestarted: info =&gt; { /* info.Succeeded, info.FromVersion, info.Error */ });

// Après validation de la licence
// Envoie la version en cours d’exécution (SdkUpdateManager.RunningVersion) ; ne passez currentAppVersion que pour la remplacer
client.EnableAutoUpdates(onUpdateAvailable: e =&gt; ShowPrompt(e.Update!));

// Dans le bouton « Update &amp; restart »
if (await SdkUpdateManager.DownloadUpdateAsync(update, progress) != null)
    SdkUpdateManager.ApplyUpdateAndRestart(() =&gt; Application.Exit());</code></pre>
      <h3>Options</h3>
      <ul>
        <li><strong>Obligatoire</strong> (indicateur de la version, ou client plus ancien que la <strong>version minimale prise en charge</strong>) : l’utilisateur ne peut pas l’ignorer. Le SDK la télécharge en arrière-plan dès qu’elle est trouvée, et elle s’installe au prochain démarrage même si l’application a été fermée.</li>
        <li>Livrez la <strong>clé publique</strong> du produit avec votre application (<code>LicensingSecrets.PublicKey</code> dans <code>licenpro.settings.json</code> ; elle n’est pas secrète). Les paquets sont vérifiés avec elle : sans elle, <code>UpdateInfo.CanInstall</code> vaut false et rien n’est téléchargé.</li>
        <li><code>SkipVersion(version)</code> arrête les invites pour une version. <code>RollbackAndRestart()</code> revient à la version précédente (une sauvegarde est conservée).</li>
        <li><code>StageUpdateFromFile(zip, version)</code> prépare un paquet livré hors ligne, par exemple sur une clé USB pour une machine isolée. Il n’est pas vérifié par le serveur.</li>
        <li>L’état des mises à jour est stocké dans <code>%LocalAppData%\\LicenPro\\{app}\\updates</code>.</li>
      </ul>
      <h3>Journalisation</h3>
      <p>Implémentez <code>ILicenseLogger</code> pour des journaux structurés (fichier, HTTP vers <code>/api/SdkLogs/...</code> ou plusieurs destinations) selon vos exigences.</p>
      <p>${L('/api/sdk-host', 'API hôte du SDK')} · ${L('/api/telemetry', 'Télémétrie')} · ${L('/sdk/winforms', 'Exemple WinForms')}</p>
    `,
  },
};

export function getSdkTopicFr(slug: string): DocTopic | null {
  return SDK_TOPICS_FR[slug] ?? null;
}
