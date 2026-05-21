import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { usePageMeta } from './usePageMeta';

function mountPage(options: Parameters<typeof usePageMeta>[0]) {
  return mount(
    defineComponent({
      setup() {
        usePageMeta(options);
      },
      template: '<div></div>',
    })
  );
}

describe('usePageMeta', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = `
      <meta name="description" content="" />
      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:url" content="" />
    `;
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('sets document title', () => {
    const wrapper = mountPage({
      title: 'Test Title',
      description: 'Desc',
      canonical: 'https://maxstash.io/',
    });
    expect(document.title).toBe('Test Title');
    wrapper.unmount();
  });

  it('updates meta description', () => {
    const wrapper = mountPage({
      title: 'T',
      description: 'My description',
      canonical: 'https://maxstash.io/',
    });
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'My description'
    );
    wrapper.unmount();
  });

  it('updates og:title and og:description', () => {
    const wrapper = mountPage({
      title: 'OG Title',
      description: 'OG Desc',
      canonical: 'https://maxstash.io/',
    });
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      'OG Title'
    );
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
      'OG Desc'
    );
    wrapper.unmount();
  });

  it('updates og:url', () => {
    const wrapper = mountPage({
      title: 'T',
      description: 'D',
      canonical: 'https://maxstash.io/about',
    });
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
      'https://maxstash.io/about'
    );
    wrapper.unmount();
  });

  it('creates canonical link when absent', () => {
    const wrapper = mountPage({
      title: 'T',
      description: 'D',
      canonical: 'https://maxstash.io/projects',
    });
    expect((document.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href).toBe(
      'https://maxstash.io/projects'
    );
    wrapper.unmount();
  });

  it('updates existing canonical link', () => {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = 'https://maxstash.io/';
    document.head.appendChild(link);

    const wrapper = mountPage({
      title: 'T',
      description: 'D',
      canonical: 'https://maxstash.io/about',
    });
    expect((document.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href).toBe(
      'https://maxstash.io/about'
    );
    wrapper.unmount();
  });

  it('handles missing meta elements gracefully', () => {
    document.head.innerHTML = '';
    const wrapper = mountPage({ title: 'T', description: 'D', canonical: 'https://maxstash.io/' });
    expect(document.title).toBe('T');
    wrapper.unmount();
  });
});
