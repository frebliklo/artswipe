import { db } from './index'

export const createUser = user => {
  const { uid } = user
  return db.ref('users/' + uid).set({
    ...user
  })
}

export const getUser = uid => {
  return db.ref('users/' + uid).once('value').then(snapshot => {
    return snapshot.val()
  })
}
