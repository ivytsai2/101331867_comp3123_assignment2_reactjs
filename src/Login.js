import React, { Component } from 'react'
import axiosAPI from './api'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserNavbar from './UserNavbar';
import { Navigate } from 'react-router-dom';

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

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginSuccess: false
        }
    }

    onValueChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    /*{
    "username": "comp3123",
    "password": "comp3123isthebest"
    }*/
    onSubmitLogin = (event) => {
        event.preventDefault()
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        axiosAPI.post('/user/login', userData)
        .then(res => {
            this.setState({loginSuccess: true})
            console.log(res.data)
        }).catch(error => {
            this.setState({loginSuccess: false})
            console.log(error.response.data)
            alert("Login Failed! " + error.response.data.message)
        })
    }

    render() {
        return (
            <>
                <UserNavbar/>
                <br></br>
                    <Form style={form_style} onSubmit={(e) => this.onSubmitLogin(e)}>
                    <h1 style={center}>Login Account</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        name="username" 
                        required
                        onChange={(e) => this.onValueChange(e)}/>
                        <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        name="password" 
                        required
                        onChange={(e) => this.onValueChange(e)}/>
                        <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <div style={center}>
                        <Button className="btn btn-success" type="submit">Submit</Button>
                    </div>
                </Form>
                <Container>Don't have an account? <NavLink to='/signup'>Sign up</NavLink> here</Container>
                {this.state.loginSuccess && <Navigate to='/employees' replace={true}></Navigate>}
            </>
        )
    }
}
