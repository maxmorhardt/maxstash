import { reactive, ref } from 'vue';

// localStorage key the chosen theme is persisted under
const STORAGE_KEY = 'maxstash:theme';

type ThemeMode = 'light' | 'dark';

function getInitialMode(): ThemeMode {
  // no window during SSR, so fall back to dark
  if (typeof window === 'undefined') {
    return 'dark';
  }

  // use a previously saved choice if it's valid, otherwise default to dark
  const stored = window.localStorage.getItem(STORAGE_KEY);

  return stored === 'light' || stored === 'dark' ? stored : 'dark';
}

// shared, module-scoped state so every caller reads the same theme
const isDark = ref(getInitialMode() === 'dark');

function applyClass() {
  // guard against SSR where there's no document to toggle the class on
  if (typeof document === 'undefined') {
    return;
  }

  // drive both PrimeVue and the css variables off the .dark class on <html>
  document.documentElement.classList.toggle('dark', isDark.value);
}

function set(mode: ThemeMode) {
  // update the state and reflect it on the document
  isDark.value = mode === 'dark';
  applyClass();

  // remember the choice for next visit
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }
}

function toggle() {
  // flip to the opposite mode
  set(isDark.value ? 'light' : 'dark');
}

// expose the state plus actions; init re-applies the class on app startup
const themeStore = reactive({ isDark, toggle, set, init: applyClass });

export function useTheme() {
  return themeStore;
}
