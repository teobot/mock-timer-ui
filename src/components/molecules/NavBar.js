import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" className="position-relative">
      <Container fluid>
        <Nav className="me-auto">
          <Nav.Link>Last Updated: {new Date().toLocaleTimeString()}</Nav.Link>
          {/* RESET PAGE BUTTON */}
          <Nav.Link
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
