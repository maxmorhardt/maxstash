<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Page not found – Max Morhardt',
  description: 'The page you were looking for does not exist.',
  robots: 'noindex, follow',
});

const links = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Apps', to: '/apps' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];
</script>

<template>
  <section class="layout-section flex min-h-[60svh] items-center">
    <div class="layout-container max-w-[620px]">
      <!-- status label -->
      <RevealSection
        as="p"
        class="reveal--left m-0 mb-3 font-mono text-[0.8rem] font-semibold tracking-[0.14em] text-accent uppercase"
      >
        404 · Not found
      </RevealSection>

      <!-- heading -->
      <RevealSection :delay="1" as="h1" class="page-title reveal--left mb-3">
        This page doesn't exist
      </RevealSection>

      <!-- message -->
      <RevealSection :delay="1" as="p" class="reveal--left mb-8 max-w-[48ch] text-text">
        The link may be broken or the page may have moved. Try one of these instead.
      </RevealSection>

      <!-- quiet nav links -->
      <RevealSection :delay="1" class="reveal--left flex flex-wrap items-center gap-x-6 gap-y-3">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-text-h no-underline transition-colors hover:text-accent"
        >
          {{ link.label }}
          <span
            class="text-accent opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            >&rarr;</span
          >
        </RouterLink>
      </RevealSection>
    </div>
  </section>
</template>
