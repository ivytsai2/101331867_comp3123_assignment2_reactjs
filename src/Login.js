import React, { Component } from 'react'
import axiosAPI from './api'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserNavbar from './UserNavbar';
import { Navigate } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginSuccess: false,
            token: ''
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
            this.setState({loginSuccess: true, token: res.data.token})
            localStorage.setItem('token', res.data.token)
        }).catch(error => {
            this.setState({loginSuccess: false})
            alert("Login Failed! " + error.response.data.message)
        })
    }

    componentDidMount = () => {
        localStorage.clear()
    }

    render() {
        return (
            <>
                <UserNavbar/>
                <br></br>
                    <Form className='form_style' onSubmit={(e) => this.onSubmitLogin(e)}>
                    <h1 className='center'>Login Account</h1>
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
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        name="password" 
                        required
                        onChange={(e) => this.onValueChange(e)}/>
                    </Form.Group>
                    <div className='center'>
                        <Button className="btn btn-success" type="submit">Submit</Button>
                    </div>
                </Form>
                <Container className='link_style'>
                    Don't have an account?<NavLink to='/signup'>Sign up</NavLink> here
                </Container>

                {this.state.loginSuccess && 
                <Navigate to='/employees' replace={true}/>}
            </>
        )
    }
}
