import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import styled, { DefaultTheme } from "styled-components";

type ButtonSize = "small" | "medium" | "large";
type ButtonShape = "circle" | "round";
type ButtonVariant = "text" | "outlined" | "contained";
type ButtonColor = "primary" | "secondary";

interface ButtonProps {
  size: ButtonSize;
  shape: ButtonShape;
  variant: ButtonVariant;
  color: ButtonColor;
  onClick: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  width?: React.CSSProperties["width"];
  weight?: React.CSSProperties["fontWeight"];
}

const Button = ({ leftIcon, rightIcon, children, weight = "400", ...props }: ButtonProps) => {
  return (
    <StyledButton {...props} weight={weight}>
      {leftIcon}
      {children}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  column-gap: 8px;
  padding: 0px 24px;
  cursor: pointer;

  width: ${({ width }) => width || "fit-content"};
  border-radius: ${({ shape }) => getBorderRadius(shape)};
  height: ${({ size }) => getHeight(size)};
  border: ${({ variant }) => getBorder(variant)};
  border-color: ${({ color, theme }) => theme.color[color]};
  background-color: ${({ variant, color, theme }) => getBackgroundColor({ variant, color, theme })};

  color: ${({ variant, color, theme }) => getFontColor({ variant, color, theme })};
  font-size: ${({ size }) => getFontSize(size)};
  font-weight: ${({ weight }) => weight};

  :hover {
    opacity: 0.9;
  }

  :disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
`;

const getFontSize = (size: ButtonSize) => {
  const fontSize = {
    large: "18px",
    medium: "16px",
    small: "14px",
  };

  return fontSize[size];
};

const getBackgroundColor = ({
  variant,
  color,
  theme,
}: {
  variant: ButtonVariant;
  color: ButtonColor;
  theme: DefaultTheme;
}) => {
  const backgroundColor = {
    text: "transparent",
    outlined: "transparent",
    contained: theme.color[color],
  };

  return backgroundColor[variant];
};

const getFontColor = ({
  variant,
  color,
  theme,
}: {
  variant: ButtonVariant;
  color: ButtonColor;
  theme: DefaultTheme;
}) => {
  const fontColor = {
    text: theme.color[color],
    outlined: theme.color[color],
    contained: "#EEE",
  };

  return fontColor[variant];
};

const getBorder = (variant: ButtonVariant) => {
  const buttonBorder = {
    text: "none",
    outlined: "1px solid",
    contained: "none",
  };

  return buttonBorder[variant];
};

const getBorderRadius = (shape: ButtonShape) => {
  const buttonBorderRadius = {
    circle: "100px",
    round: "4px",
  };

  return buttonBorderRadius[shape];
};

const getHeight = (size: ButtonSize) => {
  const buttonHeight = {
    large: "40px",
    medium: "32px",
    small: "24px",
  };

  return buttonHeight[size];
};
