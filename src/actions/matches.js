import axios from 'axios'
// import moment from 'moment'

import {
  ADD_MATCHES,
  GET_MATCHES_START,
  GET_MATCHES_ERROR,
  FETCH_MATCHES_START,
  FETCH_MATCHES_ERROR
} from './types'

import { getDbMatches, createDbMatch } from '../firebase/db'

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

    try {
      return getMatches()
    }
    catch(err) {
      dispatch(fetchMatchesError(err))
    }
  }
}
