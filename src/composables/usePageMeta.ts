import { onMounted } from 'vue';

export function usePageMeta(options: {
  title: string;
  description: string;
  canonical: string;
}): void {
  onMounted(() => {
    document.title = options.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', options.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', options.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', options.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', options.canonical);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = options.canonical;
  });
}
