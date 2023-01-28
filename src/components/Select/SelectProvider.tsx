import type { ISelectContext } from "./types";

import { SelectContext } from "./context";

interface SelectProviderProps extends ISelectContext {
  children: React.ReactNode;
}

export default function SelectProvider({ children, handleClickSelectOption, targetIndex, currentValue }: SelectProviderProps) {
  return <SelectContext.Provider value={{ handleClickSelectOption, targetIndex, currentValue }}>{children}</SelectContext.Provider>;
}
