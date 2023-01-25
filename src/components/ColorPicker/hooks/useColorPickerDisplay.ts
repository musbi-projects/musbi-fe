import { useCallback, useState } from "react";

export const useColorPickerDisplay = () => {
  const [isOpenColorPicker, setIsOpenColorPicker] = useState<Boolean>(false);

  const handleClick = useCallback(() => {
    setIsOpenColorPicker(!isOpenColorPicker);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpenColorPicker(false);
  }, []);

  return {
    isOpenColorPicker,
    handleClick,
    handleClose,
  };
};
