import React, { useCallback } from "react";
import { ToolBoxMenus } from "@/recoil/toolbox";
import { DRAWER_WIDTH, HEADER_HEIGHT, TOOLBOX_WIDTH } from "@/constants";
import styled, { css } from "styled-components";

interface DrawerProps {
  currentMenu: ToolBoxMenus | undefined;
}

const Drawer = ({ currentMenu }: DrawerProps) => {
  const renderer = useCallback(
    (id: number) => {
      if (id === 1) {
        return <>Drawer 1</>;
      }

      if (id === 2) {
        return <>Drawer 2</>;
      }

      if (id === 3) {
        return <>Drawer 3</>;
      }

      if (id === 4) {
        return <>Drawer 4</>;
      }
    },
    [currentMenu]
  );

  if (!currentMenu || !currentMenu.id) {
    return null;
  }

  return (
    <StyledDrawerContainer>{renderer(currentMenu.id)}</StyledDrawerContainer>
  );
};

export default Drawer;

const StyledDrawerContainer = styled.article`
  ${({ theme }) => css`
    position: fixed;
    top: ${HEADER_HEIGHT}px;
    right: ${TOOLBOX_WIDTH}px;
    width: ${DRAWER_WIDTH}px;
    height: calc(100% - ${HEADER_HEIGHT}px);
    border-left: 1px solid ${theme.color.border};
    background-color: #fff;
  `}
`;
