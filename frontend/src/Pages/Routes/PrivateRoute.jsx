import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { fetchUserData } from '../../redux/auth/userSlice';



const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);


    useEffect(() => {
        if (!user) {
            dispatch(fetchUserData(token));
        }
        // eslint-disable-next-line
    }, [user])

    if (!token) {
        return <Navigate to={'/'} />
    } else {
        return children;
    }
}

export default PrivateRoute