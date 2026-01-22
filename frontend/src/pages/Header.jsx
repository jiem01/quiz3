import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = ({ userInfo, logoutHandler }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Pool and Spa</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>

            {/* <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer> */}
            {userInfo ? (
              <>
                {userInfo.is_superuser && (
                  <LinkContainer to="/users">
                    <Nav.Link>Users</Nav.Link>
                  </LinkContainer>
                )}
                <Button variant="outline-light" className="ms-2" onClick={logoutHandler}>
                  Logout
                </Button>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
