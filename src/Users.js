import axios from 'axios';
import React, { Component } from 'react'

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    //get all users
    getUsers = () => {
        var data = JSON.stringify({
            "collection": "users",
            "database": "comp3123_assignment1",
            "dataSource": "Cluster0",
            "projection": {
                "email": "comp3123@gbc.ca"
            }
        });
                    
        var config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-ryfmx/endpoint/data/v1/action/findOne',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'Access-Control-Allow-Origin': '*',
              'api-key': '0AwOdZVONWyYV4YE6s1Ufbr0hxicpxc7Ni76lhSNVRCtclsNVKoiRicwHSP52bwm',
              //'Accept': 'application/json'
            },
            data: data
        };
                    
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                //this.setState([users: response.data])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.getUsers()
    }

    render() {
        return (
            <div>
                users
            </div>
        )
    }
}

