<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { useTheme } from '../../composables/useTheme';

const theme = useTheme();

const items = [
  { label: 'Home', icon: 'pi pi-home', route: '/' },
  { label: 'Projects', icon: 'pi pi-briefcase', route: '/projects' },
  { label: 'Apps', icon: 'pi pi-th-large', route: '/apps' },
  { label: 'About', icon: 'pi pi-user', route: '/about' },
  { label: 'Contact', icon: 'pi pi-envelope', route: '/contact' },
];
</script>

<template>
  <header
    class="app-header sticky top-0 z-50 box-border flex h-[var(--header-h)] w-full items-center border-b border-border bg-header-bg backdrop-blur-[10px] backdrop-saturate-[180%]"
  >
    <Menubar :model="items">
      <!-- brand / logo -->
      <template #start>
        <RouterLink
          to="/"
          class="mr-4 inline-flex items-center gap-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-text-h no-underline"
          aria-label="maxstash home"
        >
          <img src="/logo.svg" alt="" class="block rounded-md" width="28" height="28" />
          <span class="text-text-h">maxstash</span>
        </RouterLink>
      </template>

      <!-- nav links -->
      <template #item="{ item, props }">
        <RouterLink
          v-if="item.route"
          :to="item.route"
          v-bind="props.action"
          class="nav-link flex w-full items-center gap-2 px-3 py-2 text-text no-underline"
        >
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

.nav-link.router-link-exact-active {
  color: var(--text-h);
}

.nav-link.router-link-exact-active :first-child {
  color: var(--accent);
}
</style>
