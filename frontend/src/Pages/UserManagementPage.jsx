import React from 'react'
import AdminLayout from './AdminLayout'
import UserManagement from '../components/UserManagement/UserManagement'

const UserManagementPage = () => {
  return (
    <AdminLayout>
        <UserManagement />
    </AdminLayout>
  )
}

export default UserManagementPage