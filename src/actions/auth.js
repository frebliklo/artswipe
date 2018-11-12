import { LOGIN, LOGOUT, SIGNUP } from './types'
import { signOut, signInWithEmail, signUpWithEmail } from '../firebase'

export const login = uid => ({
  type: LOGIN,
  uid
})

export const startLogin = (username, password) => {
  return () => {
    return signInWithEmail(username, password)
  }
}

export const signup = uid => ({
  type: SIGNUP,
  uid
})

export const startSignup = (username, password) => {
  return () => {
    return signUpWithEmail(username, password)
  }
}

export const logout = () => ({
  type: LOGOUT
})

export const startLogout = () => {
  return () => {
    return signOut()
  }
}
