import { Routes } from '@angular/router';
import { DocsLayoutComponent } from './components/docs-layout/docs-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DocsLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'quick-start',
        loadComponent: () => import('./pages/quick-start/quick-start.component').then((m) => m.QuickStartComponent),
      },
      {
        path: 'guides/platform/:topic',
        loadComponent: () =>
          import('./pages/doc-topic/doc-topic-page.component').then((m) => m.DocTopicPageComponent),
        data: { docKind: 'platform' },
      },
      {
        path: 'api/overview',
        loadComponent: () =>
          import('./pages/api-overview/api-overview.component').then((m) => m.ApiOverviewComponent),
      },
      {
        path: 'api/:topic',
        loadComponent: () =>
          import('./pages/doc-topic/doc-topic-page.component').then((m) => m.DocTopicPageComponent),
        data: { docKind: 'api' },
      },
      {
        path: 'sdk/dotnet',
        loadComponent: () => import('./pages/sdk-dotnet/sdk-dotnet.component').then((m) => m.SdkDotnetComponent),
      },
      {
        path: 'sdk/winforms',
        loadComponent: () => import('./pages/sdk-winforms/sdk-winforms.component').then((m) => m.SdkWinformsComponent),
      },
      {
        path: 'sdk/wpf',
        loadComponent: () => import('./pages/sdk-wpf/sdk-wpf.component').then((m) => m.SdkWpfComponent),
      },
      {
        path: 'sdk/:topic',
        loadComponent: () =>
          import('./pages/doc-topic/doc-topic-page.component').then((m) => m.DocTopicPageComponent),
        data: { docKind: 'sdk' },
      },
      { path: 'first-product', loadComponent: () => import('./pages/first-product/first-product.component').then((m) => m.FirstProductComponent) },
      { path: 'first-license', loadComponent: () => import('./pages/first-license/first-license.component').then((m) => m.FirstLicenseComponent) },
      { path: 'rsa-keys', loadComponent: () => import('./pages/rsa-keys/rsa-keys.component').then((m) => m.RsaKeysComponent) },
      { path: 'perpetual-license', loadComponent: () => import('./pages/perpetual-license/perpetual-license.component').then((m) => m.PerpetualLicenseComponent) },
      { path: 'trial-license', loadComponent: () => import('./pages/trial-license/trial-license.component').then((m) => m.TrialLicenseComponent) },
      { path: 'subscription-license', loadComponent: () => import('./pages/subscription-license/subscription-license.component').then((m) => m.SubscriptionLicenseComponent) },
      { path: 'floating-license', loadComponent: () => import('./pages/floating-license/floating-license.component').then((m) => m.FloatingLicenseComponent) },
      { path: 'node-locked-license', loadComponent: () => import('./pages/node-locked-license/node-locked-license.component').then((m) => m.NodeLockedLicenseComponent) },
      {
        path: 'sessions-activations',
        loadComponent: () =>
          import('./pages/sessions-activations/sessions-activations.component').then((m) => m.SessionsActivationsComponent),
      },
      { path: 'webhooks', loadComponent: () => import('./pages/webhooks/webhooks.component').then((m) => m.WebhooksComponent) },
      {
        path: 'api-reference',
        redirectTo: 'api/overview',
        pathMatch: 'full',
      },
      { path: 'sdk-dotnet', redirectTo: 'sdk/dotnet', pathMatch: 'full' },
      { path: 'sdk-winforms', redirectTo: 'sdk/winforms', pathMatch: 'full' },
      { path: 'sdk-wpf', redirectTo: 'sdk/wpf', pathMatch: 'full' },
      { path: 'changelog', loadComponent: () => import('./pages/changelog/changelog.component').then((m) => m.ChangelogComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
