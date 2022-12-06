import React from 'react'
import UserInfo from '../UserInfo/UserInfo'
import './profile.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UserPosts from '../UserPosts/UserPosts';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Profile = () => {
    const user = useSelector(state => state.userData.user);

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
                        <div className="option">
                            <GridOnIcon /> <span>Posts</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/profile/${user?.username}/saved`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option">
                            <BookmarkIcon /><span>Saved</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to={`/profile/${user?.username}/tagged`}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option">
                            <AccountBoxIcon /><span>Tagged</span>
                        </div>
                    </NavLink>
                </div>
                
                <UserPosts />
            </div>
        </div>
    )
}

export default Profile