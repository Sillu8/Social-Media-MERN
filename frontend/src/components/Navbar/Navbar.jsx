import React from 'react'
import './Navbar.scss'
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Logo from '../../images/bird.png'
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom'
import Search from '../Search/Search';
import { Avatar } from '@mui/material';
import User from '../../images/beach.jpg'

const Navbar = () => {

    const isDark = false

    return (
        <div className='navbar'>
            <div className="left">
                {/* <img src={Logo} alt="Logo" /> */}
                <Link to={'/home'} style={{ textDecoration: 'none' }}>
                    <span>CHATTER</span>
                </Link>

            </div>
            <div className="right">
                {isDark ? <Brightness7Icon /> : <DarkModeIcon />}
                <div className="search">
                    <Search />
                </div>
                <div className="user">
                    <Avatar src={User}/>
                    <span>John Doe</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar