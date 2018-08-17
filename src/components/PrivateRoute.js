import React from 'react'

import {
  Redirect,
  Route
} from 'react-router-dom'

import * as AuthService from './auth/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return AuthService.getToken() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}
          />
        )
    }} />
  );
}

export default PrivateRoute;
