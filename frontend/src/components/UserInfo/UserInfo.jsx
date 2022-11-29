import React from 'react'
import { Avatar, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import './UserInfo.scss'
import { useSelector } from 'react-redux';

const UserInfo = () => {
    const user = useSelector(state => state.userData.user);
    console.log(user);
    return (
        <div className="ProfileData">
            <div className="profilePic">
                <Avatar sx={{ width: '150px', height: '150px' }} />
            </div>
            <div className="userInfo">
                <div className="top">
                    <span>{user?.username}</span>
                    <Button variant='outlined'>Edit Profile</Button>
                    <SettingsIcon sx={{cursor:'pointer'}}/>
                </div>
                <div className="connection">
                    <span className='posts'>{`${user?.posts?.length} post${user?.posts?.length <= 1 ? '' : 's'}`}</span>
                    <span className='followers'>{`${user?.followers?.length} followers`}</span>
                    <span className='following'>{`${user?.following?.length} following`}</span>
                </div>
                <div className="userDescription">
                    <span>{user?.name}</span>
                    <span>{user?.details?.bio}</span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo