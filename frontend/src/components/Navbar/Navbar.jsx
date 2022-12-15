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

    const user = useSelector(state => state.userData.user);
    const isDark = false;

    return (
        <div className='navbar'>
            <div className="left">
                {/* <img src={Logo} alt="Logo" /> */}
                <Link to={'/home'} style={{ textDecoration: 'none' }}>
                    <span>CHATTER</span>
                </Link>

            </div>
            <div className="right">
                {isDark ? <Brightness7Icon sx={{cursor:'pointer'}}/> : <DarkModeIcon sx={{cursor:'pointer'}}/>}
                <div className="search">
                    <Search />
                </div>
                <div className="user">
                    <Avatar  sx={{cursor:'pointer', width:'30px', height:'30px'}}/>
                    <span style={{cursor:'pointer'}}>{
                        user?.name?.split(' ')[0]
                    }</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar