import React from 'react'
import UserInfo from '../UserInfo/UserInfo'
import './profile.scss'
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import { useLocation } from 'react-router-dom';
import UserPosts from '../UserPosts/UserPosts';
import { NavLink } from 'react-router-dom';


const Profile = () => {
    // const location = useLocation()


    return (
        <div className='profile'>
            <div className="container">
                <UserInfo />
                <div className="options">
                    <NavLink
                        to={'/profile'}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option">
                            <GridOnIcon /> <span>Posts</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to={'/profile/saved'}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'non-active-link'
                        }
                    >
                        <div className="option">
                            <BookmarkIcon /><span>Saved</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to={'/profile/tagged'}
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