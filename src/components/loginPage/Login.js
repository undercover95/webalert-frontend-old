import React from 'react';
import ResponseStore from 'stores/ResponseStore';
import * as Actions from 'actions/Actions';

import {
  NavLink as Link
} from 'react-router-dom';


export default class Login extends React.Component {

  componentDidMount() {
    document.title = 'Logowanie | Monitor stron internetowych'
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.redirectAfterLogin = this.redirectAfterLogin.bind(this);

    this.state = {
      beforeSend: '',
      responses: {}
    }
  }

  getResponse() {
    setTimeout(() => {
      this.setState({
        beforeSend: '',
        responses: ResponseStore.getResponse('loginUserResponse')
      });
    }, 1000);
  }

  redirectAfterLogin() {
    this.props.history.push("/");
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
      beforeSend: <span><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa logowanie...</span>,
      responses: {}
    });
    Actions.loginUser(data);
  }

  render() {

    let beforeSend = this.state.beforeSend;
    let responses = this.state.responses;

    return (
      <div>
          <div className="row justify-content-md-center">
            <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
              <div id="login-panel" className="card customCard my-5">
                <div className="card-body">
                  <h3 className="text-center mb-3"><i className="fa fa-user" aria-hidden="true"></i><br/>Zaloguj się</h3>

                  <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                      <label htmlFor="usernameInput">Nazwa użytkownika:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="username-addon"><i className="fa fa-user" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" id="usernameInput" name="username" placeholder="Nazwa użytkownika" aria-describedby="username-addon"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="passwordInput">Hasło:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="password-addon"><i className="fa fa-lock" aria-hidden="true"></i></span>
                        </div>
                        <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Hasło" aria-describedby="password-addon"/>
                      </div>
                    </div>

                    <div className="form-group mt-3 text-center">
                      <button type="submit" className="btn btn-primary btn-block mb-3" disabled={beforeSend == '' ? false : true}>{
                        beforeSend != '' ? beforeSend : 'Zaloguj'}</button>

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
                  <p className="text-center">Nie masz jeszcze swojego konta?<br/><Link to='/register' className=''>Załóż nowe konto!</Link></p>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
