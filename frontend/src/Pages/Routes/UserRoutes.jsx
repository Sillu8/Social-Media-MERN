import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'
import ForgotPwdOtp from '../../components/ForgotPwdOtp/ForgotPwdOtp'
import NewPassword from '../../components/NewPwd/NewPassword'
import OTP from '../../components/OTP/OTP'
import Auth from '../Auth/Auth'
import Home from '../Home/Home'
import ProfilePage from '../ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const UserRoutes = () => {
    const { user } = useSelector(state => state.userData);
    
    
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
                {/*For entering the otp for resetting pwd*/ }
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
                {/* <Route path={`/profile/${user?.username}/tagged`} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } /> */}
            </Routes>
        </>
    )
}

export default UserRoutes