import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../AdminHome/AdminHome'
import AdminLogin from '../AdminLogin/AdminLogin'
import UserManagementPage from '../UserManagementPage'
import AdminPrivateRoute from './AdminPrivateRoute'
import AdminPublicRoute from './AdminPublicRoute'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path='/login' element={
          <AdminPublicRoute>
            <AdminLogin />
          </AdminPublicRoute>
        } />

        <Route path='/home' element={
          <AdminPrivateRoute>
            <AdminHome />
          </AdminPrivateRoute>
        } />

        <Route path='/users' element={
          <AdminPrivateRoute>
            <UserManagementPage />
          </AdminPrivateRoute>
        } />


      </Routes>
    </div>
  )
}

export default AdminRoutes