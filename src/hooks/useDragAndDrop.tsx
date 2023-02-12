import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Params {
  onChange: (e: globalThis.DragEvent) => void;
}

export const useDragAndDrop = <T extends HTMLElement>({ onChange }: Params) => {
  const dragRef = useRef<T>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragIn = useCallback((e: globalThis.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback(
    (e: globalThis.DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
    },
    [setIsDragging],
  );

  const handleDragOver = useCallback(
    (e: globalThis.DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer!.files) {
        setIsDragging(true);
      }
    },
    [setIsDragging],
  );

  const handleDrop = useCallback(
    (e: globalThis.DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChange(e);
      setIsDragging(false);
    },
    [onChange, setIsDragging],
  );

  const setDragEvents = useCallback((): void => {
    if (dragRef.current) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, dragRef]);

  const removeDragEvents = useCallback((): void => {
    if (dragRef.current) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, dragRef]);

  useEffect(() => {
    setDragEvents();

    return () => removeDragEvents();
  }, [setDragEvents, removeDragEvents]);

  return {
    dragRef,
    isDragging,
  };
};
