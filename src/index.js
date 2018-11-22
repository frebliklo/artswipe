import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css/normalize.css'

import configureStore from './store/configureStore'
import firebase from './firebase'
import { login, logout } from './actions/auth'
import { getCulture } from './actions/culture'

import AppRouter from './routes/AppRouter'
import Loading from './containers/Loading'
import { getUser } from './firebase/db'

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
    renderApp()
  } else {
    await store.dispatch(logout())
    renderApp()
  }
})
