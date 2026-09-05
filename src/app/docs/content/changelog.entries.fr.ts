import type { ChangelogEntry } from './changelog.types';

export const CHANGELOG_ENTRIES_FR: ChangelogEntry[] = [
    {
      version: '2.6.0',
      date: '16 août 2026',
      type: 'minor',
      highlights: [
        'Détection de partage de licence pour les licences Node-locked',
        'Tentatives d’accès non autorisées dans l’onglet Liaison appareil',
        'Alertes in-app pour les propriétaires produit lorsqu’une licence est utilisée depuis une autre machine'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Les licences Node-locked enregistrent désormais chaque machine refusée car la licence est liée ailleurs',
            'Carte Tentatives d’accès non autorisées dans l’onglet Liaison appareil de la licence, affichant les IDs matériel tenté et lié, l’adresse IP, le point d’entrée, le nombre de tentatives et les horodatages',
            'Notification in-app aux propriétaires produit lors de la première tentative depuis chaque machine non reconnue',
            'Marquer les tentatives comme revues pour effacer la bannière d’avertissement licence et le badge d’onglet',
            'API: GET /api/Licenses/{id}/access-attempts and POST /api/Licenses/{id}/access-attempts/{attemptId}/acknowledge'
          ]
        },
        {
          category: 'security',
          items: [
            'Le détail des tentatives d’accès est réservé aux propriétaires produit et administrateurs ; les IDs matériel restent masqués dans les journaux et le texte de notification',
            'Les alertes propriétaire sont limitées à une par machine fautive par jour, afin qu’un client en boucle de retry ne puisse pas inonder les notifications'
          ]
        },
        {
          category: 'improved',
          items: [
            'La détection est uniquement observationnelle — codes d’erreur de validation, messages client et état de liaison inchangés, et rien n’est révoqué automatiquement'
          ]
        }
      ]
    },
    {
      version: '2.5.0',
      date: '10 janvier 2026',
      type: 'minor',
      highlights: [
        'Nouveau centre d’aide et de documentation',
        'Interface de page profil améliorée',
        'Navigation améliorée avec méga menu déroulant'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Centre d’aide et de documentation complet avec guides catégorisés',
            'Méga menu déroulant pour accès rapide à la documentation',
            'Page FAQ avec questions et réponses recherchables',
            'Page journal des modifications pour suivre mises à jour et améliorations',
            'Page À propos avec informations société',
            'Guide de démarrage rapide pour nouveaux utilisateurs',
            'Documentation des types de licence (Standard, Trial, Floating, etc.)',
            'Guides d’intégration SDK pour .NET, WinForms et WPF'
          ]
        },
        {
          category: 'improved',
          items: [
            'Page profil repensée avec mise en page en cartes moderne',
            'Barre de navigation mieux organisée avec menus déroulants',
            'Lien paramètres du compte ajouté à la navigation',
            'Meilleure hiérarchie visuelle dans les composants tableau de bord'
          ]
        },
        {
          category: 'fixed',
          items: [
            'Correction des problèmes de z-index du menu déroulant',
            'Résolution des débordements de navigation mobile',
            'Correction de la gestion d’erreur d’upload d’image de profil'
          ]
        }
      ]
    },
    {
      version: '2.4.0',
      date: '15 décembre 2025',
      type: 'minor',
      highlights: [
        'Tableau de bord gestion des sessions',
        'Surveillance heartbeat en temps réel',
        'Analytique licence améliorée'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Page gestion des sessions pour voir et gérer les sessions actives',
            'Surveillance heartbeat en temps réel pour licences Floating',
            'Fonction de déconnexion de session pour administrateurs',
            'Affichage du nombre d’utilisateurs actifs sur les détails licence',
            'Historique de session et journalisation d’audit'
          ]
        },
        {
          category: 'improved',
          items: [
            'La liste des licences affiche maintenant le nombre de sessions actives',
            'Meilleurs messages d’erreur pour problèmes liés aux sessions',
            'Configuration d’intervalle heartbeat optimisée'
          ]
        },
        {
          category: 'fixed',
          items: [
            'Correction du nettoyage de session pour heartbeats expirés',
            'Résolution d’une condition de course dans la gestion de sessions concurrentes'
          ]
        }
      ]
    },
    {
      version: '2.3.0',
      date: '20 novembre 2025',
      type: 'minor',
      highlights: [
        'Intégration Google Drive',
        'Partage de fichiers avec les licences',
        'Gestion du stockage'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Intégration Google Drive pour stockage des fichiers de version',
            'Partage automatique de fichiers lors de la génération de licences',
            'Tableau de bord gestion du stockage',
            'Indicateurs de progression d’upload',
            'Prise en charge de plusieurs pièces jointes par version'
          ]
        },
        {
          category: 'improved',
          items: [
            'Le formulaire de version prend maintenant en charge les pièces jointes',
            'Meilleure validation des types de fichier',
            'Gestion d’erreur d’upload améliorée'
          ]
        },
        {
          category: 'security',
          items: [
            'Ajout de la validation de portée OAuth2 pour Google Drive',
            'Mise en œuvre de permissions de partage de fichiers sécurisées'
          ]
        }
      ]
    },
    {
      version: '2.2.0',
      date: '5 octobre 2025',
      type: 'minor',
      highlights: [
        'Système de notifications',
        'Alertes e-mail',
        'Notifications in-app'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Centre de notifications in-app',
            'Notifications e-mail pour événements importants',
            'Préférences de notification dans les paramètres',
            'Rappels d’expiration de licence',
            'Alertes de nouvelle activation'
          ]
        },
        {
          category: 'improved',
          items: [
            'L’en-tête du tableau de bord affiche maintenant un badge de notification',
            'Meilleur regroupement et filtrage des notifications'
          ]
        }
      ]
    },
    {
      version: '2.1.0',
      date: '1 septembre 2025',
      type: 'minor',
      highlights: [
        'Gestion des clés API',
        'Améliorations REST API',
        'Prise en charge des Webhooks'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Génération et gestion de clés API',
            'Configuration Webhooks pour événements licence',
            'Analytique d’usage API',
            'Contrôles de limitation de débit',
            'Améliorations de la documentation API'
          ]
        },
        {
          category: 'improved',
          items: [
            'Temps de réponse REST API réduits de 40 %',
            'Meilleurs messages et codes d’erreur API',
            'Pagination pour tous les endpoints de liste'
          ]
        },
        {
          category: 'security',
          items: [
            'Prise en charge de la rotation des clés API',
            'Liste blanche IP pour accès API',
            'Authentification API renforcée'
          ]
        }
      ]
    },
    {
      version: '2.0.0',
      date: '1 août 2025',
      type: 'major',
      highlights: [
        'Refonte complète de l’interface',
        'Nouvelle expérience tableau de bord',
        'Migration Angular 18'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Tableau de bord entièrement repensé avec UI moderne',
            'Prise en charge du mode sombre',
            'Design responsive pour appareils mobiles',
            'Nouvelle interface de gestion produits',
            'Assistant de génération de licence amélioré',
            'Visionneuse de journal d’audit'
          ]
        },
        {
          category: 'improved',
          items: [
            'Migration vers Angular 18 avec composants standalone',
            'Performance améliorée avec chargement paresseux',
            'Meilleure conformité accessibilité',
            'Navigation rationalisée'
          ]
        },
        {
          category: 'deprecated',
          items: [
            'Ancienne UI tableau de bord (sera supprimée en v3.0)',
            'Anciens endpoints API v1 (utiliser v2 à la place)'
          ]
        }
      ]
    },
    {
      version: '1.5.0',
      date: '15 juin 2025',
      type: 'minor',
      highlights: [
        'Prise en charge licence Floating',
        'Gestion des utilisateurs concurrents',
        'Regroupement de licences'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Type de licence Floating pour utilisateurs concurrents',
            'Gestion de pool de licences',
            'Suivi en temps réel de la disponibilité des sièges',
            'Nettoyage automatique des sessions'
          ]
        },
        {
          category: 'improved',
          items: [
            'Le SDK prend maintenant en charge tous les types de licence',
            'Meilleure documentation pour licences Floating'
          ]
        }
      ]
    },
    {
      version: '1.0.0',
      date: '1 mars 2025',
      type: 'major',
      highlights: [
        'Version initiale',
        'Fonctionnalités de licence de base',
        '.NET SDK'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Génération de licence Perpetual',
            'Prise en charge licence d’essai',
            'Gestion des clés RSA',
            'Chiffrement du fichier de licence',
            '.NET SDK pour validation de licence',
            'Tableau de bord de base pour gestion des licences',
            'Authentification et inscription utilisateur'
          ]
        }
      ]
    }
  ];
