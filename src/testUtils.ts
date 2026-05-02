import { createMemoryHistory, createRouter, type Router } from 'vue-router';

export function createTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/projects', name: 'projects', component: { template: '<div />' } },
      { path: '/about', name: 'about', component: { template: '<div />' } },
      { path: '/contact', name: 'contact', component: { template: '<div />' } },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: '<div />' } },
    ],
  });
}

export const stubGlobals = {
  stubs: {
    Button: {
      props: ['label', 'icon'],
      emits: ['click'],
      template:
        '<button @click="$emit(\'click\', $event)"><span v-if="label">{{ label }}</span><slot /></button>',
    },
    Menubar: {
      props: ['model'],
      template:
        '<div class="menubar"><slot name="start" /><template v-for="item in model" :key="item.label"><slot name="item" :item="item" :props="{ action: {} }" /></template><slot name="end" /></div>',
    },
  },
};
