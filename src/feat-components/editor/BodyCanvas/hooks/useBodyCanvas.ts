import { useMemo } from 'react';
import { useEditorViewValue } from '@/recoil/editorView';

export const useBodyCanvas = () => {
  const editorViewValues = useEditorViewValue();
  const isFocus = useMemo(() => editorViewValues.currentCanvas === 'body', [editorViewValues.currentCanvas]);

  return { isFocus };
};
