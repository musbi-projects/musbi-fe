export interface CanvasStatus {
  currentCanvas: 'cover' | 'body';
  target: IntersectionObserverEntry['target'] | null;
}
