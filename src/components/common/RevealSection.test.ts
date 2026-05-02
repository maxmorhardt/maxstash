import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RevealSection from './RevealSection.vue';

describe('RevealSection', () => {
  it('renders default div with slot content', () => {
    const wrapper = mount(RevealSection, { slots: { default: 'Hello' } });
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.text()).toBe('Hello');
    expect(wrapper.classes()).toContain('reveal');
  });

  it('honors `as` prop and `delay`', () => {
    const wrapper = mount(RevealSection, {
      props: { as: 'section', delay: 2 },
      slots: { default: 'Hi' },
    });
    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.attributes('data-delay')).toBe('2');
  });

  it('omits data-delay when 0', () => {
    const wrapper = mount(RevealSection, { props: { delay: 0 } });
    expect(wrapper.attributes('data-delay')).toBeUndefined();
  });
});
