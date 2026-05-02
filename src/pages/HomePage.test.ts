import { describe, it, expect } from 'vitest';
import { flushPromises, mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils';
import HomePage from './HomePage.vue';
import { createTestRouter, stubGlobals } from '../testUtils';
import type { Router } from 'vue-router';

function findButtonByLabel(wrapper: VueWrapper, label: string): DOMWrapper<HTMLButtonElement> {
  const button = wrapper.findAll('button').find((b) => b.text().trim() === label) as
    | DOMWrapper<HTMLButtonElement>
    | undefined;
  if (!button) throw new Error(`Button with label "${label}" not found`);
  return button;
}

async function clickAndExpectRoute(
  wrapper: VueWrapper,
  router: Router,
  label: string,
  path: string
) {
  await findButtonByLabel(wrapper, label).trigger('click');
  await flushPromises();
  expect(router.currentRoute.value.path).toBe(path);
}

describe('HomePage', () => {
  it('renders hero and section headings', async () => {
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
  });

  it.each([
    ['See Projects', '/projects'],
    ['About me', '/about'],
    ['Get in touch', '/contact'],
  ])('navigates to %s when "%s" CTA is clicked', async (label, path) => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mount(HomePage, {
      global: { plugins: [router], stubs: stubGlobals.stubs },
    });

    await clickAndExpectRoute(wrapper, router, label, path);
  });
});
