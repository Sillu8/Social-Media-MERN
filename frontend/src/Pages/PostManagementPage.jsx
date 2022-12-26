import React from 'react'
import PostManagement from '../components/PostManagement/PostManagement'
import AdminLayout from './AdminLayout'

const PostManagementPage = () => {
    return (
        <AdminLayout>
            <PostManagement />
        </AdminLayout>
    )
}

export default PostManagementPage