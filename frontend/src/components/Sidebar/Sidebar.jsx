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


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="container">
                <div className="menu">
                    <div className="item">
                        <HomeIcon /> <span>Home</span>
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
                        <div className="user">
                            <div>
                                <Avatar src={User} sx={{width:'24px', height: '24px'}}/>
                            </div>
                            <span>Profile</span>
                        </div>
                    </div>
                    <div className="item">
                        <LogoutIcon /> <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar