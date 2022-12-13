import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../redux/auth/userSlice';



const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    // const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);


    useEffect(() => {
        if (!user) {
            dispatch(fetchUserData(token));
        }
        // eslint-disable-next-line
    }, [user])


    if (!token) {
        navigate('/');
    } else {
        return children;
    }
}

export default PrivateRoute