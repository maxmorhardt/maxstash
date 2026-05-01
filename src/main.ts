import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import 'primeicons/primeicons.css';
import './style.css';
import App from './App.vue';
import router from './router';
import { useTheme } from './composables/useTheme';

const MaxstashPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.800}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.900}',
          activeColor: '{primary.950}',
        },
        highlight: {
          background: '{primary.800}',
          focusBackground: '{primary.900}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{primary.500}',
          contrastColor: '{surface.950}',
          hoverColor: '{primary.400}',
          activeColor: '{primary.300}',
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.500}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.500}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MaxstashPreset,
    options: {
      darkModeSelector: '.dark',
    },
  },
});

useTheme().init();

app.mount('#app');
