import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { theme } from '../constants'
import AuthContext from '../context/AuthContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 32rem;
  background: ${theme.color.white};
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,.25), 0 2px 30px rgba(0,0,0,.15);
  padding: 1.6rem 2.4rem 3.2rem;
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
    const { emailInput } = this.state
    // const { emailInput, passwordInput } = this.state

    return (
      <AuthContext.Consumer>
        {({ toggleAuth, updateUser }) => (
          <Container>
            <Title>Login</Title>
            <Input
              placeholder="Input username..."
              onChange={this.onChangeEmail}
              value={emailInput}
            />
            {/* <Input
              type="password"
              placeholder="Input password"
              onChange={this.onChangePassword}
              value={passwordInput}
            /> */}
            <Button onClick={() => this.onSubmit(toggleAuth, updateUser, history)}>
              Login
            </Button>
          </Container>
        )}
      </AuthContext.Consumer>
    )
  }
}

export default withRouter(Login)
