import React from 'react'
import './Sidebar.scss'
import User from '../../images/beach.jpg'
import { Avatar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from '../../redux/auth/userSlice';


const Sidebar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(clearUser());
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className='sidebar'>
            <div className="container">
                <div className="menu">
                    <div className="item">
                        <NavLink
                            className = {({ isActive }) =>
                                isActive ? 'active-style' : 'inactive-style'
                            }
                            to={'/home'} >
                            <HomeIcon /> <span>Home</span>
                        </NavLink>
                    </div>
                    <div className="item">
                        <ExploreIcon /> <span>Explore</span>
                    </div>
                    <div className="item">
                        <MessageRoundedIcon /> <span>Messages</span>
                    </div>
                    <div className="item">
                        <NotificationsIcon /> <span>Notifications</span>
                    </div>
                    <div className="item">
                        <SettingsIcon /> <span>Settings</span>
                    </div>
                    <div className="item">
                        <NavLink
                            className = {({ isActive }) =>
                                isActive ? 'active-style' : 'inactive-style'
                            }
                            to={`/profile/${user?.username}`} >
                            <div className="user">
                                <div>
                                    <Avatar src={User} sx={{ width: '24px', height: '24px' }} />
                                </div>
                                <span>Profile</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="item" onClick={logOut}>
                        <LogoutIcon /> <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar