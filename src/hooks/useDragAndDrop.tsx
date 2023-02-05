import React, { useState, useEffect, useCallback, DragEvent } from "react";

interface Params {
  onChange: (e: globalThis.DragEvent) => void;
}

export const useDragAndDrop = <T extends HTMLElement>({ onChange }: Params) => {
  const [isDragging, setIsDragging] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  const dragRef = useCallback((node: T) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  const handleDragIn = useCallback((e: globalThis.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: globalThis.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: globalThis.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: globalThis.DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChange(e);
      setIsDragging(false);
    },
    [onChange],
  );

  const initDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (node) {
      node.addEventListener("dragenter", handleDragIn);
      node.addEventListener("dragleave", handleDragOut);
      node.addEventListener("dragover", handleDragOver);
      node.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, node]);

  const resetDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

    if (node) {
      node.removeEventListener("dragenter", handleDragIn);
      node.removeEventListener("dragleave", handleDragOut);
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, node]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return {
    dragRef,
    isDragging,
  };
};
