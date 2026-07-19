<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Contact – Max Morhardt',
  description: 'Get in touch with Max Morhardt via GitHub, LinkedIn, or email.',
  canonical: 'https://maxstash.io/contact',
});

const channels = [
  {
    label: 'GitHub',
    href: 'https://github.com/maxmorhardt',
    icon: 'pi pi-github',
    handle: '@maxmorhardt',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/max-morhardt-60b9121b8/',
    icon: 'pi pi-linkedin',
    handle: 'Max Morhardt',
  },
  {
    label: 'Email',
    href: 'mailto:max@maxstash.io',
    icon: 'pi pi-envelope',
    handle: 'max@maxstash.io',
  },
];
</script>

<template>
  <section class="layout-section pt-12 max-[600px]:pt-8 max-[600px]:pb-8">
    <div class="layout-container">
      <!-- page heading -->
      <RevealSection as="h1" class="page-title reveal--left">Contact</RevealSection>

      <!-- lede -->
      <RevealSection :delay="1" as="p" class="reveal--left mb-12 max-w-[60ch] max-[600px]:mb-5">
        The best ways to reach me. I read every message and usually reply within a day or two.
      </RevealSection>

      <!-- contact channel cards -->
      <div class="flex flex-wrap justify-center gap-4">
        <RevealSection
          v-for="(c, i) in channels"
          :key="c.label"
          :delay="(i + 1) as 1 | 2 | 3"
          class="card reveal--scale min-w-0 max-w-[400px] flex-[1_1_280px] rounded-card border border-border bg-bg-soft hover:border-accent-border hover:shadow-card"
        >
          <a
            :href="c.href"
            target="_blank"
            rel="noreferrer"
            class="card__link flex min-w-0 items-center gap-4 p-6 text-text-h no-underline max-[600px]:p-4"
          >
            <span
              class="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-border bg-bg text-xl text-text-h"
              :class="c.icon"
            />
            <span
              class="flex min-w-0 flex-1 flex-col break-words text-[0.9rem] text-text [overflow-wrap:anywhere]"
            >
              <strong class="text-base text-text-h">{{ c.label }}</strong>
              <span>{{ c.handle }}</span>
            </span>
            <span
              class="pi pi-arrow-up-right card__arrow text-text opacity-50 transition-[opacity,transform,color] duration-200 ease-out"
            />
          </a>
        </RevealSection>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* the card swaps between a springy reveal transition and a snappy hover one,
   so the transition shorthand has to be redeclared per state */
.card {
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card.reveal {
  transition:
    opacity 0.8s var(--ease-spring),
    transform 0.8s var(--ease-spring),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover .card__arrow {
  opacity: 1;
  transform: translate(2px, -2px);
  color: var(--accent);
}
</style>
