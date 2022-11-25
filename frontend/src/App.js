import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './Pages/Auth/Auth';
import './app.scss'
import { useSelector } from 'react-redux'
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Layout from './Layout/Layout';


function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <>
      <Router>
        {loading && (<div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>)}
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/layout' element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
