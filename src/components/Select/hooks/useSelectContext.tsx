import { useContext } from "react";
import { SelectContext } from "../context";

export const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("useSelectContext는 Select 컴포넌트 내에서만 사용할 수 있습니다.");
  }

  return context;
};
