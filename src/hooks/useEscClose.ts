import { Dispatch, SetStateAction, useEffect } from "react";

export const useEscClose = (handler: () => void, callback?: () => void) => {
  useEffect(() => {
    const handleKeydownEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handler();
        callback?.();
      }
    };
    window.addEventListener("keydown", handleKeydownEsc);

    return () => window.removeEventListener("keydown", handleKeydownEsc);
  }, [handler, callback]);
};
