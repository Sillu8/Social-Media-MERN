import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_USER } from '../../axios';
import { hideLoading, showLoading } from '../../redux/loading/loadSlice';
import './ForgotPassword.scss'
import { ErrorMessage } from '@hookform/error-message'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        (async () => {
            try {
                dispatch(showLoading())
                const response = await API_USER.patch('/sendOtp', { phone: data["Phone Number"] });
                dispatch(hideLoading());
                if (response.data.status === 'success') {
                    toast.success('Please enter the otp!');
                    navigate('/verifyOtp', { state: data["Phone Number"] })
                }
            } catch (error) {
                dispatch(hideLoading());
                console.log(error);
                toast.error(error.response.data.message);
            }
        })();
    }


    return (
        <div className='resetPassword'>
            <div className="form-container">
                <h3>Forgot Password?</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="input">
                            <input type="tel" placeholder="Phone Number" name='phone' {...register("Phone Number", { required: "Please enter the phone number!" })} />
                            <div className='error-msg'><ErrorMessage errors={errors} name='Phone Number' /></div>
                        </div>
                    </div>

                    <div className="submit-btn">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword