import { createGlobalStyle } from 'styled-components'
import { theme } from '../constants'

const { color, font } = theme

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  
  html {
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    min-height: 100vh;
    font-family: ${font};
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.5;
    color: ${color.fg};
    background: ${color.bg};
  }

  p {
    font-size: 1.6;
  }

  a, li {
    font-size: inherit;
    text-decoration: none;
    color: currentColor;
  }
`

export default GlobalStyle