import type { ThemeColor } from "@/styles/styled";

import { createElement } from "react";
import React from "react";
import styled from "styled-components";

interface TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
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
`;

export default Text;
