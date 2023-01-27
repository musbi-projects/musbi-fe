import React from "react";
import { useToolBox } from "@/feat-components/editor/ToolBox";
import { HEADER_HEIGHT, TOOLBOX_WIDTH } from "@/constants/common";
import styled, { css } from "styled-components";

const ToolBox = () => {
  const { menus, handleChangeMenu } = useToolBox();

  return (
    <StyledToolBoxContainer>
      <ul>
        {menus?.map(({ id, name, isActive, icon }, index) => (
          <li key={`toolbox-menu-${index + 1}`}>
            <StyledMenu
              type="button"
              isActive={isActive}
              onClick={() => handleChangeMenu(id)}
            >
              {icon}
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
    right: 0;
    width: ${TOOLBOX_WIDTH}px;
    height: calc(100% - ${TOOLBOX_WIDTH}px);
    border-left: 1px solid ${theme.color.border};
    padding: 20px 0;
    background-color: #fff;
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
    color: ${isActive ? theme.color.primary : theme.color.lightGray};
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
