# LicenPro module matrix (dashboard ↔ API ↔ SDK)

Authoritative mapping for documentation IA. API controllers live under `LicenPro-2024/LicenPro.API/Controllers`. SDK under `LicenPro-2024/SDK/LicenPro.SDK.lib`.

| Module | Dashboard routes (Angular) | API controllers | SDK touchpoints |
|--------|---------------------------|-----------------|-----------------|
| Auth & sessions | `/auth/*`, account | `AuthController`, `SecurityController` | — |
| Organizations | `/dashboard/organizations`, `/dashboard/organization/:id/*` | `OrganizationController` | — |
| Products | `/dashboard/products`, `/dashboard/products/:id/*` | `ProductsController` | Product id in `LicenseClientOptions` |
| Releases | `.../releases`, global `/dashboard/releases` | `SoftwareReleasesController` | Update checks via release / `SdkUpdateManager` |
| Features & entitlements | `.../features`, `.../entitlements` | `FeaturesController`, `EntitlementSetsController` | `FeatureManager`, `EntitlementSet` models |
| RSA / keys | product settings, `/dashboard/settings/licensing` | `ProductsController` keys routes | Public key material, `LicensingSecrets` |
| Licenses (vendor) | `/dashboard/licenses`, product `.../licenses` | `LicensesController` | `LicenseClient`, `LicenseBuilder`, serializers |
| Activations | `/dashboard/activations` | `ActivationsController` | `ActivationManager` |
| Sessions | `/dashboard/sessions` | `SessionsController` | `SessionManager` |
| Trials | `/dashboard/trials` | `TrialsController` | `TrialExtensionManager`, trial models |
| Transfers | (license transfer flows) | `TransfersController` | `LicenseTransferManager` |
| Analytics & stats | `/dashboard/analytics`, subscribers | `AnalyticsController`, `StatisticsController` | `FeatureUsageTracker` (telemetry) |
| Audit & logs | audit logs, email logs, dashboard logs | `AuditLogsController`, `DashboardLogsController`, `SdkLogsController` | `ILicenseLogger` implementations |
| Notifications | `/dashboard/notifications` | `NotificationsController` | — |
| Tickets & support | `/dashboard/tickets*` | `TicketsController` | — |
| Billing / payments | `/dashboard/billing`, checkout | `SubscriptionsController`, `PaymentsController` | — |
| Storage | `/dashboard/storage/*` | `StorageController`, `OneDriveStorageController`, `CustomServerStorageController` | Staged updates / files |
| Updates (client) | product/release linkage | `UpdatesController` | `SdkUpdateManager`, `UpdateChecker` |
| SDK settings | product API keys in UI | `SdkSettingsController` | `SdkConfiguration`, JSON settings |
| Users & roles | org members, `/dashboard/roles` | `UsersController`, `RoleController` | — |
| Jobs & admin | `/dashboard/jobs`, system settings | `JobsController`, `AdminController`, `SettingsController` | — |
| Email | templates / logs | `EmailController` | — |
| Webhooks | (integration) | (handlers documented per deployment) | Outbound events to integrators |

**Doc route convention**

- `/guides/platform/{topic}` — narrative dashboard guides.
- `/api/{topic}` — REST topic summaries (detail in OpenAPI viewer + Swagger).
- `/sdk/{topic}` — .NET SDK subsystem guides.

Legacy slugs (`/api-reference`, `/sdk-dotnet`, …) redirect to the new paths.
