import axios from 'axios';

export default axios.create({
    baseURL: 'https://comp3123-assignment1-101331867.herokuapp.com/api',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": 'application/json'
    }
})