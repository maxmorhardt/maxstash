<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/header/AppHeader.vue';
import AppFooter from './components/footer/AppFooter.vue';
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <!-- site header / navigation -->
    <AppHeader />

    <!-- routed page content -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- site footer -->
    <AppFooter />
  </div>
</template>
