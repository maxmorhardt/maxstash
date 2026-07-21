<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Projects – Max Morhardt',
  description:
    "Explore Max Morhardt's projects: a real-time NFL squares app, Go APIs, a self-hosted Kubernetes platform, reusable Helm charts, and GitHub Actions workflows.",
  canonical: 'https://maxstash.io/projects',
});

const platform = [
  {
    icon: 'pi pi-shield',
    title: 'Federated single sign-on',
    body: 'One account works across every app, with Google and GitHub sign-in federated through a self-hosted Dex identity provider.',
  },
  {
    icon: 'pi pi-bolt',
    title: 'Real-time everywhere',
    body: 'Live grids, scores, and standings update instantly for everyone, powered by WebSockets fanned out across instances over NATS.',
  },
  {
    icon: 'pi pi-server',
    title: 'Self-hosted on Kubernetes',
    body: 'Every app runs on a self-managed k3s cluster behind a single Envoy gateway, with highly available Postgres and full observability.',
  },
  {
    icon: 'pi pi-sync',
    title: 'Continuous delivery',
    body: 'Shared CI/CD pipelines and reusable Helm charts build, test, and deploy every service the same way.',
  },
];

interface Project {
  name: string;
  category: string;
  description: string;
  href: string;
  links?: { label: string; href: string; icon?: string }[];
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'squares',
    category: 'Frontend',
    description:
      'Real-time NFL squares platform built around a live grid that updates instantly as numbers are drawn and quarters end. Includes a contest state machine, automated winner calculation, and Google and GitHub sign-in through Dex.',
    href: 'https://github.com/maxmorhardt/squares',
    links: [
      {
        label: 'Live site',
        href: 'https://squares.maxstash.io',
        icon: 'pi pi-external-link',
      },
    ],
    tags: ['React', 'TypeScript', 'Redux', 'MUI', 'OIDC', 'WebSocket'],
  },
  {
    name: 'squares-api',
    category: 'Backend',
    description:
      'Backend API that powers the Super Bowl squares game. Owns the contest lifecycle, persists state in PostgreSQL, and fans real-time updates out to every connected client. Documented with Swagger and protected with OIDC-validated JWTs.',
    href: 'https://github.com/maxmorhardt/squares-api',
    links: [
      {
        label: 'Swagger',
        href: 'https://api.maxstash.io/squares/swagger',
        icon: 'pi pi-book',
      },
    ],
    tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'NATS', 'OIDC', 'Swagger'],
  },
  {
    name: 'k8s',
    category: 'Infrastructure',
    description:
      'Self-hosted k3s cluster that runs every app on this site: Envoy Gateway routes all traffic through one front door, Dex federates Google and GitHub sign-in, and a highly available Postgres, NATS messaging, and a full metrics and logs stack back it all. Automated node maintenance runs through kured with coordinated rolling reboots and alerting.',
    href: 'https://github.com/maxmorhardt/k8s',
    tags: ['Kubernetes', 'Envoy Gateway', 'Dex', 'PostgreSQL', 'NATS', 'Prometheus', 'Grafana'],
  },
  {
    name: 'charts',
    category: 'Infrastructure',
    description:
      'Reusable Helm charts shared across all my app deployments. Each chart bundles the standard pieces (Deployment, Service, HTTPRoute, autoscaling, monitoring) so a new app only needs a values file. Keeps every workload in the cluster consistent.',
    href: 'https://github.com/maxmorhardt/charts',
    tags: ['Helm', 'Kubernetes', 'HPA', 'Gateway API', 'Prometheus'],
  },
  {
    name: 'workflows',
    category: 'CI/CD',
    description:
      'Reusable GitHub Actions workflows that build, test, and deploy every other repo. Covers Node, Go, Docker image publishing, and Helm releases, plus security scanning with Trivy and automated dependency updates with Renovate. Deploys land in the cluster over a private Tailscale network.',
    href: 'https://github.com/maxmorhardt/workflows',
    tags: ['GitHub Actions', 'Docker', 'Helm', 'Trivy', 'Renovate', 'Tailscale'],
  },
  {
    name: 'maxstash',
    category: 'Frontend',
    description:
      'This portfolio site. Vue 3 + Vite + PrimeVue with persistent light/dark theming and scroll-driven animations. Shipped as a Docker image through the same workflows that deploy everything else.',
    href: 'https://github.com/maxmorhardt/maxstash',
    links: [
      {
        label: 'Live site',
        href: 'https://maxstash.io',
        icon: 'pi pi-external-link',
      },
    ],
    tags: ['Vue 3', 'TypeScript', 'Vite', 'PrimeVue'],
  },
  {
    name: 'olympics',
    category: 'Frontend',
    description:
      'Tournament platform for backyard olympics: add participants, generate random teams and group stages, record match results, and follow live standings through to the playoff bracket.',
    href: 'https://github.com/maxmorhardt/olympics',
    links: [
      {
        label: 'Live site',
        href: 'https://olympics.maxstash.io',
        icon: 'pi pi-external-link',
      },
    ],
    tags: ['React', 'TypeScript', 'Redux', 'MUI', 'OIDC', 'WebSocket'],
  },
  {
    name: 'olympics-api',
    category: 'Backend',
    description:
      'Backend API for the olympics platform. Owns the tournament lifecycle from participants and team generation through group stages, playoffs, and standings, with real-time updates pushed over WebSockets.',
    href: 'https://github.com/maxmorhardt/olympics-api',
    tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'WebSocket', 'OIDC'],
  },
];
</script>

<template>
  <section class="layout-section pt-12">
    <div class="layout-container">
      <!-- page heading -->
      <RevealSection as="h1" class="page-title">Projects</RevealSection>

      <!-- lede -->
      <RevealSection :delay="1" as="p" class="mb-10 max-w-[62ch]">
        A connected ecosystem of frontends, APIs, and infrastructure I design, build, and self-host.
        The apps are the surface. Underneath, every project deploys to the same Kubernetes platform
        that runs this site, sharing sign-on, real-time messaging, and delivery pipelines.
      </RevealSection>

      <!-- under the hood: the shared platform every repo builds on -->
      <RevealSection as="h2" class="section-heading">Under the hood</RevealSection>
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 min-[800px]:max-[1140px]:grid-cols-2"
      >
        <RevealSection
          v-for="(f, i) in platform"
          :key="f.title"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="feature rounded-card border border-border bg-bg-soft p-6 hover:border-accent-border"
        >
          <span
            class="mb-[0.9rem] inline-flex size-[46px] items-center justify-center rounded-xl border border-accent-border bg-accent-bg text-[1.3rem] text-accent"
          >
            <span :class="f.icon" />
          </span>
          <h3 class="mt-0 mb-[0.4rem] text-[1.05rem]">{{ f.title }}</h3>
          <p class="m-0 text-[0.9rem] leading-[1.6] text-text">{{ f.body }}</p>
        </RevealSection>
      </div>

      <!-- the repositories -->
      <RevealSection as="h2" class="section-heading">The repositories</RevealSection>

      <!-- project cards -->
      <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        <RevealSection
          v-for="(project, i) in projects"
          :key="project.name"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          :root-margin="i < 3 ? '0px 0px 15% 0px' : undefined"
          class="card flex min-w-0 flex-col rounded-card border border-border bg-bg-soft p-7 [overflow-wrap:anywhere] hover:border-accent-border hover:shadow-card"
        >
          <div class="mb-2 flex items-start justify-between gap-4">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="m-0 font-mono">{{ project.name }}</h3>
              <span
                class="rounded-full border border-accent-border bg-accent-bg px-[0.55rem] py-[0.2rem] text-[0.7rem] tracking-[0.04em] text-accent uppercase"
              >
                {{ project.category }}
              </span>
            </div>

            <a
              :href="project.href"
              target="_blank"
              rel="noreferrer"
              aria-label="View on GitHub"
              class="text-xl text-text no-underline hover:text-accent"
            >
              <span class="pi pi-github" />
            </a>
          </div>

          <p>{{ project.description }}</p>

          <ul class="mt-4 mb-4 flex list-none flex-wrap gap-[0.4rem] p-0">
            <li
              v-for="tag in project.tags"
              :key="tag"
              class="rounded-full border border-border bg-bg px-[0.6rem] py-1 text-xs text-text-h"
            >
              {{ tag }}
            </li>
          </ul>

          <div
            v-if="project.links"
            class="mt-auto flex flex-wrap gap-2 border-t border-dashed border-border pt-4"
          >
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-bg px-[0.7rem] py-1.5 text-sm text-accent no-underline hover:-translate-y-px"
            >
              <span :class="link.icon || 'pi pi-external-link'" />
              <span>{{ link.label }}</span>
            </a>
          </div>
        </RevealSection>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  margin: 3rem 0 1.5rem;
  font-size: 1.4rem;
}

.feature {
  transition:
    opacity 0.7s var(--ease-reveal),
    transform 0.7s var(--ease-reveal),
    border-color 0.3s ease;
}

.feature.is-visible:hover {
  transform: translateY(-3px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.card {
  opacity: 0;
  transform: translateY(40px) scale(0.92) rotate(-1.5deg);
  transform-origin: center bottom;
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0);
}

.card.is-visible:hover {
  transform: translateY(-4px);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card.is-visible {
    transition: none;
    transform: none;
    opacity: 1;
  }
}
</style>
