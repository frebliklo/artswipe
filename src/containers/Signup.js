import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { startSignup } from '../actions/auth'

import SignupForm from '../components/SignupForm'

import FacebookButton from '../components/styled/FacebookButton'
import HelpText from '../components/styled/HelpText'
import IntroContainer from '../components/styled/IntroContainer'
import SeperatorText from '../components/styled/SeperatorText'
import TextLink from '../components/styled/TextLink'
import Title from '../components/styled/Title'

import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'

import { signInWithFacebook } from '../firebase'
import { createUser } from '../firebase/db'

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const BackButton = styled(BackArrow)`
  width: 2.4rem;
  height: 2.4rem;
  padding: .4rem;
  margin-right: .8rem;
  border-radius: 4px;
  transition: background 175ms ease-in-out;

  &:hover, &:focus {
    background: rgba(0,0,0,.1);
  }

  &:active {
    background: rgba(0,0,0,.25);
  }
`

class Signup extends PureComponent {
  handleFacebookSignup = async () => {
    const { history } = this.props
    const res = await signInWithFacebook()
    const { additionalUserInfo, user } = res
    const { profile } = additionalUserInfo
    const newUser = {
      uid: user.uid,
      firstName: profile.first_name,
      lastName: profile.last_name,
      email: user.email,
      avatar: user.photoURL
    }
    await createUser(newUser)
    history.push('/app')
  }

  render() {
    const { history } = this.props

    return (
      <IntroContainer>
        <Header>
          <BackButton onClick={() => history.push('/')} />
          <Title>Create account</Title>
        </Header>
        <SignupForm />
        <SeperatorText>
          - or use one of these services -
        </SeperatorText>
        <FacebookButton onClick={this.handleFacebookSignup} mb=".8rem">Sign up with Facebook</FacebookButton>
        <HelpText>
          Already have an account? <TextLink to="/login">Sign in here</TextLink>
        </HelpText>
      </IntroContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startSignup: (username, password) => dispatch(startSignup(username, password))
})

export default withRouter(
  connect(null, mapDispatchToProps)(Signup)
)
