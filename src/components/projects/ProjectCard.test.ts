import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectCard from './ProjectCard.vue';
import type { Project } from './ProjectCard.vue';

const project: Project = {
  name: 'squares',
  category: 'Frontend',
  description: 'Real-time NFL squares platform.',
  href: 'https://github.com/maxmorhardt/squares',
  links: [{ label: 'Live site', href: 'https://squares.maxstash.io', icon: 'pi pi-external-link' }],
  tags: ['React', 'TypeScript'],
};

describe('ProjectCard', () => {
  it('renders the project name, category, description, and tags', () => {
    const wrapper = mount(ProjectCard, { props: { project } });
    expect(wrapper.text()).toContain('squares');
    expect(wrapper.text()).toContain('Frontend');
    expect(wrapper.text()).toContain('Real-time NFL squares platform.');
    expect(wrapper.text()).toContain('React');
    expect(wrapper.text()).toContain('TypeScript');
  });

  it('links to the repository and any extra links', () => {
    const wrapper = mount(ProjectCard, { props: { project } });
    const hrefs = wrapper.findAll('a').map((a) => a.attributes('href'));
    expect(hrefs).toContain('https://github.com/maxmorhardt/squares');
    expect(hrefs).toContain('https://squares.maxstash.io');
  });

  it('omits the links footer when a project has no links', () => {
    const wrapper = mount(ProjectCard, { props: { project: { ...project, links: undefined } } });
    expect(wrapper.text()).not.toContain('Live site');
  });
});
