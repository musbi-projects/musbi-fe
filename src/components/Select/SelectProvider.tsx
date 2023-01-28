import type { ISelectContext } from "./types";

import { SelectContext } from "./context";

interface SelectProviderProps extends ISelectContext {
  children: React.ReactNode;
}

export default function SelectProvider({ children, handleClickSelectOption, targetIndex, selectedOption }: SelectProviderProps) {
  return <SelectContext.Provider value={{ handleClickSelectOption, targetIndex, selectedOption }}>{children}</SelectContext.Provider>;
}
