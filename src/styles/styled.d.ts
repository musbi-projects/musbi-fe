import 'styled-components';

export type ThemeColor = 'primary' | 'secondary' | 'black' | 'lightGray' | 'deepGray' | 'border';
type FontSize = 'title' | 'body' | 'label';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: { [key in ThemeColor]: string };
    font: {
      [key in FontSize]: {
        large: string;
        medium: string;
        small: string;
      };
    };
  }
}
