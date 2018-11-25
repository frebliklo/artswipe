import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css/normalize.css'

import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import { getCulture } from './actions/culture'
import { getMatches } from './actions/matches'

import firebase from './firebase'
import { getUser } from './firebase/db'

import AppRouter from './routes/AppRouter'
import Loading from './containers/Loading'

const store = configureStore()

let hasRendered = false
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'))
    hasRendered = true
  }
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(
  <Loading />,
  document.getElementById('root')
)

firebase.auth().onAuthStateChanged(async auth => {
  if(auth) {
    const user = await getUser(auth.uid)
    store.dispatch(login(user))
    await store.dispatch(getCulture())
    await store.dispatch(getMatches())
    renderApp()
  } else {
    await store.dispatch(logout())
    renderApp()
  }
})
