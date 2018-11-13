import { ADDCULTURE, REMOVECULTURE } from '../actions/types'

const cultureReducerDefaultState = []

export default (state = cultureReducerDefaultState, action) => {
  switch(action.type) {
    case ADDCULTURE:
      return [...state, action.culture]
    case REMOVECULTURE:
      return state.filter(({ asset_id }) => asset_id !== action.asset_id)
    default:
      return state
  }
}
