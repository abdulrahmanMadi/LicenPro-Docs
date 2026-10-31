import type { DocTopic } from '../doc-topic.types';

const L = (path: string, label: string) => `<a class="doc-inline-link" href="${path}">${label}</a>`;

const HOST = 'https://licenpro.runasp.net';
const API_BASE = `${HOST}/api`;

export const API_TOPICS_FR: Record<string, DocTopic> = {
  'auth-users': {
    title: 'Authentification et utilisateurs',
    lead: 'JWT pour les opérateurs du tableau de bord ; API de gestion des utilisateurs et des rôles.',
    body: `
      <p>URL de base pour les exemples : <code>${API_BASE}</code>. Utilisez votre propre hôte de déploiement lors de l’intégration ; les préfixes de chemin ci-dessous correspondent au cloud hébergé sauf si votre installation personnalise le routage.</p>
      <h2>Modèle d’authentification</h2>
      <p>Le tableau de bord et l’automatisation éditeur utilisent <strong>Bearer JWT</strong> depuis les routes sous <code>/api/Auth/...</code> (connexion, actualisation, inscription, fournisseurs externes si activés). Joignez <code>Authorization: Bearer &lt;token&gt;</code> aux routes de gestion sauf si une route est explicitement anonyme.</p>
      <h2>Groupes de routes</h2>
      <ul>
        <li><strong>Authentification</strong> — <code>/api/Auth/...</code> pour la connexion, l’actualisation des jetons, les flux de mot de passe et les hooks d’identité externe si activés.</li>
        <li><strong>Utilisateurs et rôles</strong> — <code>/api/Users/...</code> et routes d’identité associées pour les profils, invitations, appartenance produit, préférences et affectations de rôles.</li>
      </ul>
      <p>La validation client anonyme utilise la <strong>product API key</strong> sur <code>/api/Licenses/...</code> — pas le JWT utilisateur. Voir ${L('/api/overview', 'Vue d’ensemble API')} et ${L('/api/licenses', 'API Licences')}.</p>
    `,
  },
  security: {
    title: 'Utilitaires de sécurité',
    lead: 'Dérivation de clés, listage de sessions et aides au durcissement.',
    body: `
      <p>Préfixe : <code>/api/security</code>. La plupart des actions exigent un contexte tableau de bord ou service authentifié sauf si une route spécifique est indiquée sur cette page comme anonyme.</p>
      <ul>
        <li><code>POST /api/security/derive-key</code> — corps : <code>licenseKey</code>, <code>saltBase64</code> ; renvoie le matériel de clé dérivé pour les flux de fichiers protégés.</li>
        <li>Les aides à la découverte et à la révocation de sessions pour les opérateurs coexistent avec d’autres routes de sécurité sous le même préfixe (chemins exacts selon votre build).</li>
      </ul>
      <p>Confirmez les formes requête/réponse par un appel test sur votre déploiement avant de figer les DTO client.</p>
    `,
  },
  organizations: {
    title: 'API Institutions',
    lead: 'Métadonnées locataire, appartenance, invitations.',
    body: `
      <p>Les routes sous <code>/api/Organization/...</code> (casse selon votre hôte) couvrent les métadonnées locataire, l’appartenance, les invitations et les listes à portée locataire alignées sur l’espace institution du tableau de bord.</p>
      <h2>Séquence d’intégration typique</h2>
      <ol style="margin-left:1.25rem;">
        <li>S’authentifier en tant qu’opérateur éditeur (JWT).</li>
        <li>Lister les institutions ou récupérer un locataire par id.</li>
        <li>Créer ou révoquer des invitations ; flux d’acceptation selon votre environnement.</li>
        <li>Lier des produits via les routes <code>/api/Products/...</code> à portée de ce locataire.</li>
      </ol>
      <p>${L('/guides/platform/organizations', 'Guide plateforme Institutions')}</p>
    `,
  },
  catalog: {
    title: 'Produits, versions, fonctionnalités et droits',
    lead: 'Tout ce que vous définissez avant d’émettre une licence.',
    body: `
      <h2>Produits et clés RSA</h2>
      <p>Préfixe <code>/api/Products</code>. Opérations courantes :</p>
      <ul>
        <li><code>POST /api/Products/{id}/keys/generate</code> — créer le matériel de clé pour la signature.</li>
        <li><code>GET /api/Products/{id}/keys/status</code> — état de préparation des clés.</li>
        <li><code>GET /api/Products/{id}/keys/public</code> et <code>.../public/download</code> — distribuer la clé publique aux clients SDK.</li>
      </ul>
      <h2>Versions et droits</h2>
      <p><strong>Versions logicielles</strong> — lignes de version et métadonnées (routes REST regroupées avec votre flux d’édition produit/version).</p>
      <p><strong>Ensembles de droits</strong> — regrouper des fonctionnalités pour affectation aux licences.</p>
      <p><strong>Fonctionnalités</strong> — définitions et CRUD administratif.</p>
      <p>${L('/guides/platform/products', 'Guide Produits')} · ${L('/rsa-keys', 'RSA keys')} · ${L('/guides/platform/features-entitlements', 'Fonctionnalités et droits')}</p>
    `,
  },
  licenses: {
    title: 'API Licences',
    lead: 'CRUD opérateur plus validation anonyme avec X-API-KEY.',
    body: `
      <div class="help-callout info"><i class="ki-outline ki-key"></i><div>
        <span class="callout-title">Product API key</span>
        <p>Utilisée par <code>POST /api/Licenses/validate</code>. Envoyez <code>X-API-KEY: &lt;product key&gt;</code> (ou l’ancien <code>Authorization: X-API-KEY &lt;key&gt;</code>). Ne distribuez jamais la clé privée de signature aux clients.</p>
      </div></div>
      <p>Préfixe <code>/api/Licenses</code>. Exemple hébergé : <code>${HOST}/api/Licenses/validate</code>.</p>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses</code></div>
      <p>Liste paginée. Requête : <code>pageNumber</code>, <code>pageSize</code>, <code>search</code>, <code>status</code>, <code>type</code>.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}</code></div>
      <p>Licence unique par GUID.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses</code></div>
      <p>Créer une licence. Corps : <code>CreateLicenseDto</code> — requis <code>name</code>, <code>type</code> (Perpetual, Trial, Subscription, NodeLocked, Floating, Concurrent), <code>issuedTo</code>, <code>softwareReleaseId</code> ; optionnel : expiration, sièges, matériel, ids d’ensemble de droits, notes.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/validate</code></div>
      <p><strong>AllowAnonymous</strong> + <strong>X-API-KEY</strong>. <code>multipart/form-data</code> : <code>licenseKey</code>, <code>validationParams</code> (chaîne JSON), <code>licenseFile</code> optionnel.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/validate/{licenseKey}</code></div>
      <p>Validation simple ; requête <code>hardwareId</code> optionnelle.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/status/{licenseKey}</code></div>
      <p>Charge utile de statut pour le polling SDK.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/refresh/{licenseKey}</code></div>
      <p>Actualiser le matériel de licence (<code>RefreshLicenseDto</code> optionnel).</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{licenseKey}/activations</code></div>
      <p>Instantané d’activation anonyme.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}/download</code></div>
      <p>Téléchargement autorisé des octets du fichier de licence.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/generate-file</code></div>
      <p>Régénérer le fichier de licence.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/revoke</code></div>
      <p>Révoquer la licence.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/Licenses/{id}/access-attempts</code></div>
      <p>Détection de partage Node-locked. Liste les machines refusées car la licence est liée ailleurs, avec IDs matériel tenté et lié, IP, point d’entrée et nombre de tentatives, plus totaux récapitulatifs. Propriétaire produit ou Admin uniquement — seule route renvoyant le détail appareil et réseau non masqué.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/Licenses/{id}/access-attempts/{attemptId}/acknowledge</code></div>
      <p>Marquer une tentative comme revue. Renvoie le résumé actualisé. Propriétaire produit ou Admin uniquement.</p></div>
      <p>D’autres routes couvrent la liaison matérielle, les transferts et les liaisons en attente ; explorez les réponses de votre hôte sous le même préfixe.</p>
      <p>${L('/guides/platform/licenses', 'Guide licences éditeur')} · ${L('/sdk/license-client', 'SDK LicenseClient')}</p>
    `,
  },
  'activations-sessions': {
    title: 'Activations et sessions',
    lead: 'Application à l’exécution et télémétrie à la frontière API.',
    body: `
      <p>Les routes <strong>Activations</strong> gèrent les liaisons appareil, la consommation de sièges et l’historique d’activation. Les routes <strong>Sessions</strong> gèrent les sessions actives : création, heartbeat, terminaison — important pour les modèles floating et validation en ligne.</p>
      <h2>Quand utiliser lequel</h2>
      <ul>
        <li><strong>Activations</strong> — revendication durable qu’une machine ou identité utilise la licence.</li>
        <li><strong>Sessions</strong> — heartbeat en ligne de courte durée ; idéal pour les limites de concurrence et tableaux de bord en direct.</li>
      </ul>
      <h2>Auth</h2>
      <p>Les tableaux de bord opérateur utilisent JWT. SDK et flux anonymes n’utilisent la product API key que là où chaque route le permet.</p>
      <p>${L('/guides/platform/activations', 'Guide Activations')} · ${L('/guides/platform/sessions', 'Guide Sessions')} · ${L('/sessions-activations', 'Récit combiné')} · ${L('/sdk/activation-session', 'Gestionnaires SDK')}</p>
    `,
  },
  metering: {
    title: 'Metering (credit-based et usage-based)',
    lead: 'Consume, solde, ledger, octrois et tarification par fonctionnalité des licences metered.',
    body: `
      <p>Préfixe : <code>/api/meter</code>. Ces routes servent les deux types metered — <strong>Credit-Based</strong> (<code>MeteredToken</code>) et <strong>Usage-Based</strong> (<code>MeteredCount</code>). Le solde n'est lu et déduit <strong>qu'ici</strong> : la validation, l'activation et la session ne le regardent jamais, donc une licence metered s'active sans difficulté à solde zéro.</p>

      <h2>Routes client (clé API produit)</h2>
      <p>Anonymes avec <code>X-API-KEY</code>, appelées par le SDK sur la machine du client. L'utilisateur de la clé API doit posséder le produit de la licence ou y être rattaché.</p>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/meter/consume</code></div>
      <p>Déduit du wallet. Corps : <code>licenseKey</code>, <code>featureName</code>, <code>idempotencyKey</code>, optionnels <code>quantity</code> (défaut 1), <code>hardwareId</code>, <code>activationId</code>. Credit-Based déduit <code>TokenCost × quantity</code> ; Usage-Based déduit <code>quantity</code>. <strong><code>idempotencyKey</code> est obligatoire</strong> — le serveur facture <code>(wallet, idempotencyKey)</code> au plus une fois et rejoue tout appel suivant avec <code>idempotentReplay: true</code>, ce qui rend sûre une nouvelle tentative après un timeout. La clé est empreintée avec la fonctionnalité, la quantité et <code>hardwareId</code> : la réutiliser pour une autre opération renvoie <code>IdempotencyConflict</code> (409).</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/meter/balance</code></div>
      <p>Solde d'une clé de licence, sans déduction. La clé passe dans l'en-tête <code>X-License-Key</code> pour ne pas figurer dans les URL que les proxies et les logs enregistrent ; l'ancien paramètre <code>?licenseKey=</code> reste accepté. Renvoie <code>balance</code>, <code>meteringMode</code>, <code>lowBalanceThreshold</code> et <code>balanceUnitLabel</code>.</p></div>

      <h2>Routes opérateur (JWT)</h2>
      <p>Routes tableau de bord. Chacune vérifie que l'appelant possède le produit de la licence ou est administrateur.</p>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/meter/balance/{licenseId}</code></div>
      <p>Solde par identifiant de licence, pour le tableau de bord plutôt que pour le SDK.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/meter/ledger/{licenseId}</code></div>
      <p>Historique paginé (<code>pageNumber</code>, <code>pageSize</code>). Types d'entrée : <strong>InitialGrant</strong>, <strong>Consume</strong> (négatif), <strong>AdminGrant</strong>, <strong>Adjust</strong>.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/meter/grant</code></div>
      <p>Ajoute du solde. Exige un <code>amount</code> positif et une <code>reason</code> ; un <code>externalReference</code> optionnel (facture, bon de commande) rend un octroi répété idempotent. Il n'y a pas de passerelle de paiement — les recharges sont une action manuelle de l'owner.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method post">POST</span><code class="path">/api/meter/adjust</code></div>
      <p>Correction ou remboursement signé : <code>amount</code> négatif débite, positif crédite. <code>reason</code> est obligatoire et un débit ne peut pas rendre le solde négatif.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method put">PUT</span><code class="path">/api/meter/balance/{licenseId}/threshold</code></div>
      <p>Définit le seuil de solde bas qui pilote <code>IsLowBalance</code> côté SDK et les alertes du tableau de bord.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/meter/reconcile/{licenseId}</code></div>
      <p>Recalcule le wallet depuis son ledger et indique si les deux concordent. Lecture seule.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method get">GET</span><code class="path">/api/meter/products/{productId}/pricing</code></div>
      <p>Tarification token active par fonctionnalité pour un produit.</p></div>
      <div class="api-endpoint"><div class="endpoint-header"><span class="method put">PUT</span><code class="path">/api/meter/features/{featureId}/pricing</code></div>
      <p>Définit le <code>TokenCost</code> d'une fonctionnalité (Credit-Based uniquement ; doit être supérieur à zéro). La ligne active précédente est désactivée et une nouvelle insérée, l'historique est conservé. Usage-Based ignore totalement la tarification. La page <strong>Features</strong> du produit l'édite en ligne.</p></div>

      <h2>Codes d'erreur</h2>
      <p>Consume renvoie un <code>errorCode</code> exploitable en plus du statut HTTP. Le tableau complet, avec les codes qu'il est sûr de réessayer, est sur les pages ${L('/credit-based-license', 'Credit-Based')} et ${L('/usage-based-license', 'Usage-Based')}.</p>
      <p>${L('/credit-based-license', 'Licences Credit-Based')} · ${L('/usage-based-license', 'Licences Usage-Based')} · ${L('/sdk/features-usage', 'Metering SDK')}</p>
    `,
  },
  'trials-transfers': {
    title: 'Essais et transferts',
    lead: 'Prolongations d’évaluation et flux de transfert de licence.',
    body: `
      <p><strong>Trials</strong> — les routes sous la surface essais de votre hôte prennent en charge campagnes, prolongations et fenêtres d’évaluation alignées sur les pages <strong>Trials</strong> du tableau de bord.</p>
      <p><strong>Transfers</strong> — déplacer les droits entre identités, appareils ou institutions selon vos règles métier ; confirmez prérequis et effets de bord par des appels test sur votre déploiement.</p>
      <p>${L('/guides/platform/trials', 'Guide plateforme Essais')} · ${L('/trial-license', 'Modèle licence d’essai')}</p>
    `,
  },
  telemetry: {
    title: 'Télémétrie, journaux et notifications',
    lead: 'Analytique, statistiques, pistes d’audit, journaux SDK et notifications in-app.',
    body: `
      <ul>
        <li><code>/api/Analytics/...</code> — agrégats d’adoption et d’usage pour graphiques.</li>
        <li><code>/api/Statistics/...</code> — métriques et agrégats complémentaires.</li>
        <li><code>/api/AuditLogs/...</code> — piste d’audit pertinente pour actions sensibles.</li>
        <li><code>/api/DashboardLogs/...</code> — diagnostics d’événements opérateur et UI.</li>
        <li><code>/api/SdkLogs/...</code> — envoi optionnel de journaux depuis SDK déployés.</li>
        <li><code>/api/Notifications/...</code> — fil de notifications in-app pour utilisateurs tableau de bord.</li>
      </ul>
      <p>La plupart de ces routes exigent JWT avec rôles analytique ou admin selon l’opération.</p>
      <p>${L('/guides/platform/analytics', 'Guide Analytique')}</p>
    `,
  },
  storage: {
    title: 'API Stockage',
    lead: 'Connecteurs pour artefacts de version.',
    body: `
      <p>Quatre surfaces parallèles pour backends différents :</p>
      <ul>
        <li><code>/api/storage/google-drive/...</code> — Google Drive avec le client OAuth de LicenPro : <code>connect-url</code> (<code>returnUrl</code> optionnel, un chemin du tableau de bord) renvoie l'URL de consentement Google, <code>callback</code> reçoit <code>code</code> et le <code>state</code> signé ; puis <code>status</code>, <code>folders</code>, <code>files</code>, <code>upload</code>, <code>disconnect</code>. Portée <code>drive.file</code> uniquement. Forfait Pro.</li>
        <li><code>/api/OneDriveStorage/...</code> — intégration Microsoft Graph / OneDrive.</li>
        <li><code>/api/CustomServerStorage/...</code> — votre propre point de stockage SFTP/HTTP.</li>
        <li><code>/api/storage/s3/...</code> — tout bucket compatible S3 (Amazon S3, Cloudflare R2, Backblaze B2, Wasabi, MinIO…) : <code>config</code>, <code>test</code>, <code>folders</code>, <code>files</code>, <code>upload</code>, <code>disconnect</code>. Forfait Pro.</li>
      </ul>
      <p>Chacune implémente les sémantiques list/upload/delete du fournisseur ; noms de fichiers et types MIME validés côté serveur.</p>
      <p>${L('/guides/platform/storage', 'Guide plateforme Stockage')}</p>
    `,
  },
  'sdk-host': {
    title: 'API hôte orientées SDK',
    lead: 'Paramètres et vérifications de mise à jour consommés par les apps clientes.',
    body: `
      <p><code>/api/SdkSettings/...</code> — configuration SDK à portée produit (feature flags, endpoints, réglages) livrée aux clients licenciés.</p>
      <p><code>/api/Updates/...</code> — métadonnées de version et mise à jour consommées par <code>SdkUpdateManager</code> pour mises à jour conscientes de la licence.</p>
      <p>Les apps clientes appellent celles-ci avec la product API key ou des motifs anonymes là où chaque route le permet — pas le JWT éditeur.</p>
      <p>${L('/sdk/updates-logging', 'Mises à jour SDK et journalisation')} · ${L('/sdk/dotnet', 'Intégration .NET')}</p>
    `,
  },
  billing: {
    title: 'Abonnements et paiements',
    lead: 'Surfaces commerce pour facturation SaaS (filtrées par rôle).',
    body: `
      <p><code>/api/Subscriptions/...</code> — cycle de vie abonnement, droits liés à la facturation.</p>
      <p><code>/api/Payments/...</code> — intentions de paiement, reçus et webhooks fournisseur (selon implémentation de votre déploiement).</p>
      <p>De nombreuses actions exigent des rôles locataire élevés ; certaines peuvent être réservées à l’hôte en multi-tenant. Traitez chaque opération comme <strong>filtrée par plan et rôle</strong> jusqu’à vérification d’accès sur votre environnement.</p>
    `,
  },
  admin: {
    title: 'Administration et tâches',
    lead: 'Tâches de fond, paramètres plateforme, e-mail, tickets.',
    body: `
      <ul>
        <li><code>/api/Admin/...</code> — maintenance élevée (portée locataire ou hôte).</li>
        <li><code>/api/Jobs/...</code> — visibilité sur le travail planifié/asynchrone (imports, agrégats, lots e-mail).</li>
        <li><code>/api/Settings/...</code> — clés de configuration système ou locataire.</li>
        <li><code>/api/Email/...</code> — diagnostics et déclencheurs de modèles si exposés.</li>
        <li><code>/api/Tickets/...</code> — intégration tickets support pour flux helpdesk éditeur.</li>
      </ul>
      <p>Ces zones sont les plus sensibles au rôle ; intégrez seulement après avoir mappé le RBAC de votre locataire aux politiques appliquées sur chaque route.</p>
    `,
  },
};

export function getApiTopicFr(slug: string): DocTopic | null {
  return API_TOPICS_FR[slug] ?? null;
}
