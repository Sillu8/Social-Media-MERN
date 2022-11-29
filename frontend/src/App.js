import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.scss'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import UserRoutes from './Pages/Routes/UserRoutes';
import AdminRoutes from './Pages/Routes/AdminRoutes';

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <>
      <div><Toaster /></div>
      <Router>
        {loading && (<div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>)}
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/*' element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
