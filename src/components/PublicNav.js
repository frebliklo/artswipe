import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Button from './styled/Button'

import { theme } from '../constants'

const Container = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`

const NavLink = styled(Link)`
  font-size: 1.4rem;
  line-height: 1.5;
  color: ${theme.color.main};
  padding: .8rem 1.2rem;
  margin-right: 1.2rem;
  background: none;
  border: none;
  border-radius: 4px;
  outline: none;
  transition: background 150ms ease-in-out;

  &:hover {
    background: ${theme.color.secondary + '33'};
  }

  &:focus {
    background: ${theme.color.secondary + '77'};
  }
`

const PublicNav = ({ onClick }) => {
  const mq = window.matchMedia('(max-width: 600px)')
  console.log(mq)
  return (
    <Container>
      <NavLink to="/signup">Create account</NavLink>
      {mq.matches ? <Button small><Link to="/login">Sign in</Link></Button> : <Button small onClick={onClick}>Sign in</Button>}
    </Container>
  )
}

export default PublicNav
