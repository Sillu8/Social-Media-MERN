import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../redux/auth/userSlice'



const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const location = useLocation();


    if (!token) {
        navigate('/');
    }else{
        return children;    
    }
}

export default PrivateRoute