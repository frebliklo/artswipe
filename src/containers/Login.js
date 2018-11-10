import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
import Screen from '../components/Screen'
import { theme } from '../constants'
import AuthContext from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 32rem;
  background: ${theme.color.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,.25), 0 2px 30px rgba(0,0,0,.15);
  padding: 1.6rem 2.4rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  line-height: 1.2;
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

  onSubmit = (toggleAuth, updateUser) => {
    const { emailInput, passwordInput } = this.state

    if(!emailInput || !passwordInput) {
      this.setState({ error: true })
      return
    }

    updateUser(emailInput)
    toggleAuth()
  }
  
  render() {
    const { emailInput, passwordInput } = this.state

    return (
      <Screen>
        <AuthContext.Consumer>
          {({ toggleAuth, updateUser }) => (
            <Container>
              <Title>Login</Title>
              <Input
                placeholder="Input email..."
                onChange={this.onChangeEmail}
                value={emailInput}
              />
              <Input
                type="password"
                placeholder="Input password"
                onChange={this.onChangePassword}
                value={passwordInput}
              />
              <Button onClick={() => this.onSubmit(toggleAuth, updateUser)}>
                Login
              </Button>
            </Container>
          )}
        </AuthContext.Consumer>
      </Screen>
    )
  }
}

export default Login
