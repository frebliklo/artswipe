import axios from 'axios'

import {
  ADD_CULTURE,
  GET_CULTURE_START,
  GET_CULTURE_ERROR,
  SEND_CHOICE_START,
  SEND_CHOICE_ERROR,
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
      url: `${API_BASE_URL}/choose?user=${uid}&asset_id=${asset_id}&choice=${choice}`,
      method: 'get'
    }).
      then(res => {
        dispatch(removeCulture(culture))
        return res
      })
      .catch(err => {
        dispatch(sendChoiceError(err))
        return err
      })
  }
}
