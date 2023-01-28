import React from "react";
import { atom } from "recoil";
import { ToolBoxAtom } from "./types";
import {
  MdOutlineTextFields,
  MdOutlineCloudUpload,
  MdOutlineTagFaces,
  MdOutlineWallpaper,
} from "react-icons/md";

const initialMenus = [
  {
    id: "text",
    name: "텍스트",
    isActive: false,
    icon: <MdOutlineTextFields size={24} />,
  },
  {
    id: "upload",
    name: "업로드",
    isActive: false,
    icon: <MdOutlineCloudUpload size={24} />,
  },
  {
    id: "background",
    name: "배경",
    isActive: false,
    icon: <MdOutlineWallpaper size={26} />,
  },
  {
    id: "sticker",
    name: "스티커",
    isActive: false,
    icon: <MdOutlineTagFaces size={26} />,
  },
];

const toolBoxMenus = atom<ToolBoxAtom>({
  key: "toolBoxMenus",
  default: initialMenus,
});

export default toolBoxMenus;
