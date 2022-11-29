import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import './Layout.scss'
import './style.scss'
import Sidebar from '../components/Sidebar/Sidebar'
import Rightbar from '../components/RightBar/Rightbar'

const Layout = ({ children }) => {
    return (
        <div className='theme-light'>
            <Navbar />
            <div style={{ display: 'flex' }} className="layout">
                <Sidebar />
                <div className="child" style={{ flex: 6 }}>
                    {children}
                </div>
                <Rightbar />
            </div>
        </div>
    )
}

export default Layout