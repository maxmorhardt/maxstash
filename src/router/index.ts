import type { Router, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/apps',
    name: 'apps',
    component: () => import('../pages/AppsPage.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../pages/ProjectsPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/ContactPage.vue'),
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    component: () => import('../pages/TermsOfServicePage.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('../pages/PrivacyPolicyPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
];

export const scrollBehavior: RouterScrollBehavior = () => ({ top: 0 });

type AsyncComponentLoader = () => Promise<unknown>;

// preload all route chunks after the first navigation
export function preloadRouteChunks(router: Router): void {
  router.isReady().then(() => {
    const preload = () =>
      routes.forEach((r) => {
        if (typeof r.component === 'function') {
          (r.component as AsyncComponentLoader)().catch(() => undefined);
        }
      });

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preload);
    } else {
      setTimeout(preload, 100);
    }
  });
}
