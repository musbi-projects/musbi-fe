import { atom } from 'recoil';
import { CanvasStatus } from '@/recoil/canvas/types';

const canvasStatus = atom<CanvasStatus>({
  key: 'canvasStatus',
  default: {
    currentCanvas: 'cover',
    target: null,
  },
});

export default canvasStatus;
