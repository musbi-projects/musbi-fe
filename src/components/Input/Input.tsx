import React from "react";
import { InputProps } from "./types";
import { getVariantStyle } from "./utils";
import { setCommonStyle } from "@/share/utils";
import styled, { css } from "styled-components";

const Input = ({
  fullWidth,
  icon,
  width,
  height,
  padding = "6px",
  margin,
  fontSize = "11px",
  variant = "standard",
  ml,
  mr,
  mt,
  mb,
  ...props
}: InputProps) => {
  return (
    <StyledInputContainer {...{ fullWidth, width, margin, ml, mr, mt, mb }}>
      <i>{icon}</i>
      <StyledInput {...props} {...{ icon, height, variant, padding }} />
    </StyledInputContainer>
  );
};

export default Input;

const StyledInputContainer = styled.div<InputProps>`
  ${({ fullWidth, width, margin, ml, mr, mt, mb }) => css`
    display: ${fullWidth ? "block" : "inline-block"};
    position: relative;
    width: ${width};
    margin: ${margin};
    ${setCommonStyle({ ml, mr, mt, mb })}

    i {
      position: absolute;
      top: 50%;
      left: 2px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(-50%);
      color: rgba(37, 40, 47, 0.3);
    }
  `}
`;

const StyledInput = styled.input<InputProps>`
  ${({
    theme,
    variant,
    height,
    padding,
    fontSize,
    icon,
    pl,
    pr,
    pt,
    pb,
  }) => css`
    outline: none;
    border-radius: 4px;
    width: 100%;
    height: ${height};
    padding: ${padding};
    font-size: ${fontSize};
    padding-left: ${icon ? "24px" : ""};
    border: 1px solid ${theme.color.border};

    &::placeholder {
      color: rgba(37, 40, 47, 0.3);
    }

    ${getVariantStyle(variant)}
    ${setCommonStyle({ pl, pr, pt, pb })}
  `}
`;
