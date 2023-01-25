import { ColorChangeHandler, RGBColor } from "react-color";

export interface ColorPickerProps {
  color: RGBColor;
  onChange: ColorChangeHandler;
}
