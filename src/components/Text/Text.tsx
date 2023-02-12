import type { ThemeColor } from "@/styles/styled";

import { createElement } from "react";
import React from "react";
import styled, { css } from "styled-components";

interface TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  center?: boolean;
  weight?: React.CSSProperties["fontWeight"];
  color: ThemeColor;
  size: React.CSSProperties["fontSize"];
  children: React.ReactNode;
}

function TextElement({ as = "span", children, ...props }: TextProps) {
  return createElement(as, props, children);
}

const Text = styled(TextElement)<TextProps>`
  color: ${({ color, theme }) => theme.color[color]};
  ${({ size, weight }) => {
    return css`
      font-size: ${size};
      font-weight: ${weight};
    `;
  }}
  font-size: ${({ size }) => size};
  ${({ center }) =>
    center &&
    css`
    text-align: center;
  `}
`;

export default Text;
