//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Comp3123 - Assignment 101331867</Navbar.Brand>
            <Nav className="me-auto">
              <NavLink to ='/login'>Login</NavLink>
              <NavLink to ='/signup'>Signup</NavLink>
            </Nav>
          </Container>
        </Navbar>
          <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
