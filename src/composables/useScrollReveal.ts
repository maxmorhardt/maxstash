import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
): { target: Ref<T | null>; visible: Ref<boolean> } {
  // threshold/rootMargin tune when an element counts as "in view"; once stops observing after the first reveal
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options;

  // the element to watch and whether it has been revealed yet
  const target = ref<T | null>(null) as Ref<T | null>;
  const visible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    // nothing to observe if the ref was never attached to an element
    if (!target.value) {
      return;
    }

    // no IntersectionObserver (e.g. SSR or old browser): reveal immediately as a fallback
    if (typeof IntersectionObserver === 'undefined') {
      visible.value = true;
      return;
    }

    // reveal the element when it scrolls into view
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true;

            // in once mode, stop watching so it stays revealed
            if (once && observer && entry.target) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // when repeating, hide again as it leaves the viewport
            visible.value = false;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target.value);
  });

  // clean up the observer when the component unmounts
  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
  });

  return { target, visible };
}
