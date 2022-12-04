//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import ViewEmployee from './ViewEmployee';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route path='/employees' element={<EmployeeList/>}></Route>
              <Route path='/employees/add' element={<AddEmployee/>}></Route>
              <Route path='/employees/:id' element={<ViewEmployee/>}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
