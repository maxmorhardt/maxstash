import { describe, it, expect, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import router from './index';

describe('router', () => {
  it('resolves each route to the expected name', () => {
    expect(router.resolve('/').name).toBe('home');
    expect(router.resolve('/projects').name).toBe('projects');
    expect(router.resolve('/about').name).toBe('about');
    expect(router.resolve('/contact').name).toBe('contact');
    expect(router.resolve('/does-not-exist').name).toBe('not-found');
  });

  it('scrolls to the top on navigation', () => {
    const from = router.resolve('/');
    const to = router.resolve('/about');
    expect(router.options.scrollBehavior?.(to, from, null)).toEqual({ top: 0 });
  });

  it('preloads route chunks after the first navigation', async () => {
    const idle = vi.fn((cb: () => void) => cb());
    (window as unknown as { requestIdleCallback: typeof idle }).requestIdleCallback = idle;
    try {
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
