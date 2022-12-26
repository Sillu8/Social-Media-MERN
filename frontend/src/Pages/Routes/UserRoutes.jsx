import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import ForgotPwdOtp from '../../components/ForgotPwdOtp/ForgotPwdOtp'
import NewPassword from '../../components/NewPwd/NewPassword'
import OTP from '../../components/OTP/OTP'
import UserProfile from '../../components/UserProfile/UserProfile'
import UserProfilePage from '../../components/UserProfilePage/UserProfilePage'
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
import NotificationsPage from '../NotificationsPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import SinglePostPage from '../SinglePostPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const UserRoutes = () => {

    return (
        <>
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <Auth />
                    </PublicRoute>
                } />
                <Route path='/otp' element={
                    <PublicRoute>
                        <OTP />
                    </PublicRoute>
                } />
                {/*For entering the otp for resetting pwd*/}
                <Route path='/verifyOtp' element={
                    <PublicRoute>
                        <ForgotPwdOtp />
                    </PublicRoute>
                } />
                <Route path='/newPassword' element={
                    <PublicRoute>
                        <NewPassword />
                    </PublicRoute>
                } />
                <Route path='/forgotPassword' element={
                    <PublicRoute>
                        <ForgotPassword />
                    </PublicRoute>
                } />

                <Route path='/home' element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path={`/profile/:username`} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
                <Route path={`/profile/:username/saved`} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
                <Route path={`/notifications`} element={
                    <PrivateRoute>
                        <NotificationsPage />
                    </PrivateRoute>
                } />

                <Route path={`/post/:postId`} element={
                    <PrivateRoute>
                        <SinglePostPage />
                    </PrivateRoute>
                } />


            </Routes>
        </>
    )
}

export default UserRoutes