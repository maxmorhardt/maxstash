<script setup lang="ts">
const year = new Date().getFullYear();

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/maxmorhardt',
    icon: 'pi pi-github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/max-morhardt-60b9121b8/',
    icon: 'pi pi-linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:max@maxstash.io',
    icon: 'pi pi-envelope',
  },
];
</script>

<template>
  <footer class="w-full border-t border-border bg-footer-bg px-6 py-4 text-text">
    <div class="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
      <!-- copyright -->
      <span class="text-[0.8125rem] opacity-80">&copy; {{ year }} Max Morhardt</span>

      <!-- social links -->
      <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noreferrer"
            :aria-label="link.label"
            class="inline-flex items-center gap-1.5 rounded-full border border-border bg-social-bg px-3 py-1.5 text-[0.8125rem] text-text-h no-underline transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-px hover:border-accent-border hover:bg-accent-bg hover:text-accent"
          >
            <span :class="link.icon" />
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
