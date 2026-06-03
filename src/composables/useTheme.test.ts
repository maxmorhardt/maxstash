import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    useTheme().set('dark');
    document.documentElement.classList.remove('dark');
    window.localStorage.clear();
  });

  it('toggles dark mode and applies the dark class', () => {
    const theme = useTheme();
    const initial = theme.isDark;
    theme.toggle();
    expect(theme.isDark).toBe(!initial);
    expect(document.documentElement.classList.contains('dark')).toBe(!initial);
  });

  it('persists the chosen mode to localStorage', () => {
    const theme = useTheme();
    theme.set('dark');
    expect(window.localStorage.getItem('maxstash:theme')).toBe('dark');
    theme.set('light');
    expect(window.localStorage.getItem('maxstash:theme')).toBe('light');
  });

  it('init applies the current value to the document', () => {
    const theme = useTheme();
    theme.set('dark');
    document.documentElement.classList.remove('dark');
    theme.init();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('uses a saved light theme on first load', async () => {
    vi.resetModules();
    window.localStorage.setItem('maxstash:theme', 'light');
    const mod = await import('./useTheme');
    expect(mod.useTheme().isDark).toBe(false);
  });

  it('falls back to dark for an invalid saved value', async () => {
    vi.resetModules();
    window.localStorage.setItem('maxstash:theme', 'nonsense');
    const mod = await import('./useTheme');
    expect(mod.useTheme().isDark).toBe(true);
  });
});
