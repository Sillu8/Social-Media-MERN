import { Navigate } from 'react-router-dom';

const AdminPublicRoute = ({ children }) => {

    if (localStorage.getItem('adminToken')) {
        return <Navigate to={'/admin/home'} />
    } else {
        return children;
    }

}

export default AdminPublicRoute