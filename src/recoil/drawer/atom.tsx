import { atom } from "recoil";
import { drawerAtom } from "@/recoil/drawer/types";

const drawer = atom<drawerAtom>({
  key: "drawer",
  default: {
    isDrawerOpen: true,
  },
});

export default drawer;
