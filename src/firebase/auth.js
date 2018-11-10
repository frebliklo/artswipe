import { auth } from './firebase'

export const signUpWithEmail = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
}

export const loginWithEmail = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
}

export const signOut = () => auth.signOut()
