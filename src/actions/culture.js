import axios from 'axios'

import {
  ADD_CULTURE,
  GET_CULTURE_START,
  GET_CULTURE_ERROR,
  REMOVE_CULTURE
} from './types'

import { API_BASE_URL } from '../constants'

export const addCulture = culture => ({
  type: ADD_CULTURE,
  culture
})

export const getCultureStart = () => ({
  type: GET_CULTURE_START
})

export const getCultureError = error => ({
  type: GET_CULTURE_ERROR,
  error
})

export const getCulture = () => {
  return (dispatch, getState) => {
    dispatch(getCultureStart())

    const uid = getState().auth.uid

    return axios({
      url: `${API_BASE_URL}/culture?user=${uid}`,
      method: 'get'
    })
      .then(res => {
        dispatch(addCulture(res.data))
        return res
      })
      .catch(err => {
        dispatch(getCultureError(err))
        return err
      })
  }
}

export const removeCulture = culture => ({
  type: REMOVE_CULTURE,
  culture
})
