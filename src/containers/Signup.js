import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { startSignup } from '../actions/auth'

import IntroContainer from '../components/IntroContainer'
import Input from '../components/Input'

import Button from '../components/styled/Button'
import Form from '../components/styled/Form'
import HelpText from '../components/styled/HelpText'
import Title from '../components/styled/Title'

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
    pose: 'init'
  }

  render() {
    const { btnPressed } = this.state
    const { history, startSignup } = this.props

    return (
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: ''
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          email: Yup.string().email('Must be a valid email address').required('Required'),
          password: Yup.string().min(5, 'Password must be at least 5 characters').required(),
          passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Password confirmation is required')
        })}
        validateOnChange={btnPressed}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          this.setState({ btnPressed: true })
          actions.setSubmitting(true)
          const { firstName, lastName, email, password } = values
          const user = { firstName, lastName, email }
          startSignup(user, password)
            .then(() => {
              this.setState({ pose: 'exit' })
              actions.resetForm()
              history.push('/app')
            })
            .catch(error => {
              alert(error)
            })
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
                  id="firstName"
                  placeholder="First name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName ? errors.firstName : null}
                />
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName ? errors.lastName : null}
                />
                <Input
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email ? errors.email : null}
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
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Confirm password"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.passwordConfirm ? errors.passwordConfirm : null}
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

export default withRouter(
  connect(null, mapDispatchToProps)(Signup)
)
