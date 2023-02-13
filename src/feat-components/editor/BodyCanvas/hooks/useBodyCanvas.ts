import { useMemo } from 'react';
import { useCanvasValue } from '@/recoil/canvas';

export const useBodyCanvas = () => {
  const { currentCanvas } = useCanvasValue();
  const isFocus = useMemo(() => currentCanvas === 'body', [currentCanvas]);

  return { isFocus };
};
