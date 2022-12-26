import React from 'react'
import './Sidebar.scss'
import { Avatar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from '../../redux/auth/userSlice';
import { clearAdmin } from '../../redux/auth/adminSlice';
import GroupIcon from '@mui/icons-material/Group';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Sidebar = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
        navigate('/');
    }

    const adminLogOut = () => {
        dispatch(clearAdmin());
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    }

    return (
        <div className='sidebar'>
            <div className="container">
                <div className="menu">
                    {
                        user ?
                            // User menu buttons
                            <>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={'/home'} >
                                        <HomeIcon /> <span>Home</span>
                                    </NavLink>
                                </div>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={'/notifications'} >
                                        <div className="user">
                                            <div>
                                                <NotificationsIcon /> <span>Notifications</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="item">
                                    <SettingsIcon /> <span>Settings</span>
                                </div>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={`/profile/${user?.username}`} >
                                        <div className="user">
                                            <div>
                                                <Avatar sx={{ width: '24px', height: '24px' }} />
                                            </div>
                                            <span>Profile</span>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="item" onClick={logOut}>
                                    <LogoutIcon /> <span>Logout</span>
                                </div>
                            </>
                            :
                            // Admin Menu Buttons
                            <>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={'/admin/home'} >
                                        <HomeIcon /> <span>Home</span>
                                    </NavLink>
                                </div>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={'/admin/users'} >
                                        <div className="user">
                                            <div>
                                                <GroupIcon sx={{ width: '24px', height: '24px' }} />
                                            </div>
                                            <span>Users</span>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={'/admin/posts'} >
                                        <div className="user">
                                            <div>
                                                <LibraryBooksIcon sx={{ width: '24px', height: '24px' }} />
                                            </div>
                                            <span>Posts</span>

                                        </div>
                                    </NavLink>
                                </div>
                                <div className="item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? 'active-style' : 'inactive-style'
                                        }
                                        to={'/admin/notifications'} >
                                        <div className="user">
                                            <div>
                                                <NotificationsIcon />
                                            </div>
                                            <span>Notifications</span>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="item" onClick={adminLogOut}>
                                    <LogoutIcon /> <span>Logout</span>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar



// {/* <div className="item">
//     <ExploreIcon /> <span>Explore</span>
// </div> */}
// {/* <div className="item">
//     <MessageRoundedIcon /> <span>Messages</span>
// </div> */}