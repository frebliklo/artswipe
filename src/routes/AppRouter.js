import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import Login from '../containers/Login'
import Main from '../containers/Main'
import Signup from '../containers/Signup'

import Matches from '../containers/Matches'
import GlobalStyle from '../components/GlobalStyle'
import Nav from '../components/Nav'
import Screen from '../components/Screen'

const AppRouter = () => (
  <Router>
    <Screen>
      <GlobalStyle />
      <Nav />
      <PrivateRoute path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={Signup} />
      <PrivateRoute path="/matches" component={Matches} />
    </Screen>
  </Router>
)

export default AppRouter
