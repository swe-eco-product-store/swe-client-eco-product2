import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto"><Link href="/UnderConstruction">FAQ</Link></Col>
          <Col xs="auto"><Link href="/UnderConstruction">About Us</Link></Col>
          <Col xs="auto"><Link href="/UnderConstruction">Contact</Link></Col>
          <Col xs="auto"><Link href="/UnderConstruction">Coming Soon</Link></Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
