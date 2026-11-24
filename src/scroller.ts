export type Direction = 'down' | 'up';

export interface ScrollerOptions {
  onEnter: (el: HTMLElement, direction: Direction) => void;
  onExit: (el: HTMLElement, direction: Direction) => void;
}

export interface Scroller {
  destroy: () => void;
}

export function createScroller(steps: HTMLElement[], opts: ScrollerOptions): Scroller {
  let lastY = window.scrollY;
  const active = new Set<Element>();

  const observer = new IntersectionObserver(
    (entries) => {
      const y = window.scrollY;
      const direction: Direction = y >= lastY ? 'down' : 'up';
      lastY = y;
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          if (active.has(el)) continue;
          active.add(el);
          opts.onEnter(el, direction);
        } else if (active.has(el)) {
          active.delete(el);
          opts.onExit(el, direction);
        }
      }
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  );

  for (const el of steps) observer.observe(el);

  return { destroy: () => observer.disconnect() };
}
