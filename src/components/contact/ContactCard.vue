<script setup lang="ts">
import RevealSection from '../common/RevealSection.vue';

export interface ContactChannel {
  label: string;
  href: string;
  icon: string;
  handle: string;
}

defineProps<{
  channel: ContactChannel;
  delay?: 0 | 1 | 2 | 3 | 4;
}>();
</script>

<template>
  <RevealSection
    :delay="delay"
    class="card reveal--scale min-w-0 max-w-[400px] flex-[1_1_280px] rounded-card border border-border bg-bg-soft hover:border-accent-border hover:shadow-card"
  >
    <a
      :href="channel.href"
      target="_blank"
      rel="noreferrer"
      class="card__link flex min-w-0 items-center gap-4 p-6 text-text-h no-underline max-[600px]:p-4"
    >
      <!-- channel icon -->
      <span
        class="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-border bg-bg text-text-h"
      >
        <span class="text-xl" :class="channel.icon" />
      </span>

      <!-- label + handle -->
      <span
        class="flex min-w-0 flex-1 flex-col break-words text-[0.9rem] text-text [overflow-wrap:anywhere]"
      >
        <strong class="text-base text-text-h">{{ channel.label }}</strong>
        <span>{{ channel.handle }}</span>
      </span>

      <!-- hover arrow -->
      <span
        class="pi pi-arrow-up-right card__arrow text-text opacity-50 transition-[opacity,transform,color] duration-200 ease-out"
      />
    </a>
  </RevealSection>
</template>

<style scoped>
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
