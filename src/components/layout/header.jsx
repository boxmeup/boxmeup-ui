import React, { Component } from 'react';
import {
  ButtonDropdown,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './header.css';
import logo from '../../logo-icon.png';

export default class Header extends Component {

	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="container Header">
        <Navbar light toggleable className="Header-nav pl-0 pr-0">
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand tag={Link} to="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top mr-sm-2" alt=""/>
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/containers">Containers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/items">Items</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/locations">Locations</NavLink>
              </NavItem>
            </Nav>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
              {/*<button className="btn btn-outline-success my-2 my-md-0" type="submit">Search</button>*/}
            </form>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} tether>
              <DropdownToggle caret color="primary">
                Account
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/settings">Settings</DropdownItem>
                <DropdownItem tag={Link} to="/applications">Applications</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/logout">Logout</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}