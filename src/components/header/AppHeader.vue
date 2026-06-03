<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { useTheme } from '../../composables/useTheme';

const theme = useTheme();

const items = [
  { label: 'Home', icon: 'pi pi-home', route: '/' },
  { label: 'Projects', icon: 'pi pi-briefcase', route: '/projects' },
  { label: 'About', icon: 'pi pi-user', route: '/about' },
  { label: 'Contact', icon: 'pi pi-envelope', route: '/contact' },
];
</script>

<template>
  <header class="app-header">
    <Menubar :model="items" class="app-header__bar">
      <!-- brand / logo -->
      <template #start>
        <RouterLink to="/" class="brand" aria-label="maxstash home">
          <img src="/logo.svg" alt="" class="brand__mark" width="28" height="28" />
          <span class="brand__text">maxstash</span>
        </RouterLink>
      </template>

      <!-- nav links -->
      <template #item="{ item, props }">
        <RouterLink v-if="item.route" :to="item.route" v-bind="props.action" class="nav-link">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </template>

      <!-- theme toggle -->
      <template #end>
        <Button
          :icon="theme.isDark ? 'pi pi-sun' : 'pi pi-moon'"
          :aria-label="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          severity="secondary"
          text
          rounded
          @click="theme.toggle()"
        />
      </template>
    </Menubar>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: var(--header-h);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  backdrop-filter: saturate(180%) blur(10px);
  background: var(--header-bg);
  border-bottom: 1px solid var(--border);
}

.app-header :deep(.p-menubar) {
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 0.5rem 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.app-header :deep(.p-menubar-item:not(:hover) > .p-menubar-item-content),
.app-header :deep(.p-menubar-item:not(:hover)[data-p-focused='true'] > .p-menubar-item-content),
.app-header :deep(.p-menubar-item.p-focus:not(:hover) > .p-menubar-item-content) {
  background: transparent;
}

/* drop the item's own padding so the link can fill the whole row and be fully clickable */
.app-header :deep(.p-menubar-item-content) {
  padding: 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  text-decoration: none;
  color: var(--text-h);
  margin-right: 1rem;
}

.brand__mark {
  display: block;
  border-radius: 6px;
}

.brand__text {
  color: var(--text-h);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: var(--text);
}

.nav-link.router-link-exact-active {
  color: var(--text-h);
}

.nav-link.router-link-exact-active :first-child {
  color: var(--accent);
}
</style>
