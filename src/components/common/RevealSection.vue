<script setup lang="ts">
import { useScrollReveal } from '../../composables/useScrollReveal';

interface Props {
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: keyof HTMLElementTagNameMap;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  as: 'div',
});

const { target, visible } = useScrollReveal<HTMLElement>();
</script>

<template>
  <component
    :is="props.as"
    :ref="(el: unknown) => (target = el as HTMLElement | null)"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :data-delay="props.delay || undefined"
  >
    <slot />
  </component>
</template>
