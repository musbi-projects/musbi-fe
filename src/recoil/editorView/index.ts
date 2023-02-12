import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import editorView from './atom';

export * from './types';

export const useEditorViewState = () => {
  return useRecoilState(editorView);
};

export const useSetEditorViewState = () => {
  return useSetRecoilState(editorView);
};

export const useEditorViewValue = () => {
  return useRecoilValue(editorView);
};
