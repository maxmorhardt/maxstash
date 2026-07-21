<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Page not found – Max Morhardt',
  description: 'The page you were looking for does not exist.',
  robots: 'noindex, follow',
});

const router = useRouter();
</script>

<template>
  <section class="layout-section flex min-h-[60svh] items-center text-center">
    <div class="layout-container">
      <!-- 404 code -->
      <h1
        class="m-0 bg-linear-120/srgb from-accent to-accent-2 bg-clip-text text-[clamp(5rem,14vw,10rem)] text-transparent"
      >
        404
      </h1>
      <!-- message -->
      <p class="mb-6 text-[1.1rem]">This page doesn't exist (yet).</p>
      <!-- actions -->
      <div class="flex flex-wrap items-center justify-center gap-4">
        <Button label="Go home" icon="pi pi-home" @click="router.push('/')" />
        <RouterLink to="/projects" class="text-accent no-underline hover:underline">
          or browse projects &rarr;
        </RouterLink>
      </div>
    </div>
  </section>
</template>
