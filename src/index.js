import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'normalize.css/normalize.css'

import configureStore from './store/configureStore'
import firebase from './firebase'
import { login, logout } from './actions/auth'

import AppRouter from './routes/AppRouter'

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
  <div>Loading...</div>,
  document.getElementById('root')
)

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.dispatch(login(user.uid))
    renderApp()
  } else {
    store.dispatch(logout())
    renderApp()
  }
})
