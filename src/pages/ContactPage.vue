<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
import ContactCard, { type ContactChannel } from '../components/contact/ContactCard.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Contact – Max Morhardt',
  description: 'Get in touch with Max Morhardt via GitHub, LinkedIn, or email.',
  canonical: 'https://maxstash.io/contact',
});

const channels: ContactChannel[] = [
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
        <ContactCard
          v-for="(c, i) in channels"
          :key="c.label"
          :channel="c"
          :delay="(i + 1) as 1 | 2 | 3"
        />
      </div>
    </div>
  </section>
</template>
