import React, { useEffect, useState } from 'react'
import axiosAPI from './api'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmployeeNavbar from './EmployeeNavbar'

export default function UpdateEmployee() {
    const empData = {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        salary: ""
    }
    const gender = ['female', 'male', 'other']
    const empId = useParams()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState(empData)

    useEffect(() => {
        const getEmployee = () => {
            axiosAPI.get(`emp/employees/${empId.id}`, {
                headers: {
                  'x-access-token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                if (res.data.length === 0) {
                    navigate("/employees");
                } else {
                    setEmployee(res.data);
                }
            }).catch(error => {
                alert("" + error.response.data.message)
                navigate("/employees")
            });
        };
        getEmployee();
    }, [navigate, empId.id]);

    const onValueChange = (event) => {
        setEmployee({...employee, [event.target.name]: event.target.value});
    }

    const updateEmployee = (event) => {
        event.preventDefault()
        const updateEmpData = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email: event.target.email.value,
            gender: event.target.gender.value,
            salary: event.target.salary.value
        }
        axiosAPI.put(`/emp/employees/${empId.id}`, updateEmpData, {
            headers: {
              'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => {
            navigate("/employees")
        }).catch(error => {
            console.log(error.response.data)
            alert("Update Employee Failed... " + error.response.data.message)
        })
    }

    return (
        <>
        
            <EmployeeNavbar/>
            <br></br>
            <Form className='form_style' onSubmit={(e) => {updateEmployee(e)}}>
                <h1 className='center'>Update Employee</h1>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter first name" 
                    name="first_name"
                    defaultValue={employee.first_name}
                    required
                    onChange={(e) => onValueChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter last name" 
                    name="last_name"
                    defaultValue={employee.last_name}
                    required
                    onChange={(e) => onValueChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="emial" 
                    placeholder="Enter email" 
                    name="email"
                    defaultValue={employee.email}
                    onChange={(e) => onValueChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <div>
                        {gender.map(g => (
                            <div className="form-check form-check-inline" key={g}>
                                <input className="form-check-input" type='radio' value={g} name='gender' 
                                checked={employee.gender === g} onChange={(e) => onValueChange(e)}/>
                                <label className="form-check-label">{(g[0]).toUpperCase() + (g).substring(1)}</label>
                            </div>
                        ))}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter salary" 
                    name="salary"
                    defaultValue={employee.salary}
                    onChange={(e) => onValueChange(e)}/>
                </Form.Group>
                <div className="center">
                    <Button className="btn btn-success" type="submit" style={{marginRight: 50}}>Save</Button>
                    <NavLink className="btn btn-danger" to='/employees'>Cancel</NavLink>
                </div>
            </Form>
        </>
    )
}
