import { useState } from "react";
import { ColorChangeHandler, RGBColor } from "react-color";

export const useColorPicker = (
  initialColor: RGBColor = { r: 0, g: 0, b: 0, a: 1 }
) => {
  const [color, setColor] = useState<RGBColor>(initialColor);
  const handleChangeColor: ColorChangeHandler = (color, event) => {
    setColor(color.rgb);
  };

  return { color, handleChangeColor };
};
