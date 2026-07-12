import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppFooter from './AppFooter.vue';
import { createTestRouter } from '../../testUtils';

async function mountFooter() {
  const router = createTestRouter();
  router.push('/');
  await router.isReady();
  return mount(AppFooter, { global: { plugins: [router] } });
}

describe('AppFooter', () => {
  it('renders the current year', async () => {
    const wrapper = await mountFooter();
    const year = new Date().getFullYear();
    expect(wrapper.text()).toContain(String(year));
    expect(wrapper.text()).toContain('Max Morhardt');
  });

  it('links to the platform and legal pages', async () => {
    const wrapper = await mountFooter();
    const hrefs = wrapper.findAll('.legal a').map((a) => a.attributes('href'));
    expect(hrefs).toContain('/apps');
    expect(hrefs).toContain('/terms-of-service');
    expect(hrefs).toContain('/privacy-policy');
  });
});
