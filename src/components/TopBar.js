import React from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

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
            <Navbar color="light" light expand="md" className='mb-3'>
                <NavbarBrand id='brand'>Monitor stron internetowych
                </NavbarBrand>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link exact to='/' activeClassName='active' className='nav-link'>
                            <i className='fa fa-home' aria-hidden='true'></i> Kokpit
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/addPage' activeClassName='active' className='nav-link'>
                                <i className='fa fa-plus-circle' aria-hidden='true'></i> Dodaj witrynę
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/reports' activeClassName='active' className='nav-link'>
                                <i className='fa fa-bullhorn' aria-hidden='true'></i> Raporty
                            </Link>
                        </NavItem>
                    </Nav>
                    <Nav className='ml-auto'>
                        <span className="navbar-text">
                            Zalogowano jako: <i className='fa fa-user-circle' aria-hidden='true'></i> User
                        </span>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
  
export default TopBar;