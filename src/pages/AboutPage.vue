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
  <section class="about section">
    <div class="container about__inner">
      <!-- page heading -->
      <RevealSection as="h1" class="page-title">About</RevealSection>

      <!-- lede -->
      <RevealSection :delay="1" as="p" class="lede">
        Full Stack Engineer at Fidelity Investments, building production systems across the full
        stack, from API design and cloud infrastructure to front-end interfaces.
      </RevealSection>

      <!-- experience -->
      <RevealSection :delay="1" class="row">
        <p class="row__label">Experience</p>
        <div class="row__content">
          <div v-for="company in experience" :key="company.company" class="exp">
            <h2 class="exp__company">{{ company.company }}</h2>
            <div v-for="role in company.roles" :key="role.title" class="role">
              <div class="role__head">
                <span class="role__title">{{ role.title }}</span>
                <span class="role__period">{{ role.period }}</span>
              </div>
              <ul class="role__points">
                <li v-for="point in role.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </div>
        </div>
      </RevealSection>

      <!-- flagship project -->
      <RevealSection :delay="1" class="row">
        <p class="row__label">Project</p>
        <div class="row__content">
          <div class="role__head">
            <span class="role__title">Squares</span>
            <span class="role__period">Go &middot; React &middot; Kubernetes</span>
          </div>
          <p>
            A full-stack real-time football squares platform: a <code>Go</code> and
            <code>Gin</code> REST API behind a <code>React</code> and <code>TypeScript</code> front
            end, deployed to my self-hosted Kubernetes cluster through GitHub Actions. It implements
            a contest state machine, automated winner calculation, <code>NATS</code> pub/sub for
            horizontally scaled WebSocket broadcasting, OIDC sign-in through <code>Authentik</code>,
            and <code>PostgreSQL</code> persistence with <code>GORM</code>.
          </p>
          <div class="links">
            <a href="https://squares.maxstash.io" target="_blank" rel="noreferrer">
              <span class="pi pi-external-link" />
              <span>Live site</span>
            </a>
            <a href="https://github.com/maxmorhardt/squares" target="_blank" rel="noreferrer">
              <span class="pi pi-github" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </RevealSection>

      <!-- homelab -->
      <RevealSection :delay="1" class="row">
        <p class="row__label">Homelab platform</p>
        <div class="row__content">
          <p>
            Everything I build runs on a self-hosted <code>k3s</code> cluster:
            <code>Authentik</code> for OIDC/SAML single sign-on, highly available
            <code>PostgreSQL</code>, <code>NATS</code> messaging, and a full
            <code>Prometheus</code>, <code>Grafana</code>, and <code>Loki</code> observability
            stack. <code>Cloudflare</code> handles DNS and edge security,
            <code>kured</code> coordinates rolling node reboots, and reusable Helm charts and GitHub
            Actions workflows deploy it all over <code>Tailscale</code>.
          </p>
        </div>
      </RevealSection>

      <!-- this site -->
      <RevealSection :delay="1" class="row">
        <p class="row__label">This site</p>
        <div class="row__content">
          <p>
            A Vue 3 single-page app built with <code>Vite</code> and <code>PrimeVue</code> on a
            custom design system. Containerized with <code>Docker</code> behind <code>NGINX</code>,
            packaged into a <code>Helm</code> chart, and deployed to my Kubernetes cluster through
            the same reusable <code>GitHub Actions</code> pipeline that ships every other project
            here.
          </p>
        </div>
      </RevealSection>

      <!-- education -->
      <RevealSection :delay="1" class="row">
        <p class="row__label">Education</p>
        <div class="row__content">
          <div class="role__head">
            <span class="role__title">Elon University</span>
            <span class="role__period">2018 - 2022</span>
          </div>
          <p class="edu__detail">B.S. Computer Science, Data Science Minor &middot; Elon, NC</p>
        </div>
      </RevealSection>
    </div>
  </section>
</template>

<style scoped>
.about {
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
}

.about__inner {
  max-width: 920px;
}

.lede {
  max-width: 60ch;
  font-size: 1.15rem;
  color: var(--text);
  margin-bottom: 1rem;
}

.row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2.5rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--border);
}

.row__label {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.row__content {
  min-width: 0;
}

.row__content p {
  margin: 0;
  line-height: 1.7;
  color: var(--text);
}

.exp + .exp {
  margin-top: 1.5rem;
}

.exp__company {
  margin: 0 0 1rem;
  font-size: 1.15rem;
  color: var(--text-h);
}

.role + .role {
  margin-top: 1.5rem;
}

.role__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.6rem;
}

.role__title {
  font-weight: 600;
  color: var(--text-h);
}

.role__period {
  font-family: var(--mono);
  font-size: 0.85rem;
  color: var(--text);
  white-space: nowrap;
}

.role__points {
  margin: 0;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text);
}

.role__points li {
  line-height: 1.6;
}

.edu__detail {
  margin: 0;
  color: var(--text);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.9rem;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

@media (max-width: 760px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0.85rem;
    padding: 1.75rem 0;
  }
}
</style>
