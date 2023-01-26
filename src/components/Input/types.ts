import React, { InputHTMLAttributes } from "react";
import { CommonStyleProps } from "@/types/common";

export interface InputProps
  extends CommonStyleProps,
    InputHTMLAttributes<HTMLInputElement> {
  variant?: "standard" | "outlined";
  padding?: string;
  margin?: string;
  fontSize?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

// export type InputStyleProps = Omit<
//   InputProps,
//   keyof InputHTMLAttributes<HTMLInputElement>
// >;
