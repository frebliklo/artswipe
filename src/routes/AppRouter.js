import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import PrivateRoute from './PrivateRoute'

import Login from '../containers/Login'
import Main from '../containers/Main'
import Public from '../containers/Public'
import Signup from '../containers/Signup'

import Matches from '../containers/Matches'
import Nav from '../components/Nav'

import GlobalStyle from '../components/styled/GlobalStyle'
import Screen from '../components/styled/Screen'

const RouteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
`

const AppRouter = ({ isAuthenticated }) => (
  <Screen>
    <GlobalStyle />
    <Router>
      <RouteWrapper>
        {isAuthenticated ? <Nav /> : null}
        <Route path="/" exact component={Public} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/app" component={Main} />
        <PrivateRoute path="/matches" component={Matches} />
      </RouteWrapper>
    </Router>
  </Screen>
)

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(AppRouter)
