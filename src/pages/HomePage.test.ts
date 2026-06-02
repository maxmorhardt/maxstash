import { describe, it, expect } from 'vitest';
import { flushPromises, mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils';
import HomePage from './HomePage.vue';
import { createTestRouter, stubGlobals } from '../testUtils';
import type { Router } from 'vue-router';

function mountHome(router: Router) {
  return mount(HomePage, { global: { plugins: [router], stubs: stubGlobals.stubs } });
}

function findButtonByLabel(wrapper: VueWrapper, label: string): DOMWrapper<HTMLButtonElement> {
  const button = wrapper.findAll('button').find((b) => b.text().trim() === label) as
    | DOMWrapper<HTMLButtonElement>
    | undefined;
  if (!button) {
    throw new Error(`Button with label "${label}" not found`);
  }

  return button;
}

describe('HomePage', () => {
  it('renders hero and section headings', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mountHome(router);

    expect(wrapper.text()).toContain('Max Morhardt');
    expect(wrapper.text()).toContain('Software Engineer');
    expect(wrapper.text()).toContain('What I do');
    expect(wrapper.text()).toContain('Tools of the trade');
    expect(wrapper.text()).toContain('Featured work');
  });

  it.each([
    ['projects', '/projects'],
    ['about', '/about'],
    ['contact', '/contact'],
  ])('navigates to %s via the terminal launchpad', async (label, path) => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mountHome(router);
    await flushPromises();

    const link = wrapper.findAll('.term__item').find((a) => a.text().includes(label));
    if (!link) {
      throw new Error(`launchpad link "${label}" not found`);
    }
    await link.trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe(path);
  });

  it('navigates to contact via the bottom CTA', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mountHome(router);

    await findButtonByLabel(wrapper, 'Get in touch').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/contact');
  });
});
