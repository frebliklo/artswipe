import { db } from './index'

export const createUser = user => {
  const { uid } = user
  return db.ref('users/' + uid).set({
    ...user
  })
}

export const getUser = async uid => {
  const snapshot = await db.ref('users/' + uid).once('value')
  return snapshot.val()
}

export const createDbMatch = async (uid, match) => {
  const matchPartial = {
    seen: false,
    read: false,
    createdAt: Date.now()
  }
  await db.ref(`users/${match}/matches`).push({ user: uid, ...matchPartial })
  const ref = await db.ref(`users/${uid}/matches`).push({ user: match, ...matchPartial })
  return ref
}

export const addDbMatch = (uid, match) => {
  return db.ref(`users/${uid}/matches`).push(match)
}

export const getDbMatches = async uid => {
  const snapshot = await db.ref(`users/${uid}/matches`).once('value')
  const allMatches = []
  const newMatches = []
  const prevMatches = []
  snapshot.forEach(childSnapshot => {
    const item = {
      id: childSnapshot.key,
      ...childSnapshot.val()
    }
    allMatches.push(item)
    if(childSnapshot.val().seen !== true) {
      newMatches.push(item)
    } else {
      prevMatches.push(item)
    }
  })
  return { allMatches, newMatches, prevMatches }
}

export const seenDbMatch = (uid, matchId) => {
  if(uid && matchId) {
    return db.ref(`users/${uid}/matches/${matchId}`).update({ seen: true })
  }
}

export const getMatchUsers = async ({ user }) => {
  const snapshot = await db.ref('users/' + user).once('value')
  return snapshot.val()
}
