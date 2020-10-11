import React from 'react';
import Logo from './logo';
import { Navbar, Nav } from 'react-bootstrap';
import Github from '../assets/github';

const Header = () => (
  <header>
    <Navbar expand="sm">
      <Navbar.Brand href="#home">
        <Logo baseLayer="header_logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <a
            href="https://github.com/robSturcke/brooklyn_pizza_leaflet_ex"
            className="nav-link"
          >
            <Github baseLayer="nav_icon" />
          </a>
          <Nav.Link href="#home"></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Header;
