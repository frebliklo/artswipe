import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './containers/Login'
import Main from './containers/Main'
import Matches from './containers/Matches'
import Signup from './containers/Signup'
import GlobalStyle from './components/GlobalStyle'
import Nav from './components/Nav'
import PrivateRoute from './components/PrivateRoute'
import Screen from './components/Screen'

class App extends Component {
  render() {
    const { user } = this.props

    return (
      <Router>
        <Screen>
          <GlobalStyle />
          {user.loggedIn ? <h2>{user}</h2> : null}
          {/* {isAuthenticated ? <Nav /> : null} */}
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={Signup} />
          <PrivateRoute
            path="/swipe"
            component={Main}
          />
          <PrivateRoute
            path="/matches"
            component={Matches}
          />
        </Screen>
      </Router>
    )
  }
}

export default App
