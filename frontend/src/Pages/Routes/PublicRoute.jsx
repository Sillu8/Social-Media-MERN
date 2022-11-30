import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            return navigate('/home');
        }
    },[])
    return children;
}

export default PublicRoute