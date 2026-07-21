<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
import { usePageMeta } from '../composables/usePageMeta';

usePageMeta({
  title: 'About – Max Morhardt',
  description:
    'About Max Morhardt, Full Stack Engineer at Fidelity Investments building multi-tenant cloud platforms on AWS and EKS, alongside a self-hosted Kubernetes homelab.',
  canonical: 'https://maxstash.io/about',
});

interface Role {
  title: string;
  period: string;
  points: string[];
}

const experience: { company: string; roles: Role[] }[] = [
  {
    company: 'Fidelity Investments',
    roles: [
      {
        title: 'Full Stack Engineer',
        period: 'Apr 2024 - Present',
        points: [
          'Provision multi-tenant cloud IDEs (VSCode, JupyterLab, RStudio, Airflow) on AWS for roughly 3,000 users across quantitative development, machine learning, and rapid prototyping.',
          'Led the platform migration from EC2 to EKS with async Spring Boot APIs and the Kubernetes Java Client, cutting environment spin-up from 15 minutes to 2 and projected to lower infrastructure cost by 20%.',
          'Drove a full front-end redesign from Bootstrap to PrimeNG across 750+ files, and built a Karate end-to-end test suite on Jenkins covering 15 IDE images.',
          'Building Datadog and Micrometer observability to surface real-time spin-up, image distribution, and lifecycle metrics across the fleet.',
        ],
      },
      {
        title: 'Associate Software Engineer',
        period: 'Jan 2023 - Apr 2024',
        points: [
          'Built a full-stack deployment tool that ingests OpenAPI specs, generates Spring Boot scaffolding, and ships to Kubernetes through programmatically created Jenkins pipelines, reducing deployment time from days to under 45 minutes (Patent Pending).',
        ],
      },
    ],
  },
];
</script>

<template>
  <section class="layout-section w-full pt-12 pb-6">
    <div class="layout-container max-w-[920px]">
      <!-- page heading -->
      <RevealSection as="h1" class="page-title">About</RevealSection>

      <!-- lede -->
      <RevealSection :delay="1" as="p" class="mb-4 max-w-[60ch] text-[1.15rem] text-text">
        Full Stack Engineer at Fidelity Investments, building production systems across the full
        stack, from API design and cloud infrastructure to front-end interfaces.
      </RevealSection>

      <!-- experience -->
      <RevealSection :delay="1" class="row">
        <p class="row-label">Experience</p>
        <div class="min-w-0">
          <div
            v-for="(company, ci) in experience"
            :key="company.company"
            :class="{ 'mt-6': ci > 0 }"
          >
            <h2 class="mt-0 mb-4 text-[1.15rem] text-text-h">{{ company.company }}</h2>
            <div v-for="(role, ri) in company.roles" :key="role.title" :class="{ 'mt-6': ri > 0 }">
              <div class="role-head">
                <span class="font-semibold text-text-h">{{ role.title }}</span>
                <span class="whitespace-nowrap font-mono text-[0.85rem] text-text">
                  {{ role.period }}
                </span>
              </div>
              <ul class="m-0 flex list-disc flex-col gap-2 pl-[1.1rem] text-text">
                <li v-for="point in role.points" :key="point" class="leading-[1.6]">
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </RevealSection>

      <!-- flagship project -->
      <RevealSection :delay="1" class="row">
        <p class="row-label">Project</p>
        <div class="min-w-0">
          <div class="role-head">
            <span class="font-semibold text-text-h">Squares</span>
            <span class="whitespace-nowrap font-mono text-[0.85rem] text-text">
              Go &middot; React &middot; Kubernetes
            </span>
          </div>
          <p class="m-0 leading-[1.7] text-text">
            A full-stack real-time football squares platform: a <code>Go</code> and
            <code>Gin</code> REST API behind a <code>React</code> and <code>TypeScript</code> front
            end, deployed to my self-hosted Kubernetes cluster through GitHub Actions and
            <code>Argo CD</code>. It implements a contest state machine, automated winner
            calculation, <code>NATS</code> pub/sub for horizontally scaled WebSocket broadcasting,
            Google and GitHub sign-in through <code>Dex</code>, and
            <code>PostgreSQL</code> persistence with <code>GORM</code>.
          </p>
          <div class="mt-[0.9rem] flex flex-wrap gap-5">
            <a
              href="https://squares.maxstash.io"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-accent no-underline hover:underline"
            >
              <span class="pi pi-external-link" />
              <span>Live site</span>
            </a>
            <a
              href="https://github.com/maxmorhardt/squares"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-accent no-underline hover:underline"
            >
              <span class="pi pi-github" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </RevealSection>

      <!-- homelab -->
      <RevealSection :delay="1" class="row">
        <p class="row-label">Homelab platform</p>
        <div class="min-w-0">
          <p class="m-0 leading-[1.7] text-text">
            Everything I build runs on a self-hosted <code>k3s</code> cluster:
            <code>Envoy Gateway</code> routing every app through one front door,
            <code>Dex</code> federating Google and GitHub sign-in, highly available
            <code>PostgreSQL</code>, <code>NATS</code> messaging, and a full
            <code>Prometheus</code>, <code>Grafana</code>, and <code>Loki</code> observability
            stack. <code>Argo CD</code> keeps the cluster in sync with Git, so reusable Helm charts
            and GitHub Actions workflows release every app the same way.
            <code>Sealed Secrets</code> lets secrets live safely in the repo,
            <code>Renovate</code> keeps dependencies current, and
            <code>system-upgrade-controller</code> and <code>kured</code> handle k3s upgrades and
            coordinated rolling node reboots. <code>Cloudflare</code> handles DNS and edge security.
          </p>
        </div>
      </RevealSection>

      <!-- this site -->
      <RevealSection :delay="1" class="row">
        <p class="row-label">This site</p>
        <div class="min-w-0">
          <p class="m-0 leading-[1.7] text-text">
            A Vue 3 app prerendered to static HTML with <code>vite-ssg</code>, so every route ships
            real markup and then hydrates. Styled with <code>Tailwind CSS</code> over
            <code>PrimeVue</code> on a custom design system. Containerized with
            <code>Docker</code> behind <code>NGINX</code>, packaged into a <code>Helm</code> chart,
            and deployed to my Kubernetes cluster through the same reusable
            <code>GitHub Actions</code> and <code>Argo CD</code> pipeline that ships every other
            project here.
          </p>
        </div>
      </RevealSection>

      <!-- education -->
      <RevealSection :delay="1" class="row">
        <p class="row-label">Education</p>
        <div class="min-w-0">
          <div class="role-head">
            <span class="font-semibold text-text-h">Elon University</span>
            <span class="whitespace-nowrap font-mono text-[0.85rem] text-text">2018 - 2022</span>
          </div>
          <p class="m-0 text-text">B.S. Computer Science, Data Science Minor &middot; Elon, NC</p>
        </div>
      </RevealSection>
    </div>
  </section>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2.5rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--border);
}

.row-label {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.role-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.6rem;
}

@media (max-width: 760px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1.75rem 0;
  }
}
</style>
