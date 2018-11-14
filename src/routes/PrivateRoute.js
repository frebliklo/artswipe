import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => 
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

const mapStateToProps = (state, props) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute)
