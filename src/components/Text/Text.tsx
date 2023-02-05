import type { ThemeColor } from "@/styles/styled";

import { createElement } from "react";
import React from "react";
import styled, { css } from "styled-components";

interface TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  center?: boolean;
  color: ThemeColor;
  size: React.CSSProperties["fontSize"];
  children: React.ReactNode;
}

function TextElement({ as = "span", children, ...props }: TextProps) {
  return createElement(as, props, children);
}

const Text = styled(TextElement)<TextProps>`
  color: ${({ color, theme }) => theme.color[color]};
  font-size: ${({ size }) => size};
  ${({center}) => center && css`
    text-align: center;
  `}
`;

export default Text;
