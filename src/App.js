import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import Login from './containers/Login'
import GlobalStyle from './components/GlobalStyle'

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleAuth = () => {
      this.setState({ isAuthenticated: !this.state.isAuthenticated })
    }

    this.updateUser = email => {
      this.setState({ updateUser: email })
    }

    this.state = {
      isAuthenticated: false,
      user: '',
      toggleAuth: this.toggleAuth,
      updateUser: this.updateUser
    }
  }

  render() {
    return (
      <Router>
        <AuthContext.Provider value={this.state}>
          <div>
            <GlobalStyle />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
          </div>
        </AuthContext.Provider>
      </Router>
    )
  }
}

export default App
