import React from 'react'
import './userposts.scss'
import { userPosts } from '../PostData'
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { POSTS } from "../../axios";

const UserPosts = () => {
    const { user } = useSelector(state => state.userData);

    useEffect(() => {
      (async()=>{
        try {
            const response = [];
            const postsByUser = user?.posts.map(element => {
                response.push()
            });
        } catch (error) {
            toast.error('Some unknown error!');
        }
      })();
    }, [])
    
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