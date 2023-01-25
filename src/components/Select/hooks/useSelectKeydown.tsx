import React, { useState, useEffect } from "react";

interface Params {
  list: React.ReactElement[];
  onClick: (id: string, value: string) => void;
}

export const useSelectKeydown = ({ list, onClick }: Params) => {
  const [hoverIndex, setHoverIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setHoverIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        setHoverIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
      }
      if (e.key === "Enter") {
        const {
          props: { id, children },
        } = list[hoverIndex];

        onClick(id, children);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [list, hoverIndex, onClick]);

  return { hoverIndex, setHoverIndex };
};
