import React from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

import {
  NavLink as Link,
  Redirect,
  browserHistory
} from 'react-router-dom';

import jwt_decode from 'jwt-decode';

import * as AuthService from '../../actions/AuthService';

class TopBar extends React.Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      redirect: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (
      <div>
        <Navbar color='light' light expand='md' fixed="top">
          <Link to='/' className='navbar-brand'>Monitor stron</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {
              AuthService.getToken() ? (
                <Nav navbar>
                  <NavItem>
                    <Link to='/' activeClassName='active' className='nav-link'>
                      <i className='fa fa-home' aria-hidden='true'></i> Kokpit
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/addPage' activeClassName='active' className='nav-link'>
                      <i className='fa fa-plus-circle' aria-hidden='true'></i> Dodaj witrynę
                    </Link>
                  </NavItem>
                </Nav>
              ) : ''
            }
            {
              AuthService.getToken() ? (
                <Nav className='ml-auto' navbar>
                  <NavItem>
                    <span className={'navbar-text mr-3'}><i className='fa fa-user-circle-o' aria-hidden='true'></i> Witaj,&nbsp;<span className={'font-weight-bold'}>{
                      jwt_decode(AuthService.getToken()).user.mail_address
                    }</span>
                    </span>
                  </NavItem>
                  <NavItem>
                    <Link to='/logout' className='nav-link'>
                      <i className='fa fa-sign-in' aria-hidden='true'></i> Wyloguj się
                  </Link>
                  </NavItem>
                </Nav>
              ) : (
                  <Nav className='ml-auto' navbar>
                    <NavItem>
                      <Link to='/login' activeClassName='active' className='nav-link'>
                        <i className='fa fa-sign-in' aria-hidden='true'></i> Zaloguj się
                    </Link>
                    </NavItem>
                    <NavItem>
                      <Link to='/register' activeClassName='active' className='nav-link'>
                        <i className='fa fa-user-plus' aria-hidden='true'></i> Zarejestruj się
                    </Link>
                    </NavItem>
                  </Nav>
                )
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default TopBar;
