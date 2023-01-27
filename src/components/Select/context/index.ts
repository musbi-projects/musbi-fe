import type { ISelectContext } from "../types";

import { createContext } from "react";

export const SelectContext = createContext<ISelectContext>({});
