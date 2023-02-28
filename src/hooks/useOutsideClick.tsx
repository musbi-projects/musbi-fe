import React, { useCallback, useEffect, useRef } from 'react';

type UseOutsideClickParams = () => void;

export const useOutsideClick = (handler: UseOutsideClickParams) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    },
    [ref],
  );

  const createOutsideHandler = useCallback(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const destroyOutsideHandler = useCallback(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    createOutsideHandler();
    return () => {
      destroyOutsideHandler();
    };
  }, [ref, handler]);

  return {
    ref,
  };
};
