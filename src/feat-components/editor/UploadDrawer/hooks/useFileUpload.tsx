import type { Nullable } from "@/types";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

interface ObjectUrl {
  objectUrl: string;
  ratio: number;
}

export const useFileUpload = () => {
  const { dragRef, isDragging } = useDragAndDrop<HTMLDivElement>({ onChange });
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileObjectUrlList, setFileObjectUrlList] = useState<ObjectUrl[]>([]);
  const accept = useMemo(() => {
    const acceptList = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "video/mp4"];

    return {
      list: acceptList,
      string: acceptList.join(", "),
    };
  }, []);

  function onChange(e: globalThis.DragEvent | React.ChangeEvent<HTMLInputElement>) {
    const fileList = e instanceof globalThis.DragEvent ? e.dataTransfer?.files : e.target.files;
    const isValid = isValidFormat(fileList);

    if (!fileList?.length || !isValid) {
      return;
    }

    const list = [...fileList].map(async (file) => {
      const objectUrl = URL.createObjectURL(file);
      const ratio = await loadImage(objectUrl);

      return {
        objectUrl,
        ratio,
      };
    });

    Promise.all(list).then((result) => setFileObjectUrlList((prev) => [...prev, ...result]));

    function loadImage(url: string) {
      return new Promise<number>((resolve, reject) => {
        const image = new Image();

        image.src = url;
        image.onload = () => {
          const ratio = Number((image.naturalWidth / image.naturalHeight).toFixed(2));
          resolve(ratio);
        };
      });
    }
  }

  function isValidFormat(fileList?: Nullable<FileList>) {
    if (!fileList) {
      return true;
    }

    const isValid = [...fileList].every((file) => {
      return accept.list.includes(file.type);
    });

    return isValid;
  }

  useEffect(() => {
    return () => {
      fileObjectUrlList.forEach(({ objectUrl }) => URL.revokeObjectURL(objectUrl));
    };
  }, []);

  useEffect(() => {
    if (fileObjectUrlList && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [fileObjectUrlList]);

  return {
    dragRef,
    inputRef,
    isDragging,
    onChange,
    accept: accept.string,
    fileObjectUrlList,
  };
};
