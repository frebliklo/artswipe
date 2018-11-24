import { LOGIN, LOGOUT, SIGNUP } from './types'
import { signOut, signInWithEmail, signUpWithEmail } from '../firebase'
import { createUser } from '../firebase/db'

export const login = user => ({
  type: LOGIN,
  user
})

export const startLogin = (username, password) => {
  return () => {
    return signInWithEmail(username, password)
  }
}

export const signup = user => ({
  type: SIGNUP,
  user
})

export const startSignup = (user, password) => {
  return async () => {
    const { email } = user
    const auth = await signUpWithEmail(email, password);
    const newUser = {
      uid: auth.user.uid,
      ...user
    };
    createUser(newUser);
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
