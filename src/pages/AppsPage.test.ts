import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppsPage from './AppsPage.vue';
import { createTestRouter } from '../testUtils';

async function mountApps() {
  const router = createTestRouter();
  router.push('/apps');
  await router.isReady();
  return mount(AppsPage, { global: { plugins: [router] } });
}

describe('AppsPage', () => {
  it('names the platform and describes its purpose', async () => {
    const wrapper = await mountApps();
    expect(wrapper.find('h1').text()).toBe('maxstash');
    expect(wrapper.text()).toContain('personal platform');
    expect(wrapper.text()).toContain('single, secure sign-in');
  });

  it('lists the hosted apps with external links', async () => {
    const wrapper = await mountApps();
    expect(wrapper.text()).toContain('Squares');
    expect(wrapper.text()).toContain('Olympics');
    const hrefs = wrapper.findAll('.card__link').map((a) => a.attributes('href'));
    expect(hrefs).toContain('https://squares.maxstash.io');
    expect(hrefs).toContain('https://olympics.maxstash.io');
  });

  it('explains what sign-in data is used', async () => {
    const wrapper = await mountApps();
    expect(wrapper.text()).toContain('Google or GitHub');
    expect(wrapper.text()).toContain('basic profile and email');
  });

  it('links to the terms of service and privacy policy', async () => {
    const wrapper = await mountApps();
    const hrefs = wrapper.findAll('.legal-links__item').map((a) => a.attributes('href'));
    expect(hrefs).toContain('/terms-of-service');
    expect(hrefs).toContain('/privacy-policy');
  });
});
