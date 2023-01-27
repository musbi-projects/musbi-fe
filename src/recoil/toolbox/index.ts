import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import toolBoxMenus from "./atom";
import { findCurrentMenu } from "./findCurrentMenu";

export * from "./types";

export const useToolBoxState = () => {
  return useRecoilState(toolBoxMenus);
};

export const useSetToolBoxState = () => {
  return useSetRecoilState(toolBoxMenus);
};

export const useCurrentMenuValue = () => {
  return useRecoilValue(findCurrentMenu);
};
