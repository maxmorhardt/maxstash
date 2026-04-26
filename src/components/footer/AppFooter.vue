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
    href: 'mailto:maxmorhardt13@gmail.com',
    icon: 'pi pi-envelope',
  },
];
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <!-- Copyright + license -->
      <span class="app-footer__copy">
        &copy; {{ year }} Max Morhardt &middot;
        <a
          href="https://github.com/maxmorhardt/maxstash/blob/main/LICENSE"
          target="_blank"
          rel="noreferrer"
        >Apache 2.0</a>
      </span>
      <!-- Social links -->
      <ul class="socials">
        <li
          v-for="link in links"
          :key="link.href"
        >
          <a
            :href="link.href"
            target="_blank"
            rel="noreferrer"
            :aria-label="link.label"
          >
            <span :class="link.icon" />
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;
  border-top: 1px solid var(--border);
  background: var(--footer-bg);
  color: var(--text);
  padding: 1rem 1.5rem;
}

.app-footer__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.socials {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.socials a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--text-h);
  background: var(--social-bg);
  border: 1px solid var(--border);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.socials a:hover {
  transform: translateY(-1px);
  border-color: var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
}

.app-footer__copy {
  font-size: 0.8125rem;
  opacity: 0.8;
}

.app-footer__copy a {
  color: inherit;
  text-decoration: none;
}

.app-footer__copy a:hover {
  color: var(--accent);
}
</style>
