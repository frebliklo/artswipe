import axios from 'axios'
// import moment from 'moment'

import {
  ADD_MATCHES,
  GET_MATCHES_START,
  GET_MATCHES_ERROR,
  FETCH_MATCHES_START,
  FETCH_MATCHES_ERROR,
  UPDATE_MATCH_START,
  UPDATE_MATCH_ERROR,
  MARK_ALL_READ
} from './types'

import { getDbMatches, createDbMatch, seenDbMatch } from '../firebase/db'

import { API_BASE_URL } from '../constants'

export const addMatches = (allMatches, newMatches, prevMatches) => ({
  type: ADD_MATCHES,
  allMatches,
  newMatches,
  prevMatches
})

export const getMatchesStart = () => ({
  type: GET_MATCHES_START
})

export const getMatchesError = error =>  ({
  type: GET_MATCHES_ERROR,
  error
})

export const getMatches = () => {
  return async (dispatch, getState) => {
    dispatch(getMatchesStart())

    const { uid } = getState().auth

    const { allMatches, newMatches, prevMatches } = await getDbMatches(uid)

    try {
      dispatch(addMatches(allMatches, newMatches, prevMatches))
    }
    catch(err) {
      dispatch(getMatchesError(err))
    }
  }
}

export const fetchMatchesStart = () => ({
  type: FETCH_MATCHES_START
})

export const fetchMatchesError = error => ({
  type: FETCH_MATCHES_ERROR,
  error
})

export const fetchMatches = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMatchesStart())

    const { uid } = getState().auth

    const { data } = await axios({
      url: `${API_BASE_URL}/match?user=${uid}`,
      method: 'get'
    })

    const { allMatches } = getState().matches

    const existingMatches = []

    allMatches.forEach(match => existingMatches.push(match.user))

    data.map(item => {
      if(existingMatches.includes(item) !== true) {
        return createDbMatch(uid, item)
      }
      return null
    })

    const dbMatches = await getDbMatches(uid)

    try {
      dispatch(addMatches(dbMatches.allMatches, dbMatches.newMatches, dbMatches.prevMatches))
    }
    catch(err) {
      dispatch(fetchMatchesError(err))
    }
  }
}

export const updateMatchStart = () => ({
  type: UPDATE_MATCH_START
})

export const updateMatchError = error => ({
  type: UPDATE_MATCH_ERROR,
  error
})

export const updateMatch = () => {
  return async (dispatch, getState) => {
    dispatch(updateMatchStart)

    const { uid } = getState().auth
    const { newMatches } = getState().matches

    await newMatches.forEach(match => {
      return seenDbMatch(uid, match.id)
    })

    try {
      dispatch(markMatchesRead())
    }
    catch(err) {
      dispatch(updateMatchError(err))
    }
  }
}

export const markMatchesRead = () => ({
  type: MARK_ALL_READ
})
