import React, { Component } from 'react'
import axiosAPI from './api'
import EmployeeNavbar from './EmployeeNavbar'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import withRouter from './withRouter';

class EmployeeList extends Component {
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
      }
    }
  }

  getEmployeeList = async() => {
    axiosAPI.get('/emp/employees', {
      headers: {
        'x-access-token': this.props.location.state
      }
    })
    .then(res => {
      console.log(res.data)
      this.setState({employeeList: res.data})
    }).catch(error => {
      console.log(error.response.data)
      alert("" + error.response.data.message)
    })
  }

  componentDidMount = () => {
    this.getEmployeeList()
  }

  render() {
    return (
      <>
        <EmployeeNavbar/>
        <br></br>
        <h2>Employee List</h2>
        <NavLink className="btn btn-primary" to='/employees/add'>Add Employee</NavLink>
        <Container>
        <Table>
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
            {
              this.state.employeeList.map(emp=> (
                <tr key={emp._id}>
                  <th>{emp.first_name}</th>
                  <th>{emp.last_name}</th>
                  <th>{emp.email}</th>
                  <th>{emp.gender}</th>
                  <th>
                    <NavLink className="btn btn-success" to={`/employees/update/${emp._id}`}>Update</NavLink>
                    <Button className="btn btn-danger" onClick={() => {
                      axiosAPI.delete(`/emp/employees?eid=${emp._id}`)
                          .then(res => {
                            console.log("Delete successful")
                            window.location.reload();
                        }).catch(error => {
                            console.log(error.response.data)
                            alert("Delete Employee Failed... " + error.response.data.message)
                        })
                    }}>Delete</Button>
                    <NavLink className="btn btn-info" to={`/employees/view/${emp._id}`}>View</NavLink>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
      </>
    )
  }
}

export default withRouter(EmployeeList)
