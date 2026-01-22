import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col className="text-center">
            &copy; 2026 ServiceFinder. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
