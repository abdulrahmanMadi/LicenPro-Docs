# LicenPro module matrix (dashboard ↔ API ↔ SDK)

Authoritative mapping for documentation IA. Public HTTP surface is summarized by URL prefix under `/api` on your deployment. SDK source reference: `LicenPro-2024/SDK/LicenPro.SDK.lib`.

| Module | Dashboard routes (Angular) | REST route groups (typical) | SDK touchpoints |
|--------|---------------------------|------------------------------|-----------------|
| Auth & sessions | `/auth/*`, account | `/api/Auth/...`, `/api/security/...` | — |
| Organizations | `/dashboard/organizations`, `/dashboard/organization/:id/*` | `/api/Organization/...` | — |
| Products | `/dashboard/products`, `/dashboard/products/:id/*` | `/api/Products/...` | Product id in `LicenseClientOptions` |
| Releases | `.../releases`, global `/dashboard/releases` | Product/catalog release routes | Update checks via release / `SdkUpdateManager` |
| Features & entitlements | `.../features`, `.../entitlements` | Catalog feature & entitlement-set routes | `FeatureManager`, `EntitlementSet` models |
| RSA / keys | product settings, `/dashboard/settings/licensing` | `/api/Products/{id}/keys/...` | Public key material, `LicensingSecrets` |
| Licenses (vendor) | `/dashboard/licenses`, product `.../licenses` | `/api/Licenses/...` | `LicenseClient`, `LicenseBuilder`, serializers |
| Activations | `/dashboard/activations` | `/api/Activations/...` (and related) | `ActivationManager` |
| Sessions | `/dashboard/sessions` | `/api/Sessions/...` (and related) | `SessionManager` |
| Trials | `/dashboard/trials` | Trials surface under `/api/...` | `TrialExtensionManager`, trial models |
| Transfers | (license transfer flows) | Transfers surface under `/api/...` | `LicenseTransferManager` |
| Analytics & stats | `/dashboard/analytics`, subscribers | `/api/Analytics/...`, `/api/Statistics/...` | `FeatureUsageTracker` (telemetry) |
| Audit & logs | audit logs, email logs, dashboard logs | `/api/AuditLogs/...`, `/api/DashboardLogs/...`, `/api/SdkLogs/...` | `ILicenseLogger` implementations |
| Notifications | `/dashboard/notifications` | `/api/Notifications/...` | — |
| Tickets & support | `/dashboard/tickets*` | `/api/Tickets/...` | — |
| Billing / payments | `/dashboard/billing`, checkout | `/api/Subscriptions/...`, `/api/Payments/...` | — |
| Storage | `/dashboard/storage/*` | `/api/Storage/...`, `/api/OneDriveStorage/...`, `/api/CustomServerStorage/...` | Staged updates / files |
| Updates (client) | product/release linkage | `/api/Updates/...` | `SdkUpdateManager`, `UpdateChecker` |
| SDK settings | product API keys in UI | `/api/SdkSettings/...` | `SdkConfiguration`, JSON settings |
| Users & roles | org members, `/dashboard/roles` | `/api/Users/...`, role routes | — |
| Jobs & admin | `/dashboard/jobs`, system settings | `/api/Jobs/...`, `/api/Admin/...`, `/api/Settings/...` | — |
| Email | templates / logs | `/api/Email/...` | — |
| Webhooks | (integration) | (handlers documented per deployment) | Outbound events to integrators |

**Doc route convention**

- `/guides/platform/{topic}` — narrative dashboard guides.
- `/api/{topic}` — REST topic summaries with concrete paths.
- `/sdk/{topic}` — .NET SDK subsystem guides.

Legacy slugs (`/api-reference`, `/sdk-dotnet`, …) redirect to the new paths.
