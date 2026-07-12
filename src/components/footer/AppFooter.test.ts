import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppFooter from './AppFooter.vue';

describe('AppFooter', () => {
  it('renders the current year', () => {
    const wrapper = mount(AppFooter);
    const year = new Date().getFullYear();
    expect(wrapper.text()).toContain(String(year));
    expect(wrapper.text()).toContain('Max Morhardt');
  });
});
