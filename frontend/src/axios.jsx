import axios from 'axios';

const APP_ENVIRONMENT = ''

const API_URL = APP_ENVIRONMENT === 'test' ? 'http://localhost:4000' : 'https://chatter.ecart.ltd/'


export const API = axios.create({
    baseURL: `${API_URL}/api/v1`
});

const token = `Bearer ${localStorage.getItem('token')}`;
const adminToken = `Bearer ${localStorage.getItem('adminToken')}`;


export const API_USER = axios.create({
    baseURL: `${API_URL}/api/v1/user`
})

API_USER.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token;
        return config;
    }
)


export const USER = axios.create({
    baseURL: `${API_URL}/api/v1/user`
})


USER.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token;
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }
)



export const API_POST = axios.create({
    baseURL: `${API_URL}/api/v1/post`
})

API_POST.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token;
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }
)

export const POSTS = axios.create({
    baseURL: `${API_URL}/api/v1/post`
})

POSTS.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token
        return config;
    }
)


export const CONVERSATION = axios.create({
    baseURL: `${API_URL}/api/v1/conversation`,
})

CONVERSATION.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token;
        return config;
    }
)


export const MESSAGE_API = axios.create({
    baseURL: `${API_URL}/api/v1/message`,
})

MESSAGE_API.interceptors.request.use(
    config => {
        config.headers['Authorization'] = token;
        return config;
    }
)


export const API_ADMIN = axios.create({
    baseURL: `${API_URL}/api/v1/admin`
});


API_ADMIN.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('adminToken')}`;
        return config;
    }
)


export const API_ADMIN_POST = axios.create({
    baseURL: `${API_URL}/api/v1/post`
});


API_ADMIN_POST.interceptors.request.use(
    config => {
        config.headers['Authorization'] = adminToken;
        return config;
    }
)