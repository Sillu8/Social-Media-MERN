import { API } from "../axios";



export const getUser = async (token) => {
    const response = await API.get('/user',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getAdmin = async (token) => {
    const response = await API.get('/admin',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}