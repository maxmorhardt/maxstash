<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import RevealSection from '../components/common/RevealSection.vue';
import HeroTerminal from '../components/common/HeroTerminal.vue';
import { usePageMeta } from '../composables/usePageMeta';
import { useScrollReveal } from '../composables/useScrollReveal';

usePageMeta({
  title: 'Max Morhardt – Software Engineer',
  description:
    'Max Morhardt is a Full Stack Engineer at Fidelity Investments specializing in Java, Spring Boot, Go, TypeScript, React, Angular, Kubernetes, and AWS.',
  canonical: 'https://maxstash.io/',
});

const router = useRouter();

const { target: chipsTarget, visible: chipsVisible } = useScrollReveal<HTMLDivElement>();

const stack = [
  { name: 'Java', icon: 'pi pi-server' },
  { name: 'TypeScript', icon: 'pi pi-code' },
  { name: 'Go', icon: 'pi pi-bolt' },
  { name: 'Python', icon: 'pi pi-code' },
  { name: 'SQL', icon: 'pi pi-database' },
  { name: 'Spring Boot', icon: 'pi pi-server' },
  { name: 'Gin', icon: 'pi pi-bolt' },
  { name: 'GORM', icon: 'pi pi-database' },
  { name: 'JPA', icon: 'pi pi-database' },
  { name: 'React', icon: 'pi pi-prime' },
  { name: 'Angular', icon: 'pi pi-code' },
  { name: 'Vue 3', icon: 'pi pi-code' },
  { name: 'PrimeNG', icon: 'pi pi-prime' },
  { name: 'Material UI', icon: 'pi pi-palette' },
  { name: 'PostgreSQL', icon: 'pi pi-database' },
  { name: 'NATS', icon: 'pi pi-sync' },
  { name: 'WebSockets', icon: 'pi pi-bolt' },
  { name: 'Docker', icon: 'pi pi-box' },
  { name: 'Kubernetes', icon: 'pi pi-server' },
  { name: 'Helm', icon: 'pi pi-box' },
  { name: 'AWS', icon: 'pi pi-cloud' },
  { name: 'EKS', icon: 'pi pi-server' },
  { name: 'EC2', icon: 'pi pi-server' },
  { name: 'S3', icon: 'pi pi-database' },
  { name: 'EFS', icon: 'pi pi-database' },
  { name: 'Lambda', icon: 'pi pi-bolt' },
  { name: 'DynamoDB', icon: 'pi pi-database' },
  { name: 'CloudWatch', icon: 'pi pi-chart-line' },
  { name: 'CloudFormation', icon: 'pi pi-cloud' },
  { name: 'Jenkins', icon: 'pi pi-cog' },
  { name: 'GitHub Actions', icon: 'pi pi-github' },
  { name: 'Karate', icon: 'pi pi-check-circle' },
  { name: 'Datadog', icon: 'pi pi-chart-line' },
  { name: 'Prometheus', icon: 'pi pi-chart-line' },
  { name: 'Grafana', icon: 'pi pi-chart-bar' },
  { name: 'Loki', icon: 'pi pi-list' },
  { name: 'Authentik', icon: 'pi pi-shield' },
  { name: 'Cloudflare', icon: 'pi pi-cloud' },
  { name: 'Bash', icon: 'pi pi-code' },
];

const highlights = [
  {
    title: 'Full-stack engineering',
    body: 'Java + Spring Boot and Go + Gin services behind Angular and React interfaces, designed, tested, and shipped end to end.',
    icon: 'pi pi-sitemap',
  },
  {
    title: 'Cloud and Kubernetes platforms',
    body: 'Multi-tenant developer platforms on AWS and EKS, with Spring Boot APIs orchestrating Kubernetes workloads for thousands of users.',
    icon: 'pi pi-server',
  },
  {
    title: 'Real-time and self-hosted systems',
    body: 'A production k3s cluster running Authentik SSO, highly available PostgreSQL, and NATS pub/sub for horizontally scaled WebSocket broadcasting.',
    icon: 'pi pi-bolt',
  },
];

const featured = [
  {
    name: 'squares',
    blurb:
      'Real-time NFL squares platform with a live grid, automated winner calculation, and OIDC accounts.',
    href: 'https://github.com/maxmorhardt/squares',
    tags: ['React', 'TypeScript', 'Redux', 'MUI', 'OIDC', 'WebSocket'],
  },
  {
    name: 'squares-api',
    blurb:
      'Go and Gin API powering the squares platform, with a contest state machine and NATS-backed real-time updates.',
    href: 'https://github.com/maxmorhardt/squares-api',
    tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'NATS', 'OIDC', 'Swagger'],
  },
  {
    name: 'k8s',
    blurb:
      'Self-hosted k3s cluster running every app on this site, with SSO, HA PostgreSQL, and full observability.',
    href: 'https://github.com/maxmorhardt/k8s',
    tags: ['Kubernetes', 'Authentik', 'PostgreSQL', 'NATS', 'Prometheus', 'Grafana', 'Loki'],
  },
  {
    name: 'charts',
    blurb: 'Reusable Helm charts shared across all my application deployments.',
    href: 'https://github.com/maxmorhardt/charts',
    tags: ['Helm', 'Kubernetes', 'HPA', 'Ingress', 'Prometheus'],
  },
  {
    name: 'workflows',
    blurb: 'Reusable GitHub Actions workflows that build, test, and deploy every other repository.',
    href: 'https://github.com/maxmorhardt/workflows',
    tags: ['GitHub Actions', 'Docker', 'Helm', 'Trivy', 'Tailscale'],
  },
  {
    name: 'maxstash',
    blurb: 'This portfolio site, built with Vue 3, Vite, and PrimeVue.',
    href: 'https://github.com/maxmorhardt/maxstash',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'PrimeVue'],
  },
];
</script>

<template>
  <div class="home">
    <!-- hero -->
    <section class="hero full-bleed">
      <div class="hero__bg" aria-hidden="true">
        <div class="glow glow--1" />
        <div class="glow glow--2" />
      </div>
      <div class="container hero__inner">
        <h1 class="sr-only">Max Morhardt, Software Engineer</h1>
        <RevealSection class="hero__terminal">
          <HeroTerminal />
        </RevealSection>
      </div>
      <div class="hero__scroll" aria-hidden="true">
        <span class="pi pi-chevron-down" />
      </div>
    </section>

    <!-- highlights -->
    <section class="section highlights full-bleed">
      <div class="container">
        <RevealSection as="h2" class="section__title">What I do</RevealSection>
        <RevealSection :delay="1" as="p" class="section__lede">
          A few areas where I spend most of my engineering time.
        </RevealSection>
        <div class="cards">
          <RevealSection
            v-for="(h, i) in highlights"
            :key="h.title"
            :delay="(i + 1) as 1 | 2 | 3"
            class="card reveal--rise"
          >
            <div class="card__icon">
              <span :class="h.icon" />
            </div>
            <h3>{{ h.title }}</h3>
            <p>{{ h.body }}</p>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- stack chips -->
    <section class="section stack full-bleed">
      <div class="container">
        <RevealSection as="h2" class="section__title">Tools of the trade</RevealSection>
        <RevealSection :delay="1" as="p" class="section__lede">
          Day-to-day languages, frameworks, and platforms.
        </RevealSection>
        <div
          :ref="(el: unknown) => (chipsTarget = el as HTMLDivElement | null)"
          class="chips"
          :class="{ 'is-visible': chipsVisible }"
        >
          <span
            v-for="(item, i) in stack"
            :key="item.name"
            class="chip"
            :style="{ animationDelay: `${i * 45}ms` }"
          >
            <span :class="item.icon" />
            <span>{{ item.name }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- featured projects -->
    <section class="section featured full-bleed">
      <div class="container">
        <RevealSection as="h2" class="section__title">Featured work</RevealSection>
        <RevealSection :delay="1" as="p" class="section__lede">
          A small slice of recent projects. More on the
          <RouterLink to="/projects">projects page</RouterLink>.
        </RevealSection>
        <div class="featured__grid">
          <RevealSection
            v-for="(project, i) in featured.slice(0, 3)"
            :key="project.name"
            :delay="(i + 1) as 1 | 2 | 3"
            class="project"
            :class="i % 2 === 0 ? 'reveal--left' : 'reveal--right'"
          >
            <div class="project__head">
              <h3>{{ project.name }}</h3>
              <a :href="project.href" target="_blank" rel="noreferrer" aria-label="View on GitHub">
                <span class="pi pi-github" />
              </a>
            </div>
            <p>{{ project.blurb }}</p>
            <ul class="tags">
              <li v-for="tag in project.tags" :key="tag">
                {{ tag }}
              </li>
            </ul>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- cta -->
    <section class="section cta full-bleed">
      <div class="container cta__inner">
        <RevealSection as="h2" class="reveal--scale">Let's build something.</RevealSection>
        <RevealSection :delay="1" as="p">
          Have a project in mind, or just want to say hi? My inbox is open.
        </RevealSection>
        <RevealSection :delay="2" class="reveal--rise">
          <Button
            label="Get in touch"
            icon="pi pi-arrow-right"
            icon-pos="right"
            @click="router.push('/contact')"
          />
        </RevealSection>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.hero {
  position: relative;
  box-sizing: border-box;
  min-height: calc(100svh - var(--header-h));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1.5rem 0 4.5rem;
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
  opacity: 0.7;
}

.glow--1 {
  width: 520px;
  height: 520px;
  top: -120px;
  left: -120px;
  background: var(--hero-glow-1);
  animation: float 12s ease-in-out infinite;
}

.glow--2 {
  width: 460px;
  height: 460px;
  bottom: -160px;
  right: -120px;
  background: var(--hero-glow-2);
  animation: float 14s ease-in-out infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(40px, 30px);
  }
}

/* the terminal is the whole hero: centered, it carries the identity and the nav */
.hero__inner {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero__terminal {
  width: 100%;
  display: flex;
  justify-content: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 880px) {
  .hero {
    padding: 1rem 0 1.5rem;
  }

  .hero__scroll {
    display: none;
  }
}

.hero__scroll {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: var(--text);
  opacity: 0.5;
  animation: bounce 2.4s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 8px);
  }
}

.section__title {
  text-align: center;
}

.section__lede {
  text-align: center;
  max-width: 56ch;
  margin: 0 auto 3rem;
  color: var(--text);
}

.highlights {
  background: var(--bg-soft);
  border-block: 1px solid var(--border);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}

.card {
  flex: 1 1 280px;
  max-width: 360px;
  min-width: 0;
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card.reveal {
  transition:
    opacity 1.3s cubic-bezier(0.22, 1, 0.36, 1),
    transform 1.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

@keyframes chip-reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  font-size: 0.95rem;
  color: var(--text-h);
  opacity: 0;
  transform: translateY(12px);
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
}

.chips.is-visible .chip {
  animation: chip-reveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.chip:hover {
  border-color: var(--accent-border);
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .chip,
  .chips.is-visible .chip {
    opacity: 1;
    transform: none;
    animation: none;
  }
}

.featured {
  background: var(--bg-soft);
  border-block: 1px solid var(--border);
}

.featured__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}

.project {
  flex: 1 1 300px;
  max-width: 400px;
  min-width: 0;
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.project.reveal {
  transition:
    opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 1.2s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.project:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.project__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.project__head a {
  color: var(--text);
  font-size: 1.25rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.project__head a:hover {
  color: var(--accent);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.tags li {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}

.cta {
  text-align: center;
}

.cta__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
