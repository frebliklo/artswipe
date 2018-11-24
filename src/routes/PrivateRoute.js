import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'


const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location, login: true }
          }}
        />
      )
    )}
  />
)

const mapStateToProps = (state, props) => ({
  isAuthenticated: !!state.auth.uid
})

export default withRouter(connect(mapStateToProps)(PrivateRoute))
