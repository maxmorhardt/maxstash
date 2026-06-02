import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import HeroTerminal from './HeroTerminal.vue';

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

describe('HeroTerminal', () => {
  it('renders the full script statically under reduced motion', async () => {
    const wrapper = mount(HeroTerminal);
    await flushPromises();

    expect(wrapper.text()).toContain('whoami');
    expect(wrapper.text()).toContain('go · typescript · react · vue · kubernetes');
    expect(wrapper.text()).toContain('open_to_work');
    expect(wrapper.findAll('.term__line').length).toBeGreaterThanOrEqual(9);
    expect(wrapper.find('.term__cursor').exists()).toBe(true);
  });

  it('types the script out over time when motion is allowed', async () => {
    const original = window.matchMedia;
    window.matchMedia = mockMatchMedia(false);
    vi.useFakeTimers();

    const wrapper = mount(HeroTerminal);
    expect(wrapper.text()).not.toContain('shipped ✓');

    await vi.runAllTimersAsync();

    expect(wrapper.text()).toContain('whoami');
    expect(wrapper.text()).toContain('postgres-cluster');
    expect(wrapper.text()).toContain('open_to_work');

    wrapper.unmount();
    vi.useRealTimers();
    window.matchMedia = original;
  });
});
