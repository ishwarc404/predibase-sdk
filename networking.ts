import axios from 'axios';


const DEFAULT_BASE_URL = 'https://serving.app.predibase.com';

const axiosInstance = axios.create({
    baseURL: DEFAULT_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export { axiosInstance };
