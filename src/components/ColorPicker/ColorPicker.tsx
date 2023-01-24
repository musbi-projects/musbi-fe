import React from "react";
import useColorPicker from "./hooks/useColorPicker";
import styled, { css } from "styled-components";
import { RGBColor, SketchPicker } from "react-color";

const ColorPicker = () => {
  const { color, displayColorPicker, handleClick, handleClose, handleChange } =
    useColorPicker();

  return (
    <article>
      <StyledSwatch onClick={handleClick}>
        <StyledColor rgb={color} />
      </StyledSwatch>
      {displayColorPicker ? (
        <StyledPopOver>
          <StyledCover onClick={handleClose} />
          <SketchPicker
            color={color}
            onChange={handleChange}
            onChangeComplete={handleChange}
          />
        </StyledPopOver>
      ) : null}
    </article>
  );
};

export default ColorPicker;

const StyledCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledPopOver = styled.div`
  position: absolute;
  z-index: 2;
`;

const StyledColor = styled.div<{ rgb: RGBColor }>`
  ${({ rgb }) => css`
    width: 24px;
    height: 24px;
    border-radius: 2px;
    background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a});
  `}
`;

const StyledSwatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;
