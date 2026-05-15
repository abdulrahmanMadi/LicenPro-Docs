import { RenderMode, ServerRoute } from '@angular/ssr';
import { API_TOPICS } from './docs/content/api-topics.content';
import { PLATFORM_GUIDES } from './docs/content/platform-guides.content';
import { SDK_TOPICS } from './docs/content/sdk-topics.content';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'guides/platform/:topic',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Object.keys(PLATFORM_GUIDES).map((topic) => ({ topic }));
    },
  },
  {
    path: 'api/:topic',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Object.keys(API_TOPICS).map((topic) => ({ topic }));
    },
  },
  {
    path: 'sdk/:topic',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Object.keys(SDK_TOPICS).map((topic) => ({ topic }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
