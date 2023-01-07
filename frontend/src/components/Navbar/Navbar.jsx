import React from 'react'
import './Navbar.scss'
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Logo from '../../images/bird.png'
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom'
import Search from '../Search/Search';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const { admin } = useSelector(state => state.adminData);
    const {user} = useSelector(state => state.userData);
    const isDark = false;


    return (
        <div className='navbar'>
            <div className="left">
                {/* <img src={Logo} alt="Logo" /> */}
                <Link to={user ? '/home' : '/admin/home'} style={{ textDecoration: 'none' }}>
                    {user ? <span>CHATTER</span> : <span>CHATTER ADMIN</span>}
                </Link>

            </div>
            <div className="right">
                {isDark ? <Brightness7Icon sx={{ cursor: 'pointer' }} /> : <DarkModeIcon sx={{ cursor: 'pointer' }} />}
                <div className="search">
                    <Search />
                </div>
                <div className="user">
                    <Avatar src={user?.profilePic} sx={{ cursor: 'pointer', width: '30px', height: '30px' }} />
                    <span style={{ cursor: 'pointer' }}>{
                        user ? user?.name?.split(' ')[0] : admin?.name?.split(' ')[0]
                    }</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar