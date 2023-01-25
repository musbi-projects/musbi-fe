import { Dispatch, SetStateAction, useEffect } from "react";

export const useEscClose = (setState: Dispatch<SetStateAction<boolean>>, callback?: () => void) => {
  useEffect(() => {
    const handleKeydownEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState(false);
        callback?.();
      }
    };
    window.addEventListener("keydown", handleKeydownEsc);

    return () => window.removeEventListener("keydown", handleKeydownEsc);
  }, [setState, callback]);
};
