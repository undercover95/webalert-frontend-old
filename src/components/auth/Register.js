import React from 'react';
import Recaptcha from 'react-recaptcha';
import ResponseStore from 'stores/ResponseStore';

import * as AuthService from '../../actions/AuthService';
export default class Register extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResponse = this.getResponse.bind(this);
    //<div className='mt-3'><i className='fa fa-spinner fa-spin' aria-hidden='true'></i> Trwa rejestracja...</div>
    this.state = {
      waiting: false,
      responses: {}
    };
  }

  getResponse() {
    this.setState({
      waiting: false,
      responses: ResponseStore.getResponse('registerUserResponse')
    });
  }

  componentWillMount() {
    ResponseStore.on('registerUserResponse', this.getResponse)
  }

  componentWillUnmount() {
    ResponseStore.removeListener('registerUserResponse', this.getResponse)
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState({
      waiting: true
    });
    AuthService.registerUser(data);
    grecaptcha.reset();
  }

  render() {
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5">
            <div id="register-panel" className="card customCard my-5">
              <div className="card-body">
                <h3 className="text-center mb-3"><i className="fa fa-user-plus" aria-hidden="true"></i><br />Zarejestruj się</h3>
                <form onSubmit={this.handleSubmit}>

                  <div className="form-group">
                    <label htmlFor="emailInput">Adres email:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="email-addon">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                      </div>
                      <input type="email" className="form-control" id="emailInput" name="email" placeholder="Adres email" aria-describedby="email-addon" />
                    </div>
                  </div>
                  <div id="email_err_container">
                    {this.state.responses['email_err'] != undefined ? (
                      <div className="alert alert-danger"><i className='fa fa-exclamation-circle'></i> {this.state.responses['email_err']}</div>
                    ) : ''}
                  </div>

                  <div className="form-group">
                    <label htmlFor="passwordInput">Hasło:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="password-addon">
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                      </div>
                      <input type="password" className="form-control" id="passwordInput" name="password" placeholder="Hasło" aria-describedby="password-addon" />
                    </div>
                  </div>
                  <div id="password_err_container">
                    {this.state.responses['password_err'] != undefined ? (
                      <div className="alert alert-danger"><i className='fa fa-exclamation-circle'></i> {this.state.responses['password_err']}</div>
                    ) : ''}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password2Input">Powtórz hasło:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="password-addon">
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                      </div>
                      <input type="password" className="form-control" id="password2Input" name="password2" placeholder="Powtórz hasło" aria-describedby="password2-addon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="touInput" name="tou" />
                      <label className="form-check-label" htmlFor="touInput">Akceptuję regulamin</label>
                    </div>
                  </div>
                  <div id="tou_err_container">
                    {this.state.responses['tou_err'] != undefined ? (
                      <div className="alert alert-danger"><i className='fa fa-exclamation-circle'></i> {this.state.responses['tou_err']}</div>
                    ) : ''}
                  </div>

                  <Recaptcha sitekey="6Lc930YUAAAAAOlx_32fI-4NhrBktZRK3vPxGqMp" />
                  <div id="captcha_err_container" className='mt-3'>
                    {this.state.responses['captcha_err'] != undefined ? (
                      <div className="alert alert-danger"><i className='fa fa-exclamation-circle'></i> {this.state.responses['captcha_err']}</div>
                    ) : ''}
                  </div>

                  <button id="registration-form-submit" type="submit" className="btn btn-block btn-primary mt-4">Zarejestruj</button>

                </form>
                <div id="invalid_data_err_container" className="my-3">
                  {this.state.responses['reg_err'] != undefined ? (
                    <div className="alert alert-danger"><h5><i className='fa fa-exclamation-circle'></i> Coś poszło nie tak!</h5>{this.state.responses['reg_err']}</div>
                  ) : ''}
                </div>
                <div className="d-inline pr-3 text-center">
                  <a href="/monitor_stron">Powrót na stronę główną</a><br />
                  <a href="/monitor_stron/login.php">Powrót do strony logowania</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
