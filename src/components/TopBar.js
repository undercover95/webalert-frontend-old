import React from 'react';
import * as Actions from 'actions/Actions';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';

import {
  NavLink as Link,
  Redirect
    } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

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

      if(this.state.redirect) {
        return <Redirect to={'/login'}/>
      }

      return (
          <Navbar color='dark' dark expand='md'>
              <NavbarBrand id='brand'>Monitor stron internetowych
              </NavbarBrand>

              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>

                    {
                      localStorage.getItem('logged') ? (
                        <Nav className='ml-auto' navbar>
                          <NavItem>
                            <span className={'navbar-text mr-3'}>Zalogowano jako <span style={{color: '#f2f2f2'}}><i className='fa fa-user-circle-o' aria-hidden='true'></i> {
                              (() => {
                                let token = localStorage.getItem('authToken');
                                return jwt_decode(token).user.username;
                              })()
                            }
                            </span></span>
                          </NavItem>
                          <NavItem>
                            <span color="link" className='nav-link' style={{cursor: 'pointer'}} onClick={() => {
                              Actions.logoutUser();
                              this.setState({redirect: true});
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
