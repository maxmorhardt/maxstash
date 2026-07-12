<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Projects – Max Morhardt',
  description:
    "Explore Max Morhardt's projects: a real-time NFL squares app, Go APIs, a self-hosted Kubernetes platform, reusable Helm charts, and GitHub Actions workflows.",
  canonical: 'https://maxstash.io/projects',
});

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
];
</script>

<template>
  <section class="projects section">
    <div class="container">
      <!-- page heading -->
      <RevealSection as="h1" class="page-title">Projects</RevealSection>

      <!-- lede -->
      <RevealSection :delay="1" as="p" class="lede">
        A connected ecosystem of frontends, APIs, and infrastructure I design, build, and self-host,
        where every project deploys to the same Kubernetes platform that runs this site.
      </RevealSection>

      <!-- project cards -->
      <div class="grid">
        <RevealSection
          v-for="(project, i) in projects"
          :key="project.name"
          :delay="((i % 3) + 1) as 1 | 2 | 3"
          class="card"
        >
          <div class="card__head">
            <div class="card__title">
              <h3>{{ project.name }}</h3>
              <span class="badge">{{ project.category }}</span>
            </div>

            <a :href="project.href" target="_blank" rel="noreferrer" aria-label="View on GitHub">
              <span class="pi pi-github" />
            </a>
          </div>

          <p>{{ project.description }}</p>

          <ul class="tags">
            <li v-for="tag in project.tags" :key="tag">
              {{ tag }}
            </li>
          </ul>

          <div v-if="project.links" class="extras">
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
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
.projects {
  padding-top: 3rem;
}

.lede {
  max-width: 60ch;
  margin-bottom: 3rem;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.card__title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card__title h3 {
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

.card__head a {
  color: var(--text);
  font-size: 1.25rem;
  text-decoration: none;
}

.card__head a:hover {
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
  background: var(--bg);
  color: var(--text-h);
  border: 1px solid var(--border);
}

.extras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px dashed var(--border);
}

.tags {
  margin-bottom: 1rem;
}

.extras a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  text-decoration: none;
}

.extras a:hover {
  transform: translateY(-1px);
}

.card.reveal {
  opacity: 0;
  transform: translateY(40px) scale(0.92) rotate(-1.5deg);
  transform-origin: center bottom;
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.card.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1) rotate(0);
}

@media (prefers-reduced-motion: reduce) {
  .card.reveal,
  .card.reveal.is-visible {
    transition: none;
    transform: none;
    opacity: 1;
  }
}
</style>
