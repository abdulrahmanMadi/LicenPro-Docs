import type { DocTopic } from '../doc-topic.types';

const link = (path: string, label: string) =>
  `<a class="doc-inline-link" href="${path}">${label}</a>`;

/** Dashboard screenshot with lightbox (full-resolution asset, no compression). */
const screenshot = (file: string, alt: string) =>
  `<figure class="doc-figure doc-figure-card">
    <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/${file}" data-doc-image-alt="${alt}" aria-label="Afficher la capture en taille réelle">
      <img src="assets/docs/${file}" alt="${alt}" loading="lazy" decoding="async" />
    </button>
    <figcaption class="doc-figure-caption">Cliquez sur l'image pour ouvrir l'aperçu en pleine résolution.</figcaption>
  </figure>`;

const HOST = 'https://licenpro.runasp.net';

export const PLATFORM_GUIDES_FR: Record<string, DocTopic> = {
  overview: {
    title: "Vue d'ensemble du système",
    lead: "Comment le tableau de bord LicenPro, l'API REST hébergée et les SDK clients s'articulent — de la première configuration produit jusqu'à la validation à l'exécution dans votre application livrée. Le SDK .NET est documenté aujourd'hui ; des SDK pour d'autres langages (avec exemples par stack) sont prévus.",
    body: `
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/overview1.png" data-doc-image-alt="Flux LicenPro : tableau de bord pour la configuration éditeur, API REST pour les opérations runtime, et SDK clients dans les applications clientes (SDK multilingues et exemples prévus)" aria-label="Afficher le diagramme de flux en taille réelle">
          <img src="assets/docs/overview1.png" alt="Flux LicenPro : tableau de bord pour la configuration éditeur, API REST pour les opérations runtime, et SDK clients dans les applications clientes (SDK multilingues et exemples prévus)" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">Cliquez sur l'image pour ouvrir l'aperçu en pleine résolution.</figcaption>
      </figure>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">Trois surfaces</span>
        <p><strong>Tableau de bord</strong> (JWT) : les éditeurs y définissent produits, versions, clés et licences.
        L'<strong>API REST</strong> est la frontière d'automatisation et runtime pour la validation, les activations, les sessions et la télémétrie.
        Les <strong>SDK clients</strong> s'intègrent dans votre application et vérifient le matériel de licence signé avec la clé publique du produit. Le <strong>SDK .NET</strong> est disponible aujourd'hui ; LicenPro étend vers des <strong>SDK de première classe pour plus de langages et runtimes</strong> (par ex. VB, Java, Python), et cette documentation ajoutera des <strong>exemples spécifiques à chaque langage</strong> pour chaque stack aux côtés de l'API REST — tout environnement peut s'intégrer via HTTPS en attendant.</p>
      </div></div>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-key" aria-hidden="true"></i><div>
        <span class="callout-title">Identifiants en un coup d'œil</span>
        <p><strong>Appels HTTP tableau de bord et gestion</strong> : <code>Authorization: Bearer &lt;JWT&gt;</code> après connexion. Ce JWT est lié à <strong>votre session opérateur</strong> (qui vous êtes dans le portail éditeur). Utilisez-le pour les routes qui gèrent institutions, produits, licences, etc. — ne le collez jamais dans les applications clientes.</p>
        <p><strong>Validation anonyme depuis serveurs ou SDK client</strong> : <code>X-API-KEY</code> du produit sur des routes comme <code>POST /api/Licenses/validate</code>. Vous <strong>créez et copiez cette clé depuis le tableau de bord</strong> dans la <strong>zone API / identifiants du produit</strong>, ou là où votre déploiement l'affiche pour l'utilisateur connecté (y compris pages <strong>compte ou profil</strong> listant les clés produit). Ce n'est <strong>pas</strong> votre mot de passe. Traitez-la comme un secret : stockez-la en config serveur ou coffre sécurisé ; intégrez-la aux binaires utilisateur final uniquement si vous l'embarquez volontairement pour des appels produit anonymes.</p>
        <p><strong>Matériel de signature RSA</strong> : chaque produit a une <strong>clé privée de signature</strong> qui reste sur LicenPro / votre frontière hébergée — <strong>ne la distribuez jamais</strong> et <strong>ne la mettez jamais</strong> dans les binaires clients. Apps et SDK n'utilisent que la <strong>clé publique</strong> (ou matériel public équivalent) pour vérifier que <code>license.bin</code> a été signé pour ce produit. En bref : <strong>JWT</strong> = opérateur éditeur ; <strong>X-API-KEY</strong> = identité produit pour appels API anonymes ; <strong>clé publique</strong> = vérifier les licences sur le terrain ; <strong>clé privée</strong> = reste côté serveur uniquement.</p>
      </div></div>
      <p>Base API hébergée (cloud) : <code>${HOST}/api</code>. Résumés route par route : ${link('/api/overview', "Vue d\\\\'ensemble API REST")}.</p>

      <h2>Qui fait quoi</h2>
      <figure class="doc-figure doc-figure--hero doc-figure-card">
        <button type="button" class="doc-figure-view-link" data-doc-image-lightbox="/assets/docs/platform-overview-who-does-what.png" data-doc-image-alt="Qui fait quoi : opérateurs éditeur dans le tableau de bord, intégrateurs et automatisation depuis CI et facturation, applications clientes avec SDK ou HTTPS — le tout via l'API REST LicenPro" aria-label="Afficher le diagramme qui fait quoi en taille réelle">
          <img src="assets/docs/platform-overview-who-does-what.png" alt="Qui fait quoi : opérateurs éditeur dans le tableau de bord, intégrateurs et automatisation depuis CI et facturation, applications clientes avec SDK ou HTTPS — le tout via l'API REST LicenPro" loading="lazy" decoding="async" />
        </button>
        <figcaption class="doc-figure-caption">Cliquez sur l'image pour ouvrir l'aperçu en pleine résolution.</figcaption>
      </figure>
      <ul style="margin-left:1.25rem;">
        <li><strong>Opérateurs éditeur</strong> — travaillent dans le tableau de bord navigateur sous votre institution ; création quotidienne de produits, versions, clés et licences.</li>
        <li><strong>Intégrateurs et automatisation</strong> — appellent la même surface HTTPS depuis CI, facturation ou outils internes (JWT pour routes opérateur, ou clé produit uniquement où la route est conçue pour accès anonyme).</li>
        <li><strong>Applications clientes</strong> — utilisent un SDK client supporté (aujourd'hui : .NET) ou appellent l'API REST depuis votre stack ; vérifient <code>license.bin</code> hors ligne avec la clé publique et rafraîchissent optionnellement l'état en ligne contre <code>${HOST}/api</code>. Plus de SDK par langage et exemples prévus (p.ex. VB, Java, Python).</li>
      </ul>

      <h2>Phase 1 — Configurer (tableau de bord)</h2>
      <p>C'est le côté gauche du diagramme : tout ce que vous faites avant qu'une machine cliente n'exécute votre app.</p>
      <ol style="margin-left:1.25rem;">
        <li><strong>Institution</strong> — frontière locataire pour membres, invitations et produits.</li>
        <li><strong>Produit</strong> — ancrage pour clés API, versions, droits et chaque licence émise.</li>
        <li><strong>Versions</strong> — lignes de version pour cibler builds ou canaux dans licences et contrôles de mise à jour.</li>
        <li><strong>Fonctionnalités et jeux de droits</strong> — regroupement optionnel de capacités en SKU assignés aux licences.</li>
        <li><strong>Clés RSA</strong> — générer par produit avant d'émettre des licences ; seule la clé publique est distribuée aux apps.</li>
        <li><strong>Licences</strong> — choisir le modèle (perpétuel, essai, abonnement, flottant, concurrent, nœud verrouillé, basé crédits, basé usage, …), définir limites, exporter <code>license.bin</code> et la clé de licence.</li>
      </ol>
      <p>Lectures approfondies : ${link('/guides/platform/organizations', 'Institutions')} · ${link('/first-organization', 'Première institution')} · ${link('/guides/platform/products', 'Produits')} · ${link('/guides/platform/releases', 'Versions')} · ${link('/guides/platform/features-entitlements', 'Fonctionnalités et droits')} · ${link('/rsa-keys', 'Clés RSA')} · ${link('/guides/platform/licenses', 'Licences (éditeur)')} · ${link('/first-product', 'Premier produit')} · ${link('/first-license', 'Première licence')}.</p>

      <h2>Carte de navigation du tableau de bord</h2>
      <p>Zones principales de la barre latérale et où en savoir plus :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Accueil</strong> (<code>/dashboard</code>) — widgets KPI, licences/produits récents.</li>
        <li><strong>Institutions</strong> — ${link('/guides/platform/organizations', 'Guide institutions')} · onglets : Aperçu, Produits, Membres, Invitations, Audit, Paramètres.</li>
        <li><strong>Produits</strong> — ${link('/guides/platform/products', 'Guide produits')} · onglets : Aperçu, Fonctionnalités, Droits, Versions, Licences, Utilisateurs, Matrice d'accès, Audit, Paramètres.</li>
        <li><strong>Versions</strong> — ${link('/guides/platform/releases', 'Guide versions')} (global + onglet par produit).</li>
        <li><strong>Licences</strong> — ${link('/guides/platform/licenses', 'Guide licences')} · assistant + onglets détail (Aperçu, Activations, Sessions, Usage, Appareil).</li>
        <li><strong>Activations</strong> — ${link('/guides/platform/activations', 'Guide activations')}.</li>
        <li><strong>Sessions</strong> — ${link('/guides/platform/sessions', 'Guide sessions')}.</li>
        <li><strong>Essais</strong> — ${link('/guides/platform/trials', 'Guide essais')}.</li>
        <li><strong>Stockage</strong> — ${link('/guides/platform/storage', 'Guide stockage')} (Drive, OneDrive, serveur personnalisé).</li>
        <li><strong>Analytique</strong> — ${link('/guides/platform/analytics', 'Guide analytique')}.</li>
        <li><strong>Paramètres du compte</strong> — ${link('/guides/platform/account-settings', 'Paramètres du compte')} (profil, sécurité, forfait, clés API).</li>
        <li><strong>Mon audit</strong> (<code>/dashboard/audit-logs</code>) — piste d'audit personnelle ; voir guide Analytique.</li>
      </ul>

      <h2>Phase 2 — Exploiter (API REST)</h2>
      <p>Le centre du diagramme : la frontière hébergée à <code>${HOST}/api</code> (substituez votre hôte en auto-hébergement).</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Validation en ligne</strong> — <code>POST /api/Licenses/validate</code> avec <code>X-API-KEY</code> produit quand vous voulez que le serveur évalue politique, liaison matérielle ou révocation en temps réel.</li>
        <li><strong>Activations et sessions</strong> — application optionnelle des sièges, concurrence flottante et visibilité type heartbeat pour support et conformité.</li>
        <li><strong>Télémétrie et mises à jour</strong> — routes SDK pour paramètres, métadonnées de mise à jour et envoi optionnel de logs (voir sujets SDK).</li>
        <li><strong>Automatisation</strong> — provisionner ou retirer des licences depuis jobs backend via routes gestion JWT selon votre RBAC.</li>
      </ul>
      <p>Commencez ici : ${link('/api/overview', "Vue d\\\\'ensemble API REST")} · ${link('/api/licenses', 'API Licences')} · ${link('/api/activations-sessions', 'Activations et sessions')} · ${link('/api/telemetry', 'Télémétrie et logs')}.</p>

      <h2>Phase 3 — Appliquer (SDK clients)</h2>
      <p>Le côté droit : code embarqué dans votre processus. <strong>.NET</strong> est entièrement couvert sur ce site aujourd'hui ; d'autres SDK et <strong>exemples dédiés par langage</strong> (VB, Java, Python, etc.) apparaîtront ici à mesure de leur publication. En attendant, toute stack peut utiliser le même contrat HTTPS que l'API REST.</p>
      <p>Les étapes suivantes utilisent les types et points d'entrée <strong>.NET</strong> actuels ; d'autres SDK reproduiront le même cycle de vie avec des API idiomatiques par langage.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Bootstrap une fois</strong> — résoudre <code>ServerBaseEndpoint</code> (doit inclure <code>/api</code>), charger les paramètres JSON si utilisés, puis exécuter <code>SdkBootstrap.OnApplicationStartup()</code> sur hôtes desktop avant l'UI.</li>
        <li><strong>Confiance hors ligne</strong> — <code>LicenseClient</code> vérifie la signature RSA sur <code>license.bin</code> avec le matériel de clé publique embarqué ; pas de clé privée côté client.</li>
        <li><strong>Rafraîchissement en ligne</strong> — chemins optionnels vers <code>${HOST}/api</code> pour rafraîchissement validation, activations, sessions, usage fonctionnalités et mises à jour sensibles à la licence.</li>
      </ul>
      <p>Poursuivre avec ${link('/sdk/overview', "Vue d\\\\'ensemble SDK .NET")} · ${link('/sdk/configuration', 'Configuration et bootstrap')} · ${link('/sdk/dotnet', 'Intégration .NET')} · ${link('/sdk/license-client', 'Cycle de vie LicenseClient')}.</p>

      <h2>Chemins runtime optionnels</h2>
      <p>Après la boucle principale, les équipes ajoutent généralement un ou plusieurs des éléments suivants :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Activations et sessions</strong> — ${link('/sessions-activations', 'Guide sessions et activations')} et pages ${link('/guides/platform/activations', 'Activations')} / ${link('/guides/platform/sessions', 'Sessions')}.</li>
        <li><strong>Modèles de licence</strong> — perpétuel, essai, abonnement, flottant, concurrent, nœud verrouillé, basé crédits, basé usage (barre latérale <em>Modèles de licence</em>).</li>
        <li><strong>Webhooks</strong> — ${link('/webhooks', 'Webhooks')} pour événements de cycle de vie vers votre backend sans polling.</li>
        <li><strong>Mises à jour et logging</strong> — ${link('/sdk/updates-logging', 'Mises à jour SDK et logging')} pour contrôles de mise à jour sensibles à la licence et logs structurés.</li>
      </ul>
    `,
  },
  organizations: {
    title: "Institutions",
    lead: "Frontière locataire pour votre équipe, vos produits, vos invitations et le contexte d'audit. Comprenez les rôles d'institution, chaque onglet du tableau de bord et le cycle de vie des membres de l'invitation au retrait.",
    body: `
      <p>Chaque éditeur opère dans une <strong>institution</strong> — un locataire qui regroupe personnes, produits assignés, politiques et historique d'audit. Les licences sont émises sous des <strong>produits</strong>, mais l'institution définit qui peut les voir et les gérer.</p>
      <p>Parcours d'intégration : ${link('/first-organization', 'Créer votre première institution')}.</p>

      <h2>Modèle de rôles (lisez ceci en premier)</h2>
      <p>LicenPro utilise <strong>trois couches de permissions</strong>. La doc tableau de bord mentionne souvent « admin » dans plusieurs sens — mappez chaque action à la bonne couche :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Rôle JWT système</strong> — <code>Admin</code> (opérateur plateforme) ou <code>User</code> (éditeur inscrit). Contrôle les éléments sidebar comme logs système, tickets et abonnés. Ne fait <em>pas</em> automatiquement quelqu'un propriétaire produit.</li>
        <li><strong>Rôle institution</strong> — votre appartenance au locataire : <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code>, <code>Member</code>, <code>Viewer</code>, ou <code>ResellerAdmin</code> (backend). Stocké comme <code>myRole</code> sur l'enregistrement org.</li>
        <li><strong>Propriété produit</strong> — listée dans <code>product.owners</code>. Requise pour CRUD licences, clés RSA, onglet Users, Matrice d'accès et la plupart des actions Paramètres — même si votre rôle org est Admin.</li>
      </ul>
      <div class="help-callout info help-callout--plain"><i class="ki-outline ki-information" aria-hidden="true"></i><div>
        <span class="callout-title">UI vs API</span>
        <p>Certaines gardes de route ne vérifient que que vous êtes un utilisateur plateforme connecté. <strong>Les contrôles faisant foi s'exécutent sur l'API.</strong> Si un bouton apparaît mais le serveur renvoie 403, votre rôle org ou produit manque cette permission.</p>
      </div></div>

      <h2>Cycle de vie de l'institution</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Créer</strong> — assistant à <code>/dashboard/organizations</code> (Identité : nom, site web, rôle d'entrée par défaut ; Branding : logo, couleurs, description).</li>
        <li><strong>Configurer</strong> — onglet paramètres : politiques (auto-inscription, approbation), rôle membre par défaut, branding.</li>
        <li><strong>Inviter</strong> — invitations email avec rôle ; accepter via <code>/auth/accept-invitation?token=…</code> (connexion requise).</li>
        <li><strong>Assigner produits</strong> — lier produits à l'institution ; ajouter propriétaires produit et lignes access matrix par version.</li>
        <li><strong>Exploiter</strong> — membres utilisent analytics aperçu org ; admins gèrent équipe et audit.</li>
        <li><strong>Transférer ou supprimer</strong> — transfert de propriété (Owner) ; suppression org (Owner uniquement, destructif).</li>
      </ol>

      <h2>Onglets institution</h2>
      <p>Chaque onglet est une route enfant sous le layout org. Les onglets <strong>Membres</strong>, <strong>Invitations</strong>, <strong>Journaux d'audit</strong> et <strong>Paramètres</strong> n'apparaissent que lorsque <code>myRole</code> est <code>Owner</code>, <code>Admin</code>, <code>ProductOwner</code> ou <code>ResellerAdmin</code>. <strong>Aperçu</strong> et <strong>Produits</strong> sont visibles à tous les membres.</p>

      <h3>Aperçu</h3>
      <p>Onglet d'atterrissage par défaut à l'ouverture d'une institution. Répondez « que se passe-t-il dans ce locataire maintenant ? » avant d'approfondir produits ou licences.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Cartes résumé</strong> — nombre de membres, produits assignés, totaux licences et tendances d'activation dans cette org.</li>
        <li><strong>Mix licences</strong> — vue rapide des clés perpétuelles, essai, abonnement, flottantes et concurrentes liées aux produits org.</li>
        <li><strong>Activité récente</strong> — raccourcis vers derniers événements licence et changements équipe sans ouvrir Journaux d'audit.</li>
        <li><strong>Changement de contexte</strong> — si vous appartenez à plusieurs orgs, confirmez le nom org dans l'en-tête avant d'agir sur les données.</li>
      </ul>
      <p><strong>Tâches typiques :</strong> contrôle santé hebdomadaire, snapshot exécutif avant appel renouvellement, vérifier qu'une assignation produit est bien arrivée.</p>

      <h3>Produits</h3>
      <p>Catalogue des produits logiciels liés à cette institution. L'assignation ici <em>n'émet pas</em> de licences — elle accorde à l'institution (et ses membres) visibilité et chemins d'accès aux produits déjà créés dans votre compte éditeur.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Assigner produit</strong> — Owner / Admin ouvre <strong>Assigner un produit</strong>, cherche le catalogue éditeur et lie un ou plusieurs produits. Les membres voient ensuite les produits assignés sur cet onglet et dans la sidebar (selon règles access matrix sur chaque produit).</li>
        <li><strong>Désassigner</strong> — retire le lien org ; ne supprime pas le produit ni ses licences à l'échelle plateforme.</li>
        <li><strong>Vue membre</strong> — Members et Viewers ne voient que les produits assignés ou accordés via lignes access matrix par version — pas chaque produit de votre compte.</li>
        <li><strong>Étape suivante</strong> — après assignation, propriétaires produit ajoutent utilisateurs et lignes matrix dans l'espace produit (${link('/guides/platform/products', 'Guide produits')}).</li>
      </ul>
      ${screenshot('platform-organization-assign-product.png', "Modale Assigner un produit : sélectionner les produits à lier à l\\\\'institution")}

      <h3>Membres</h3>
      <p>Annuaire équipe faisant foi pour l'institution : qui appartient, quel rôle org il détient, et quand il a rejoint.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Inviter</strong> — email + rôle : Member, Viewer, ProductOwner ou Admin (seul Owner peut assigner Admin).</li>
        <li><strong>Changer rôle</strong> — Owner, Admin ou ResellerAdmin ; règles Owner-only s'appliquent en promotion vers Admin.</li>
        <li><strong>Retirer</strong> — Owner, Admin, ProductOwner, ResellerAdmin ; impossible de retirer Owner.</li>
        <li><strong>Rôle vs accès produit</strong> — rôle org contrôle onglets org ; propriétaires produit et access matrix contrôlent le travail licence par produit.</li>
      </ul>
      <p><strong>Guide rôles rapide :</strong> Member = contribuer sur produits assignés ; Viewer = lecture seule ; ProductOwner = gérer produits/licences sans admin org complet ; Admin = équipe + paramètres sauf actions Owner-only.</p>
      ${screenshot('platform-organization-invite-member.png', "Modale Invite Team Member : email, rôle assigné et message d\\\\'invitation")}

      <h3>Invitations</h3>
      <p>File opérationnelle pour les personnes n'ayant pas encore accepté. Utilisez-la quand l'onboarding bloque ou pour révoquer une invite erronée.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Statut</strong> — Pending, expirée ou révoquée ; filtrer et chercher par email destinataire.</li>
        <li><strong>Renvoyer</strong> — génère un email token frais sans changer le rôle choisi.</li>
        <li><strong>Révoquer</strong> — invalide le lien immédiatement ; le destinataire doit recevoir une nouvelle invite.</li>
        <li><strong>Expiration</strong> — chaque ligne montre quand le token expire ; invites expirées inacceptables jusqu'au renvoi.</li>
        <li><strong>Rôles dans l'UI</strong> — Member, Viewer, Admin sur cet onglet ; onglet Members propose aussi ProductOwner à l'invitation.</li>
      </ul>
      ${screenshot('platform-organization-invitations.png', 'Onglet Institution Team Invitations : invites en attente avec rôle, statut et expiration')}

      <h3>Journaux d'audit</h3>
      <p>Piste immuable à portée org pour conformité et support : qui a changé appartenance équipe, produits assignés ou paramètres org.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Colonnes</strong> — horodatage, action (p.ex. InvitationSent, LicenseCreated), produit, type entité, nom entité, adresse IP.</li>
        <li><strong>Filtres</strong> — type action, type entité, plage dates et recherche texte libre sur utilisateur, entité ou produit.</li>
        <li><strong>Export CSV</strong> — télécharger la vue filtrée pour SIEM ou analyse tableur.</li>
        <li><strong>Détails</strong> — icône œil ouvre la charge utile structurée d'un événement.</li>
        <li><strong>Associer Analytics</strong> — audit est ponctuel ; ${link('/guides/platform/analytics', 'Analytique')} montre tendances dans le temps.</li>
      </ul>
      ${screenshot('platform-organization-audit-logs.png', "Onglet Institution Journaux d'audit : activité licences et invitations avec filtres et export")}

      <h3>Paramètres</h3>
      <p>Configuration orientée Owner divisée en sous-sections (nav gauche dans Paramètres) :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Général</strong> — nom entité, ID registre, description rich-text et URL site public sur le profil org.</li>
        <li><strong>Image de marque</strong> — logo et couleurs pour présentation org dans tableau de bord et invitations.</li>
        <li><strong>Politiques</strong> — <code>allowSelfRegistration</code>, <code>requireApprovalForJoining</code> et <code>defaultMemberRole</code> pour nouveaux arrivants (Member, Viewer ou Admin).</li>
        <li><strong>Gouvernance</strong> — transfert propriété et bascules politique avancées où votre déploiement les expose.</li>
        <li><strong>Zone de danger</strong> — supprimer institution (Owner uniquement ; irréversible ; licences sous produits org peuvent cascader selon politique serveur).</li>
      </ul>
      <p><strong>Avant enregistrement :</strong> description et site web sont orientés client sur l'en-tête org ; changements politique affectent la prochaine invitation ou tentative auto-inscription, pas rétroactivement les membres existants.</p>
      ${screenshot('platform-organization-settings-general.png', 'Configuration générale institution : nom, description, site web et sous-nav Branding')}

      <h2>Matrice rôles institution</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Owner</strong> — contrôle locataire complet : supprimer org, transférer propriété, assigner Admin, toutes opérations invite/retire/rôle.</li>
        <li><strong>Admin</strong> — inviter, changer rôles (pas vers Owner ; ne peut assigner Admin — Owner-only), retirer membres ; ne peut pas supprimer org.</li>
        <li><strong>ProductOwner</strong> — inviter et retirer membres ; gérer produits/licences assignés ; pas suppression org ni promotion Admin.</li>
        <li><strong>Member</strong> — voir aperçu org et produits assignés ; utiliser licences selon access matrix produit ; pas d'onglets gestion membres dans l'UI.</li>
        <li><strong>Viewer</strong> — accès org lecture seule ; visibilité produit via access matrix uniquement.</li>
        <li><strong>ResellerAdmin</strong> — rôle backend traité comme Admin pour beaucoup d'opérations org (affichage UI partiel).</li>
      </ul>

      <h2>Workflow invitation (étape par étape)</h2>
      <ol style="margin-left:1.25rem;">
        <li>Admin ouvre <strong>Membres</strong> ou <strong>Invitations</strong> → <strong>Inviter</strong>.</li>
        <li>Saisir email, choisir rôle, message optionnel → envoyer.</li>
        <li>Destinataire reçoit email avec lien token.</li>
        <li>Destinataire se connecte (ou s'inscrit) → <code>/auth/accept-invitation?token=…</code>.</li>
        <li>En succès, utilisateur ajouté à l'org avec rôle choisi → redirection vers <code>/dashboard/organization/:orgId</code>.</li>
        <li>Opérateur peut renvoyer ou annuler lignes pending depuis <strong>Invitations</strong>.</li>
      </ol>

      <h2>Automatisation REST</h2>
      <p>Routes sous <code>/api/Organization/…</code> reflètent flux tableau de bord : CRUD, membres, invitations, politiques. Utilisez JWT opérateur ou clés API compte à portée (${link('/rsa-keys', 'Guide clés API')}).</p>
      <p>${link('/api/organizations', 'API Institutions')} · ${link('/api/auth-users', 'Auth et utilisateurs')} · ${link('/guides/platform/products', 'Produits')} · ${link('/guides/platform/overview', "Vue d\\\\'ensemble système")}</p>
    `,
  },
  products: {
    title: "Produits",
    lead: "Ancrage pour clés RSA, versions, droits, licences et identifiants API. Chaque onglet produit, type d'accès, règle propriétaire et section paramètres expliqués.",
    body: `
      <p>Un <strong>produit</strong> est le logiciel que vous licencez. Tous les fichiers licence, le trafic de validation, les clés de signature RSA et les valeurs <code>X-API-KEY</code> produit appartiennent à un id produit. Les institutions assignent des produits aux locataires ; les <strong>propriétaires produit</strong> gèrent le licensing au quotidien.</p>
      <p>Parcours : ${link('/first-product', 'Créer votre premier produit')} · ${link('/rsa-keys', 'Clés RSA &amp; identifiants API')}.</p>

      <h2>Cycle de vie produit</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Créer</strong> — nom, version/niveau version initiale, type d'accès (Associated vs Opened), description et image optionnelles.</li>
        <li><strong>Configurer</strong> — Features, jeux de droits, paramètres mises à jour client, clés RSA dans Paramètres.</li>
        <li><strong>Équipe</strong> — ajouter membres institution sur onglet <strong>Utilisateurs</strong> ; affiner accès version sur <strong>Matrice d'accès</strong>.</li>
        <li><strong>Publier</strong> — livrer lignes de version sous onglet <strong>Versions</strong> (${link('/guides/platform/releases', 'Guide versions')}).</li>
        <li><strong>Émettre licences</strong> — onglet <strong>Licences</strong> ou liste globale (${link('/guides/platform/licenses', 'Guide licences')}).</li>
        <li><strong>Exploiter</strong> — activations, sessions, analytics filtrés à ce produit.</li>
        <li><strong>Retirer</strong> — désactiver ou supprimer depuis zone de danger Paramètres (cascade versions et licences).</li>
      </ol>

      <h2>Types d'accès : Associated vs Opened</h2>
      <p>Choisi à la création ; pilote UI et règles licence :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Associated (Institution)</strong> — workflow éditeur complet. Tous onglets produit, tous types licence (selon forfait). Licences liées au contexte institution ; seuls utilisateurs institution assignés accèdent au produit.</li>
        <li><strong>Opened (Tous les utilisateurs)</strong> — distribution simplifiée. Tableau de bord n'affiche que <strong>Aperçu</strong> et <strong>Versions</strong>. Création licence restreinte (p.ex. patterns perpétuel hors ligne) ; destiné aux catalogues logiciels largement ouverts.</li>
      </ul>

      <h2>Onglets produit (vue propriétaire complète)</h2>
      <p>Visibilité onglets calculée dans le layout produit :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Produits Opened</strong> — Aperçu + Versions uniquement.</li>
        <li><strong>Utilisateur final</strong> (pas dans <code>owners[]</code>, pas Admin système) — Aperçu, Versions, Licences (pas Paramètres, Utilisateurs, Matrice d'accès, Audit, Fonctionnalités, Droits).</li>
        <li><strong>Propriétaire produit ou Admin système</strong> — tous les onglets ci-dessous.</li>
      </ul>

      <h3>Aperçu</h3>
      <p>Onglet par défaut à l'ouverture d'un produit. Confirme type d'accès, liste propriétaires, ligne version courante et comptes licences avant d'émettre des clés ou modifier droits.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Badge statut</strong> — Active vs locked (limites abonnement/forfait peuvent bloquer gestion).</li>
        <li><strong>Comptes rapides</strong> — versions, licences, activations récentes où l'UI les affiche.</li>
        <li><strong>Owners</strong> — qui peut gérer clés RSA, Users, Matrice d'accès et CRUD licences.</li>
        <li><strong>Atterrissage utilisateur final</strong> — Members assignés commencent souvent ici puis ouvrent Releases ou Licenses.</li>
      </ul>

      <h3>Fonctionnalités</h3>
      <p>Catalogue de capacités pour ce produit. Chaque feature devient une clé stable que votre app vérifie à l'exécution via SDK <code>FeatureManager</code>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Créer une fonctionnalité</strong> — nom, description et assignation à groupes de droits (tags Groub/Group dans l'UI).</li>
        <li><strong>Rechercher</strong> — filtrer longs catalogues avant regroupement en sets.</li>
        <li><strong>Ne sautez pas les clés</strong> — clés feature doivent rester stables entre versions ; renommer casse droits signés sur le terrain.</li>
      </ul>
      <p>Approfondir : ${link('/guides/platform/features-entitlements', 'Fonctionnalités &amp; droits')}.</p>

      <h3>Jeux de droits</h3>
      <p>SKU réutilisables regroupant features pour émission licence. Opérateurs choisissent un set dans l'assistant licence au lieu de basculer des dizaines de flags par client.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Créer un jeu</strong> — nom, description, versions liées et features membres avec valeurs par feature.</li>
        <li><strong>Portée version</strong> — sets peuvent cibler lignes version spécifiques (p.ex. 1.0.0 vs 1.0.3).</li>
        <li><strong>Assistant licence</strong> — liste déroulante optionnelle étape 1 attache droits empaquetés aux nouvelles clés.</li>
      </ul>

      <h3>Versions</h3>
      <p>Lignes de version pour ce produit. Chaque licence se lie à un id version pour validation, portée droits et contrôles mise à jour SDK.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Nouvelle version</strong> — assistant multi-étapes : infos de base, jeux de droits, fichiers, notes.</li>
        <li><strong>Colonnes tableau</strong> — version, type (Stable/Beta/…), statut publié, dates création/sortie, nombre licences.</li>
        <li><strong>Liste globale</strong> — <strong>Versions</strong> sidebar montre vue cross-produit ; onglet produit est le chemin opérateur principal.</li>
      </ul>
      <p>Voir ${link('/guides/platform/releases', 'Guide versions')} pour brouillon vs publié et liaison artefacts.</p>

      <h3>Licences</h3>
      <p>Émettre, modifier, révoquer et télécharger matériel licence pour ce produit.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Créer</strong> — assistant deux étapes (type, produit, version, jeu droits → sièges, expiration, notes).</li>
        <li><strong>Distribuer</strong> — chaîne clé licence + <code>license.bin</code> signé depuis vue détail.</li>
        <li><strong>Vue membre</strong> — utilisateurs assignés voient licences activables ; boutons gestion requièrent propriété.</li>
        <li><strong>Types</strong> — perpetual, trial, subscription, floating, concurrent, node-locked, credit-based, usage-based (${link('/guides/platform/licenses', 'Guide licences')}).</li>
      </ul>

      <h3>Utilisateurs</h3>
      <p>Intégrer membres institution sur ce produit. Utilisateurs ajoutés ici obtiennent portée produit mais <strong>pas d'accès version tant qu'Matrice d'accès n'accorde pas les versions</strong>.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Sélectionner institution</strong> — liste déroulante des institutions où ce produit est assigné.</li>
        <li><strong>Multi-sélection membres</strong> — choisir personnes pas encore sur le produit.</li>
        <li><strong>État vide</strong> — quand chaque membre institution est déjà assigné, la modale indique onboarding terminé.</li>
        <li><strong>Owners</strong> — listés dans <code>product.owners</code> ; séparés de l'assignation onglet Users.</li>
      </ul>
      ${screenshot('platform-product-add-user.png', 'Modale Add User : intégrer membres institution au produit')}

      <h3>Matrice d'accès</h3>
      <p>Octrois fins par utilisateur et par version. Essentiel quand Members institution ne doivent voir que lignes version spécifiques ou quand Viewers ont besoin d'accès version lecture seule.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Gérer l'accès</strong> — liste cases à cocher de toutes versions publiées plus <strong>Accorder toutes les versions</strong> (inclut versions futures).</li>
        <li><strong>Search versions</strong> — filtrer longues listes version dans la modale.</li>
        <li><strong>Bannière statut</strong> — montre combien de versions un utilisateur a vs total disponible.</li>
        <li><strong>Sans lignes matrix</strong> — Members assignés peuvent voir le produit mais pas activer licences sur versions bloquées.</li>
      </ul>
      ${screenshot('platform-product-access-matrix-manage.png', 'Modale Manage Access : accorder accès version par utilisateur y compris versions futures')}

      <h3>Journaux d'audit</h3>
      <p>Piste audit à portée produit — plus étroite qu'audit institution mais inclut événements cycle vie licence liés à ce logiciel.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Actions typiques</strong> — LicenseCreated, LicenseDeleted, LicenseFileDownload, InvitationSent (quand contexte produit s'applique).</li>
        <li><strong>Filtres &amp; export</strong> — même pattern qu'audit org : action, type entité, plage dates, export CSV.</li>
        <li><strong>Workflow support</strong> — corréler ticket client avec IP et horodatage avant révocation clé.</li>
      </ul>
      ${screenshot('platform-product-audit-logs.png', "Onglet Product Journaux d'audit : création licence, téléchargement et activité invitations")}

      <h3>Paramètres</h3>
      <p>Propriétaires produit configurent comportement runtime et matériel cryptographique. Utilisateurs finaux et non-propriétaires ne voient pas cet onglet.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Général</strong> — nom, description, statut, type d'accès (où modifiable après création).</li>
        <li><strong>Mises à jour produit client</strong> — bascule <strong>Proposer mises à jour produit aux clients</strong> ; si désactivé, APIs mise à jour ne renvoient pas d'upgrade pour ce produit.</li>
        <li><strong>Clés signature licence (RSA)</strong> — générer, régénérer, télécharger PEM public ; clé privée ne quitte jamais le serveur (${link('/rsa-keys', 'Guide RSA')}).</li>
        <li><strong>Zone de danger</strong> — supprimer produit ; versions et licences cascadent.</li>
      </ul>
      <p><strong>Avertissement rotation :</strong> régénérer clés RSA invalide fichiers <code>license.bin</code> existants jusqu'à re-téléchargement licences et intégration nouvelle clé publique dans les apps.</p>
      ${screenshot('platform-product-settings-rsa-keys.png', 'Paramètres produit : bascule mises à jour client et clés signature licence avec régénération et téléchargement clé publique')}

      <h2>Qui peut faire quoi sur les produits</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>System Admin (JWT)</strong> — contourne beaucoup de contrôles propriété sur API ; voit sidebar admin.</li>
        <li><strong>Propriétaire produit</strong> — jeu d'onglets complet (sauf trim Opened) ; créer/modifier licences, clés RSA, Users, Matrice d'accès.</li>
        <li><strong>Member assigné</strong> — Aperçu, Versions, Licences (consommer/activer selon matrix) ; pas Paramètres.</li>
        <li><strong>Viewer</strong> — chemins lecture seule via access matrix ; pas création licence.</li>
        <li><strong>Org Admin sans propriété</strong> — gestion équipe institution mais pas clés RSA produit sauf aussi listé comme owner.</li>
      </ul>

      <h2>REST &amp; runtime</h2>
      <p><code>/api/Products/…</code> — CRUD, routes clé RSA, paramètres. Apps clientes utilisent <code>X-API-KEY</code> produit sur routes licence anonymes — pas votre JWT opérateur.</p>
      <p>${link('/api/catalog', 'API Produits &amp; versions')} · ${link('/api/licenses', 'API Licences')} · ${link('/sdk/dotnet', 'SDK .NET')} · ${link('/guides/platform/overview', "Vue d\\\\'ensemble système")}</p>
    `,
  },
  releases: {
    title: "Versions",
    lead: "Lignes de version logicielle ciblées par les licences et utilisées par le vérificateur de mises à jour. Liste globale vs onglet produit, niveaux de version et cycle de vie du brouillon à déprécié.",
    body: `
      <p>Une <strong>version logicielle</strong> est une ligne de version sous un produit — p.ex. <code>1.0.0 Stable</code> ou <code>2.0.0-beta</code>. Chaque licence émise référence un id version pour que validation, droits et contrôles mise à jour sachent quel canal build s'applique.</p>

      <h2>Pourquoi les versions comptent dans le cycle de vie</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Création produit</strong> — version initiale amorce la première version (voir ${link('/first-product', 'Premier produit')}).</li>
        <li><strong>Création licence</strong> — opérateur choisit <code>softwareReleaseId</code> à l'étape 1 de l'assistant.</li>
        <li><strong>Validation SDK</strong> — charge licence porte métadonnées version ; version app incompatible peut échouer contrôles politique.</li>
        <li><strong>Mises à jour</strong> — gestionnaires mise à jour SDK et <code>/api/Updates/…</code> comparent version client au catalogue versions.</li>
        <li><strong>Access matrix</strong> — accorder membres accès par ligne version, pas seulement par produit.</li>
      </ol>

      <h2>Onglet Product Releases</h2>
      <p>Surface opérateur principale pour gestion versions dans l'espace produit. L'élément sidebar <strong>Versions</strong> global montre les mêmes données sur tous les produits accessibles.</p>
      ${screenshot('platform-product-releases-list.png', 'Onglet Product Releases : liste versions avec type, statut et comptes licences')}

      <h2>Champs version (typiques)</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Chaîne version</strong> — sémantique (<code>1.0.0</code>), pré-version (<code>1.0.0-alpha.1</code>), simple (<code>1</code>) ou basée build (<code>1.0.0.1</code>) selon choix assistant.</li>
        <li><strong>Niveau version</strong> — Stable (production), Beta, Alpha, RC — signale attentes support et politique mise à jour.</li>
        <li><strong>Statut</strong> — Draft (caché aux utilisateurs finaux) vs Published (visible catalogues et assistant licence).</li>
        <li><strong>Notes / changelog</strong> — texte opérateur sur page détail version et optionnellement dans métadonnées mise à jour.</li>
        <li><strong>Jeux de droits</strong> — lier sets applicables à cette ligne version (voir étape 2 assistant).</li>
        <li><strong>Artefacts</strong> — installateurs via ${link('/guides/platform/storage', 'Connecteurs stockage')} (Google Drive, OneDrive, serveur personnalisé) au lieu de gros uploads API.</li>
      </ul>

      <h2>Workflow opérateur</h2>
      <ol style="margin-left:1.25rem;">
        <li>Ouvrir produit → onglet <strong>Versions</strong> (ou liste Releases globale).</li>
        <li><strong>Créer version</strong> — étape 1 : format versionnement, numéro version, niveau version, brouillon vs publié.</li>
        <li>Étape 2 : choisir jeux de droits applicables à ce build.</li>
        <li>Étape 3 : attacher fichiers depuis stockage ou références upload.</li>
        <li>Étape 4 : changelog et notes de version pour équipes support.</li>
        <li>Émettre licences contre cet id version <em>avant</em> que clients mettent à jour builds app.</li>
        <li>À la dépréciation, archiver ancienne version après migration licences ou forçage canal mise à jour.</li>
      </ol>
      ${screenshot('platform-create-release-basic-info.png', 'Assistant Create Release étape 1 : format versionnement, niveau version et statut brouillon ou publié')}

      <h2>Page détail version</h2>
      <p>Ouverte depuis une ligne du tableau versions ou liste globale. Montre tout ce dont le support a besoin pour une ligne version.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Badges en-tête</strong> — style versionnement (Semantic), niveau (Stable) et statut Published.</li>
        <li><strong>Changelog &amp; release notes</strong> — récit éditable pour opérateurs et clients.</li>
        <li><strong>Jeux de droits</strong> — quels SKU s'appliquent à cette version.</li>
        <li><strong>Carte fichiers</strong> — artefact stockage lié avec action téléchargement cloud (p.ex. fichier Google Drive).</li>
        <li><strong>Edit</strong> — mettre à jour métadonnées sans recréer id version (préférer nouvelle version pour bumps breaking).</li>
      </ul>
      ${screenshot('platform-release-detail.png', 'Page détail version : changelog, notes, jeux de droits et téléchargement fichier Google Drive')}

      <h2>Rôles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Propriétaire produit / Admin système</strong> — créer, modifier, supprimer versions.</li>
        <li><strong>Member assigné avec ligne matrix</strong> — voir lignes version autorisées ; peut activer licences sur lignes permises uniquement.</li>
        <li><strong>Viewer</strong> — lecture seule selon matrix.</li>
      </ul>

      <h2>API &amp; SDK</h2>
      <p>Routes catalogue sur <code>/api/Products/…</code> et endpoints spécifiques version dans ${link('/api/catalog', 'API catalogue')}. SDK : ${link('/sdk/updates-logging', 'Mises à jour &amp; logging')} pour contrôles mise à jour sensibles à la licence.</p>
    `,
  },
  'features-entitlements': {
    title: "Fonctionnalités & jeux de droits",
    lead: "Définissez capacités, regroupez-les en SKU, assignez jeux aux licences et appliquez-les dans le SDK à l'exécution.",
    body: `
      <p>Les <strong>features</strong> sont des bascules ou capacités atomiques (p.ex. <code>export_pdf</code>, <code>max_projects</code>). Les <strong>jeux de droits</strong> regroupent features pour assignation aux licences afin de livrer des packages sans recompiler pour chaque SKU.</p>

      <h2>Cycle de vie configuration</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Définir features</strong> sur onglet <strong>Fonctionnalités</strong> produit (<code>…/features</code>).</li>
        <li><strong>Regrouper</strong> en jeux de droits sur onglet <strong>Jeux de droits</strong> (<code>…/entitlements</code>).</li>
        <li><strong>Assigner</strong> jeu optionnel à la création/modification licence (étape 1 assistant ou détails).</li>
        <li><strong>Distribuer</strong> <code>license.bin</code> — charge signée inclut matériel droits.</li>
        <li><strong>Appliquer</strong> dans l'app via SDK <code>FeatureManager</code> ; <code>FeatureUsageTracker</code> optionnel pour mesure.</li>
      </ol>

      <h2>Onglet Features</h2>
      <p>Propriétaires produit définissent le catalogue capacités avant regroupement SKU. Utilisateurs finaux et non-propriétaires ne voient pas cet onglet.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Clé feature</strong> — identifiant stable référencé en code (<code>FeatureManager.IsEnabled("key")</code>).</li>
        <li><strong>Nom affiché &amp; description</strong> — documentation opérateur et contexte support.</li>
        <li><strong>Assigner aux groupes</strong> — tags bleus (p.ex. Groub1, Groub2) pré-groupe features pour rédaction jeux de droits.</li>
        <li><strong>Créer une fonctionnalité</strong> — ajoute ligne au tableau searchable avec date création et menu actions.</li>
        <li><strong>Type / défaut</strong> — portes booléennes, limites numériques ou valeurs structurées selon modèle produit.</li>
      </ul>
      <p><strong>Conseil design :</strong> préférez moins de clés bien nommées à des dizaines de bascules chevauchantes — clients reçoivent droits via sets, pas lignes feature individuelles.</p>
      ${screenshot('platform-product-features.png', 'Onglet Product Features : définir features et assigner aux groupes de droits')}

      <h2>Onglet Jeux de droits</h2>
      <p>Regroupez features en packages réutilisables que les opérateurs attachent à la création licence.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Créer un jeu</strong> — nom, description et tags version liés (1.0.0, 1.0.3, …).</li>
        <li><strong>Colonne Features</strong> — nombre capacités dans chaque set (p.ex. « 3 features »).</li>
        <li><strong>Ajouter features</strong> — choisir dans catalogue avec valeurs par feature (activé, limites).</li>
        <li><strong>Assistant licence</strong> — sets enregistrés apparaissent dans liste déroulante étape 1.</li>
        <li><strong>Impact modification</strong> — changements affectent émissions <strong>nouvelles</strong> ; licences signées existantes gardent ancien matériel jusqu'à réémission ou refresh en ligne.</li>
      </ul>
      ${screenshot('platform-product-entitlement-sets.png', 'Onglet Jeux de droits : regrouper features en sets réutilisables liés aux versions')}

      <h2>Application runtime</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Hors ligne</strong> — droits dans <code>license.bin</code> signé ; SDK vérifie signature puis lit charge feature.</li>
        <li><strong>Refresh en ligne</strong> — validation ou endpoints feature peuvent mettre à jour droits quand abonnement change en cours de terme.</li>
        <li><strong>Suivi usage</strong> — compteurs optionnels envoyés aux routes télémétrie (${link('/api/telemetry', 'API Télémétrie')}).</li>
      </ul>

      <h2>Rôles</h2>
      <p>Seuls <strong>propriétaires produit</strong> et <strong>Admin système</strong> voient onglets Features et Entitlements. Members consomment droits via licences détenues — ne les rédigent pas.</p>

      <p>${link('/sdk/features-usage', 'SDK : Features &amp; usage')} · ${link('/api/catalog', 'Catalogue REST')} · ${link('/guides/platform/licenses', 'Licences (éditeur)')} · ${link('/guides/platform/products', 'Produits')}</p>
    `,
  },
  licenses: {
    title: "Licences (espace éditeur)",
    lead: "Émettre, distribuer, révoquer et surveiller licences depuis le tableau de bord. Couvre l'assistant création en quatre étapes, onglets détail (dont Usage pour types mesurés), types licence et vues éditeur vs utilisateur final.",
    body: `
      <p>Les éditeurs créent des <strong>licences</strong> contre un produit et une version logicielle, puis distribuent la <strong>clé licence</strong> et <code>license.bin</code> signé. Le <em>type</em> licence pilote expiration, sièges, activations, sessions et règles validation SDK.</p>
      <p>Parcours : ${link('/first-license', 'Générer votre première licence')} · Guides modèles : ${link('/perpetual-license', 'Perpetual')}, ${link('/trial-license', 'Trial')}, ${link('/subscription-license', 'Subscription')}, ${link('/floating-license', 'Floating')}, ${link('/concurrent-license', 'Concurrent')}, ${link('/node-locked-license', 'Node-Locked')}, ${link('/credit-based-license', 'Credit-Based')}, ${link('/usage-based-license', 'Usage-Based')}.</p>

      <h2>Modèles licence en un coup d'œil</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Perpetual</strong> — achat unique ; en ligne ou hors ligne ; expiration optionnelle maintenance.</li>
        <li><strong>Trial</strong> — évaluation limitée dans le temps ; prolonger ou convertir en payant.</li>
        <li><strong>Subscription</strong> — terme récurrent ; renouveler ou révoquer au churn.</li>
        <li><strong>Floating</strong> — pool partagé ; sièges appliqués par <em>sessions live</em> ; toujours en ligne.</li>
        <li><strong>Concurrent</strong> — clé équipe partagée ; sièges appliqués par <em>activations appareil</em>.</li>
        <li><strong>Node-Locked</strong> — une machine par licence ; liaison matérielle + transfert ; auto-bind ou approbation propriétaire ; tentatives partage depuis autres machines enregistrées et signalées au propriétaire.</li>
        <li><strong>Credit-Based</strong> (<code>MeteredToken</code>) — en ligne uniquement ; portefeuille crédits partagé ; tarification tokens par feature. ${link('/credit-based-license', 'Guide complet')}.</li>
        <li><strong>Usage-Based</strong> (<code>MeteredCount</code>) — en ligne uniquement ; compteur usage partagé ; un usage par consume. ${link('/usage-based-license', 'Guide complet')}.</li>
      </ul>

      <h2>Cycle de vie licence (vue éditeur)</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Prérequis</strong> — produit, version, clés RSA générées (${link('/rsa-keys', 'Clés RSA')}).</li>
        <li><strong>Créer</strong> — assistant quatre étapes (Activation → License Type → Basic Info → Details).</li>
        <li><strong>Distribuer</strong> — copier clé licence ; télécharger <code>license.bin</code> depuis vue détail.</li>
        <li><strong>Activer (client)</strong> — SDK ou <code>POST /api/Licenses/validate</code> avec <code>X-API-KEY</code> produit.</li>
        <li><strong>Exploiter</strong> — surveiller activations/sessions ; prolonger essais ; ajuster sièges où permis.</li>
        <li><strong>Révoquer / supprimer</strong> — invalidation immédiate chemins en ligne ; fichiers offline échouent au prochain refresh en ligne.</li>
        <li><strong>Transférer</strong> — réassigner utilisateur issued-to ou appareil node-locked selon politique.</li>
      </ol>

      <h2>Où travailler dans le tableau de bord</h2>
      <p>Utilisez liste sidebar <strong>Licences</strong> pour recherche cross-produit, ou ouvrez produit → onglet <strong>Licences</strong> quand vous connaissez le contexte logiciel. Clients finaux utilisent <strong>My Licenses</strong> (pas l'espace éditeur) pour clés émises sur leur compte.</p>
      ${screenshot('platform-licenses-list.png', 'Liste Licenses — colonnes Type, Mode, Status et Activations (p.ex. 2/∞ perpetual, 1/1 node-locked)')}

      <h2>Assistant création — Étape 1 : Activation</h2>
      <p>Choisissez comment la licence est validée à l'exécution :</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Online</strong> — validation serveur, activations et sessions ; requis pour Floating, Subscription, Credit-Based et Usage-Based.</li>
        <li><strong>Offline</strong> — <code>license.bin</code> signé uniquement ; Perpetual, Trial et Node-Locked peuvent utiliser mode offline.</li>
      </ul>
      ${screenshot('platform-create-license-step1-activation.png', 'Étape 1 — Mode activation Online vs Offline')}

      <h2>Assistant création — Étape 2 : License Type</h2>
      <p>Choisissez la carte modèle — tout en aval (sièges, sessions, tokens, liaison) suit ce choix.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>Cartes type</strong> — Perpetual, Trial, Subscription, Floating, Concurrent, Node-Locked, <strong>Credit-Based</strong>, <strong>Usage-Based</strong> (forfait peut restreindre types).</li>
        <li>Types online-only désactivés quand Offline activation sélectionné à l'étape 1.</li>
      </ul>
      ${screenshot('platform-create-license-step-license-type.png', 'Étape 2 — Cartes type licence incluant Credit-Based et Usage-Based')}

      <h2>Assistant création — Étape 3 : Basic Info</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Product</strong> — requis depuis liste globale ; pré-rempli en contexte produit.</li>
        <li><strong>Software release</strong> — requis ; lie validation et contrôles mise à jour à une ligne version.</li>
        <li><strong>Issuer</strong> — nom éditeur optionnel sur métadonnées licence.</li>
        <li><strong>Issued to</strong> — email, sélecteur utilisateur final ou auto (selon type).</li>
        <li><strong>Entitlement set</strong> — package optionnel depuis onglet Jeux de droits produit.</li>
      </ul>
      ${screenshot('platform-create-license-step-basic-info.png', 'Étape 3 — Basic Info : produit, version, issued-to, nom licence')}

      <h2>Assistant création — Étape 4 : Details</h2>
      <p>Limites opérationnelles et libellés dont opérateurs et support dépendent après émission.</p>
      <ul style="margin-left:1.25rem;">
        <li><strong>License name</strong> — libellé interne (requis) ; apparaît listes et audit logs.</li>
        <li><strong>Duration / expiry</strong> — durée abonnement, période essai ou aucune pour perpétuel.</li>
        <li><strong>Seats &amp; limits</strong> — max activations (concurrent/node-locked), max utilisateurs concurrents (floating), solde tokens (credit-based), plafonds usage (usage-based).</li>
        <li><strong>Node-Locked — device binding mode</strong> — <em>Liaison auto à la première validation</em> ou <em>Approbation propriétaire produit</em> (étape Details uniquement).</li>
        <li><strong>Perpetual online</strong> — username/password optionnels pour validation identifiants.</li>
        <li><strong>Notes</strong> — notes opérateur rich-text (contexte ventes, tickets support).</li>
        <li><strong>Success screen</strong> — copier clé licence ; ouvrir détail pour télécharger <code>license.bin</code>.</li>
      </ul>
      ${screenshot('platform-create-license-step-details-binding.png', 'Étape 4 — Node-Locked Details : Auto-bind vs Approbation propriétaire produit')}

      <h2>Onglets détail licence (éditeur)</h2>
      <p>Ouverts depuis toute ligne licence. Visibilité onglets dépend du type licence et si vous êtes propriétaire produit ou Admin système.</p>

      <h3>Aperçu (toujours)</h3>
      <p>Résumé single-pane pour ops éditeur quotidiennes.</p>
      <ul style="margin-left:1.25rem;">
        <li>Clé licence, badge statut, type, version, issued-to, expiration.</li>
        <li>Télécharger <code>license.bin</code>, révoquer, supprimer, transférer utilisateur, lien édition.</li>
        <li>Copier clé pour livraison email ; audit log corrèle téléchargements avec IP.</li>
      </ul>

      <h3>Activations</h3>
      <p>Sièges appareil et environnement pour modèles liaison. Visible quand type licence supporte suivi matériel et vous avez droits owner/Admin.</p>
      <ul style="margin-left:1.25rem;">
        <li>Lignes par appareil avec block/unblock et notes support.</li>
        <li>Surface principale pour math sièges ${link('/concurrent-license', 'Concurrent')} (activations, pas sessions).</li>
        <li><strong>Node-Locked</strong> — approuver appareils pending quand mode liaison est Approbation propriétaire produit.</li>
        <li><strong>Perpetual online</strong> — piste audit machines (p.ex. <code>2/∞</code> dans liste licences).</li>
      </ul>
      ${screenshot('platform-node-locked-activations-tab.png', 'Détail licence — onglet Activations avec lignes appareil et statut')}
      <p>Voir ${link('/guides/platform/activations', 'Activations')}.</p>

      <h3>Sessions</h3>
      <p>Connexions en ligne live avec horodatages heartbeat. Affichées pour licences online-capable — surtout ${link('/floating-license', 'Floating')} où sièges suivent <em>sessions live</em>, et pour ${link('/perpetual-license', 'Perpetual online')} / ${link('/node-locked-license', 'Node-Locked online')} monitoring.</p>
      <ul style="margin-left:1.25rem;">
        <li>Déconnecter clients bloqués retenant sièges après crash app.</li>
        <li>Corréler id session avec logs API pour support.</li>
        <li>Bascule <strong>Direct</strong> et auto-refresh sur page Sessions globale.</li>
      </ul>
      ${screenshot('platform-node-locked-sessions-tab.png', 'Détail licence — onglet Active Sessions avec heartbeat et déconnexion')}
      <p>Voir ${link('/guides/platform/sessions', 'Sessions')}.</p>

      <h3>Usage</h3>
      <p>Licences <strong>Credit-Based</strong> et <strong>Usage-Based</strong> uniquement : solde tokens ou compteurs mesurés, historique consommation et ajustements opérateur. Voir guides ${link('/credit-based-license', 'Credit-Based')} et ${link('/usage-based-license', 'Usage-Based')}.</p>

      <h3>Appareil</h3>
      <p>Licences <strong>Node-locked</strong> uniquement : empreinte matérielle liée, historique activation, workflows transfert/délier quand politique permet changement machine, et carte <strong>Tentatives d'accès non autorisées</strong> listant machines refusées car licence liée ailleurs. Tentatives portent IDs matériel tenté et lié, IP, point d'entrée et compteur par machine ; propriétaires produit notifiés in-app une fois par machine fautive par jour et peuvent marquer chacune reviewed. Voir ${link('/node-locked-license', 'Détection partage licence node-locked')}.</p>

      <h2>Cycle de vie statut licence</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Active</strong> — valide pour validation dans limites politique.</li>
        <li><strong>Expired</strong> — après expiration (trial/subscription) ; validation échoue.</li>
        <li><strong>Revoked</strong> — arrêt forcé opérateur ; validation en ligne échoue immédiatement.</li>
        <li><strong>Suspended / locked</strong> — holds facturation ou conformité (selon déploiement).</li>
      </ul>

      <h2>Rôles</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Propriétaire produit / Admin système</strong> — créer, modifier, révoquer, supprimer, voir onglet Activations.</li>
        <li><strong>Member assigné</strong> — peut voir licences sur versions permises ; typiquement pas création.</li>
        <li><strong>Utilisateur final</strong> — routé vers <code>/dashboard/my-licenses</code> pour clés émises sur son compte.</li>
      </ul>

      <h2>Validation anonyme (runtime client)</h2>
      <p>Apps appellent <code>POST ${HOST}/api/Licenses/validate</code> avec <code>X-API-KEY</code> produit — jamais clé privée RSA ni JWT opérateur.</p>
      <p>${link('/api/licenses', 'API Licences')} · ${link('/sdk/license-client', 'SDK LicenseClient')} · ${link('/guides/platform/products', 'Produits')}</p>
    `,
  },
  activations: {
    title: "Activations",
    lead: "Appareils et environnements ayant consommé un siège licence. Surveillance globale, onglet par licence, block/unblock, approbation node-locked et comportement Perpetual vs Concurrent.",
    body: `
      <p>Une <strong>activation</strong> enregistre qu'une machine, utilisateur ou environnement spécifique a réclamé une capacité sur une licence. Modèles node-locked et concurrent dépendent des activations ; perpetual online les suit pour conformité et audit.</p>
      <p>Parcours combiné avec sessions : ${link('/sessions-activations', 'Guide sessions &amp; activations')} · ${link('/perpetual-license', 'Perpetual')} · ${link('/node-locked-license', 'Node-Locked')}.</p>

      <h2>Cycle de vie activation</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Client active</strong> — validation SDK ou <code>ActivationManager</code> avec empreinte matérielle / id appareil.</li>
        <li><strong>Serveur enregistre</strong> — ligne activation : id licence, infos appareil, horodatage, statut (active, pending approval, blocked).</li>
        <li><strong>Application</strong> — limites sièges bloquent nouvelles activations quand max atteint.</li>
        <li><strong>Approbation Node-Locked</strong> — ligne pending jusqu'à approbation propriétaire produit (quand mode liaison l'exige).</li>
        <li><strong>Bloquer</strong> — opérateur bloque appareil suspect ; client échoue au prochain contrôle en ligne.</li>
        <li><strong>Désactiver</strong> — client ou opérateur libère siège pour réutilisation.</li>
      </ol>

      <h2>Page Activations globale</h2>
      <p>Sidebar : <strong>Activations</strong>. Vue cross-produit quand vous ne savez pas encore quelle clé licence est impliquée.</p>
      ${screenshot('platform-activations-global-list.png', 'Activations globales — recherche, filtres, clé licence, appareil, colonnes statut')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Rechercher</strong> — clé licence, empreinte appareil, email utilisateur, nom machine.</li>
        <li><strong>Status filter</strong> — active, blocked, pending, deactivated.</li>
        <li><strong>Date presets</strong> — 7D / 30D / 90D / all / plage custom pour fenêtres incident.</li>
        <li><strong>Block / unblock</strong> — refus forcé au prochain contrôle en ligne sans supprimer historique.</li>
        <li><strong>Edit notes</strong> — annotations support visibles aux autres opérateurs.</li>
        <li><strong>Drill-down</strong> — ouvrir détail activation ou sauter vers licence parente.</li>
      </ul>
      <p>Scopes API listent produits que vous possédez ou administrez.</p>

      <h2>Onglet Activations par licence</h2>
      <p>Chemin plus rapide quand support a déjà la clé licence. Mêmes sémantiques block/unblock et approbation que liste globale mais pré-filtré à une licence.</p>
      ${screenshot('platform-node-locked-activations-tab.png', 'Onglet Activations par licence — lignes appareil pour une licence')}

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

      <p>${link('/api/activations-sessions', 'API Activations &amp; sessions')} · ${link('/sdk/activation-session', 'Activation SDK')} · ${link('/guides/platform/sessions', 'Sessions')}</p>
    `,
  },
  sessions: {
    title: "Sessions",
    lead: "Connexions en ligne live pour application heartbeat, concurrence flottante, monitoring Perpetual/Node-Locked et visibilité support temps réel.",
    body: `
      <p>Une <strong>session</strong> représente une connexion client en ligne active — utilisateur, appareil, version app, dernier heartbeat. Sessions complètent activations : licences floating limitent utilisateurs <em>concurrents</em> ; licences perpetual et node-locked en ligne utilisent sessions pour monitoring live et nettoyage.</p>
      <p>Parcours combiné : ${link('/sessions-activations', 'Guide sessions &amp; activations')} · ${link('/perpetual-license', 'Perpetual online')} · ${link('/node-locked-license', 'Node-Locked online')}.</p>

      <h2>Cycle de vie session</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Démarrer</strong> — SDK <code>SessionManager</code> ouvre session après validation/activation réussie.</li>
        <li><strong>Battement</strong> — ping périodique maintient session vivante ; heartbeats stale marquent offline.</li>
        <li><strong>Concurrent check</strong> — modèle floating compte sessions actives vs <code>maxActiveUsers</code>.</li>
        <li><strong>Terminer</strong> — arrêt client ou appel end explicite libère siège.</li>
        <li><strong>Disconnect (operator)</strong> — terminaison forcée depuis tableau de bord pour sessions bloquées.</li>
        <li><strong>Nettoyage</strong> — retirer lignes offline stale après confirmation support que client est parti.</li>
      </ol>

      <h2>Page Sessions globale</h2>
      <p>Sidebar : <strong>Sessions</strong> (Active Sessions). Monitoring style NOC de qui est en ligne maintenant.</p>
      ${screenshot('platform-sessions-global-list.png', 'Active Sessions globales — bascule Live, recherche, âge heartbeat, déconnexion')}
      <ul style="margin-left:1.25rem;">
        <li><strong>Direct</strong> — auto-refresh tant qu'activé (week-ends release, migrations licences).</li>
        <li><strong>Online / offline filter</strong> — focus clients live vs lignes historiques.</li>
        <li><strong>Rechercher</strong> — clé licence, email utilisateur, nom machine, version app.</li>
        <li><strong>Déconnecter</strong> — terminaison à distance ; client échoue au prochain heartbeat.</li>
        <li><strong>Details panel</strong> — chaîne version, IP/geo si collecté, id session pour corrélation API.</li>
      </ul>

      <h2>Onglet Sessions par licence</h2>
      <p>Mêmes données que page globale limitées à une licence — idéal pour une clé perpetual, node-locked ou floating.</p>
      ${screenshot('platform-node-locked-sessions-tab.png', 'Onglet Active Sessions par licence avec heartbeat et actions déconnexion')}

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
      <p>Visibilité : Admin système, org Admin, propriétaire produit (filtré API). Members/Viewers ne gèrent pas sessions.</p>

      <p>${link('/api/activations-sessions', 'Sujet REST')} · ${link('/sdk/activation-session', 'Sessions SDK')} · ${link('/guides/platform/activations', 'Activations')}</p>
    `,
  },
  trials: {
    title: "Essais",
    lead: "Licences d'évaluation limitées dans le temps, campagnes d'essai, workflows prolongation et conversion, et différences avec licences abonnement.",
    body: `
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
        <li><strong>Rechercher</strong> — email client, clé licence, nom produit.</li>
        <li><strong>Extend trial</strong> — repousser date expiration ; écrit entrée audit.</li>
        <li><strong>End trial</strong> — expiration immédiate ; validation échoue au prochain contrôle SDK ou API.</li>
        <li><strong>Créer</strong> — utiliser assistant licence type <strong>Trial</strong> ou raccourci page Trials si proposé.</li>
        <li><strong>Open license detail</strong> — contexte activations/sessions complet pour escalades.</li>
      </ul>

      <h2>Trial vs subscription</h2>
      <ul style="margin-left:1.25rem;">
        <li><strong>Trial</strong> — SKU évaluation ; souvent mono-siège ; entonnoirs marketing ; peut expirer auto sans paiement.</li>
        <li><strong>Subscription</strong> — terme récurrent lié au renouvellement facturation ; voir ${link('/subscription-license', 'Modèle Subscription')}.</li>
      </ul>

      <h2>Rôles</h2>
      <p>Comme gestion licences : <strong>propriétaires produit</strong> et <strong>Admin système</strong> prolongent/terminent essais. Members n'accèdent pas aux actions admin trial.</p>

      <p>${link('/api/trials-transfers', 'API Essais &amp; transferts')} · ${link('/trial-license', 'Modèle Trial')} · ${link('/guides/platform/licenses', 'Licences (éditeur)')} · ${link('/guides/platform/analytics', 'Analytique')}</p>
    `,
  },
  analytics: {
    title: "Analytique & statistiques",
    lead: "KPI adoption, tendances activations, mix licences, exports et rapports planifiés à travers institutions et produits.",
    body: `
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
        <li><code>/dashboard/logs</code> — logs fusionnés Admin système (audit, login, email, SDK).</li>
      </ul>

      <h2>Sources données (API)</h2>
      <p>Agrégats depuis <code>/api/Analytics/…</code>, <code>/api/Statistics/…</code>, plus ${link('/api/telemetry', 'API Télémétrie &amp; logs')} pour envoi logs SDK et logs tableau de bord.</p>

      <h2>Rôles</h2>
      <p>Org Admins et propriétaires produit voient analytics à portée institution. System Admin voit vues plateforme. Viewers/Members voient analytics limitées ou aucune selon assignation.</p>

      <p>${link('/guides/platform/organizations', 'Institutions')} · ${link('/guides/platform/activations', 'Activations')} · ${link('/guides/platform/overview', "Vue d\\\\'ensemble système")}</p>
    `,
  },
  storage: {
    title: "Connecteurs stockage",
    lead: "Attachez binaires de version via Google Drive, OneDrive ou serveur personnalisé au lieu de pousser gros fichiers via l'API core à chaque upload.",
    body: `
      <p>Les <strong>connecteurs stockage</strong> lient LicenPro à des hôtes de fichiers externes. Utilisez-les quand installateurs, packages delta ou notes de version vivent sur drives cloud ou votre CDN — enregistrements version dans LicenPro pointent toujours vers métadonnées version tandis que artefacts se résolvent depuis stockage distant.</p>

      <h2>Cycle de vie stockage</h2>
      <ol style="margin-left:1.25rem;">
        <li><strong>Connecter</strong> — authentifier fournisseur au hub Storage.</li>
        <li><strong>Configurer</strong> — choisir dossiers, identifiants ou URL base serveur personnalisé.</li>
        <li><strong>Upload / link</strong> — placer binaires dans UI fournisseur ou navigateur stockage LicenPro.</li>
        <li><strong>Bind to release</strong> — associer chemin/id artefact en éditant une ${link('/guides/platform/releases', 'version')}.</li>
        <li><strong>SDK update check</strong> — client résout URL téléchargement via update API + métadonnées stockage.</li>
        <li><strong>Révoquer</strong> — déconnecter fournisseur ; liens version existants peuvent casser jusqu'à re-liaison.</li>
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

      <p>${link('/api/storage', 'Sujet REST Stockage')} · ${link('/guides/platform/releases', 'Versions')} · ${link('/sdk/updates-logging', 'Mises à jour SDK')}</p>
    `,
  },
  'account-settings': {
    title: "Paramètres du compte",
    lead: "Profil opérateur, sécurité, notifications, forfait abonnement, facturation, clés API REST et suppression compte — séparés des clés RSA par produit.",
    body: `
      <p>Les <strong>paramètres du compte</strong> gèrent <em>vous</em> en tant qu'utilisateur plateforme — pas un produit ou une institution. Clés signature produit vivent sous Produit → Paramètres (${link('/rsa-keys', 'Guide clés RSA')}) ; <strong>clés API</strong> compte automatisent appels REST avec identifiants JWT à portée.</p>

      <h2>Route</h2>
      <p>Ouvrez <strong>Paramètres</strong> (icône engrenage) depuis la sidebar. Onglets pilotés par paramètre requête : profile, security, notifications, manage plan, API keys et zone de danger. Facturation et checkout sont pages adjacentes pour upgrades.</p>

      <h2>Sections paramètres</h2>

      <h3>Mon profil</h3>
      <p>Nom affiché, avatar, email contact, préférences fuseau horaire. Met à jour identité opérateur affichée dans audit logs et invitations — pas métadonnées licence ni clés RSA produit.</p>

      <h3>Sécurité</h3>
      <p>Changement mot de passe, authentification deux facteurs et revue sessions connexion actives sur votre compte opérateur.</p>

      <h3>Notifications</h3>
      <p>Préférences email et in-app : événements licence, invitations, facturation, marketing (selon bascules). Ne change pas télémétrie app cliente.</p>

      <h3>Gérer le forfait</h3>
      <p>Niveau abonnement actuel (Free vs Pro), limites institutions, produits, types licence et connecteurs stockage. Flux upgrade liés au checkout. Produits verrouillés affichent <code>isSubscriptionLocked</code> dans l'UI — propriétaires ne peuvent pas gérer tant que forfait n'est pas restauré.</p>

      <h3>Facturation</h3>
      <p>Factures, moyen de paiement et historique paiements — surface commerce adjacente à manage plan.</p>

      <h3>Clés API</h3>
      <p>Générer identifiants REST à portée pour CI/CD et outils internes :</p>
      <ul style="margin-left:1.25rem;">
        <li>Nom, description, expiration optionnelle.</li>
        <li>Scopes : Read/Write Licenses, Activations, Products, Releases.</li>
        <li>Secret affiché une fois — stockez dans un coffre (${link('/rsa-keys', 'Parcours complet clés API')}).</li>
      </ul>

      <h3>Danger zone</h3>
      <p>Supprimer compte opérateur — irréversible. Ne supprime pas institutions que vous possédez ; transférez propriété institution d'abord.</p>

      <p>${link('/api/auth-users', 'API Auth &amp; users')} · ${link('/api/security', 'API Sécurité')} · ${link('/api/billing', 'API Facturation')} · ${link('/guides/platform/overview', "Vue d\\\\'ensemble système")}</p>
    `,
  },
};
