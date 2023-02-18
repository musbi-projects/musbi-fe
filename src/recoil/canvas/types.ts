export interface CanvasStatus {
  currentCanvas: 'cover' | 'body';
  boundingClientRect: Omit<IntersectionObserverEntry['boundingClientRect'], 'toJSON'>;
}
