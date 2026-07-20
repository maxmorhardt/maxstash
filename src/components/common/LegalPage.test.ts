import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LegalPage from './LegalPage.vue';
import type { LegalSection } from './LegalPage.vue';

function mountLegal(sections: LegalSection[]) {
  return mount(LegalPage, {
    props: { title: 'Terms', lastUpdated: 'January 1, 2026', sections },
  });
}

describe('LegalPage', () => {
  it('renders the title and last updated date', () => {
    const wrapper = mountLegal([]);
    expect(wrapper.find('h1').text()).toBe('Terms');
    expect(wrapper.text()).toContain('Last updated: January 1, 2026');
  });

  it('renders a section whose content is a plain string', () => {
    const wrapper = mountLegal([{ title: 'Scope', content: 'These terms apply to everyone.' }]);

    expect(wrapper.find('h2').text()).toBe('Scope');
    expect(wrapper.text()).toContain('These terms apply to everyone.');
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('renders the first array entry as a lead paragraph and the rest as list items', () => {
    const wrapper = mountLegal([
      { title: 'You agree to', content: ['You agree to the following:', 'Be nice', 'Be honest'] },
    ]);

    expect(wrapper.find('h2 ~ p').text()).toContain('You agree to the following:');
    const items = wrapper.findAll('li').map((li) => li.text());
    expect(items).toEqual(['Be nice', 'Be honest']);
  });

  it('omits the list when the array holds only a lead paragraph', () => {
    const wrapper = mountLegal([{ title: 'Scope', content: ['Only a lead paragraph.'] }]);

    expect(wrapper.text()).toContain('Only a lead paragraph.');
    expect(wrapper.find('ul').exists()).toBe(false);
  });

  it('renders no paragraph or list for an empty content array', () => {
    const wrapper = mountLegal([{ title: 'Reserved', content: [] }]);

    expect(wrapper.find('h2').text()).toBe('Reserved');
    expect(wrapper.find('ul').exists()).toBe(false);
    expect(wrapper.findAll('h2 ~ p')).toHaveLength(0);
  });

  it('renders every section in order', () => {
    const wrapper = mountLegal([
      { title: 'First', content: 'one' },
      { title: 'Second', content: 'two' },
      { title: 'Third', content: ['three'] },
    ]);

    expect(wrapper.findAll('h2').map((h) => h.text())).toEqual(['First', 'Second', 'Third']);
  });
});
