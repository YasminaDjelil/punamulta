import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createScroller } from '../src/scroller';

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let callback: Callback;
const observe = vi.fn();
const disconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((cb: Callback) => {
      callback = cb;
      return { observe, disconnect, unobserve: vi.fn() };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('createScroller', () => {
  it('observes every step', () => {
    const steps = [document.createElement('div'), document.createElement('div')];
    createScroller(steps, { onEnter: vi.fn(), onExit: vi.fn() });
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('ignores initial non-intersecting entries', () => {
    const a = document.createElement('div');
    const onExit = vi.fn();
    createScroller([a], { onEnter: vi.fn(), onExit });
    callback([{ target: a, isIntersecting: false }]);
    expect(onExit).not.toHaveBeenCalled();
  });

  it('fires enter then exit once each', () => {
    const a = document.createElement('div');
    const onEnter = vi.fn();
    const onExit = vi.fn();
    createScroller([a], { onEnter, onExit });
    callback([{ target: a, isIntersecting: true }]);
    callback([{ target: a, isIntersecting: true }]);
    callback([{ target: a, isIntersecting: false }]);
    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(onEnter).toHaveBeenCalledWith(a, 'down');
  });

  it('destroy disconnects', () => {
    const s = createScroller([], { onEnter: vi.fn(), onExit: vi.fn() });
    s.destroy();
    expect(disconnect).toHaveBeenCalled();
  });
});
