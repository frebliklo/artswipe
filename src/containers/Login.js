import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { startLogin } from '../actions/auth'

import Button from '../components/Button'
import Input from '../components/Input'
import IntroContainer from '../components/IntroContainer'
import Title from '../components/Title'

import Form from '../components/styled/Form'
import HelpText from '../components/styled/HelpText'

import { theme } from '../constants'

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

const LoginButton = styled(Button)`
  margin-top: 1.6rem;
`

class Login extends Component {
  state = {
    btnPressed: false,
  }

  handleAuth = (email, password) => {
    const { history, startLogin } = this.props

    startLogin(email, password)
      .then(res => {
        history.replace('/app')
      })
      .catch(error => {
        alert(error)
      })
  }
  
  render() {
    const { btnPressed } = this.state

    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().email().required('Required'),
          password: Yup.string().min(5).required()
        })}
        validateOnChange={btnPressed}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          const { username, password } = values
          this.handleAuth(username, password)
          actions.resetForm()
        }}
      >
        {props => {
          const {
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = props

          return (
            <Form onSubmit={handleSubmit}>
              <IntroContainer>
                <Title>Login</Title>
                <Input
                  id="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username ? errors.username : null}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password ? errors.password : null}
                />
                <LoginButton type="submit">
                  Login
                </LoginButton>
                <HelpText>
                  Don't have an account? <TextLink to="/sign-up">Sign up here</TextLink>
                </HelpText>
              </IntroContainer>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: (username, password) => dispatch(startLogin(username, password))
})

export default withRouter(
  connect(null, mapDispatchToProps)(Login)
)
