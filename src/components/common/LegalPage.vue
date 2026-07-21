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
  <section class="layout-section pt-12">
    <div class="mx-auto box-border w-full max-w-[760px] px-6">
      <h1 class="page-title">{{ title }}</h1>
      <p class="mb-10 text-text opacity-70">Last updated: {{ lastUpdated }}</p>

      <div v-for="section in sections" :key="section.title" class="mb-8">
        <h2 class="mb-2 text-[1.15rem]">{{ section.title }}</h2>
        <template v-if="Array.isArray(section.content)">
          <p v-if="section.content.length > 0" class="leading-[1.7] text-text">
            {{ section.content[0] }}
          </p>
          <ul v-if="section.content.length > 1" class="mt-2 mb-0 list-disc pl-5">
            <li
              v-for="item in section.content.slice(1)"
              :key="item"
              class="leading-[1.7] text-text"
            >
              {{ item }}
            </li>
          </ul>
        </template>
        <p v-else class="leading-[1.7] text-text">{{ section.content }}</p>
      </div>
    </div>
  </section>
</template>
