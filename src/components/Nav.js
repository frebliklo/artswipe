import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import posed from 'react-pose'
import styled from 'styled-components'

import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'

import { startLogout } from '../actions/auth'
import { closeNav } from '../actions/nav'

import { theme } from '../constants'

const PosedNavContainer = posed.nav({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50,
    transition: { ease: 'easeOut', duration: 250 }
  },
  closed: { x: '-100%', delay: 300 }
})

const PosedNavItem = posed.button({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
})

const PosedSection = posed.div({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
})

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
  background: ${theme.color.offWhite};
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
  outline: none;
  margin-bottom: 1.6rem;

  & svg > path {
    fill: ${theme.color.grey};
  }
`

const BackText = styled.p`
  margin-left: 1.2rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: ${theme.color.grey};
`

class Nav extends Component {
  handleLogout = () => {
    this.props.closeNav()
    this.props.startLogout()
  }
  
  render() {
    const { navOpen, startLogout, closeNav } = this.props

    return (
      <NavContainer pose={navOpen ? 'open' : 'closed'} open={navOpen}>
        <Section>
          <BackButton onClick={closeNav}>
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
}

const mapStateToProps = (state, props) => ({
  navOpen: state.nav.navOpen
})

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
  closeNav: () => dispatch(closeNav())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
