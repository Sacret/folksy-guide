'use strict';

import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import _ from 'lodash';
//
import { Navbar, NavBrand, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import { MenuItem, Button, Glyphicon } from 'react-bootstrap';

/**
 *  TopNavbar component displays top navbar
 */
const TopNavbar = React.createClass({

  toogleMenuCollapse() {
    
  },

  logout() {
    localStorage.removeItem('username');
    this.props.redirectToLogin();
  },

  render() {
    return (
      <Navbar
        toggleNavKey={0}
        fixedTop={true}
        fluid={true}
      >
        <NavBrand><a href="#">FolksyGuide</a></NavBrand>
        <Nav right eventKey={0}>
          <NavDropdown
            eventKey={1}
            title="name"
            id="collapsible-navbar-dropdown"
          >
            <MenuItem
              eventKey="1"
            >
              1
            </MenuItem>
            <MenuItem
              eventKey="2"
            >
              2
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey="3"
              onClick={this.logout}
            >
              Logout
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
});

export default TopNavbar;
