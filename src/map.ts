import maplibregl, { type Map, type StyleSpecification } from 'maplibre-gl';
import type { Chapter, LayerOpacity, PhotoMarker, Story } from './types';
import { opacityProps, type LayerType } from './layers';
import sites from './data/sites.json';
import { asset } from './render';
import { siteChapter } from './sites';
import finlandSites from './data/finland-sites.json';

const DEFAULT_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

export function styleUrl(): string {
  const fromEnv = import.meta.env.VITE_MAP_STYLE_URL as string | undefined;
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_STYLE;
}

export function createMap(container: HTMLElement, story: Story): Map {
  const first = story.chapters[0];
  if (!first) throw new Error('story has no chapters');
  const map = new maplibregl.Map({
    container,
    style: styleUrl() as string | StyleSpecification,
    center: first.location.center,
    zoom: first.location.zoom,
    pitch: first.location.pitch ?? 0,
    bearing: first.location.bearing ?? 0,
    interactive: false,
    attributionControl: { compact: true },
    pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
    fadeDuration: 0,
    renderWorldCopies: false,
    maxPitch: 60,
  });

  map.on('load', () => {
    for (const layer of map.getStyle().layers ?? []) {
      if (layer.type === 'fill-extrusion' || layer.id.includes('building')) {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      }
    }
    map.addSource('finland-sites', {
      type: 'geojson',
      data: finlandSites as GeoJSON.FeatureCollection,
    });
    map.addLayer({
      id: 'finland-sites',
      type: 'circle',
      source: 'finland-sites',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 2.5, 8, 4, 12, 6],
        'circle-color': '#c8452a',
        'circle-stroke-color': '#2a1208',
        'circle-stroke-width': 0.8,
        'circle-opacity': 0,
        'circle-stroke-opacity': 0,
        'circle-opacity-transition': { duration: 600 },
        'circle-stroke-opacity-transition': { duration: 600 },
      },
    });
    map.addSource('sites', { type: 'geojson', data: sites as GeoJSON.FeatureCollection });
    map.addLayer({
      id: 'sites',
      type: 'circle',
      source: 'sites',
      filter: ['!=', ['get', 'kind'], 'lab'],
      paint: {
        'circle-radius': 7,
        'circle-color': '#e8c170',
        'circle-stroke-color': '#2a1208',
        'circle-stroke-width': 1.5,
        'circle-opacity': 0,
        'circle-stroke-opacity': 0,
        'circle-opacity-transition': { duration: 600 },
        'circle-stroke-opacity-transition': { duration: 600 },
      },
    });
    map.addLayer({
      id: 'lab',
      type: 'circle',
      source: 'sites',
      filter: ['==', ['get', 'kind'], 'lab'],
      paint: {
        'circle-radius': 7,
        'circle-color': '#4a7fb5',
        'circle-stroke-color': '#0f1a26',
        'circle-stroke-width': 1.5,
        'circle-opacity': 0,
        'circle-stroke-opacity': 0,
        'circle-opacity-transition': { duration: 600 },
        'circle-stroke-opacity-transition': { duration: 600 },
      },
    });
    map.addLayer({
      id: 'sites-label',
      type: 'symbol',
      source: 'sites',
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 13,
        'text-offset': [0, 1.1],
        'text-anchor': 'top',
        'text-font': ['Noto Sans Bold'],
      },
      paint: {
        'text-color': '#1a1208',
        'text-halo-color': '#f6f1e6',
        'text-halo-width': 1.4,
        'text-opacity': 0,
        'text-opacity-transition': { duration: 600 },
      },
    });
    if (story.showMarkers) {
      new maplibregl.Marker({ color: story.markerColor ?? '#e8c170' })
        .setLngLat(first.location.center)
        .addTo(map);
    }
  });

  return map;
}

export function setLayerOpacity(map: Map, item: LayerOpacity): void {
  const layer = map.getLayer(item.layer);
  if (!layer) return;
  const props = opacityProps(layer.type as LayerType);
  for (const prop of props) {
    map.setPaintProperty(item.layer, `${prop}-transition`, { duration: item.duration ?? 500 });
    map.setPaintProperty(item.layer, prop, item.opacity);
  }
}

const photoMarkers: maplibregl.Marker[] = [];
let siteSelect: ((chapterId: string) => void) | null = null;

const SITE_LAYERS = ['sites', 'lab', 'sites-label'] as const;

function layerVisible(map: Map, id: string): boolean {
  const layer = map.getLayer(id);
  if (!layer) return false;
  const prop = layer.type === 'symbol' ? 'text-opacity' : 'circle-opacity';
  return Number(map.getPaintProperty(id, prop) ?? 0) > 0;
}

export function onSiteSelect(map: Map, cb: (chapterId: string) => void): void {
  siteSelect = cb;
  const bind = (): void => {
    for (const id of SITE_LAYERS) {
      map.on('mouseenter', id, () => {
        if (layerVisible(map, id)) map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', id, () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('click', id, (e) => {
        if (!layerVisible(map, id)) return;
        const target = siteChapter(e.features?.[0]?.properties ?? null);
        if (target) cb(target);
      });
    }
  };
  if (map.loaded()) bind();
  else map.once('load', bind);
}

function siteFeature(siteId: string): GeoJSON.Feature | undefined {
  return (sites as GeoJSON.FeatureCollection).features.find((x) => x.properties?.id === siteId);
}

function siteProps(siteId: string): GeoJSON.GeoJsonProperties {
  return siteFeature(siteId)?.properties ?? null;
}

function siteCoords(siteId: string): [number, number] | undefined {
  const g = siteFeature(siteId)?.geometry as GeoJSON.Point | undefined;
  return g ? [g.coordinates[0] ?? 0, g.coordinates[1] ?? 0] : undefined;
}

export function showPhotoMarkers(map: Map, items: PhotoMarker[]): void {
  clearPhotoMarkers();
  for (const item of items) {
    const at = siteCoords(item.siteId);
    if (!at) continue;
    const el = document.createElement('div');
    el.className = `photo-marker anchor-${item.anchor ?? 'bottom'}`;
    el.tabIndex = 0;
    el.setAttribute('role', 'link');
    el.setAttribute('aria-label', `${item.label}: go to chapter`);
    const img = document.createElement('img');
    img.src = asset(item.src);
    img.alt = item.label;
    img.loading = 'lazy';
    const cap = document.createElement('span');
    cap.textContent = item.label;
    el.append(img, cap);
    const go = (): void => {
      siteSelect?.(siteChapter(siteProps(item.siteId)) ?? item.siteId);
    };
    el.addEventListener('click', go);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
    const m = new maplibregl.Marker({
      element: el,
      anchor: item.anchor ?? 'bottom',
      offset: [0, -10],
    })
      .setLngLat(at)
      .addTo(map);
    photoMarkers.push(m);
  }
}

let pulse: maplibregl.Marker | null = null;

export function setPulse(map: Map, at: [number, number] | null): void {
  if (!at) {
    pulse?.remove();
    pulse = null;
    return;
  }
  if (!pulse) {
    const el = document.createElement('div');
    el.className = 'pulse';
    pulse = new maplibregl.Marker({ element: el, anchor: 'center' });
  }
  pulse.setLngLat(at).addTo(map);
}

export function clearPhotoMarkers(): void {
  for (const m of photoMarkers) m.remove();
  photoMarkers.length = 0;
}

export function paddingFor(step: HTMLElement): maplibregl.PaddingOptions {
  const card = step.querySelector<HTMLElement>('.card');
  const rail =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rail')) || 0;
  const pad = { top: 0, bottom: 0, left: 0, right: rail };
  if (!card) return pad;
  const r = card.getBoundingClientRect();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const gap = 24;
  if (step.classList.contains('left')) pad.left = Math.min(r.right + gap, w * 0.7);
  else if (step.classList.contains('right')) pad.right = Math.min(w - r.left + gap, w * 0.7);
  else {
    const above = r.top;
    const left = r.left;
    const right = w - rail - r.right;
    if (above >= 140) pad.bottom = Math.min(h - above + gap, h * 0.85);
    else if (Math.max(left, right) >= 120) {
      if (left >= right) pad.right = Math.min(w - left, w * 0.88);
      else pad.left = Math.min(w - right - rail, w * 0.88);
    }
  }
  return pad;
}

export function goToChapter(
  map: Map,
  chapter: Chapter,
  step?: HTMLElement,
  marker?: maplibregl.Marker,
): void {
  map.setPadding(step ? paddingFor(step) : { top: 0, bottom: 0, left: 0, right: 0 });
  const opts = { ...chapter.location, essential: true, speed: 1.6, curve: 1.2 };
  switch (chapter.mapAnimation ?? 'flyTo') {
    case 'jumpTo':
      map.jumpTo(opts);
      break;
    case 'easeTo':
      map.easeTo(opts);
      break;
    default:
      map.flyTo(opts);
  }
  marker?.setLngLat(chapter.location.center);
  if (chapter.rotateAnimation) {
    map.once('moveend', () => {
      const bearing = (chapter.location.bearing ?? 0) + 180;
      map.rotateTo(bearing, { duration: 12000, easing: (t) => t });
    });
  }
}
