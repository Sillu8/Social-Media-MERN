import React, { useState } from 'react'
import UserInfo from '../UserInfo/UserInfo'
import './profile.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UserPosts from '../UserPosts/UserPosts';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { POSTS } from '../../axios';
import toast from 'react-hot-toast';

const Profile = () => {
    const user = useSelector(state => state.userData.user);

    const [isProfile, setIsProfile] = useState(true);

    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        if (isProfile) {
            (async () => {
                try {
                    const response = await POSTS.get('/userposts');
                    setPosts(response.data.data.posts);
                } catch (error) {
                    toast.error('Some unknown error!');
                }
            })();
        } else {
            (async () => {
                try {
                    const response = await POSTS.get('/savedPosts');
                    setSavedPosts(response.data.savedPosts);
                } catch (error) {
                    toast.error('Some unknown error!');
                }
            })();
        }
        //eslint-disable-next-line
    }, [location.pathname])


    return (
        <div className='profile'>
            <div className="container">
                <UserInfo />
                <div className="options">
                    <NavLink
                        end to={`/profile/${user?.username}`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option" onClick={()=>setIsProfile(prev=>!prev)}>
                            <GridOnIcon /> <span>Posts</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/profile/${user?.username}/saved`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option" onClick={()=>setIsProfile(prev=>!prev)}>
                            <BookmarkIcon /><span>Saved</span>
                        </div>
                    </NavLink>
                    {/* <NavLink
                        to={`/profile/${user?.username}/tagged`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option">
                            <AccountBoxIcon /><span>Tagged</span>
                        </div>
                    </NavLink> */}
                </div>
                {
                    isProfile ?
                    < UserPosts data={posts} /> :
                    <UserPosts data = {savedPosts} />
                }
            </div>
        </div>
    )
}

export default Profile