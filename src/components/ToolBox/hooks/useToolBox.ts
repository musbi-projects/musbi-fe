import { useCallback } from "react";
import { UseToolBoxReturn } from "../types";
import { useToolBoxState } from "@/recoil/toolbox";

const useToolBox = (): UseToolBoxReturn => {
  const [menus, setMenus] = useToolBoxState();
  const handleChangeMenu = useCallback((id: number) => {
    setMenus(
      menus.map((menu) => {
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
      })
    );
  }, []);

  return {
    menus,
    handleChangeMenu,
  };
};

export default useToolBox;
