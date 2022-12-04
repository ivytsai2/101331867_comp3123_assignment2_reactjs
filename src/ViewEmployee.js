import React, { useEffect, useState } from 'react'
import axiosAPI from './api'
import { useParams, useNavigate } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
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

    return (
        <>
        <EmployeeNavbar/>
        <br></br>
        <h2>Employee Details</h2>
        <Container>
            <Card>
                <Card.Body>
                    <Row as={Card.Title}>First Name: {employee.first_name}</Row>
                    <Row as={Card.Title}>Last Name: {employee.last_name}</Row>
                    <Row as={Card.Title}>Email: {employee.email}</Row>
                    <Row as={Card.Title}>Gender: {employee.gender}</Row>
                    <Row as={Card.Title}>Salary: ${employee.salary}</Row>
                </Card.Body>
            </Card>
        </Container>
        <Button onClick={() => {navigate("/employees");}}>
            Back to Employee List
        </Button>
        </>
    )
}

