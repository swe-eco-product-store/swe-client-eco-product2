/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" variant="light">
      <Container>
        <Navbar.Brand>
          <Link passHref href="/">
            <Image src="/Eco-no-bg-final.jpg" alt="ECO PRODUCTS Logo" style={{ height: '300px' }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/Home/new">
              <Nav.Link className="custom-nav-link">Home</Nav.Link>
            </Link>
            <Link passHref href="/kitchen/new">
              <Nav.Link className="custom-nav-link">Kitchen</Nav.Link>
            </Link>
            <Link passHref href="/Bath/new">
              <Nav.Link className="custom-nav-link">Bath</Nav.Link>
            </Link>
            <Link passHref href="/pets/new">
              <Nav.Link className="custom-nav-link">Pets</Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link passHref href="/viewCart/new">
              <Button className="custom-nav-button">View Cart</Button>
            </Link>
            <Button className="custom-nav-button" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
