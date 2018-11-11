import styled from 'styled-components'
import { theme } from '../constants';

const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.2rem;
  text-transform: uppercase;
  outline: none;
  background: ${theme.color.main};
  color: ${theme.color.offWhite};
  box-shadow: 0 2px 6px ${theme.color.secondary};
  transition: box-shadow 150ms ease-in;
  cursor: pointer;

  &:hover {
    background: ${theme.color.mainDark};
    transition: box-shadow 180ms ease-out;
  }
`

export default Button
