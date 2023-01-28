import React from "react";

export interface ToolBoxMenus {
  id: string;
  name: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export type ToolBoxAtom = ToolBoxMenus[];
