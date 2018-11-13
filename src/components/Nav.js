import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'

import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'
import { ReactComponent as MenuIcon } from '../assets/menu.svg'

import { startLogout } from '../actions/auth'
import { flushCulture } from '../actions/culture'

import { theme } from '../constants'

const PosedNavContainer = posed.nav({
  enter: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50,
    transition: { ease: 'easeOut', duration: 250 }
  },
  exit: { x: '-100%', delay: 300 }
})

const PosedNavItem = posed.button({
  enter: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 }
})

const PosedSection = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 }
})

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

const NavContainer = styled(PosedNavContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 0;
  right: auto;
  bottom: 0;
  left: 0;
  min-width: 30rem;
  padding: 1.6rem;
  background: #FFFDED;
  z-index: 100;
  box-shadow: ${props => props.open ? '1px 0 35px rgba(0,0,0,.35)' : '0 0 0 rgba(0,0,0,0)'};
  transition: box-shadow 200ms ease-in-out;
`

const NavItem = styled(PosedNavItem)`
  font-size: 2.4rem;
  color: ${theme.color.main};
  padding: .8rem 1.2rem;
  margin-bottom: 1.6rem;
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

const Section = styled(PosedSection)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-bottom: 2px solid ${theme.color.secondary + '44'};
  margin-bottom: 1.6rem;
`

const BackButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: none;
  border: none;
  border-radius: 4px;
  outline: none;
  margin-bottom: .8rem;
  padding: .8rem 1.6rem .8rem .8rem;
  transition: background 150ms ease-in-out;

  & svg > path {
    fill: ${theme.color.grey};
  }

  &:hover {
    background: ${theme.color.secondary + '33'};
  }

  &:focus {
    background: ${theme.color.secondary + '77'};
  }
`

const BackText = styled.p`
  margin-left: 1.2rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: ${theme.color.grey};
`

class Nav extends Component {
  state = {
    isOpen: false
  }
  
  handleLogout = () => {
    this.setState({ isOpen: false })
    this.props.flushCulture()
    this.props.startLogout()
  }

  handleOpenNav = () => {
    this.setState({ isOpen: true })
  }

  handleCloseNav = () => {
    this.setState({ isOpen: false })
  }

  renderNavContainer = () => {
    const { isOpen } = this.state
    
    return (
      <NavContainer key="container" pose={isOpen ? 'open' : 'closed'} open={isOpen}>
        <Section>
          <BackButton onClick={this.handleCloseNav}>
            <BackArrow width={20} height={20} />
            <BackText>Close</BackText>
          </BackButton>
        </Section>
        <Section>
          <NavItem>Swipe</NavItem>
          <NavItem>Matches</NavItem>
        </Section>
        <Section>
          <NavItem onClick={this.handleLogout}>Sign out</NavItem>
        </Section>
      </NavContainer>
    )
  }
  
  render() {
    const { isOpen } = this.state

    return (
      <>
        <MenuButton onClick={this.handleOpenNav}>
          <MenuIcon width={32} height={32} />
        </MenuButton>
        <PoseGroup>
          {isOpen ? this.renderNavContainer() : null}
        </PoseGroup>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  flushCulture: () => dispatch(flushCulture()),
  startLogout: () => dispatch(startLogout())
})

export default withRouter(
  connect(null, mapDispatchToProps)(Nav)
)
