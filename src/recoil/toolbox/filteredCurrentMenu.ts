import { selector } from "recoil";
import toolBoxMenus from "@/recoil/toolbox/atom";

export const filteredCurrentMenu = selector({
  key: "filteredCurrentMenu",
  get: ({ get }) => {
    const menus = get(toolBoxMenus);
    return menus.filter((menu) => menu.isActive);
  },
});
