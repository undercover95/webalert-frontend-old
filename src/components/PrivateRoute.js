import React from 'react'
import axios from 'axios'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  axios.get('http://localhost:3000/checkIfUserIsLogged', {
    headers: { Authorization: "Bearer " + localStorage.getItem('authToken') }
  })
    .then((res) => {
      localStorage.setItem('logged', res.data.result);
    })
    .catch(
      (err) => {
        console.log(err);
      });


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
