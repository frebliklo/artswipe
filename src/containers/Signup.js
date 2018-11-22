import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import { startSignup } from '../actions/auth'

import SignupForm from '../components/SignupForm'

import HelpText from '../components/styled/HelpText'
import IntroContainer from '../components/styled/IntroContainer'
import Title from '../components/styled/Title'

import { theme } from '../constants'
import { signInWithFacebook } from '../firebase'
import { createUser } from '../firebase/db'

const TextLink = styled(Link)`
  text-decoration: underline;
  color: ${theme.color.secondary};
  transition: color 140ms ease-in-out;

  &:hover {
    color: ${theme.color.main};
  }

  &:active {
    color: ${theme.color.fg};
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
    return (
      <IntroContainer>
        <Title>Sign up</Title>
        <SignupForm />
        <button onClick={this.handleFacebookSignup}>Sign up with Facebook</button>
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
