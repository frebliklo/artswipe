import styled from 'styled-components'
import { darken } from 'polished'
import { theme } from '../../constants'

const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: ${props => props.small ? '1.4rem' : '1.6rem'};
  line-height: 1.5;
  font-weight: 600;
  margin-top: ${props => props.mt ? props.mt : 0};
  margin-bottom: ${props => props.mb ? props.mb : 0};
  padding: ${props => props.small ? '.4rem 1.2rem' : '1.2rem'};
  text-transform: uppercase;
  outline: none;
  background: ${theme.color.main};
  color: #FFF;
  box-shadow: 0 2px 6px ${theme.color.secondary};
  transition: background 150ms ease-in;
  cursor: pointer;

  &:hover, &:focus {
    background: ${darken(0.1, theme.color.main)};
    transition: background 180ms ease-out;
  }

  &:active {
    background: ${darken(0.2, theme.color.main)};
  }
`

export default Button
