import axios from 'axios';

const BASE_URL = 'https://vector-udemy-burger-builder.firebaseio.com/';

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;
export { BASE_URL };