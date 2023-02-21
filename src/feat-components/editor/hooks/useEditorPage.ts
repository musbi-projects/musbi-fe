import { useCallback, useEffect, useRef } from 'react';
import { useCurrentMenuValue } from '@/recoil/toolbox';
import { useEditorViewValue } from '@/recoil/editorView';
import { CanvasStatus, useSetCanvasState } from '@/recoil/canvas';

const THRESHOLD_OPTIONS = Array.from({ length: 11 }, (v, i) => i).map((n) => n / 10);

export const useEditorPage = () => {
  const currentMenu = useCurrentMenuValue();
  const ioRef = useRef<IntersectionObserver>();
  const canvasGroupRef = useRef<HTMLDivElement[]>();
  const setCanvasState = useSetCanvasState();
  const editorViewContents = useEditorViewValue();

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
        const halfHeightOfWindow = window.innerHeight / 2;
        const scrollY = halfHeightOfWindow + window.scrollY; // 현재 화면의 중간 포인트
        const start = targetEl.offsetTop;
        const end = start + targetEl.offsetHeight;
        const isEnter = start <= scrollY && scrollY <= end;
        const canvasId = targetEl?.dataset?.canvasId as CanvasStatus['currentCanvas'];
        const { target } = entry;

        if (isEnter) {
          setCanvasState({ currentCanvas: canvasId, target });
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
