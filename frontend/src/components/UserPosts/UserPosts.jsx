import React from 'react'
import Post from '../Post/Post'
import './userposts.scss'

const UserPosts = ({ data }) => {


  return (
    <div className='userPosts'>
      {
        data?.map(post => {
          return (
            <Post data={post} key={post._id} id={post._id} />
          )
        })
      }
    </div>
  )
}

export default UserPosts