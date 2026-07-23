<script setup lang="ts">
import RevealSection from '../common/RevealSection.vue';

export interface ProjectLink {
  label: string;
  href: string;
  icon?: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  href: string;
  links?: ProjectLink[];
  tags: string[];
}

defineProps<{
  project: Project;
  rootMargin?: string;
  animationDelay?: string;
}>();
</script>

<template>
  <RevealSection
    :root-margin="rootMargin"
    :style="{ animationDelay }"
    class="card flex min-w-0 flex-col rounded-card border border-border bg-bg-soft p-7 [overflow-wrap:anywhere] hover:border-accent-border hover:shadow-card"
  >
    <!-- header: name, category, repo link -->
    <div class="mb-2 flex items-start justify-between gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="m-0 font-mono">{{ project.name }}</h3>
        <span
          class="rounded-full border border-accent-border bg-accent-bg px-[0.55rem] py-[0.2rem] text-[0.7rem] tracking-[0.04em] text-accent uppercase"
        >
          {{ project.category }}
        </span>
      </div>

      <a
        :href="project.href"
        target="_blank"
        rel="noreferrer"
        aria-label="View on GitHub"
        class="text-xl text-text no-underline hover:text-accent"
      >
        <span class="pi pi-github" />
      </a>
    </div>

    <!-- description -->
    <p>{{ project.description }}</p>

    <!-- tags -->
    <ul class="mt-4 mb-4 flex list-none flex-wrap gap-[0.4rem] p-0">
      <li
        v-for="tag in project.tags"
        :key="tag"
        class="rounded-full border border-border bg-bg px-[0.6rem] py-1 text-xs text-text-h"
      >
        {{ tag }}
      </li>
    </ul>

    <!-- external links -->
    <div
      v-if="project.links"
      class="mt-auto flex flex-wrap gap-2 border-t border-dashed border-border pt-4"
    >
      <a
        v-for="link in project.links"
        :key="link.href"
        :href="link.href"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-bg px-[0.7rem] py-1.5 text-sm text-accent no-underline hover:-translate-y-px"
      >
        <span :class="link.icon || 'pi pi-external-link'" />
        <span>{{ link.label }}</span>
      </a>
    </div>
  </RevealSection>
</template>

<style scoped>
.card {
  opacity: 0;
  transform: none;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card.is-visible {
  animation: fade-rise 0.5s var(--ease-reveal) both;
}

@keyframes fade-rise {
  from {
    opacity: 0;
    translate: 0 12px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

.card.is-visible:hover {
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card.is-visible {
    animation: none;
    opacity: 1;
    translate: none;
    scale: none;
    transform: none;
  }

  .card.is-visible:hover {
    transform: none;
  }
}
</style>
