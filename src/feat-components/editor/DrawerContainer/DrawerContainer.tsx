import React, { useCallback } from 'react';
import TextDrawer from '@/feat-components/editor/TextDrawer';
import { ToolBoxMenus } from '@/recoil/toolbox';
import { DRAWER_WIDTH, HEADER_HEIGHT, TOOLBOX_WIDTH } from '@/constants';
import styled, { css } from 'styled-components';

interface DrawerProps {
  currentMenu: ToolBoxMenus | undefined;
}

const DrawerContainer = ({ currentMenu }: DrawerProps) => {
  const renderer = useCallback(
    (id: ToolBoxMenus['id']) => {
      if (id === 'text') {
        return <TextDrawer />;
      }

      if (id === 'upload') {
        return <>Drawer 2</>;
      }

      if (id === 'background') {
        return <>Drawer 3</>;
      }

      if (id === 'sticker') {
        return <>Drawer 4</>;
      }
    },
    [currentMenu],
  );

  if (!currentMenu || !currentMenu.id) {
    return null;
  }

  return <StyledDrawerContainer>{renderer(currentMenu.id)}</StyledDrawerContainer>;
};

export default DrawerContainer;

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
