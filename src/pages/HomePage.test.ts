import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import HomePage from './HomePage.vue';
import { createTestRouter, stubGlobals } from '../testUtils';

describe('HomePage', () => {
  it('renders hero, sections, and navigates via CTA buttons', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mount(HomePage, {
      global: { plugins: [router], stubs: stubGlobals.stubs },
    });

    expect(wrapper.text()).toContain("Hi, I'm");
    expect(wrapper.text()).toContain('What I do');
    expect(wrapper.text()).toContain('Tools of the trade');
    expect(wrapper.text()).toContain('Featured work');

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);

    await buttons[0].trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/projects');

    await buttons[1].trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/about');

    await buttons[buttons.length - 1].trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/contact');
  });
});
