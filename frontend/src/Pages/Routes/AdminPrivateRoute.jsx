import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminData } from '../../redux/auth/adminSlice';

const token = localStorage.getItem('adminToken')

const AdminPrivateRoute = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.adminData);

    useEffect(() => {
        if (!admin) {
            dispatch(fetchAdminData(token));
        }
    }, [admin])


    if (!token) {
        navigate('/admin/home');
    } else {
        return children;
    }
}

export default AdminPrivateRoute