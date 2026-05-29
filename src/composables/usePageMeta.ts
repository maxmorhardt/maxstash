import { onMounted } from 'vue';

export function usePageMeta(options: {
  title: string;
  description: string;
  canonical: string;
}): void {
  onMounted(() => {
    // set the document title shown in the browser tab and search results
    document.title = options.title;

    // update the standard meta description
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', options.description);

    // mirror the title and description into the open graph tags for link previews
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', options.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', options.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', options.canonical);

    // find the canonical link, creating it if this page hasn't set one yet
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    // point the canonical url at this page
    canonical.href = options.canonical;
  });
}
