import { OPENNAV, CLOSENAV } from './types'

export const openNav = () => ({
  type: OPENNAV
})

export const closeNav = () => ({
  type: CLOSENAV
})
