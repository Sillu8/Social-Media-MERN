import React, { useState } from 'react'
import UserInfo from '../UserInfo/UserInfo'
import './profile.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import UserPosts from '../UserPosts/UserPosts';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { POSTS } from '../../axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';

const Profile = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userData);
    const { username } = useParams();

    const [isProfile, setIsProfile] = useState(true);
    const [posts, setPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [isMyProfile, setIsMyProfile] = useState(false)

    useEffect(() => {
      if(user?.username === username){
        setIsMyProfile(true)
      }else{
        setIsMyProfile(false);
      }
    }, [username,user])
    

    useEffect(() => {

        if (isProfile) {
            (async () => {
                try {
                    dispatch(showLoading());
                    const response = await POSTS.get(`/userposts/${username}`);
                    dispatch(hideLoading())
                    setPosts(response.data.data.posts);
                } catch (error) {
                    dispatch(hideLoading())
                    toast.error('Some unknown error!');
                }
            })();
        } else {
            (async () => {
                try {
                    dispatch(showLoading());
                    const response = await POSTS.get(`/savedPosts/${username}`);
                    dispatch(hideLoading())
                    setSavedPosts(response.data.savedPosts);
                } catch (error) {
                    dispatch(hideLoading())
                    toast.error('Some unknown error!');
                }
            })();
        }
        //eslint-disable-next-line
    }, [isProfile, username])


    return (
        <div className='profile'>
            <div className="container">
                <UserInfo isMyProfile={isMyProfile}/>
                <div className="options">
                    <NavLink
                        end to={`/profile/${username}`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option" onClick={() => setIsProfile(prev => !prev)}>
                            <GridOnIcon /> <span>Posts</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/profile/${username}/saved`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        {
                            isMyProfile &&
                            <div className="option" onClick={() => setIsProfile(prev => !prev)}>
                                <BookmarkIcon /><span>Saved</span>
                            </div>
                        }
                    </NavLink>
                </div>
                {
                    isProfile ?
                        < UserPosts data={posts} /> :
                        <UserPosts data={savedPosts} />
                }
            </div>
        </div>
    )
}

export default Profile