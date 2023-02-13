import { useMemo } from 'react';
import { useCanvasValue } from '@/recoil/canvas';

export const useCoverCanvas = () => {
  const { currentCanvas } = useCanvasValue();
  const isFocus = useMemo(() => currentCanvas === 'cover', [currentCanvas]);

  return { isFocus };
};
