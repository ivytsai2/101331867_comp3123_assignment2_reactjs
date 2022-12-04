import React, { Component } from 'react'
import axiosAPI from './api'
import EmployeeNavbar from './EmployeeNavbar'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { NavLink, Navigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const center = {
  paddingBottom: '20px', 
  textAlign: 'center'
}

export default class EmployeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeList: [],
      employee: {
        fname: "",
        lname: "",
        email: "",
        gender: "",
        salary: ""
      },
      withoutToken: false,
    }
  }

  getEmployeeList = async() => {
    if (localStorage.getItem('token') === null) {
      this.setState({withoutToken: true})
    }
    else{
      axiosAPI.get('/emp/employees', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then(res => {
        this.setState({employeeList: res.data})
      }).catch(error => {
        this.setState({withoutToken: true})
        alert(error.response.data.message)
      })
    }
  }

  componentDidMount = () => {
    this.getEmployeeList()
  }

  render() {
    return (
      <>
        <EmployeeNavbar/>
        <br></br>
        <h2 style={center}>Employee List</h2>
        <Container>
          <NavLink style={{marginBottom: 20}} className="btn btn-primary" 
          to='/employees/add'>Add Employee</NavLink>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeeList.length < 1 ? 
                <tr><td colSpan={5}>No data in employees database</td></tr> :
                this.state.employeeList.map(emp=> (
                  <tr key={emp._id}>
                    <th>
                      {typeof(emp.first_name[0]) === 'string' ?
                      (emp.first_name[0]).toUpperCase() + ((emp.first_name).substring(1)).toLowerCase()
                      : emp.first_name}
                    </th>
                    <th>
                      {typeof(emp.last_name[0]) === 'string' ?
                      (emp.last_name[0]).toUpperCase() + ((emp.last_name).substring(1)).toLowerCase()
                      : emp.last_name}
                    </th>
                    <th>{emp.email}</th>
                    <th>
                      {typeof(emp.gender[0]) === 'string' ?
                      (emp.gender[0]).toUpperCase() + (emp.gender).substring(1)
                      : emp.gender}
                    </th>
                    <th>
                      <Row>
                        <Col>
                          <NavLink className="btn btn-success btn-sm" 
                          to={`/employees/update/${emp._id}`}>Update</NavLink>
                        </Col>
                        <Col>
                          <Button className="btn btn-danger btn-sm" 
                          onClick={() => {
                            axiosAPI.delete(`/emp/employees?eid=${emp._id}`, {
                              headers: {
                                'x-access-token': localStorage.getItem('token')
                              }
                            })
                            .then(res => {
                              console.log("Delete successful")
                              window.location.reload();
                            }).catch(error => {
                              console.log(error.response.data)
                              alert("Delete Employee Failed... " + error.response.data.message)
                            })
                          }}>Delete</Button>     
                        </Col>
                        <Col>
                          <NavLink className="btn btn-info btn-sm" 
                          to={`/employees/view/${emp._id}`}>View</NavLink>
                        </Col>
                      </Row>
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Container>

        {this.state.withoutToken && <Navigate to='/' replace={true}/>}
      </>
    )
  }
}
