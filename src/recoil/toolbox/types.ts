import React from "react";

export interface ToolBoxMenus {
  id: number;
  name: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export type ToolBoxAtom = ToolBoxMenus[];
