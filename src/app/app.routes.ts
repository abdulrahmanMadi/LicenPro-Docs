import { Routes } from '@angular/router';
import { DocsLayoutComponent } from './components/docs-layout/docs-layout.component';

const staticPage = (pageId: string) => ({
  loadComponent: () =>
    import('./pages/localized-static-doc-page/localized-static-doc-page.component').then(
      (m) => m.LocalizedStaticDocPageComponent
    ),
  data: { pageId },
});

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
      { path: 'sdk/dotnet', ...staticPage('sdk-dotnet') },
      { path: 'sdk/winforms', ...staticPage('sdk-winforms') },
      { path: 'sdk/wpf', ...staticPage('sdk-wpf') },
      {
        path: 'sdk/:topic',
        loadComponent: () =>
          import('./pages/doc-topic/doc-topic-page.component').then((m) => m.DocTopicPageComponent),
        data: { docKind: 'sdk' },
      },
      { path: 'first-organization', ...staticPage('first-organization') },
      { path: 'first-product', ...staticPage('first-product') },
      { path: 'first-license', ...staticPage('first-license') },
      { path: 'rsa-keys', ...staticPage('rsa-keys') },
      { path: 'perpetual-license', ...staticPage('perpetual-license') },
      { path: 'trial-license', ...staticPage('trial-license') },
      { path: 'subscription-license', ...staticPage('subscription-license') },
      { path: 'floating-license', ...staticPage('floating-license') },
      { path: 'concurrent-license', ...staticPage('concurrent-license') },
      { path: 'node-locked-license', ...staticPage('node-locked-license') },
      { path: 'credit-based-license', ...staticPage('credit-based-license') },
      { path: 'usage-based-license', ...staticPage('usage-based-license') },
      { path: 'metered-license', redirectTo: 'credit-based-license', pathMatch: 'full' },
      { path: 'sessions-activations', ...staticPage('sessions-activations') },
      { path: 'webhooks', ...staticPage('webhooks') },
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
