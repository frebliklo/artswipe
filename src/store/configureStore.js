import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import authReducer from '../reducers/authReducer'
import cultureReducer from '../reducers/cultureReducer'
import navReducer from '../reducers/navReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      culture: cultureReducer,
      nav: navReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}

export default configureStore