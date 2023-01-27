import { useSetRecoilState, useRecoilValue } from "recoil";
import drawer from "./atom";

export const useSetDrawerState = () => {
  return useSetRecoilState(drawer);
};

export const useDrawerValue = () => {
  return useRecoilValue(drawer);
};
