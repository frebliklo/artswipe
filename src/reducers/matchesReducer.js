import {
  ADD_MATCHES,
  GET_MATCHES_ERROR
} from '../actions/types'

const matchesReducerDefaultState = {
  allMatches: [],
  newMatches: [],
  prevMatches: [],
  error: null
}

export default (state = matchesReducerDefaultState, action) => {
  switch(action.type) {
    case ADD_MATCHES:
      const { allMatches, newMatches, prevMatches } = action
      return {
        allMatches,
        newMatches,
        prevMatches,
        error: null
      }
    case GET_MATCHES_ERROR:
      return {
        allMatches: state.allMatches,
        newMatches: state.newMatches,
        prevMatches: state.prevMatches,
        error: action.error
      }
    default:
      return state
  }
}
