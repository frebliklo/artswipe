import {
  ADD_CULTURE,
  REMOVE_CULTURE,
  FLUSH_CULTURE
} from '../actions/types'

const cultureReducerDefaultState = []

export default (state = cultureReducerDefaultState, action) => {
  switch(action.type) {
    case ADD_CULTURE:
      return [...state, ...action.culture]
    case REMOVE_CULTURE:
      return state.filter(({ asset_id }) => asset_id !== action.culture.asset_id)
    case FLUSH_CULTURE:
      return []
    default:
      return state
  }
}
