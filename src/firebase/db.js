import { db } from './index'

export const createUser = user => {
  const { uid } = user
  return db.ref('users/' + uid).set({
    ...user
  })
}

export const getUser = async uid => {
  const snapshot = await db.ref('users/' + uid).once('value');
  return snapshot.val();
}
