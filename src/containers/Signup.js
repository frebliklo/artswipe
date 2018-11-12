import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { startSignup } from '../actions/auth'

import Button from '../components/Button'
import IntroContainer from '../components/IntroContainer'
import Input from '../components/Input'
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

class Signup extends Component {
  state = {
    btnPressed: false,
  }

  handleAuth = (email, password) => {
    const { history, startSignup } = this.props

    startSignup(email, password)
      .then(res => {
        console.log(res)
        history.replace('/')
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
                <Title>Sign up</Title>
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
                  Sign up
                </LoginButton>
                <HelpText>
                  Already have an account? <TextLink to="/login">Log in here</TextLink>
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
  startSignup: (username, password) => dispatch(startSignup(username, password))
})

export default withRouter(connect(null, mapDispatchToProps)(Signup))
