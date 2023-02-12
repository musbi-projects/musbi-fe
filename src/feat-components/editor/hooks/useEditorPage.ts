import { useCurrentMenuValue } from '@/recoil/toolbox';
import { useCallback, useEffect, useRef } from 'react';
import { useEditorViewState } from '@/recoil/editorView';

const THRESHOLD_OPTIONS = Array.from({ length: 11 }, (v, i) => i).map((n) => n / 10);

export const useEditorPage = () => {
  const currentMenu = useCurrentMenuValue();
  const ioRef = useRef<IntersectionObserver>();
  const canvasGroupRef = useRef<HTMLDivElement[]>();
  const [editorViewContents, setEditorViewContents] = useEditorViewState();

  const subscribeCanvases = useCallback(() => {
    canvasGroupRef.current?.forEach((canvas) => {
      ioRef.current?.observe(canvas);
    });
  }, []);

  const unsubscribeCanvases = useCallback(() => {
    canvasGroupRef.current?.forEach((canvas) => {
      ioRef.current?.unobserve(canvas);
    });
  }, []);

  const initIntersectionObserver = useCallback(() => {
    const observeCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetEl = entry.target as HTMLDivElement;
        const canvasId = targetEl?.dataset?.canvasId;
        const halfPoint = window.innerHeight / 2;
        const scrollY = halfPoint + window.scrollY;
        const start = targetEl.offsetTop;
        const end = start + targetEl.offsetHeight;
        const isEnter = start <= scrollY && scrollY <= end;

        if (isEnter) {
          setEditorViewContents({ ...editorViewContents, currentCanvas: canvasId });
        }
      });
    };

    const observeOption = {
      root: null,
      threshold: THRESHOLD_OPTIONS,
    };

    ioRef.current = new IntersectionObserver(observeCallback, observeOption);
  }, []);

  const getCanvasElements = useCallback(() => {
    const canvases = document.querySelectorAll('[data-canvas-id]');
    if (canvases.length <= 0) return null;
    else return [...canvases] as HTMLDivElement[];
  }, []);

  const initCanvasElements = useCallback(() => {
    const canvases = getCanvasElements();
    const isEmptyCanvases = canvases === null;
    if (isEmptyCanvases) {
      console.error('[initCanvasElements] 캔버스를 찾을 수 없습니다.');
      return;
    }

    canvasGroupRef.current = canvases;
  }, [getCanvasElements]);

  useEffect(() => {
    initIntersectionObserver();
    initCanvasElements();
    subscribeCanvases();

    return () => {
      unsubscribeCanvases();
    };
  }, [initCanvasElements]);

  return { editorViewContents, currentMenu };
};
