import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from './theme';

describe('theme store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('toggles dark mode and applies the dark class', () => {
    const store = useThemeStore();
    const initial = store.isDark;
    store.toggle();
    expect(store.isDark).toBe(!initial);
    expect(document.documentElement.classList.contains('dark')).toBe(!initial);
  });

  it('persists the chosen mode to localStorage', () => {
    const store = useThemeStore();
    store.set('dark');
    expect(window.localStorage.getItem('maxstash:theme')).toBe('dark');
    store.set('light');
    expect(window.localStorage.getItem('maxstash:theme')).toBe('light');
  });

  it('init applies the current value to the document', () => {
    const store = useThemeStore();
    store.set('dark');
    document.documentElement.classList.remove('dark');
    store.init();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
