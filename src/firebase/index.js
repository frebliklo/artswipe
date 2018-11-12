import * as firebase from 'firebase'
require('firebase/auth')

const config = {
  apiKey: 'AIzaSyBCv65HAwP5D9qI63lngrJ_u4Nb74MmE4c',
  authDomain: 'kultinder-dfd81.firebaseapp.com',
  databaseURL: 'https://kultinder-dfd81.firebaseio.com',
  projectId: 'kultinder-dfd81',
  storageBucket: 'kultinder-dfd81.appspot.com',
  messagingSenderId: '799348863404',
}

if(!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const signUpWithEmail = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const signInWithEmail = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = () => firebase.auth().signOut()

export default firebase
