import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import UserRoutes from './Pages/Routes/UserRoutes';
import AdminRoutes from './Pages/Routes/AdminRoutes';
import { useEffect } from 'react';
import { fetchUserData } from './redux/auth/userSlice';

function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { user } = useSelector(state => state.userData);

  //Dispatching for routes
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData(token));
    }
    // eslint-disable-next-line
  }, [user])

  const { loading } = useSelector(state => state.alerts);

  return (
    <>
      <div><Toaster /></div>
      <Router>
        {loading && (<div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>)}
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
