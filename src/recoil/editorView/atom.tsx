import React from 'react';
import { atom } from 'recoil';
import { EditorViewInfo } from '@/recoil/editorView/types';

const editorView = atom<EditorViewInfo>({
  key: 'editorView',
  default: {
    currentCanvas: null,
    currentLayer: null,
    cover: {
      contents: [],
    },
    body: {
      contents: [],
    },
  },
});

export default editorView;
