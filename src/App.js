//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import EmployeeList from './EmployeeList';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/login/employees' element={<EmployeeList/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
