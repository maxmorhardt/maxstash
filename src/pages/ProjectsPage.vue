<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';

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
      'Web app for playing Super Bowl squares with friends in real time. Built around a live grid that updates instantly as numbers get drawn and quarters end. Auth is handled through OIDC so games stay tied to real accounts.',
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
        href: 'https://squares-api.maxstash.io/swagger/index.html',
        icon: 'pi pi-book',
      },
    ],
    tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'NATS', 'OIDC', 'Swagger'],
  },
  {
    name: 'k8s',
    category: 'Infrastructure',
    description:
      'Self-hosted Kubernetes cluster that runs every app on this site. Includes single sign-on, a highly-available Postgres, message bus, and full metrics + logs stack. Everything is declarative and rebuilt automatically on a weekly schedule.',
    href: 'https://github.com/maxmorhardt/k8s',
    links: [
      {
        label: 'Authentik',
        href: 'https://login.maxstash.io/',
        icon: 'pi pi-shield',
      },
    ],
    tags: ['Kubernetes', 'Authentik', 'PostgreSQL', 'NATS', 'Prometheus', 'Grafana', 'Loki'],
  },
  {
    name: 'charts',
    category: 'Infrastructure',
    description:
      'Reusable Helm charts shared across all my app deployments. Each chart bundles the standard pieces (Deployment, Service, Ingress, autoscaling, monitoring) so a new app only needs a values file. Keeps every workload in the cluster consistent.',
    href: 'https://github.com/maxmorhardt/charts',
    tags: ['Helm', 'Kubernetes', 'HPA', 'Ingress', 'Prometheus'],
  },
  {
    name: 'workflows',
    category: 'CI/CD',
    description:
      'Reusable GitHub Actions workflows that build, test, and deploy every other repo. Covers Node, Go, Docker image publishing, and Helm releases, plus security scanning with Trivy. Deploys land in the cluster over a private Tailscale network.',
    href: 'https://github.com/maxmorhardt/workflows',
    tags: ['GitHub Actions', 'Docker', 'Helm', 'Trivy', 'Tailscale'],
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
      <!-- Page heading -->
      <RevealSection as="h1">
        Projects
      </RevealSection>
      <!-- Lede -->
      <RevealSection
        :delay="1"
        as="p"
        class="lede"
      >
        A connected ecosystem of frontends, APIs, and infrastructure I build and self-host. All open
        source under Apache 2.0 (or PolyForm Noncommercial for the games).
      </RevealSection>

      <!-- Project cards -->
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
            <a
              :href="project.href"
              target="_blank"
              rel="noreferrer"
              aria-label="View on GitHub"
            >
              <span class="pi pi-github" />
            </a>
          </div>
          <p>{{ project.description }}</p>
          <ul class="tags">
            <li
              v-for="tag in project.tags"
              :key="tag"
            >
              {{ tag }}
            </li>
          </ul>
          <div
            v-if="project.links"
            class="extras"
          >
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

/* Breathing room between tag chips and the extras divider */
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

/* Override the generic .reveal fade-up with a card-specific entrance.
   Cards rise, scale up, and un-tilt as they come into view. */
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
