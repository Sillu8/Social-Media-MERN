import React from 'react'
import './userposts.scss'

const UserPosts = ({data}) => {

    
  return (
    <div className='userPosts'>
        {
            data?.map(post => {
                return (
                    <div className="userpost">
                        <img src={post.images} alt="" />
                    </div>
                )
            })
        }
    </div>
  )
}

export default UserPosts