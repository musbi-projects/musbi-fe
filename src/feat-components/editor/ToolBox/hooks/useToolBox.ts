import { useCallback, useEffect } from "react";
import { UseToolBoxReturn } from "../types";
import {
  ToolBoxMenus,
  useSetToolBoxState,
  useToolBoxState,
} from "@/recoil/toolbox";
import { useRouter } from "next/router";

export const useToolBox = (): UseToolBoxReturn => {
  const router = useRouter();
  const setToolBoxActive = useSetToolBoxState();
  const [menus, setMenus] = useToolBoxState();
  const getChangedMenu = useCallback((id: ToolBoxMenus["id"]) => {
    return menus.map((menu) => {
      if (menu.id === id) {
        return {
          ...menu,
          isActive: true,
        };
      } else {
        return {
          ...menu,
          isActive: false,
        };
      }
    });
  }, []);

  const handleChangeMenu = useCallback((id: ToolBoxMenus["id"]) => {
    setMenus(getChangedMenu(id));
    router.push(`/editor?menu=${id}`, undefined, { shallow: true });
  }, []);

  const initActiveMenu = useCallback(() => {
    const menu = router.query.menu;
    if (!menu) {
      handleChangeMenu("text");
      return;
    }
    setToolBoxActive(getChangedMenu(menu as string));
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    initActiveMenu();
  }, [initActiveMenu]);

  return {
    menus,
    handleChangeMenu,
  };
};
