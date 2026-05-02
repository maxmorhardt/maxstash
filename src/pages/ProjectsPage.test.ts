import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectsPage from './ProjectsPage.vue';

describe('ProjectsPage', () => {
  it('renders all projects with tags and external links', () => {
    const wrapper = mount(ProjectsPage);
    expect(wrapper.text()).toContain('Projects');
    expect(wrapper.text()).toContain('squares');
    expect(wrapper.text()).toContain('squares-api');
    expect(wrapper.text()).toContain('k8s');
    expect(wrapper.text()).toContain('charts');
    expect(wrapper.text()).toContain('workflows');
    expect(wrapper.text()).toContain('maxstash');
    // Extras link block exists for projects with `links`
    expect(wrapper.text()).toContain('Live site');
    expect(wrapper.text()).toContain('Swagger');
    expect(wrapper.text()).toContain('Authentik');
  });
});
