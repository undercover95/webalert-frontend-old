import React from 'react';
import ResponseStore from 'stores/ResponseStore';
import * as AuthService from '../../actions/AuthService';

import {
  NavLink as Link,
  Redirect
} from 'react-router-dom';

export default class Login extends React.Component {

  componentDidMount() {
    if (AuthService.getToken()) {
      this.setState({
        redirect: true
      })
    }
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.redirectAfterLogin = this.redirectAfterLogin.bind(this);

    this.state = {
      waiting: false,
      responses: {},
      redirect: false
    }
  }

  getResponse() {
    setTimeout(() => {
      this.setState({
        waiting: false,
        responses: ResponseStore.getResponse('loginUserResponse')
      });
    }, 500);
  }

  redirectAfterLogin() {
    setTimeout(() => {
      this.setState({
        waiting: false,
        responses: {},
        redirect: true
      });
    }, 500);
  }

  componentWillMount() {
    ResponseStore.on('loginUserResponse', this.getResponse)
    ResponseStore.on('userLoginSuccess', this.redirectAfterLogin)
  }

  componentWillUnmount() {
    ResponseStore.removeListener('loginUserResponse', this.getResponse)
    ResponseStore.removeListener('userLoginSuccess', this.redirectAfterLogin)
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState({
      waiting: true,
      responses: {}
    });
    AuthService.loginUser(data);
  }

  render() {

    let waiting = this.state.waiting;
    let responses = this.state.responses;

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
            <div id="login-panel" className="card customCard my-5">
              <div className="card-body">
                <h3 className="text-center mb-3"><i className="fa fa-user" aria-hidden="true"></i><br />Zaloguj się</h3>

                <form onSubmit={this.handleSubmit}>

                  <div className="form-group">
                    <label htmlFor="usernameInput">Adres e-mail:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="username-addon"><i className="fa fa-user" aria-hidden="true"></i></span>
                      </div>
                      <input type="text" className="form-control" id="usernameInput" name="mail" placeholder="Adres e-mail" aria-describedby="username-addon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="passwordInput">Hasło:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="password-addon"><i className="fa fa-lock" aria-hidden="true"></i></span>
                      </div>
                      <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Hasło" aria-describedby="password-addon" />
                    </div>
                  </div>

                  <div className="form-group mt-3 text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-3" disabled={waiting}>{
                      waiting ? <span><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa logowanie...</span> : 'Zaloguj'}</button>

                    <div>
                      {
                        responses['log_err'] != undefined ? (
                          <div className="alert alert-danger"><i className='fa fa-exclamation-circle'></i> {responses['log_err']}</div>
                        ) : ''
                      }
                    </div>

                    <a href="#" className="px-2">Zapomniałeś hasła?</a>
                  </div>


                </form>
                <p className="text-center">Nie masz jeszcze swojego konta?<br /><Link to='/register' className=''>Załóż nowe konto!</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
