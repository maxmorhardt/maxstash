import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactCard from './ContactCard.vue';
import type { ContactChannel } from './ContactCard.vue';

const channel: ContactChannel = {
  label: 'GitHub',
  href: 'https://github.com/maxmorhardt',
  icon: 'pi pi-github',
  handle: '@maxmorhardt',
};

describe('ContactCard', () => {
  it('renders the channel label and handle', () => {
    const wrapper = mount(ContactCard, { props: { channel } });
    expect(wrapper.text()).toContain('GitHub');
    expect(wrapper.text()).toContain('@maxmorhardt');
  });

  it('links out to the channel href', () => {
    const wrapper = mount(ContactCard, { props: { channel } });
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('https://github.com/maxmorhardt');
    expect(link.attributes('target')).toBe('_blank');
  });
});
