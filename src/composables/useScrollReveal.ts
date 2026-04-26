import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
): { target: Ref<T | null>; visible: Ref<boolean> } {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = options;

  const target = ref<T | null>(null) as Ref<T | null>;
  const visible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!target.value) return;

    if (typeof IntersectionObserver === 'undefined') {
      visible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true;
            if (once && observer && entry.target) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            visible.value = false;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
  });

  return { target, visible };
}
