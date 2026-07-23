import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TermsOfServicePage from './TermsOfServicePage.vue';

describe('TermsOfServicePage', () => {
  it('renders the terms of service', () => {
    const wrapper = mount(TermsOfServicePage);
    expect(wrapper.text()).toContain('Terms of Service');
    expect(wrapper.text()).toContain('Last updated');
    expect(wrapper.text()).toContain('Acceptance of Terms');
    expect(wrapper.text()).toContain('squares.maxstash.io');
    expect(wrapper.text()).toContain('support@maxstash.io');
  });
});
