import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactPage from './ContactPage.vue';

describe('ContactPage', () => {
  it('renders contact channels', () => {
    const wrapper = mount(ContactPage);
    expect(wrapper.text()).toContain('Contact');
    expect(wrapper.text()).toContain('GitHub');
    expect(wrapper.text()).toContain('LinkedIn');
    expect(wrapper.text()).toContain('Email');
    const links = wrapper.findAll('a');
    expect(links.length).toBe(3);
    expect(links[0].attributes('href')).toContain('github.com');
  });
});
