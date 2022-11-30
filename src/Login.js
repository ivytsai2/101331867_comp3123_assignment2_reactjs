import React, { Component } from 'react'
import axiosAPI from './api'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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
            password: ''
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
        axiosAPI.post('/user/login', {userData}, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                'Access-Control-Request-Headers': '*'
            }
        })
        .then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <>
                <Form style={form_style}>
                    <h1 style={center}>Login Account</h1>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" name="username"
                        onChange={(e) => this.onValueChange(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"
                        onChange={(e) => this.onValueChange(e)}/>
                    </Form.Group>
                    <div style={center}>
                        <Button className="btn btn-success" type="submit"
                        onClick={(e) => this.onSubmitLogin(e)}>Submit</Button>
                    </div>
                </Form>
            </>
        )
    }
}
