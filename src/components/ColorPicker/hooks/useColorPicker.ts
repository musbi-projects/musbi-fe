import { useCallback, useState } from "react";
import { ColorResult, RGBColor } from "react-color";

const useColorPicker = () => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [displayColorPicker, setDisplayColorPicker] = useState<Boolean>(false);

  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, []);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  const handleChange = useCallback((color: ColorResult) => {
    setColor(color?.rgb);
  }, []);

  return { color, displayColorPicker, handleClick, handleClose, handleChange };
};

export default useColorPicker;
