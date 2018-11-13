import { ADDCULTURE, REMOVECULTURE } from './types'

export const addCulture = culture => ({
  type: ADDCULTURE,
  culture
})

export const removeCulture = culture => ({
  type: REMOVECULTURE,
  culture
})
