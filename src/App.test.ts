import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';
import { createTestRouter, stubGlobals } from './testUtils';

describe('App', () => {
  it('renders header, main, and footer', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mount(App, {
      global: { plugins: [router], stubs: stubGlobals.stubs },
    });
    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
  });
});
