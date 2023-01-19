import { useCallback } from "react";
import { useRecoilState } from "recoil";
import toolBoxMenus, { ToolBoxMenus } from "@/recoil/toolbox";

interface UseToolBoxReturn {
  menus: ToolBoxMenus[];
  handleChangeMenu: (id: number) => void;
}

const useToolBox = (): UseToolBoxReturn => {
  const [menus, setMenus] = useRecoilState(toolBoxMenus);
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
