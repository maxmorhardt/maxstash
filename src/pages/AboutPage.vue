<script setup lang="ts">
import RevealSection from '../components/common/RevealSection.vue';
</script>

<template>
  <section class="about section">
    <div class="container">
      <!-- Page heading -->
      <RevealSection as="h1">
        About
      </RevealSection>
      <!-- Lede -->
      <RevealSection
        :delay="1"
        as="p"
        class="lede"
      >
        I'm Max, a software engineer at Fidelity Investments. I like building things end-to-end,
        from the APIs and infrastructure to the interfaces people actually click on.
      </RevealSection>

      <!-- Detail cards -->
      <div class="grid">
        <RevealSection
          :delay="1"
          class="block"
        >
          <h3>Day job</h3>
          <p>
            Software engineer at <strong>Fidelity Investments</strong>, working on full-stack
            systems across <code>Java + Spring Boot</code>, <code>Angular</code>, and
            <code>Python</code> (scripting and <code>FastAPI</code> services). Everything runs on
            <code>Kubernetes</code> in <code>AWS</code>, shipped through
            <code>Jenkins</code> pipelines and monitored with <code>Datadog</code>. A healthy amount
            of <code>Bash</code> glue ties it all together.
          </p>
        </RevealSection>
        <RevealSection
          :delay="2"
          class="block"
        >
          <h3>Homelab platform</h3>
          <p>
            Everything I build runs on a self-hosted Kubernetes cluster:
            <code>Authentik</code> for OIDC/SAML, <code>CloudNativePG</code> HA,
            <code>NATS</code> messaging, and <code>Prometheus + Grafana + Loki</code>
            for observability. Reusable Helm charts and GitHub Actions workflows tie it all
            together.
          </p>
        </RevealSection>
        <RevealSection
          :delay="3"
          class="block"
        >
          <h3>This site</h3>
          <p>
            Vue 3 single-page app built with <code>Vite</code>, <code>Pinia</code>, and
            <code>PrimeVue</code> on a custom design system. Containerized with
            <code>Docker</code> behind <code>NGINX</code>, packaged into a <code>Helm</code> chart,
            and deployed to my Kubernetes cluster through the same reusable
            <code>GitHub Actions</code> pipeline that ships every other project here.
          </p>
        </RevealSection>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  width: 100%;
  padding-bottom: 1.5rem;
}

.lede {
  max-width: 60ch;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.block {
  padding: 1.75rem;
  border-radius: 14px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

.block h3 {
  margin-bottom: 0.5rem;
}
</style>
