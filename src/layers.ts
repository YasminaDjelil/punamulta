export type LayerType =
  | 'fill'
  | 'line'
  | 'circle'
  | 'symbol'
  | 'raster'
  | 'fill-extrusion'
  | 'heatmap'
  | 'background'
  | 'hillshade';

export function opacityProps(type: LayerType): string[] {
  switch (type) {
    case 'symbol':
      return ['icon-opacity', 'text-opacity'];
    case 'circle':
      return ['circle-opacity', 'circle-stroke-opacity'];
    case 'hillshade':
      return ['hillshade-exaggeration'];
    default:
      return [`${type}-opacity`];
  }
}
