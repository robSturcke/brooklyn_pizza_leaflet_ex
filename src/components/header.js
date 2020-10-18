import React, { useState } from 'react';
import Logo from './logo';
import { Navbar, Nav } from 'react-bootstrap';
import Github from '../assets/github';
import CloseIcon from '../assets/close_icon';
import MenuIcon from '../assets/menu_icon';

function Header() {
  const [onToggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!onToggle);

  return (
    <header>
      <Navbar expand="sm">
        <Navbar.Brand href="/">
          <Logo baseLayer="header_logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleClick}>
          {onToggle ? (
            <CloseIcon baseLayer="icon" />
          ) : (
            <MenuIcon baseLayer="icon" />
          )}
        </Navbar.Toggle>
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
}

export default Header;
