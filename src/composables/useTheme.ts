import { reactive, ref } from 'vue';

const STORAGE_KEY = 'maxstash:theme';

type ThemeMode = 'light' | 'dark';

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

const isDark = ref(getInitialMode() === 'dark');

function applyClass() {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', isDark.value);
}

function persist() {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light');
}

function toggle() {
  isDark.value = !isDark.value;
  applyClass();
  persist();
}

function set(mode: ThemeMode) {
  isDark.value = mode === 'dark';
  applyClass();
  persist();
}

function init() {
  applyClass();
}

const themeStore = reactive({ isDark, toggle, set, init });

export function useTheme() {
  return themeStore;
}
