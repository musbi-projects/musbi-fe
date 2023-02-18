import { atom } from 'recoil';
import { CanvasStatus } from '@/recoil/canvas/types';

const canvasStatus = atom<CanvasStatus>({
  key: 'canvasStatus',
  default: {
    currentCanvas: 'cover',
    boundingClientRect: {
      x: 62,
      y: 155,
      width: 390,
      height: 844,
      top: 155,
      right: 452,
      bottom: 999,
      left: 62,
    },
  },
});

export default canvasStatus;
