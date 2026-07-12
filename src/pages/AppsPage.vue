<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'maxstash – A platform for real-time web apps',
  description:
    'maxstash is a personal platform that hosts a small collection of real-time web apps, including Squares and Olympics, behind a single secure Google or GitHub sign-in.',
  canonical: 'https://maxstash.io/apps',
});

interface App {
  name: string;
  tagline: string;
  description: string;
  href: string;
}

const apps: App[] = [
  {
    name: 'Squares',
    tagline: 'Real-time football squares pools',
    description:
      'Create or join a squares pool for a football game, claim your squares on a live grid, and watch numbers, quarter results, and winners update instantly for everyone in the pool.',
    href: 'https://squares.maxstash.io',
  },
  {
    name: 'Olympics',
    tagline: 'Backyard tournament brackets',
    description:
      'Run a backyard olympics: add participants, generate random teams and group stages, record match results, and follow live standings all the way through the playoff bracket.',
    href: 'https://olympics.maxstash.io',
  },
];
</script>

<template>
  <section class="apps section">
    <div class="container">
      <!-- purpose: what maxstash is -->
      <RevealSection as="h1" class="page-title">maxstash</RevealSection>
      <RevealSection :delay="1" as="p" class="lede">
        maxstash is a personal platform that hosts a small collection of real-time web apps behind a
        single, secure sign-in. Create an account once and use it across every app on the platform.
      </RevealSection>

      <!-- apps -->
      <RevealSection as="h2" class="section-heading">Apps on the platform</RevealSection>
      <div class="grid">
        <RevealSection
          v-for="(app, i) in apps"
          :key="app.name"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="card"
        >
          <div class="card__head">
            <h3>{{ app.name }}</h3>
            <span class="badge">{{ app.tagline }}</span>
          </div>
          <p>{{ app.description }}</p>
          <a :href="app.href" target="_blank" rel="noreferrer" class="card__link">
            <span class="pi pi-external-link" />
            <span>Open {{ app.name }}</span>
          </a>
        </RevealSection>
      </div>

      <!-- sign-in: what data is used, for OAuth transparency -->
      <RevealSection as="h2" class="section-heading">Signing in</RevealSection>
      <RevealSection :delay="1" as="div" class="prose">
        <p>
          maxstash lets you sign in with Google or GitHub. Signing in is used only to create your
          account and identify you across the apps on the platform. maxstash requests your basic
          profile and email address and does not access anything else in your Google or GitHub
          account.
        </p>
        <p>
          You can delete your account at any time from within any app, which removes your personal
          data from the platform.
        </p>
      </RevealSection>

      <!-- legal -->
      <RevealSection as="h2" class="section-heading">Terms &amp; policies</RevealSection>
      <RevealSection :delay="1" as="div" class="legal-links">
        <RouterLink to="/terms-of-service" class="legal-links__item">
          <span class="pi pi-file" />
          <span>Terms of Service</span>
        </RouterLink>
        <RouterLink to="/privacy-policy" class="legal-links__item">
          <span class="pi pi-shield" />
          <span>Privacy Policy</span>
        </RouterLink>
      </RevealSection>
    </div>
  </section>
</template>

<style scoped>
.apps {
  padding-top: 3rem;
}

.lede {
  max-width: 60ch;
  margin-bottom: 3rem;
}

.section-heading {
  margin: 2.5rem 0 1.25rem;
  font-size: 1.35rem;
}

.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  min-width: 0;
  overflow-wrap: anywhere;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
}

.card__head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card__head h3 {
  margin: 0;
  font-family: var(--mono);
}

.badge {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.875rem;
  color: var(--accent);
  text-decoration: none;
}

.card__link:hover {
  text-decoration: underline;
}

.prose {
  max-width: 68ch;
}

.prose p {
  color: var(--text);
  line-height: 1.7;
  margin: 0 0 1rem;
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.legal-links__item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text-h);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.legal-links__item:hover {
  transform: translateY(-1px);
  border-color: var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
}
</style>
