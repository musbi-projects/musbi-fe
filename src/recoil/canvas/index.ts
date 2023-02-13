import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import canvasStatus from './atom';

export * from './types';

export const useCanvasState = () => {
  return useRecoilState(canvasStatus);
};

export const useSetCanvasState = () => {
  return useSetRecoilState(canvasStatus);
};

export const useCanvasValue = () => {
  return useRecoilValue(canvasStatus);
};
