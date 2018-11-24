import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

import Button from './Button'
import { ReactComponent as FacebookLogo } from '../../assets/facebook.svg'

import { theme } from '../../constants'

const FacebookThemedButtom = styled(Button)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.color.facebook};
  color: #FFF;
  text-transform: none;
  text-align: center;
  font-weight: 400;

  &:hover, &:focus {
    background: ${darken(0.2, theme.color.facebook)};
  }

  &:active {
    background: ${darken(0.3, theme.color.facebook)};
  }
`

const Logo = styled(FacebookLogo)`
  width: 2.4rem;
  height: 2.4rem;
  position: absolute;
  top: 1.2rem;
  right: auto;
  bottom: auto;
  left: 1.2rem;
`

const FacebookButton = ({ onClick, children, ...rest }) => (
  <FacebookThemedButtom onClick={onClick} {...rest}>
    <Logo />
    {children ? children : 'Facebook'}
  </FacebookThemedButtom>
)

export default FacebookButton
