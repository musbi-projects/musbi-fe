import React from "react";
import useToolBox from "@/components/ToolBox/hooks/useToolBox";
import { HEADER_HEIGHT, TOOLBOX_WIDTH } from "@/constants/common";
import styled, { css } from "styled-components";

const ToolBox = () => {
  const { menus, handleChangeMenu } = useToolBox();

  return (
    <StyledToolBoxContainer>
      <ul>
        {menus?.map(({ id, name, isActive }, index) => (
          <li key={`toolbox-menu-${index + 1}`}>
            <StyledMenu
              type="button"
              isActive={isActive}
              onClick={() => handleChangeMenu(id)}
            >
              <i>아이콘</i>
              <span>{name}</span>
            </StyledMenu>
          </li>
        ))}
      </ul>
    </StyledToolBoxContainer>
  );
};

export default ToolBox;

const StyledToolBoxContainer = styled.article`
  ${({ theme }) => css`
    position: fixed;
    top: ${HEADER_HEIGHT}px;
    left: 0;
    width: ${TOOLBOX_WIDTH}px;
    height: calc(100% - ${TOOLBOX_WIDTH}px);
    border-right: 1px solid ${theme.color.border};
    padding: 20px 0;
  `}
`;

const StyledMenu = styled.button<{ isActive: boolean }>`
  ${({ theme, isActive }) => css`
    cursor: pointer;
    border: 0;
    width: 100%;
    height: 58px;
    padding: 8px;
    font-size: 11px;
    background-color: ${isActive ? "#e4f8ed" : "#fff"};
    color: ${theme.color.lightGray};
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      color: ${theme.color.primary};
    }

    i {
      display: block;
      flex-shrink: 0;
      width: 24px;
      height: 32px;
      background-color: gray;
    }
  `}
`;
