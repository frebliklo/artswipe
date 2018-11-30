import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import HelpText from '../components/styled/HelpText'
import IntroContainer from '../components/styled/IntroContainer'
import TextLink from '../components/styled/TextLink'
import Title from '../components/styled/Title'

import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'

import LoginForm from '../components/LoginForm'

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

const Login = ({ history }) => (
  <IntroContainer>
    <Header>
      <BackButton onClick={() => history.push('/')} />
      <Title>Sign in</Title>
    </Header>
    <LoginForm />
    <HelpText>
      Don't have an account? <TextLink to="/signup">Create an account here</TextLink>
    </HelpText>
  </IntroContainer>
)

export default withRouter(Login)
