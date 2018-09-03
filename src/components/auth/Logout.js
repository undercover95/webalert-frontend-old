import React from 'react';
import * as AuthService from './AuthService';

import {
  NavLink as Link,
  Redirect
} from 'react-router-dom';

const Logout = (props) => {

  if (AuthService.getToken()) {
    AuthService.logoutUser()
  }

  return (
    <div className="row justify-content-md-center">
      <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 text-center mt-5">
        <div className="card">
          <div className="card-body">
            <i className="fa fa-4x fa-check-circle-o" aria-hidden="true"></i>
            <h3 className="mt-3">Wylogowano pomyślnie!</h3>
            <Link to='/login'>Powrót do strony logowania</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logout;