import { selector } from "recoil";
import toolBoxMenus from "@/recoil/toolbox/atom";

export const findCurrentMenu = selector({
  key: "findCurrentMenu",
  get: ({ get }) => {
    const menus = get(toolBoxMenus);
    return menus.filter((menu) => menu.isActive);
  },
});
