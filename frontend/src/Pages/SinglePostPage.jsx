import React from 'react'
import { useSelector } from 'react-redux'
import SinglePost from '../components/SinglePost/SinglePost'
import Layout from '../Layout/Layout'
import AdminLayout from './AdminLayout'

const SinglePostPage = () => {

  const { user } = useSelector(state => state.userData);

  if (user) {
    return (
      <Layout>
        <SinglePost />
      </Layout>
    )
  } else {
    return (
      <AdminLayout>
        <SinglePost />
      </AdminLayout>
    )
  }
}

export default SinglePostPage