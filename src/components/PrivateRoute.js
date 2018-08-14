import React from 'react'
import axios from 'axios'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  console.log("local",localStorage.getItem('logged'))

  return (
    <Route
      {...rest}
      render={ props =>
        localStorage.getItem('logged') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute;
