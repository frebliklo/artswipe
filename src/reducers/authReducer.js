import { LOGIN, LOGOUT, SIGNUP } from '../actions/types'

export default (state = {}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...action.user
      }
    case SIGNUP:
      return {
        ...action.user
      }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
