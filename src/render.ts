import type { Chapter, Story } from './types';

export const asset = (path: string): string =>
  path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;

export function renderChapter(chapter: Chapter): HTMLElement {
  const step = document.createElement('div');
  step.id = chapter.id;
  step.className = `step ${chapter.alignment ?? 'left'}`;
  if (chapter.hidden) step.classList.add('hidden');
  if (chapter.narrow) step.classList.add('narrow');

  const card = document.createElement('article');
  card.className = 'card';

  if (chapter.kicker) {
    const k = document.createElement('p');
    k.className = 'kicker';
    k.textContent = chapter.kicker;
    card.append(k);
  }
  if (chapter.title) {
    const h = document.createElement('h2');
    h.textContent = chapter.title;
    card.append(h);
  }
  if (chapter.image) {
    const img = document.createElement('img');
    img.src = asset(chapter.image);
    img.alt = chapter.title ?? '';
    card.append(img);
  }
  if (chapter.images && chapter.images.length > 0) {
    const grid = document.createElement('div');
    grid.className = `images count-${Math.min(chapter.images.length, 3)}`;
    if (chapter.imageFit === 'contain') grid.classList.add('contain');
    for (const item of chapter.images) {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = asset(item.src);
      img.alt = item.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      if (item.focus) img.style.objectPosition = item.focus;
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.dataset.caption = item.caption ?? item.alt;
      fig.append(img);
      if (item.caption) {
        const cap = document.createElement('figcaption');
        cap.textContent = item.caption;
        fig.append(cap);
      }
      grid.append(fig);
    }
    card.append(grid);
  }
  if (chapter.description) {
    const p = document.createElement('p');
    p.className = 'desc';
    p.textContent = chapter.description;
    card.append(p);
  }
  if (chapter.hint) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = chapter.hint;
    card.append(hint);
  }

  step.append(card);
  return step;
}

export function renderStory(story: Story, root: HTMLElement): HTMLElement[] {
  root.className = `story ${story.theme}`;

  const header = document.createElement('header');
  header.className = 'story-header';
  header.id = 'cover';
  if (story.coverImage) {
    header.classList.add('has-cover');
    header.style.backgroundImage = `url(${asset(story.coverImage)})`;
  }
  const h1 = document.createElement('h1');
  h1.textContent = story.title;
  header.append(h1);
  if (story.subtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = story.subtitle;
    header.append(h2);
  }
  if (story.byline) {
    const p = document.createElement('p');
    p.className = 'byline';
    p.textContent = story.byline;
    header.append(p);
  }
  const cue = document.createElement('a');
  cue.className = 'scroll-cue';
  cue.href = `#${story.chapters[0]?.id ?? ''}`;
  cue.innerHTML = '<span>Scroll</span><i aria-hidden="true"></i>';
  header.append(cue);
  root.append(header);

  const features = document.createElement('div');
  features.id = 'features';
  const steps = story.chapters.map(renderChapter);
  features.append(...steps);
  root.append(features);

  if (story.footer) {
    const footer = document.createElement('footer');
    footer.className = 'story-footer';
    footer.textContent = story.footer;
    root.append(footer);
  }

  return steps;
}

export function renderTimeline(story: Story, root: HTMLElement): HTMLElement {
  const rail = document.createElement('nav');
  rail.className = 'timeline';
  rail.setAttribute('aria-label', 'Timeline');
  let lastYear = '';
  for (const chapter of story.chapters) {
    const item = document.createElement('a');
    item.href = `#${chapter.id}`;
    item.className = chapter.date ? 'tl-item dated' : 'tl-item';
    item.dataset.id = chapter.id;
    item.title = chapter.title ?? chapter.id;
    const year = chapter.date?.slice(0, 4) ?? '';
    if (year && year !== lastYear) {
      const label = document.createElement('span');
      label.className = 'tl-year';
      label.textContent = year;
      item.append(label);
      lastYear = year;
    }
    const dot = document.createElement('span');
    dot.className = 'tl-dot';
    item.append(dot);
    rail.append(item);
  }
  root.append(rail);
  return rail;
}
