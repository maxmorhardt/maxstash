import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('primevue') || id.includes('@primeuix') || id.includes('primeicons')) {
              return 'primevue';
            }
            if (id.includes('vue-router') || /[\\/]vue[\\/]/.test(id)) {
              return 'vue-vendor';
            }
          }
        },
      },
    },
  },
});
