import axios from 'axios';


const liteApi = axios.create({
    baseURL: '/api'
});


export default liteApi;