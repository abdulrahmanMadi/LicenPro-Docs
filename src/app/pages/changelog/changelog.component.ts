import { Component } from '@angular/core';

interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  highlights: string[];
  changes: {
    category: 'added' | 'improved' | 'fixed' | 'security' | 'deprecated';
    items: string[];
  }[];
}

@Component({
  selector: 'app-changelog',
  standalone: true,
  imports: [],
  templateUrl: './changelog.component.html',
  styleUrls: ['../../styles/help-pages.scss', './changelog.component.css']
})
export class ChangelogComponent {
  changelog: ChangelogEntry[] = [
    {
      version: '2.5.0',
      date: 'January 10, 2026',
      type: 'minor',
      highlights: [
        'New Help & Documentation Center',
        'Enhanced Profile Page UI',
        'Improved Navigation with Mega Dropdown'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Comprehensive Help & Documentation Center with categorized guides',
            'Mega dropdown menu for quick access to documentation',
            'FAQ page with searchable questions and answers',
            'Changelog page to track updates and improvements',
            'About Us page with company information',
            'Quick Start Guide for new users',
            'License type documentation (Standard, Trial, Floating, etc.)',
            'SDK integration guides for .NET, WinForms, and WPF'
          ]
        },
        {
          category: 'improved',
          items: [
            'Profile page redesigned with modern card-based layout',
            'Navigation bar with better organization and dropdowns',
            'Account settings link added to navigation',
            'Better visual hierarchy in dashboard components'
          ]
        },
        {
          category: 'fixed',
          items: [
            'Fixed dropdown menu z-index issues',
            'Resolved mobile navigation overflow problems',
            'Fixed profile image upload error handling'
          ]
        }
      ]
    },
    {
      version: '2.4.0',
      date: 'December 15, 2025',
      type: 'minor',
      highlights: [
        'Session Management Dashboard',
        'Real-time Heartbeat Monitoring',
        'Improved License Analytics'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Session management page to view and manage active sessions',
            'Real-time heartbeat monitoring for floating licenses',
            'Session disconnect functionality for administrators',
            'Active users count display on license details',
            'Session history and audit logging'
          ]
        },
        {
          category: 'improved',
          items: [
            'License list now shows active session count',
            'Better error messages for session-related issues',
            'Optimized heartbeat interval configuration'
          ]
        },
        {
          category: 'fixed',
          items: [
            'Fixed session cleanup for expired heartbeats',
            'Resolved race condition in concurrent session handling'
          ]
        }
      ]
    },
    {
      version: '2.3.0',
      date: 'November 20, 2025',
      type: 'minor',
      highlights: [
        'Google Drive Integration',
        'File Sharing with Licenses',
        'Storage Management'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Google Drive integration for release file storage',
            'Automatic file sharing when generating licenses',
            'Storage management dashboard',
            'File upload progress indicators',
            'Support for multiple file attachments per release'
          ]
        },
        {
          category: 'improved',
          items: [
            'Release form now supports file attachments',
            'Better file type validation',
            'Improved upload error handling'
          ]
        },
        {
          category: 'security',
          items: [
            'Added OAuth2 scope validation for Google Drive',
            'Implemented secure file sharing permissions'
          ]
        }
      ]
    },
    {
      version: '2.2.0',
      date: 'October 5, 2025',
      type: 'minor',
      highlights: [
        'Notification System',
        'Email Alerts',
        'In-App Notifications'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'In-app notification center',
            'Email notifications for important events',
            'Notification preferences in settings',
            'License expiration reminders',
            'New activation alerts'
          ]
        },
        {
          category: 'improved',
          items: [
            'Dashboard header now shows notification badge',
            'Better notification grouping and filtering'
          ]
        }
      ]
    },
    {
      version: '2.1.0',
      date: 'September 1, 2025',
      type: 'minor',
      highlights: [
        'API Key Management',
        'REST API Improvements',
        'Webhook Support'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'API key generation and management',
            'Webhook configuration for license events',
            'API usage analytics',
            'Rate limiting controls',
            'API documentation improvements'
          ]
        },
        {
          category: 'improved',
          items: [
            'REST API response times reduced by 40%',
            'Better API error messages and codes',
            'Pagination support for all list endpoints'
          ]
        },
        {
          category: 'security',
          items: [
            'API key rotation support',
            'IP whitelist for API access',
            'Enhanced API authentication'
          ]
        }
      ]
    },
    {
      version: '2.0.0',
      date: 'August 1, 2025',
      type: 'major',
      highlights: [
        'Complete UI Redesign',
        'New Dashboard Experience',
        'Angular 18 Migration'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Completely redesigned dashboard with modern UI',
            'Dark mode support',
            'Responsive design for mobile devices',
            'New product management interface',
            'Enhanced license generation wizard',
            'Audit log viewer'
          ]
        },
        {
          category: 'improved',
          items: [
            'Migrated to Angular 18 with standalone components',
            'Improved performance with lazy loading',
            'Better accessibility compliance',
            'Streamlined navigation'
          ]
        },
        {
          category: 'deprecated',
          items: [
            'Legacy dashboard UI (will be removed in v3.0)',
            'Old API v1 endpoints (use v2 instead)'
          ]
        }
      ]
    },
    {
      version: '1.5.0',
      date: 'June 15, 2025',
      type: 'minor',
      highlights: [
        'Floating License Support',
        'Concurrent User Management',
        'License Pooling'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Floating license type for concurrent users',
            'License pool management',
            'Real-time seat availability tracking',
            'Automatic session cleanup'
          ]
        },
        {
          category: 'improved',
          items: [
            'SDK now supports all license types',
            'Better documentation for floating licenses'
          ]
        }
      ]
    },
    {
      version: '1.0.0',
      date: 'March 1, 2025',
      type: 'major',
      highlights: [
        'Initial Release',
        'Core Licensing Features',
        '.NET SDK'
      ],
      changes: [
        {
          category: 'added',
          items: [
            'Perpetual license generation',
            'Trial license support',
            'RSA key management',
            'License file encryption',
            '.NET SDK for license validation',
            'Basic dashboard for license management',
            'User authentication and registration'
          ]
        }
      ]
    }
  ];

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'added': return 'ki-plus-squared';
      case 'improved': return 'ki-arrow-up';
      case 'fixed': return 'ki-wrench';
      case 'security': return 'ki-shield-tick';
      case 'deprecated': return 'ki-trash';
      default: return 'ki-information-2';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'added': return 'Added';
      case 'improved': return 'Improved';
      case 'fixed': return 'Fixed';
      case 'security': return 'Security';
      case 'deprecated': return 'Deprecated';
      default: return category;
    }
  }
}
