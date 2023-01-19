import "styled-components";

export type ThemeColor =
  | "primary"
  | "secondary"
  | "black"
  | "lightGray"
  | "deepGray"
  | "border";

declare module "styled-components" {
  export interface DefaultTheme {
    color: { [key in ThemeColor]: string };
  }
}
