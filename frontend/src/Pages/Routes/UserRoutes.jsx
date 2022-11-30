import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { fetchUserData } from '../../redux/auth/userSlice'
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
import ProfilePage from '../ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const UserRoutes = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector(state => state.userData);
    // const token = localStorage.getItem('token');
    // if(token){
    //     dispatch(fetchUserData(token))
    // }

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
                <Route path={`/profile/${user?.username}/saved`} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
                <Route path={`/profile/${user?.username}/tagged`} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}

export default UserRoutes