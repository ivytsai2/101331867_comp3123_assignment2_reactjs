import React, { useEffect, useState } from 'react'
import axiosAPI from './api'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmployeeNavbar from './EmployeeNavbar'

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

export default function UpdateEmployee() {
    const empData = {
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        salary: ""
    }
    const empId = useParams()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState(empData)

    useEffect(() => {
        const getEmployee = () => {
            axiosAPI.get(`emp/employees/${empId.id}`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length === 0) {
                    navigate("/employees");
                } else {
                    setEmployee(res.data);
                }
            }).catch(error => {
                console.log(error.response.data)
                alert("" + error.response.data.message)
            });
        };
        getEmployee();
    }, [navigate, empId.id]);

    const onValueChange = async (event) => {
        const value = event.target.value;
        setEmployee({...employee, [event.target.name]: value});
    }

    const onValueChangeNumeric = async (event) => {
        const value = event.target.value;
        setEmployee({...employee, [event.target.name]: value});
        if (isNaN(employee.salary) || employee.salary < 0){
            setEmployee({salary: ""})
        }
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
        axiosAPI.put(`/emp/employees/${empId.id}`, updateEmpData)
            .then(res => {
            navigate("/employees")
        }).catch(error => {
            console.log(error.response.data)
            alert("Add Employee Failed... " + error.response.data.message)
        })
    }

    return (
        <>
            <EmployeeNavbar/>
            <br></br>
            <Form style={form_style} onSubmit={(e) => {updateEmployee(e)}}>
                <h1 style={center}>Update Employee</h1>
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
                    <div onChange={(e) => onValueChange(e)} defaultValue={employee.gender}>
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
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter salary" 
                    name="salary"
                    defaultValue={employee.salary}
                    onChange={(e) => onValueChangeNumeric(e)}/>
                </Form.Group>
                <div style={center}>
                    <Button className="btn btn-success" type="submit">Save</Button>
                    <NavLink className="btn btn-danger" to='/employees'>Cancel</NavLink>
                </div>
            </Form>
        </>
    )
}
