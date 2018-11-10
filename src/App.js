import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Login from './containers/Login'
import Main from './containers/Main'
import GlobalStyle from './components/GlobalStyle'
import PrivateRoute from './components/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleAuth = () => {
      this.setState({ isAuthenticated: !this.state.isAuthenticated })
    }

    this.updateUser = email => {
      this.setState(() => ({ user: email }))
    }

    this.state = {
      isAuthenticated: false,
      user: '',
      toggleAuth: this.toggleAuth,
      updateUser: this.updateUser
    }
  }

  render() {
    const { isAuthenticated } = this.state

    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <div>
            <GlobalStyle />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/swipe" component={Main} isAuthenticated={isAuthenticated} />
          </div>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App
