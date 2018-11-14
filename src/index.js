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

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.dispatch(login(user.uid))
    store.dispatch(getCulture()).then(() => {
      renderApp()
    })
  } else {
    store.dispatch(logout())
    renderApp()
  }
})
