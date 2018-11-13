import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

import PrivateRoute from './PrivateRoute'

import Login from '../containers/Login'
import Main from '../containers/Main'
import Signup from '../containers/Signup'

import Matches from '../containers/Matches'
import Nav from '../components/Nav'
import Screen from '../components/Screen'

import GlobalStyle from '../components/styled/GlobalStyle'

const RouteWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const AppRouter = ({ isAuthenticated }) => (
  <Screen>
    <GlobalStyle />
    <Router>
      <RouteWrapper>
        {isAuthenticated ? <Nav /> : null}
        <PrivateRoute path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={Signup} />
        <PrivateRoute path="/matches" component={Matches} />
      </RouteWrapper>
    </Router>
  </Screen>
)

const mapStateToProps = (state, props) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(AppRouter)
