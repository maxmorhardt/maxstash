<script setup lang="ts">
export interface LegalSection {
  title: string;
  content: string | string[];
}

defineProps<{
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}>();
</script>

<template>
  <section class="legal section">
    <div class="container">
      <h1 class="page-title">{{ title }}</h1>
      <p class="updated">Last updated: {{ lastUpdated }}</p>

      <div v-for="section in sections" :key="section.title" class="block">
        <h2>{{ section.title }}</h2>
        <template v-if="Array.isArray(section.content)">
          <p v-if="section.content.length > 0">{{ section.content[0] }}</p>
          <ul v-if="section.content.length > 1">
            <li v-for="item in section.content.slice(1)" :key="item">{{ item }}</li>
          </ul>
        </template>
        <p v-else>{{ section.content }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal {
  padding-top: 3rem;
}

.container {
  max-width: 760px;
}

.updated {
  color: var(--text);
  opacity: 0.7;
  margin-bottom: 2.5rem;
}

.block {
  margin-bottom: 2rem;
}

.block h2 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.block p,
.block li {
  color: var(--text);
  line-height: 1.7;
}

.block ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
}
</style>
