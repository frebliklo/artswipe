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
  return async (dispatch, getState) => {
    dispatch(getCultureStart())

    const uid = getState().auth.uid

    const res = await axios({
      url: `${API_BASE_URL}/culture?user=${uid}&count=10`,
      method: 'get',
    })

    const culture = res.data.map(item => {
      return {
        asset_id: item.asset_id,
        title: item.title,
        thumb: `${API_BASE_URL}/image?asset_id=${item.asset_id}`
      }
    })

    try {
      dispatch(addCulture(culture))
    }
    catch (err) {
      dispatch(getCultureError(err))
    }
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
  return async (dispatch, getState) => {
    dispatch(sendChoiceStart())

    const uid = getState().auth.uid
    const { asset_id } = culture

    await axios({
      url: `${API_BASE_URL}/choose?user=${uid}&asset_id=${asset_id}&choice=${choice}`,
      method: 'get',
    })

    try {
      dispatch(removeCulture(culture))
    }
    catch (err) {
      dispatch(sendChoiceError(err))
    }
  }
}

export const flushCulture = () => ({
  type: FLUSH_CULTURE
})
