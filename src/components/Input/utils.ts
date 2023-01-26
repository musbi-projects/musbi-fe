import { InputProps } from "./types";

export const getVariantStyle = (variant: InputProps["variant"]) => {
  switch (variant) {
    case "standard":
      const style = [
        "border-top: 0",
        "border-left: 0",
        "border-right: 0",
        "border-radius: 0",
      ];
      return style.join(";");

    case "outlined":
      return "";

    default:
      return "";
  }
};
