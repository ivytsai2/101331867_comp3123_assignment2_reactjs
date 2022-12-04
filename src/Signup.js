import React, { Component } from 'react'
import axiosAPI from './api'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserNavbar from './UserNavbar';

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

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    onValueChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    /*{
    "username": "test1",
    "email": "test1@domain.com",
    "password": "test1"
    }*/
    onSubmitLogin = (event) => {
        event.preventDefault()
        const userData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axiosAPI.post('/user/signup', userData)
        .then(res => {
            console.log(res.data)
            alert(res.data.message)
        }).catch(error => {
            console.log(error.response.data)
            alert("Sign Up Failed... " + error.response.data.message)
        })
    }

    render() {
        return (
            <>
                <UserNavbar/>
                <Form style={form_style} onSubmit={(e) => this.onSubmitLogin(e)}>
                <h1 style={center}>Sign Up</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    name="username"
                    required
                    onChange={(e) => this.onValueChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type="emial" 
                    placeholder="Enter email" 
                    name="email"
                    required
                    onChange={(e) => this.onValueChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter password" 
                    name="password"
                    required
                    onChange={(e) => this.onValueChange(e)}/>
                </Form.Group>
                <div style={center}>
                    <Button className="btn btn-success" type="submit">Submit</Button>
                </div>
            </Form>
            <Container>Alreaady have an account? <NavLink to='/login'>Login</NavLink> here</Container>
        </>
        )
  }
}
