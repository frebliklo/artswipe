import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import IntroContainer from '../components/IntroContainer'
import Title from '../components/Title'
import { theme } from '../constants'
import AuthContext from '../context/AuthContext'

const SignUpText = styled.p`
  font-size: 1.2rem;
  color: ${theme.color.grey};
  text-align: center;
  margin-top: 1.6rem;
`

const TextLink = styled(Link)`
  font-size: 1.2rem;
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

class Login extends Component {
  state = {
    emailInput: '',
    passwordInput: '',
    error: false
  }

  onChangeEmail = e => {
    this.setState({ emailInput: e.target.value })
  }

  onChangePassword = e => {
    this.setState({ passwordInput: e.target.value })
  }

  onSubmit = (toggleAuth, updateUser, history) => {
    const { emailInput } = this.state

    if(!emailInput) {
      this.setState({ error: true })
      return
    }

    updateUser(emailInput)
    toggleAuth()

    history.replace('/swipe')
  }
  
  render() {
    const { history } = this.props
    const { emailInput, passwordInput } = this.state

    return (
      <AuthContext.Consumer>
        {({ toggleAuth, updateUser }) => (
          <IntroContainer>
            <Title>Login</Title>
            <Input
              placeholder="Username"
              onChange={this.onChangeEmail}
              value={emailInput}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={passwordInput}
            />
            <Button onClick={() => this.onSubmit(toggleAuth, updateUser, history)}>
              Login
            </Button>
            <SignUpText>
              Don't have an account? <TextLink to="/sign-up">Sign up here</TextLink>
            </SignUpText>
          </IntroContainer>
        )}
      </AuthContext.Consumer>
    )
  }
}

export default withRouter(Login)
