import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { useEditorViewState } from '@/recoil/editorView';

interface TextDrawerItem {
  id: number;
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
        id: 1,
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/ddangFonts.png',
        fontFamily: 'Nanum Gothic',
        name: '나눔고딕',
      },
      {
        id: 2,
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/earlyfont_watermelon.png',
        fontFamily: 'SUITE',
        name: '수트',
      },
      {
        id: 3,
        thumbnail: 'https://musbi-bucket.s3.ap-northeast-1.amazonaws.com/images/fonts/kyoboHandwriting2021sjy.png',
        fontFamily: 'MyeongJo',
        name: '명조',
      },
      {
        id: 4,
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
      console.log('[handleClickDrawerItem]');
      // setEditorView((contents) => {
      //   const newLayer = { ...item, type: textDrawerData?.type, content: '텍스트를 입력하세요.' };
      //   return;
      // });
    },
    [textDrawerData],
  );

  useEffect(() => {
    initTextDrawerData();
  }, []);

  return { textList, type: textDrawerData?.type, handleChangeSearchText, handleClickDrawerItem };
};
