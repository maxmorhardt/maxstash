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
  icon: string;
  tagline: string;
  description: string;
  href: string;
  tags: string[];
}

const apps: App[] = [
  {
    name: 'Squares',
    icon: 'pi pi-th-large',
    tagline: 'Real-time football squares',
    description:
      'Create or join a squares pool for a football game, claim your squares on a live grid, and watch numbers, quarter results, and winners update instantly for everyone in the pool.',
    href: 'https://squares.maxstash.io',
    tags: ['React', 'TypeScript', 'WebSocket', 'OIDC'],
  },
  {
    name: 'Olympics',
    icon: 'pi pi-sitemap',
    tagline: 'Backyard tournament brackets',
    description:
      'Run a backyard olympics: add participants, generate random teams and group stages, record match results, and follow live standings all the way through the playoff bracket.',
    href: 'https://olympics.maxstash.io',
    tags: ['React', 'TypeScript', 'WebSocket', 'OIDC'],
  },
];

const platform = [
  {
    icon: 'pi pi-shield',
    title: 'One secure sign-in',
    body: 'Sign in once with Google or GitHub and the same account works across every app, federated through a self-hosted Dex identity provider.',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Real-time by default',
    body: 'Live grids, scores, and standings update instantly for everyone, powered by WebSockets fanned out across instances over NATS.',
  },
  {
    icon: 'pi pi-server',
    title: 'Self-hosted platform',
    body: 'Every app runs on a self-managed Kubernetes cluster behind a single Envoy gateway, with highly available Postgres and full observability.',
  },
  {
    icon: 'pi pi-sync',
    title: 'Shipped continuously',
    body: 'Each app is built, tested, and deployed through shared CI/CD pipelines and reusable Helm charts, so every service stays consistent.',
  },
];
</script>

<template>
  <section class="apps">
    <!-- hero: what maxstash is -->
    <div class="hero full-bleed">
      <div class="hero__bg" aria-hidden="true">
        <div class="glow glow--1" />
        <div class="glow glow--2" />
      </div>
      <div class="container hero__inner">
        <RevealSection as="span" class="eyebrow">
          <span class="pi pi-box" />
          Platform
        </RevealSection>
        <RevealSection :delay="1" as="h1" class="hero__title">maxstash</RevealSection>
        <RevealSection :delay="2" as="p" class="hero__lede">
          maxstash is a personal platform that hosts a small collection of real-time web apps behind
          a single, secure sign-in. Create an account once and use it across every app on the
          platform.
        </RevealSection>
        <RevealSection :delay="3" as="div" class="hero__meta">
          <span class="pill"><span class="pi pi-th-large" /> {{ apps.length }} live apps</span>
          <span class="pill"><span class="pi pi-shield" /> Single sign-on</span>
          <span class="pill"><span class="pi pi-bolt" /> Real-time</span>
        </RevealSection>
      </div>
    </div>

    <div class="container body">
      <!-- apps -->
      <RevealSection as="h2" class="section-heading">Apps on the platform</RevealSection>
      <div class="grid">
        <RevealSection
          v-for="(app, i) in apps"
          :key="app.name"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="card"
        >
          <div class="card__top">
            <span class="card__icon"><span :class="app.icon" /></span>
            <div class="card__titles">
              <h3>{{ app.name }}</h3>
              <span class="card__tagline">{{ app.tagline }}</span>
            </div>
          </div>
          <p class="card__desc">{{ app.description }}</p>
          <ul class="tags">
            <li v-for="tag in app.tags" :key="tag">{{ tag }}</li>
          </ul>
          <a :href="app.href" target="_blank" rel="noreferrer" class="card__link">
            <span>Open {{ app.name }}</span>
            <span class="pi pi-external-link" />
          </a>
        </RevealSection>
      </div>

      <!-- platform: engineering behind it -->
      <RevealSection as="h2" class="section-heading">Under the hood</RevealSection>
      <RevealSection :delay="1" as="p" class="section-lede">
        Every app shares the same foundation, so new apps get accounts, real-time updates, and
        deployment for free.
      </RevealSection>
      <div class="feature-grid">
        <RevealSection
          v-for="(f, i) in platform"
          :key="f.title"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="feature"
        >
          <span class="feature__icon"><span :class="f.icon" /></span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
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
      <RevealSection as="div" class="legal-callout">
        <div class="legal-callout__text">
          <h2>Terms &amp; policies</h2>
          <p>How the platform is used and how your data is handled.</p>
        </div>
        <div class="legal-links">
          <RouterLink to="/terms-of-service" class="legal-links__item">
            <span class="pi pi-file" />
            <span>Terms of Service</span>
          </RouterLink>
          <RouterLink to="/privacy-policy" class="legal-links__item">
            <span class="pi pi-shield" />
            <span>Privacy Policy</span>
          </RouterLink>
        </div>
      </RevealSection>
    </div>
  </section>
</template>

<style scoped>
.apps {
  width: 100%;
}

/* hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 4rem 0 3.5rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-soft);
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.55;
}

.glow--1 {
  width: 420px;
  height: 420px;
  top: -160px;
  left: -100px;
  background: var(--hero-glow-1);
}

.glow--2 {
  width: 360px;
  height: 360px;
  bottom: -180px;
  right: -80px;
  background: var(--hero-glow-2);
}

.hero__inner {
  position: relative;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
}

.hero__title {
  font-family: var(--mono);
  font-size: clamp(2.75rem, 8vw, 4.5rem);
  line-height: 1.05;
  margin: 1.25rem 0 0;
  letter-spacing: -0.02em;
}

.hero__lede {
  max-width: 62ch;
  margin: 1rem 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.75rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--text-h);
  background: var(--bg);
  border: 1px solid var(--border);
}

.pill .pi {
  color: var(--accent);
  font-size: 0.9rem;
}

/* body */
.body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.section-heading {
  margin: 3rem 0 0.5rem;
  font-size: 1.4rem;
}

.section-lede {
  max-width: 62ch;
  margin: 0 0 1.75rem;
  color: var(--text);
}

/* app cards */
.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin-top: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  border-radius: 16px;
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

.card__top {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.card__icon,
.feature__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 1.3rem;
  border: 1px solid var(--accent-border);
}

.card__titles h3 {
  margin: 0;
  font-family: var(--mono);
  font-size: 1.25rem;
}

.card__tagline {
  font-size: 0.85rem;
  color: var(--text);
  opacity: 0.8;
}

.card__desc {
  color: var(--text);
  line-height: 1.65;
  margin: 0 0 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 1.25rem;
  padding: 0;
  list-style: none;
}

.tags li {
  font-size: 0.72rem;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  background: var(--bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  align-self: flex-start;
  margin-top: auto;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.card__link:hover {
  transform: translateY(-1px);
}

/* platform features */
.feature-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.feature {
  padding: 1.5rem;
  border-radius: 14px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.feature:hover {
  transform: translateY(-3px);
  border-color: var(--accent-border);
}

.feature__icon {
  margin-bottom: 0.9rem;
}

.feature h3 {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
}

.feature p {
  margin: 0;
  color: var(--text);
  line-height: 1.6;
  font-size: 0.9rem;
}

/* sign-in prose */
.prose {
  max-width: 68ch;
}

.prose p {
  color: var(--text);
  line-height: 1.7;
  margin: 0 0 1rem;
}

/* legal callout */
.legal-callout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 1.75rem;
  border-radius: 16px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

.legal-callout__text h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.legal-callout__text p {
  margin: 0;
  color: var(--text);
  opacity: 0.85;
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
  background: var(--bg);
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
