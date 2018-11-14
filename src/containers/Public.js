import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from '../constants'

const PublicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  height: 100%;
  max-width: 80rem;
  padding: 1.6rem;
`
const PublicNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`

const NavLink = styled(Link)`
  font-size: 1.4rem;
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

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1.6rem;
`

const Title = styled.h1`
  font-size: 4.8rem;
  line-height: 1.2;
  color: ${theme.color.main};
  text-shadow: 1px 1px 3px rgba(0,0,0,.2);
`

const SubTittle = styled.h2`
  font-size: 2.4rem;
  line-height: 1.5;
  color: ${theme.color.mainDark};
`

class Public extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props
    
    if(isAuthenticated) {
      history.push('/app')
    }
  }
  
  render() {
    return (
      <PublicContainer>
        <PublicNav>
          <NavLink to="/login">Login</NavLink>
        </PublicNav>
        <HeaderContainer>
          <div>
            <Title>ArtSwipe</Title>
            <SubTittle>Find likeminded people based on fascinating cultture</SubTittle>
          </div>
        </HeaderContainer>
      </PublicContainer>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isAuthenticated: !!state.auth.uid
})

export default withRouter(
  connect(mapStateToProps)(Public)
)
