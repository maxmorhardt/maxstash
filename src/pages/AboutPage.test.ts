import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutPage from './AboutPage.vue';

describe('AboutPage', () => {
  it('renders about content', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('Day job');
    expect(wrapper.text()).toContain('Homelab platform');
    expect(wrapper.text()).toContain('This site');
  });
});
