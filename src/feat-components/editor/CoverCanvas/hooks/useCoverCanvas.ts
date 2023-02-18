import { useEffect, useMemo, useState } from 'react';
import { useCanvasValue } from '@/recoil/canvas';
import { HEADER_HEIGHT } from '@/constants';

export const useCoverCanvas = () => {
  const {
    currentCanvas,
    boundingClientRect: { x, width },
  } = useCanvasValue();
  const [center, setCenter] = useState<{ top: number; left: number }>();
  const isFocus = useMemo(() => currentCanvas === 'cover', [currentCanvas]);

  useEffect(() => {
    const left = window.innerHeight / 2 - HEADER_HEIGHT - 20;
    const top = x + width / 2;
    setCenter({ top, left });
  }, []);
  return { isFocus, center };
};
