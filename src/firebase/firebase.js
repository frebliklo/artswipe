import firebase from 'firebase'

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

export const auth = firebase.auth()
