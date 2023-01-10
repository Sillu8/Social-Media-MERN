import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchAdminData } from '../../redux/auth/adminSlice';

const token = localStorage.getItem('adminToken')

const AdminPrivateRoute = ({ children }) => {

    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.adminData);

    useEffect(() => {
        if (!admin) {
            dispatch(fetchAdminData(token));
        }
    }, [admin])


    if (!token) {
        return <Navigate to={'/admin/login'} />
    } else {
        return children;
    }
}

export default AdminPrivateRoute