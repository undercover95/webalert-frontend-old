import React from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

import {
  NavLink as Link,
  Redirect
} from 'react-router-dom';

import jwt_decode from 'jwt-decode';

import * as AuthService from '../auth/AuthService';

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
      <Navbar color='dark' dark expand='md'>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {
            AuthService.getToken() ? (
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <span className={'navbar-text mr-3'}>Zalogowano jako&nbsp;<span style={{ color: '#f2f2f2' }}><i className='fa fa-user-circle-o' aria-hidden='true'></i> {
                    jwt_decode(AuthService.getToken()).user.username
                  }</span>
                  </span>
                </NavItem>
                <NavItem>
                  <span color="link" className='nav-link' style={{ cursor: 'pointer' }} onClick={() => {
                    AuthService.logoutUser();
                    return <Redirect to='/login' />
                  }
                  }>
                    <i className='fa fa-sign-in' aria-hidden='true'></i> Wyloguj się
                  </span>
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
    );
  }
}

export default TopBar;
