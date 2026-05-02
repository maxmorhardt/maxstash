import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useScrollReveal } from './useScrollReveal';

const TestComponent = defineComponent({
  setup() {
    const { target, visible } = useScrollReveal<HTMLDivElement>();
    return { target, visible };
  },
  render() {
    return h('div', { ref: 'target' }, this.visible ? 'visible' : 'hidden');
  },
});

describe('useScrollReveal', () => {
  const originalIO = globalThis.IntersectionObserver;

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    vi.restoreAllMocks();
  });

  it('falls back to visible=true when IntersectionObserver is missing', async () => {
    // @ts-expect-error force-delete
    delete globalThis.IntersectionObserver;
    const wrapper = mount(TestComponent, { attachTo: document.body });
    await nextTick();
    expect(wrapper.text()).toBe('visible');
    wrapper.unmount();
  });

  it('sets visible=true when an entry intersects, then disconnects', async () => {
    let savedCallback: IntersectionObserverCallback = () => {};
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();

    class MockIO {
      constructor(cb: IntersectionObserverCallback) {
        savedCallback = cb;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    }
    // @ts-expect-error mock
    globalThis.IntersectionObserver = MockIO;

    const wrapper = mount(TestComponent, { attachTo: document.body });
    await nextTick();
    expect(observe).toHaveBeenCalledTimes(1);

    const fakeEntry = {
      isIntersecting: true,
      target: wrapper.element,
    } as unknown as IntersectionObserverEntry;
    savedCallback([fakeEntry], {} as IntersectionObserver);
    await nextTick();
    expect(wrapper.text()).toBe('visible');
    expect(unobserve).toHaveBeenCalledWith(wrapper.element);

    wrapper.unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it('toggles visible off when not intersecting and once=false', async () => {
    let savedCallback: IntersectionObserverCallback = () => {};
    class MockIO {
      constructor(cb: IntersectionObserverCallback) {
        savedCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    // @ts-expect-error mock
    globalThis.IntersectionObserver = MockIO;

    const Comp = defineComponent({
      setup() {
        const { target, visible } = useScrollReveal<HTMLDivElement>({ once: false });
        return { target, visible };
      },
      render() {
        return h('div', { ref: 'target' }, this.visible ? 'visible' : 'hidden');
      },
    });

    const wrapper = mount(Comp, { attachTo: document.body });
    await nextTick();

    savedCallback(
      [{ isIntersecting: true, target: wrapper.element } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    await nextTick();
    expect(wrapper.text()).toBe('visible');

    savedCallback(
      [{ isIntersecting: false, target: wrapper.element } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
    await nextTick();
    expect(wrapper.text()).toBe('hidden');

    wrapper.unmount();
  });

  it('does nothing on mount when target is null', async () => {
    const observe = vi.fn();
    class MockIO {
      observe = observe;
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    // @ts-expect-error mock
    globalThis.IntersectionObserver = MockIO;

    const Comp = defineComponent({
      setup() {
        const { visible } = useScrollReveal<HTMLDivElement>();
        return { visible };
      },
      render() {
        return h('div', this.visible ? 'visible' : 'hidden');
      },
    });

    const wrapper = mount(Comp);
    await nextTick();
    expect(observe).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  beforeEach(() => {
    // ensure no leftover observer from earlier test
  });
});
