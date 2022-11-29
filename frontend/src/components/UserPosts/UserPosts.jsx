import React from 'react'
import './userposts.scss'
import { userPosts } from '../PostData'

const UserPosts = () => {
  return (
    <div className='userPosts'>
        {
            userPosts.map(post => {
                return (
                    <div className="userpost">
                        <img src={post.profilePic} alt="" />
                    </div>
                )
            })
        }
    </div>
  )
}

export default UserPosts