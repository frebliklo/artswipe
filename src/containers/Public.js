import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { theme } from '../constants'

import LoginModal from '../components/LoginModal'
import PublicNav from '../components/PublicNav'

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
  state = {
    loginVisible: false
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.login) {
      this.setState(() => ({ loginVisible: true }))
    }
  }
  
  renderPublic = () => (
    <>
      <LoginModal
        visible={this.state.loginVisible}
        dismiss={() => this.setState({ loginVisible: false })}
      />
      <PublicContainer>
        <PublicNav onClick={() => this.setState({ loginVisible: true })} />
        <HeaderContainer>
          <div>
            <Title>ArtSwipe</Title>
            <SubTittle>Find likeminded people based on fascinating cultture</SubTittle>
          </div>
        </HeaderContainer>
      </PublicContainer>
    </>
  )
  
  render() {
    const { isAuthenticated } = this.props
    return isAuthenticated ? <Redirect to="/app" /> : this.renderPublic()
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
})

export default withRouter(
  connect(mapStateToProps)(Public)
)
