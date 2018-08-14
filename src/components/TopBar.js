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
    NavLink as Link
    } from 'react-router-dom';

class TopBar extends React.Component {
    constructor() {
        super();

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
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
                <NavbarBrand id='brand'>Monitor stron internetowych
                </NavbarBrand>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                      <NavItem>
                        <Link to='/login' activeClassName='active' className='nav-link'>
                          <i className='fa fa-sign-in' aria-hidden='true'></i> Zaloguj się
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Button color="link" className='nav-link' onClick={() => Actions.logoutUser()}>
                          <i className='fa fa-sign-in' aria-hidden='true'></i> Wyloguj się
                        </Button>
                      </NavItem>
                      <NavItem>
                        <Link to='/register' activeClassName='active' className='nav-link'>
                          <i className='fa fa-user-plus' aria-hidden='true'></i> Zarejestruj się
                        </Link>
                      </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default TopBar;
