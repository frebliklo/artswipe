import React from 'react'

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: '',
  toggleAuth: () => {},
  updateUser: () => {}
})

export default AuthContext
