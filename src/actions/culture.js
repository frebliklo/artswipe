import axios from 'axios'

import {
  ADD_CULTURE,
  GET_CULTURE_START,
  GET_CULTURE_ERROR,
  REMOVE_CULTURE,
  SEND_CHOICE_START,
  SEND_CHOICE_ERROR,
  FLUSH_CULTURE
} from './types'

import { API_BASE_URL, CORS_ANYWHERE } from '../constants'

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
      url: `${CORS_ANYWHERE}${API_BASE_URL}/culture?user=${uid}&count=5`,
      method: 'get',
      // headers: { 'Origin': `${API_BASE_URL}` }
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

export const sendChoiceStart = () => ({
  type: SEND_CHOICE_START
})

export const sendChoiceError = error => ({
  type: SEND_CHOICE_ERROR,
  error
})

export const sendChoice = (choice, culture) => {
  return (dispatch, getState) => {
    dispatch(sendChoiceStart())

    const uid = getState().auth.uid
    const { asset_id } = culture

    return axios({
      url: `${CORS_ANYWHERE}${API_BASE_URL}/choose?user=${uid}&asset_id=${asset_id}&choice=${choice}`,
      method: 'get',
      // headers: { 'Origin': `${API_BASE_URL}` }
    })
      .then(res => {
        dispatch(removeCulture(culture))
        return res
      })
      .catch(err => {
        dispatch(sendChoiceError(err))
        return err
      })
  }
}

export const flushCulture = () => ({
  type: FLUSH_CULTURE
})
