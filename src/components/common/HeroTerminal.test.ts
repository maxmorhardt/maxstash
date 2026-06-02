import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import type { Router } from 'vue-router';
import HeroTerminal from './HeroTerminal.vue';
import { createTestRouter } from '../../testUtils';

function mockMatchMedia(matches: boolean) {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

function mountTerminal(router: Router = createTestRouter()) {
  const wrapper = mount(HeroTerminal, { global: { plugins: [router] } });
  return { wrapper, router };
}

describe('HeroTerminal', () => {
  it('renders the boot script, launchpad menu, and live prompt under reduced motion', async () => {
    const { wrapper } = mountTerminal();
    await flushPromises();

    expect(wrapper.text()).toContain('whoami');
    expect(wrapper.text()).toContain('java · typescript · go · python · sql');
    expect(wrapper.findAll('.term__item')).toHaveLength(5);
    expect(wrapper.find('.term__input').exists()).toBe(true);
  });

  it('runs a typed command and prints its output', async () => {
    const { wrapper } = mountTerminal();
    await flushPromises();

    const field = wrapper.find('.term__input');
    await field.setValue('help');
    await field.trigger('keydown', { key: 'Enter' });
    await flushPromises();

    expect(wrapper.text()).toContain('available commands');
  });

  it('reports unknown commands', async () => {
    const { wrapper } = mountTerminal();
    await flushPromises();

    const field = wrapper.find('.term__input');
    await field.setValue('sudo rm -rf /');
    await field.trigger('keydown', { key: 'Enter' });
    await flushPromises();

    expect(wrapper.text()).toContain('command not found');
  });

  it('moves the launchpad cursor with arrow keys and opens it on enter', async () => {
    const { wrapper, router } = mountTerminal();
    router.push('/');
    await router.isReady();
    await flushPromises();

    // first item is highlighted by default
    expect(wrapper.find('.term__item.is-active').text()).toContain('projects');

    const field = wrapper.find('.term__input');
    await field.trigger('keydown', { key: 'ArrowDown' }); // move to about
    expect(wrapper.find('.term__item.is-active').text()).toContain('about');

    await field.trigger('keydown', { key: 'Enter' });
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/about');
  });

  it('reveals the launchpad only after the boot script types out when motion is allowed', async () => {
    const original = window.matchMedia;
    window.matchMedia = mockMatchMedia(false);
    vi.useFakeTimers();

    let wrapper: VueWrapper | undefined;
    try {
      wrapper = mountTerminal().wrapper;
      expect(wrapper.find('.term__menu').exists()).toBe(false);

      await vi.runAllTimersAsync();

      expect(wrapper.text()).toContain('squares-api');
      expect(wrapper.find('.term__menu').exists()).toBe(true);
      expect(wrapper.find('.term__input').exists()).toBe(true);
    } finally {
      wrapper?.unmount();
      vi.useRealTimers();
      window.matchMedia = original;
    }
  });
});
