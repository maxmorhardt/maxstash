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

  it('handles the built-in commands', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const { wrapper } = mountTerminal();
    await flushPromises();
    const field = wrapper.find('.term__input');

    const run = async (cmd: string) => {
      await field.setValue(cmd);
      await field.trigger('keydown', { key: 'Enter' });
      await flushPromises();
    };

    await run('name');
    expect(wrapper.text()).toContain('Max Morhardt');

    await run('whoami');
    expect(wrapper.text()).toContain('Fidelity');

    await run('stack');
    expect(wrapper.text()).toContain('spring boot');

    await run('email');
    expect(wrapper.text()).toContain('max@maxstash.io');

    await run('social');
    expect(wrapper.findAll('.term__out-link').length).toBeGreaterThan(0);

    await run('github');
    expect(openSpy).toHaveBeenCalledWith('https://github.com/maxmorhardt', '_blank', 'noopener');

    await run('ls');
    expect(wrapper.findAll('.term__menu').length).toBeGreaterThanOrEqual(2);

    await run('clear');
    expect(wrapper.text()).not.toContain('whoami');

    openSpy.mockRestore();
  });

  it('wraps the launchpad cursor and ignores keys when there is no menu', async () => {
    const { wrapper } = mountTerminal();
    await flushPromises();
    const field = wrapper.find('.term__input');

    // ArrowUp from the first item wraps to the last (linkedin)
    await field.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.find('.term__item.is-active').text()).toContain('linkedin');

    // Right advances, Left goes back
    await field.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.find('.term__item.is-active').text()).toContain('projects');
    await field.trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.find('.term__item.is-active').text()).toContain('linkedin');

    // clearing removes the menu, so an empty Enter does nothing
    await field.setValue('clear');
    await field.trigger('keydown', { key: 'Enter' });
    await flushPromises();
    await field.setValue('');
    await field.trigger('keydown', { key: 'ArrowDown' });
    await field.trigger('keydown', { key: 'Enter' });
    await flushPromises();
    expect(wrapper.find('.term__menu').exists()).toBe(false);
  });

  it('uses the mobile stack and help tip on small screens', async () => {
    const original = window.matchMedia;
    window.matchMedia = mockMatchMedia(true); // mobile width + reduced motion
    try {
      const { wrapper } = mountTerminal();
      await flushPromises();
      expect(wrapper.text()).toContain('java · ts · go · py · sql');

      const field = wrapper.find('.term__input');
      await field.setValue('help');
      await field.trigger('keydown', { key: 'Enter' });
      await flushPromises();
      expect(wrapper.text()).toContain('tap a directory');
    } finally {
      window.matchMedia = original;
    }
  });

  it('navigates the site from a typed command', async () => {
    const { wrapper, router } = mountTerminal();
    router.push('/');
    await router.isReady();
    await flushPromises();

    const field = wrapper.find('.term__input');
    await field.setValue('contact');
    await field.trigger('keydown', { key: 'Enter' });
    await flushPromises();

    expect(router.currentRoute.value.path).toBe('/contact');
  });
});
