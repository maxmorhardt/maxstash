<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './components/header/AppHeader.vue';
import AppFooter from './components/footer/AppFooter.vue';
</script>

<template>
  <div class="app">
    <!-- Site header / navigation -->
    <AppHeader />
    <!-- Routed page content -->
    <main class="app-main">
      <RouterView />
    </main>
    <!-- Site footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.app-main {
  flex: 1;
}
</style>
