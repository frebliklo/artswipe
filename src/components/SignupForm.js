import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { startSignup } from '../actions/auth'

import Input from './Input'

import Button from './styled/Button'
import Form from './styled/Form'

const LoginButton = styled(Button)`
  margin-top: 1.6rem;
`

const SignupForm = ({ history, startSignup }) => (
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
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={(values, actions) => {
      actions.setSubmitting(true)
      const { firstName, lastName, email, password } = values
      const user = { firstName, lastName, email }
      startSignup(user, password)
        .then(() => {
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
        </Form>
      )
    }}
  </Formik>
)

const mapDispatchToProps = dispatch => ({
  startSignup: (username, password) => dispatch(startSignup(username, password))
})

export default withRouter(
  connect(null, mapDispatchToProps)(SignupForm)
)
