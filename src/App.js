//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Employee Manangement App</Navbar.Brand>
          </Container>
        </Navbar>
        <br></br>
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
