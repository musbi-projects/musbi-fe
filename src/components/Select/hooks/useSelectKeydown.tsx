import React, { useState, useEffect } from "react";

interface Params {
  length: number;
  handleClick: (index: number) => void;
}

export const useSelectKeydown = ({ handleClick, length }: Params) => {
  const [hoverIndex, setHoverIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setHoverIndex((prev) => (prev < length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        setHoverIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
      }
      if (e.key === "Enter") {
        handleClick(hoverIndex);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [length, hoverIndex, handleClick]);

  return { hoverIndex, setHoverIndex };
};
