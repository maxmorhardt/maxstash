<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';

const channels = [
  {
    label: 'GitHub',
    href: 'https://github.com/maxmorhardt',
    icon: 'pi pi-github',
    handle: '@maxmorhardt',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/max-morhardt-60b9121b8/',
    icon: 'pi pi-linkedin',
    handle: 'Max Morhardt',
  },
  {
    label: 'Email',
    href: 'mailto:maxmorhardt13@gmail.com',
    icon: 'pi pi-envelope',
    handle: 'maxmorhardt13@gmail.com',
  },
];
</script>

<template>
  <section class="contact section">
    <div class="container">
      <!-- Page heading -->
      <RevealSection as="h1">
        Contact
      </RevealSection>
      <!-- Lede -->
      <RevealSection
        :delay="1"
        as="p"
        class="lede"
      >
        The fastest ways to reach me. I usually respond within a day or two.
      </RevealSection>

      <!-- Contact channel cards -->
      <div class="grid">
        <RevealSection
          v-for="(c, i) in channels"
          :key="c.label"
          :delay="(i + 1) as 1 | 2 | 3"
          class="card"
        >
          <a
            :href="c.href"
            target="_blank"
            rel="noreferrer"
            class="card__link"
          >
            <span
              class="card__icon"
              :class="c.icon"
            />
            <span class="card__body">
              <strong>{{ c.label }}</strong>
              <span>{{ c.handle }}</span>
            </span>
            <span class="pi pi-arrow-up-right card__arrow" />
          </a>
        </RevealSection>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lede {
  max-width: 60ch;
  margin-bottom: 3rem;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.card {
  border-radius: 14px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}

.card__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  text-decoration: none;
  color: var(--text-h);
}

.card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--bg);
  color: var(--text-h);
  border: 1px solid var(--border);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 0.9rem;
  color: var(--text);
}

.card__body strong {
  color: var(--text-h);
  font-size: 1rem;
}

.card__arrow {
  color: var(--text);
  opacity: 0.5;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.card:hover .card__arrow {
  opacity: 1;
  transform: translate(2px, -2px);
  color: var(--accent);
}
</style>
