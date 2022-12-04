import React, { Component } from 'react'
import axiosAPI from './api'
import EmployeeNavbar from './EmployeeNavbar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, Navigate } from 'react-router-dom';

const form_style = {
  padding: '1%',
  border: 'solid green', 
  margin: 'auto',
  width: '600px'
}

const center = {
  paddingBottom: '20px', 
  textAlign: 'center'
}

export default class AddEmployee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: "",
      lname: "",
      email: "",
      gender: "other",
      salary: "",
      addSuccess: false
    }
  }

  onValueChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  onValueChangeNumeric = (event) => {
    this.setState({[event.target.name] : event.target.value})
    if (isNaN(this.state.salary) || this.state.salary < 0){
      this.setState({salary: ""})
    }
  }

  /*{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@domain.com",
    "gender": "male",
    "salary": 500.59
  }*/
  addEmployee = (event) => {
    event.preventDefault()
    const empData = {
      first_name: this.state.fname,
      last_name: this.state.lname,
      email: this.state.email,
      gender: this.state.gender,
      salary: this.state.salary
    }
    axiosAPI.post('/emp/employees', empData)
    .then(res => {
      this.setState({addSuccess: true})
      console.log(res.data)
    }).catch(error => {
      this.setState({addSuccess: false})
      console.log(error.response.data)
      alert("Add Employee Failed... " + error.response.data.message)
    })
  }

  render() {
    return (
      <>
        <EmployeeNavbar/>
        <br></br>
        <Form style={form_style} onSubmit={(e) => this.addEmployee(e)}>
          <h1 style={center}>Add Employee</h1>
          <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              name="fname"
              required
              onChange={(e) => this.onValueChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter last name" 
              name="lname"
              required
              onChange={(e) => this.onValueChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="emial" 
              placeholder="Enter email" 
              name="email"
              onChange={(e) => this.onValueChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <div onChange={(e) => this.onValueChange(e)}>
                <Form.Check
                  inline
                  label="Female"
                  value="Female"
                  name="gender"
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Male"
                  value="Male"
                  name="gender"
                  type="radio"
                />
                <Form.Check
                  inline
                  label="Other"
                  value="Other"
                  name="gender"
                  type="radio"
                  defaultChecked
                />
              </div>
          </Form.Group>
          <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter salary" 
              name="salary"
              onChange={(e) => this.onValueChangeNumeric(e)}/>
          </Form.Group>
          <div style={center}>
              <Button className="btn btn-success" type="submit">Submit</Button>
              <NavLink className="btn btn-danger" to='/employees'>Cancel</NavLink>
          </div>
        </Form>
        {this.state.addSuccess && <Navigate to='/employees' replace={true}/>}
      </>
    )
  }
}


