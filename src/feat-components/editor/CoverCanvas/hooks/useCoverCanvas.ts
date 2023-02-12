import { useMemo } from 'react';
import { useEditorViewValue } from '@/recoil/editorView';

export const useCoverCanvas = () => {
  const editorViewValues = useEditorViewValue();
  const isFocus = useMemo(() => editorViewValues.currentCanvas === 'cover', [editorViewValues.currentCanvas]);

  return { isFocus };
};
