<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import RevealSection from '../components/common/RevealSection.vue';

const router = useRouter();

const stack = [
  { name: 'Java + Spring Boot', icon: 'pi pi-server' },
  { name: 'Go + Gin', icon: 'pi pi-bolt' },
  { name: 'Python + FastAPI', icon: 'pi pi-code' },
  { name: 'Bash', icon: 'pi pi-code' },
  { name: 'TypeScript', icon: 'pi pi-code' },
  { name: 'Angular', icon: 'pi pi-code' },
  { name: 'React', icon: 'pi pi-prime' },
  { name: 'Vue 3', icon: 'pi pi-code' },
  { name: 'PostgreSQL', icon: 'pi pi-database' },
  { name: 'NATS', icon: 'pi pi-sync' },
  { name: 'WebSockets', icon: 'pi pi-bolt' },
  { name: 'EKS', icon: 'pi pi-server' },
  { name: 'AWS', icon: 'pi pi-cloud' },
  { name: 'Kubernetes', icon: 'pi pi-server' },
  { name: 'Helm', icon: 'pi pi-box' },
  { name: 'Docker', icon: 'pi pi-box' },
  { name: 'Jenkins', icon: 'pi pi-cog' },
  { name: 'GitHub Actions', icon: 'pi pi-github' },
  { name: 'Authentik (OIDC)', icon: 'pi pi-shield' },
  { name: 'Datadog', icon: 'pi pi-chart-line' },
  { name: 'Prometheus', icon: 'pi pi-chart-line' },
  { name: 'Grafana', icon: 'pi pi-chart-bar' },
  { name: 'Loki + Alloy', icon: 'pi pi-list' },
];

const highlights = [
  {
    title: 'Full-stack engineering',
    body: 'Go + Gin APIs and TypeScript front-ends (React and Vue), designed, tested, and shipped end-to-end.',
    icon: 'pi pi-sitemap',
  },
  {
    title: 'Real-time systems',
    body: 'WebSockets backed by NATS pub/sub for horizontally-scaled, cross-instance broadcasting.',
    icon: 'pi pi-bolt',
  },
  {
    title: 'Self-hosted platform',
    body: 'Self-hosted Kubernetes cluster running Authentik, PostgreSQL HA, Prometheus/Grafana/Loki, and GitHub-Actions-driven CI/CD.',
    icon: 'pi pi-server',
  },
];

const featured = [
  {
    name: 'squares',
    blurb: 'Web app for playing Super Bowl squares with friends in real time.',
    href: 'https://github.com/maxmorhardt/squares',
    tags: ['React', 'TypeScript', 'Redux', 'MUI', 'OIDC', 'WebSocket'],
  },
  {
    name: 'squares-api',
    blurb: 'Backend API that powers the Super Bowl squares game.',
    href: 'https://github.com/maxmorhardt/squares-api',
    tags: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'NATS', 'OIDC', 'Swagger'],
  },
  {
    name: 'k8s',
    blurb: 'Self-hosted Kubernetes cluster that runs every app on this site.',
    href: 'https://github.com/maxmorhardt/k8s',
    tags: ['Kubernetes', 'Authentik', 'PostgreSQL', 'NATS', 'Prometheus', 'Grafana', 'Loki'],
  },
  {
    name: 'charts',
    blurb: 'Reusable Helm charts shared across all my app deployments.',
    href: 'https://github.com/maxmorhardt/charts',
    tags: ['Helm', 'Kubernetes', 'HPA', 'Ingress', 'Prometheus'],
  },
  {
    name: 'workflows',
    blurb: 'Reusable GitHub Actions workflows that build, test, and deploy every other repo.',
    href: 'https://github.com/maxmorhardt/workflows',
    tags: ['GitHub Actions', 'Docker', 'Helm', 'Trivy', 'Tailscale'],
  },
  {
    name: 'maxstash',
    blurb: 'This portfolio site.',
    href: 'https://github.com/maxmorhardt/maxstash',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'PrimeVue'],
  },
];
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero full-bleed">
      <div
        class="hero__bg"
        aria-hidden="true"
      >
        <div class="glow glow--1" />
        <div class="glow glow--2" />
        <div class="grid-overlay" />
      </div>
      <div class="container hero__inner">
        <RevealSection class="hero__eyebrow">
          <span class="dot" /> Open to Conversations
        </RevealSection>
        <RevealSection
          :delay="1"
          as="h1"
        >
          Hi, I'm <span class="grad">Max</span>.<br>
          I design and ship <span class="grad">full-stack</span> software.
        </RevealSection>
        <RevealSection
          :delay="2"
          as="p"
          class="hero__lede"
        >
          Software engineer at Fidelity Investments. Day to day I work in Java + Spring Boot,
          Angular, React, and Python on Kubernetes in AWS, shipped through Jenkins and watched with
          Datadog. Outside of work I do the same thing with Go on a self-hosted Kubernetes platform.
        </RevealSection>
        <RevealSection
          :delay="3"
          class="hero__cta"
        >
          <Button
            label="See Projects"
            icon="pi pi-arrow-right"
            icon-pos="right"
            @click="router.push('/projects')"
          />
          <Button
            label="About me"
            severity="secondary"
            outlined
            @click="router.push('/about')"
          />
        </RevealSection>
      </div>
      <div
        class="hero__scroll"
        aria-hidden="true"
      >
        <span class="pi pi-chevron-down" />
      </div>
    </section>

    <!-- Highlights -->
    <section class="section highlights full-bleed">
      <div class="container">
        <RevealSection
          as="h2"
          class="section__title"
        >
          What I do
        </RevealSection>
        <RevealSection
          :delay="1"
          as="p"
          class="section__lede"
        >
          A few areas where I spend most of my engineering time.
        </RevealSection>
        <div class="cards">
          <RevealSection
            v-for="(h, i) in highlights"
            :key="h.title"
            :delay="(i + 1) as 1 | 2 | 3"
            class="card"
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

    <!-- Ecosystem -->
    <section class="section ecosystem full-bleed">
      <div class="container">
        <RevealSection
          as="h2"
          class="section__title"
        >
          The stack, end to end
        </RevealSection>
        <RevealSection
          :delay="1"
          as="p"
          class="section__lede"
        >
          One example: the squares game ships across six repos that all share the same homelab
          platform.
        </RevealSection>

        <div class="flow">
          <RevealSection
            :delay="1"
            class="flow__node"
          >
            <span class="pi pi-desktop" />
            <strong>squares</strong>
            <span class="muted">React + Redux UI</span>
          </RevealSection>
          <span
            class="flow__arrow"
            aria-hidden="true"
          >&rarr;</span>
          <RevealSection
            :delay="2"
            class="flow__node"
          >
            <span class="pi pi-bolt" />
            <strong>squares-api</strong>
            <span class="muted">Go + Gin + Postgres + NATS</span>
          </RevealSection>
          <span
            class="flow__arrow"
            aria-hidden="true"
          >&rarr;</span>
          <RevealSection
            :delay="3"
            class="flow__node"
          >
            <span class="pi pi-server" />
            <strong>k8s</strong>
            <span class="muted">Kubernetes + Authentik + observability</span>
          </RevealSection>
        </div>

        <RevealSection
          :delay="2"
          as="p"
          class="flow__caption"
        >
          Packaged with <strong>charts</strong> (Helm) and shipped via reusable
          <strong>workflows</strong> (GitHub Actions). Authenticated with
          <strong>Authentik</strong>, observed with Prometheus + Grafana + Loki.
        </RevealSection>
      </div>
    </section>

    <!-- Stack chips -->
    <section class="section stack full-bleed">
      <div class="container">
        <RevealSection
          as="h2"
          class="section__title"
        >
          Tools of the trade
        </RevealSection>
        <RevealSection
          :delay="1"
          as="p"
          class="section__lede"
        >
          Day-to-day languages, frameworks, and platforms.
        </RevealSection>
        <RevealSection
          :delay="2"
          class="chips"
        >
          <span
            v-for="item in stack"
            :key="item.name"
            class="chip"
          >
            <span :class="item.icon" />
            <span>{{ item.name }}</span>
          </span>
        </RevealSection>
      </div>
    </section>

    <!-- Featured projects -->
    <section class="section featured full-bleed">
      <div class="container">
        <RevealSection
          as="h2"
          class="section__title"
        >
          Featured work
        </RevealSection>
        <RevealSection
          :delay="1"
          as="p"
          class="section__lede"
        >
          A small slice of recent projects. More on the
          <RouterLink to="/projects">
            projects page
          </RouterLink>.
        </RevealSection>
        <div class="featured__grid">
          <RevealSection
            v-for="(project, i) in featured.slice(0, 3)"
            :key="project.name"
            :delay="(i + 1) as 1 | 2 | 3"
            class="project"
          >
            <div class="project__head">
              <h3>{{ project.name }}</h3>
              <a
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                aria-label="View on GitHub"
              >
                <span class="pi pi-github" />
              </a>
            </div>
            <p>{{ project.blurb }}</p>
            <ul class="tags">
              <li
                v-for="tag in project.tags"
                :key="tag"
              >
                {{ tag }}
              </li>
            </ul>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta full-bleed">
      <div class="container cta__inner">
        <RevealSection as="h2">
          Let's build something.
        </RevealSection>
        <RevealSection
          :delay="1"
          as="p"
        >
          Have a project in mind, or just want to say hi? My inbox is open.
        </RevealSection>
        <RevealSection :delay="2">
          <Button
            label="Get in touch"
            icon="pi pi-envelope"
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
  min-height: calc(100svh - 80px);
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 4rem 0 6rem;
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

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
  opacity: 0.35;
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

.hero__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  text-align: left;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  background: var(--accent-bg);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-bg);
}

.grad {
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__lede {
  max-width: 60ch;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  color: var(--text);
}

.hero__cta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.card {
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
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
}

.chip:hover {
  border-color: var(--accent-border);
  color: var(--accent);
}

.featured {
  background: var(--bg-soft);
  border-block: 1px solid var(--border);
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.flow {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: stretch;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.flow__node {
  flex: 1 1 220px;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  padding: 1.25rem 1rem;
  border-radius: 14px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

.flow__node :first-child {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.flow__node strong {
  color: var(--text-h);
  font-family: var(--mono);
  font-size: 0.95rem;
}

.flow__node .muted {
  font-size: 0.8125rem;
  opacity: 0.75;
}

.flow__arrow {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: var(--accent);
  opacity: 0.6;
}

.flow__caption {
  text-align: center;
  max-width: 70ch;
  margin: 0 auto;
  color: var(--text);
}

.flow__caption strong {
  color: var(--text-h);
  font-family: var(--mono);
  font-size: 0.9em;
}

@media (max-width: 720px) {
  .flow {
    flex-direction: column;
    align-items: stretch;
  }

  .flow__node {
    flex: 0 0 auto;
    max-width: none;
    width: 100%;
    padding: 1rem;
  }

  .flow__arrow {
    align-self: center;
    transform: rotate(90deg);
  }
}

.project {
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.project:hover {
  transform: translateY(-4px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow);
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
