import React, { useState, useEffect } from "react";

interface Params {
  length: number;
  handleClick: (index: number) => void;
}

export const useSelectKeydown = ({ handleClick, length }: Params) => {
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setTargetIndex((prev) => (prev < length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        setTargetIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
      }
      if (e.key === "Enter") {
        handleClick(targetIndex);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [length, targetIndex, handleClick]);

  return targetIndex;
};
