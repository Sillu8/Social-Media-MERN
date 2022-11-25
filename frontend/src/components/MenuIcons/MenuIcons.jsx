import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'
import './MenuIcons.scss'

const MenuIcons = () => {
    const MenuButton = styled(Button)(({ theme }) => ({
        color: 'black',
    }));


    const menuIcons = [
        {
            icon: <HomeIcon />,
            option: 'Home'
        },
        {
            icon: <ExploreIcon />,
            option: 'Explore'
        },
        {
            icon: <MessageRoundedIcon />,
            option: 'Messages'
        },
        {
            icon: <NotificationsIcon />,
            option: 'Notifications'
        },
        {
            icon: <SettingsIcon />,
            option: 'Settings'
        },
        {
            icon: <AccountCircleIcon />,
            option: 'Profile'
        },
        {
            icon: <LogoutIcon />,
            option: 'Logout'
        },
    ]

    return (
        <div className='MenuIcons'>
            {
                menuIcons.map((elem) => {
                    return (
                        <div className='menu-div'>
                            <div className="icon">{elem.icon}</div>
                            <MenuButton variant="text" key={elem.option}>{elem.option}</MenuButton>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MenuIcons