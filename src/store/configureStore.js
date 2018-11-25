import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import authReducer from '../reducers/authReducer'
import cultureReducer from '../reducers/cultureReducer'
import matchesReducer from '../reducers/matchesReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      culture: cultureReducer,
      matches: matchesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}

export default configureStore
