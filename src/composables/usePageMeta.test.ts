import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { usePageMeta } from './usePageMeta';

async function mountPage(options: Parameters<typeof usePageMeta>[0]) {
  const wrapper = mount(
    defineComponent({
      setup() {
        usePageMeta(options);
      },
      template: '<div></div>',
    })
  );

  // unhead debounces its dom render behind setTimeout(0), so wait a macrotask for it
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 0));

  return wrapper;
}

function content(selector: string) {
  return document.querySelector(selector)?.getAttribute('content');
}

describe('usePageMeta', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('sets document title', async () => {
    const wrapper = await mountPage({
      title: 'Test Title',
      description: 'Desc',
      canonical: 'https://maxstash.io/',
    });

    expect(document.title).toBe('Test Title');
    wrapper.unmount();
  });

  it('renders the description into the standard and social meta tags', async () => {
    const wrapper = await mountPage({
      title: 'OG Title',
      description: 'My description',
      canonical: 'https://maxstash.io/',
    });

    expect(content('meta[name="description"]')).toBe('My description');
    expect(content('meta[property="og:description"]')).toBe('My description');
    expect(content('meta[name="twitter:description"]')).toBe('My description');
    expect(content('meta[property="og:title"]')).toBe('OG Title');
    expect(content('meta[name="twitter:title"]')).toBe('OG Title');
    wrapper.unmount();
  });

  it('points the canonical link and og:url at the page url', async () => {
    const wrapper = await mountPage({
      title: 'T',
      description: 'D',
      canonical: 'https://maxstash.io/about',
    });

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://maxstash.io/about'
    );
    expect(content('meta[property="og:url"]')).toBe('https://maxstash.io/about');
    wrapper.unmount();
  });

  it('defaults robots to indexable', async () => {
    const wrapper = await mountPage({
      title: 'T',
      description: 'D',
      canonical: 'https://maxstash.io/',
    });

    expect(content('meta[name="robots"]')).toBe('index, follow');
    wrapper.unmount();
  });

  it('omits the canonical and og:url when no url is given', async () => {
    const wrapper = await mountPage({
      title: 'Page not found',
      description: 'D',
      robots: 'noindex, follow',
    });

    expect(content('meta[name="robots"]')).toBe('noindex, follow');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:url"]')).toBeNull();
    wrapper.unmount();
  });

  it('emits exactly one canonical link and title', async () => {
    const wrapper = await mountPage({
      title: 'T',
      description: 'D',
      canonical: 'https://maxstash.io/projects',
    });

    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.querySelectorAll('title')).toHaveLength(1);
    wrapper.unmount();
  });
});
