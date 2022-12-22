import React, { useState } from 'react'
import UserInfo from '../UserInfo/UserInfo'
import './UserProfile.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import UserPosts from '../UserPosts/UserPosts';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { POSTS } from '../../axios';
import toast from 'react-hot-toast';

const UserProfile = () => {


    const location = useLocation();
    const username = location.pathname
    const [posts, setPosts] = useState([]);

    useEffect(() => {
            (async () => {
                try {
                    const response = await POSTS.get('/userposts');
                    setPosts(response.data.data.posts);
                } catch (error) {
                    toast.error('Some unknown error!');
                }
            })();
    }, [])


    return (
        <div className='profile'>
            <div className="container">
                
                <div className="options">
                    <NavLink
                        end to={`/${username}`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option" >
                            <GridOnIcon /> <span>Posts</span>
                        </div>
                    </NavLink>
                </div>
                {
                    < UserPosts data={posts} /> 
                }
            </div>
        </div>
    )
}

export default UserProfile