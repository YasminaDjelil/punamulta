import { describe, expect, it } from 'vitest';
import { story } from '../src/story';
import sites from '../src/data/sites.json';
import { siteChapter } from '../src/sites';

describe('story config', () => {
  it('has unique chapter ids', () => {
    const ids = story.chapters.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has valid camera values', () => {
    for (const c of story.chapters) {
      const [lng, lat] = c.location.center;
      expect(lng).toBeGreaterThanOrEqual(-180);
      expect(lng).toBeLessThanOrEqual(180);
      expect(lat).toBeGreaterThanOrEqual(-90);
      expect(lat).toBeLessThanOrEqual(90);
      expect(c.location.zoom).toBeGreaterThanOrEqual(0);
      expect(c.location.zoom).toBeLessThanOrEqual(24);
      expect(c.location.pitch ?? 0).toBeGreaterThanOrEqual(0);
      expect(c.location.pitch ?? 0).toBeLessThanOrEqual(85);
    }
  });

  it('site ids are unique and inside Finland', () => {
    const ids = sites.features.map((f) => String(f.properties?.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of sites.features) {
      const [lng, lat] = (f.geometry as GeoJSON.Point).coordinates;
      expect(lng).toBeGreaterThan(19);
      expect(lng).toBeLessThan(32);
      expect(lat).toBeGreaterThan(59);
      expect(lat).toBeLessThan(71);
    }
  });

  it('every site resolves to a chapter', () => {
    const ids = new Set(story.chapters.map((c) => c.id));
    for (const f of sites.features) {
      const target = siteChapter(f.properties);
      expect(target, f.properties.id).toBeDefined();
      expect(ids.has(target ?? '')).toBe(true);
    }
  });
});
