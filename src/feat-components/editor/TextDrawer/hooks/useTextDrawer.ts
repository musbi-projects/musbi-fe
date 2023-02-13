import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { useEditorViewState } from '@/recoil/editorView';
import { v4 as uuidv4 } from 'uuid';
import { useCanvasValue } from '@/recoil/canvas';

interface TextDrawerItem {
  thumbnail: string;
  fontFamily: string;
  name: string;
}

interface TextDrawerData {
  type: string;
  data: TextDrawerItem[];
}

export const useTextDrawer = () => {
  const [textDrawerData, setTextDrawerData] = useState<TextDrawerData>({ data: [], type: '' });
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);
  const [editorView, setEditorView] = useEditorViewState();
  const { currentCanvas } = useCanvasValue();
  const { contents: currentContents } = useMemo(() => editorView[currentCanvas], [editorView, currentCanvas]);
  console.log('[currentContents]', currentContents);

  const textList = useMemo(() => {
    return textDrawerData?.data.filter(
      (item) => item.name.indexOf(debouncedKeyword) > -1 || item.fontFamily.indexOf(debouncedKeyword) > -1,
    );
  }, [textDrawerData.data, debouncedKeyword]);

  const handleChangeSearchText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keyword = e.currentTarget.value;
    setKeyword(keyword);
  }, []);

  const initTextDrawerData = useCallback(() => {
    const data = [
      {
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/ddangFonts.png',
        fontFamily: 'Nanum Gothic',
        name: '나눔고딕',
      },
      {
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/earlyfont_watermelon.png',
        fontFamily: 'SUITE',
        name: '수트',
      },
      {
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/kyoboHandwriting2021sjy.png',
        fontFamily: 'MyeongJo',
        name: '명조',
      },
      {
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/leferi.png',
        fontFamily: 'MyeongJo',
        name: '명조',
      },
    ];

    setTextDrawerData({
      type: 'TEXT',
      data,
    });
    return;
  }, []);

  const handleClickDrawerItem = useCallback(
    (item: any) => {
      setEditorView((editor) => {
        const newLayer = { ...item, id: uuidv4(), type: textDrawerData?.type, content: '텍스트를 입력하세요.' };
        return {
          ...editor,
          [currentCanvas]: {
            contents: [...currentContents, newLayer],
          },
        };
      });
    },
    [editorView, textDrawerData],
  );

  useEffect(() => {
    initTextDrawerData();
  }, []);

  return { textList, type: textDrawerData?.type, handleChangeSearchText, handleClickDrawerItem };
};
