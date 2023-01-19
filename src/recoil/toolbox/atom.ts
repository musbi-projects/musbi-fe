import { atom } from "recoil";

export interface ToolBoxMenus {
  id: number;
  name: string;
  isActive: boolean;
}

const initialMenus = [
  { id: 1, name: "텍스트", isActive: true },
  { id: 2, name: "업로드", isActive: false },
  { id: 3, name: "배경", isActive: false },
  { id: 4, name: "스티커", isActive: false },
];

const toolBoxMenus = atom<ToolBoxMenus[]>({
  key: "toolBoxMenus",
  default: initialMenus,
});

export default toolBoxMenus;
