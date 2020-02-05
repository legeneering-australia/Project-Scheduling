import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://appserver:8080/api/',
    timeout: 1000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
});

export default instance;
