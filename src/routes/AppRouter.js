import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import PrivateRoute from './PrivateRoute'

import Login from '../containers/Login'
import Main from '../containers/Main'
import Signup from '../containers/Signup'

import Matches from '../containers/Matches'
import GlobalStyle from '../components/GlobalStyle'
import Nav from '../components/Nav'
import Screen from '../components/Screen'

const RouteWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const AppRouter = () => (
  <Screen>
    <GlobalStyle />
    <Router>
      <RouteWrapper>
        <Nav />
        <PrivateRoute path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={Signup} />
        <PrivateRoute path="/matches" component={Matches} />
      </RouteWrapper>
    </Router>
  </Screen>
)

export default AppRouter
