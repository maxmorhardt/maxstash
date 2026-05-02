import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import NotFoundPage from './NotFoundPage.vue';
import { createTestRouter, stubGlobals } from '../testUtils';

describe('NotFoundPage', () => {
  it('renders 404 and navigates home on click', async () => {
    const router = createTestRouter();
    router.push('/missing');
    await router.isReady();
    const wrapper = mount(NotFoundPage, {
      global: { plugins: [router], stubs: stubGlobals.stubs },
    });
    expect(wrapper.text()).toContain('404');
    expect(wrapper.text()).toContain("doesn't exist");

    await wrapper.find('button').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/');
  });
});
