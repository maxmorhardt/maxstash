import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrivacyPolicyPage from './PrivacyPolicyPage.vue';

describe('PrivacyPolicyPage', () => {
  it('renders the privacy policy', () => {
    const wrapper = mount(PrivacyPolicyPage);
    expect(wrapper.text()).toContain('Privacy Policy');
    expect(wrapper.text()).toContain('Last updated');
    expect(wrapper.text()).toContain('Information We Collect');
    expect(wrapper.text()).toContain('Your Privacy Rights');
    expect(wrapper.text()).toContain('support@maxstash.io');
  });
});
