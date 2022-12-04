import React, { useEffect, useState } from 'react'
import axiosAPI from './api'
import { useParams, useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/Container"
import {Row, Col, Card} from "react-bootstrap"
import Button from "react-bootstrap/Button"
import EmployeeNavbar from './EmployeeNavbar'

export default function ViewEmployee() {
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
            axiosAPI.get(`emp/employees/${empId.id}`, {
                headers: {
                  'x-access-token': localStorage.getItem('token')
                }
            })
            .then((res) => {
                if (res.data.length === 0) {
                    navigate("/employees")
                } else {
                    setEmployee(res.data)
                }
            }).catch(error => {
                alert("" + error.response.data.message)
                navigate("/employees")
            });
        };
        getEmployee();
    }, [navigate, empId.id]);

    return (
        <>
            <EmployeeNavbar/>
            <br></br>
            <h2 className='center'>View Employee Details</h2>
            <Container>
                <Card>
                    <Card.Body>
                        <Row className='center'>
                            <Col className='right'><h3>First Name:</h3></Col>
                            <Col className='left'><h3>{
                                typeof(employee.first_name[0]) === 'string' ?
                                (employee.first_name[0]).toUpperCase() + ((employee.first_name).substring(1)).toLowerCase()
                                : employee.first_name
                            }</h3></Col>
                        </Row>
                        <Row className='center'>
                            <Col className='right'><h3>Last Name:</h3></Col>
                            <Col className='left'><h3>{
                                typeof(employee.last_name[0]) === 'string' ?
                                (employee.last_name[0]).toUpperCase() + ((employee.last_name).substring(1)).toLowerCase()
                                : employee.last_name
                            }</h3></Col>
                        </Row>
                        <Row className='center'>
                            <Col className='right'><h3>Email:</h3></Col>
                            <Col className='left'><h3>{employee.email}</h3></Col>
                        </Row>
                        <Row className='center'>
                            <Col className='right'><h3>Gender:</h3></Col>
                            <Col className='left'><h3>{
                                typeof(employee.gender[0]) === 'string' ?
                                (employee.gender[0]).toUpperCase() + (employee.gender).substring(1)
                                : employee.gender
                            }</h3></Col>
                        </Row>
                        <Row className='center'>
                            <Col className='right'><h3>Salary:</h3></Col>
                            <Col className='left'><h3>${parseFloat(employee.salary).toFixed(2)}</h3></Col>
                        </Row>
                    </Card.Body>
                </Card>
                <div className='center'>
                    <Button style={{marginTop: 50}} onClick={() => {navigate("/employees");}}>
                        Back to Employee List
                    </Button>
                </div>
            </Container>
        </>
    )
}

