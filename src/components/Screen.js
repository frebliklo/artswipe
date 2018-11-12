import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { ReactComponent as MenuIcon } from '../assets/menu.svg'

import { openNav } from '../actions/nav'

import { theme } from '../constants'

const StyledScreen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${theme.gradient};
  position: relative;
`

const MenuButton = styled.button`
  position: absolute;
  top: 1.6rem;
  right: auto;
  bottom: auto;
  left: 1.6rem;
  background: none;
  border: none;
  outline: none;
`

const Screen = ({ children, isAuthenticated, openNav }) => (
  <StyledScreen>
    {isAuthenticated ? (
      <MenuButton onClick={openNav}>
        <MenuIcon width={32} height={32} />
      </MenuButton>
    ) : null}
    {children}
  </StyledScreen>
)

const mapStateToProps = (state, props) => ({
  isAuthenticated: !!state.auth.uid
})

const mapDispatchToProps = dispatch => ({
  openNav: () => dispatch(openNav())
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
