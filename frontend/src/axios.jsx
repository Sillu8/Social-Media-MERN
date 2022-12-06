import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://localhost:4000/api/v1'
});

export const API_USER = axios.create({
    baseURL: 'http://localhost:4000/api/v1/user'
})

API_USER.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)

export const API_POST = axios.create({
    baseURL: 'http://localhost:4000/api/v1/post'
})

API_POST.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
    }
)

export const POSTS = axios.create({
    baseURL: 'http://localhost:4000/api/v1/post'
})

POSTS.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)


export const CONVERSATION = axios.create({
    baseURL: 'http://localhost:4000/api/v1/conversation',
})

CONVERSATION.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)


export const MESSAGE_API = axios.create({
    baseURL: 'http://localhost:4000/api/v1/message',
})

MESSAGE_API.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)