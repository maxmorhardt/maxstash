<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <section class="not-found section">
    <div class="container">
      <!-- 404 code -->
      <h1 class="code">
        404
      </h1>
      <!-- Message -->
      <p class="lede">
        This page doesn't exist (yet).
      </p>
      <!-- Actions -->
      <div class="actions">
        <Button
          label="Go home"
          icon="pi pi-home"
          @click="router.push('/')"
        />
        <RouterLink
          to="/projects"
          class="link"
        >
          or browse projects &rarr;
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  min-height: 60svh;
  display: flex;
  align-items: center;
}

.code {
  font-size: clamp(5rem, 14vw, 10rem);
  margin: 0;
  background: linear-gradient(120deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lede {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.link {
  color: var(--accent);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
