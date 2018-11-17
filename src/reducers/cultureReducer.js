import {
  ADD_CULTURE,
  REMOVE_CULTURE,
  FLUSH_CULTURE,
  GET_CULTURE_ERROR
} from '../actions/types'

const cultureReducerDefaultState = {
  all: [],
  active: undefined,
  error: null
}

export default (state = cultureReducerDefaultState, action) => {
  switch(action.type) {
    case ADD_CULTURE:
      const newAddState = [...state.all, ...action.culture]
      return {
        all: newAddState,
        active: newAddState.slice(1)[0],
        error: null
      }
    case REMOVE_CULTURE:
      const newRemoveState = state.all.filter(({ asset_id }) => asset_id !== action.culture.asset_id)
      return {
        all: newRemoveState,
        active: newRemoveState.slice(1)[0],
        error: null
      }
    case FLUSH_CULTURE:
      return cultureReducerDefaultState
    case GET_CULTURE_ERROR:
      return {
        all: state.all,
        active: state.active,
        error: action.error
      }
    default:
      return state
  }
}
