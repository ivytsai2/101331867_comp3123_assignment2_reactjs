import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8081/api',
    /*headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": 'application/json'
    }*/
})

//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//instance.defaults.headers.post['Content-Type'] = 'application/json';
