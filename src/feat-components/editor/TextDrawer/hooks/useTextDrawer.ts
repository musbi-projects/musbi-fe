import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';

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
        thumbnail: 'https://dummyimage.com/295x192/000/fff',
        fontFamily: 'Nanum Gothic',
        name: '나눔고딕',
      },
      {
        id: 2,
        thumbnail: 'https://dummyimage.com/295x192/000/fff',
        fontFamily: 'SUITE',
        name: '수트',
      },
      {
        id: 3,
        thumbnail: 'https://dummyimage.com/295x192/000/fff',
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

  const handleClickDrawerItem = useCallback((item: any) => {
    console.log('[handleClickDrawerItem]', { ...item, type: textDrawerData?.type });
  }, []);

  useEffect(() => {
    initTextDrawerData();
  }, []);

  return { textList, type: textDrawerData?.type, handleChangeSearchText, handleClickDrawerItem };
};
