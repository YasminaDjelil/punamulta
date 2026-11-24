import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';
import { story } from './story';
import {
  clearPhotoMarkers,
  createMap,
  goToChapter,
  onSiteSelect,
  setLayerOpacity,
  setPulse,
  showPhotoMarkers,
} from './map';
import { renderStory, renderTimeline } from './render';
import { createScroller } from './scroller';
import type { LayerOpacity } from './types';

const mapEl = document.getElementById('map');
const storyEl = document.getElementById('story');
if (!mapEl || !storyEl) throw new Error('missing #map or #story');

const map = createMap(mapEl, story);
const steps = renderStory(story, storyEl);
const timeline = renderTimeline(story, document.body);

function setTimelineActive(id: string | null): void {
  for (const a of timeline.querySelectorAll<HTMLElement>('.tl-item')) {
    a.classList.toggle('active', a.dataset.id === id);
  }
  timeline.classList.toggle('visible', id !== null);
}

const byId = new Map(story.chapters.map((c) => [c.id, c]));

function jumpToChapter(id: string): void {
  if (!byId.has(id)) return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

for (const a of timeline.querySelectorAll<HTMLAnchorElement>('.tl-item')) {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    jumpToChapter(a.dataset.id ?? '');
  });
}
onSiteSelect(map, jumpToChapter);

map.on('error', (e) => console.error('map error', e.error));

let styleReady = false;
const pending: LayerOpacity[][] = [];
map.on('load', () => {
  styleReady = true;
  for (const items of pending) items.forEach((item) => setLayerOpacity(map, item));
  pending.length = 0;
});

function applyOpacity(items: LayerOpacity[]): void {
  if (items.length === 0) return;
  if (styleReady) items.forEach((item) => setLayerOpacity(map, item));
  else pending.push(items);
}

let lastIndex = -1;

createScroller(steps, {
  onEnter(el) {
    const chapter = byId.get(el.id);
    if (!chapter) return;
    el.classList.add('active');
    setTimelineActive(chapter.id);
    setPulse(map, chapter.location.zoom >= 9 ? chapter.location.center : null);
    goToChapter(map, chapter, el);
    const index = story.chapters.indexOf(chapter);
    if (index > lastIndex + 1) {
      for (let i = lastIndex + 1; i < index; i += 1) {
        applyOpacity(story.chapters[i]?.onChapterEnter ?? []);
      }
    }
    lastIndex = index;
    applyOpacity(chapter.onChapterEnter ?? []);
    if (chapter.photoMarkers) showPhotoMarkers(map, chapter.photoMarkers);
    else clearPhotoMarkers();
  },
  onExit(el) {
    const chapter = byId.get(el.id);
    if (!chapter) return;
    el.classList.remove('active');
    if (!document.querySelector('.step.active')) setTimelineActive(null);
    applyOpacity(chapter.onChapterExit ?? []);
  },
});

const slides: HTMLElement[] = [
  ...Array.from(storyEl.querySelectorAll<HTMLElement>('.story-header, .step, .story-footer')),
];

function currentSlide(): number {
  const y = window.scrollY + window.innerHeight / 2;
  let best = 0;
  slides.forEach((el, i) => {
    if (el.offsetTop <= y) best = i;
  });
  return best;
}

window.addEventListener('keydown', (e) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
  if (lightbox && !lightbox.hidden) return;
  const next = ['ArrowDown', 'PageDown', ' ', 'ArrowRight'];
  const prev = ['ArrowUp', 'PageUp', 'ArrowLeft'];
  let delta = 0;
  if (next.includes(e.key)) delta = 1;
  else if (prev.includes(e.key)) delta = -1;
  else return;
  e.preventDefault();
  const i = Math.min(slides.length - 1, Math.max(0, currentSlide() + delta));
  slides[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const progress = document.getElementById('progress');
const counter = document.querySelector<HTMLElement>('.slide-counter');
const total = slides.length;

function updateChrome(): void {
  const i = currentSlide();
  if (progress) progress.style.transform = `scaleX(${i / (total - 1)})`;
  if (counter) counter.textContent = `${i + 1} / ${total}`;
  document.body.classList.toggle('on-cover', i === 0);
}
window.addEventListener('scroll', updateChrome, { passive: true });
updateChrome();

for (const btn of document.querySelectorAll<HTMLButtonElement>('.slide-nav button')) {
  btn.addEventListener('click', () => {
    const delta = Number(btn.dataset.dir);
    const i = Math.min(total - 1, Math.max(0, currentSlide() + delta));
    slides[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

const lightbox = document.querySelector<HTMLElement>('.lightbox');
const lbImg = lightbox?.querySelector('img');
const lbCap = lightbox?.querySelector('figcaption');
let lbOpener: HTMLElement | null = null;

function openLightbox(img: HTMLImageElement): void {
  if (!lightbox || !lbImg || !lbCap) return;
  lbOpener = img;
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = img.dataset.caption ?? '';
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add('open'));
  lightbox.querySelector<HTMLElement>('.lightbox-close')?.focus();
}

function closeLightbox(): void {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  window.setTimeout(() => {
    lightbox.hidden = true;
    lbOpener?.focus();
  }, 180);
}

storyEl.addEventListener('click', (e) => {
  const img = (e.target as HTMLElement).closest<HTMLImageElement>('.card .images img');
  if (img) openLightbox(img);
});
storyEl.addEventListener('keydown', (e) => {
  const img = (e.target as HTMLElement).closest<HTMLImageElement>('.card .images img');
  if (img && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openLightbox(img);
  }
});
lightbox?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('.lightbox-close') || e.target === lightbox)
    closeLightbox();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
});

const target = location.hash.slice(1);
if (target && byId.has(target)) {
  document.getElementById(target)?.scrollIntoView({ block: 'start' });
}
