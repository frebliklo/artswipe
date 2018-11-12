import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Button from '../components/Button'
import Input from '../components/Input'
import IntroContainer from '../components/IntroContainer'
import Title from '../components/Title'
import { theme } from '../constants'
import { auth } from '../firebase'

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
`

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

const LoginButton = styled(Button)`
  margin-top: 1.6rem;
`

class Login extends Component {
  handleAuth = (email, password) => {
    return console.log(email, password)
    // const { history } = this.props
    
    // auth.signUpWithEmail(email, password)
    //   .then(() => console.log('Successfully logged in'))
    //   .catch(err => console.log(err.code, err.message))
    
    // history.replace('/swipe')
  }
  
  render() {
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
        validateOnChange={false}
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
                <SignUpText>
                  Don't have an account? <TextLink to="/sign-up">Sign up here</TextLink>
                </SignUpText>
              </IntroContainer>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

export default withRouter(Login)
