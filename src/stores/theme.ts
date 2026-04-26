import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = 'maxstash:theme';

type ThemeMode = 'light' | 'dark';

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

function applyClass(isDark: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', isDark);
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(getInitialMode() === 'dark');

  function persist() {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
  }

  function init() {
    applyClass(isDark.value);
  }

  function toggle() {
    isDark.value = !isDark.value;
    applyClass(isDark.value);
    persist();
  }

  function set(mode: ThemeMode) {
    isDark.value = mode === 'dark';
    applyClass(isDark.value);
    persist();
  }

  return { isDark, toggle, set, init };
});
