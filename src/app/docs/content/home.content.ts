export interface HomeCard {
  route: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

export function getHomeCards(): HomeCard[] {
  return [
    {
      route: '/quick-start',
      icon: 'ki-rocket',
      titleKey: 'docs.home.card.quickStart.title',
      descKey: 'docs.home.card.quickStart.desc',
    },
    {
      route: '/first-product',
      icon: 'ki-abstract-26',
      titleKey: 'docs.home.card.firstProduct.title',
      descKey: 'docs.home.card.firstProduct.desc',
    },
    {
      route: '/perpetual-license',
      icon: 'ki-key',
      titleKey: 'docs.home.card.models.title',
      descKey: 'docs.home.card.models.desc',
    },
    {
      route: '/sdk/dotnet',
      icon: 'ki-microsoft',
      titleKey: 'docs.home.card.dotnet.title',
      descKey: 'docs.home.card.dotnet.desc',
    },
    {
      route: '/api/overview',
      icon: 'ki-data',
      titleKey: 'docs.home.card.rest.title',
      descKey: 'docs.home.card.rest.desc',
    },
    {
      route: '/guides/platform/overview',
      icon: 'ki-element-11',
      titleKey: 'docs.home.card.overview.title',
      descKey: 'docs.home.card.overview.desc',
    },
    {
      route: '/changelog',
      icon: 'ki-notepad-edit',
      titleKey: 'docs.home.card.changelog.title',
      descKey: 'docs.home.card.changelog.desc',
    },
    {
      route: '/quick-start',
      icon: 'ki-route',
      titleKey: 'docs.home.card.workflow.title',
      descKey: 'docs.home.card.workflow.desc',
    },
    {
      route: '/sessions-activations',
      icon: 'ki-chart-line',
      titleKey: 'docs.home.card.sessions.title',
      descKey: 'docs.home.card.sessions.desc',
    },
  ];
}
