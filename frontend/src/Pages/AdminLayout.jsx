import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import './AdminLayout.scss'


const AdminLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }} className="layout">
                <Sidebar />
                <div className="child" style={{ flex: 6 }}>
                    {children}
                </div>
                <div className='right-admin' style={{width: '300px',}}>
                </div>
            </div>
        </>
    )
}

export default AdminLayout