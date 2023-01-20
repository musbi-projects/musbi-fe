import { atom } from "recoil";
import { ToolBoxMenus } from "./types";
import {
  MdOutlineTextFields,
  MdOutlineCloudUpload,
  MdOutlineTagFaces,
  MdOutlineWallpaper,
} from "react-icons/md";
import React from "react";

const initialMenus = [
  {
    id: 1,
    name: "텍스트",
    isActive: true,
    icon: <MdOutlineTextFields size={24} />,
  },
  {
    id: 2,
    name: "업로드",
    isActive: false,
    icon: <MdOutlineCloudUpload size={24} />,
  },
  {
    id: 3,
    name: "배경",
    isActive: false,
    icon: <MdOutlineWallpaper size={26} />,
  },
  {
    id: 4,
    name: "스티커",
    isActive: false,
    icon: <MdOutlineTagFaces size={26} />,
  },
];

const toolBoxMenus = atom<ToolBoxMenus[]>({
  key: "toolBoxMenus",
  default: initialMenus,
});

export default toolBoxMenus;
