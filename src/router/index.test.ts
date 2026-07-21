import { describe, it, expect, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import {
  createRouter,
  createMemoryHistory,
  type RouteLocationNormalizedGeneric,
  type Router,
} from 'vue-router';
import { routes, scrollBehavior, preloadRouteChunks } from './index';

function makeRouter(): Router {
  return createRouter({ history: createMemoryHistory(), routes, scrollBehavior });
}

describe('router', () => {
  it('resolves each route to the expected name', () => {
    const router = makeRouter();

    expect(router.resolve('/').name).toBe('home');
    expect(router.resolve('/projects').name).toBe('projects');
    expect(router.resolve('/about').name).toBe('about');
    expect(router.resolve('/contact').name).toBe('contact');
    expect(router.resolve('/does-not-exist').name).toBe('not-found');
  });

  it('scrolls to the top on navigation', () => {
    const router = makeRouter();
    const from = router.resolve('/') as unknown as RouteLocationNormalizedGeneric;
    const to = router.resolve('/about') as unknown as RouteLocationNormalizedGeneric;

    expect(scrollBehavior.call(router, to, from, null)).toEqual({ top: 0 });
  });

  it('preloads route chunks after the first navigation', async () => {
    const router = makeRouter();
    const idle = vi.fn((cb: () => void) => cb());
    (window as unknown as { requestIdleCallback: typeof idle }).requestIdleCallback = idle;

    try {
      preloadRouteChunks(router);
      await router.push('/');
      await router.isReady();
      await flushPromises();
      expect(idle).toHaveBeenCalled();
    } finally {
      delete (window as unknown as { requestIdleCallback?: typeof idle }).requestIdleCallback;
    }

    expect(router.currentRoute.value.name).toBe('home');
  });
});
