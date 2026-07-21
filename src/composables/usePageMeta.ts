import { useHead } from '@unhead/vue';

export function usePageMeta(options: {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
}): void {
  const canonical = options.canonical;

  useHead({
    title: options.title,
    // a page that shouldn't be indexed (the 404) also shouldn't claim a canonical url
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    meta: [
      { name: 'robots', content: options.robots ?? 'index, follow' },
      { name: 'description', content: options.description },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
    ],
  });
}
