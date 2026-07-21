import { vi, beforeEach } from 'vitest';
import { config } from '@vue/test-utils';
import { createHead } from '@unhead/vue/client';

beforeEach(() => {
  config.global.plugins = [createHead()];
});

// default tests to reduced motion so animations render statically
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
