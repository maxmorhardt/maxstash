import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
  // legal pages for all maxstash services, reachable by direct link only
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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// preload all route chunks after the first navigation
type AsyncComponentLoader = () => Promise<unknown>;

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

export default router;
