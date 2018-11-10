import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const NavContainer = styled.nav`
  position: absolute;
  top: 1.6rem;
  right: auto;
  bottom: auto;
  left: 1.6rem;
  display: flex;
`

const NavLink = styled(Link)`
  padding: .4rem .8rem;
  background: none;
  border-radius: 4px;
  transition: background 200ms;
  margin-right: .8rem;

  &:hover {
    background: rgba(0,0,0,.25);
  }

  &:active {
    background: rgba(0,0,0,.45);
  }
`

const Nav = () => (
  <NavContainer>
    <NavLink to="/swipe">Swipe</NavLink>
    <NavLink to="/matches">Matches</NavLink>
  </NavContainer>
)

export default Nav
