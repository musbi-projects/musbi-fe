import React from "react";
import { ToolBoxMenus } from "@/recoil/toolbox";

interface DrawerProps {
  currentMenu: ToolBoxMenus | undefined;
}

const Drawer = ({ currentMenu }: DrawerProps) => {
  console.log("[currentMenu]", currentMenu);

  if (!currentMenu) {
    return null;
  }

  if (currentMenu.id === 1) {
    return <div>Drawer 1</div>;
  }

  return <div>Drawer</div>;
};

export default Drawer;
