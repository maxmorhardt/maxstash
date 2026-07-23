<script setup lang="ts">
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
  { name: 'Vite', icon: 'pi pi-bolt' },
  { name: 'PrimeNG', icon: 'pi pi-prime' },
  { name: 'PrimeVue', icon: 'pi pi-prime' },
  { name: 'Material UI', icon: 'pi pi-palette' },
  { name: 'Tailwind CSS', icon: 'pi pi-palette' },
  { name: 'PostgreSQL', icon: 'pi pi-database' },
  { name: 'NATS', icon: 'pi pi-sync' },
  { name: 'WebSockets', icon: 'pi pi-bolt' },
  { name: 'Docker', icon: 'pi pi-box' },
  { name: 'Kubernetes', icon: 'pi pi-server' },
  { name: 'k3s', icon: 'pi pi-server' },
  { name: 'Helm', icon: 'pi pi-box' },
  { name: 'Argo CD', icon: 'pi pi-sync' },
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
  { name: 'Renovate', icon: 'pi pi-refresh' },
  { name: 'Karate', icon: 'pi pi-check-circle' },
  { name: 'Datadog', icon: 'pi pi-chart-line' },
  { name: 'Prometheus', icon: 'pi pi-chart-line' },
  { name: 'Grafana', icon: 'pi pi-chart-bar' },
  { name: 'Loki', icon: 'pi pi-list' },
  { name: 'Dex', icon: 'pi pi-shield' },
  { name: 'Sealed Secrets', icon: 'pi pi-lock' },
  { name: 'Envoy Gateway', icon: 'pi pi-arrow-right-arrow-left' },
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
    body: 'A production k3s cluster fronted by Envoy Gateway, with Dex federated sign-in, highly available PostgreSQL, and NATS pub/sub for horizontally scaled WebSocket broadcasting, delivered continuously through Argo CD GitOps.',
    icon: 'pi pi-bolt',
  },
];
</script>

<template>
  <div class="w-full">
    <!-- hero -->
    <section
      class="relative box-border flex min-h-[calc(100svh-var(--header-h))] w-full items-center justify-center overflow-hidden pt-6 pb-18 max-[880px]:pt-4 max-[880px]:pb-6"
    >
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="glow glow--1" />
        <div class="glow glow--2" />
      </div>
      <div class="layout-container relative flex w-full justify-center">
        <h1 class="sr-only">Max Morhardt, Software Engineer</h1>
        <RevealSection class="flex w-full justify-center">
          <HeroTerminal />
        </RevealSection>
      </div>
      <div class="hero-scroll max-[880px]:hidden" aria-hidden="true">
        <span class="pi pi-chevron-down" />
      </div>
    </section>

    <!-- highlights -->
    <section class="layout-section w-full border-y border-border bg-bg-soft">
      <div class="layout-container">
        <RevealSection as="h2" class="text-center">What I do</RevealSection>
        <RevealSection :delay="1" as="p" class="mx-auto mb-12 max-w-[56ch] text-center text-text">
          A few areas where I spend most of my engineering time.
        </RevealSection>
        <div class="flex flex-wrap justify-center gap-5">
          <RevealSection
            v-for="(h, i) in highlights"
            :key="h.title"
            :delay="(i + 1) as 1 | 2 | 3"
            class="lift-card reveal--rise min-w-0 max-w-[360px] flex-[1_1_280px] rounded-card border border-border bg-bg p-7 hover:border-accent-border hover:shadow-card"
          >
            <div
              class="mb-4 inline-flex size-11 items-center justify-center rounded-[10px] bg-accent-bg text-xl text-accent"
            >
              <span :class="h.icon" />
            </div>
            <h3>{{ h.title }}</h3>
            <p>{{ h.body }}</p>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- stack chips -->
    <section class="layout-section w-full">
      <div class="layout-container">
        <RevealSection as="h2" class="text-center">Tools of the trade</RevealSection>
        <RevealSection :delay="1" as="p" class="mx-auto mb-12 max-w-[56ch] text-center text-text">
          Day-to-day languages, frameworks, and platforms.
        </RevealSection>
        <div
          :ref="(el: unknown) => (chipsTarget = el as HTMLDivElement | null)"
          class="chips flex flex-wrap justify-center gap-[0.6rem]"
          :class="{ 'is-visible': chipsVisible }"
        >
          <span
            v-for="(item, i) in stack"
            :key="item.name"
            class="chip inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft px-4 py-[0.55rem] text-[0.95rem] text-text-h transition-[border-color,color] duration-200 ease-out hover:border-accent-border hover:text-accent"
            :style="{ animationDelay: `${i * 45}ms` }"
          >
            <span :class="item.icon" />
            <span>{{ item.name }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- editorial statement: a heading/body spread, deliberately not a card grid -->
    <section class="layout-section w-full border-y border-border bg-bg-soft">
      <div class="layout-container">
        <div class="statement-grid">
          <RevealSection as="h2" class="statement-label">How I work</RevealSection>
          <RevealSection :delay="1" as="div" class="statement-body">
            <p class="statement-lead">
              At Fidelity, I build multi-tenant developer platforms end to end:
              <em>Spring Boot services and Angular interfaces</em>, built and deployed to EKS
              through Jenkins pipelines for thousands of engineers.
            </p>
            <p class="statement-sub">
              Beyond that, I self-host every app on this site on a Kubernetes cluster I run and
              maintain myself.
            </p>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- cta -->
    <section class="layout-section w-full">
      <div class="layout-container">
        <RevealSection class="cta-panel reveal--rise flex flex-col items-center gap-4 text-center">
          <h2 class="m-0">Let's build something.</h2>
          <p class="max-w-[46ch] text-text">
            Have a project in mind, or just want to say hi? My inbox is open.
          </p>
          <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button class="cta-primary" @click="router.push('/contact')">
              <span>Get in touch</span>
              <span class="pi pi-arrow-right text-[0.85rem]" />
            </button>
            <RouterLink to="/projects" class="cta-ghost">
              <span>See the projects</span>
            </RouterLink>
          </div>
        </RevealSection>
      </div>
    </section>
  </div>
</template>

<style scoped>
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

.hero-scroll {
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

.lift-card {
  transition:
    opacity 1.3s var(--ease-reveal),
    transform 1.3s var(--ease-reveal),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.lift-card:hover {
  transform: translateY(-4px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* editorial statement: a heading/body spread that fills the container width */
.statement-grid {
  display: grid;
  gap: 1.5rem 3rem;
}

@media (min-width: 860px) {
  .statement-grid {
    grid-template-columns: 13rem 1fr;
    align-items: start;
  }
}

.statement-label {
  margin: 0;
  font-size: clamp(1.35rem, 2.2vw, 1.7rem);
  font-weight: 600;
  color: var(--text-h);
}

.statement-body {
  border-left: 2px solid var(--accent-border);
  padding-left: 2rem;
}

@media (max-width: 859px) {
  .statement-body {
    border-left: none;
    padding-left: 0;
  }
}

.statement-lead {
  font-size: clamp(1.3rem, 2.4vw, 1.8rem);
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: var(--text-h);
}

.statement-lead em {
  font-style: normal;
  color: var(--accent);
}

.statement-sub {
  margin-top: 1.25rem;
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  line-height: 1.6;
  color: var(--text);
}

.cta-panel {
  padding: 3.5rem 2rem;
  border-radius: var(--radius-panel);
  border: 1px solid var(--border);
  background: var(--bg-soft);
}

.cta-primary,
.cta-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    filter 0.2s ease;
}

.cta-primary {
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
}

.cta-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
}

.cta-ghost {
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-h);
}

.cta-ghost:hover {
  transform: translateY(-2px);
  border-color: var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .cta-primary:hover,
  .cta-ghost:hover {
    transform: none;
  }
}

/* chips stagger in via inline animation-delay once the row scrolls into view */
.chip {
  opacity: 0;
  transform: translateY(12px);
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

.chips.is-visible .chip {
  animation: chip-reveal 0.4s var(--ease-reveal) both;
}

@media (prefers-reduced-motion: reduce) {
  .chip,
  .chips.is-visible .chip {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
