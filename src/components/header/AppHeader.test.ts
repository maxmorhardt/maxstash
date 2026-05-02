import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppHeader from './AppHeader.vue';
import { createTestRouter, stubGlobals } from '../../testUtils';
import { useTheme } from '../../composables/useTheme';

describe('AppHeader', () => {
  it('renders nav links and toggles theme', async () => {
    const router = createTestRouter();
    router.push('/');
    await router.isReady();
    const wrapper = mount(AppHeader, {
      global: { plugins: [router], stubs: stubGlobals.stubs },
    });
    expect(wrapper.text()).toContain('maxstash');
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('Projects');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('Contact');

    const theme = useTheme();
    const before = theme.isDark;
    await wrapper.find('button').trigger('click');
    expect(theme.isDark).toBe(!before);
  });
});
