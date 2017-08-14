import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledButtonDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './header.css';
import '../../loader.css';
import logo from '../../logo-icon.png';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.auth = props.auth;
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
            !this.auth.isAuthenticated() ? (
                null
            ) : (
                <div className="container Header sticky-top">
                    <Navbar light toggleable className="Header-nav pl-0 pr-0">
                        <NavbarToggler right onClick={this.toggle} />
                        <NavbarBrand tag={Link} to="/">
                            <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2 " alt="" />
                            <div className={"d-inline-block align-middle loading " + (this.props.appState.loading ? '' : 'loading-off')}></div>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isOpen} delay={{hide: 100}} navbar>
                            <form className="form-inline my-2 my-lg-0 hidden-sm-up">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            </form>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/containers" onClick={this.state.isOpen && this.toggle}>Containers</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/items" onClick={this.state.isOpen && this.toggle}>Items</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/locations" onClick={this.state.isOpen && this.toggle}>Locations</NavLink>
                                </NavItem>
                            </Nav>
                            <form className="form-inline my-2 my-lg-0 hidden-sm-down">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            </form>
                            <Nav className="mr-auto hidden-sm-up" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/settings" onClick={this.state.isOpen && this.toggle}>Settings</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/applications" onClick={this.state.isOpen && this.toggle}>Applications</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/logout" onClick={this.state.isOpen && this.toggle}>Logout</NavLink>
                                </NavItem>
                            </Nav>
                            <UncontrolledButtonDropdown className="hidden-sm-down" tether={{
                                offset: '-8px 0'
                            }}>
                                <DropdownToggle caret color="primary" className="hidden-sm-down">
                                    Account
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem tag={Link} to="/settings">Settings</DropdownItem>
                                    <DropdownItem tag={Link} to="/applications">Applications</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem tag={Link} to="/logout">Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </Collapse>
                    </Navbar>
                </div>
            )
        );
    }
}
