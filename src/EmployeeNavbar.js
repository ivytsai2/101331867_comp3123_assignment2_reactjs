import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default class UserNavbar extends Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/employees">Employee Manangement App</Navbar.Brand>
                <Navbar.Brand href="/">Log out</Navbar.Brand>
            </Container>
        </Navbar>
        <br></br>
      </>
    )
  }
}
