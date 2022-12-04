import { useNavigate } from 'react-router-dom'



const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    // const location = useLocation();


    if (!token) {
        navigate('/');
    }else{
        return children;    
    }
}

export default PrivateRoute