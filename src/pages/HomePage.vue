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

const featured = [
  {
    name: 'squares',
    blurb:
      'Real-time NFL squares platform with a live grid, automated winner calculation, and OIDC accounts.',
    href: 'https://github.com/maxmorhardt/squares',
    tags: ['React', 'TypeScript', 'Redux', 'MUI', 'SSG', 'OIDC', 'WebSocket'],
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
      'Self-hosted k3s cluster running every app on this site, with SSO, HA PostgreSQL, GitOps delivery, and full observability.',
    href: 'https://github.com/maxmorhardt/k8s',
    tags: [
      'Kubernetes',
      'Argo CD',
      'Envoy Gateway',
      'Dex',
      'Sealed Secrets',
      'PostgreSQL',
      'NATS',
      'Prometheus',
    ],
  },
  {
    name: 'charts',
    blurb: 'Reusable Helm charts shared across all my application deployments.',
    href: 'https://github.com/maxmorhardt/charts',
    tags: ['Helm', 'Kubernetes', 'HPA', 'Gateway API', 'Prometheus'],
  },
  {
    name: 'workflows',
    blurb: 'Reusable GitHub Actions workflows that build, test, and deploy every other repository.',
    href: 'https://github.com/maxmorhardt/workflows',
    tags: ['GitHub Actions', 'Docker', 'Helm', 'Argo CD', 'Trivy', 'Renovate'],
  },
  {
    name: 'maxstash',
    blurb:
      'This portfolio site: a Vue 3 app prerendered to static HTML, styled with Tailwind CSS over PrimeVue.',
    href: 'https://github.com/maxmorhardt/maxstash',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'SSG', 'Tailwind CSS', 'PrimeVue'],
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

    <!-- featured projects -->
    <section class="layout-section w-full border-y border-border bg-bg-soft">
      <div class="layout-container">
        <RevealSection as="h2" class="text-center">Featured work</RevealSection>
        <RevealSection :delay="1" as="p" class="mx-auto mb-12 max-w-[56ch] text-center text-text">
          A small slice of recent projects. More on the
          <RouterLink to="/projects">projects page</RouterLink>.
        </RevealSection>
        <div class="flex flex-wrap justify-center gap-5">
          <RevealSection
            v-for="(project, i) in featured.slice(0, 3)"
            :key="project.name"
            :delay="(i + 1) as 1 | 2 | 3"
            class="lift-card min-w-0 max-w-[400px] flex-[1_1_300px] rounded-card border border-border bg-bg p-7 hover:border-accent-border hover:shadow-card"
            :class="i % 2 === 0 ? 'reveal--left' : 'reveal--right'"
          >
            <div class="mb-2 flex items-center justify-between">
              <h3>{{ project.name }}</h3>
              <a
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                aria-label="View on GitHub"
                class="text-xl text-text no-underline transition-colors duration-200 ease-out hover:text-accent"
              >
                <span class="pi pi-github" />
              </a>
            </div>
            <p>{{ project.blurb }}</p>
            <ul class="mt-4 mb-0 flex list-none flex-wrap gap-[0.4rem] p-0">
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-accent-border bg-accent-bg px-[0.6rem] py-1 text-xs text-accent"
              >
                {{ tag }}
              </li>
            </ul>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- cta -->
    <section class="layout-section w-full text-center">
      <div class="layout-container flex flex-col items-center gap-4">
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
