import { OPENNAV, CLOSENAV } from '../actions/types'

export default (state = { navOpen: false }, action) => {
  switch(action.type) {
    case OPENNAV:
      return {
        navOpen: true
      }
    case CLOSENAV:
      return {
        navOpen: false
      }
    default:
      return state
  }
}
