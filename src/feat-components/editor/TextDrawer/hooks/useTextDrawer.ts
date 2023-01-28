import React, { useCallback } from 'react';

export const useTextDrawer = () => {
  const handleSubmitTextDrawer = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = e.currentTarget.keyword.value;
    console.log('[submit]', keyword);
  }, []);
  return { handleSubmitTextDrawer };
};
