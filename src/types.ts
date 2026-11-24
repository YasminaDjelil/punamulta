export type Alignment = 'left' | 'right' | 'center' | 'full';
export type MapAnimation = 'flyTo' | 'easeTo' | 'jumpTo';
export type Theme = 'light' | 'dark';

export interface CameraLocation {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface LayerOpacity {
  layer: string;
  opacity: number;
  duration?: number;
}

export interface ChapterImage {
  src: string;
  alt: string;
  caption?: string;
  focus?: string;
}

export interface PhotoMarker {
  siteId: string;
  src: string;
  label: string;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
}

export interface Chapter {
  id: string;
  date?: string;
  kicker?: string;
  photoMarkers?: PhotoMarker[];
  hint?: string;
  narrow?: boolean;
  title?: string;
  image?: string;
  images?: ChapterImage[];
  imageFit?: 'cover' | 'contain';
  description?: string;
  alignment?: Alignment;
  hidden?: boolean;
  location: CameraLocation;
  mapAnimation?: MapAnimation;
  rotateAnimation?: boolean;
  onChapterEnter?: LayerOpacity[];
  onChapterExit?: LayerOpacity[];
}

export interface Story {
  title: string;
  subtitle?: string;
  byline?: string;
  footer?: string;
  coverImage?: string;
  theme: Theme;
  showMarkers: boolean;
  markerColor?: string;
  chapters: Chapter[];
}
