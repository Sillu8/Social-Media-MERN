import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPublicRoute = ({ children }) => {
    const navigate = useNavigate();

    if (localStorage.getItem('adminToken')) {
        return navigate('/admin/home');
    } else {
        return children;
    }

}

export default AdminPublicRoute