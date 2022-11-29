import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
import ProfilePage from '../ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const UserRoutes = () => {

    const user = useSelector(state => state.userData.user);

    return (
        <>
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <Auth />
                    </PublicRoute>
                } />
                <Route path='/home' element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path={`/profile/${user?.username}`} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}

export default UserRoutes