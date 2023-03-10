import { ToolBoxMenus } from "@/recoil/toolbox";

export interface UseToolBoxReturn {
  menus: ToolBoxMenus[];
  handleChangeMenu: (id: ToolBoxMenus["id"]) => void;
}
