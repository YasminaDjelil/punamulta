import { describe, expect, it } from 'vitest';
import { opacityProps } from '../src/layers';

describe('opacityProps', () => {
  it('maps simple layer types', () => {
    expect(opacityProps('fill')).toEqual(['fill-opacity']);
    expect(opacityProps('circle')).toEqual(['circle-opacity', 'circle-stroke-opacity']);
    expect(opacityProps('raster')).toEqual(['raster-opacity']);
  });

  it('symbol needs both icon and text', () => {
    expect(opacityProps('symbol')).toEqual(['icon-opacity', 'text-opacity']);
  });
});
