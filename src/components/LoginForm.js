import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { startLogin } from '../actions/auth'

import Input from './Input'

import Button from './styled/Button'
import FacebookButton from './styled/FacebookButton'
import Form from './styled/Form'
import SeperatorText from './styled/SeperatorText'

import { signInWithFacebook } from '../firebase'
import { createUser, getUser } from '../firebase/db'

class LoginForm extends Component {
  handleFacebookLogin = async () => {
    const { history } = this.props
    const res = await signInWithFacebook()
    const user = await getUser(res.user.uid)
    if(!user) {
      const { profile } = res.additionalUserInfo
      const newUser = {
        uid: res.user.uid,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: res.user.email,
        avatar: res.user.photoURL
      }
      await createUser(newUser)
      history.push('/app')
    } else {
      history.push('/app')
    }
  }
  
  render() {
    const { history, startLogin } = this.props

    return [
      <Formik
        key="loginForm"
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
          startLogin(username, password)
            .then(() => {
              actions.resetForm()
              history.push('/app')
            })
            .catch(error => {
              alert(error)
            })
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
            <Button mt="1.6rem" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>,
      <SeperatorText key="seperatorText">- or use one of these services -</SeperatorText>,
      <FacebookButton key="facebookLoginBtn" onClick={this.handleFacebookLogin} mb=".8rem">Sign in with Facebook</FacebookButton>
    ]
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: (username, password) => dispatch(startLogin(username, password))
})

export default withRouter(
  connect(null, mapDispatchToProps)(LoginForm)
)
