import styled, { keyframes } from 'styled-components'
import { theme } from '../constants';

const rotate = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`

const Spinner = styled.div`
  &,&::before,&::after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${rotate} 1.8s infinite ease-in-out;
  }

  color: ${theme.color.offWhite};
  font-size: 10px;
  margin: auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &::before,&::after {
    content: '';
    position: absolute;
    top: 0;
  }

  &::before {
    left: -3.5em;
    animation-delay: -0.32s;
  }

  &::after {
    left: 3.5em;
  }
`

export default Spinner
