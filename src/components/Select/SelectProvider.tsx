import type { ISelectContext } from "./types";

import { SelectContext } from "./context";

interface SelectProviderProps extends ISelectContext {
  children: React.ReactNode;
}

export default function SelectProvider({ children, handleClickSelectOption, hoverIndex }: SelectProviderProps) {
  return <SelectContext.Provider value={{ handleClickSelectOption, hoverIndex }}>{children}</SelectContext.Provider>;
}
