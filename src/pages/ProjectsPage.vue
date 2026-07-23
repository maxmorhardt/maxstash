<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
import ProjectCard, { type Project } from '../components/projects/ProjectCard.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'Projects – Max Morhardt',
  description:
    "Explore Max Morhardt's projects: a real-time NFL squares app, a Go API, a self-hosted Kubernetes platform, reusable Helm charts, and GitHub Actions workflows.",
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
    body: 'Every app runs on a self-managed k3s cluster behind a single Envoy gateway, with highly available Postgres, sealed secrets, and full observability.',
  },
  {
    icon: 'pi pi-sync',
    title: 'Continuous delivery',
    body: 'Shared CI/CD pipelines and reusable Helm charts build and test every service the same way, then Argo CD syncs the cluster to match Git.',
  },
];

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
    tags: ['React', 'TypeScript', 'Redux', 'MUI', 'SSG', 'OIDC', 'WebSocket'],
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
      'Self-hosted k3s cluster that runs every app on this site: Argo CD keeps it in sync with this repo, Envoy Gateway fronts all traffic, and Dex federates Google and GitHub sign-in. Highly available Postgres, NATS messaging, Sealed Secrets, and a full metrics and logs stack back it all.',
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
      'Reusable GitHub Actions workflows that build, test, and release every other repo. Covers Node, Go, Docker image publishing, and Helm releases, plus security scanning with Trivy and automated dependency updates with Renovate. Deploys are GitOps: a workflow bumps the Argo CD Application manifest and the cluster reconciles itself.',
    href: 'https://github.com/maxmorhardt/workflows',
    tags: ['GitHub Actions', 'Docker', 'Helm', 'Argo CD', 'Trivy', 'Renovate'],
  },
  {
    name: 'maxstash',
    category: 'Frontend',
    description:
      'This portfolio site. Vue 3 + Vite prerendered to static HTML with vite-ssg, styled with Tailwind CSS over PrimeVue, with persistent light/dark theming and scroll-driven animations. Shipped as a Docker image through the same workflows that deploy everything else.',
    href: 'https://github.com/maxmorhardt/maxstash',
    links: [
      {
        label: 'Live site',
        href: 'https://maxstash.io',
        icon: 'pi pi-external-link',
      },
    ],
    tags: ['Vue 3', 'TypeScript', 'Vite', 'SSG', 'Tailwind CSS', 'PrimeVue'],
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

      <!-- under the hood: the shared platform, as an open media list (not cards) -->
      <RevealSection as="h2" class="section-heading">Under the hood</RevealSection>
      <div class="platform-grid">
        <RevealSection
          v-for="(f, i) in platform"
          :key="f.title"
          class="platform-item"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <span class="platform-icon"><span :class="f.icon" /></span>
          <div class="min-w-0">
            <h3 class="platform-title">{{ f.title }}</h3>
            <p class="platform-body">{{ f.body }}</p>
          </div>
        </RevealSection>
      </div>

      <!-- the repositories -->
      <RevealSection as="h2" class="section-heading">The repositories</RevealSection>

      <!-- project cards -->
      <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.name"
          :project="project"
          :root-margin="i < 3 ? '0px 0px 15% 0px' : undefined"
          :animation-delay="`${(i % 3) * 60}ms`"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  margin: 3rem 0 1.5rem;
  font-size: 1.4rem;
}

/* under the hood: an airy media list with hairline rows, slides in from the left */
.platform-grid {
  display: grid;
  border-bottom: 1px solid var(--border);
}

@media (min-width: 720px) {
  .platform-grid {
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }
}

.platform-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
  opacity: 0;
  transform: none;
  transition: none;
}

.platform-item.is-visible {
  animation: fade-rise 0.5s var(--ease-reveal) both;
}

.platform-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
  font-size: 1.25rem;
}

.platform-title {
  margin: 0.1rem 0 0.35rem;
  font-size: 1.05rem;
}

.platform-body {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text);
}

/* one calm, shared entrance for both sections: a gentle fade and rise */
@keyframes fade-rise {
  from {
    opacity: 0;
    translate: 0 12px;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .platform-item,
  .platform-item.is-visible {
    animation: none;
    opacity: 1;
    translate: none;
    scale: none;
    transform: none;
  }
}
</style>
