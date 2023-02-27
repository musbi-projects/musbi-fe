import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCanvasValue } from '@/recoil/canvas';

export const useCoverCanvas = () => {
  const { currentCanvas, target: canvas } = useCanvasValue();
  const [center, setCenter] = useState<{ top: number; left: number }>();
  const isFocus = useMemo(() => currentCanvas === 'cover', [currentCanvas]);

  const initCoverCanvas = useCallback(() => {
    const targetCanvas = canvas as HTMLElement;
    const top = targetCanvas.offsetTop + targetCanvas.offsetHeight / 2;
    const left = targetCanvas.offsetLeft + targetCanvas.offsetWidth / 2;
    setCenter({ top, left });
  }, [canvas]);

  useEffect(() => {
    if (!canvas) return;
    initCoverCanvas();
  }, [canvas, initCoverCanvas]);

  return { isFocus, center };
};
