import React, { useCallback, useState } from "react";
import { useSelectKeydown } from "./useSelectKeydown";

interface UseSelectProps {}

export const useSelect = () => {
  const [currentValue, setCurrentValue] = useState<React.ReactNode>();

  const onClickOption = useCallback(() => {}, []);

  return {
    currentValue,
    onClickOption,
  };
};
