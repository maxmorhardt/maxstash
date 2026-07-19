import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
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
