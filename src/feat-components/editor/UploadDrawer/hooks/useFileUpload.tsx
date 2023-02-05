import type { Nullable } from "@/types";

import { useMemo } from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

export const useFileUpload = () => {
  const { dragRef, isDragging } = useDragAndDrop<HTMLDivElement>({ onChange });
  const acceptList = useMemo(() => ["jpeg", "jpg", "png", "svg", "gif", "mp4", "m4a"], []);

  function onChange(e: globalThis.DragEvent | React.ChangeEvent<HTMLInputElement>) {
    const fileList =
      e.type === "drag"
        ? (e as globalThis.DragEvent).dataTransfer?.files
        : (e as React.ChangeEvent<HTMLInputElement>).target.files;

    const isValid = isValidFormat(fileList);
  }

  function isValidFormat(fileList?: Nullable<FileList>) {
    if (!fileList) {
      return true;
    }

    for (const file of fileList) {
      const isValid = acceptList.some((accept) => file.name.endsWith(accept));

      if (!isValid) {
        return false;
      }
    }

    return true;
  }

  return {
    dragRef,
    isDragging,
  };
};
