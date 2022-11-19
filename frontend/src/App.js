import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './Pages/Auth';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Auth/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
