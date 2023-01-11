import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style-type: none;
}

body {
  font-family: 'SUITE', sans-serif;
}
`;
