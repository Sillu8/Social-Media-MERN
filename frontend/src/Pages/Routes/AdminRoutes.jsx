import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../AdminLogin/AdminLogin'
import PublicRoute from './PublicRoute'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path='/login' element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        } />

        
      </Routes>
    </div>
  )
}

export default AdminRoutes