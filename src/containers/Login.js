import React from 'react'
import { withRouter } from 'react-router-dom'

import HelpText from '../components/styled/HelpText'
import IntroContainer from '../components/styled/IntroContainer'
import TextLink from '../components/styled/TextLink'
import Title from '../components/styled/Title'

import LoginForm from '../components/LoginForm';

const Login = () => (
  <IntroContainer>
    <Title>Sign in</Title>
    <LoginForm />
    <HelpText>
      Don't have an account? <TextLink to="/signup">Create an account here</TextLink>
    </HelpText>
  </IntroContainer>
)

export default withRouter(Login)
