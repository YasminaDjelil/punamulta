export function siteChapter(props: GeoJSON.GeoJsonProperties): string | undefined {
  const target = props?.chapter ?? props?.id;
  return typeof target === 'string' ? target : undefined;
}
