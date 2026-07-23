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
  it('showcases Squares as the live app and frames it around game day', async () => {
    const wrapper = await mountApps();
    expect(wrapper.find('h1').text()).toBe('Squares');
    expect(wrapper.text()).toContain('Live app');
    expect(wrapper.text()).toContain('Super Bowl squares pool');
  });

  it('links out to the live app', async () => {
    const wrapper = await mountApps();
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'));
    expect(hrefs).toContain('https://squares.maxstash.io');
  });

  it('walks through how a game plays out', async () => {
    const wrapper = await mountApps();
    expect(wrapper.text()).toContain('How a game plays out');
    expect(wrapper.text()).toContain('Set up the board');
    expect(wrapper.text()).toContain('Winners light up');
  });

  it('explains sign-in and what data is used', async () => {
    const wrapper = await mountApps();
    expect(wrapper.text()).toContain('Signing in');
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
