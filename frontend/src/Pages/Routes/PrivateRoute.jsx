import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../redux/auth/userSlice'



const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }else{
            dispatch(fetchUserData(token));
        }
        //eslint-disable-next-line
    },[])
    return children;
}

export default PrivateRoute